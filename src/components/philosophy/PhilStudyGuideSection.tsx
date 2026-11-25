import {BookOpenCheck, ChevronDown} from 'lucide-react';
import {useState, type FC} from 'react';

interface PhilStudyGuideSectionProps {
  standalone?: boolean;
}

const THINKING_AND_LOGIC = [
  {
    name: 'Felsefi Düşüncenin Nitelikleri',
    rule: 'Sorgulayıcı · Eleştirel · Sistemli · Tutarlı · Refleksif (düşünme üzerine yeniden düşünme) · Yığılımlı (kümülatif; ilerlemez, birikir).',
  },
  {
    name: 'Önerme & Akıl Yürütme Biçimleri',
    rule: 'Önerme doğru/yanlış yargı bildirir (soru/emir/dilek önerme değil). Tümdengelim (genel→özel), Tümevarım (özel→genel), Analoji (özel→özel).',
  },
  {
    name: 'Bilginin Doğruluk Ölçütleri (5 Ölçüt)',
    rule: 'Uygunluk (nesneyle uyuşma) · Tutarlılık (çelişmesizlik) · Tümel Uzlaşım (çoğunluk kabulü) · Apaçıılık (açık-seçik, Descartes) · Yarar (Pragmatizm).',
  },
  {
    name: 'Görüş (Argüman) & Çelişiklik',
    rule: 'Sağlam argümanda öncüller sonucu desteklemeli ve tutarlı olmalıdır; Totoloji daima doğru, Çelişki (p ve p değil) daima yanlıştır.',
  },
];

const DISCIPLINES_CHEATSHEET = [
  {
    field: 'Varlık & Bilgi (Ontoloji – Epistemoloji)',
    schools: 'Rasyonalizm (Akıl) · Empirizm (Deney) · Kritisizm (Kant: Akıl+Deney) · Entüisyonizm (Sezgi) · Pragmatizm (Fayda)',
    key: 'Platon (İdealar) · Aristoteles (Madde-Form) · Herakleitos (Oluş) ≠ Parmenides',
  },
  {
    field: 'Bilim Felsefesi',
    schools: 'Ürün Yaklaşımı (Mantıkçı Pozitivizm: Doğrulanabilirlik) · Etkinlik Yaklaşımı (Kuhn: Paradigma)',
    key: 'Karl Popper: Bilimselliğin ölçütü Yanlışlanabilirliktir',
  },
  {
    field: 'Ahlak, Din, Siyaset & Estetik',
    schools: 'Ödev Ahlakı (Kant) · Faydacılık (Bentham/Mill) · Varoluşçuluk (Sartre) · Toplumsal Sözleşme (Hobbes/Locke/Rousseau)',
    key: 'Teizm vs Deizm vs Panteizm vs Panenteizm · Mimesis vs Yaratma Estetiği',
  },
];

const HISTORICAL_ERAS = [
  {
    era: 'MÖ 6.yy – MS 2.yy İlk Çağ & Orta Çağ (2–15.yy)',
    detail:
      'Doğa filozofları (Thales, Herakleitos, Demokritos) → Sofistler & Sokrates → Platon & Aristoteles · Orta Çağ’da Patristik/Skolastik (Augustinus, Anselmus, Aquino) ve İslam Felsefesi (Fârâbî, İbn Sina, Gazâlî, İbn Rüşd).',
  },
  {
    era: '15–17.yy Yeni Çağ & 18–19.yy Aydınlanma',
    detail:
      'Rönesans Hümanizmi → Kartezyen Felsefe (Descartes: Cogito), Spinoza (Panteizm), Bacon (Tümevarım) → Aydınlanma (Locke, Kant: "Aklını kullan!", Rousseau) → 19.yy Hegel (Diyalektik İdealizm), Marx (Diyalektik Materyalizm), Comte (Pozitivizm).',
  },
  {
    era: '20.yy Çağdaş Felsefe & Türkiye’de Felsefe',
    detail:
      'Fenomenoloji (Husserl), Hermeneutik (Gadamer), Varoluşçuluk (Sartre: "Varoluş özden önce gelir"), Mantıksal Analiz (Wittgenstein) · Türkiye: Hasan Ali Yücel, Hilmi Ziya Ülken, Takiyettin Mengüşoğlu, Nurettin Topçu, Aydın Sayılı, İoanna Kuçuradi.',
  },
];

export const PhilStudyGuideSection: FC<PhilStudyGuideSectionProps> = ({standalone = false}) => {
  const [open, setOpen] = useState(standalone);

  const content = (
    <div className="space-y-4">
      <div className="rounded-xl bg-[#101633]/75 border border-indigo-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-indigo-300 font-semibold">
          1. FELSEFİ DÜŞÜNME, AKIL YÜRÜTME &amp; DOĞRULUK ÖLÇÜTLERİ
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {THINKING_AND_LOGIC.map((item) => (
            <div
              key={item.name}
              className="rounded-lg bg-[#090e24]/85 border border-indigo-400/15 px-3 py-2.5"
            >
              <div className="text-xs sm:text-sm font-semibold text-white">{item.name}</div>
              <div className="text-xs text-indigo-100/80 mt-0.5 leading-relaxed">{item.rule}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#101633]/75 border border-indigo-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-indigo-300 font-semibold">
          2. TEMEL FELSEFE DİSİPLİNLERİ &amp; AKIMLAR
        </div>
        <div className="grid grid-cols-1 gap-2">
          {DISCIPLINES_CHEATSHEET.map((row) => (
            <div
              key={row.field}
              className="rounded-lg bg-[#090e24]/85 border border-indigo-400/15 px-3 py-2 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3 text-xs sm:text-sm"
            >
              <span className="font-semibold text-white">{row.field}</span>
              <span className="text-indigo-200/90">{row.schools}</span>
              <span className="text-amber-200/85">{row.key}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#101633]/75 border border-indigo-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-amber-300 font-semibold">
          3. MÖ 6.YY’DAN GÜNÜMÜZE FELSEFE TARİHİ &amp; TÜRKİYE’DE FELSEFE
        </div>
        <div className="grid grid-cols-1 gap-2">
          {HISTORICAL_ERAS.map((item) => (
            <div
              key={item.era}
              className="rounded-lg bg-[#090e24]/85 border border-indigo-400/15 px-3 py-2.5 space-y-1"
            >
              <div className="text-xs sm:text-sm font-semibold text-indigo-200">{item.era}</div>
              <div className="text-xs text-indigo-50/85 leading-relaxed">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (standalone) {
    return (
      <section aria-label="YKS Felsefe Çalışma Rehberi" className="w-full">
        <div className="phil-panel rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-3 pb-1">
            <BookOpenCheck className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                YKS Felsefe Hızlı Çalışma Rehberi
              </h2>
              <p className="text-xs text-indigo-100/75">
                Akıl yürütme, bilgi-varlık-ahlak-bilim disiplinleri ve çağlara göre filozof haritası
              </p>
            </div>
          </div>
          {content}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Felsefe Çalışma Rehberi" className="w-full">
      <div className="phil-panel rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="w-full min-h-[56px] px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-indigo-500/10 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <BookOpenCheck className="w-5 h-5 text-indigo-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-semibold text-white">
                Felsefe Hızlı Çalışma Rehberi
              </div>
              <div className="text-xs text-indigo-100/75 truncate">
                Doğruluk ölçütleri, felsefe disiplinleri ve MÖ 6.yy – 20.yy düşünürleri
              </div>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-indigo-200/75 transition-transform shrink-0 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
        {open && <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-indigo-400/15">{content}</div>}
      </div>
    </section>
  );
};
