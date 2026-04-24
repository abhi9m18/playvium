export {};

declare global {
  interface Window {
    FB?: any;
    google?: any;
    fbAsyncInit?: (() => void) | null;
    fbReady?: boolean;
    fbReadyCallbacks?: Array<() => void>;
  }
}
