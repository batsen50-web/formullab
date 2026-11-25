import {BookOpenCheck, ChevronDown} from 'lucide-react';
import {useState, type FC} from 'react';

interface LitStudyGuideSectionProps {
  standalone?: boolean;
}

const TYT_TRAPS = [
  {
    name: 'Ses & Ünlü Uyumları Tuzakları',
    rule: 'Ünlü değişimi: yalnız bana/sana · "Geliyor/yürüyor"da daralma YOK · Ünsüz düşmesi: minicik, alçalmak, adaş · Hukuku/sanatı yumuşamaya aykırı',
  },
  {
    name: 'Yazım Kuralları (SOMBaHÇeM & Birleşik)',
    rule: 'Sanki, oysaki, mademki, belki, hâlbuki, çünkü, meğerki bitişik · Semizotu/dereotu bitişik · Bal rengi, ana dili, yer çekimi, terk etmek ayrı · TBMM’ye değil TBMMye / Meclisine!',
  },
  {
    name: 'Dil Bilgisi Altın Ayrım Kriterleri',
    rule: 'İle = "ve" ise bağlaç · Fiilimsi "-ma" ile olumsuzlanır (kalıcı isim olumsuzlanmaz) · İsim cümlesinde çatı aranmaz · Örtülü özne (müdür tarafından) = Zarf Tümleci!',
  },
  {
    name: 'Anlatım Bozukluğu 4 Ana Tuzağı',
    rule: 'Gizli sır (gereksiz) · Kültürel ve sanat etkinlikleri (tamlama) · Toplayıp yerleştirildi (çatı) · Günler geçiyorlardı (insan dışı çoğul öznede yüklem tekil)',
  },
];

const CLASSICAL_PERIODS = [
  {
    era: 'Geçiş Dönemi (11–12. yy)',
    works: 'Kutadgu Bilig (1069) · Dîvânu Lugâti’t-Türk (1074) · Atabetü’l-Hakayık · Divân-ı Hikmet',
    key: 'Kün Togdı (Adalet), Ay Toldı (Mutluluk), Ögdülmiş (Akıl), Odgurmış (Akıbet)',
  },
  {
    era: 'Halk & Tekke Şiiri',
    works: 'Koşma (11), Semai (8), Varsağı (8 + bre/hey), Mâni (7) · İlahi, Nefes, Şathiye, Devriye',
    key: 'Karacaoğlan, Köroğlu, Dadaloğlu (yalnız hece) · Yunus Emre, Kaygusuz Abdal, Pir Sultan',
  },
  {
    era: 'Divan Şiiri Akımları',
    works: 'Türkî-i Basit (Nazmi) · Sebk-i Hindî (Şeyh Galip) · Hikemî (Nabi) · Mahallîleşme (Nedim)',
    key: 'Türklerin kattıkları: Tuyuğ (Kadı Burhaneddin) & Şarkı (Nedim) · Terkibibent ≠ Terciibent',
  },
  {
    era: 'Divan Şair & Nasircileri',
    works: 'Ali Şir Nevai (ilk hamse, ilk tezkire) · Şeyhi (Harnâme) · Fuzuli (Şikâyetname) · Nef’i (Siham-ı Kaza)',
    key: 'Süslü Nesir: Sinan Paşa (Tazarruname) · Gezi: Seydi Ali Reis (Mir’atü’l-Memalik) & Evliya Çelebi',
  },
];

const MODERN_FIRSTS_AND_MOVEMENTS = [
  {
    period: 'Tanzimat I & II İlkleri',
    detail:
      'Şinasi (Şair Evlenmesi ilk oyun, Tercüman-ı Ahval Mukaddimesi ilk makale) · Şemsettin Sami (Taaşşuk-ı Talat ve Fitnat ilk yerli) · N. Kemal (İntibah ilk edebî, Cezmi ilk tarihî) · Recaizade (Araba Sevdası ilk realist) · Nabizade (Karabibik ilk köy) · Sezai (Küçük Şeyler ilk modern hikâye)',
  },
  {
    period: 'Servetifünun – Fecriati – Millî',
    detail:
      'Halit Ziya (Mai ve Siyah, Mezardan Sesler ilk mensur şiir) · Mehmet Rauf (Eylül ilk psikolojik) · Ahmet Haşim (Saf Şiir/Sembolizm, Piyale) · Genç Kalemler (Yeni Lisan) · Beş Hececiler (F.O.Y.E.H.) · Bağımsızlar (M. Akif Safahat, Yahya Kemal Kendi Gök Kubbemiz)',
  },
  {
    period: 'Cumhuriyet Şiir Haritası',
    detail:
      'Yedi Meşaleciler (1928, tek öykücü Kenan Hulusi) · Öz Şiir (Tanpınar, Necip Fazıl, Tarancı, Dıranas, Necatigil) · Toplumcu (Nâzım Hikmet, Rıfat Ilgaz, Attilâ İlhan [Mavi]) · Garip I. Yeni (Orhan Veli, Melih Cevdet, Oktay Rifat) · II. Yeni (C. Süreya, T. Uyar, E. Cansever, İ. Berk, E. Ayhan, S. Karakoç, Ü. Tamer)',
  },
  {
    period: 'Cumhuriyet Roman, Tiyatro & Akımlar',
    detail:
      'Birey (Peyami Safa, Tanpınar, Tarık Buğra) · Toplumcu (Yaşar Kemal İnce Memed, Orhan Kemal, Kemal Tahir, Fakir Baykurt) · Postmodern (Oğuz Atay Tutunamayanlar, Yusuf Atılgan Anayurt Oteli) · Epik: Haldun Taner (Keşanlı Ali) · Absürt: Güngör Dilmen (Canlı Maymun) · Realizm vs Natüralizm vs Parnasizm',
  },
];

export const LitStudyGuideSection: FC<LitStudyGuideSectionProps> = ({standalone = false}) => {
  const [open, setOpen] = useState(standalone);

  const content = (
    <div className="space-y-4">
      <div className="rounded-xl bg-[#260c17]/75 border border-rose-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-rose-300 font-semibold">
          1. TYT TÜRKÇE · SES, YAZIM, NOKTALAMA &amp; DİL BİLGİSİ TUZAKLARI
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TYT_TRAPS.map((item) => (
            <div
              key={item.name}
              className="rounded-lg bg-[#19080f]/85 border border-rose-400/15 px-3 py-2.5"
            >
              <div className="text-xs sm:text-sm font-semibold text-white">{item.name}</div>
              <div className="text-xs text-rose-100/80 mt-0.5 leading-relaxed">{item.rule}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#260c17]/75 border border-rose-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-rose-300 font-semibold">
          2. İSLAMİYET ÖNCESİ, GEÇİŞ, HALK VE DİVAN ÖZETİ
        </div>
        <div className="grid grid-cols-1 gap-2">
          {CLASSICAL_PERIODS.map((row) => (
            <div
              key={row.era}
              className="rounded-lg bg-[#19080f]/85 border border-rose-400/15 px-3 py-2 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3 text-xs sm:text-sm"
            >
              <span className="font-semibold text-white">{row.era}</span>
              <span className="text-rose-200/90">{row.works}</span>
              <span className="text-amber-200/85">{row.key}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#260c17]/75 border border-rose-400/20 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-mono text-[11px] tracking-wider uppercase text-amber-300 font-semibold">
          3. TANZİMAT’TAN CUMHURİYET’E İLKLER, TOPLULUKLAR &amp; ROMAN-TİYATRO
        </div>
        <div className="grid grid-cols-1 gap-2">
          {MODERN_FIRSTS_AND_MOVEMENTS.map((item) => (
            <div
              key={item.period}
              className="rounded-lg bg-[#19080f]/85 border border-rose-400/15 px-3 py-2.5 space-y-1"
            >
              <div className="text-xs sm:text-sm font-semibold text-rose-200">{item.period}</div>
              <div className="text-xs text-rose-50/85 leading-relaxed">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (standalone) {
    return (
      <section aria-label="YKS Türkçe ve Edebiyat Çalışma Rehberi" className="w-full">
        <div className="lit-panel rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-3 pb-1">
            <BookOpenCheck className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                YKS Türkçe &amp; Edebiyat Hızlı Çalışma Rehberi
              </h2>
              <p className="text-xs text-rose-100/75">
                TYT yazım–dil bilgisi tuzakları ile AYT edebiyat ilkleri, dönemler, sanatçılar ve akımlar
              </p>
            </div>
          </div>
          {content}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Türkçe ve Edebiyat Çalışma Rehberi" className="w-full">
      <div className="lit-panel rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="w-full min-h-[56px] px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-rose-500/10 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <BookOpenCheck className="w-5 h-5 text-rose-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-semibold text-white">
                Türkçe &amp; Edebiyat Hızlı Çalışma Rehberi
              </div>
              <div className="text-xs text-rose-100/75 truncate">
                TDK tuzakları, Divan–Halk dönemleri, Tanzimat ilkleri ve Cumhuriyet şiir haritası
              </div>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-rose-200/75 transition-transform shrink-0 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
        {open && <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-rose-400/15">{content}</div>}
      </div>
    </section>
  );
};
