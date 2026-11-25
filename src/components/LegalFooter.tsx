import {X} from 'lucide-react';
import {useEffect, useState, type FC} from 'react';
import type {ScreenMode} from '../types/biology';


type LegalDocKey = 'about' | 'privacy' | 'contact';

const CONTACT_EMAIL = 'batsen50@gmail.com';

const LEGAL_CONTENT: Record<LegalDocKey, {title: string; body: string[]; email?: string}> = {
  about: {
    title: 'Hakkımızda',
    body: [
      'formullab, YKS (TYT ve AYT) sınavlarına hazırlanan öğrencilerin Kimya, Biyoloji, Fizik, Coğrafya, Türkçe & Edebiyat, Tarih, Din Kültürü ve Felsefe kazanımlarını etkileşimli testler, laboratuvar simülasyonları ve kavram sözlükleriyle hızlı ve kalıcı biçimde tekrar edebilmesi için tasarlanmış etkileşimli bir çalışma platformudur.',
      'İçerik havuzumuz MEB TYT ve AYT müfredatındaki 81 kimya bileşiği, 80 biyoloji kavramı + 40 YKS sorusu, 80 fizik yasa/formülü + 40 YKS sorusu, 80 coğrafya kavramı + 40 YKS sorusu, 100 Türkçe & Edebiyat kavramı + 80 YKS sorusu ile Tarih, Din Kültürü ve Felsefe derslerinin her birinde 75 kavram + 50 YKS sorusundan oluşmaktadır.',
    ],
  },
  privacy: {
    title: 'Gizlilik Politikası ve Çerezler',
    body: [
      'formullab, kullanıcı hesabı veya sunucu taraflı kişisel veri kaydı tutmaz. Favorileriniz, hata bankası ve test doğru/yanlış istatistikleriniz yalnızca kendi tarayıcınızın yerel depolama alanında (localStorage) saklanır.',
      'Sözlük sekmesindeki Sıfırla aracını kullanarak test istatistiklerinizi dilediğiniz zaman temizleyebilirsiniz.',
      'Reklam ve Üçüncü Taraf Çerezleri: Bu sitede yayınlanan reklamlarda üçüncü taraf reklam ağı (Monetag) çerezler veya benzeri teknolojiler kullanabilir. Kullanıcılar tarayıcı ayarları üzerinden çerez tercihlerini diledikleri zaman yönetebilir.',
    ],
  },
  contact: {
    title: 'İletişim',
    body: [
      'Kimya, Biyoloji, Fizik, Coğrafya, Türkçe & Edebiyat, Tarih, Din Kültürü ve Felsefe müfredatına eklenmesini istediğiniz konu/kavram önerileri, içerik geri bildirimleri veya teknik destek talepleri için bize e-posta aracılığıyla ulaşabilirsiniz.',
    ],
    email: CONTACT_EMAIL,
  },
};

export const LegalFooter: FC<{theme?: ScreenMode}> = ({theme = 'chemistry'}) => {
  const [activeDoc, setActiveDoc] = useState<LegalDocKey | null>(null);

  useEffect(() => {
    if (!activeDoc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDoc(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeDoc]);

  const footerBorder =
    theme === 'home'
      ? 'border-zinc-800 text-zinc-400'
      : theme === 'biology'
        ? 'border-sky-400/15 text-sky-100/50'
        : theme === 'physics'
          ? 'border-violet-400/15 text-violet-100/50'
          : theme === 'geography'
            ? 'border-amber-400/15 text-amber-100/55'
            : theme === 'literature'
              ? 'border-rose-400/15 text-rose-100/55'
              : theme === 'history'
                ? 'border-orange-400/15 text-orange-100/55'
                : theme === 'religion'
                  ? 'border-teal-400/15 text-teal-100/55'
                  : theme === 'philosophy'
                    ? 'border-indigo-400/15 text-indigo-100/55'
                    : 'border-emerald-400/10 text-emerald-100/45';

  const linkHover =
    theme === 'home'
      ? 'hover:text-zinc-200'
      : theme === 'biology'
        ? 'hover:text-sky-200'
        : theme === 'physics'
          ? 'hover:text-violet-200'
          : theme === 'geography'
            ? 'hover:text-amber-200'
            : theme === 'literature'
              ? 'hover:text-rose-200'
              : theme === 'history'
                ? 'hover:text-orange-200'
                : theme === 'religion'
                  ? 'hover:text-teal-200'
                  : theme === 'philosophy'
                    ? 'hover:text-indigo-200'
                    : 'hover:text-emerald-200';

  const subjectLabel =
    theme === 'biology'
      ? 'YKS Biyoloji'
      : theme === 'physics'
        ? 'YKS Fizik'
        : theme === 'geography'
          ? 'YKS Coğrafya'
          : theme === 'literature'
            ? 'YKS Türkçe & Edebiyat'
            : theme === 'history'
              ? 'YKS Tarih'
              : theme === 'religion'
                ? 'YKS Din Kültürü'
                : theme === 'philosophy'
                  ? 'YKS Felsefe'
                  : theme === 'chemistry'
                    ? 'YKS Kimya'
                    : 'YKS Sayısal & Sözel';

  const modalPanelClass =
    theme === 'home'
      ? 'home-panel'
      : theme === 'biology'
        ? 'bio-panel'
        : theme === 'physics'
          ? 'phys-panel'
          : theme === 'geography'
            ? 'geo-panel'
            : theme === 'literature'
              ? 'lit-panel'
              : theme === 'history'
                ? 'hist-panel'
                : theme === 'religion'
                  ? 'rel-panel'
                  : theme === 'philosophy'
                    ? 'phil-panel'
                    : 'lab-panel';

  return (
    <>
      <footer
        className={`mt-6 pt-4 pb-2 border-t flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs ${footerBorder}`}
      >
        <span className="font-mono">
          © {new Date().getFullYear()} formullab · {subjectLabel}
        </span>
        <nav aria-label="Yasal Bilgiler" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <button
            type="button"
            onClick={() => setActiveDoc('about')}
            className={`min-h-[40px] sm:min-h-[32px] px-1.5 flex items-center transition-colors cursor-pointer ${linkHover}`}
          >
            Hakkımızda
          </button>
          <button
            type="button"
            onClick={() => setActiveDoc('privacy')}
            className={`min-h-[40px] sm:min-h-[32px] px-1.5 flex items-center transition-colors cursor-pointer ${linkHover}`}
          >
            Gizlilik Politikası
          </button>
          <button
            type="button"
            onClick={() => setActiveDoc('contact')}
            aria-label="İletişim"
            className={`min-h-[40px] sm:min-h-[32px] px-1.5 flex items-center transition-colors cursor-pointer ${linkHover}`}
          >
            İletişim
          </button>
        </nav>
      </footer>

      {activeDoc && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setActiveDoc(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <div
            className={`w-full sm:max-w-md rounded-t-2xl sm:rounded-xl p-5 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-6 shadow-2xl max-h-[90vh] overflow-y-auto ${modalPanelClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-white/25 mx-auto mb-3 sm:hidden" aria-hidden="true" />
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
              <h2 id="legal-modal-title" className="text-base font-semibold text-white">
                {LEGAL_CONTENT[activeDoc].title}
              </h2>
              <button
                type="button"
                onClick={() => setActiveDoc(null)}
                aria-label="Kapat"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-white/85 leading-relaxed">
              {LEGAL_CONTENT[activeDoc].body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {LEGAL_CONTENT[activeDoc].email && (
                <p className="pt-1 font-mono text-sky-300">
                  E-posta:{' '}
                  <a
                    href={`mailto:${LEGAL_CONTENT[activeDoc].email}`}
                    className="underline underline-offset-4 hover:text-white break-all"
                  >
                    {LEGAL_CONTENT[activeDoc].email}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
