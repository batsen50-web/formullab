import type {
  LiteratureCategoryId,
  LiteratureExamLevel,
  LiteratureTerm,
} from '../types/literature';

export const LITERATURE_CATEGORY_LABELS: Record<LiteratureCategoryId, string> = {
  DIL_YAZIM_ANLAM: 'Anlam, Ses & Yazım',
  SOZCUK_CUMLE_DILBILGISI: 'Dil Bilgisi & Cümle',
  SIIR_SANAT_DONEMLER: 'Şiir, Sanatlar & Divan/Halk',
  TANZIMAT_CUMHURIYET_SIIR: "Tanzimat'tan Bugüne Şiir",
  NESIR_ROMAN_TIYATRO_AKIM: 'Roman, Tiyatro & Akımlar',
};

export const LITERATURE_EXAM_LEVEL_LABELS: Record<LiteratureExamLevel, string> = {
  TYT: 'TYT',
  AYT: 'AYT',
  TYT_AYT: 'TYT / AYT',
};

export const LITERATURE_TERMS: LiteratureTerm[] = [
  // =========================================================================
  // 1. ANLAM, SES & YAZIM-NOKTALAMA (20 KAVRAM — TYT ODAKLI)
  // =========================================================================
  {
    id: 'lit_sozcukte_anlam',
    term: 'Gerçek, Mecaz ve Terim Anlam',
    shortCode: 'ANLAM-1',
    periodOrTopic: 'Sözcükte Anlam · Çok Anlamlılık',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Sözcüğün akla ilk gelen temel anlamı gerçek, ilgi/benzerlik yoluyla temel anlamdan tamamen sıyrıldığı anlamı mecaz, bilim/sanat/meslek dallarındaki özel anlamı ise terimdir.',
    examTip:
      'Yan anlam (yakıştırmaca) ile mecazı karıştırma: "Masanın ayağı", "kapının kolu" somut/biçimsel benzerlik taşıdığı için yan anlamdır; "Bu sözün çok ağır" cümlesinde ise mecaz vardır.',
    isHighYield: true,
  },
  {
    id: 'lit_deyim_atasozu',
    term: 'Deyim, Atasözü ve İkilemeler',
    shortCode: 'KALIP',
    periodOrTopic: 'Söz Gruplarında Anlam',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Deyimler anlık durumları özlü biçimde anlatır (genellikle mastar hâlindedir); atasözleri genel yargı ve öğüt bildirir; ikilemeler ise anlatımı pekiştirmek için kurulur ve aralarına noktalama işareti girmez.',
    examTip:
      '"Etekleri zil çalmak" sevinmek, "etekleri tutuşmak" telaşlanmaktır. İkilemeler (yavaş yavaş, abur cubur, irili ufaklı) her zaman ayrı yazılır; yalnız "gitgide, birdenbire, gırgır" kalıplaştığı için bitişiktir.',
    isHighYield: false,
  },
  {
    id: 'lit_cumle_anlam',
    term: 'Neden-Sonuç, Amaç-Sonuç ve Koşul',
    shortCode: 'CÜMLE',
    periodOrTopic: 'Cümlede Anlam İlişkileri',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Neden-sonuçta her iki yargı gerçekleşmiştir ("Geç kaldığı için giremedi"); amaç-sonuçta "-mek üzere / -sin diye" hedefi henüz gerçekleşmemiştir; koşulda ise bir durum başka bir şarta bağlıdır.',
    examTip:
      '"Onu görmek için geldi" cümlesinde görme eylemi kesinleşmediği için amaç-sonuçtur; "Onu gördüğü için sevindi" ise eylem gerçekleştiğinden neden-sonuçtur.',
    isHighYield: true,
  },
  {
    id: 'lit_oznel_nesnel',
    term: 'Doğrudan / Dolaylı Anlatım & Üslup–İçerik',
    shortCode: 'ÜSLUP',
    periodOrTopic: 'Cümle Yorumlama',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Üslup cümlesi "nasıl anlatılmış?" (dil, sözcük seçimi, akıcılık) sorusuna; içerik cümlesi "ne anlatılmış?" (konu) sorusuna yanıt verir. Dolaylı anlatımda alıntı yüklemi "-diğini söyledi" biçimine çevrilir.',
    examTip:
      'YKS paragraf sorularında "sanatçının dili kullanma biçimi / kısa, devrik cümleler kurması" üsluba; "toplumsal yalnızlığı ele alması" içeriğe işaret eder.',
    isHighYield: false,
  },
  {
    id: 'lit_anlatim_bicimleri',
    term: 'Anlatım Biçimleri (4 Temel Tür)',
    shortCode: 'ANLATIM',
    periodOrTopic: 'Paragrafta Anlatım',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Bilgi vermeyi amaçlayan "Açıklama", okurun kanısını değiştirmeye çalışan "Tartışma", olay ve zaman akışına dayanan "Öyküleme" ve izlenimleri görselleştiren "Betimleme" dört temel anlatım biçimidir.',
    examTip:
      'Betimlemede durağanlık (sözcüklerle resim çizme), öykülemede hareket ve zaman akışı esastır. Tartışmada genellikle "Oysa, hâlbuki, bence, kanımca" ile karşıt görüş çürütülür.',
    isHighYield: true,
  },
  {
    id: 'lit_dusunceyi_gelistirme',
    term: 'Düşünceyi Geliştirme Yolları',
    shortCode: 'DÜŞÜNCE',
    periodOrTopic: 'Paragraf Teknikleri',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Tanımlama ("... nedir?" sorusunun cevabı), Örnekleme, Karşılaştırma, Tanık Gösterme (uzman adı + doğrudan sözü), Sayısal Verilerden Yararlanma ve Benzetme düşüncenin inandırıcılığını artırır.',
    examTip:
      'Yazar sadece ünlü birinin adını anıp sözünü tırnak içinde veya alıntı olarak vermezse bu "Tanık Gösterme" değil "Örnekleme" sayılır!',
    isHighYield: true,
  },
  {
    id: 'lit_anlatim_ozellikleri',
    term: 'Anlatımın Nitelikleri (Duruluk–Yalınlık–Özlülük)',
    shortCode: 'NİTELİK',
    periodOrTopic: 'Anlatım İlkeleri',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Duruluk gereksiz sözcük bulunmamasıdır; yalınlık süsten ve ağır sanatlardan uzak olmasıdır; özlülük az sözle çok anlam vermektir; açıklık tek ve net bir anlam çıkarılmasıdır; akıcılık ses pürüzü olmamasıdır.',
    examTip:
      'Öğrencilerin en çok karıştırdığı ikili: Yalınlık = süssüzlük, Duruluk = gereksiz sözcüksüzlük, Özlülük = yoğun anlamlılıktır. Açıklık ise anlam bulanıklığının olmamasıdır.',
    isHighYield: true,
  },
  {
    id: 'lit_paragraf_yapi',
    term: 'Paragraf Yapısı & Akışı Bozan Cümle',
    shortCode: 'YAPI',
    periodOrTopic: 'Paragraf Kurulumu',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Giriş cümlesi "ama, çünkü, bu nedenle" gibi bağlantı ögeleriyle başlamaz. İkiye bölme sorularında konunun başka bir yönüne geçildiği ilk cümle yeni paragrafın başıdır; akışı bozan cümle ise zincirle bağlantısızdır.',
    examTip:
      'Akışı bozan cümleyi bulmak için şüphelendiğin cümleyi çıkar ve öncesiyle sonrasını oku; bağ kendiliğinden kuruluyorsa o cümle çıkarılmalıdır.',
    isHighYield: false,
  },
  {
    id: 'lit_unlu_uyumlari',
    term: 'Büyük ve Küçük Ünlü Uyumu',
    shortCode: 'ÜNLÜ-U',
    periodOrTopic: 'Ses Bilgisi',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Büyük Ünlü Uyumu kalın (a, ı, o, u) ve ince (e, i, ö, ü) ünlüler arasındaki tutarlılıktır. Küçük Ünlü Uyumu düzden (a, e, ı, i) sonra düz; yuvarlaktan (o, ö, u, ü) sonra düz-geniş (a, e) veya dar-yuvarlak (u, ü) gelmesidir.',
    examTip:
      'Tek heceli ve birleşik sözcüklerde büyük ünlü uyumu aranmaz. Türkçede "-yor, -ken, -ki, -daş, -leyin, -mtırak, -gil" ekleri uyumu bozabilir. Ayrıca "o" ve "ö" yalnız ilk hecede bulunur.',
    isHighYield: true,
  },
  {
    id: 'lit_unlu_olaylari',
    term: 'Ünlü Düşmesi, Türemesi, Daralması ve Değişimi',
    shortCode: 'ÜNLÜ-O',
    periodOrTopic: 'Ses Olayları',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Orta hecedeki dar ünlünün düşmesi (burun > burnu, kayıp+et > kaybet), "-cik"te ünlü türemesi (biricik, gencecik), "-yor" veya "y" ile a/e’nin ı/i/u/ü’ye daralması (bekle-yor > bekliyor, de-y-e > diye) ve "bana/sana" ünlü değişimidir.',
    examTip:
      'Yalnızca "ben+e > bana" ve "sen+e > sana" sözcüklerinde ünlü değişimi (kökte kalınlaşma) görülür. "Geliyor" sözcüğünde kök "gel-" olduğundan ünlü daralması yoktur ("i" yardımcı ünlüdür)!',
    isHighYield: true,
  },
  {
    id: 'lit_unsuz_olaylari',
    term: 'Ünsüz Benzeşmesi, Yumuşaması, Düşmesi & Türemesi',
    shortCode: 'ÜNSÜZ',
    periodOrTopic: 'Ses Olayları',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Fıstıkçı Şahap (f,s,t,k,ç,ş,h,p) sonrası c,d,g sertleşir (benzeşme); p,ç,t,k iki ünlü arasında b,c,d,ğ olur (yumuşama). "-cik/-l" ekleriyle k düşer (minicik, alçalmak); Arapça köklere ek/yardımcı fiil gelince ünsüz ikizleşir (hakkı, affet).',
    examTip:
      '"Adaş (< ad+daş)", "yüksel- (< yüksek+l)", "ufal- (< ufak+l)" örneklerinde ünsüz düşmesi vardır. "N-B çatışması" (tenbel > tembel) birleşiklerde ve özel adlarda uygulanmaz (binbaşı, İstanbul).',
    isHighYield: true,
  },
  {
    id: 'lit_buyuk_harf',
    term: 'Büyük Harflerin Kullanımı',
    shortCode: 'BÜYÜK-H',
    periodOrTopic: 'Yazım Kuralları',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Özel adlar, unvanlar, kurum-kuruluş adları, millî/dinî bayramlar ve belirli tarih bildiren ay-gün adları büyük başlar. Özel ada dâhil olmayan il, ilçe, köy, gazete, dergi, tablo ve para birimleri küçük yazılır.',
    examTip:
      'İki istisnaya dikkat: "Resmî Gazete" ve "Onuncu Yıl Marşı"nda tür adı büyük başlar; ancak "Hürriyet gazetesi", "Türk Dili dergisi", "Uşak ili" küçük yazılır. Rakamla başlayan cümlede sonraki cins ad küçük başlar.',
    isHighYield: true,
  },
  {
    id: 'lit_kisaltma_sayi',
    term: 'Kısaltmaların ve Sayıların Yazımı',
    shortCode: 'KISALT',
    periodOrTopic: 'Yazım Kuralları',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Büyük harfli kısaltmalarda (TDK, ÖSYM) nokta kullanılmaz; yalnız "T.C." ve "T." istisnadır. Büyük kısaltmalara getirilen ekler kısaltmanın okunuşuna, küçük kısaltmalara (kg’dan, vb.leri) ise kelimenin okunuşuna göre gelir.',
    examTip:
      'Kısaltma sonu "K" sesi her zaman "ke" okunur: "TDK’nin", "TÜBİTAK’ın" doğrudur ("ka" okuma!). Üslü veya noktalı kısaltmalardan sonra kesme işareti konmaz: "cm³e, m²ye, Alm.dan" yazılır.',
    isHighYield: true,
  },
  {
    id: 'lit_ki_da_mi',
    term: 'ki, da/de ve mi’nin Yazımı',
    shortCode: 'Kİ-DA-Mİ',
    periodOrTopic: 'Yazım Kuralları',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Bağlaç olan "da/de" ve soru edatı "mı/mi" her zaman ayrı yazılır; "mı/mi"den sonra gelen kişi/ek-fiil ekleri edata bitişir ("Vaz mı geçtin?", "Geliyor muyuz?"). Ek olan "-ki" bitişik, bağlaç olan "ki" ayrı yazılır.',
    examTip:
      'Bağlaç olduğu hâlde kalıplaşarak bitişik yazılan 7 sözcük (SOMBaHÇeM): sanki, oysaki, mademki, belki, hâlbuki, çünkü, meğerki. Bağlaç "da/de" asla "ta/te" olmaz!',
    isHighYield: true,
  },
  {
    id: 'lit_birlesik_kelime',
    term: 'Bitişik ve Ayrı Yazılan Birleşik Sözcükler',
    shortCode: 'BİRLEŞİK',
    periodOrTopic: 'Yazım Kuralları',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Ses düşmesi/türemesi varsa (kaybolmak, affetmek), kelimelerden ikisi veya ikincisi anlam değişimine uğramışsa (aslanağzı, camgöbeği, suçiçeği, semizotu) veya kurallı birleşik fiilse (yapabilmek) bitişik yazılır.',
    examTip:
      'Anlamını koruyanlar ayrı yazılır: "terk etmek, çalar saat, bal rengi, açık mavi, ana dili, hafta içi, yer çekimi, ayrık otu, köpek balığı". Ancak "dereotu, semizotu, çöreotu" kalıplaştığı için bitişiktir!',
    isHighYield: true,
  },
  {
    id: 'lit_virgul_noktali',
    term: 'Virgül ve Noktalı Virgül',
    shortCode: 'VİRGÜL',
    periodOrTopic: 'Noktalama İşaretleri',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Virgül eş görevli sözcükleri, sıralı cümleleri, ara sözleri ve uzun cümlede özneyi ayırır. Noktalı virgül, içinde virgül bulunan tür/takımları veya ögeleri arasında virgül bulunan sıralı cümleleri ayırmakta kullanılır.',
    examTip:
      'Virgülün YASAK olduğu yerler: Tek zarf-fiilden (-ıp, -arak) sonra, şart ekinden (-sa/-se) sonra, "hem... hem" gibi tekrarlı bağlaçların arasına ve tamlama (tamlayan-tamlanan) arasına virgül konmaz!',
    isHighYield: true,
  },
  {
    id: 'lit_iki_nokta_uc_nokta',
    term: 'İki Nokta, Üç Nokta ve Kısa/Uzun Çizgi',
    shortCode: 'NOKTALA-2',
    periodOrTopic: 'Noktalama İşaretleri',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'İki noktadan sonra tam cümle gelirse büyük harf, yalnız örnekler sıralanırsa küçük harf başlar. Eksiltili cümlenin sonuna üç nokta konur; ancak yüklemi ek-fiille veya ortak yüklemle tamamlanmış cümlelere tek nokta konur.',
    examTip:
      'İki çizgi arasındaki ara söz veya ara cümlenin başı küçük harfle başlar. Soru anlamı taşımayan sözde soru cümlelerinin sonuna da soru işareti konabilir.',
    isHighYield: false,
  },
  {
    id: 'lit_kesme_isareti',
    term: 'Kesme İşaretinin Tuzakları',
    shortCode: 'KESME',
    periodOrTopic: 'Noktalama İşaretleri',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Özel adlara gelen çekim ekleri kesmeyle ayrılır; ancak yapım ekleri ve çoğul eki (-lar/-ler) kesmeyle ayrılmaz ve bunlardan sonra gelen hiçbir ek de kesmeyle ayrılmaz.',
    examTip:
      'Kurum, kuruluş, kurul, birleşim, oturum ve iş yeri adlarına gelen ekler KESMEYLE AYRILMAZ: "Türkiye Büyük Millet Meclisine", "Türk Dil Kurumundan", "Bakanlar Kurulunun". (İstisna: Avrupa Birliği’ne)',
    isHighYield: true,
  },
  {
    id: 'lit_duzeltme_isareti',
    term: 'Düzeltme İşareti (^) Kullanım Yerleri',
    shortCode: 'ŞAPKA',
    periodOrTopic: 'Yazım Kuralları',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Yazılışları bir, anlamları ve söylenişleri farklı kelimeleri ayırmak (âdet/adet, âlem/alem, hâl/hal), Arapça-Farsça g, k, l’den sonraki ince a ve u’yu göstermek (rüzgâr, kâğıt, dergâh, lâle) ve nispet "î"sini belirtmek için konur.',
    examTip:
      'Nispet eki olan "î" belirtme hâli (-i) ve iyelik ekiyle karışmasın diye şapkalı yazılır: "Türk askerî gücü" vs "Türk askeri". Kişi ve yer adlarındaki ince l de şapkalıdır: Halûk, Lâdik.',
    isHighYield: false,
  },
  {
    id: 'lit_satir_sonu_ve_tarih',
    term: 'Tarih, Saat ve Satır Sonu Bölme',
    shortCode: 'SAAT-SATIR',
    periodOrTopic: 'Yazım Kuralları',
    category: 'DIL_YAZIM_ANLAM',
    examLevel: 'TYT',
    mechanism:
      'Saat ve dakika arasına iki nokta değil TEK NOKTA konur (14.30’da); tam saatlerde "00" okunmaz ("14.00’te", "15.00’te"). Satır sonunda tek harf bırakılmaz ve kesme işareti varsa ayrıca kısa çizgi konmaz.',
    examTip:
      'Birleşik kelimeler hecelenirken ulamalı heceleme yapılır: "ba-şöğ-ret-men", "i-lkö-ğre-tim" değil "il-köğ-re-tim", "ha-nı-me-li" doğrudur!',
    isHighYield: false,
  },

  // =========================================================================
  // 2. SÖZCÜK & CÜMLE DİL BİLGİSİ (20 KAVRAM — TYT ODAKLI)
  // =========================================================================
  {
    id: 'lit_kok_turleri',
    term: 'İsim, Fiil, Ortak (Kökteş) ve Sesteş Kök',
    shortCode: 'KÖK',
    periodOrTopic: 'Sözcükte Yapı',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      '"-mek/-mak" alabilenler fiil, alamayanlar isim köktür. Hem isim hem fiil olup aralarında anlam bağı bulunanlara kökteş/ortak kök (boya, tat, ekşi, güreş, barış), anlam bağı olmayanlara sesteş kök (yaz, gül, yüz, kaz) denir.',
    examTip:
      'ÖSYM ayrımı: "Duvarı boya / Elindeki boya" arasında anlam ilişkisi olduğu için KÖKTEŞ; "Kırda koştuk / Camı kırdı" arasında anlam ilişkisi olmadığı için SESTEŞ köktür.',
    isHighYield: true,
  },
  {
    id: 'lit_yapim_cekim_ekleri',
    term: 'Yapım ve Çekim Ekleri · Sözcük Yapısı',
    shortCode: 'EK-YAPI',
    periodOrTopic: 'Sözcükte Yapı',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Yapım eki (4 tür: İ-İ, İ-F, F-İ, F-F) gövde oluşturur ve sözcüğün anlamını/türünü değiştirir. Çekim eki anlamı değiştirmez. Yapım eki almamış sözcük basit, en az bir yapım eki almış türemiş, iki sözcükten oluşan birleşiktir.',
    examTip:
      'Aynı görünümlü eklere dikkat: "-i" belirtme eki mi iyelik eki mi? Başına "onun" geliyorsa iyelik ("Evi güzelmiş"), gelmiyorsa belirtmedir ("Evi boyadık"). Tüm fiilimsi ekleri FİİLDEN İSİM yapım ekidir!',
    isHighYield: true,
  },
  {
    id: 'lit_isimler_turleri',
    term: 'İsimler (Varlık, Sayı, Küçültme & Hâl Ekleri)',
    shortCode: 'İSİM',
    periodOrTopic: 'Sözcük Türleri',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'İsimler verilişine (özel/cins), maddesine (somut/soyut) ve sayısına (tekil/çoğul/topluluk) göre ayrılır. İsmin 5 durumu: Yalın, Belirtme (-i), Yönelme (-e), Bulunma (-de), Ayrılma (-den) hâlleridir.',
    examTip:
      'Çoğul ve iyelik ekleri alan sözcükler hâl eki almamışsa hâlâ YALIN durumdadır: "evlerimiz" yalın hâldedir. Topluluk ismi "meclis, ordu, sürü" ek almadan çokluk bildirir.',
    isHighYield: false,
  },
  {
    id: 'lit_isim_tamlamalari',
    term: 'İsim Tamlamaları (Belirtili, Belirtisiz, Zincirleme)',
    shortCode: 'İSİM-TAM',
    periodOrTopic: 'Tamlamalar',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Tamlayan (-ın/-in) + Tamlanan (-ı/-i) ikisi de ek alırsa belirtili ("kapının kolu"); yalnız tamlanan ek alırsa belirtisiz ("okul kapısı"); en az üç ismin iç içe geçmesiyle zincirleme ("okul kapısının kolu") oluşur.',
    examTip:
      'Takısız isim tamlaması tartışmalı olduğundan ÖSYM genellikle sıfat tamlaması sayar ("demir kapı", "altın yüzük"). Tamlayanı veya tamlananı sıfat almış tamlamayı zincirleme sanma ("eski okul kapısı" belirtisiz isim tamlamasıdır)!',
    isHighYield: true,
  },
  {
    id: 'lit_sifatlar',
    term: 'Sıfatlar (Niteleme, Belirtme & Adlaşmış Sıfat)',
    shortCode: 'SIFAT',
    periodOrTopic: 'Sözcük Türleri',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'İsimlerin önüne gelerek "Nasıl?" sorusuna cevap verenler Niteleme; İşaret, Sayı, Belgisiz, Soru yoluyla belirtenler Belirtme sıfatıdır. Önündeki isim düşüp ekini alan niteleme sıfatına "Adlaşmış Sıfat" denir.',
    examTip:
      '"Gençler geleceğimizdir" örneğinde "genç (insanlar)" adlaşmış sıfattır. Kurallı birleşik sıfatlar ("kırık kanatlı kuş", "geniş bahçeli ev") da sıfat tamlaması kurar.',
    isHighYield: true,
  },
  {
    id: 'lit_zamirler',
    term: 'Zamirler (Sözcük ve Ek Hâlinde)',
    shortCode: 'ZAMİR',
    periodOrTopic: 'Sözcük Türleri',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'İsimlerin yerini geçici olarak tutan sözcüklerdir: Kişi (ben, sen, o, biz, siz, onlar), Dönüşlülük (kendi), İşaret (bu, şu, o), Belgisiz (bazısı, herkes, hiçbiri), Soru (kim, ne, hangisi) ve ek hâlinde İyelik ile İlgi Zamiri (-ki).',
    examTip:
      '"O" sözcüğü insanı karşılarsa KİŞİ, insan dışı varlığı karşılarsa İŞARET zamiridir; isim önündeyse İŞARET SIFATIDIR. "Seninki yine gelmiş"teki "-ki" ilgi zamiridir.',
    isHighYield: true,
  },
  {
    id: 'lit_zarflar',
    term: 'Zarflar (Durum, Zaman, Yer-Yön, Miktar, Soru)',
    shortCode: 'ZARF',
    periodOrTopic: 'Sözcük Türleri',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Fiilleri, fiilimsileri, sıfatları veya kendi türünden zarfları durum, zaman, yer-yön (yalın hâlde: içeri, dışarı, aşağı, yukarı, ileri, geri, öte, beri), azlık-çokluk (en, daha, çok, pek) ve soru bakımından sınırlar.',
    examTip:
      'Yer-yön zarfları ek almaz: "İçeri girdi" (zarf), "İçeriye girdi" (isim / dolaylı tümleç!). "En" ve "daha" sıfat veya zarfı derecelendiren miktar zarfıdır.',
    isHighYield: true,
  },
  {
    id: 'lit_edat_baglac_unlem',
    term: 'Edat (İlgeç), Bağlaç ve Ünlem',
    shortCode: 'EDAT-BAĞ',
    periodOrTopic: 'Sözcük Türleri',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Edat tek başına anlamı olmayıp sözcükler arası anlam ilgisi kurar (gibi, kadar, için, göre, doğru, değil). Bağlaç sözcük ve cümleleri bağlar (ve, ama, fakat, çünkü, da/de, ki). Ünlem duygu/seslenme bildirir.',
    examTip:
      'Altın kural: "İle (-le/-la)" yerine "VE" koyabiliyorsan BAĞLAÇ ("Ali ile Veli geldi"), koyamıyorsan EDATtır ("Uçak ile gitti"). "Yalnız / Ancak" yerine "sadece" geliyorsa edat, "ama" geliyorsa bağlaçtır!',
    isHighYield: true,
  },
  {
    id: 'lit_fiil_kip_kisi',
    term: 'Fiilde Anlam (İş-Oluş-Durum), Kip ve Anlam Kayması',
    shortCode: 'FİİL-KİP',
    periodOrTopic: 'Fiiller',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Haber kipleri zaman bildirir (-yor, -dı, -mış, -ecek, -r); Dilek kipleri (-meli, -se, -e, emir) tasarı bildirir. Bir kipin başka bir kip yerine kullanılmasına "kip/anlam kayması" denir ("Yarın Ankara’ya gidiyorum").',
    examTip:
      'Kip kayması bir anlatım bozukluğu DEĞİLDİR! İş (kılış) fiilleri nesne alabilir ("onu kırdı"), durum ve oluş fiilleri nesne alamaz; oluşta özne iradesi yoktur ("sarardı, paslandı").',
    isHighYield: false,
  },
  {
    id: 'lit_ek_fiil',
    term: 'Ek-Fiil (Ek Eylem: i-mek)',
    shortCode: 'EK-FİİL',
    periodOrTopic: 'Fiiller',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Ek-fiilin iki görevi vardır: 1) İsim soylu sözcüklere gelerek onları yüklem yapar (idi, imiş, ise, -dır). 2) Basit çekimli fiillere gelerek onları birleşik zamanlı/çekimli fiil yapar (hikâye -dı, rivayet -mış, şart -sa).',
    examTip:
      'Geniş zaman ek-fiili "-dır/-dir" cümlede düşebilir ("Hava bugün çok güzel[dir]"). "-dır" fiile geldiğinde birleşik zaman yapmaz, olasılık veya kesinlik bildirir.',
    isHighYield: true,
  },
  {
    id: 'lit_birlesik_fiiller',
    term: 'Yapısına Göre Fiiller & Birleşik Fiil Türleri',
    shortCode: 'BİR-FİİL',
    periodOrTopic: 'Fiiller · Yapı',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Birleşik fiiller 3 yolla kurulur: 1) Kurallı/Özel (yeterlik -ebil, tezlik -iver, sürerlik -ekal/-edur/-egel, yaklaşma -eyaz), 2) Yardımcı fiille (et-, ol-, kıl-, eyle-), 3) Anlamca kaynaşmış (deyimleşmiş: göz koymak, başvurmak).',
    examTip:
      'Kurallı yeterlik fiilinin olumsuzu tuzaktır: "Yapamadım = yap-a-ma-dım" (aradaki -a/-e yeterlik fiilinin izidir ve birleşik fiil sayılır!). "Göremedim" birleşik yapılıdır!',
    isHighYield: true,
  },
  {
    id: 'lit_fiilimsiler',
    term: 'Fiilimsiler (İsim-Fiil, Sıfat-Fiil, Zarf-Fiil)',
    shortCode: 'FİİLİMSİ',
    periodOrTopic: 'Eylemsiler',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Fiil kök/gövdelerine gelip cümlede isim (-ma/-ış/-mak), sıfat (-an/-ası/-mez/-ar/-dik/-ecek/-miş) veya zarf (-ıp, -arak, -ınca, -dıkça, -meden, -ken, -eli, -a...-a, -meksizin) görevi üstlenen türemiş sözcüklerdir.',
    examTip:
      'Olumsuzluk testi: Fiilimsiler "-ma/-me" ile olumsuzlanabilir; kalıcı isimler (dolma, sarma, ekmek, çakmak, giyecek) olumsuzlanamaz ve fiilimsi DEĞİLDİR! Adlaşmış sıfat-fiil (gelenler) yine fiilimsi sayılır.',
    isHighYield: true,
  },
  {
    id: 'lit_fiilde_cati_ozne',
    term: 'Fiilde Çatı — Özne-Yüklem İlişkisi',
    shortCode: 'ÇATI-ÖZNE',
    periodOrTopic: 'Fiilde Çatı',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Etken fiilde gerçek/gizli özne işi yapar; Edilgende (-l, -n) işi yapan belli değildir ve sözde özne vardır; Dönüşlüde (-l, -n) özne işi hem yapar hem etkilenir; İşteşte (-ş) iş karşılıklı veya birlikte yapılır.',
    examTip:
      'İsim cümlelerinde ÇATI ARANMAZ! Gizli özne bulunan cümleler ETKENDİR. "-l/-n" alıp işi kendi üzerinde yapan dönüşlüdür ("Ayşe süslendi"), başkası yaptıysa edilgendir ("Salon süslendi"). "Mektuplaştık" karşılıklı, "kuşlar uçuştu" birlikte işteştir; tek özneyle yapılan ("güzelleşti") işteş değildir!',
    isHighYield: true,
  },
  {
    id: 'lit_fiilde_cati_nesne',
    term: 'Fiilde Çatı — Nesne-Yüklem & Oldurgan/Ettirgen',
    shortCode: 'ÇATI-NESNE',
    periodOrTopic: 'Fiilde Çatı',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Nesne alabilen fiiller Geçişli ("onu oku"), alamayanlar Geçişsizdir ("onu uyu" X). Geçişsize "-r, -t, -tır" getirilip geçişli yapılırsa Oldurgan (uyutmak, ağlatmak); geçişliye getirilip derecesi artırılırsa Ettirgen (okutmak, yazdırtmak) olur.',
    examTip:
      'Cümlede nesne yazılı olmasa bile fiil "onu" alabiliyorsa geçişlidir ("Dün sabaha kadar okudum" -> geçişli). Oldurganda başlangıç geçişsizdir; ettirgende zaten geçişlidir ("başkasına yaptırma" anlamı katar).',
    isHighYield: true,
  },
  {
    id: 'lit_cumle_temel_ogeler',
    term: 'Cümlenin Temel Ögeleri (Yüklem ve Özne)',
    shortCode: 'ÖZNE-YÜK',
    periodOrTopic: 'Cümlenin Ögeleri',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Önce yargıyı bildiren Yüklem (tamlamalar, deyimler ve birleşik fiiller bölünmeden!) bulunur; ardından "Kim? Ne?" (sıfat sorusuysa "Olan kim/ne?") sorularıyla Özne saptanır.',
    examTip:
      'Sözde özne ile örtülü özne farkı: "Dosyalar müdür tarafından incelendi" cümlesinde "dosyalar" sözde öznedir, "müdür tarafından" ise Zarf Tümlecidir! Gizli özne cümle dışı sayılır, öge sayısına eklenmez.',
    isHighYield: true,
  },
  {
    id: 'lit_cumle_yardimci_ogeler',
    term: 'Yardımcı Ögeler, Vurgu ve Ara Söz',
    shortCode: 'ÖGELER-2',
    periodOrTopic: 'Cümlenin Ögeleri',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Belirtili Nesne (-i: Neyi/Kimi), Belirtisiz Nesne (Yüklem+Özne sonrası Ne), Dolaylı Tümleç/Yer Tamlayıcısı (-e, -de, -den), Zarf Tümleci (Nasıl, Ne zaman, Neden, Ne kadar, Nereye [ek almadan]) ve Edat Tümleci yardımcı ögelerdir.',
    examTip:
      'Cümlede vurgu: Fiil cümlesinde yüklemden HEMEN ÖNCEKİ öge vurgulanır; yüklem baştaysa veya cümle isim cümlesiyse vurgu yüklemin kendisindedir; "mi" soru edatı varsa vurgu "mi"den önceki ögededir.',
    isHighYield: true,
  },
  {
    id: 'lit_cumle_turleri_1',
    term: 'Yüklemine, Yerine ve Anlamına Göre Cümleler',
    shortCode: 'CÜM-TÜR1',
    periodOrTopic: 'Cümle Türleri',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Yüklem çekimli fiilse Fiil, isim/isim soylu/fiilimsi ise İsim cümlesidir. Yüklem sondaysa Kurallı, sonda değilse Devrik, yüklem yoksa Eksiltilidir. Biçimce olumlu-anlamca olumsuz ("Ne aradı ne sordu") olabilir.',
    examTip:
      'Yüklemi fiilimsi olan cümleler İSİM cümlesidir! Örnek: "Tek amacım burayı kazanmaktır" (isim-fiil yüklem -> isim cümlesi).',
    isHighYield: false,
  },
  {
    id: 'lit_cumle_turleri_2',
    term: 'Yapısına Göre Cümleler (Basit, Birleşik, Sıralı, Bağlı)',
    shortCode: 'CÜM-YAPI',
    periodOrTopic: 'Cümle Türleri',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Tek yüklemli ve fiilimsisi olmayan Basit; içinde fiilimsi (girişik), şart (-se), "ki"li veya alıntı cümle bulunan Birleşik; virgül/noktalı virgülle bağlanan yüklemler Sıralı; bağlaçla bağlanan yüklemler Bağlı cümledir.',
    examTip:
      'İki yüklemin sadece özne/nesne gibi bir ögesi ortaksa "Bağımlı Sıralı", yoksa "Bağımsız Sıralı"dır. Girişik birleşik cümledeki fiilimsiler "yan cümle" sayılır.',
    isHighYield: true,
  },
  {
    id: 'lit_anlatim_bozukluklari_anlam',
    term: 'Anlama Dayalı Anlatım Bozuklukları',
    shortCode: 'BOZUK-A',
    periodOrTopic: 'Anlatım Bozuklukları',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Gereksiz sözcük/ek kullanımı ("gizli sır", "yaklaşık beş yıla yakın"), anlamca çelişen sözcükler ("kesinlikle gelmiş olmalı"), sözcüğün yanlış yerde ya da yanlış anlamda kullanımı (ücret/fiyat, çekimser/çekingen, sağladı/neden oldu) ve deyim yanlışlığıdır.',
    examTip:
      'Olumsuz durumlar için "sağladı" değil "yol açtı / neden oldu" kullanılır. "Burası çok sessiz gürültüsüz" ya da "geri iade etmek" gereksiz sözcükten kaynaklanan bozukluktur.',
    isHighYield: true,
  },
  {
    id: 'lit_anlatim_bozukluklari_yapi',
    term: 'Dil Bilgisine (Yapıya) Dayalı Anlatım Bozuklukları',
    shortCode: 'BOZUK-Y',
    periodOrTopic: 'Anlatım Bozuklukları',
    category: 'SOZCUK_CUMLE_DILBILGISI',
    examLevel: 'TYT',
    mechanism:
      'Özne-yüklem uyumsuzluğu, çatı uyuşmazlığı, öge eksikliği, ek yanlışlığı ve tamlama yanlışlığı yapı kaynaklı anlatım bozukluklarıdır.',
    examTip:
      'En sık 3 ÖSYM tuzağı: 1) İnsan dışı çoğul öznede yüklem tekil olur ("günler geçiyorlardı" X); 2) İki eylemden biri etken biri edilgen olamaz ("Bütün dosyaları toplayıp rafa yerleştirildi" X); 3) "Kültürel ve sanat etkinlikleri" tamlama yanlışlığıdır ("kültür ve sanat" olmalı).',
    isHighYield: true,
  },

  // =========================================================================
  // 3. ŞİİR BİLGİSİ, SANATLAR, İSLAMİYET ÖNCESİ, GEÇİŞ, HALK & DİVAN (20 KAVRAM — AYT)
  // =========================================================================
  {
    id: 'lit_guzel_sanatlar_metin',
    term: 'Güzel Sanatlar, Metin Sınıflaması & Türkçe Tarihî Gelişim',
    shortCode: 'SANAT-DİL',
    periodOrTopic: 'Giriş Bilgileri · Dil Tarihi',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Edebiyat işitsel (fonetik) bir güzel sanattır. Metinler "Sanatsal (Coşku ve Olay)" ile "Öğretici" olarak ikiye ayrılır. Türkçenin tarihî dönemleri: Eski Türkçe (Göktürk-Uygur-Karahanlı), Orta Türkçe (Batı/Kuzey-Doğu) ve Yeni Türkçedir.',
    examTip:
      'Batı Türkçesi Eski Anadolu Türkçesi → Osmanlı Türkçesi → Türkiye Türkçesi olarak ilerler. Aynı dil içindeki bölgesel konuşma farklılıkları "Ağız" (Karadeniz ağzı), yazı/tarih kolları "Şive" (Azeri), karanlık dönem kopuşları "Lehçe"dir (Çuvaşça, Yakutça).',
    isHighYield: false,
  },
  {
    id: 'lit_siir_olcu_durak',
    term: 'Şiirde Ölçü (Hece–Aruz–Serbest), Birim ve Durak',
    shortCode: 'ÖLÇÜ',
    periodOrTopic: 'Şiir Bilgisi',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Hece ölçüsünde dizelerin ünlü harf sayıları eşittir ve duraklar sözcük ortasından bölünmez (4+4, 6+5, 4+4+3). Aruz ölçüsü hecelerin açıklık-kapalılığına (ünlü biten açık ".", ünsüz/uzun ünlü biten kapalı "-") dayanır.',
    examTip:
      'Aruzda med (iki kapalı arası uzatma), imale (kısa heceyi uzatma), zihaf (uzunu kısaltma) ve vasıl/ulama görülür. Dize sonu ünlüsü her zaman KAPALI hece sayılır!',
    isHighYield: true,
  },
  {
    id: 'lit_kafiye_redif',
    term: 'Redif ve Kafiye (Uyak) Türleri',
    shortCode: 'KAFİYE',
    periodOrTopic: 'Şiir Bilgisi',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Dize sonlarında yazılışı ve görevi/anlamı aynı ek veya sözcükler REDİF, rediften önce kalan ses benzerlikleri KAFİYEDİR: Tek ses Yarım, iki ses Tam, üç+ ses Zengin, uzun ünlü veya ek seslerle 3+ Tunç, sesteş kelimelerle Cinaslı uyak oluşur.',
    examTip:
      'Kural: Her zaman ÖNCE REDİF ayrılır, sonra kalan kökte KAFİYE aranır! "Elinden / Belinden" -> "-inden" redif, "-l-" yarım kafiye değil; kökler "el / bel" olduğundan "-el" TAM uyaktır!',
    isHighYield: true,
  },
  {
    id: 'lit_siir_turleri_manzume',
    term: 'Şiir Türleri (Lirik, Epik, Pastoral, Didaktik, Satirik) & Manzume',
    shortCode: 'ŞİİR-TÜR',
    periodOrTopic: 'Şiir Bilgisi',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Lirik (duygu/aşk), Epik (kahramanlık), Pastoral (doğa/kır/çoban: idil ve eglog), Didaktik (öğretici), Satirik (eleştirel/yergi) ve Dramatik (tiyatro) temel türlerdir. Manzume ölçülü-uyaklı ancak olay/diyalog anlatan düz yazı mantıklı metindir.',
    examTip:
      'Manzume ile Şiir farkı: Şiirde imge ve çok anlamlılık ön plandadır (Mehmet Akif’in "Küfe", "Seyfi Baba"sı olay anlattığı için manzum hikâyedir; Tevfik Fikret’in "Balıkçılar"ı da manzumedir).',
    isHighYield: true,
  },
  {
    id: 'lit_edebi_sanatlar_1',
    term: 'Benzetme, İstiare (Eğretileme) ve Mecazımürsel',
    shortCode: 'SANAT-1',
    periodOrTopic: 'Edebî Sanatlar',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Teşbih benzeyen ve benzetilenle kurulur. İstiarede yalnız biri vardır: Benzetilen varsa Açık ("Kurban olam beşikte yatan kuzuya"), Benzeyen varsa Kapalı İstiare ("Güneş gülümsüyor"). Mecazımürsel benzetme amacı olmadan ilgidir ("İstiklal Marşı / Mehmet Akif okuyorum").',
    examTip:
      'Her Teşhis (kişileştirme) aynı zamanda bir KAPALI İSTİAREDİR ("Rüzgâr fısıldıyor": insana benzetilmiş, insan söylenmemiş). Her atasözü ve deyim aslında bir Temsilî İstiare veya Kinaye potansiyeli taşır.',
    isHighYield: true,
  },
  {
    id: 'lit_edebi_sanatlar_2',
    term: 'Tevriye, Kinaye, Tecahülüarif ve Hüsnütalil',
    shortCode: 'SANAT-2',
    periodOrTopic: 'Edebî Sanatlar',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Tevriye iki gerçek anlamlı sözcüğü aynı anda kullanmaktır ("Baki kalan bu kubbede..."). Kinaye hem gerçek hem mecaz anlama gelecek şekilde mecazı kastetmektir. Tecahülüarif bilip bilmezlikten gelme; Hüsnütalil doğal olayı güzel bir hayali nedene bağlamadır.',
    examTip:
      'Ayırt etme anahtarı: Tevriye’de İKİ ANLAM DA GERÇEKTİR ("gül", "ben", "el" sık çıkar); Kinaye’de ise BİRİ GERÇEK BİRİ MECAZ olup kastedilen MECAZDIR ("Hamama giren terler").',
    isHighYield: true,
  },
  {
    id: 'lit_edebi_sanatlar_3',
    term: 'Tezat, Telmih, İrsalimesel, Tariz, Tenâsüp & Mübalağa',
    shortCode: 'SANAT-3',
    periodOrTopic: 'Edebî Sanatlar',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Tezat zıt kavramları buluşturur; Telmih bilinen tarihî/dinî olayı hatırlatır (Mecnun, Ferhat, Nemrut); İrsalimesel dizede atasözü/özdeyiş kullanır; Tariz alaycı iğneleme; Tenâsüp anlamca ilgili sözcükleri (gül-bülbül-bağ) toplamadır.',
    examTip:
      '"Ağlarım hatıra geldikçe gülüştüklerimiz" dizesinde TEZAT; "Balık baştan kokar bunu bilmemek" dizesinde İRSALİMESEL; çok başarılı tembele "ne kadar çalışkansın" demek ise TARİZdir.',
    isHighYield: true,
  },
  {
    id: 'lit_islamiyet_oncesi_sozlu',
    term: 'İslamiyet Öncesi Sözlü Dönem (Koşuk, Sagu, Sav, Destan)',
    shortCode: 'SÖZLÜ',
    periodOrTopic: 'İslamiyet Öncesi Türk Edebiyatı',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Şaman, Kam, Baksı, Ozanların kopuz eşliğinde söyledikleri heceli ürünlerden oluşur: Koşuk (sığır/şölen: aşk-doğa-yiğitlik, aaa b/cccb), Sagu (yuğ töreninde ağıt: Alp Er Tunga Sagusu), Sav (atasözü) ve doğal Destanlar.',
    examTip:
      'Koşuk → Halkta Koşma, Divanda Gazel; Sagu → Halkta Ağıt, Divanda Mersiye karşılığıdır! Bilinen ilk Türk şairleri: Aprınçur Tigin, Çuçu, Kül Tarkan.',
    isHighYield: true,
  },
  {
    id: 'lit_gokturk_uygur',
    term: 'Köktürk (Orhun) Yazıtları & Uygur Metinleri',
    shortCode: 'KÖKTÜRK',
    periodOrTopic: 'İslamiyet Öncesi Yazılı Dönem',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Türkçenin ilk yazılı belgeleri 8. yy Orhun (Köktürk) Yazıtlarıdır: Tonyukuk (720/725), Kül Tigin (732), Bilge Kağan (735). Uygur döneminde Budizm/Maniheizm etkili Altun Yaruk, Sekiz Yükmek, Kalyanamkara-Papamkara ve fal kitabı Irk Bitig yazılmıştır.',
    examTip:
      'Orhun Yazıtlarını yazan Yolluğ Tigin, çözen Danimarkalı bilgin Vilhelm Thomsen (1893), yayımlayan W. Radloff’tur. Anıtsal söylev (nutuk) ve tarihî hatırat özelliği taşır.',
    isHighYield: true,
  },
  {
    id: 'lit_gecis_donemi_1',
    term: "Kutadgu Bilig & Dîvânu Lugâti't-Türk (11. Yüzyıl)",
    shortCode: 'GEÇİŞ-1',
    periodOrTopic: 'İslamiyet Etkisinde Geçiş Dönemi',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Yusuf Has Hacib’in Kutadgu Bilig’i (1069) ilk mesnevi, ilk siyasetname, aruzlu ilk eserdir (6645 beyit + 173 dörtlük). Kaşgarlı Mahmut’un Dîvânu Lugâti’t-Türk’ü (1074) Araplara Türkçe öğretmek için yazılmış ilk sözlük, dil bilgisi ve halk edebiyatı antolojisidir.',
    examTip:
      'Kutadgu Bilig’deki 4 alegorik kişilik ÖSYM favorisidir: Kün Togdı (Hükümdar = Adalet/Töre), Ay Toldı (Vezir = Mutluluk/Saadet), Ögdülmiş (Oğul = Akıl), Odgurmış (Kardeş = Akıbet/Kanaat).',
    isHighYield: true,
  },
  {
    id: 'lit_gecis_donemi_2',
    term: "Atabetü'l-Hakayık & Divân-ı Hikmet (12. Yüzyıl)",
    shortCode: 'GEÇİŞ-2',
    periodOrTopic: 'İslamiyet Etkisinde Geçiş Dönemi',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Edip Ahmet Yükneki’nin Atabetü’l-Hakayık’ı (Hakikatlerin Eşiği) aruzla yazılmış dinî-ahlaki öğüt kitabıdır. Hoca Ahmet Yesevi’nin Divân-ı Hikmet’i Türk tasavvuf edebiyatının ilk eseri olup sade Türkçe ve hece (7’li-12’li) ile yazılmıştır.',
    examTip:
      'Geçiş Döneminin 4 büyük eseri de Hakaniye (Karahanlı) Türkçesiyle yazılmıştır. Dede Korkut Hikâyeleri (12 hikâye + 1 ön söz) ise 15. yy’da yazıya geçirilmiş destandan halk hikâyeciliğine geçiş ürünüdür.',
    isHighYield: true,
  },
  {
    id: 'lit_anonim_halk',
    term: 'Anonim Halk Edebiyatı (Mâni, Türkü, Ninni, Ağıt)',
    shortCode: 'ANONİM',
    periodOrTopic: 'Halk Edebiyatı',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Söyleyeni unutulmuş, hece ölçülü sözlü ürünlerdir. Mâni tek dörtlüktür (7’li hece, aaxa; türleri: düz, kesik/cinaslı, yedekli/artık). Türkü bent + kavuştak (nakarat) yapısında ezgilidir.',
    examTip:
      'Mâninin ilk iki dizesi "doldurma (hazırlık)" dizeleridir; asıl anlatılmak istenen son iki dizede verilir. Kesik mâninin ilk dizesi 7 heceden azdır ve cinaslı uyak taşır.',
    isHighYield: true,
  },
  {
    id: 'lit_asik_tarzi_nazim',
    term: 'Âşık Tarzı Nazım Biçimleri (Koşma, Semai, Varsağı, Destan)',
    shortCode: 'ÂŞIK-B',
    periodOrTopic: 'Âşık Tarzı Halk Şiiri',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Hepsinde genellikle abab / cccb / dddb uyak örgüsü ve son dörtlükte şairin mahlası (tapşırma) bulunur. Koşma 11’li (güzelleme, koçaklama, taşlama, ağıt); Semai 8’li (ezgili/duygulu); Varsağı 8’li ("bre, hey, behey" yiğitçe ünlem); Destan 11’li (en uzun).',
    examTip:
      'Varsağıyı Semaiden ayıran kesin ipucu "bre, hey, behey" gibi sert ünlemlerin varlığıdır! Koşmada içerik türleri: aşk-doğa (Güzelleme), yiğitlik (Koçaklama), eleştiri (Taşlama), ölüm (Ağıt).',
    isHighYield: true,
  },
  {
    id: 'lit_asik_sairler',
    term: 'Önemli Halk Ozanları (16–19. Yüzyıl)',
    shortCode: 'OZANLAR',
    periodOrTopic: 'Âşık Tarzı Halk Şiiri',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      '16. yy Köroğlu (koçaklama); 17. yy Karacaoğlan (yalnız hece, güzelleme), Âşık Ömer (Şairname), Kayıkçı Kul Mustafa (Genç Osman), Ercişli Emrah; 18. yy Gevherî; 19. yy Dadaloğlu ("Ferman padişahın dağlar bizimdir"), Seyrânî (taşlama), Dertli, Erzurumlu Emrah, Bayburtlu Zihnî (Sergüzeştname).',
    examTip:
      'Karacaoğlan, Köroğlu ve Dadaloğlu Divan edebiyatından ve aruzdan HİÇ etkilenmemiş; Âşık Ömer, Gevherî, Dertli ve Erzurumlu Emrah ise hece yanında aruz da kullanmıştır.',
    isHighYield: true,
  },
  {
    id: 'lit_tasavvuf_halk',
    term: 'Dinî-Tasavvufi (Tekke) Şiir & Nazım Türleri',
    shortCode: 'TEKKE',
    periodOrTopic: 'Tekke Edebiyatı',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'İlahi (Allah sevgisi, Yunus Emre), Nefes (Bektaşi ilahisi, Pir Sultan Abdal), Nutuk (tarikata yeni girenlere öğüt), Devriye (Allah’tan gelip Allah’a dönüş), Şathiye (senli-benli alaylı görünen derin tasavvufi söz, Kaygusuz Abdal) ve Deme.',
    examTip:
      'Temsilciler: 13. yy Yunus Emre (Risaletü’n-Nushiyye), Hacı Bektaş Veli (Makalat); 14. yy Kaygusuz Abdal (Budalaname); 15. yy Eşrefoğlu Rumi (Müzekki’n-Nüfus); 16. yy Pir Sultan Abdal; 18. yy Erzurumlu İbrahim Hakkı (Marifetname).',
    isHighYield: true,
  },
  {
    id: 'lit_divan_kavram_akim',
    term: 'Divan Şiiri Mazmunları & Edebî Akımları',
    shortCode: 'DİVAN-AKM',
    periodOrTopic: 'Divan Edebiyatı Genel Özellikleri',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Kalıplaşmış benzetmeler (mazmun: servi=boy, ok=kirpik, gül-bülbül=sevgili-âşık), aruz ölçüsü, Arapça-Farsça yoğun dil ve parça güzelliği esastır. 4 akım: Türkî-i Basit (Edirneli Nazmi), Sebk-i Hindî (Şeyh Galip, Naili), Hikemî Tarz (Nabi), Mahallîleşme (Nedim).',
    examTip:
      'Sebk-i Hindî kapalı, soyut ve alışılmamış bağdaştırmalıdır (Şeyh Galip, Neşati); Hikemî Tarz öğretici ve atasözlüdür (Nabi); Mahallîleşme günlük dil, İstanbul ve somut eğlenceye yönelir (Nedim).',
    isHighYield: true,
  },
  {
    id: 'lit_divan_nazim_beyit',
    term: 'Beyitlerle Kurulan Divan Nazım Biçimleri',
    shortCode: 'BEYİT',
    periodOrTopic: 'Divan Şiiri Nazım Biçimleri',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Gazel (5–15 beyit, aa ba ca..., matla/makta/hüsn-i matla/beytü’l-gazel), Kaside (33–99 beyit, övgü/yergi: nesib, girizgâh, methiye, tegazzül, fahriye, dua), Mesnevi (aa bb cc..., uzun hikâye/roman, 5 tanesi Hamse), Kıta ve Müstezat.',
    examTip:
      'Kaside türleri: Tevhit (Allah’ın birliği), Münacat (yakarış), Naat (Hz. Muhammed), Methiye (devlet büyüğü), Hicviye (yergi), Mersiye (ölüm/ağıt). Gazelde tüm beyitler aynı konudaysa Yek-ahenk, aynı güçteyse Yek-avaz gazeldir.',
    isHighYield: true,
  },
  {
    id: 'lit_divan_nazim_bent',
    term: 'Dörtlük ve Bentlerle Kurulan Divan Biçimleri',
    shortCode: 'BENT',
    periodOrTopic: 'Divan Şiiri Nazım Biçimleri',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      'Rubai (tek dörtlük, aaxa, Ömer Hayyam ve Azmizade Haleti), Tuyuğ (Türklere özgü, tek dörtlük, aaxa, 11’li fâilâtün kalıbı, Kadı Burhaneddin ve Nesimi), Şarkı (Türklere özgü, bestelenmek için, nakaratlı, Nedim), Terkibibent & Terciibent.',
    examTip:
      'Terkibibent ile Terciibent farkı: Terkibibentte vasıta beyti her bendin sonunda DEĞİŞİR (Bağdatlı Ruhi, Baki); Terciibentte ise vasıta beyti nakarat gibi AYNEN TEKRARLANIR (Ziya Paşa). Türklerin kazandırdığı iki nazım biçimi: TUYUĞ ve ŞARKI!',
    isHighYield: true,
  },
  {
    id: 'lit_divan_sairleri_1',
    term: '13–15. Yüzyıl Divan Şairleri',
    shortCode: 'DİVAN-13/15',
    periodOrTopic: 'Divan Edebiyatı Sanatçıları',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      '13. yy Hoca Dehhani (ilk din dışı Divan şairi), Mevlana (Mesnevi), Sultan Veled; 14. yy Gülşehri (Mantıku’t-Tayr), Âşık Paşa (Garipname), Ahmedi (İskendernâme), Kadı Burhaneddin (tuyuğ), Seyyid Nesimi; 15. yy Ali Şir Nevai (ilk hamse, Muhakemetü’l-Lugateyn, Mecalisü’n-Nefais), Şeyhi (Harnâme), Ahmet Paşa (Kerem), Süleyman Çelebi (Vesiletü’n-Necat).',
    examTip:
      'Şeyhi’nin 126 beyitlik Harnâme’si ilk fabl ve taşlama/hiciv mesnevisi örneğidir. Şeyyad Hamza Anadolu sahasında ilk Yusuf u Züleyha mesnevisini yazmıştır.',
    isHighYield: true,
  },
  {
    id: 'lit_divan_sairleri_2',
    term: '16–19. Yüzyıl Divan Şairleri (Zirve İsimler)',
    shortCode: 'DİVAN-16/19',
    periodOrTopic: 'Divan Edebiyatı Sanatçıları',
    category: 'SIIR_SANAT_DONEMLER',
    examLevel: 'AYT',
    mechanism:
      '16. yy Fuzuli (Azeri Türkçesi, ıstırap şairi, Leyla vü Mecnun, Şikayetname), Baki (Sultanu’ş-Şuara, tasavvuf yok, Kanuni Mersiyesi), Bağdatlı Ruhi, Taşlıcalı Yahya; 17. yy Nef’i (Siham-ı Kaza, kaside-hiciv), Nabi (Hikemî, Hayriyye); 18. yy Nedim (Lale Devri, Şarkı), Şeyh Galip (Hüsn ü Aşk, Sebk-i Hindî); 19. yy Keçecizade İzzet Molla (Mihnet-i Keşan), Enderunlu Vasıf.',
    examTip:
      'Fuzuli ve Şeyh Galip tasavvufi aşkı işler; Baki ve Nedim’in eserlerinde tasavvuf YOKTUR! Nef’i övgü ve yergide abartıyı zirveye taşır; Fuzuli "Şikayetname" ile mektup türünün şaheserini vermiştir.',
    isHighYield: true,
  },

  // =========================================================================
  // 4. TANZİMAT'TAN CUMHURİYET'E ŞİİR & TOPLULUKLAR (20 KAVRAM — AYT)
  // =========================================================================
  {
    id: 'lit_tanzimat_1_siir',
    term: 'Tanzimat I. Dönem Şiiri (Şinasi, Namık Kemal, Ziya Paşa)',
    shortCode: 'TANZ-I',
    periodOrTopic: 'Tanzimat Edebiyatı (1860–1876)',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Toplum için sanat ilkesiyle hak, hukuk, hürriyet, vatan ve medeniyet kavramları eski nazım biçimleri (kaside, gazel, terkibibent) ve aruz ölçüsüyle işlenmiştir; asıl yenilik içeriktedir.',
    examTip:
      'Şinasi: Tercüme-i Manzume (ilk şiir çevirisi); Namık Kemal: Hürriyet Kasidesi ("Vatan" ve "Hürriyet" temalarının babası); Ziya Paşa: Terkib-i Bent ve Harabat (Divan antolojisi -> Namık Kemal Tahrib-i Harabat ile eleştirmiştir).',
    isHighYield: true,
  },
  {
    id: 'lit_tanzimat_2_siir',
    term: 'Tanzimat II. Dönem Şiiri (Recaizade, Abdülhak Hamit, Muallim Naci)',
    shortCode: 'TANZ-II',
    periodOrTopic: 'Tanzimat Edebiyatı (1876–1896)',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Siyasi baskılarla sanat için sanat anlayışına dönülmüş; ölüm, metafizik, doğa ve bireysel duygular işlenmiştir. Recaizade’nin "Güzel olan her şey şiirin konusu olabilir" görüşü yeni şiirin kapısını açmıştır.',
    examTip:
      'Abdülhak Hamit Tarhan "Şair-i Azam"dır: Sahra (ilk pastoral), Validem (ilk kafiyesiz), Makber (metafizik ölüm ağıtı). Muallim Naci "Demdeme" ile göz için uyak (eski) tarafını savunurken Recaizade "Zemzeme" ile kulak için uyak demiştir.',
    isHighYield: true,
  },
  {
    id: 'lit_servetifunun_siir',
    term: 'Servetifünun (Edebiyat-ı Cedide) Şiiri — Tevfik Fikret & Cenap',
    shortCode: 'SERVET-Ş',
    periodOrTopic: 'Servetifünun (1896–1901)',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Sanat için sanat, kulak için uyak, anjanbman (cümlelerin dizeler boyunca taşması), sone-terzarima-triyole-müstezat biçimleri, Arapça-Farsça yeni tamlamalar (saat-ı semen-fam) ve musiki/resim (Parnasizm–Sembolizm) görülür.',
    examTip:
      'Tevfik Fikret başlangıçta bireysel (Rübab-ı Şikeste), 1901 sonrası toplumcu-eleştirel (Sis, Tarih-i Kadim, Haluk’un Defteri) yazmıştır; yalnız "Şermin"i heceyle çocuklar için yazmıştır. Cenap Şehabettin "Elhan-ı Şita"da kar yağışını aruzla hissettirmiştir.',
    isHighYield: true,
  },
  {
    id: 'lit_fecriati_hasim',
    term: 'Fecriati Topluluğu & Ahmet Haşim (Saf Şiir Öncüsü)',
    shortCode: 'FECRİATİ',
    periodOrTopic: 'Fecriati (1909–1912)',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Türk edebiyatında ilk kez bir beyanname (bildiri) yayımlayarak "Sanat şahsi ve muhteremdir" diyen topluluk kısa sürede dağılmış; çizgisini sürdüren en büyük şair Ahmet Haşim "Piyale" önsözünde Saf Şiir poetikasını kurmuştur.',
    examTip:
      'Ahmet Haşim bütün şiirlerini aruzla yazmıştır (heceyi "köylü vezni" sayar). Akşam, kızıllık, göl, gurbet temaları (Piyale, Göl Saatleri, Merdiven, O Belde) ve sembolizm-empresyonizm etkisindeki "musikiye yakın anlam kapalı şiir" imzasıdır.',
    isHighYield: true,
  },
  {
    id: 'lit_milli_edebiyat_siir',
    term: 'Millî Edebiyat Şiiri — Yeni Lisan, Yurdakul & Ziya Gökalp',
    shortCode: 'MİLLÎ-Ş',
    periodOrTopic: 'Millî Edebiyat (1911–1923)',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Selanik’te "Genç Kalemler" dergisinde Ömer Seyfettin, Ali Canip Yöntem ve Ziya Gökalp’in yayımladığı "Yeni Lisan" makalesiyle Arapça-Farsça tamlamalar atılmış, İstanbul Türkçesi ve hece ölçüsü esas alınmıştır.',
    examTip:
      'Mehmet Emin Yurdakul "Türkçe Şiirler" ve "Cenge Giderken" (Ben bir Türk’üm dinim, cinsim uludur) ile "Millî Şair" unvanını almıştır. Ziya Gökalp (Kızıl Elma, Yeni Hayat, Altın Işık) ise Türkçülüğü sistemleştirmiştir.',
    isHighYield: true,
  },
  {
    id: 'lit_bes_hececiler',
    term: 'Beş Hececiler (F.O.Y.E.H.)',
    shortCode: '5-HECE',
    periodOrTopic: 'Millî Edebiyat Dönemi',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Aruzla başlayıp Ziya Gökalp’in etkisiyle heceye yönelen beş şair Anadolu’yu, memleket sevgisini ve yiğitliği sade dille yazmıştır: Faruk Nafiz Çamlıbel, Orhan Seyfi Orhon, Yusuf Ziya Ortaç, Enis Behiç Koryürek, Halit Fahri Ozansoy.',
    examTip:
      'Kilit eserler: Faruk Nafiz ("Han Duvarları", "Sanat" — memleketçi poetika, "Çoban Çeşmesi"); Halit Fahri ("Aruza Veda", "Baykuş"); Enis Behiç ("Miras", gemicilik-deniz şiirleri); Yusuf Ziya ("Binnaz" heceli ilk başarılı piyes); Orhan Seyfi ("Fırtına ve Kar", "Peri Kızı ile Çoban Hikâyesi").',
    isHighYield: true,
  },
  {
    id: 'lit_bagimsiz_akif_yahya',
    term: 'Bağımsızlar: Mehmet Akif Ersoy & Yahya Kemal Beyatlı',
    shortCode: 'AKİF-YK',
    periodOrTopic: 'Millî Edebiyat Dönemi Bağımsızları',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Hiçbir edebî topluluğa katılmayan iki dev şair: Mehmet Akif gerçekçi İslamcı-toplumcu manzum hikâyeleriyle "Safahat"ı (7 kitap; İstiklal Marşı Safahat’ta yer almaz); Yahya Kemal ise neo-klasik "Kendi Gök Kubbemiz" ile İstanbul ve tarih aşkını aruzla işlemiştir.',
    examTip:
      'Yahya Kemal "Ok" şiiri dışındaki tüm şiirlerini aruzla, Mehmet Akif ise bütün şiirlerini aruzla ve sokağın konuşma diliyle yazmıştır. Safahat bölümleri: Safahat, Süleymaniye Kürsüsünde, Hakkın Sesleri, Fatih Kürsüsünde, Hatıralar, Asım, Gölgeler.',
    isHighYield: true,
  },
  {
    id: 'lit_yedi_mesaleciler',
    term: 'Yedi Meşaleciler (1928)',
    shortCode: '7-MEŞALE',
    periodOrTopic: 'Cumhuriyet Dönemi Şiiri',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Cumhuriyet döneminde bildiriyle ortaya çıkan İLK topluluktur (1928, "Yedi Meşale" kitabı). Beş Hececilerin yapay memleketçiliğine tepki gösterip "Canlılık, samimiyet ve daima yenilik" ilkesini savundular.',
    examTip:
      'Üyeler (Ce-Vi-Z Sa-Ya-K-Mu): Ziya Osman Saba (en sadık şair, "Sebil ve Güvercinler", "Geçen Zaman"), Yaşar Nabi Nayır (Varlık dergisi), Sabri Esat Siyavuşgil, Vasfi Mahir Kocatürk, Cevdet Kudret Solok, Muammer Lütfi, Kenan Hulusi Koray (tek öykücü!).',
    isHighYield: true,
  },
  {
    id: 'lit_cumhuriyet_saf_1',
    term: 'Cumhuriyet Öz (Saf) Şiiri — Tanpınar, Necip Fazıl & Tarancı',
    shortCode: 'SAF-1',
    periodOrTopic: 'Cumhuriyet Öz Şiir Anlayışı',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Biçim mükemmelliği, iç musiki, sezgi, rüya, zaman ve metafizik korku temalarını bireysel estetikle işlerler; ideolojiden uzak dururlar.',
    examTip:
      'Ahmet Hamdi Tanpınar ("Bursa’da Zaman", "Ne İçindeyim Zamanın"); Necip Fazıl Kısakürek ("Kaldırımlar", "Çile", Büyük Doğu dergisi, "Ben ve Ötesi"); Cahit Sıtkı Tarancı ("Otuz Beş Yaş", "Ömrümde Sükût", "Memleket İsterim").',
    isHighYield: true,
  },
  {
    id: 'lit_cumhuriyet_saf_2',
    term: 'Cumhuriyet Öz Şiiri — Dıranas, Çelebi, Dağlarca & Necatigil',
    shortCode: 'SAF-2',
    periodOrTopic: 'Cumhuriyet Öz Şiir Anlayışı',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Heceyi kırarak modernleştiren Ahmet Muhip Dıranas, Doğu-Budizm-tasavvuf imgecisi Asaf Halet Çelebi, "Yapma Destan" ve Türkçe sevdalısı Fazıl Hüsnü Dağlarca ve "Evler Şairi" Behçet Necatigil öz şiirin güçlü halkalarıdır.',
    examTip:
      'Dıranas: "Fahriye Abla", "Olvido", "Serenad"; Çelebi: "He", "Lâmelif", "Om Mani Padme Hum"; Dağlarca: "Çocuk ve Allah", "Çakırın Destanı", "Üç Şehitler Destanı"; Necatigil: "Kapalı Çarşı", "Evler".',
    isHighYield: true,
  },
  {
    id: 'lit_toplumcu_siir_1',
    term: 'Toplumcu Gerçekçi Şiir — Nâzım Hikmet, Lav & Ilgaz',
    shortCode: 'TOPLUM-Ş',
    periodOrTopic: 'Cumhuriyet Toplumcu Şiir',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Rus Fütürizmi (Mayakovski) ve Marksist anlayışla serbest nazmı Türk şiirine sokan Nâzım Hikmet; basamaklı dizeler, makine sesi, hitabet üslubu ve işçi/halk sorunlarını işlemiştir.',
    examTip:
      'Nâzım Hikmet: "835 Satır" (ilk serbest şiir kitabı), "Jokond ile Si-Ya-U", "Memleketimden İnsan Manzaraları", "Kuvâyi Milliye Destanı". Ercüment Behzat Lav ("S.O.S", ilk gerçeküstücü/fütürist denemeler); Rıfat Ilgaz ("Yarenlik", "Sınıf", "Hababam Sınıfı").',
    isHighYield: true,
  },
  {
    id: 'lit_maviciler_kansu',
    term: 'Maviciler (Attilâ İlhan) & 1940 Toplumcu Şiiri',
    shortCode: 'MAVİ',
    periodOrTopic: 'Cumhuriyet Şiiri (1950’ler)',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      '1952’de "Mavi" dergisi çevresinde Attilâ İlhan, Orhan Duru, Ferit Edgü ve Ahmet Oktay bir araya gelerek Garipçilerin şairaneliği yok saymasına karşı "sosyal realizmi ve imgeci şiiri" savundular.',
    examTip:
      'Attilâ İlhan kendine özgü küçük harf-noktalama düzeniyle bilinir: "Duvar", "Sisler Bulvarı", "Ben Sana Mecburum", "Üçüncü Şahsın Şiiri", "Yağmur Kaçağı". Ceyhun Atuf Kansu ("Dünyanın Bütün Çiçekleri") da 1940 toplumcularındandır.',
    isHighYield: true,
  },
  {
    id: 'lit_memleketci_bagimsiz',
    term: 'Memleketçi / Millî Edebiyat Zevkini Sürdüren Şiir',
    shortCode: 'MEMLEKET',
    periodOrTopic: 'Cumhuriyet Şiiri',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Anadolu folklorunu, millî duyguları, gurbet ve bayrak sevgisini hece ölçüsü ve anlaşılır dille işleyen şairlerdir: Ahmet Kutsi Tecer, Kemalettin Kamu, Arif Nihat Asya, Orhan Şaik Gökyay, Ömer Bedrettin Uşaklı, Zeki Ömer Defne.',
    examTip:
      'Sloganlaşan eşleşmeler: Kemalettin Kamu = "Gurbet Şairi" ("Bingöl Çobanları"); Arif Nihat Asya = "Bayrak Şairi" ("Bir Bayrak Rüzgâr Bekliyor"); Ahmet Kutsi Tecer = Âşık Veysel’i keşfeden ("Orda Bir Köy Var Uzakta"); Orhan Şaik Gökyay = "Bu Vatan Kimin?".',
    isHighYield: true,
  },
  {
    id: 'lit_garip_1_yeni',
    term: 'Garip Hareketi (I. Yeni: 1941)',
    shortCode: 'GARİP',
    periodOrTopic: 'Cumhuriyet Şiiri (1941–1950)',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Orhan Veli Kanık, Melih Cevdet Anday ve Oktay Rifat Horozcu’nun "Garip" ortak kitabıyla ölçüyü, uyağı, edebî sanatları ve şairaneliği reddederek sıradan insanı, gündelik dili ve ironiyi merkeze alan akımdır.',
    examTip:
      'Orhan Veli ("Kitabe-i Seng-i Mezar / Süleyman Efendi", "Anlatamıyorum", "İstanbul’u Dinliyorum"); Melih Cevdet (sonra felsefi/mitolojik: "Rahatı Kaçan Ağaç", "Kolları Bağlı Odysseus"); Oktay Rifat ("Perçemli Sokak" ile II. Yeni’ye kaydı).',
    isHighYield: true,
  },
  {
    id: 'lit_ikinci_yeni_genel',
    term: 'İkinci Yeni Şiirinin Özellikleri & İlhan Berk, Uyar, Cansever',
    shortCode: 'II.YENİ-1',
    periodOrTopic: 'İkinci Yeni (1955–1965)',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Garip’in sıradanlığına tepki olarak "Pazar Postası"nda gelişti; anlam kapalılığı, soyutlama, sürrealizm, dil bilgisi deformasyonu ve çağrışım/imge yoğunluğu üzerine kuruludur.',
    examTip:
      'İlhan Berk ("Galile Denizi", "İstanbul", "Pera"); Turgut Uyar ("Dünyanın En Güzel Arabistanı", "Büyük Saat", "Göğe Bakma Durağı"); Edip Cansever ("Yerçekimli Karanfil", "Umutsuzlar Parkı", "Tragedyalar" — tiyatro/diyalog şiir).',
    isHighYield: true,
  },
  {
    id: 'lit_ikinci_yeni_2',
    term: 'İkinci Yeni — Cemal Süreya, Ece Ayhan, Karakoç & Tamer',
    shortCode: 'II.YENİ-2',
    periodOrTopic: 'İkinci Yeni (1955–1965)',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Her biri özgün ses kuran İkinci Yeni ustaları: ironik erotizm ve "Papirüs" dergisiyle Cemal Süreya, "Sivil Şiir" ve aykırı tarih diliyle Ece Ayhan, İslamcı-diriliş imgecisi Sezai Karakoç, türkü-masal duyarlığıyla Ülkü Tamer.',
    examTip:
      'Eserleri ezbere bil: Cemal Süreya ("Üvercinka", "Göçebe", "Sevda Sözleri"); Ece Ayhan ("Kınar Hanımın Denizleri", "Bakışsız Bir Kedi Kara"); Sezai Karakoç ("Mona Rosa", "Körfez", "Hızırla Kırk Saat"); Ülkü Tamer ("Soğuk Otların Altında", "Yanardağın Üstündeki Kuş").',
    isHighYield: true,
  },
  {
    id: 'lit_metafizik_siir',
    term: 'Dinî Değerleri / Metafizik Duyarlığı Önceleyen Şiir',
    shortCode: 'METAFİZİK',
    periodOrTopic: 'Cumhuriyet Şiiri (1960–1980)',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Sezai Karakoç’un Diriliş ve Nuri Pakdil’in Edebiyat dergisi çizgisinde; modern kent insanının yalnızlığını İslami/metafizik duyarlık ve İkinci Yeni’ye yakın imgelerle anlatan "Yedi Güzel Adam" kuşağıdır.',
    examTip:
      'Öncüler: Cahit Zarifoğlu ("İşaret Çocukları", "Yedi Güzel Adam", "Menziller"), Erdem Bayazıt ("Sebep Ey", "Risaleler"), Rasim Özdenören (öykü: "Gül Yetiştiren Adam"), Alaeddin Özdenören, Mehmet Akif İnan, Ebubekir Eroğlu.',
    isHighYield: true,
  },
  {
    id: 'lit_1960_toplumcu_siir',
    term: '1960 Sonrası Toplumcu Şiir (Özel, Behramoğlu, Akın)',
    shortCode: '1960-TOP',
    periodOrTopic: '1960 Sonrası Şiir',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      '1960 Anayasası sonrası politik ve toplumsal sorunları yüksek sesli, sloganik ama güçlü imgelerle işleyen kuşaktır; Halkın Dostları ve Militan dergileri öne çıkmıştır.',
    examTip:
      'İsmet Özel (ilk dönemi toplumcu "Evet, İsyan", "Geceleyin Bir Koşu"; 1974 sonrası İslami-metafizik "Erbain", "Amentü"), Ataol Behramoğlu ("Bir Gün Mutlaka", "Yaşadıklarımdan Öğrendiğim Bir Şey Var"), Gülten Akın ("Kestim Kara Saçlarımı"), Süreyya Berfe, Refik Durbaş.',
    isHighYield: true,
  },
  {
    id: 'lit_1980_sonrasi_siir',
    term: '1980 Sonrası Türk Şiiri (İmgeci, Gelenekçi, Kısa Şiir)',
    shortCode: '1980+',
    periodOrTopic: '1980 Sonrası Şiir',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      '12 Eylül sonrası politikadan uzaklaşıp "Şiir politikadan arınmalı" görüşüyle bireye, imgeye, geçmiş şiir birikimine (Divan-Halk-II. Yeni barışıklığı) ve kent melankolisine yöneldi.',
    examTip:
      'Başlıca isimler: Haydar Ergülen ("Kırk Şiir ve Bir", "Eskiden Terzi"), Hüseyin Atlansoy ("İntihar İlacı"), Sunay Akın ("Makiler" — kısa/nükteli şiir), Murathan Mungan, Lale Müldür, Sedat Umran ("Eşyanın şairi"), Küçük İskender, Şükrü Erbaş.',
    isHighYield: false,
  },
  {
    id: 'lit_cumhuriyet_halk_siiri',
    term: 'Cumhuriyet Dönemi Halk Şiiri (Veysel, Karakoç, Ertaş)',
    shortCode: 'CUM-HALK',
    periodOrTopic: 'Cumhuriyet Halk Ozanları',
    category: 'TANZIMAT_CUMHURIYET_SIIR',
    examLevel: 'AYT',
    mechanism:
      'Saz çalma ve bade içme geleneği sürse de matbaa/radyo aracılığıyla Cumhuriyet değerleri, vatan, Atatürk ve güncel toplumsal konular sade heceyle işlenmiştir.',
    examTip:
      'Âşık Veysel Şatıroğlu ("Dostlar Beni Hatırlasın", "Kara Toprak"), Abdurrahim Karakoç ("Mihriban", "Hasan’a Mektuplar"), Neşet Ertaş (Bozlak ustası, mahlası Garip), Âşık Mahzuni Şerif, Şeref Taşlıova, Murat Çobanoğlu, Âşık Feymani.',
    isHighYield: true,
  },

  // =========================================================================
  // 5. HİKÂYE, ROMAN, TİYATRO, ÖĞRETİCİ METİN & EDEBÎ AKIMLAR (20 KAVRAM — AYT)
  // =========================================================================
  {
    id: 'lit_hikaye_maupassant_cehov',
    term: 'Olay (Maupassant) & Durum (Çehov) Hikâyesi · Teknikler',
    shortCode: 'HİKÂYE',
    periodOrTopic: 'Hikâye Bilgisi',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Maupassant (Klasik/Olay) hikâyesinde serim-düğüm-çözüm ve merak önde olup bizde Ömer Seyfettin, Refik Halit öncüsüdür. Çehov (Durum/Kesit) hikâyesinde günlük kesit/ruh hâli esastır; bizde Memduh Şevket Esendal ve Sait Faik Abasıyanık temsilcisidir.',
    examTip:
      'Anlatım teknikleri: Özetleme, Gösterme (diyalog/sahne), İç Konuşma (monolog), Bilinç Akışı (mantık sırası olmayan dağınık iç düşünce), İç Çözümleme (anlatıcının kahramanın içini aktarması), Geriye Dönüş ve Pastiş/Parodi/Üstkurmaca.',
    isHighYield: true,
  },
  {
    id: 'lit_tanzimat_roman_1',
    term: 'Tanzimat Roman & Hikâyesinde İlkler (Şemsettin Sami, N. Kemal, Mithat)',
    shortCode: 'TANZ-ROM1',
    periodOrTopic: 'Tanzimat Dönemi Romanı',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Türk edebiyatı roman ve modern hikâyeyle Tanzimat’ta tanıştı; I. Dönemde Romantizm etkisiyle yanlış Batılılaşma, görücü usulü evlilik, esaret ve tarih konuları işlenip teknik kusurlar (olayı kesip bilgi verme) görüldü.',
    examTip:
      'İlkler zinciri: İlk çeviri roman = Yusuf Kamil Paşa (Telemak); İlk yerli roman = Şemsettin Sami (Taaşşuk-ı Talat ve Fitnat); İlk hikâye kitabı = Ahmet Mithat Efendi (Letaif-i Rivayat); İlk edebî roman = Namık Kemal (İntibah); İlk tarihî roman = Cezmi; İlk polisiye = Esrar-ı Cinayat.',
    isHighYield: true,
  },
  {
    id: 'lit_tanzimat_roman_2',
    term: 'Tanzimat II. Dönem Realizmi (Recaizade, Sezai, Nabizade, Fatma Aliye)',
    shortCode: 'TANZ-ROM2',
    periodOrTopic: 'Tanzimat Dönemi Romanı',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'II. Dönemde Realizm ve Natüralizm başlamış; yazarlar kişiliklerini gizlemiş, gözlem ve psikolojiye yönelmiştir.',
    examTip:
      'Mutlaka bil: Recaizade Mahmut Ekrem → Araba Sevdası (İlk realist roman, Bihruz Bey); Sami Paşazade Sezai → Sergüzeşt (Dilber/esaret) & Küçük Şeyler (Batılı anlamda ilk modern hikâye); Nabizade Nazım → Karabibik (İlk köy romanı) & Zehra (İlk psikolojik roman denemesi/natüralist); Fatma Aliye → Muhadarat (ilk kadın romancımız).',
    isHighYield: true,
  },
  {
    id: 'lit_servetifunun_roman',
    term: 'Servetifünun Romanı (Halit Ziya, Mehmet Rauf) & Hüseyin Rahmi',
    shortCode: 'SERVET-R',
    periodOrTopic: 'Servetifünun Roman ve Hikâyesi',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Teknik kusurlardan arınmış Batılı anlamdaki ilk kusursuz Türk romanları Realizm etkisiyle İstanbul aydın çevresinde yazılmıştır.',
    examTip:
      'Halit Ziya Uşaklıgil (modern Türk romanının kurucusu): Mai ve Siyah (Ahmet Cemil), Aşk-ı Memnu (Bihter-Behlül), Kırık Hayatlar, Mezardan Sesler (ilk mensur şiir). Mehmet Rauf: Eylül (İlk psikolojik roman: Suat-Necip-Süreyya). Bağımsız Hüseyin Rahmi Gürpınar: sokağı romana taşıdı (Şık, Şıpsevdi, Kuyruklu Yıldız Altında Bir İzdivaç, Gulyabani).',
    isHighYield: true,
  },
  {
    id: 'lit_milli_edebiyat_roman',
    term: 'Millî Edebiyat Hikâye & Romanı (Ömer Seyfettin, Yakup Kadri, Halide Edip, Reşat Nuri)',
    shortCode: 'MİLLÎ-ROM',
    periodOrTopic: 'Millî Edebiyat Roman ve Hikâyesi',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'İstanbul dışına, Anadolu’ya ve Kurtuluş Savaşı’na açılan realist çizgi sade Türkçeyi benimsemiştir.',
    examTip:
      'Ömer Seyfettin (Yalnız Efe, Kaşağı, Başını Vermeyen Şehit); Yakup Kadri Karaosmanoğlu (nehir romanları: Kiralık Konak, Nur Baba, Hüküm Gecesi, Sodom ve Gomore, Yaban [aydın-köylü], Ankara); Halide Edip Adıvar (Ateşten Gömlek [Kurtuluş Savaşı ilk roman], Vurun Kahpeye, Sinekli Bakkal); Reşat Nuri (Çalıkuşu, Yaprak Dökümü, Yeşil Gece); Refik Halit (Memleket / Gurbet Hikâyeleri).',
    isHighYield: true,
  },
  {
    id: 'lit_cumhuriyet_birey',
    term: 'Bireyin İç Dünyasını Esas Alan Roman & Hikâye',
    shortCode: 'BİREY-ROM',
    periodOrTopic: 'Cumhuriyet Dönemi Romanı',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'İnsanın yalnızlığını, ruhsal bunalımlarını, Doğu-Batı bocalamasını psikoloji ve psikanalizden yararlanarak işleyen çizgidir.',
    examTip:
      'Peyami Safa (Dokuzuncu Hariciye Koğuşu [ilk otobiyografik psikolojik], Fatih-Harbiye, Matmazel Noraliya’nın Koltuğu, Sözde Kızlar), Ahmet Hamdi Tanpınar (Huzur [Mümtaz-Nuran], Saatleri Ayarlama Enstitüsü), Tarık Buğra (Küçük Ağa, İbiş’in Rüyası), Abdülhak Şinasi Hisar (Fahim Bey ve Biz), Mustafa Kutlu (uzun hikâye), Samiha Ayverdi.',
    isHighYield: true,
  },
  {
    id: 'lit_cumhuriyet_toplumcu_rom',
    term: 'Toplumcu Gerçekçi Roman & Hikâye (Köy/İşçi/Ağa)',
    shortCode: 'TOPLUM-R',
    periodOrTopic: 'Cumhuriyet Dönemi Romanı',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Köylü-ağa, işçi-patron, göç ve yoksulluk sorunlarını tezli, yer yer mahallî ağızlı realist yaklaşımla ele alırlar.',
    examTip:
      'Sadri Ertem (Çıkrıklar Durunca — öncü); Sabahattin Ali (Kuyucaklı Yusuf, Kürk Mantolu Madonna, İçimizdeki Şeytan); Yaşar Kemal (İnce Memed, Yer Demir Gök Bakır, Yılanı Öldürseler); Orhan Kemal (Bereketli Topraklar Üzerinde, Murtaza, Hanımın Çiftliği); Kemal Tahir (Devlet Ana, Esir Şehrin İnsanları, Yorgun Savaşçı); Fakir Baykurt (Yılanların Öcü, Tırpan); Aziz Nesin & Kemal Bilbaşar (Cemo).',
    isHighYield: true,
  },
  {
    id: 'lit_cumhuriyet_milli_rom',
    term: 'Millî ve Dinî Duyarlığı Yansıtan Roman & Hikâye',
    shortCode: 'MİLLÎ-CUM',
    periodOrTopic: 'Cumhuriyet Dönemi Romanı',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Tarih şuuru, Kurtuluş Savaşı, Anadolu’nun kalkınması, gelenek ve ahlaki değerler ekseninde eserler vermişlerdir.',
    examTip:
      'Hüseyin Nihal Atsız (Bozkurtların Ölümü, Ruh Adam); Mithat Cemal Kuntay (Üç İstanbul); Aka Gündüz (Dikmen Yıldızı); Mustafa Necati Sepetçioğlu (Kilit, Çatı, Konak — Selçuklu/Osmanlı); Emine Işınsu (Küçük Dünya, Azap Toprakları); Sevinç Çokum (Zor, Hilal Görününce); Bahaeddin Özkişi (Sokakta, Köse Kadı).',
    isHighYield: false,
  },
  {
    id: 'lit_modernist_postmodernist',
    term: 'Modernist ve Postmodernist Roman (Oğuz Atay, Atılgan, Ağaoğlu, Pamuk)',
    shortCode: 'POSTMOD',
    periodOrTopic: 'Modernist-Postmodernist Çizgi',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Geleneksel serim-düğüm-çözümü kıran; bilinç akışı, üstkurmaca (metafiction: yazarın yazma sürecini romana katması), pastiş (üslup taklidi), parodi (metni alaycı dönüştürme), kolaj ve leitmotiv kullanan anlatılardır.',
    examTip:
      'Oğuz Atay: Tutunamayanlar (ilk postmodern roman, Selim Işık–Turgut Özben), Tehlikeli Oyunlar, Bir Bilim Adamının Romanı; Yusuf Atılgan: Aylak Adam (C.), Anayurt Oteli (Zebercet); Adalet Ağaoğlu: Ölmeye Yatmak, Bir Düğün Gecesi; Orhan Pamuk: Kara Kitap, Benim Adım Kırmızı, Masumiyet Müzesi; Bilge Karasu (Gece), Latife Tekin (Sevgili Arsız Ölüm), Ferit Edgü (Hakkâri’de Bir Mevsim, küçürek öykü).',
    isHighYield: true,
  },
  {
    id: 'lit_dunya_romani',
    term: 'Dünya Edebiyatında Roman & Önemli Temsilciler',
    shortCode: 'DÜNYA-R',
    periodOrTopic: 'Dünya Edebiyatı',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'İlk modern roman örneği İspanyol Cervantes’in "Don Kişot"udur (1605). Realizm-Romantizm-Modernizm çizgisinde Fransız, Rus, İngiliz, Alman ve Amerikan edebiyatları dünya romanını şekillendirmiştir.',
    examTip:
      'Eşleşmeler: Victor Hugo (Sefiller), Balzac (Vadideki Zambak), Flaubert (Madam Bovary), Stendhal (Kırmızı ve Siyah), Zola (Germinal), Dostoyevski (Suç ve Ceza), Tolstoy (Savaş ve Barış, Anna Karenina), Gogol (Ölü Canlar), Turgenyev (Babalar ve Oğullar), Dickens (İki Şehrin Hikâyesi), Steinbeck (Gazap Üzümleri), Hemingway (Yaşlı Adam ve Deniz), Cengiz Aytmatov (Beyaz Gemi, Gün Olur Asra Bedel).',
    isHighYield: false,
  },
  {
    id: 'lit_tiyatro_turler_yapisi',
    term: 'Modern Tiyatro Türleri (Trajedi, Komedi, Dram, Epik, Absürt)',
    shortCode: 'TİYATRO-T',
    periodOrTopic: 'Tiyatro Bilgisi',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Trajedi soylu kişiler, üç birlik kuralı (olay-yer-zaman) ve manzum/kaba sözsüz yapıya; Komedi günlük sıradan insanlara (karakter, töre, entrika) ve üç birliğe; Dram ise hem acıklı hem gülünç yaşama (üç birliği kırar, Shakespeare/Hugo) dayanır.',
    examTip:
      'Epik tiyatro (Bertolt Brecht; bizde Haldun Taner "Keşanlı Ali Destanı") seyirciye "bu bir oyun" diyerek eleştirel düşünme sağlar. Absürt (Uyumsuz) tiyatro (Beckett "Godot’yu Beklerken"; bizde Güngör Dilmen "Canlı Maymun Lokantası") mantık bağını bilerek bozar.',
    isHighYield: true,
  },
  {
    id: 'lit_geleneksel_tiyatro',
    term: 'Geleneksel Türk Tiyatrosu (Karagöz, Orta Oyunu, Meddah, Köy Seyirlik)',
    shortCode: 'GEL-TİY',
    periodOrTopic: 'Geleneksel Türk Tiyatrosu',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Yazılı metinsiz, doğaçlamaya (tuluat) dayalıdır. Karagöz gölge oyunu (Karagöz=okumamış halk, Hacivat=yarı aydın); Orta Oyunu meydanda ("palanga", Kavuklu=Karagöz, Pişekâr=Hacivat); Meddah tek kişilik anlatı (mendil-baston); Köy Seyirlik kırsal ritüeldir.',
    examTip:
      '4 ortak bölüm: 1) Mukaddime (Giriş), 2) Muhavere (Karşılıklı söyleşme/yanlış anlamalar), 3) Fasıl (Asıl oyun), 4) Bitiş. Ayrıca Kukla ve Tuluat (orta oyununun sahneye uyarlanmış biçimi, Kel Hasan Efendi) geleneksel alandadır.',
    isHighYield: true,
  },
  {
    id: 'lit_modern_turk_tiyatrosu',
    term: 'Tanzimat’tan Cumhuriyet’e Modern Türk Tiyatrosu',
    shortCode: 'MOD-TİY',
    periodOrTopic: 'Modern Türk Tiyatrosu',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Şinasi’nin "Şair Evlenmesi" (1860, ilk yerli oyun, Müştak Bey–Kumru Hanım) ile başlayıp Namık Kemal’in "Vatan yahut Silistre"si (1873, sahnelenen ilk oyun) ile genişledi; Cumhuriyet’te Muhsin Ertuğrul kurumlaştırdı.',
    examTip:
      'Tanzimat-Meşrutiyet: Direktör Ali Bey (Ayyar Hamza), Ahmet Vefik Paşa (Molière uyarlamaları, Bursa tiyatrosu), İbnürrefik Ahmet Nuri Sekizinci, Musahipzade Celal (Fermanlı Deli Hazretleri). Cumhuriyet: Haldun Taner (Keşanlı Ali Destanı), Orhan Asena (Hürrem Sultan, Tanrılar ve İnsanlar), Turan Oflazoğlu (IV. Murat), Turgut Özakman (Ah Şu Gençler), Güngör Dilmen (Midas üçlemesi).',
    isHighYield: true,
  },
  {
    id: 'lit_masal_fabl_destan_efsane',
    term: 'Masal, Fabl, Destan, Efsane ve Halk Hikâyesi',
    shortCode: 'MASAL-DEST',
    periodOrTopic: 'Anlatmaya Bağlı Türler',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Masal tekerlemeyle başlar, zaman/mekân belirsizdir (dilek: "Onlar ermiş muradına"); Fabl hayvanlara/bitkilere ders verdirir (Beydeba Kelile ve Dimne, La Fontaine, Ezop, Şeyhi Harnâme); Destan milletin olağanüstü serüvenidir (Doğal vs Yapma).',
    examTip:
      'Türk Doğal Destanları: İslamiyet öncesi → Yaradılış (Altay), Alp Er Tunga & Şu (Saka), Oğuz Kağan (Hun), Bozkurt & Ergenekon (Göktürk), Türeyiş & Göç (Uygur). İslamiyet sonrası → Satuk Buğra Han (Karahanlı), Manas (Kırgız — dünyanın en uzun destanı), Cengizname, Battal Gazi, Danişmendname, Köroğlu.',
    isHighYield: true,
  },
  {
    id: 'lit_divan_nesri',
    term: 'Divan Nesri (Sade, Orta, Süslü) & Mensur Türler',
    shortCode: 'DİVAN-N',
    periodOrTopic: 'Divan Nesir Geleneği',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Üç düzeyde gelişmiştir: Sade nesir (halkı bilgilendirme: Mercimek Ahmet Kabusname, Seydi Ali Reis Mir’atü’l-Memalik [ilk gezi]), Orta nesir (Katip Çelebi, Naima, Evliya Çelebi Seyahatname), Süslü nesir (seci=iç uyak ve sanatlı dil: Sinan Paşa Tazarruname, Veysi, Nergisi).',
    examTip:
      'Önemli Divan nesir türleri: Tezkire (şair biyografisi: Ali Şir Nevai Mecalisü’n-Nefais ilk, Sehi Bey Heşt Behişt Anadolu’da ilk), Sefaretname (elçilik: Yirmisekiz Çelebi Mehmet Fransa), Surname (düğün-şenlik), Şehrengiz (şehir güzelliği), Pendname (öğüt), Gazavatname (savaş).',
    isHighYield: true,
  },
  {
    id: 'lit_ogretici_gazete',
    term: 'Gazete Çevresinde Gelişen Öğretici Metinler',
    shortCode: 'ÖĞR-GAZ',
    periodOrTopic: 'Öğretici Metinler',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Makale (kanıtlamalı nesnel yazı; ilk makale Şinasi "Tercüman-ı Ahval Mukaddimesi"), Deneme ("Ben"in ülkesi, kanıt zorunluluğu yok; Montaigne, Nurullah Ataç, Suut Kemal), Fıkra (güncel gazete köşe yazısı; Ahmet Rasim, Falih Rıfkı), Sohbet/Söyleşi (karşılıklı konuşma havası; Şevket Rado "Eşref Saat"), Eleştiri, Röportaj (Yaşar Kemal) ve Mülakat (Ruşen Eşref Ünaydın "Diyorlar ki").',
    examTip:
      'Makale ile Deneme farkı: Makalede tez ispatı ve nesnel/bilimsel dil vardır; Denemede ise yazar kendiyle konuşur gibi öznel ve kanıt kaygısız yazar ("Ben" merkezli). Fıkra günübirliktir, Deneme kalıcıdır.',
    isHighYield: true,
  },
  {
    id: 'lit_ogretici_kisisel',
    term: 'Kişisel Hayatı Konu Alan Öğretici Metinler',
    shortCode: 'ÖĞR-KİŞİ',
    periodOrTopic: 'Öğretici Metinler',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Anı/Hatıra (yaşanmış olayların sonradan yazılması: Babürname ilk, Ziya Paşa "Defter-i Amal", Halit Ziya "Kırk Yıl", Yakup Kadri "Zoraki Diplomat"), Günlük/Günce (tarih atılarak günü gününe: Nurullah Ataç), Gezi Yazısı (Evliya Çelebi, Falih Rıfkı "Denizaşırı/Bizim Akdeniz"), Biyografi/Otobiyografi (Şevket Süreyya "Tek Adam" & "Suyu Arayan Adam") ve Mektup.',
    examTip:
      'Cumhuriyet öncesi gezi yazılarımız: Seydi Ali Reis (Mir’atü’l-Memalik), Evliya Çelebi (Seyahatname), Ahmet Mithat (Avrupa’da Bir Cevelan), Cenap Şehabettin (Hac Yolunda, Avrupa Mektupları).',
    isHighYield: false,
  },
  {
    id: 'lit_akimlari_klasik_romantik',
    term: 'Edebî Akımlar I: Hümanizm, Klasisizm ve Romantizm',
    shortCode: 'AKIM-1',
    periodOrTopic: 'Batı Edebî Akımları',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Klasisizm (17. yy, Boileau): Akıl, sağduyu, soylu karakterler, mükemmel biçim, kaba söz yasağı (Molière, Corneille, Racine, La Fontaine; bizde Şinasi, Ahmet Vefik). Romantizm (18-19. yy, Victor Hugo): Duygu, hayal, zıtlıklar (iyi-kötü), tarih ve tabiat, yazarın taraf tutması (Namık Kemal, Ahmet Mithat, Abdülhak Hamit).',
    examTip:
      'Romantizmin manifestosu Victor Hugo’nun "Cromwell" ön sözüdür; Klasisizmin üç birlik kuralını ve kaba söz yasağını yıkarak Dram türünü ortaya çıkarmıştır.',
    isHighYield: true,
  },
  {
    id: 'lit_akimlari_realizm_nat',
    term: 'Edebî Akımlar II: Realizm ve Natüralizm',
    shortCode: 'AKIM-2',
    periodOrTopic: 'Batı Edebî Akımları',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Realizm (19. yy): Auguste Comte Pozitivizmi, nesnel gözlem, sıradan gerçekçi karakterler ve yazarın kendini gizlemesi (Flaubert, Balzac, Tolstoy, Dostoyevski; bizde Recaizade, Halit Ziya, Ömer Seyfettin). Natüralizm (Émile Zola): Determinizm, soyaçekim/genetik ve laboratuvar gözlemi, sokak dili (Hüseyin Rahmi, Nabizade).',
    examTip:
      'Realist sanatçı ayna tutar ve tarafsızdır; Natüralist ise insanı soyaçekim ve çevrenin ürünü bir deney nesnesi sayar, çirkinlikleri bile çekinmeden verir ("Deneysel Roman").',
    isHighYield: true,
  },
  {
    id: 'lit_akimlari_siir_modern',
    term: 'Edebî Akımlar III: Parnasizm, Sembolizm, Sürrealizm & Egzistansiyalizm',
    shortCode: 'AKIM-3',
    periodOrTopic: 'Batı Edebî Akımları',
    category: 'NESIR_ROMAN_TIYATRO_AKIM',
    examLevel: 'AYT',
    mechanism:
      'Parnasizm: Şiirde gerçekçilik, biçim kusursuzluğu ve "sanat için sanat" (Gautier, Heredia; bizde Tevfik Fikret, Yahya Kemal). Sembolizm: Anlam kapalılığı, simge ve musiki (Baudelaire, Mallarmé, Verlaine; bizde Cenap, Ahmet Haşim). Sürrealizm (Breton): Bilinçaltı, rüya (II. Yeni). Egzistansiyalizm (Sartre, Camus): Varoluş özden önce gelir.',
    examTip:
      'Şiirdeki iki kardeş farkı: Parnasizm = Dış dünya tasviri + resim + kusursuz biçim (Tevfik Fikret); Sembolizm = İç dünya sezdirme + akşam/alacakaranlık + musiki (Ahmet Haşim).',
    isHighYield: true,
  },
];
