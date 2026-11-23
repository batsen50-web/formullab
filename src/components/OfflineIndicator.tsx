import {WifiOff} from 'lucide-react';
import {useEffect, useState, type FC} from 'react';

export const OfflineIndicator: FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 px-3.5 py-2 rounded-xl bg-[#322408]/95 border border-[#e38e40]/60 text-[#f7dca1] text-xs font-mono flex items-center gap-2 shadow-xl backdrop-blur-md whitespace-nowrap"
    >
      <WifiOff className="w-3.5 h-3.5 text-[#f2c45a]" />
      <span>Çevrimdışı Mod — Önbellek kullanılıyor</span>
    </div>
  );
};
