import {ChevronDown, Compass} from 'lucide-react';
import {useState, type FC} from 'react';

interface GeoStudyGuideSectionProps {
  standalone?: boolean;
}

const TURKEY_BASICS = [
  {
    name: 'Mutlak Konum (36°–42°K, 26°–45°D)',
    rule: 'Kuzey–güney 666 km · Doğu–batı 76 dk · 45°D (+3) ulusal saat · Gölge hep kuzeye',
  },
  {
    name: 'Türkiye’yi Etkileyen Basınçlar',
    rule: 'Kış: İzlanda DAB (ılık-yağış) & Sibirya TYB (sert ayaz) · Yaz: Asor DYB & Basra TAB (sıcak-kurak)',
  },
  {
    name: 'Yerel Rüzgârlar (KAyıp SaKaL)',
    rule: 'Soğuk: Karayel – Yıldız – Poyraz · Sıcak: Samyeli (Keşişleme) – Kıble – Lodos · Ege: İmbat · Fön: +1 °C/100m',
  },
  {
    name: 'Ege Horst–Graben & Deltalar',
    rule: 'Horst: Kaz-Madra-Yunt-Bozdağlar-Aydın-Menteşe · Delta: Bafra, Çarşamba, Çukurova, Silifke',
  },
];

const CLIMATE_SOIL_PLANTS = [
  {
    climate: 'Akdeniz İklimi',
    soil: 'Terra Rossa (Kırmızı)',
    plant: 'Kızılçam → Maki → Garig',
  },
  {
    climate: 'Karadeniz (Okyanusal)',
    soil: 'Kahverengi Orman / Podzol',
    plant: 'Geniş/İğne Orman → Psödomaki',
  },
  {
    climate: 'Sert Karasal (Erzurum–Kars)',
    soil: 'Çernezyom (Kara Toprak)',
    plant: 'Yaz Yağışlı Alpin Çayırlar',
  },
  {
    climate: 'Ilıman Step (İç Anadolu)',
    soil: 'Kahverengi Step / Halomorfik',
    plant: 'İlkbahar Yağışlı Bozkır',
  },
  {
    climate: 'Ekvatoral & Savan',
    soil: 'Laterit (Yıkanmış)',
    plant: 'Yağmur Ormanı / Uzun Ot (Savan)',
  },
];

const STRAITS_AND_PROJECTS = [
  {
    pair: 'Avrupa → Hint En Kısa Deniz Yolu',
    detail: 'Atlas → Cebelitarık → Akdeniz → Süveyş Kanalı → Kızıldeniz → Babülmendep → Hint Okyanusu',
  },
  {
    pair: 'Basra Petrol & Doğu Asya Kapısı',
    detail: 'Hürmüz Boğazı (Basra Körfezi petrolü) · Malakka Boğazı (Çin/Japonya ↔ Hint Okyanusu)',
  },
  {
    pair: 'Bölgesel Kalkınma Projeleri',
    detail: 'GAP (14 HES, Şanlıurfa pamuk) · KOP (Mavi Tünel su aktarımı) · DOKAP (Yeşil Yol, çay/fındık) · DAP (hayvancılık)',
  },
  {
    pair: 'Türkiye Maden & Enerji Noktaları',
    detail: 'Bor (%73 Kırka/Emet) · Demir (Divriği/Hekimhan) · Bakır (Murgul/Küre) · Taş Kömürü (Zonguldak) · Petrol (Batman)',
  },
  {
    pair: 'Çevre Antlaşmaları & UNESCO',
    detail: 'Ramsar (Sulak Alan) · Montreal (Ozon/CFC) · Paris (2053 Net Sıfır) · Karma UNESCO: Kapadokya & Pamukkale',
  },
];

export const GeoStudyGuideSection: FC<GeoStudyGuideSectionProps> = ({standalone = false}) => {
  const [open, setOpen] = useState(standalone);

  const content = (
    <div className="space-y-4">
      <div className="rounded-xl bg-[#211408]/75 border border-amber-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-amber-300 font-semibold">
          1. TÜRKİYE KONUMU, RÜZGÂRLAR VE YER ŞEKİLLERİ
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TURKEY_BASICS.map((item) => (
            <div
              key={item.name}
              className="rounded-lg bg-[#160e06]/85 border border-amber-400/15 px-3 py-2.5"
            >
              <div className="text-xs sm:text-sm font-semibold text-white">{item.name}</div>
              <div className="text-xs text-amber-200/80 mt-0.5 leading-relaxed">{item.rule}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#211408]/75 border border-amber-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-amber-300 font-semibold">
          2. İKLİM · TOPRAK · BİTKİ ÖRTÜSÜ EŞLEŞTİRMESİ
        </div>
        <div className="grid grid-cols-1 gap-2">
          {CLIMATE_SOIL_PLANTS.map((row) => (
            <div
              key={row.climate}
              className="rounded-lg bg-[#160e06]/85 border border-amber-400/15 px-3 py-2 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3 text-xs sm:text-sm"
            >
              <span className="font-semibold text-white">{row.climate}</span>
              <span className="font-mono text-amber-300">{row.soil}</span>
              <span className="text-amber-100/80">{row.plant}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#211408]/75 border border-amber-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-orange-300 font-semibold">
          3. BOĞAZLAR, PROJELER, MADENLER VE ÇEVRE SÖZLEŞMELERİ
        </div>
        <div className="grid grid-cols-1 gap-2">
          {STRAITS_AND_PROJECTS.map((item) => (
            <div
              key={item.pair}
              className="rounded-lg bg-[#160e06]/85 border border-amber-400/15 px-3 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4"
            >
              <span className="text-xs sm:text-sm font-semibold text-amber-200 shrink-0">
                {item.pair}
              </span>
              <span className="text-xs text-amber-50/85 leading-relaxed">{item.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (standalone) {
    return (
      <section aria-label="YKS Coğrafya Çalışma Rehberi" className="w-full">
        <div className="geo-panel rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-3 pb-1">
            <Compass className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                YKS Coğrafya Hızlı Çalışma Rehberi
              </h2>
              <p className="text-xs text-amber-100/70">
                TYT &amp; AYT konum, iklim–toprak–bitki, su yolları, madenler ve projeler özeti
              </p>
            </div>
          </div>
          {content}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Coğrafya Çalışma Rehberi" className="w-full">
      <div className="geo-panel rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="w-full min-h-[56px] px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-amber-500/10 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Compass className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-semibold text-white">
                Coğrafya Hızlı Çalışma Rehberi
              </div>
              <div className="text-xs text-amber-100/70 truncate">
                Türkiye konumu, rüzgârlar, su yolları ve kalkınma projeleri
              </div>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-amber-200/75 transition-transform shrink-0 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
        {open && <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-amber-400/15">{content}</div>}
      </div>
    </section>
  );
};
