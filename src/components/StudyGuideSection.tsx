import {ChevronDown} from 'lucide-react';
import {useState, type FC, type ReactNode} from 'react';
import {FormulaText} from './FormulaText';

const COMMON_EXAM_HIGHLIGHTS = [
  {formula: 'H_2SO_4', common: 'Zaç Yağı', systematic: 'Sülfürik asit'},
  {formula: 'HNO_3', common: 'Kezzap', systematic: 'Nitrik asit'},
  {formula: 'HCl', common: 'Tuz Ruhu', systematic: 'Hidrojen klorür'},
  {formula: 'CH_3COOH', common: 'Sirke Asidi', systematic: 'Asetik asit'},
  {formula: 'NaOH', common: 'Sud Kostik', systematic: 'Sodyum hidroksit'},
  {formula: 'KOH', common: 'Potas Kostik', systematic: 'Potasyum hidroksit'},
  {formula: 'CaCO_3', common: 'Kireç Taşı', systematic: 'Kalsiyum karbonat'},
  {formula: 'NH_3', common: 'Amonyak', systematic: 'Trihidrojen mononitrür'},
];

const LATIN_PREFIXES = [
  {count: '1', prefix: 'mono-', example: 'CO'},
  {count: '2', prefix: 'di-', example: 'CO₂'},
  {count: '3', prefix: 'tri-', example: 'SO₃'},
  {count: '4', prefix: 'tetra-', example: 'CCl₄'},
  {count: '5', prefix: 'penta-', example: 'PCl₅'},
  {count: '6', prefix: 'hekza-', example: 'SF₆'},
];

const ORGANIC_FUNCTIONAL_GROUPS = [
  {group: 'Alkol (-OH)', suffix: '-ol', formula: 'C_2H_5OH', example: 'Etanol'},
  {group: 'Aldehit (-CHO)', suffix: '-al', formula: 'HCHO', example: 'Formaldehit'},
  {group: 'Keton (-CO-)', suffix: '-on', formula: 'CH_3COCH_3', example: 'Aseton'},
  {group: 'Karboksilik Asit (-COOH)', suffix: '-oik asit', formula: 'CH_3COOH', example: 'Sirke asidi'},
  {group: 'Eter (R-O-R)', suffix: 'alkoksi-', formula: 'CH_3OCH_3', example: 'Dimetil eter'},
  {group: 'Ester (-COO-)', suffix: '-oat', formula: 'CH_3COOCH_3', example: 'Metil etanoat'},
  {group: 'Amin (-NH₂)', suffix: '-amin', formula: 'CH_3NH_2', example: 'Metilamin'},
  {group: 'Aromatik (Fenol)', suffix: 'benzen-OH', formula: 'C_6H_5OH', example: 'Fenol'},
];

interface GuideTopic {
  id: string;
  badge: string;
  title: string;
  renderContent: () => ReactNode;
}

const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: 'ionic',
    badge: '1',
    title: 'İyonik Bileşiklerde Çaprazlama ve Stock Sistemi',
    renderContent: () => (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-snug text-emerald-50/85">
        <p>
          İyonik bileşikler katyon (metal veya <span className="font-mono text-emerald-200">NH₄⁺</span>) ile
          anyonun toplam yükü sıfır olacak şekilde birleşir; yüklerin mutlak değerleri çaprazlanır ve
          mümkünse sadeleştirilir.
        </p>
        <p className="text-[#A7B2AC]">
          <strong className="text-emerald-200">ÖSYM Uyarısı:</strong> Fe, Cu, Sn, Pb gibi değişken değerlikli
          metallerde katyon yükü Romen rakamıyla okunur: örneğin{' '}
          <FormulaText formula="Fe_2O_3" /> → <em>Demir(III) oksit</em>.
        </p>
      </div>
    ),
  },
  {
    id: 'covalent',
    badge: '2',
    title: 'Kovalent Bileşiklerde Latince Sayı Önekleri',
    renderContent: () => (
      <div className="space-y-2 text-xs sm:text-[13px] leading-snug text-emerald-50/85">
        <p>
          Ametal–ametal bileşiklerinde atom sayısı Latince öneklerle okunur. İlk ametal 1 ise{' '}
          <em>mono</em> söylenmez; ikinci ametalde her sayı mutlaka okunur.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1 pt-0.5 text-xs text-emerald-100/80">
          {LATIN_PREFIXES.map((item) => (
            <div key={item.count}>
              <span className="font-mono text-emerald-300">{item.count}:</span> {item.prefix}{' '}
              <span className="text-[#8fb3a4]">({item.example})</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'common',
    badge: '3',
    title: 'TYT Kimyada En Sık Sorulan Geleneksel (Yaygın) Adlar',
    renderContent: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {COMMON_EXAM_HIGHLIGHTS.map((item) => (
          <div
            key={item.common}
            className="rounded-lg bg-[#0b231b]/85 border border-emerald-400/15 px-2.5 py-1.5 flex items-center justify-between gap-2 text-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-semibold text-[#F2D082] min-w-[60px] shrink-0">
                <FormulaText formula={item.formula} />
              </span>
              <span className="text-white font-medium truncate">{item.common}</span>
            </div>
            <span className="text-[11px] text-[#8fb3a4] truncate shrink-0">{item.systematic}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'organic',
    badge: '4',
    title: 'Organik Fonksiyonel Gruplar ve Hızlı Formül Kartları',
    renderContent: () => (
      <div className="space-y-2 text-xs leading-snug text-emerald-50/85">
        <p>
          AYT organik kimyada molekülün sınıfını ve IUPAC son ekini belirleyen temel fonksiyonel
          gruplar ile sınavlarda sık çıkan kısa formül örnekleri:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {ORGANIC_FUNCTIONAL_GROUPS.map((item) => (
            <div
              key={item.group}
              className="rounded-lg bg-[#0b231b]/85 border border-emerald-400/15 px-2.5 py-1.5 flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <div className="text-white font-medium truncate">{item.group}</div>
                <div className="text-[11px] text-[#8fb3a4] truncate">
                  Ek: <span className="font-mono text-emerald-300">{item.suffix}</span> • {item.example}
                </div>
              </div>
              <span className="font-semibold text-[#F2D082] text-xs shrink-0">
                <FormulaText formula={item.formula} />
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'faq',
    badge: '5',
    title: 'Çalışma Yöntemi ve Sıkça Sorulan Sorular',
    renderContent: () => (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-snug text-emerald-50/85">
        <p>
          <strong className="text-emerald-200">Hangi sırayla çalışmalıyım?</strong> Önce <em>Kritik</em>{' '}
          filtresindeki 49 öncelikli ÖSYM bileşiğini çöz, ardından hatalarını <em>Yanlışlarım</em>{' '}
          havuzundan tekrar ederek kalıcı hale getir.
        </p>
        <p>
          <strong className="text-emerald-200">Çevrimdışı çalışır mı?</strong> Evet. formullab bir PWA
          uygulamasıdır; ana ekrana eklediğinde internet olmadan da test, sözlük ve iyon laboratuvarını
          kullanabilirsin.
        </p>
      </div>
    ),
  },
];

export const StudyGuideSection: FC<{standalone?: boolean}> = ({standalone = false}) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleTopic = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <article
      id="yks-kimya-rehberi"
      aria-label="YKS Kimya Adlandırma ve Çalışma Rehberi"
      className={`${standalone ? 'mt-0' : 'mt-6'} lab-panel rounded-2xl p-3.5 sm:p-5 space-y-3`}
    >
      <header className="space-y-1 border-b border-emerald-400/15 pb-2.5">
        <h2 className="text-base sm:text-lg font-semibold text-white">
          YKS Kimya Bileşik Adlandırma ve Sınav Rehberi
        </h2>
        <p className="text-xs text-emerald-100/70 leading-snug">
          Kuralları açmak için konu başlığı baloncuklarına dokunun.
        </p>
      </header>

      <div className="space-y-2">
        {GUIDE_TOPICS.map((topic) => {
          const isOpen = openIds.includes(topic.id);
          const panelId = `guide-panel-${topic.id}`;

          return (
            <div key={topic.id} className="space-y-1.5">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleTopic(topic.id)}
                className={`w-full rounded-2xl sm:rounded-full px-3.5 py-2.5 border flex items-center justify-between gap-2.5 text-left cursor-pointer transition-all ${
                  isOpen
                    ? 'bg-[#143d2d] border-emerald-400/55 shadow-[0_0_14px_rgba(52,211,153,0.18)] text-white'
                    : 'bg-[#0c261d]/85 border-emerald-400/20 text-emerald-50/90 hover:border-emerald-400/45 hover:bg-[#103226]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-full font-mono text-xs font-semibold flex items-center justify-center shrink-0 ${
                      isOpen
                        ? 'bg-[#34d399] text-[#052016]'
                        : 'bg-[#091d16] border border-emerald-400/35 text-emerald-300'
                    }`}
                  >
                    {topic.badge}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-snug">
                    {topic.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-emerald-300 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  className="rounded-xl bg-[#091f17]/85 border border-emerald-400/20 px-3.5 py-2.5"
                >
                  {topic.renderContent()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
};
