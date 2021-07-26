import { useEffect, useRef } from 'react';
import classes from './Ads.module.css';

function Ads(): JSX.Element {
  const adsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onOwAdReady() {
      if (
        typeof window.OwAd === 'undefined' ||
        adsContainerRef.current === null
      ) {
        return;
      }
      new window.OwAd(adsContainerRef.current, {
        size: { width: 400, height: 300 },
      });
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
  return <div className={classes.adsContainer} ref={adsContainerRef}></div>;
}

export default Ads;
