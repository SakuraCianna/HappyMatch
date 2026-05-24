import { common } from '@kit.AbilityKit';
import { media } from '@kit.MediaKit';
import { vibrator } from '@kit.SensorServiceKit';
import { gameSettingsService } from '../settings/GameSettings';

export type FeedbackCue =
  'tap' |
  'swap' |
  'match' |
  'special' |
  'drop' |
  'tool' |
  'error' |
  'win' |
  'lose';

interface CueAsset {
  path: string;
  volume: number;
  vibrationMs: number;
}

interface ActiveAudioResource {
  context: common.Context;
  path: string;
  rawFdOpened: boolean;
  closed: boolean;
  player?: media.AVPlayer;
}

const CUE_ASSETS: Record<FeedbackCue, CueAsset> = {
  tap: { path: 'sfx/ui_tap.ogg', volume: 0.32, vibrationMs: 5 },
  swap: { path: 'sfx/ui_tap.ogg', volume: 0.28, vibrationMs: 6 },
  match: { path: 'sfx/match_clear.ogg', volume: 0.42, vibrationMs: 12 },
  special: { path: 'sfx/special_burst.ogg', volume: 0.46, vibrationMs: 18 },
  drop: { path: 'sfx/piece_drop.ogg', volume: 0.30, vibrationMs: 7 },
  tool: { path: 'sfx/match_clear.ogg', volume: 0.36, vibrationMs: 10 },
  error: { path: 'sfx/move_error.ogg', volume: 0.34, vibrationMs: 8 },
  win: { path: 'sfx/level_win.ogg', volume: 0.48, vibrationMs: 24 },
  lose: { path: 'sfx/level_lose.ogg', volume: 0.42, vibrationMs: 18 }
};

export class FeedbackService {
  private context?: common.Context;
  private lastCueAt: Record<FeedbackCue, number> = {
    tap: 0,
    swap: 0,
    match: 0,
    special: 0,
    drop: 0,
    tool: 0,
    error: 0,
    win: 0,
    lose: 0
  };

  init(context: common.Context): void {
    this.context = context;
  }

  play(cue: FeedbackCue): void {
    const asset = CUE_ASSETS[cue];
    if (!asset) {
      return;
    }
    this.vibrate(asset.vibrationMs);
    const settings = gameSettingsService.getState();
    if (!settings.soundEnabled) {
      return;
    }
    const now = Date.now();
    if (now - this.lastCueAt[cue] < 80) {
      return;
    }
    this.lastCueAt[cue] = now;
    this.playRawFile(asset.path, asset.volume);
  }

  private async playRawFile(path: string, volume: number): Promise<void> {
    const context = this.context;
    if (!context) {
      return;
    }
    const active: ActiveAudioResource = {
      context,
      path,
      rawFdOpened: false,
      closed: false
    };
    try {
      const descriptor = await context.resourceManager.getRawFd(path);
      active.rawFdOpened = true;
      const player = await media.createAVPlayer();
      active.player = player;
      player.fdSrc = {
        fd: descriptor.fd,
        offset: descriptor.offset,
        length: descriptor.length
      };
      await player.prepare();
      player.setVolume(volume);
      await player.play();
      setTimeout(() => {
        this.releaseAudioResource(active);
      }, 1200);
    } catch (_error) {
      // Audio feedback should never block or crash the game loop.
      this.releaseAudioResource(active);
    }
  }

  private async releaseAudioResource(active: ActiveAudioResource): Promise<void> {
    if (active.closed) {
      return;
    }
    active.closed = true;
    if (active.player) {
      try {
        await active.player.release();
      } catch (_error) {
        // Best effort cleanup.
      }
    }
    if (active.rawFdOpened) {
      try {
        await active.context.resourceManager.closeRawFd(active.path);
      } catch (_error) {
        // Best effort cleanup.
      }
    }
  }

  private vibrate(durationMs: number): void {
    const settings = gameSettingsService.getState();
    if (!settings.vibrationEnabled || durationMs <= 0) {
      return;
    }
    try {
      vibrator.vibrate(durationMs);
    } catch (_error) {
      // Vibration may be unavailable on some emulators.
    }
  }
}

export const feedbackService = new FeedbackService();
