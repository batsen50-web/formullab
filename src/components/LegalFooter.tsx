import {X} from 'lucide-react';
import {useEffect, useState, type FC} from 'react';

export {AdSenseSlot} from './AdSenseSlot';

type LegalDocKey = 'about' | 'privacy' | 'contact';

const CONTACT_EMAIL = 'batsen50@gmail.com';

const LEGAL_CONTENT: Record<LegalDocKey, {title: string; body: string[]; email?: string}> = {
  about: {
    title: 'Hakkımızda',
    body: [
      'formullab, YKS (TYT ve AYT) sınavlarına hazırlanan öğrencilerin kimyasal bileşik formüllerini, yaygın adları, iyon çaprazlama mantığını, sistematik adlandırma kurallarını ve bağ türlerini hızlı ve kalıcı biçimde tekrar edebilmesi için tasarlanmış etkileşimli bir çalışma aracıdır.',
      'İçerik havuzumuz MEBİ TYT ve AYT Kimya müfredatındaki 81 temel bileşik ve 49 yüksek öncelikli ÖSYM kritik kazanımından oluşmaktadır.',
    ],
  },
  privacy: {
    title: 'Gizlilik Politikası ve Çerezler',
    body: [
      'formullab, kullanıcı hesabı veya sunucu taraflı kişisel veri kaydı tutmaz. Favori bileşikleriniz, hata bankası ve test doğru/yanlış istatistikleriniz yalnızca kendi tarayıcınızın yerel depolama alanında (localStorage) saklanır.',
      'Sözlük sekmesindeki Sıfırla aracını kullanarak test istatistiklerinizi dilediğiniz zaman temizleyebilirsiniz.',
      'Google AdSense ve Üçüncü Taraf Çerezleri: Bu sitede yayınlanacak reklamlarda Google dahil üçüncü taraf satıcılar, kullanıcının bu web sitesine veya diğer web sitelerine yaptığı önceki ziyaretlere dayalı olarak reklam sunmak için çerezler (örneğin DoubleClick / DART çerezi) kullanabilir. Kullanıcılar Google Reklam Ayarları (adssettings.google.com) üzerinden kişiselleştirilmiş reklamcılığı diledikleri zaman devre dışı bırakabilir.',
    ],
  },
  contact: {
    title: 'İletişim',
    body: [
      'Kimya müfredatına eklenmesini istediğiniz bileşik önerileri, içerik geri bildirimleri veya teknik destek talepleri için bize e-posta aracılığıyla ulaşabilirsiniz.',
    ],
    email: CONTACT_EMAIL,
  },
};

export const LegalFooter: FC = () => {
  const [activeDoc, setActiveDoc] = useState<LegalDocKey | null>(null);

  useEffect(() => {
    if (!activeDoc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDoc(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeDoc]);

  return (
    <>
      <footer className="mt-6 pt-4 pb-2 border-t border-emerald-400/10 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs text-emerald-100/45">
        <span className="font-mono">© {new Date().getFullYear()} formullab • YKS Kimya</span>
        <nav aria-label="Yasal Bilgiler" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <button
            type="button"
            onClick={() => setActiveDoc('about')}
            className="min-h-[40px] sm:min-h-[32px] px-1.5 flex items-center hover:text-emerald-200 transition-colors cursor-pointer"
          >
            Hakkımızda
          </button>
          <button
            type="button"
            onClick={() => setActiveDoc('privacy')}
            className="min-h-[40px] sm:min-h-[32px] px-1.5 flex items-center hover:text-emerald-200 transition-colors cursor-pointer"
          >
            Gizlilik Politikası
          </button>
          <button
            type="button"
            onClick={() => setActiveDoc('contact')}
            aria-label="İletişim"
            className="min-h-[40px] sm:min-h-[32px] px-1.5 flex items-center hover:text-emerald-200 transition-colors cursor-pointer"
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
            className="w-full sm:max-w-md lab-panel rounded-t-2xl sm:rounded-xl border border-emerald-400/30 p-5 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-emerald-200/25 mx-auto mb-3 sm:hidden" aria-hidden="true" />
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-emerald-400/15">
              <h2 id="legal-modal-title" className="text-base font-semibold text-white">
                {LEGAL_CONTENT[activeDoc].title}
              </h2>
              <button
                type="button"
                onClick={() => setActiveDoc(null)}
                aria-label="Kapat"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-emerald-100/70 hover:text-white hover:bg-emerald-500/15 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-emerald-50/85 leading-relaxed">
              {LEGAL_CONTENT[activeDoc].body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {LEGAL_CONTENT[activeDoc].email && (
                <p className="pt-1 font-mono text-emerald-300">
                  E-posta:{' '}
                  <a
                    href={`mailto:${LEGAL_CONTENT[activeDoc].email}`}
                    className="underline underline-offset-4 hover:text-emerald-200 break-all"
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
