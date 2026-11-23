import {useEffect, useRef, type FC} from 'react';

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

interface AdSenseSlotProps {
  label?: string;
  variant?: 'banner' | 'card';
  slotEnvKey?: 'banner' | 'daily';
}

const ADSENSE_SCRIPT_ID = 'formullab-adsense-script';

function ensureAdSenseScript(clientId: string) {
  if (typeof document === 'undefined' || !clientId) return;
  if (document.getElementById(ADSENSE_SCRIPT_ID)) return;

  const script = document.createElement('script');
  script.id = ADSENSE_SCRIPT_ID;
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
  document.head.appendChild(script);
}

export const AdSenseSlot: FC<AdSenseSlotProps> = ({
  label = 'Sponsorlu Alan',
  variant = 'banner',
  slotEnvKey = 'banner',
}) => {
  const clientId = (import.meta.env.VITE_ADSENSE_CLIENT_ID ?? '').trim();
  const rawSlot =
    slotEnvKey === 'daily'
      ? (import.meta.env.VITE_ADSENSE_DAILY_SLOT ?? import.meta.env.VITE_ADSENSE_BANNER_SLOT ?? '')
      : (import.meta.env.VITE_ADSENSE_BANNER_SLOT ?? '');
  const slotId = rawSlot.trim();
  const isLiveAdConfigured = clientId.startsWith('ca-pub-') && /^\d+$/.test(slotId);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!isLiveAdConfigured || pushedRef.current) return;
    ensureAdSenseScript(clientId);
    const frameId = window.requestAnimationFrame(() => {
      if (pushedRef.current) return;
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushedRef.current = true;
      } catch {
        // Ignore if ad blocker or preview CSP prevents execution
      }
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [clientId, isLiveAdConfigured]);

  if (isLiveAdConfigured) {
    return (
      <div
        className={`w-full rounded-xl bg-[#0a2018]/65 border border-emerald-400/15 overflow-hidden ${
          variant === 'card' ? 'min-h-[250px] p-2' : 'min-h-[90px] px-3 py-2'
        }`}
        aria-label="Google AdSense Reklam Alanı"
      >
        <ins
          className="adsbygoogle block w-full"
          style={{display: 'block'}}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div
        className="w-full min-h-[200px] rounded-xl bg-[#0a2018]/75 border border-emerald-400/20 p-5 flex flex-col items-center justify-center text-center gap-2.5"
        aria-label="Google AdSense Günlük Reklam Yerleşimi"
      >
        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/85 border border-emerald-400/25 text-emerald-200/75">
          AD • GÜNLÜK TEK GÖSTERİM
        </span>
        <p className="text-sm font-medium text-emerald-50/85">{label}</p>
        <p className="text-xs text-emerald-100/55 max-w-xs leading-relaxed">
          Google AdSense yayıncı ve reklam birimi kimliği bağlandığında günlük tek geçiş reklamı burada gösterilir.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-xl bg-[#0a2018]/65 border border-emerald-400/15 px-3.5 sm:px-4 py-3 flex items-center justify-between gap-3"
      aria-label="Google AdSense Reklam Yerleşimi"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-400/20 text-emerald-200/65 shrink-0">
          AD
        </span>
        <span className="text-xs text-emerald-100/60 truncate">
          {label} — AdSense uyumlu alan
        </span>
      </div>
      <span className="font-mono text-[10px] text-emerald-200/40 hidden sm:inline shrink-0">
        Responsive
      </span>
    </div>
  );
};
