import type { OwAd } from '@overwolf/types/owads';

declare global {
  interface Window {
    OwAd?: typeof OwAd;
  }
}
