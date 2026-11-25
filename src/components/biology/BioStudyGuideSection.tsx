import {ChevronDown} from 'lucide-react';
import {useState, type FC, type ReactNode} from 'react';

interface BioGuideTopic {
  id: string;
  badge: string;
  title: string;
  renderContent: () => ReactNode;
}

const ORGANELLE_GROUPS = [
  {type: 'Zarsız', items: 'Ribozom, Sentrozom'},
  {type: 'Tek Zarlı', items: 'ER, Golgi, Lizozom, Koful, Peroksizom'},
  {type: 'Çift Zarlı (DNA + Ribozomlu)', items: 'Mitokondri, Plastikler (Kloroplast, Kromoplast, Lökoplast)'},
];

const METABOLISM_COMPARE = [
  {process: 'Glikoliz', where: 'Sitoplazma', output: 'Net 2 ATP, 2 NADH, 2 Pirüvat'},
  {process: 'Krebs Döngüsü', where: 'Mitokondri Matriksi', output: '2 ATP, 6 NADH, 2 FADH₂, CO₂'},
  {process: 'Oksidatif ETS', where: 'Krista (İç Zar)', output: 'O₂ son alıcı, ~28 ATP + H₂O'},
  {process: 'Işığa Bağımlı Evre', where: 'Tilakoit Zar', output: 'ATP, NADPH, O₂ (Fotoliz)'},
  {process: 'Calvin Döngüsü', where: 'Stroma', output: 'CO₂ + ATP + NADPH → Glikoz'},
];

const HORMONE_HIGHLIGHTS = [
  {hormone: 'İnsülin (Pankreas)', effect: 'Kan şekeri ↓ · Glikoz hücreye girer'},
  {hormone: 'Glukagon (Pankreas)', effect: 'Kan şekeri ↑ · Karaciğer glikojeni yıkılır'},
  {hormone: 'ADH (Hipotalamus → Arka Hipofiz)', effect: 'Böbrekte su geri emilimi ↑ · İdrar derişik'},
  {hormone: 'Kalsitonin / Parathormon', effect: 'Kalsitonin kan Ca²⁺ ↓ · PTH kan Ca²⁺ ↑'},
  {hormone: 'Tiroksin (Tiroid)', effect: 'Metabolizma hızı ↑ · İyot içerir'},
  {hormone: 'Aldosteron (Böbrek Üstü Kabuk)', effect: 'Na⁺ geri emilimi ↑, K⁺ atılımı ↑'},
];

const BIO_GUIDE_TOPICS: BioGuideTopic[] = [
  {
    id: 'organelles',
    badge: '1',
    title: 'Organellerin Zar Yapısı ve ÖSYM İstisnaları',
    renderContent: () => (
      <div className="space-y-2 text-xs sm:text-[13px] leading-snug text-sky-50/85">
        <div className="space-y-1.5">
          {ORGANELLE_GROUPS.map((row) => (
            <div
              key={row.type}
              className="rounded-lg bg-[#081d2b]/85 border border-sky-400/15 px-2.5 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
            >
              <span className="font-mono text-sky-300 font-semibold">{row.type}</span>
              <span className="text-white">{row.items}</span>
            </div>
          ))}
        </div>
        <p className="text-[#A7B2AC]">
          <strong className="text-sky-200">ÖSYM Uyarısı:</strong> Prokaryotlarda yalnızca ribozom
          vardır. Yüksek yapılı bitkilerde sentrozom ve lizozom bulunmaz; olgun memeli alyuvarında ise
          çekirdek ve tüm organeller kaybolur.
        </p>
      </div>
    ),
  },
  {
    id: 'transport',
    badge: '2',
    title: 'Hücre Zarından Madde Geçişleri ve Ozmoz Kuralları',
    renderContent: () => (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-snug text-sky-50/85">
        <p>
          <strong className="text-sky-200">Pasif Taşıma (Difüzyon / Ozmoz):</strong> Çok yoğundan az
          yoğuna ATP harcanmadan gerçekleşir; canlı ve cansız ortamlarda görülür.
        </p>
        <p>
          <strong className="text-sky-200">Aktif Taşıma & Endositoz / Ekzositoz:</strong> ATP ve
          enzim harcanır, yalnızca canlı hücrelerde gerçekleşir. Çeperli bitki hücreleri endositoz
          yapamaz ama ekzositozla salgı/reçine atabilir.
        </p>
      </div>
    ),
  },
  {
    id: 'metabolism',
    badge: '3',
    title: 'Hücresel Solunum ve Fotosentez Karşılaştırma Özeti',
    renderContent: () => (
      <div className="space-y-2 text-xs leading-snug text-sky-50/85">
        <div className="grid grid-cols-1 gap-1.5">
          {METABOLISM_COMPARE.map((item) => (
            <div
              key={item.process}
              className="rounded-lg bg-[#081d2b]/85 border border-sky-400/15 px-2.5 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
            >
              <div className="min-w-0">
                <span className="text-white font-medium">{item.process}</span>
                <span className="text-sky-200/70 ml-2">({item.where})</span>
              </div>
              <span className="font-mono text-[11px] text-[#F2D082] shrink-0">{item.output}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'dogma',
    badge: '4',
    title: 'Santral Dogma (DNA → mRNA → Protein) Hesaplama Kuralları',
    renderContent: () => (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-snug text-sky-50/85">
        <p>
          DNA replikasyonu yalnızca hücre bölüneceği zaman gerçekleşir; transkripsiyon ve translasyon
          ise hücre yaşamı boyunca sürekli devam edebilir.
        </p>
        <p className="text-[#A7B2AC]">
          <strong className="text-sky-200">Kodon Hesabı:</strong> n amino asitlik bir polipeptit
          sentezinde kalıp mRNA’da en az <span className="font-mono text-sky-300">n + 1</span> kodon
          (1 durdurma kodonu dahil), oluşan bağ sayısı ise{' '}
          <span className="font-mono text-sky-300">n − 1</span> peptit bağıdır.
        </p>
      </div>
    ),
  },
  {
    id: 'hormones',
    badge: '5',
    title: 'İnsan Fizyolojisinde Kritik Hormonlar ve Sınav Tuzakları',
    renderContent: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
        {HORMONE_HIGHLIGHTS.map((item) => (
          <div
            key={item.hormone}
            className="rounded-lg bg-[#081d2b]/85 border border-sky-400/15 px-2.5 py-2 space-y-0.5"
          >
            <div className="text-white font-medium">{item.hormone}</div>
            <div className="text-[11px] text-sky-200/70">{item.effect}</div>
          </div>
        ))}
      </div>
    ),
  },
];

export const BioStudyGuideSection: FC<{standalone?: boolean}> = ({standalone = false}) => {
  const [openIds, setOpenIds] = useState<string[]>(['organelles']);

  const toggleTopic = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <article
      id="yks-biyoloji-rehberi"
      aria-label="YKS Biyoloji Çalışma Rehberi"
      className={`${standalone ? 'mt-0' : 'mt-6'} bio-panel rounded-2xl p-3.5 sm:p-5 space-y-3`}
    >
      <header className="space-y-1 border-b border-sky-400/15 pb-2.5">
        <h2 className="text-base sm:text-lg font-semibold text-white">
          YKS Biyoloji Özet Tabloları ve Sınav Rehberi
        </h2>
        <p className="text-xs text-sky-100/70 leading-snug">
          Konu özetlerini ve ÖSYM tuzaklarını açmak için başlıklara dokunun.
        </p>
      </header>

      <div className="space-y-2">
        {BIO_GUIDE_TOPICS.map((topic) => {
          const isOpen = openIds.includes(topic.id);
          const panelId = `bio-guide-panel-${topic.id}`;

          return (
            <div key={topic.id} className="space-y-1.5">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleTopic(topic.id)}
                className={`w-full rounded-xl px-3.5 py-2.5 border flex items-center justify-between gap-2.5 text-left cursor-pointer transition-all ${
                  isOpen
                    ? 'bg-[#10364c] border-sky-400/55 shadow-[0_0_14px_rgba(56,189,248,0.18)] text-white'
                    : 'bg-[#09202e]/85 border-sky-400/20 text-sky-50/90 hover:border-sky-400/45 hover:bg-[#0d2c3f]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-md font-mono text-xs font-semibold flex items-center justify-center shrink-0 ${
                      isOpen
                        ? 'bg-[#38bdf8] text-[#031926]'
                        : 'bg-[#071822] border border-sky-400/35 text-sky-300'
                    }`}
                  >
                    {topic.badge}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-snug">
                    {topic.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-sky-300 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  className="rounded-xl bg-[#071a26]/85 border border-sky-400/20 px-3.5 py-2.5"
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
