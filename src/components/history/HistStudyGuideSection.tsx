import {BookOpenCheck, ChevronDown} from 'lucide-react';
import {useState, type FC} from 'react';

interface HistStudyGuideSectionProps {
  standalone?: boolean;
}

const TURK_ISLAM_TURNING_POINTS = [
  {
    name: '751 Talas & Türk-İslam Başlangıcı',
    rule: 'Karlukların desteğiyle Abbasiler Çin’i yendi; Türkler kitleler hâlinde İslamiyet’e girdi ve kâğıt-matbaa batıya yayıldı.',
  },
  {
    name: 'Selçuklu Üçlüsü: 1040 · 1071 · 1176 · 1243',
    rule: 'Dandanakan (kuruluş) → Malazgirt (Anadolu’nun kapısı, I. Beylikler) → Miryokefalon (kesin yurt) → Kösedağ (Moğol hâkimiyeti, II. Beylikler).',
  },
  {
    name: 'İlk Türklerde Devlet Geleneği',
    rule: 'Kut (kan bağıyla yönetim yetkisi → taht kavgaları) · Kurultay (danışma meclisi) · Töre (yazısız hukuk, kağan da uymak zorunda).',
  },
  {
    name: 'Türk-İslam Eserleri & Alimleri',
    rule: 'Kutadgu Bilig (Yusuf Has Hacib) · Dîvânu Lugâti’t-Türk (Kaşgarlı Mahmut) · Nizamiye Medreseleri · Fârâbî, İbn Sina, Biruni, Cezeri.',
  },
];

const OTTOMAN_MATRIX = [
  {
    era: 'Kuruluş & Yükselme (1299–1579)',
    events: 'Koyunhisar · Edirne (Sazlıdere) · 1402 Ankara (Fetret) · 1453 İstanbul · 1517 Ridaniye (Halifelik) · 1538 Preveze',
    key: 'İskân + İstimalet (hoşgörü) · Devşirme & Tımar · Sancak sistemi',
  },
  {
    era: 'Divan & Toplumsal Yapı',
    events: 'Seyfiye (Sadrazam/Kaptanıderya) · İlmiye (Şeyhülislam/Kazasker/Kadı) · Kalemiye (Nişancı/Defterdar/Reisülküttab)',
    key: 'Millet sistemi (din temelli) · Lonca/Narh · İltizam & Malikâne',
  },
  {
    era: 'Değişim & Demokratikleşme (1699–1918)',
    events: '1699 Karlofça · 1774 Küçük Kaynarca · 1808 Sened-i İttifak · 1839 Tanzimat · 1856 Islahat · 1876 I. Meşrutiyet',
    key: 'Balta Limanı (1838) → Düyûn-ı Umûmiye (1881) · Osmanlıcılık, İslamcılık, Türkçülük',
  },
];

const REPUBLIC_ROADMAP = [
  {
    stage: 'Millî Mücadele Hazırlık (1919–1920)',
    detail:
      'Havza (ilk genelge) → Amasya Genelgesi (gerekçe, amaç, yöntem) → Erzurum (bölgesel kararlar ulusal · manda ilk reddi) → Sivas (bütün cemiyetler Anadolu ve Rumeli Müdafaa-i Hukuk çatısında) → Son Osmanlı Mebusan’da Misak-ı Millî → 23 Nisan 1920 I. TBMM.',
  },
  {
    stage: 'Cepheler & Diplomatik Kapanış',
    detail:
      'Doğu: 15. Kolordu → Gümrü (1920) · Güney: Kuvayı Milliye → Ankara (1921) · Batı: I. İnönü (Teşkilat-ı Esasiye, İstiklal Marşı, Moskova) → Sakarya ("Hattı müdafaa yoktur...") → Büyük Taarruz → Mudanya Ateşkesi → Lozan Barışı (24 Temmuz 1923).',
  },
  {
    stage: 'Atatürk İlkeleri & Çağdaş Dünya',
    detail:
      'Cumhuriyetçilik (TBMM/Saltanat-Halifelik kaldırma) · Milliyetçilik (TTK/TDK/Kabotaj) · Halkçılık (Soyadı/Aşar kaldırma) · Devletçilik (Sümerbank/Beş Yıllık Plan) · Laiklik (Tevhid-i Tedrisat/Medeni Kanun) · İnkılapçılık · II. Dünya Savaşı sonrası Soğuk Savaş, SSCB dağılması (1991).',
  },
];

export const HistStudyGuideSection: FC<HistStudyGuideSectionProps> = ({standalone = false}) => {
  const [open, setOpen] = useState(standalone);

  const content = (
    <div className="space-y-4">
      <div className="rounded-xl bg-[#281208]/75 border border-orange-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-orange-300 font-semibold">
          1. İLK TÜRKLER &amp; TÜRK-İSLAM DÖNÜM NOKTALARI
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TURK_ISLAM_TURNING_POINTS.map((item) => (
            <div
              key={item.name}
              className="rounded-lg bg-[#1a0b04]/85 border border-orange-400/15 px-3 py-2.5"
            >
              <div className="text-xs sm:text-sm font-semibold text-white">{item.name}</div>
              <div className="text-xs text-orange-100/80 mt-0.5 leading-relaxed">{item.rule}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#281208]/75 border border-orange-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-orange-300 font-semibold">
          2. OSMANLI DEVLETİ KLASİK &amp; DEĞİŞİM DÖNEMLERİ
        </div>
        <div className="grid grid-cols-1 gap-2">
          {OTTOMAN_MATRIX.map((row) => (
            <div
              key={row.era}
              className="rounded-lg bg-[#1a0b04]/85 border border-orange-400/15 px-3 py-2 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3 text-xs sm:text-sm"
            >
              <span className="font-semibold text-white">{row.era}</span>
              <span className="text-orange-200/90">{row.events}</span>
              <span className="text-amber-200/85">{row.key}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#281208]/75 border border-orange-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-amber-300 font-semibold">
          3. MİLLÎ MÜCADELE, İNKILAPLAR &amp; ÇAĞDAŞ DÜNYA
        </div>
        <div className="grid grid-cols-1 gap-2">
          {REPUBLIC_ROADMAP.map((item) => (
            <div
              key={item.stage}
              className="rounded-lg bg-[#1a0b04]/85 border border-orange-400/15 px-3 py-2.5 space-y-1"
            >
              <div className="text-xs sm:text-sm font-semibold text-orange-200">{item.stage}</div>
              <div className="text-xs text-orange-50/85 leading-relaxed">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (standalone) {
    return (
      <section aria-label="YKS Tarih Çalışma Rehberi" className="w-full">
        <div className="hist-panel rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-3 pb-1">
            <BookOpenCheck className="w-5 h-5 text-orange-400 shrink-0" />
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                YKS Tarih Hızlı Çalışma Rehberi
              </h2>
              <p className="text-xs text-orange-100/75">
                İlk Türk devletleri, Türk-İslam dönüm noktaları, Osmanlı teşkilatı ve Millî Mücadele kronolojisi
              </p>
            </div>
          </div>
          {content}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Tarih Çalışma Rehberi" className="w-full">
      <div className="hist-panel rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="w-full min-h-[56px] px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-orange-500/10 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <BookOpenCheck className="w-5 h-5 text-orange-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-semibold text-white">
                Tarih Hızlı Çalışma Rehberi
              </div>
              <div className="text-xs text-orange-100/75 truncate">
                Kronoloji taşları, Osmanlı teşkilat sınıfları ve Millî Mücadele antlaşmaları
              </div>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-orange-200/75 transition-transform shrink-0 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
        {open && <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-orange-400/15">{content}</div>}
      </div>
    </section>
  );
};
