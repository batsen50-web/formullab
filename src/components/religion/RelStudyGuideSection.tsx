import {BookOpenCheck, ChevronDown} from 'lucide-react';
import {useState, type FC} from 'react';

interface RelStudyGuideSectionProps {
  standalone?: boolean;
}

const CORE_FAITH_AND_PILLARS = [
  {
    name: 'İslam’ın 3 Bilgi Kaynağı',
    rule: 'Selim Akıl · Sadık Haber (Vahiy + Mütevatir Haber) · Salim Duyular. Rüya, ilham ve keşif genel/bağlayıcı delil sayılmaz.',
  },
  {
    name: 'Allah’ın Zati & Subuti Sıfatları',
    rule: 'Zati (yalnız Allah’a ait): Vücut, Kıdem, Beka, Vahdaniyet, Muhalefetün lil-havadis, Kıyam bi-nefsihi · Subuti (yaratılanlarda sınırlı örneği olan): Hayat, İlim, Semi, Basar, İrade, Kudret, Kelam, Tekvin.',
  },
  {
    name: 'Efâl-i Mükellefin (8 Dinî Hüküm)',
    rule: 'Farz (Ayn / Kifaye) · Vacip · Sünnet (Müekkede / Gayrimüekkede) · Mendup · Mubah · Mekruh (Tahrimen / Tenzihen) · Müfsid · Haram.',
  },
  {
    name: 'İnanç & Felsefi Yaklaşımlar',
    rule: 'Teizm (Vahiy+Yaratıcı) · Deizm (Yaratıcı var, din/vahiy yok) · Panteizm (Tanrı=Evren) · Agnostisizm (Bilinemez) · Nihilizm (Hiççilik) · Sekülarizm (Dünyevileşme).',
  },
];

const SECTS_AND_ANATOLIA = [
  {
    group: 'İtikadi & Fıkhi Mezhepler',
    summary: 'Matüridilik (akıl vurgusu, Türkler) · Eşarilik · Caferilik (12 İmam)',
    detail: 'Hanefilik (kıyas/istihsan) · Malikilik (Medine ameli) · Şafiilik (er-Risale) · Hanbelilik',
  },
  {
    group: 'Anadolu İrfanı & Tasavvuf',
    summary: 'Yesevilik (Hikmetler) · Mevlevilik (Mesnevi/Sema) · Alevilik–Bektaşilik (Makalat/Cem)',
    detail: 'Kadirilik · Nakşibendilik · Ahilik & Fütüvvet (iş ve esnaf ahlakı)',
  },
  {
    group: 'Kur’an’da Önemli Ahlak Kavramları',
    summary: 'İhlas · Takva · Tevekkül · İhsan · Sıdk · Emanet · İffet · Hikmet · Şecaat · Adalet',
    detail: 'Kaçınılacaklar (Hucurat 12): Tecessüs (kusur araştırma), Gıybet, Suizan, İftira, Haset ≠ Gıpta',
  },
];

const WORLD_RELIGIONS_NOTES = [
  {
    title: 'Yaşayan Semavi & Doğu Dinleri',
    detail:
      'Yahudilik (Tanah/Talmud, Sinagog, Haham, Şabat) · Hristiyanlık (Kitab-ı Mukaddes, Teslis, Katolik/Ortodoks/Protestan) · Hinduizm (Vedalar, Kast, Karma, Reenkarnasyon) · Budizm (Tripitaka, Buda, Kast reddi, Nirvana).',
  },
  {
    title: 'Bilim, Medeniyet & Kur’an Tefsiri',
    detail:
      'Beytülhikme (Bağdat tercüme merkezi) · Farabi, İbn Sina (el-Kanun fi’t-Tıb), Biruni, Harezmi, Uluğ Bey · Mekkî ayetler (tevhit, ahiret, kıssalar) · Medenî ayetler (ibadet, hukuk, toplumsal hükümler) · Zarurat-ı Hamse: Can, Akıl, Din, Nesil, Malın korunması.',
  },
];

export const RelStudyGuideSection: FC<RelStudyGuideSectionProps> = ({standalone = false}) => {
  const [open, setOpen] = useState(standalone);

  const content = (
    <div className="space-y-4">
      <div className="rounded-xl bg-[#072020]/75 border border-teal-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-teal-300 font-semibold">
          1. BİLGİ, İMAN, SIFATLAR &amp; MÜKELLEF HÜKÜMLERİ
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CORE_FAITH_AND_PILLARS.map((item) => (
            <div
              key={item.name}
              className="rounded-lg bg-[#041717]/85 border border-teal-400/15 px-3 py-2.5"
            >
              <div className="text-xs sm:text-sm font-semibold text-white">{item.name}</div>
              <div className="text-xs text-teal-100/80 mt-0.5 leading-relaxed">{item.rule}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#072020]/75 border border-teal-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-teal-300 font-semibold">
          2. MEZHEPLER, ANADOLU TASAVVUFU &amp; KUR’AN AHLAKI
        </div>
        <div className="grid grid-cols-1 gap-2">
          {SECTS_AND_ANATOLIA.map((row) => (
            <div
              key={row.group}
              className="rounded-lg bg-[#041717]/85 border border-teal-400/15 px-3 py-2 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3 text-xs sm:text-sm"
            >
              <span className="font-semibold text-white">{row.group}</span>
              <span className="text-teal-200/90">{row.summary}</span>
              <span className="text-amber-200/85">{row.detail}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#072020]/75 border border-teal-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-amber-300 font-semibold">
          3. YAŞAYAN DÜNYA DİNLERİ &amp; İSLAM MEDENİYETİ
        </div>
        <div className="grid grid-cols-1 gap-2">
          {WORLD_RELIGIONS_NOTES.map((item) => (
            <div
              key={item.title}
              className="rounded-lg bg-[#041717]/85 border border-teal-400/15 px-3 py-2.5 space-y-1"
            >
              <div className="text-xs sm:text-sm font-semibold text-teal-200">{item.title}</div>
              <div className="text-xs text-teal-50/85 leading-relaxed">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (standalone) {
    return (
      <section aria-label="YKS Din Kültürü Çalışma Rehberi" className="w-full">
        <div className="rel-panel rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-3 pb-1">
            <BookOpenCheck className="w-5 h-5 text-teal-400 shrink-0" />
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                YKS Din Kültürü ve Ahlak Bilgisi Hızlı Çalışma Rehberi
              </h2>
              <p className="text-xs text-teal-100/75">
                Bilgi kaynakları, Allah’ın sıfatları, Efâl-i Mükellefin, mezhepler ve dünya dinleri
              </p>
            </div>
          </div>
          {content}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Din Kültürü Çalışma Rehberi" className="w-full">
      <div className="rel-panel rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="w-full min-h-[56px] px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-teal-500/10 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <BookOpenCheck className="w-5 h-5 text-teal-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-semibold text-white">
                Din Kültürü Hızlı Çalışma Rehberi
              </div>
              <div className="text-xs text-teal-100/75 truncate">
                Zati-Subuti sıfatlar, Efâl-i Mükellefin, mezhepler ve dünya dinleri özeti
              </div>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-200/75 transition-transform shrink-0 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
        {open && <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-teal-400/15">{content}</div>}
      </div>
    </section>
  );
};
