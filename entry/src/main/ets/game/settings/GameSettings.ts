import { common } from '@kit.AbilityKit';
import { preferences } from '@kit.ArkData';

export interface GameSettingsState {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  reducedMotion: boolean;
}

export const DEFAULT_GAME_SETTINGS: GameSettingsState = {
  soundEnabled: true,
  vibrationEnabled: true,
  reducedMotion: false
};

const STORE_NAME = 'happy_match_settings';
const KEY_SOUND = 'sound_enabled';
const KEY_VIBRATION = 'vibration_enabled';
const KEY_REDUCED_MOTION = 'reduced_motion';

export class GameSettingsService {
  private state: GameSettingsState = { ...DEFAULT_GAME_SETTINGS };
  private store?: preferences.Preferences;
  private initialized: boolean = false;

  async init(context: common.Context): Promise<void> {
    if (this.initialized) {
      return;
    }
    try {
      this.store = await preferences.getPreferences(context, STORE_NAME);
      const sound = await this.store.get(KEY_SOUND, DEFAULT_GAME_SETTINGS.soundEnabled);
      const vibration = await this.store.get(KEY_VIBRATION, DEFAULT_GAME_SETTINGS.vibrationEnabled);
      const reducedMotion = await this.store.get(KEY_REDUCED_MOTION, DEFAULT_GAME_SETTINGS.reducedMotion);
      this.state = {
        soundEnabled: this.asBoolean(sound, DEFAULT_GAME_SETTINGS.soundEnabled),
        vibrationEnabled: this.asBoolean(vibration, DEFAULT_GAME_SETTINGS.vibrationEnabled),
        reducedMotion: this.asBoolean(reducedMotion, DEFAULT_GAME_SETTINGS.reducedMotion)
      };
    } catch (_error) {
      this.state = { ...DEFAULT_GAME_SETTINGS };
      this.store = undefined;
    }
    this.initialized = true;
  }

  getState(): GameSettingsState {
    return { ...this.state };
  }

  setSoundEnabled(enabled: boolean): void {
    this.state.soundEnabled = enabled;
    this.persistBoolean(KEY_SOUND, enabled);
  }

  setVibrationEnabled(enabled: boolean): void {
    this.state.vibrationEnabled = enabled;
    this.persistBoolean(KEY_VIBRATION, enabled);
  }

  setReducedMotion(enabled: boolean): void {
    this.state.reducedMotion = enabled;
    this.persistBoolean(KEY_REDUCED_MOTION, enabled);
  }

  resetForTest(): void {
    this.state = { ...DEFAULT_GAME_SETTINGS };
    this.initialized = false;
    this.store = undefined;
  }

  private async persistBoolean(key: string, value: boolean): Promise<void> {
    if (!this.store) {
      return;
    }
    try {
      await this.store.put(key, value);
      await this.store.flush();
    } catch (_error) {
      // Settings are optional quality-of-life state. Gameplay should continue if persistence fails.
    }
  }

  private asBoolean(value: preferences.ValueType, fallback: boolean): boolean {
    if (typeof value === 'boolean') {
      return value;
    }
    return fallback;
  }
}

export const gameSettingsService = new GameSettingsService();
