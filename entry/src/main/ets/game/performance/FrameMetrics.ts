const ENABLE_ANIMATION_FRAME_METRICS: boolean = false;
const SLOW_FRAME_COST_MS: number = 22;

export class AnimationFrameMetrics {
  private enabled: boolean = ENABLE_ANIMATION_FRAME_METRICS;
  private label: string = '';
  private frameCount: number = 0;
  private totalDrawCostMs: number = 0;
  private maxDrawCostMs: number = 0;
  private slowFrameCount: number = 0;
  private targetDurationMs: number = 0;
  private latestSummaryText: string = '等待动画数据';

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  begin(label: string, targetDurationMs: number): void {
    if (!this.enabled) {
      return;
    }
    this.label = label;
    this.frameCount = 0;
    this.totalDrawCostMs = 0;
    this.maxDrawCostMs = 0;
    this.slowFrameCount = 0;
    this.targetDurationMs = targetDurationMs;
  }

  recordFrame(drawCostMs: number): void {
    if (!this.enabled) {
      return;
    }
    this.frameCount++;
    this.totalDrawCostMs += drawCostMs;
    if (drawCostMs > this.maxDrawCostMs) {
      this.maxDrawCostMs = drawCostMs;
    }
    if (drawCostMs >= SLOW_FRAME_COST_MS) {
      this.slowFrameCount++;
    }
  }

  finish(): string {
    if (!this.enabled || this.frameCount === 0) {
      return '';
    }
    const average = Math.round(this.totalDrawCostMs * 10 / this.frameCount) / 10;
    this.latestSummaryText =
      `${this.label}: ${this.frameCount}帧 / 平均${average}ms / 峰值${this.maxDrawCostMs}ms / 慢帧${this.slowFrameCount}`;
    return this.latestSummaryText;
  }

  latestText(): string {
    return this.latestSummaryText;
  }
}

export const animationFrameMetrics = new AnimationFrameMetrics();
