export interface PlaygroundRun {
  run: () => Promise<void>;
  name: string;
}
