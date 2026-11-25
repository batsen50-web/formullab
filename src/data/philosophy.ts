import type {PhilosophyCategoryId, PhilosophyExamLevel, PhilosophyTerm} from '../types/philosophy';

export const PHILOSOPHY_CATEGORY_LABELS: Record<PhilosophyCategoryId, string> = {
  FELSEFE_DUSUNME: 'Felsefe, Düşünme & Dil',
  VARLIK_BILGI_BILIM: 'Varlık, Bilgi & Bilim',
  AHLAK_DIN_SIYASET_SANAT: 'Ahlak, Din, Siyaset & Sanat',
  ILK_ORTA_YENI_CAG: 'MÖ 6.yy – MS 17.yy Felsefesi',
  AYDINLANMA_CAGDAS_TURK: '18–20.yy & Türkiye’de Felsefe',
};

export const PHILOSOPHY_EXAM_LEVEL_LABELS: Record<PhilosophyExamLevel, string> = {
  TYT: 'TYT',
  AYT: 'AYT',
  TYT_AYT: 'TYT · AYT',
};

export const PHILOSOPHY_TERMS: PhilosophyTerm[] = [
  // =========================================================================
  // 1. FELSEFEYİ TANIMA, DÜŞÜNME & DİL (15 KAVRAM)
  // =========================================================================
  {
    id: 'phil_felsefe_hikmet',
    term: 'Philosophia (Bilgelik Sevgisi) ve Hikmet',
    shortCode: 'Philo + Sophia',
    thinkerOrField: 'Pisagor · Kavram Temeli',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Yunanca "sevgi" (philo) ve "bilgelik/bilgi" (sophia) sözcüklerinden gelir; Hikmet her şeyin aslını bilme iddiasıyken Felsefe bilgeliğe ulaşma çabası ve yolda olmaktır.',
    examTip:
      'Pisagor kendine "bilge" (sophos) yerine "bilgeliği seven" (philosophos) diyerek felsefenin bitmeyen bir arayış olduğunu vurgulamıştır.',
    isHighYield: true,
  },
  {
    id: 'phil_merak_hayret_suphe',
    term: 'Merak, Hayret ve Felsefi Şüphe',
    shortCode: 'Felsefenin Başlangıcı',
    thinkerOrField: 'Aristoteles & Descartes',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Aristoteles’e göre felsefe hayretle, Descartes’a göre her şeyden yöntemsel (metodik) şüphe duymakla başlar; felsefi şüphe inkâr değil doğruyu bulma aracıdır.',
    examTip:
      'Septiklerin şüpheyi amaç hâline getirmesinden farklı olarak Descartes şüpheyi kesin bilgiye ("Düşünüyorum, o hâlde varım") ulaşmak için araç sayar.',
    isHighYield: true,
  },
  {
    id: 'phil_refleksif_yigilimli',
    term: 'Felsefi Düşüncenin Nitelikleri (Refleksif & Yığılımlı)',
    shortCode: '8 Nitelik',
    thinkerOrField: 'Düşünme Özellikleri',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Felsefi düşünce sorgulayıcı, eleştirel, sistemli, tutarlı, rasyonel, evrensel, öznel, refleksif (düşünme üzerine yeniden düşünme) ve yığılımlıdır (kümülatif; ilerlemez, birikir).',
    examTip:
      'Bilim ilerlemecidir (eski teoriyi çürütür); felsefe ise yığılımlıdır (Platon bugün hâlâ değerini korur ve tartışılır).',
    isHighYield: true,
  },
  {
    id: 'phil_felsefi_soru',
    term: 'Felsefi Sorunun Özellikleri',
    shortCode: 'Nedir? Sorusu',
    thinkerOrField: 'Soru Yapısı',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Felsefi sorular "Nedir?" kalıbıyla özü arar, tek ve kesin bir olgusal cevabı yoktur, anlamaya ve temellendirmeye yöneliktir ("İyi nedir?", "Adalet nedir?").',
    examTip:
      'Gündelik ve bilimsel sorular pratik/deneysel kesinlik isterken felsefi sorular yeni sorular doğurur.',
    isHighYield: true,
  },
  {
    id: 'phil_gerceklik_dogruluk_hakikat',
    term: 'Gerçeklik, Doğruluk ve Hakikat Ayrımı',
    shortCode: '3 Temel Kavram',
    thinkerOrField: 'Epistemoloji Temeli',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Gerçeklik zihinden bağımsız var olan şeydir (ağaç, masa). Doğruluk yargı ve önermenin nesneye uygun olmasıdır ("Masa kahverengidir"). Hakikat ise gerçeğin derin ve değişmez bilgisine/özüne verilen addır.',
    examTip:
      'Varlıklar "gerçek" ya da "gerçek dışı" olur; önermeler ve yargılar ise "doğru" ya da "yanlış" olur.',
    isHighYield: true,
  },
  {
    id: 'phil_bilinc_ozbilinc',
    term: 'Bilinç ve Öz Bilinç',
    shortCode: 'Farkındalık',
    thinkerOrField: 'Felsefi Düşünme',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Bilinç insanın dış dünyadaki nesnelerin farkında olmasıdır; Öz Bilinç ise bireyin kendi düşüncelerinin ve zihninin farkına varmasıdır (Refleksiyon kaynağı).',
    examTip:
      'Öz bilinç "Ben neyi, nasıl düşünüyorum?" diyebilme yetisi olup yalnız felsefi sorgulamaya temel oluşturur.',
    isHighYield: false,
  },
  {
    id: 'phil_onerme',
    term: 'Önerme ve Önerme Olmayan İfadeler',
    shortCode: 'Doğru / Yanlış',
    thinkerOrField: 'Mantık & Akıl Yürütme',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Doğru ya da yanlış bir yargı bildiren bildirme cümlelerine Önerme denir. Soru, ünlem, emir ve istek cümleleri doğruluk değeri taşımadığı için önerme değildir.',
    examTip:
      '"İstanbul Türkiye’nin en kalabalık şehridir" veya "2+2=5" birer önermedir; "Kapıyı kapat!" ise önerme değildir.',
    isHighYield: true,
  },
  {
    id: 'phil_arguman_gorus',
    term: 'Görüş, Argüman ve Temellendirme',
    shortCode: 'Öncül → Sonuç',
    thinkerOrField: 'Felsefi Argümantasyon',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Argüman bir iddiayı (sonucu) desteklemek için ileri sürülen kanıt ve gerekçeler (öncüller) bütünüdür; Temellendirme ise görüşü mantıksal dayanaklarla gerekçelendirmektir.',
    examTip:
      'Bilimde doğrulama deney/gözlemle yapılırken felsefede doğrulama "akli temellendirme ve tutarlılık" ile yapılır.',
    isHighYield: true,
  },
  {
    id: 'phil_akil_yurutme_turleri',
    term: 'Tümdengelim, Tümevarım ve Analoji',
    shortCode: '3 Akıl Yürütme',
    thinkerOrField: 'Mantık Yöntemleri',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Tümdengelim (Dedüksiyon): Genelden özele zorunlu çıkarım. Tümevarım (Endüksiyon): Tekil gözlemlerden genel yasaya ulaşma. Analoji: İki benzer özel durum arasında ortak özellikten çıkarım yapma.',
    examTip:
      '"Mars’ta su ve atmosfer var, Dünya’da da var; o hâlde Mars’ta yaşam olabilir" örneği özelden özele Analoji’dir.',
    isHighYield: true,
  },
  {
    id: 'phil_akil_ilkeleri',
    term: 'Mantığın Üç Temel Akıl İlkesi',
    shortCode: 'Özdeşlik-Çelişmezlik',
    thinkerOrField: 'Aristoteles Mantığı',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      '1. Özdeşlik (A, A’dır). 2. Çelişmezlik (Bir şey aynı anda hem A hem A-olmayan olamaz). 3. Üçüncü Hâlin İmkânsızlığı (Bir önerme ya doğrudur ya yanlıştır, üçüncü seçenek yoktur).',
    examTip:
      'Düşüncede tutarlılık ancak bu üç ilkeye uyulması ve çelişkiden kaçınılmasıyla sağlanır.',
    isHighYield: true,
  },
  {
    id: 'phil_tutarlilik_gecerlilik',
    term: 'Tutarlılık ve Geçerlilik',
    shortCode: 'Mantıksal Uyum',
    thinkerOrField: 'Argüman Analizi',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Tutarlılık bir sistem veya metindeki önermelerin birbiriyle çelişmemesidir. Geçerlilik ise öncüller doğru kabul edildiğinde sonucun öncüllerden mantıksal olarak zorunlu çıkmasıdır.',
    examTip:
      'Bir argüman öncülleri gerçek dünyaya aykırı olsa bile biçimsel olarak "geçerli" olabilir.',
    isHighYield: false,
  },
  {
    id: 'phil_safsata_turleri',
    term: 'Safsata (Geçersiz Akıl Yürütme Tuzakları)',
    shortCode: 'Mantık Hatası',
    thinkerOrField: 'Eleştirel Düşünme',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Doğru görünmesine rağmen mantık hatası içeren kandırıcı çıkarımlardır: Kişiye saldırı (Ad hominem), çoğunluğa başvurma, konuyu saptırma, genelleme hatası.',
    examTip:
      'Bir kişinin iddiasını çürütmek yerine kişisel özelliklerine saldırmak mantıkta geçersiz bir safsatadır.',
    isHighYield: false,
  },
  {
    id: 'phil_dil_dusunme',
    term: 'Dil ve Düşünme İlişkisi & Kavram Yanılgısı',
    shortCode: 'Kavram Netliği',
    thinkerOrField: 'Felsefe ve Dil',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Düşünce dil ile somutlaşır ve aktarılır; kavramların bulanık veya çok anlamlı kullanılması felsefi sorunlarda yanlış çıkarımlara yol açar.',
    examTip:
      'Analitik felsefe ve Sokrates’in "tanım" arayışı kavramları dilsel bulanıklıktan arındırmayı hedefler.',
    isHighYield: true,
  },
  {
    id: 'phil_felsefi_islevler',
    term: 'Felsefenin Bireysel ve Toplumsal İşlevleri',
    shortCode: 'Eleştirel Toplum',
    thinkerOrField: 'Felsefenin Değeri',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Bireye önyargılardan kurtulma, çok yönlü bakma ve öz bilinç kazandırır; topluma ise demokrasi kültürü, hoşgörü, bilimsel merak ve ortak değerler bilinci sağlar.',
    examTip:
      'Bertrand Russell’a göre felsefe kesin yanıtlar veremese de insanı dogmatizmin dar hapishanesinden kurtarır.',
    isHighYield: false,
  },
  {
    id: 'phil_felsefi_metin_analizi',
    term: 'Felsefi Metin Çözümleme Basamakları',
    shortCode: 'Problem–Kavram–Görüş',
    thinkerOrField: 'Okuma Yöntemi',
    category: 'FELSEFE_DUSUNME',
    examLevel: 'TYT_AYT',
    mechanism:
      'Bir felsefi metin okunurken sırasıyla: 1. Temel felsefi problem belirlenir, 2. Anahtar kavramlar saptanır, 3. Filozofun tezi ve argümanları ayrıştırılır, 4. Tutarlılığı değerlendirilir.',
    examTip:
      'YKS felsefe paragraflarında önce "Bu parçada hangi soruya yanıt aranmaktadır?" veya "altı çizili kavram/savunulan görüş nedir?" istenir.',
    isHighYield: true,
  },

  // =========================================================================
  // 2. VARLIK, BİLGİ & BİLİM FELSEFESİ (15 KAVRAM)
  // =========================================================================
  {
    id: 'phil_ontoloji_metafizik',
    term: 'Ontoloji (Varlık Felsefesi) ve Metafizik',
    shortCode: 'Varlık Sorunu',
    thinkerOrField: 'Reel & İdeal Varlık',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Ontoloji varlığı bir bütün olarak ("Varlık nedir?") sorgular. Reel varlık zaman ve mekânda yer kaplar (taş, insan); İdeal varlık ise zihindedir (sayılar, Pi, Kafdağı). Metafizik fizikötesi alanı inceler.',
    examTip:
      'Bilimler varlığın yalnızca belirli bir parçasını (fizik maddeyi, biyoloji canlıyı) incelerken felsefe "var olan her şeyi" sorgular.',
    isHighYield: true,
  },
  {
    id: 'phil_varlik_var_midir',
    term: 'Varlığın Var Olup Olmadığı (Nihilizm vs Realizm)',
    shortCode: 'Gorgias & Tao',
    thinkerOrField: 'Varlık Tartışması',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Nihilizm (Gorgias: "Hiçbir şey yoktur; olsa da bilinemez, bilinse de aktarılamaz") ve Taoizm varlığın kalıcı gerçekliğini reddeder; Realizm ise varlığın insan zihninden bağımsız var olduğunu savunur.',
    examTip:
      'Realizm yalnız "varlık vardır" demez; onun insan bilincinden bağımsız olduğunu vurgular.',
    isHighYield: true,
  },
  {
    id: 'phil_varlik_nicelik',
    term: 'Varlığın Niceliği (Monizm, Düalizm, Plüralizm)',
    shortCode: '1 · 2 · Çok İlke',
    thinkerOrField: 'Thales · Descartes · Empedokles',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Monizm (tek töz: Thales/Spinoza/Hegel), Düalizm (iki ayrı töz: Descartes’ta ruh/düşünce ve madde/yer kaplama), Plüralizm (çoklu ilke: Empedokles’te 4 element, Demokritos’ta atomlar).',
    examTip:
      'Descartes’ın "ruh ve beden birbirine indirgenemez iki ayrı tözdür" görüşü Düalizmin en klasik örneğidir.',
    isHighYield: true,
  },
  {
    id: 'phil_varlik_olus_idea_madde',
    term: 'Varlığın Niteliği: Oluş, İdea ve Madde',
    shortCode: 'Herakleitos – Platon – Demokritos',
    thinkerOrField: 'Klasik Ontoloji',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Oluşçuluk (Herakleitos: "Aynı ırmakta iki kez yıkanılmaz", Whitehead), İdealizm (Platon, Aristoteles, Fârâbî, Hegel: asıl varlık düşünce/ruhtur), Materyalizm (Demokritos, Hobbes, La Mettrie, Marx: asıl varlık maddedir).',
    examTip:
      'Herakleitos’ta değişmeyen tek yasa "Logos" iken Parmenides değişimi reddedip "Varlık vardır, değişmez" der.',
    isHighYield: true,
  },
  {
    id: 'phil_cagdas_ontoloji',
    term: 'Çağdaş Varlık Anlayışları (Fenomenoloji, Yeni Ontoloji, Varoluşçuluk)',
    shortCode: 'Husserl – Hartmann – Sartre',
    thinkerOrField: '20. yy Ontoloji',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Fenomenoloji (Husserl · öze ulaşmak için olguları paranteze alma), Yeni Ontoloji (Hartmann · inorganik, organik, ruhsal, tinsel 4 katman), Varoluşçuluk (Sartre · "Varoluş özden önce gelir"), Pragmatizm (James/Dewey).',
    examTip:
      'Sartre’a göre insan önce dünyaya gelir (var olur), sonra kendi seçimleriyle kendi özünü (kimliğini) yaratır.',
    isHighYield: true,
  },
  {
    id: 'phil_epistemoloji_imkan',
    term: 'Epistemoloji: Doğru Bilginin İmkânı (Septisizm vs Dogmatizm)',
    shortCode: 'Pyrrhon & Sofistler',
    thinkerOrField: 'Bilgi Felsefesi',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Septikler (Sofistler: Protagoras/Gorgias, Pyrrhon, Timon) duyuların yanıldığını söyleyerek kesin/genelgeçer bilgiyi reddeder; Dogmatikler ise doğru bilginin mümkün olduğunu savunur.',
    examTip:
      'Protagoras’ın "İnsan her şeyin ölçüsüdür" sözü bilginin kişiye göre değiştiğini savunan Rölativizmin temelidir.',
    isHighYield: true,
  },
  {
    id: 'phil_rasyonalizm_empirizm',
    term: 'Rasyonalizm (Akılcılık) ve Empirizm (Deneycilik)',
    shortCode: 'A Priori vs Tabula Rasa',
    thinkerOrField: 'Platon-Descartes vs Locke-Hume',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Rasyonalizm (Sokrates, Platon, Aristoteles, Fârâbî, Descartes, Hegel): Bilgi doğuştan akılda vardır (a priori). Empirizm (John Locke, David Hume, Berkeley): Zihin doğuştan boş levhadır (Tabula Rasa), bilgi deneyle (a posteriori) oluşur.',
    examTip:
      'David Hume "nedensellik" ilkesinin zorunlu akıl bilgisi değil sadece zihinsel bir alışkanlık olduğunu ileri sürmüştür.',
    isHighYield: true,
  },
  {
    id: 'phil_kritisizm_entuisyonizm',
    term: 'Kritisizm (Kant), Entüisyonizm & Pozitivizm',
    shortCode: 'Akıl + Deney / Sezgi',
    thinkerOrField: 'Kant · Bergson · Comte',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kritisizm (Kant: "Görüsüz kavramlar boş, kavramsız görüler kördür" · deney + akıl sentezi), Entüisyonizm (Gazâlî · kalp gözü, Bergson · sezgi), Pozitivizm (Comte · yalnız olgusal bilim).',
    examTip:
      'Kant, Rasyonalizm ve Empirizmi "Bilgi deneyle başlar ama deneyden doğmaz" diyerek uzlaştırmıştır.',
    isHighYield: true,
  },
  {
    id: 'phil_pragmatizm_analitik',
    term: 'Pragmatizm (Faydacılık) ve Analitik Felsefe',
    shortCode: 'James-Dewey · Wittgenstein',
    thinkerOrField: 'Çağdaş Bilgi',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Pragmatizm (William James, John Dewey) işe yarayan ve fayda sağlayan bilgiyi doğru sayar. Analitik Felsefe (Wittgenstein, Russell) felsefenin işini dil ve mantık çözümlemesi olarak görür.',
    examTip:
      'Wittgenstein "Üzerinde konuşulamayan konuda susmalı" diyerek dilin sınırlarının dünyanın sınırlarını çizdiğini savunur.',
    isHighYield: true,
  },
  {
    id: 'phil_dogruluk_olcutleri',
    term: 'Doğru Bilginin Beş Ölçütü',
    shortCode: '5 Ölçüt',
    thinkerOrField: 'Bilginin Değeri',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      '1. Uygunluk (düşünce–nesne uyumu), 2. Tutarlılık (çelişkisizlik), 3. Tümel Uzlaşım (çoğunluğun ortak kabulü), 4. Apaçıklık (Descartes · açık ve seçik olma), 5. Yarar (Pragmatizm · işe yarama).',
    examTip:
      '"Dışarıda yağmur yağıyor" sözünün pencereden bakılıp yağmurla örtüşmesi "Uygunluk" ölçütüdür.',
    isHighYield: true,
  },
  {
    id: 'phil_bilim_ozellikleri_islev',
    term: 'Bilim Felsefesi: Bilimsel Yöntem, Betimleme & Açıklama',
    shortCode: 'Hipotez → Kuram',
    thinkerOrField: 'Bilimsel Süreç',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Bilim olgusal, nesnel, evrensel, mantıksal, genelleyici ve birikimlidir. Gözlem-betimleme yapar, hipotez (geçici çözüm) kurar, deneyle doğrulananları kuram ve yasaya dönüştürür.',
    examTip:
      'Bilimin temel amacı olguları öngörme (öndeyi) ve doğayı kontrol altına alma gücü sağlamaktır.',
    isHighYield: true,
  },
  {
    id: 'phil_urun_etkinlik_bilim',
    term: 'Ürün Olarak Bilim vs Etkinlik Olarak Bilim',
    shortCode: 'Carnap vs Kuhn',
    thinkerOrField: 'Bilime İki Bakış',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Klasik/Mantıkçı Pozitivizm (Carnap, Reichenbach) bilimi tamamlanmış dilsel önermeler bütünü (Ürün) görür; Tarihsel-Sosyolojik yaklaşım (Kuhn) bilimi bilim insanlarının toplumsal pratiği (Etkinlik) sayar.',
    examTip:
      'Etkinlik olarak bilim anlayışı bilim insanlarının değer yargılarını ve tarihsel kırılmaları (paradigmaları) dikkate alır.',
    isHighYield: true,
  },
  {
    id: 'phil_popper_yanlislanabilirlik',
    term: 'Karl Popper ve Yanlışlanabilirlik Ölçütü',
    shortCode: 'Yanlışlama',
    thinkerOrField: 'Eleştirel Akılcılık',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Popper tümevarım ve "doğrulanabilirlik" yerine "yanlışlanabilirliği" bilimsellik ölçütü yapar; milyonlarca beyaz kuğu "bütün kuğular beyazdır"ı kesin doğrulamaz ama tek bir siyah kuğu yanlışlar.',
    examTip:
      'Yanlışlanmaya kapalı (her koşulda doğru çıkan) teoriler Popper’a göre bilimsel değil dogmatiktir.',
    isHighYield: true,
  },
  {
    id: 'phil_kuhn_paradigma',
    term: 'Thomas Kuhn: Paradigma ve Bilimsel Devrim',
    shortCode: 'Paradigma Kayması',
    thinkerOrField: 'Bilim Tarihi',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Paradigma bir dönem bilim topluluğunun paylaştığı ortak kuram ve bakış açısıdır. Olağan bilim dönemindeki bunalımlar (anomaliler) çözülünce eski paradigma yıkılıp "Bilimsel Devrim"le yeni paradigmalar doğar.',
    examTip:
      'Kuhn’a göre bilim düz çizgide birikerek değil, devrimsel sıçramalarla (ör. Newton → Einstein) dönüşür.',
    isHighYield: true,
  },
  {
    id: 'phil_bilim_teknoloji_etik',
    term: 'Bilim, Felsefe ve Teknoloji İlişkisi',
    shortCode: 'Etik Sorumluluk',
    thinkerOrField: 'Bilim Ahlakı',
    category: 'VARLIK_BILGI_BILIM',
    examLevel: 'TYT_AYT',
    mechanism:
      'Bilim "olan"ı inceler, felsefe bilimin sınırlarını ve değerini sorgular; teknoloji bilimsel bilginin pratiğe uygulanmasıdır ve çevre/etik sorumluluk gerektirir.',
    examTip:
      'Bilim insanının verileri çarpıtmaması, intihal yapmaması ve insanlığın yararını gözetmesi bilim etiğidir.',
    isHighYield: false,
  },

  // =========================================================================
  // 3. DEĞER FELSEFESİ: AHLAK, DİN, SİYASET & SANAT (15 KAVRAM)
  // =========================================================================
  {
    id: 'phil_etik_ahlak',
    term: 'Ahlak ve Etik (Ahlak Felsefesi) Ayrımı',
    shortCode: 'Pratik vs Teori',
    thinkerOrField: 'Ahlak Felsefesi',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Ahlak bir toplumda fiilen uyulan geleneksel iyi-kötü kurallarıdır (kültüre göre değişir); Etik ise ahlaki kavramları evrensel ve felsefi düzeyde temellendiren disiplindir.',
    examTip:
      'Ödev, vicdan, erdem, iyi ve kötü ahlak felsefesinin temel kavramlarıdır.',
    isHighYield: true,
  },
  {
    id: 'phil_ozgurluk_sorumluluk',
    term: 'Özgürlük Yaklaşımları (Determinizm – Otodeterminizm)',
    shortCode: '4 Görüş',
    thinkerOrField: 'İrade Özgürlüğü',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Determinizm (eylemler nedenlerle belirlenir, özgürlük yoktur), Fatalizm (yazgıcılık · her şey önceden yazılıdır), İndeterminizm (insan tamamen özgürdür), Otodeterminizm (kişi aklıyla kendi özgürlüğünü kurar).',
    examTip:
      'Sorumluluk özgürlük gerektirir; katı determinizm ve fatalizm ahlaki sorumluluğu ortadan kaldırır.',
    isHighYield: true,
  },
  {
    id: 'phil_evrensel_ahlak_kabul',
    term: 'Evrensel Ahlak Yasasını Kabul Edenler',
    shortCode: 'Bentham · Spinoza · Kant',
    thinkerOrField: 'Objektif & Sübjektif',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Sübjektif Temel: Utilitarizm (Bentham, Mill: "En çok sayıda insana en büyük mutluluk/fayda"), Entüisyonizm (Bergson: sezgi). Objektif Temel: Sokrates/Platon/Aristoteles (erdem), Spinoza (ahlaksal determinizm), Kant (ödev etiği).',
    examTip:
      'Kant’a göre bir eylem çıkar için değil, yalnız "ödev duygusu ve iyi niyetle" ve evrensel yasa olabilecek biçimde yapılırsa ahlakidir.',
    isHighYield: true,
  },
  {
    id: 'phil_evrensel_ahlak_ret',
    term: 'Evrensel Ahlak Yasasını Reddedenler',
    shortCode: 'Hedonizm · Egoizm · Sartre',
    thinkerOrField: 'Nietzsche & Anarşizm',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hedonizm (Aristippos, Epiküros: amaç hazdır), Egoizm (Hobbes: insan kendini koruma bencilliğindedir), Anarşizm (Bakunin, Proudhon), Nietzsche ("Üst İnsan" kendi değerini yaratır), Sartre (Varoluşçuluk).',
    examTip:
      'Nietzsche geleneksel "sürü ahlakını" eleştirip kendi değerlerini üreten "Üst İnsan" (Übermensch) idealini savunur.',
    isHighYield: true,
  },
  {
    id: 'phil_din_felsefesi_teoloji',
    term: 'Din Felsefesi ve Teoloji (İlahiyat) Farkı',
    shortCode: 'Sorgulama vs Dogma',
    thinkerOrField: 'Din Felsefesi',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Teoloji belirli bir dini (İslam, Hristiyanlık) dogmalarıyla kabul edip inananlara anlatır; Din Felsefesi ise herhangi bir dine bağlı olmadan tüm dinlerin özünü nesnel ve rasyonel biçimde sorgular.',
    examTip:
      'Teoloji imanı güçlendirmeyi amaçlarken din felsefesi tarafsız akıl yürütme ve anlamlandırma yapar.',
    isHighYield: true,
  },
  {
    id: 'phil_tanri_gorusleri',
    term: 'Tanrı’nın Varlığına İlişkin Felsefi Görüşler',
    shortCode: 'Panteizm vs Panenteizm',
    thinkerOrField: 'Din Felsefesi',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Teizm (aşkın ve müdahil Tanrı), Deizm (yaratıp karışmayan), Panteizm (Spinoza · "Tanrı = Evren", her şey Tanrı’dır), Panenteizm ("Her şey Tanrı’dadır" · hem aşkın hem içkin), Ateizm (yoktur), Agnostisizm (bilinemez).',
    examTip:
      'Panteizmde Tanrı ile evren özdeştir; Panenteizmde ise evren Tanrı’nın içindedir ama Tanrı evrenden ibaret olmayıp onu aşar.',
    isHighYield: true,
  },
  {
    id: 'phil_siyaset_temel_kavramlar',
    term: 'Siyaset Felsefesi: İktidar, Meşruiyet & Egemenlik',
    shortCode: 'Weber · Egemenlik',
    thinkerOrField: 'Devlet Felsefesi',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Meşruiyet iktidarın hukuka ve rızaya uygunluğudur. Max Weber’e göre 3 egemenlik tipi vardır: Geleneksel (monarşi/töre), Karizmatik (olağanüstü liderlik) ve Rasyonel-Yasal (anayasa/hukuk).',
    examTip:
      'Bürokrasi devlet işlerinin kurallı memur hiyerarşisiyle yürütülmesi; Sivil Toplum ise devletten özerk gönüllü örgütlerdir.',
    isHighYield: true,
  },
  {
    id: 'phil_iktidar_kaynagi_sozlesme',
    term: 'Devletin Ortaya Çıkışı ve Toplumsal Sözleşme',
    shortCode: 'Hobbes · Locke · Rousseau',
    thinkerOrField: 'Siyaset Kuramları',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Devlet doğal kurumdur (Platon, Aristoteles, Fârâbî) diyenlere karşı Hobbes ("İnsan insanın kurdudur" · Leviathan), Locke ve Rousseau devletin insanların haklarını korumak için yaptığı "Toplumsal Sözleşme"den doğduğunu savunur.',
    examTip:
      'Montesquieu özgürlük için Yasama, Yürütme ve Yargı’nın ayrıldığı "Güçler Ayrılığı" ilkesini geliştirmiştir.',
    isHighYield: true,
  },
  {
    id: 'phil_ideal_duzen_arayislari',
    term: 'İdeal Düzen Arayışları (Özgürlük, Eşitlik, Adalet)',
    shortCode: '3 Siyasi Yaklaşım',
    thinkerOrField: 'İdeal Devlet',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Özgürlüğü temel alan Liberalizm (Locke, Adam Smith), Eşitliği temel alan Sosyalizm (Marx, Saint-Simon) ve ikisini birleştirmeye çalışan Sosyal Devlet / Adalet (John Rawls) modelleri.',
    examTip:
      'Sofistler ve Anarşistler ise hiçbir ideal/evrensel devlet düzeninin mümkün olmadığını savunur.',
    isHighYield: false,
  },
  {
    id: 'phil_utopyalar_distopyalar',
    term: 'İstenen Ütopyalar ve Korku Ütopyaları (Distopyalar)',
    shortCode: 'Morus – Orwell – Huxley',
    thinkerOrField: 'Ütopya Edebiyatı',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'İstenen Ütopyalar: Platon (Devlet), Fârâbî (El-Medinetü’l-Fazıla), Thomas More (Ütopya), Campanella (Güneş Ülkesi), Bacon (Yeni Atlantis). Distopyalar: George Orwell (1984), Aldous Huxley (Cesur Yeni Dünya).',
    examTip:
      'Distopyalar teknoloji veya totaliter devletlerin birey özgürlüğünü nasıl yok edebileceğini uyarmak amacıyla yazılır.',
    isHighYield: true,
  },
  {
    id: 'phil_estetik_sanat_felsefesi',
    term: 'Estetik ve Sanat Felsefesi Ayrımı',
    shortCode: 'Doğal & Sanatsal Güzel',
    thinkerOrField: 'Estetik Kavramı',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Estetik hem doğadaki hem sanattaki güzelliği incelerken, Sanat Felsefesi yalnızca insan eliyle üretilmiş sanat eserini ve sanattaki güzelliği konu edinir.',
    examTip:
      'Bir gün batımı Estetiğin konusu iken bir yağlı boya gün batımı tablosu hem Estetiğin hem Sanat Felsefesinin konusudur.',
    isHighYield: true,
  },
  {
    id: 'phil_sanat_kuramlari',
    term: 'Sanatı Açıklayan Üç Temel Kuram',
    shortCode: 'Taklit – Yaratma – Oyun',
    thinkerOrField: 'Platon · Croce · Schiller',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      '1. Taklit (Mimesis · Platon, Aristoteles: sanat doğayı/ideayı yansıtır), 2. Yaratma (Benedetto Croce: sanatçı doğada olmayan özgün ifadeyi yaratır), 3. Oyun (Friedrich Schiller: sanat çıkarsız bir oyundur).',
    examTip:
      'Croce’ye göre her sanat eseri biricik ve tektir; doğadaki bir şeyin bire bir kopyası sanat sayılamaz.',
    isHighYield: true,
  },
  {
    id: 'phil_sanat_eseri_ozellikleri',
    term: 'Sanat Eserinin ve Estetik Yargıların Özellikleri',
    shortCode: 'Özgün & Çıkarsız',
    thinkerOrField: 'Kant Estetiği',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Sanat eseri biricik ve özgündür, maddi/pratik çıkar amacı gütmez (Kant: "çıkarsız hoşlanma"), yaratıcısının öznelliğini taşır ve evrensel beğeniye hitap eder.',
    examTip:
      'Kant’a göre estetik yargı "Hoştur" gibi kişisel zevkten farklı olarak herkesten onay bekleyen öznel-evrensel bir beğeni yargısıdır.',
    isHighYield: false,
  },
  {
    id: 'phil_guzel_iyi_dogru',
    term: 'Güzelin Doğru, İyi ve Hoş ile İlişkisi',
    shortCode: 'Estetik Değerler',
    thinkerOrField: 'Değerler İlişkisi',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Doğru bilginin, İyi ahlakın, Faydalı tekniğin, Hoş duyusal hazzın, Güzel ise estetik değerin ölçütüdür; bir sanat eseri ahlaken kötü bir olayı anlatsa bile estetik açıdan güzel olabilir.',
    examTip:
      'Antik Yunan’da (Platon) güzel ile iyi birbirine yakın görülürken Modern çağda (Kant) estetik tamamen özerk sayılmıştır.',
    isHighYield: false,
  },
  {
    id: 'phil_birey_hak_adalet',
    term: 'Birey, Hak, Hukuk ve Özgürlük İlişkisi',
    shortCode: 'Doğal Haklar',
    thinkerOrField: 'Siyasi Etik',
    category: 'AHLAK_DIN_SIYASET_SANAT',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hak hukukun bireye tanıdığı yetkidir; adalet ise hakların dengeli ve eşit dağıtılmasıdır. John Locke’a göre yaşama, özgürlük ve mülkiyet devredilemez doğal haklardır.',
    examTip:
      'Pozitif hukuk devletin koyduğu yazılı yasalar iken Doğal Hukuk (tabii hukuk) tüm insanların doğuştan getirdiği evrensel haklardır.',
    isHighYield: false,
  },

  // =========================================================================
  // 4. MÖ 6.yy – MS 17.yy FELSEFE TARİHİ (15 KAVRAM)
  // =========================================================================
  {
    id: 'phil_doga_filozoflari_arkhe',
    term: 'İlk Çağ Doğa Filozofları ve Arkhe Sorunu',
    shortCode: 'Milet Okulu',
    thinkerOrField: 'Thales → Demokritos',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'Evrenin ilk ana maddesi (Arkhe) nedir? Thales (Su), Anaksimandros (Apeiron · sınırsız/belirsiz), Anaksimenes (Hava), Empedokles (Toprak-Su-Hava-Ateş + Sevgi/Nefret), Anaksagoras (Nous/Akıl), Demokritos (Atom).',
    examTip:
      'MÖ 6. yüzyılda Milet’te (Didim/Söke) başlayan bu arayış, mitoloji yerine akla ve doğaya dayalı ilk bilimsel-felsefi açıklamadır.',
    isHighYield: true,
  },
  {
    id: 'phil_herakleitos_parmenides',
    term: 'Herakleitos (Oluş) vs Parmenides (Değişmezlik)',
    shortCode: 'Logos vs Bir',
    thinkerOrField: 'MÖ 6–5. yy Diyalektik',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'Herakleitos arkheyi "Ateş" olarak görüp her şeyin zıtların çatışmasıyla sürekli aktığını ("Panta rhei") söyler; Parmenides ise değişimi bir yanılsama sayıp "Varlık vardır, yokluk yoktur ve değişmez" der.',
    examTip:
      'Herakleitos’un zıtların birliği düşüncesi ileride Hegel ve Marx’ın diyalektik yöntemine ilham kaynağı olmuştur.',
    isHighYield: true,
  },
  {
    id: 'phil_sofistler_sokrates',
    term: 'Sofistler ve Sokrates’in Ahlak/Bilgi Anlayışı',
    shortCode: 'Maieutik · Bilgi=Erdem',
    thinkerOrField: 'MÖ 5. yy Atina',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'Sofistler (Protagoras, Gorgias) göreci/rölativisttir; Sokrates ise evrensel doğruların doğuştan akılda olduğunu savunur ve İroni + Doğurtmaca (Maieutik) yöntemiyle sorgular ("Bilgi erdemdir, kimse bilerek kötülük yapmaz").',
    examTip:
      '"Sorgulanmamış yaşam yaşanmaya değmez" ve "Bildiğim tek şey hiçbir şey bilmediğimdir" Sokrates’in temel ilkeleridir.',
    isHighYield: true,
  },
  {
    id: 'phil_platon',
    term: 'Platon (İdealar Kuramı, Episteme vs Doxa)',
    shortCode: 'İki Dünya',
    thinkerOrField: 'MÖ 427–347 · Akademia',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'İki evren vardır: Değişmez ve gerçek "İdealar Dünyası" (bilgisi akılla elde edilen Episteme) ve onun gölgesi "Duyular/Fenomenler Dünyası" (sanı/Doxa). En üst idea "İyi İdeası"dır; devleti bilge filozoflar yönetmelidir.',
    examTip:
      'Platon’un "Mağara Benzetmesi" duyular dünyasındaki yanılsamadan akıl yoluyla idealar gerçeğine çıkışı simgeler.',
    isHighYield: true,
  },
  {
    id: 'phil_aristoteles',
    term: 'Aristoteles (Madde-Form, 4 Neden & Altın Orta)',
    shortCode: 'Altın Orta',
    thinkerOrField: 'MÖ 384–322 · Lykeion',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'Platon’dan farklı olarak "öz (Form)" maddeden ayrı değil maddenin içindedir. Bir varlık 4 Nedenle açıklanır (Maddi, Formsel, Fail, Ereksel). Ahlakta aşırılıklardan uzak "Altın Orta" erdemdir.',
    examTip:
      'Bir heykelin mermeri Maddi, şekli Formsel, heykeltıraşı Fail, estetik sergilenme amacı ise Ereksel nedendir.',
    isHighYield: true,
  },
  {
    id: 'phil_patristik_skolastik',
    term: 'Hristiyan Felsefesi: Patristik ve Skolastik Dönem',
    shortCode: 'MS 2 – 15. yy',
    thinkerOrField: 'Tertullian · Augustinus · Anselmus',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'Patristik Dönem (Kilise Babaları, Apoloji/savunma · Augustinus) ve Skolastik Dönem (Okul felsefesi · Anselmus, Aquinalı Thomas). Temel problemler: Tanrı’nın varlığı, kötülük problemi ve inanç–akıl ilişkisi.',
    examTip:
      'Tertullian "Akıl almaz (saçma) olduğu için inanıyorum" derken Augustinus ve Anselmus "Anlamak için inanıyorum" ilkesini savunur.',
    isHighYield: true,
  },
  {
    id: 'phil_tumeller_tartismasi',
    term: 'Tümeller Tartışması (Orta Çağ)',
    shortCode: '3 Yaklaşım',
    thinkerOrField: 'Augustinus · Thomas · Ockham',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'Genel kavramların ("insanlık", "ağaçlık") gerçekliği sorunu: Kavram Realizmi (tümeller tekillerden önce ayrı vardır), Konseptüalizm (tümeller tekillerin içinde/zihindedir), Nominalizm / Adcılık (Ockhamlı William: tümeller yalnızca isimdir, yalnız tekiller vardır).',
    examTip:
      'Nominalizm (Adcılık) tekil olgulara yönelerek Yeni Çağ doğa bilimlerinin ve deneyciliğin yolunu açmıştır.',
    isHighYield: true,
  },
  {
    id: 'phil_islam_felsefesi_el_kindi_farabi',
    term: 'İslam Felsefesi: El-Kindî, Fârâbî ve İbn Sînâ',
    shortCode: 'Hudûs & Zorunlu Varlık',
    thinkerOrField: 'MS 8 – 12. yy',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'El-Kindî (ilk İslam filozofu · evren sonradan yaratılmıştır: Hudûs delili). Fârâbî ve İbn Sînâ varlığı Zorunlu Varlık (Vacibü’l-Vücud / Allah) ve Mümkün Varlık olarak ayırır; Fârâbî "Erdemli Şehir"i yazar.',
    examTip:
      'İbn Sînâ’nın "Uçan Adam" düşünce deneyi ruhun bedenden bağımsız bir cevher olduğunu kanıtlamayı hedefler.',
    isHighYield: true,
  },
  {
    id: 'phil_gazali_ibn_rusd',
    term: 'Gazâlî ve İbn Rüşd Tartışması (Tehâfüt)',
    shortCode: 'Akıl vs Kalp Gözü',
    thinkerOrField: '11 – 12. yy İslam Düşüncesi',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'Gazâlî "Tehâfütü’l-Felâsife" (Filozofların Tutarsızlığı) ile aklın metafizik alanda yetersiz olduğunu, hakikate "kalp gözü/sezgi" ile ulaşılacağını savundu; İbn Rüşd ise "Tehâfütü’t-Tehâfüt" ile din ile felsefenin çelişmeyeceğini savunup aklı savundu.',
    examTip:
      'İbn Rüşd’ün Aristoteles şerhleri Latinceye çevrilerek Avrupa’da Rönesans ve rasyonalizmin doğuşunu tetiklemiştir.',
    isHighYield: true,
  },
  {
    id: 'phil_tasavvuf_filozoflari',
    term: 'Anadolu Tasavvuf Düşüncesi (İbn Arabî, Mevlana, Yunus, Hacı Bektaş)',
    shortCode: 'Vahdet-i Vücud',
    thinkerOrField: 'Anadolu İrfanı',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'İbn Arabî’nin "Vahdet-i Vücud" (Varlığın Birliği) anlayışıyla temellenen bu çizgide Mevlana, Yunus Emre ve Hacı Bektaş Veli insanı sevgi, hoşgörü ve aşk merkezinde evrenin özü olarak yorumlar.',
    examTip:
      'Vahdet-i Vücud evrendeki her şeyi gerçek tek varlık olan Allah’ın tecellisi (yansıması) olarak görür.',
    isHighYield: false,
  },
  {
    id: 'phil_ronesans_humanizm',
    term: '15–17. Yüzyıl: Çeviriler, Hümanizm & Rönesans',
    shortCode: 'İnsan Merkezli Çağ',
    thinkerOrField: 'Skolastikten Modernizme',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      '12. yy’dan itibaren İslam dünyasından yapılan çeviriler Avrupa’da Antik Yunan’ı yeniden keşfettirdi. Hümanizm insanı ve aklını merkeze alarak Kilise dogmalarından özgürleşen modern felsefeyi başlattı.',
    examTip:
      'Orta Çağ teosantrik (Tanrı merkezli) iken Rönesans antroposantrik (insan merkezli) bir dünya görüşü getirmiştir.',
    isHighYield: true,
  },
  {
    id: 'phil_bilimsel_yontem_bacon',
    term: 'Bilimsel Devrim: Kopernik, Galilei, Newton & Francis Bacon',
    shortCode: 'Bilgi Güçtür',
    thinkerOrField: '16 – 17. yy Bilimi',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kopernik güneş merkezli evreni kurdu, Galilei deneysel fiziği, Newton evrensel çekimi buldu. Francis Bacon "Bilgi güçtür" diyerek zihindeki önyargıları (İdoller) temizleyip tümevarım yöntemini (Novum Organum) önerdi.',
    examTip:
      'Bacon’ın "idoller" (soy, mağara, çarşı, tiyatro) kuramı insanı bilimsel doğrudan uzaklaştıran önyargıları sınıflandırır.',
    isHighYield: true,
  },
  {
    id: 'phil_descartes_kartezyen',
    term: 'Descartes (Kartezyen Felsefe)',
    shortCode: 'Cogito Ergo Sum',
    thinkerOrField: '17. yy Rasyonalizmi',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'Metodik şüphe ile tüm duyusal bilgileri sorgulayan Descartes şüphe edemediği tek gerçek olarak "Düşünüyorum, o hâlde varım"a ulaşır; varlıkta Ruh (düşünce) ve Madde (yer kaplama) düalizmini kurar.',
    examTip:
      'Modern felsefenin kurucusu sayılan Descartes bilgiyi matematiksel kesinliğe dayandırmayı amaçlamıştır.',
    isHighYield: true,
  },
  {
    id: 'phil_spinoza_etika',
    term: 'Spinoza ve Geometrik Ahlak (Etika)',
    shortCode: 'Tanrı = Doğa',
    thinkerOrField: '17. yy Panteizmi',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'Descartes’ın iki tözünü reddedip tek töz olarak "Tanrı ya da Doğa"yı (Deus sive Natura) kabul eden Spinoza’ya göre özgürlük doğadaki zorunluluğu akılla kavramaktır.',
    examTip:
      'Spinoza Panteizmin ve rasyonel monizmin modern çağdaki en güçlü temsilcisidir.',
    isHighYield: false,
  },
  {
    id: 'phil_hobbes_machiavelli',
    term: 'Machiavelli ve Thomas Hobbes (Siyaset Dönüşümü)',
    shortCode: 'Leviathan & Prens',
    thinkerOrField: '16 – 17. yy Siyaseti',
    category: 'ILK_ORTA_YENI_CAG',
    examLevel: 'TYT_AYT',
    mechanism:
      'Machiavelli ("Prens") siyaseti ahlak ve dinden ayırıp devletin bekasını önceledi. Hobbes ("Leviathan") ise doğal durumdaki "herkesin herkesle savaşı"nı bitirmek için tüm hakların devlete devredildiği mutlak sözleşmeyi savundu.',
    examTip:
      '"İnsan insanın kurdudur" (Homo homini lupus) sözü Thomas Hobbes’un devlet kuramının çıkış noktasıdır.',
    isHighYield: true,
  },

  // =========================================================================
  // 5. 18–20.yy FELSEFESİ & TÜRKİYE'DE FELSEFE (15 KAVRAM)
  // =========================================================================
  {
    id: 'phil_aydinlanma_nedir',
    term: '18–19. yy Aydınlanma Felsefesi ("Aklını Kullanma Cesareti")',
    shortCode: 'Sapere Aude',
    thinkerOrField: 'Aydınlanma Çağı',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kant’ın "Aklını kendin kullanma cesaretini göster!" (Sapere Aude) sözüyle özetlenen dönemdir. Dinî ve geleneksel otoriteler yerine akıl, deney, ilerleme ve bireysel özgürlük öne çıkmıştır.',
    examTip:
      '18. yy Aydınlanma düşüncesi Fransız İhtilali’nin ve insan hakları bildirgelerinin fikrî zeminini hazırlamıştır.',
    isHighYield: true,
  },
  {
    id: 'phil_locke_montesquieu_rousseau',
    term: 'Locke, Montesquieu ve Rousseau (Birey–Devlet İlişkisi)',
    shortCode: 'Güçler Ayrılığı',
    thinkerOrField: '18. yy Siyaset Felsefesi',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'John Locke devleti doğal hakları koruyan sınırlı iktidar gördü; Montesquieu "Yasalar’ın Ruhu"nda Güçler Ayrılığını kuramlaştırdı; Rousseau "Toplum Sözleşmesi"nde "Genel İrade" ve halk egemenliğini savundu.',
    examTip:
      'Rousseau "İnsan özgür doğar oysa her yerde zincire vurulmuştur" diyerek mülkiyetin eşitsizlik doğurduğunu vurgular.',
    isHighYield: true,
  },
  {
    id: 'phil_kant_odev_ahlaki',
    term: 'Immanuel Kant: Ödev Ahlakı, İyi Niyet & Kritisizm',
    shortCode: 'Kategorik Buyruk',
    thinkerOrField: '18. yy Alman Felsefesi',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kant ahlakı sonuç veya çıkara değil "ödev duygusuna ve iyi istence" bağlar. Kategorik buyruk: "Öyle davran ki davranışının ilkesi (maksimi) tüm insanlar için evrensel yasa olabilsin."',
    examTip:
      'Esnafın müşteri kaybetmemek için dürüst olması "ödeve uygun"dur ama yalnız vicdani sorumlulukla dürüst olması "ödevden dolayı" ahlakidir.',
    isHighYield: true,
  },
  {
    id: 'phil_hegel_diyalektik',
    term: 'Hegel: Diyalektik İdealizm (Tez – Antitez – Sentez)',
    shortCode: 'Geist (Tin)',
    thinkerOrField: '19. yy Alman İdealizmi',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      '"Gerçek olan akılsal, akılsal olan gerçektir." Evren ve tarih mutlak ruhun (Geist/Tin) Tez → Antitez → Sentez biçimindeki üçlü diyalektik açılımıdır.',
    examTip:
      'Bir tohumun (Tez) toprakta çürüyüp filizlenmesi (Antitez) ve sonunda meyve veren ağaca dönüşmesi (Sentez) Hegel diyalektiğini özetler.',
    isHighYield: true,
  },
  {
    id: 'phil_aydinlanma_dil_edebiyat',
    term: '18–19. yy Felsefesinin Dil ve Edebiyatla İlişkisi',
    shortCode: 'Voltaire & Rousseau',
    thinkerOrField: 'Edebiyat – Felsefe',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Aydınlanma filozofları (Voltaire "Candide", Rousseau "Emile", Diderot "Ansiklopedi") felsefeyi üniversite dışına çıkarıp roman, deneme ve tiyatroyla geniş halka ulaştırmıştır.',
    examTip:
      'Fransız ve Alman edebiyatındaki felsefi roman geleneği 18–19. yy düşüncesinin halka yayılmasını sağlamıştır.',
    isHighYield: false,
  },
  {
    id: 'phil_fenomenoloji_husserl',
    term: 'Fenomenoloji (Görüngübilim) – Edmund Husserl',
    shortCode: 'Paranteze Alma',
    thinkerOrField: '20. yy Felsefesi',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Fenomenoloji nesnelerin bilince görünen "öz"ünü kavramayı amaçlar. Özün bilgisine ulaşmak için bilimsel/gündelik önyargıların geçici olarak askıya alınmasına "Paranteze Alma" denir.',
    examTip:
      'Husserl "Özlerin kendisine dönelim" diyerek olgulardan değil bilinçteki saf anlam ve özden hareket eder.',
    isHighYield: true,
  },
  {
    id: 'phil_hermeneutik',
    term: 'Hermeneutik (Yorum Bilgisi) – Dilthey & Gadamer',
    shortCode: 'Anlama ve Yorum',
    thinkerOrField: '20. yy Felsefesi',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Dilthey doğa bilimlerinin "açıklama" yaptığını, insan/tin bilimlerinin ise tarihsel bağlam içinde "anlama" (yorumlama) yaptığını savunur; Gadamer her anlamayı "ufukların kaynaşması" olarak görür.',
    examTip:
      'Hermeneutik köken olarak kutsal metinleri yorumlama sanatıyken 20. yy’da tüm insan ve tarih bilimlerinin yöntemine dönüşmüştür.',
    isHighYield: true,
  },
  {
    id: 'phil_varolusculuk',
    term: 'Varoluşçuluk (Egzistansiyalizm) – Kierkegaard, Sartre, Camus',
    shortCode: 'Özgürlük Mahkûmu',
    thinkerOrField: '20. yy Felsefesi',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Sartre’a göre "Varoluş özden önce gelir"; insan önce var olur, sonra seçimleriyle kendini inşa eder ve "özgürlüğe mahkûmdur". Kierkegaard dindar, Nietzsche ve Sartre ateist kanadı temsil eder.',
    examTip:
      'Albert Camus "Sisifos Söyleni" ve "Yabancı"da hayatın anlamsızlığı (absürt) karşısındaki insan direncini işler.',
    isHighYield: true,
  },
  {
    id: 'phil_diyalektik_materyalizm',
    term: 'Diyalektik Materyalizm – Karl Marx & Friedrich Engels',
    shortCode: 'Altyapı & Üstyapı',
    thinkerOrField: '20. yy Felsefesi',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hegel’in idealist diyalektiğini "baş aşağı çevirip" maddeye oturtan Marx’a göre tarihi belirleyen şey fikirler değil üretim araçları ve sınıf çatışmalarıdır (ekonomik altyapı, hukuk/din/sanat üstyapısını belirler).',
    examTip:
      'Marx’ın "Filozoflar dünyayı çeşitli biçimlerde yorumladılar; oysa sorun onu değiştirmektir" sözü felsefesinin özetidir.',
    isHighYield: true,
  },
  {
    id: 'phil_mantikci_pozitivizm',
    term: 'Mantıkçı Pozitivizm (Viyana Çevresi) & Doğrulanabilirlik',
    shortCode: 'Carnap · Wittgenstein',
    thinkerOrField: '20. yy Bilim/Dil',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Yalnızca deneysel olarak doğrulanabilen veya mantıksal-matematiksel önermeler anlamlıdır; metafizik önermeler doğrulanamadığı için "anlamsız" sayılır.',
    examTip:
      'Karl Popper, Mantıkçı Pozitivizmin "doğrulanabilirlik" ölçütünü eleştirerek yerine "yanlışlanabilirlik" ilkesini getirmiştir.',
    isHighYield: true,
  },
  {
    id: 'phil_yeni_ontoloji_hartmann',
    term: 'Yeni Ontoloji – Nicolai Hartmann',
    shortCode: '4 Varlık Katmanı',
    thinkerOrField: '20. yy Ontolojisi',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Bilgi felsefesinden önce varlık biliminin (ontoloji) geldiğini savunan Hartmann varlığı alttan üste 4 katmana ayırır: İnorganik (cansız), Organik (canlı), Ruhsal (bilinçli) ve Tinsel (özgür insan/kültür).',
    examTip:
      'Alt katmanlar üst katmanları taşır ancak daha özgür olan üst katman (tin) alt katmana indirgenemez.',
    isHighYield: false,
  },
  {
    id: 'phil_turkiye_felsefe_tarihsel',
    term: 'Türkiye’de Felsefenin Gelişimi (Darülfünun → 1933 Reformu)',
    shortCode: 'Cumhuriyet Felsefesi',
    thinkerOrField: 'Türkiye’de Felsefe',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Tanzimat’ta çevirilerle başlayan süreç, Rıza Tevfik ve Ziya Gökalp üzerinden 1933 İstanbul Üniversitesi Reformuyla (Hans Reichenbach, Ernst von Aster) modern akademik felsefeye dönüşmüştür.',
    examTip:
      'Hasan Âli Yücel’in başlattığı Dünya Klasikleri tercüme hareketi Türkiye’de felsefe kültürünü yaygınlaştırmıştır.',
    isHighYield: true,
  },
  {
    id: 'phil_ulken_gokberk_topcu',
    term: 'Hilmi Ziya Ülken, Macit Gökberk & Nurettin Topçu',
    shortCode: 'İsyan Ahlakı',
    thinkerOrField: 'Türk Felsefecileri',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hilmi Ziya Ülken (İslam ve Türk düşüncesi tarihi, "Aşk Ahlakı"), Macit Gökberk (Felsefe Tarihi & dil bilinci), Nurettin Topçu (Anadoluculuk ve "İsyan Ahlakı" · harekete ve iradeye dayalı sorumluluk).',
    examTip:
      'Nurettin Topçu’nun "İsyan Ahlakı" anarşi değil, insanın kendi benliğine ve haksızlıklara karşı Allah’a yönelen ahlaki irade isyanıdır.',
    isHighYield: true,
  },
  {
    id: 'phil_mengusoglu_hizir_sayili',
    term: 'Takiyettin Mengüşoğlu, Nusret Hızır & Aydın Sayılı',
    shortCode: 'İnsan & Bilim Tarihi',
    thinkerOrField: 'Türk Felsefecileri',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Takiyettin Mengüşoğlu (Yeni Ontoloji etkisinde "Felsefi Antropoloji" · insanı yapıp eden bütüncül varlık sayar), Nusret Hızır (analitik felsefe & bilim felsefesi), Aydın Sayılı (dünyada ilk bilim tarihi doktorasını alan Türk bilim tarihçisi).',
    examTip:
      '1955–2009 arası 5 TL banknotlarının arkasında portresi yer alan bilim tarihçisi Aydın Sayılıdır.',
    isHighYield: true,
  },
  {
    id: 'phil_kucuradi_kuyel_nutku',
    term: 'İoanna Kuçuradi, Mübahat Türker Küyel & Uluğ Nutku',
    shortCode: 'Etik & İnsan Hakları',
    thinkerOrField: 'Çağdaş Türk Felsefesi',
    category: 'AYDINLANMA_CAGDAS_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'İoanna Kuçuradi (Etik, İnsan Hakları ve Değerler Felsefesi · UNESCO Felsefe Kurumu başkanlığı), Mübahat Türker Küyel (Türk-İslam felsefesi ve Fârâbî araştırmaları), Uluğ Nutku (İnsan Felsefesi).',
    examTip:
      'İoanna Kuçuradi değer sorunlarını soyut kalıplarla değil somut tekil insan ilişkileri ve insan hakları temelinde değerlendirir.',
    isHighYield: true,
  },
];
