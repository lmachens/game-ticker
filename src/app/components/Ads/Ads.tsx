import { OwAd } from '@overwolf/types/owads';
import { useEffect, useRef, useState } from 'react';
import { getCurrentWindow } from '../../utils/windows';
import classes from './Ads.module.css';

function Ads(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [owAd, setOwAd] = useState<OwAd>();

  useEffect(() => {
    function onOwAdReady() {
      if (typeof window.OwAd === 'undefined' || containerRef.current === null) {
        return;
      }
      const ad = new window.OwAd(containerRef.current, {
        size: { width: 400, height: 300 },
      });
      setOwAd(ad);
    }
    const script = document.createElement('script');
    script.src = 'https://content.overwolf.com/libs/ads/latest/owads.min.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = onOwAdReady;
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!owAd) {
      return;
    }
    async function onWindowStateChanged(
      state: overwolf.windows.WindowStateChangedEvent
    ) {
      const currentWindow = await getCurrentWindow();
      if (currentWindow.id !== state.window_id) {
        return;
      } else {
        console.log(`Window state changed:' ${JSON.stringify(state)}`);
        if (state.window_state_ex === 'minimized') {
          owAd?.removeAd();
        } else if (
          state.window_previous_state_ex === 'minimized' &&
          state.window_state_ex === 'normal'
        ) {
          owAd?.refreshAd({});
        }
      }
    }
    overwolf.windows.onStateChanged.addListener(onWindowStateChanged);
    return () => {
      overwolf.windows.onStateChanged.removeListener(onWindowStateChanged);
    };
  }, [owAd]);
  return <div className={classes.container} ref={containerRef} />;
}

export default Ads;
