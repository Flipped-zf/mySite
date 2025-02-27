declare global {
  class GyroNorm {
    init(options: { gravityNormalized: boolean }): Promise<void>;
    start(callback: (data: { do: { gamma: number; beta: number } }) => void): void;
  }
}

export {}; 