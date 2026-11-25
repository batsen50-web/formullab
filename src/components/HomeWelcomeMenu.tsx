import {ArrowRight} from 'lucide-react';
import type {FC} from 'react';
import type {SubjectId} from '../types/biology';
import {
  BioDnaLogo,
  ErlenmeyerLogo,
  GeographyGlobeLogo,
  HistoryLandmarkLogo,
  LiteratureQuillLogo,
  PhilosophyScaleLogo,
  PhysicsAtomLogo,
  ReligionStarLogo,
} from './SubjectLogos';

interface SubjectCardStats {
  totalItems: number;
  favoriteCount: number;
  mistakeCount: number;
}

interface HomeWelcomeMenuProps {
  chemistryStats: SubjectCardStats;
  biologyStats: SubjectCardStats;
  physicsStats: SubjectCardStats;
  geographyStats: SubjectCardStats;
  literatureStats: SubjectCardStats;
  historyStats: SubjectCardStats;
  religionStats: SubjectCardStats;
  philosophyStats: SubjectCardStats;
  examQuestionCount: number;
  physicsExamCount: number;
  geographyExamCount: number;
  literatureExamCount: number;
  historyExamCount: number;
  religionExamCount: number;
  philosophyExamCount: number;
  onEnterSubject: (subject: SubjectId) => void;
}

export const HomeWelcomeMenu: FC<HomeWelcomeMenuProps> = ({
  chemistryStats,
  biologyStats,
  physicsStats,
  geographyStats,
  literatureStats,
  historyStats,
  religionStats,
  philosophyStats,
  examQuestionCount,
  physicsExamCount,
  geographyExamCount,
  literatureExamCount,
  historyExamCount,
  religionExamCount,
  philosophyExamCount,
  onEnterSubject,
}) => {
  return (
    <section aria-label="Ana Menü — Ders Seçimi" className="w-full space-y-6 pt-2 sm:pt-4">
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
          Hoş Geldiniz
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          YKS (TYT &amp; AYT) hazırlığı için çalışmak istediğiniz dersi seçin. Her ders kendi
          laboratuvarı, soru havuzu ve sözlüğüyle ayrı tema altında açılır.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Kimya Kartı */}
        <button
          type="button"
          onClick={() => onEnterSubject('chemistry')}
          className="group home-panel rounded-2xl p-5 sm:p-6 text-left transition-all cursor-pointer hover:border-emerald-400/50 hover:bg-[#141a18] active:scale-[0.99] flex flex-col justify-between gap-5"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <ErlenmeyerLogo size="lg" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Kimya
                  </h3>
                  <p className="text-xs text-zinc-400">TYT &amp; AYT Kimya</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {chemistryStats.totalItems} kritik bileşik, formül–ad testleri, İyon Çaprazlama
              Laboratuvarı, hata bankası ve ÖSYM notları.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2 text-xs text-zinc-400 tabular-nums">
            <div className="flex items-center gap-2">
              <span>Favori: {chemistryStats.favoriteCount}</span>
              <span aria-hidden="true">·</span>
              <span>Yanlış: {chemistryStats.mistakeCount}</span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-emerald-300/90 group-hover:text-emerald-300">
              Derse Gir
            </span>
          </div>
        </button>

        {/* Biyoloji Kartı */}
        <button
          type="button"
          onClick={() => onEnterSubject('biology')}
          className="group home-panel rounded-2xl p-5 sm:p-6 text-left transition-all cursor-pointer hover:border-sky-400/50 hover:bg-[#13181e] active:scale-[0.99] flex flex-col justify-between gap-5"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <BioDnaLogo size="lg" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    Biyoloji
                  </h3>
                  <p className="text-xs text-zinc-400">TYT &amp; AYT Biyoloji</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {biologyStats.totalItems} temel kavram, {examQuestionCount} özgün YKS sınav sorusu,
              Kodon–Enzim–Ozmoz Biyo Lab ve özet rehber.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2 text-xs text-zinc-400 tabular-nums">
            <div className="flex items-center gap-2">
              <span>Favori: {biologyStats.favoriteCount}</span>
              <span aria-hidden="true">·</span>
              <span>Yanlış: {biologyStats.mistakeCount}</span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-sky-300/90 group-hover:text-sky-300">
              Derse Gir
            </span>
          </div>
        </button>

        {/* Fizik Kartı */}
        <button
          type="button"
          onClick={() => onEnterSubject('physics')}
          className="group home-panel rounded-2xl p-5 sm:p-6 text-left transition-all cursor-pointer hover:border-violet-400/50 hover:bg-[#161321] active:scale-[0.99] flex flex-col justify-between gap-5"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <PhysicsAtomLogo size="lg" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                    Fizik
                  </h3>
                  <p className="text-xs text-zinc-400">TYT &amp; AYT Fizik</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-violet-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {physicsStats.totalItems} yasa ve formül, {physicsExamCount} YKS sorusu, Eğik
              Atış–Ohm Devresi–Fotoelektrik Fizik Lab ve rehber.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2 text-xs text-zinc-400 tabular-nums">
            <div className="flex items-center gap-2">
              <span>Favori: {physicsStats.favoriteCount}</span>
              <span aria-hidden="true">·</span>
              <span>Yanlış: {physicsStats.mistakeCount}</span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-violet-300/90 group-hover:text-violet-300">
              Derse Gir
            </span>
          </div>
        </button>

        {/* Coğrafya Kartı */}
        <button
          type="button"
          onClick={() => onEnterSubject('geography')}
          className="group home-panel rounded-2xl p-5 sm:p-6 text-left transition-all cursor-pointer hover:border-amber-400/50 hover:bg-[#1c150c] active:scale-[0.99] flex flex-col justify-between gap-5"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <GeographyGlobeLogo size="lg" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    Coğrafya
                  </h3>
                  <p className="text-xs text-zinc-400">TYT &amp; AYT Coğrafya</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {geographyStats.totalItems} kavram, {geographyExamCount} YKS sorusu, etkileşimli
              Dünya–Türkiye Harita Labı ve Yerel Saat/Ölçek hesaplayıcı.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2 text-xs text-zinc-400 tabular-nums">
            <div className="flex items-center gap-2">
              <span>Favori: {geographyStats.favoriteCount}</span>
              <span aria-hidden="true">·</span>
              <span>Yanlış: {geographyStats.mistakeCount}</span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-amber-300/90 group-hover:text-amber-300">
              Derse Gir
            </span>
          </div>
        </button>

        {/* Türkçe & Edebiyat Kartı */}
        <button
          type="button"
          onClick={() => onEnterSubject('literature')}
          className="group home-panel rounded-2xl p-5 sm:p-6 text-left transition-all cursor-pointer hover:border-rose-400/50 hover:bg-[#1e0d15] active:scale-[0.99] flex flex-col justify-between gap-5"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <LiteratureQuillLogo size="lg" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-rose-300 transition-colors">
                    Türkçe &amp; Edebiyat
                  </h3>
                  <p className="text-xs text-zinc-400">TYT Türkçe &amp; AYT Edebiyat</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-rose-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {literatureStats.totalItems} konu ve kavram, {literatureExamCount} YKS sorusu,
              Eser–Yazar, Edebî Sanat ve Yazım/Ses Labı.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2 text-xs text-zinc-400 tabular-nums">
            <div className="flex items-center gap-2">
              <span>Favori: {literatureStats.favoriteCount}</span>
              <span aria-hidden="true">·</span>
              <span>Yanlış: {literatureStats.mistakeCount}</span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-rose-300/90 group-hover:text-rose-300">
              Derse Gir
            </span>
          </div>
        </button>

        {/* Tarih Kartı */}
        <button
          type="button"
          onClick={() => onEnterSubject('history')}
          className="group home-panel rounded-2xl p-5 sm:p-6 text-left transition-all cursor-pointer hover:border-orange-400/50 hover:bg-[#21120a] active:scale-[0.99] flex flex-col justify-between gap-5"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <HistoryLandmarkLogo size="lg" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                    Tarih
                  </h3>
                  <p className="text-xs text-zinc-400">TYT &amp; AYT Tarih</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-orange-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {historyStats.totalItems} tarihî olay ve kavram, {historyExamCount} YKS sorusu,
              Kronoloji Şeridi, Antlaşma &amp; Devlet Teşkilatı Labı.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2 text-xs text-zinc-400 tabular-nums">
            <div className="flex items-center gap-2">
              <span>Favori: {historyStats.favoriteCount}</span>
              <span aria-hidden="true">·</span>
              <span>Yanlış: {historyStats.mistakeCount}</span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-orange-300/90 group-hover:text-orange-300">
              Derse Gir
            </span>
          </div>
        </button>

        {/* Din Kültürü Kartı */}
        <button
          type="button"
          onClick={() => onEnterSubject('religion')}
          className="group home-panel rounded-2xl p-5 sm:p-6 text-left transition-all cursor-pointer hover:border-teal-400/50 hover:bg-[#091c1c] active:scale-[0.99] flex flex-col justify-between gap-5"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <ReligionStarLogo size="lg" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                    Din Kültürü
                  </h3>
                  <p className="text-xs text-zinc-400">TYT &amp; AYT Din Kültürü</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-teal-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {religionStats.totalItems} temel kavram, {religionExamCount} YKS sorusu, Efâl-i
              Mükellefin, Mezhepler Matrisi ve Dünya Dinleri Labı.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2 text-xs text-zinc-400 tabular-nums">
            <div className="flex items-center gap-2">
              <span>Favori: {religionStats.favoriteCount}</span>
              <span aria-hidden="true">·</span>
              <span>Yanlış: {religionStats.mistakeCount}</span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-teal-300/90 group-hover:text-teal-300">
              Derse Gir
            </span>
          </div>
        </button>

        {/* Felsefe Kartı */}
        <button
          type="button"
          onClick={() => onEnterSubject('philosophy')}
          className="group home-panel rounded-2xl p-5 sm:p-6 text-left transition-all cursor-pointer hover:border-indigo-400/50 hover:bg-[#10142a] active:scale-[0.99] flex flex-col justify-between gap-5"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <PhilosophyScaleLogo size="lg" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Felsefe
                  </h3>
                  <p className="text-xs text-zinc-400">TYT &amp; Ek Felsefe</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-indigo-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {philosophyStats.totalItems} kavram ve akım, {philosophyExamCount} YKS sorusu,
              Filozof Eşleştirme, Akıl Yürütme ve Disiplin Matrisi.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2 text-xs text-zinc-400 tabular-nums">
            <div className="flex items-center gap-2">
              <span>Favori: {philosophyStats.favoriteCount}</span>
              <span aria-hidden="true">·</span>
              <span>Yanlış: {philosophyStats.mistakeCount}</span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-indigo-300/90 group-hover:text-indigo-300">
              Derse Gir
            </span>
          </div>
        </button>
      </div>
    </section>
  );
};
