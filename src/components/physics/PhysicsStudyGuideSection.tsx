import {ChevronDown} from 'lucide-react';
import {useState, type FC, type ReactNode} from 'react';

interface PhysicsGuideTopic {
  id: string;
  badge: string;
  title: string;
  renderContent: () => ReactNode;
}

const SI_FUNDAMENTALS = [
  {qty: 'Kütle (m)', unit: 'Kilogram (kg)', type: 'Skaler'},
  {qty: 'Işık Şiddeti (I)', unit: 'Kandela (cd)', type: 'Skaler'},
  {qty: 'Sıcaklık (T)', unit: 'Kelvin (K)', type: 'Skaler'},
  {qty: 'Akım Şiddeti (i)', unit: 'Amper (A)', type: 'Skaler'},
  {qty: 'Madde Miktarı (n)', unit: 'Mol (mol)', type: 'Skaler'},
  {qty: 'Uzunluk (l)', unit: 'Metre (m)', type: 'Skaler'},
  {qty: 'Zaman (t)', unit: 'Saniye (s)', type: 'Skaler'},
];

const MECHANICS_FORMULAS = [
  {name: 'Düzgün Hızlanan / Yavaşlayan', eq: 'v = v₀ ± at · v² = v₀² ± 2ax'},
  {name: 'Eğik Atış Menzil & Yükseklik', eq: 'h_max = v_y²/(2g) · X = v₀²·sin(2α)/g'},
  {name: 'İtme ve Momentum', eq: 'I = F·Δt = ΔP = m·Δv'},
  {name: 'Merkezcil Kuvvet & Viraj', eq: 'F_m = mv²/r = mω²r · v_yatay = √(grk)'},
  {name: 'Yay ve Basit Sarkaç', eq: 'T_yay = 2π√(m/k) · T_sarkaç = 2π√(L/g)'},
];

const MODERN_FORMULAS = [
  {name: 'Bohr Yarıçap & Enerji', eq: 'r_n = 0,53·n²/Z Å · E_n = −13,6·Z²/n² eV'},
  {name: 'Fotoelektrik Olay', eq: 'E_foton = 12400/λ(Å) = E₀ + e·V_kesme'},
  {name: 'De Broglie & Compton', eq: 'λ = h/(m·v) · Δλ = (h/m_e·c)(1 − cosθ)'},
  {name: 'Çift & Tek Yarık Girişim', eq: 'Δx_çift = Lλ/(d·n) · Δx_tek = Lλ/(w·n)'},
  {name: 'İndüksiyon & Transformatör', eq: 'ε = −N·ΔΦ/Δt · V_p/V_s = N_p/N_s'},
];

const PHYSICS_GUIDE_TOPICS: PhysicsGuideTopic[] = [
  {
    id: 'si-units',
    badge: '1',
    title: '7 Temel Büyüklük (KISA MUZ) ve Türetilmiş Büyüklükler',
    renderContent: () => (
      <div className="space-y-2 text-xs leading-snug text-violet-50/85">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {SI_FUNDAMENTALS.map((item) => (
            <div
              key={item.qty}
              className="rounded-lg bg-[#110a24]/85 border border-violet-400/15 px-2.5 py-2 flex items-center justify-between gap-2"
            >
              <span className="text-white font-medium">{item.qty}</span>
              <span className="font-mono text-violet-300">{item.unit}</span>
            </div>
          ))}
        </div>
        <p className="text-[#B5AECA]">
          <strong className="text-violet-200">ÖSYM Tuzağı:</strong> Kuvvet, ağırlık, hız, ivme,
          momentum ve elektrik alan vektöreldir; enerji, güç, basınç, özkütle, potansiyel ve akım
          şiddeti skalerdir.
        </p>
      </div>
    ),
  },
  {
    id: 'mechanics',
    badge: '2',
    title: 'Mekanik, Atışlar, Momentum ve Çembersel Hareket Formülleri',
    renderContent: () => (
      <div className="space-y-1.5 text-xs leading-snug text-violet-50/85">
        {MECHANICS_FORMULAS.map((item) => (
          <div
            key={item.name}
            className="rounded-lg bg-[#110a24]/85 border border-violet-400/15 px-2.5 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
          >
            <span className="text-white font-medium">{item.name}</span>
            <span className="font-mono text-[11px] text-[#F2D082]">{item.eq}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'heat-pressure',
    badge: '3',
    title: 'Isı–Sıcaklık, Basınç, Bernoulli ve Kaldırma Kuvveti Özeti',
    renderContent: () => (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-snug text-violet-50/85">
        <p>
          <strong className="text-violet-200">Hâl Değişimi &amp; Isı:</strong>{' '}
          <span className="font-mono text-[#F2D082]">Q = m·c·ΔT</span> ve hâl değişiminde{' '}
          <span className="font-mono text-[#F2D082]">Q = m·L</span>. Hâl değişimi sırasında
          sıcaklık (ortalama kinetik enerji) sabit kalır.
        </p>
        <p>
          <strong className="text-violet-200">Kaldırma &amp; Taşma Kabı:</strong> Yüzen ve askıda
          kalan cisimlerde <span className="font-mono text-violet-300">F_k = G_cisim</span> olduğu
          için taşma kabı ağırlaşmaz; yalnızca dibe batan cisimler kabı ağırlaştırır.
        </p>
      </div>
    ),
  },
  {
    id: 'waves-optics',
    badge: '4',
    title: 'Dalgalar ve Optik (Ayna, Mercek, Kırılma ve Renkler)',
    renderContent: () => (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-snug text-violet-50/85">
        <p>
          <strong className="text-violet-200">Hız ve Frekans Kuralı:</strong>{' '}
          <span className="font-mono text-[#F2D082]">v = λ · f</span> eşitliğinde hız (v) yalnızca
          ortama (su derinliği, yay kalınlığı), frekans (f) ise yalnızca kaynağa bağlıdır.
        </p>
        <p>
          <strong className="text-violet-200">Görüntü Özelliği:</strong> Tümsek ayna ve kalın
          kenarlı mercek gerçek cisimlerin görüntüsünü her zaman düz, sanal ve küçük oluşturur.
        </p>
      </div>
    ),
  },
  {
    id: 'em-modern',
    badge: '5',
    title: 'Elektromanyetizma ve Modern Fizik Kritik Formülleri',
    renderContent: () => (
      <div className="space-y-1.5 text-xs leading-snug text-violet-50/85">
        {MODERN_FORMULAS.map((item) => (
          <div
            key={item.name}
            className="rounded-lg bg-[#110a24]/85 border border-violet-400/15 px-2.5 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
          >
            <span className="text-white font-medium">{item.name}</span>
            <span className="font-mono text-[11px] text-[#F2D082]">{item.eq}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export const PhysicsStudyGuideSection: FC<{standalone?: boolean}> = ({standalone = false}) => {
  const [openIds, setOpenIds] = useState<string[]>(['si-units']);

  const toggleTopic = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <article
      id="yks-fizik-rehberi"
      aria-label="YKS Fizik Çalışma Rehberi"
      className={`${standalone ? 'mt-0' : 'mt-6'} phys-panel rounded-2xl p-3.5 sm:p-5 space-y-3`}
    >
      <header className="space-y-1 border-b border-violet-400/15 pb-2.5">
        <h2 className="text-base sm:text-lg font-semibold text-white">
          YKS Fizik Formül Özetleri ve Sınav Rehberi
        </h2>
        <p className="text-xs text-violet-100/70 leading-snug">
          TYT &amp; AYT özet tablolarını ve ÖSYM tuzaklarını açmak için başlıklara dokunun.
        </p>
      </header>

      <div className="space-y-2">
        {PHYSICS_GUIDE_TOPICS.map((topic) => {
          const isOpen = openIds.includes(topic.id);
          const panelId = `phys-guide-panel-${topic.id}`;

          return (
            <div key={topic.id} className="space-y-1.5">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleTopic(topic.id)}
                className={`w-full rounded-xl px-3.5 py-2.5 border flex items-center justify-between gap-2.5 text-left cursor-pointer transition-all ${
                  isOpen
                    ? 'bg-[#25154a] border-violet-400/55 shadow-[0_0_14px_rgba(167,139,250,0.2)] text-white'
                    : 'bg-[#140c29]/85 border-violet-400/20 text-violet-50/90 hover:border-violet-400/45 hover:bg-[#1c1138]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-md font-mono text-xs font-semibold flex items-center justify-center shrink-0 ${
                      isOpen
                        ? 'bg-[#a78bfa] text-[#14092d]'
                        : 'bg-[#0e081f] border border-violet-400/35 text-violet-300'
                    }`}
                  >
                    {topic.badge}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-snug">
                    {topic.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-violet-300 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  className="rounded-xl bg-[#100922]/85 border border-violet-400/20 px-3.5 py-2.5"
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
