import { Position } from '../core/Types';

export type AnimationType = 'swap' | 'clear' | 'fall' | 'pulse';

export interface BoardAnimation {
  type: AnimationType;
  from?: Position;
  to?: Position;
  positions?: Position[];
  startedAt: number;
  durationMs: number;
}

export class AnimationQueue {
  private items: BoardAnimation[] = [];

  push(animation: BoardAnimation): void {
    this.items.push(animation);
  }

  active(now: number): BoardAnimation[] {
    this.items = this.items.filter(item => now - item.startedAt <= item.durationMs);
    return this.items;
  }

  clear(): void {
    this.items = [];
  }
}
