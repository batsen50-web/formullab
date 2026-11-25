import type {GeographyExamQuestion} from '../types/geography';

export const GEOGRAPHY_EXAM_QUESTIONS: GeographyExamQuestion[] = [
  // =========================================================================
  // 1. HARITA_KONUM (8)
  // =========================================================================
  {
    id: 'geo_q_hk_01',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Ekvator’dan kutuplara doğru gidildikçe deniz seviyesinde bir cismin ağırlığının artması ve Ekvator çevresinin tam meridyen dairesinden 67 km daha uzun olması aşağıdakilerden hangisinin doğrudan sonucudur?',
    choices: [
      'Dünya’nın kutuplardan basık, Ekvator’dan şişkin geoit şekline sahip olmasının',
      'Yer ekseninin yörünge düzlemine 23° 27′ eğik bulunmasının',
      'Dünya’nın kendi ekseni etrafında batıdan doğuya dönmesinin',
      'Yörüngenin elips şeklinde olmasının',
    ],
    correctIndex: 0,
    examTip:
      'Yer çekiminin kutuplara artması, Ekvator yarıçapının kutup yarıçapından uzun olması ve Ekvator çevresinin meridyenden uzunluğu yalnızca geoit şeklin kanıtıdır.',
    relatedTermId: 'geo_hk_01',
  },
  {
    id: 'geo_q_hk_02',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Dünya’nın Güneş etrafındaki yörüngesinin elips olması nedeniyle 3 Ocak’ta Güneş’e en yakın, 4 Temmuz’da en uzak konumda olması aşağıdakilerden hangisine yol açar?',
    choices: [
      'Temmuz ayında Güneş ışınlarının Ekvator’a dik düşmesine',
      'Kuzey Yarım Küre’de yaz mevsiminin kışa göre 2 gün daha uzun sürmesine',
      'Her iki yarım kürede aynı anda aynı mevsimin yaşanmasına',
      'Ekvator ile kutuplar arasında sabit 12 saat gece-gündüz oluşmasına',
    ],
    correctIndex: 1,
    examTip:
      'Dünya 4 Temmuz (Günöte) civarında yörüngede yavaşladığı için KYK yazı uzar ve eylül ekinoksu 23 Eylül’de yaşanır.',
    relatedTermId: 'geo_hk_05',
  },
  {
    id: 'geo_q_hk_03',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: '21 Aralık tarihinde aşağıda verilen Türk illerinden hangisinde gündüz süresi diğerlerine göre en kısadır?',
    choices: ['Hatay', 'İzmir', 'Ankara', 'Sinop'],
    correctIndex: 3,
    examTip:
      '21 Aralık’ta kuzeye gidildikçe gece uzar, gündüz kısalır; Türkiye’nin en kuzeyindeki il merkezi olan Sinop’ta gündüz en kısadır.',
    relatedTermId: 'geo_hk_06',
  },
  {
    id: 'geo_q_hk_04',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: '26° Doğu meridyenindeki Çanakkale ile 45° Doğu meridyenindeki Iğdır arasında yerel saat farkı ve Türkiye’nin kullandığı ulusal saat meridyeni hangi seçenekte doğru verilmiştir?',
    choices: [
      '64 dakika · 30° Doğu',
      '76 dakika · 45° Doğu',
      '76 dakika · 36° Doğu',
      '84 dakika · 45° Doğu',
    ],
    correctIndex: 1,
    examTip:
      '(45° − 26°) = 19 meridyen × 4 dakika = 76 dakika doğu-batı zaman farkı vardır; Türkiye tüm yıl +3 saat dilimi olan 45° Doğu boylamını kullanır.',
    relatedTermId: 'geo_hk_09',
  },
  {
    id: 'geo_q_hk_05',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Türkiye ile ilgili verilen özelliklerden hangisi mutlak (matematik) konumun bir sonucu değildir?',
    choices: [
      'Öğle vakti yatay düzlemdeki cisimlerin gölgesinin yıl boyunca kuzeye düşmesi',
      'Kuzeyden esen rüzgârların sıcaklığı düşürmesi',
      'Üç tarafının denizlerle çevrili olması nedeniyle kıyılarında ılıman iklim görülmesi',
      '21 Haziran’da güneyden kuzeye gidildikçe gündüz süresinin uzaması',
    ],
    correctIndex: 2,
    examTip:
      'Denizellik, yükselti, dağların uzanışı ve boğazlara sahiplik göreceli (özel) konum sonuçlarıdır.',
    relatedTermId: 'geo_hk_11',
  },
  {
    id: 'geo_q_hk_06',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Aynı duvar boyutundaki iki Türkiye fiziki haritasından birincisi 1/500.000, ikincisi 1/2.000.000 ölçeklidir. Bu iki harita karşılaştırıldığında aşağıdakilerden hangisi doğrudur?',
    choices: [
      'Birinci haritada küçültme oranı daha fazla, ayrıntı daha azdır.',
      'İkinci haritada harita alanı daha geniş, izohips aralığı daha dardır.',
      'Birinci harita daha büyük ölçekli olup yer şekillerini daha ayrıntılı gösterir.',
      'İkinci haritada iki il arası harita uzunluğu daha büyüktür.',
    ],
    correctIndex: 2,
    examTip:
      'Ölçek paydası küçüldükçe (500.000 < 2.000.000) ölçek büyür, ayrıntı ve harita üzerindeki uzunluklar artar.',
    relatedTermId: 'geo_hk_13',
  },
  {
    id: 'geo_q_hk_07',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    isHighYield: false,
    stem: 'İzohipslerle çizilmiş bir topoğrafya haritasında, kıyı çizgisine yakın kesimde çok sayıda izohips çizgisinin tek bir çizgi hâlinde üst üste çakıştığı gözlenmiştir. Bu alanda aşağıdaki yer şekillerinden hangisi yer alır?',
    choices: ['Falez (Yalıyar)', 'Delta ovası', 'Haliç', 'Boyun'],
    correctIndex: 0,
    examTip:
      'Kıyıda izohipslerin üst üste çakışması deniz kenarında dik bir uçurum (falez/yalıyar) bulunduğunu gösterir.',
    relatedTermId: 'geo_hk_16',
  },
  {
    id: 'geo_q_hk_08',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Orta enlemlerde (30°–60°) bulunan Türkiye haritasının alan ve şekil bozulması en az olacak şekilde çizilmesi için tercih edilmesi gereken projeksiyon yöntemi hangisidir?',
    choices: [
      'Silindirik projeksiyon',
      'Konik projeksiyon',
      'Düzlem projeksiyon',
      'Mercator projeksiyonu',
    ],
    correctIndex: 1,
    examTip:
      'Ekvator çevresinde silindirik, orta kuşakta konik, kutuplarda ve küçük alanlarda düzlem projeksiyon en düşük hatayı verir.',
    relatedTermId: 'geo_hk_12',
  },

  // =========================================================================
  // 2. IKLIM_BIYOM (8)
  // =========================================================================
  {
    id: 'geo_q_ib_01',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Atmosferin en alt katmanı olan Troposfer’in kalınlığının Ekvator’da ~16 km iken kutuplarda ~9 km olmasında aşağıdakilerden hangisinin etkisi yoktur?',
    choices: [
      'Ekvator’da ısınan havanın yükselerek genleşmesi',
      'Dünya’nın kendi ekseni etrafındaki dönüşünün savurma kuvveti',
      'Kutuplarda yer çekiminin daha fazla olması',
      'Stratosfer’de ozon gazının yoğunlaşması',
    ],
    correctIndex: 3,
    examTip:
      'Troposfer kalınlığı sıcaklık (termal genleşme), merkezkaç kuvveti ve yer çekimi farkına bağlıdır; ozon tabakası Stratosfer içindedir.',
    relatedTermId: 'geo_ib_01',
  },
  {
    id: 'geo_q_ib_02',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Ocak ayında Trabzon’da ortalama sıcaklığın aynı veya daha güney enlemlerdeki Sivas ve Erzurum’dan daha yüksek olması temel olarak hangi faktörle açıklanır?',
    choices: [
      'Enlem ve güneş ışınlarının geliş açısı',
      'Denizellik ve yükselti farkı',
      'Bakı ve eğim yönü',
      'Sürekli rüzgârların sapma yönü',
    ],
    correctIndex: 1,
    examTip:
      'Trabzon deniz kıyısında (0 m, denizel) iken Sivas ve Erzurum yüksek ve karasaldır; kışın denizler karalardan daha sıcaktır.',
    relatedTermId: 'geo_ib_02',
  },
  {
    id: 'geo_q_ib_03',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Türkiye’de kış mevsiminde kuzeydoğudan sokularak İç ve Doğu Anadolu’da sert ayaz, şiddetli don ve açık-soğuk hava koşulları doğuran basınç merkezi hangisidir?',
    choices: [
      'İzlanda Dinamik Alçak Basıncı',
      'Sibirya Termik Yüksek Basıncı',
      'Basra Termik Alçak Basıncı',
      'Asor Dinamik Yüksek Basıncı',
    ],
    correctIndex: 1,
    examTip:
      'Sibirya TYB kışın kuzeydoğudan girer ve soğuk ayaz yapar; İzlanda DAB ise kuzeybatıdan girip ılık-yağışlı kış getirir.',
    relatedTermId: 'geo_ib_05',
  },
  {
    id: 'geo_q_ib_04',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Kış veya ilkbahar aylarında Doğu Karadeniz dağlarının kuzey yamaçlarından aşağıya inerken her 100 metrede 1 °C ısınarak Rize kıyılarında sıcaklığı artıran yerel rüzgâr türü hangisidir?',
    choices: ['Lodos', 'Poyraz', 'Fön rüzgârı', 'Etezyen'],
    correctIndex: 2,
    examTip:
      'Dağ yamacından alçalırken sürtünme ve sıkışmayla her 100 m’de 1 °C ısınan Fön rüzgârları mikroklima (Rize turunçgil, Iğdır pamuk) oluşumuna katkı sunar.',
    relatedTermId: 'geo_ib_07',
  },
  {
    id: 'geo_q_ib_05',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'İç Anadolu’da ilkbahar sonu ve yaz başında öğleden sonraları görülen, halk arasında "Kırkikindi" olarak adlandırılan yağışların oluşum tipi nedir?',
    choices: [
      'Yamaç (Orografik) yağışı',
      'Cephesel (Frontal) yağış',
      'Yükselim (Konveksiyonel) yağışı',
      'Muson yağışı',
    ],
    correctIndex: 2,
    examTip:
      'Isınan zeminden yükselen havanın soğuyup yoğunlaşmasıyla konveksiyonel (yükselim) yağışları meydana gelir.',
    relatedTermId: 'geo_ib_08',
  },
  {
    id: 'geo_q_ib_06',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Yazları sıcak ve kurak, kışları ılık ve cephesel yağışlı geçen iklim bölgesinin doğal bitki örtüsü Kızılçam iken, kızılçamların tahribiyle ortaya çıkan bodur ağaççık topluluğu nedir?',
    choices: ['Maki', 'Psödomaki', 'Tayga', 'Tundra'],
    correctIndex: 0,
    examTip:
      'Akdeniz ikliminde kızılçam tahribiyle Maki (zeytin, defne, zakkum, kocayemiş); makinin tahribiyle Garig oluşur.',
    relatedTermId: 'geo_ib_10',
  },
  {
    id: 'geo_q_ib_07',
    category: 'IKLIM_BIYOM',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Bir kara ekosistemindeki besin piramidinin tabanından üst basamaklarına (üreticiden üçüncül tüketiciye) doğru çıkıldıkça aşağıdakilerden hangisi artar?',
    choices: [
      'Aktarılan toplam kullanılabilir enerji miktarı',
      'Toplam biyokütle ve birey sayısı',
      'Dokularda biriken zehirli madde (biyobirikim) yoğunluğu',
      'Güneş enerjisini doğrudan kimyasal enerjiye çevirme hızı',
    ],
    correctIndex: 2,
    examTip:
      '%10 kuralıyla her basamakta enerji ve biyokütle azalırken, biyolojik birikim en üst tüketicilerde zirveye çıkar.',
    relatedTermId: 'geo_ib_15',
  },
  {
    id: 'geo_q_ib_08',
    category: 'IKLIM_BIYOM',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Atmosferde yaklaşık %78 oranında bulunan serbest azotun (N₂) canlılarca doğrudan kullanılamaması nedeniyle, azotun toprağa bağlanmasını sağlayan başlıca iki doğal süreç hangisidir?',
    choices: [
      'Buharlaşma ve yoğuşma',
      'Şimşek/yıldırım olayları ve azot bağlayıcı bakteriler',
      'Fosil yakıt yanması ve kireç taşı oluşumu',
      'Deniz akıntıları ve gelgit dalgaları',
    ],
    correctIndex: 1,
    examTip:
      'Yıldırım/şimşek enerjisi ve baklagil köklerindeki Rhizobium bakterileri N₂’yi nitrat tuzlarına dönüştürerek ekosisteme kazandırır.',
    relatedTermId: 'geo_ib_16',
  },

  // =========================================================================
  // 3. YERYUZU_SU (8)
  // =========================================================================
  {
    id: 'geo_q_ys_01',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Türkiye topraklarının büyük bölümü III. ve IV. Jeolojik Zamanlarda şekillenmiş genç bir arazi yapısına sahiptir. Aşağıdakilerden hangisi bu genç oluşumun kanıtı değildir?',
    choices: [
      'Akarsuların hidroelektrik potansiyelinin ve yatak eğiminin yüksek olması',
      'Tektonik deprem kuşaklarının ve sıcak su kaynaklarının yaygın bulunması',
      'Ortalama yükseltisinin 1132 m ile Avrupa ortalamasından yüksek olması',
      'Zonguldak çevresinde I. Zamana ait taş kömürü yataklarının görülmesi',
    ],
    correctIndex: 3,
    examTip:
      'Zonguldak taş kömürü ve I. Zaman masifleri yaşlı arazilerdir; genç arazide linyit, bor, petrol, yüksek eğim ve aktif faylar görülür.',
    relatedTermId: 'geo_ys_02',
  },
  {
    id: 'geo_q_ys_02',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Batı Anadolu’da sert yer kabuğu tabakalarının yan basınçlarla kırılması sonucu yükselen horst kütleleri ile çöken graben ovaları oluşmuştur. Aşağıdaki eşleştirmelerden hangisi bu kırık dağ–ova sistemine örnektir?',
    choices: [
      'Kaçkar Dağları (Horst) – Çukurova (Graben)',
      'Bozdağlar (Horst) – Gediz ve Küçük Menderes Ovaları (Graben)',
      'Toros Dağları (Horst) – Çarşamba Ovası (Graben)',
      'Erciyes Dağı (Horst) – Muş Ovası (Graben)',
    ],
    correctIndex: 1,
    examTip:
      'Ege kırık dağları: Kaz, Madra, Yunt, Bozdağlar, Aydın, Menteşe; aralarındaki grabenler: Bakırçay, Gediz, Küçük Menderes, Büyük Menderes.',
    relatedTermId: 'geo_ys_04',
  },
  {
    id: 'geo_q_ys_03',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Aşağıdaki kayaçlardan hangisinin içerisinde eski dönemlere ait bitki veya hayvan fosillerine rastlanma olasılığı en yüksektir?',
    choices: ['Granit', 'Bazalt', 'Kalker (Kireç taşı)', 'Mermer'],
    correctIndex: 2,
    examTip:
      'Yalnızca tortul (sedimanter) kayaçlarda fosil korunur; granit ve bazalt magmatik, mermer ise başkalaşım kayacıdır.',
    relatedTermId: 'geo_ys_03',
  },
  {
    id: 'geo_q_ys_04',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Kalkerli arazilerde kimyasal çözünme sonucu oluşan karstik aşınım şekillerinin en küçüğünden en büyüğüne doğru sıralanışı hangisidir?',
    choices: [
      'Polye → Uvala → Dolin → Lapya',
      'Lapya → Dolin → Uvala → Polye',
      'Traverten → Sarkıt → Dikit → Obruk',
      'Dolin → Lapya → Obruk → Kırgıbayır',
    ],
    correctIndex: 1,
    examTip:
      'Lapya santimetrik oyuklardır; bunların birleşmesiyle Dolin, Uvala ve geniş karstik ova olan Polye (Elmalı, Kestel, Korkuteli) gelişir.',
    relatedTermId: 'geo_ys_07',
  },
  {
    id: 'geo_q_ys_05',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Kıyıya paralel uzanan dağ sıralarının dalga aşındırmasına uğradığı Karadeniz ve Akdeniz kıyılarında baskın olan kıyı tipi ile bir adanın kıyı oku ile karaya bağlanmasıyla oluşan şekil aşağıdakilerden hangisidir?',
    choices: [
      'Enine kıyı – Fiyort',
      'Boyuna kıyı – Tombolo (Kapıdağ / Sinop)',
      'Dalmaçya kıyı – Haliç',
      'Ria kıyı – Delta',
    ],
    correctIndex: 1,
    examTip:
      'Boyuna kıyı Karadeniz ve Akdeniz’de görülür; birikme sonucu adanın yarımadaya bağlanmasına Tombolo (Kapıdağ Yarımadası, Sinop) denir.',
    relatedTermId: 'geo_ys_09',
  },
  {
    id: 'geo_ys_06',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Türkiye’nin büyük akarsuları ile döküldükleri yer veya oluşturdukları delta eşleştirmelerinden hangisi yanlıştır?',
    choices: [
      'Kızılırmak – Bafra Deltası (Karadeniz)',
      'Yeşilırmak – Çarşamba Deltası (Karadeniz)',
      'Seyhan ve Ceyhan – Çukurova (Akdeniz)',
      'Fırat ve Dicle – Silifke Deltası (Akdeniz)',
    ],
    correctIndex: 3,
    examTip:
      'Silifke Deltası’nı Göksu Nehri oluşturur; Fırat ve Dicle birleşerek Şattülarab adıyla Basra Körfezi’ne dökülür.',
    relatedTermId: 'geo_ys_12',
  },
  {
    id: 'geo_ys_07',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Oluşum kökeni bakımından hem tektonik çöküntü hem de Nemrut Volkanı’nın çıkardığı lavların vadi önünü kapatmasıyla oluşmuş karma yapılı gölümüz hangisidir?',
    choices: ['Tuz Gölü', 'Van Gölü', 'Tortum Gölü', 'Sapanca Gölü'],
    correctIndex: 1,
    examTip:
      'Van Gölü tektonik + volkanik set (karma) gölüdür ve dışa akışı olmayan sodalı bir kapalı havzadır.',
    relatedTermId: 'geo_ys_13',
  },
  {
    id: 'geo_ys_08',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Erzurum–Kars platosunda sert karasal iklimin yaz yağışlarıyla gelişen gür çayırların altında oluşan, koyu renkli ve humus bakımından zengin en verimli zonal toprak tipi hangisidir?',
    choices: ['Terra Rossa', 'Podzol', 'Çernezyom', 'Halomorfik'],
    correctIndex: 2,
    examTip:
      'Kara toprak olarak bilinen Çernezyom çayır altı toprağıdır; Erzurum–Kars’ta yazlar kısa ve serin olduğu için tarımdan çok mera hayvancılığında yararlanılır.',
    relatedTermId: 'geo_ys_14',
  },

  // =========================================================================
  // 4. NUFUS_EKONOMI (8)
  // =========================================================================
  {
    id: 'geo_q_ne_01',
    category: 'NUFUS_EKONOMI',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Tabanı son yıllarda hızla daralmış, orta ve yaşlı yaş grupları ise belirginleşmeye başlamış bir nüfus piramidine sahip ülke için aşağıdaki yorumlardan hangisi yapılabilir?',
    choices: [
      'Doğum ve bebek ölüm oranları çok hızlı şekilde artmaktadır.',
      'Doğurganlık hızı düşmüş ve ülke gelişmiş ülke yapısına doğru evrilmektedir.',
      'Ortalama yaşam süresi kısalmış ve yaşlı nüfus oranı azalmıştır.',
      'Ekonomisinde birincil faaliyetlerin payı %70’in üzerindedir.',
    ],
    correctIndex: 1,
    examTip:
      'Tabanın daralması doğum oranındaki düşüşü, tepenin genişlemesi ise ortalama ömrün uzadığını gösterir (ör. Türkiye’nin güncel geçişi).',
    relatedTermId: 'geo_ne_02',
  },
  {
    id: 'geo_q_ne_02',
    category: 'NUFUS_EKONOMI',
    examLevel: 'TYT_AYT',
    isHighYield: true,
    stem: 'Türkiye’de Cumhuriyet’in ilk yıllarından günümüze nüfus politikaları dikkate alındığında, 1965–2005 yılları arasındaki dönemin temel yaklaşımı aşağıdakilerden hangisiydi?',
    choices: [
      'Aşırı düşük doğurganlığı artırmak için çok çocukluluğu teşvik etmek',
      'Nüfus artış hızını kalkınma hızıyla uyumlu hâle getirmek için azaltıcı aile planlaması uygulamak',
      'Ülke nüfusunun kırdan kente göçünü tamamen yasaklamak',
      'Yalnızca yurt dışından işçi göçü kabul etmek',
    ],
    correctIndex: 1,
    examTip:
      '1923–1965 artırıcı, 1965–2005 azaltıcı/kontrol edici, 2005 sonrası ise tekrar doğurganlığı ve niteliği artırıcı politikalar uygulanmıştır.',
    relatedTermId: 'geo_ne_03',
  },
  {
    id: 'geo_q_ne_03',
    category: 'NUFUS_EKONOMI',
    examLevel: 'TYT_AYT',
    isHighYield: true,
    stem: 'Engebeli topoğrafyaya, su kaynaklarının bolluğuna ve tarım arazilerinin parçalı yapısına sahip olan Doğu Karadeniz’de baskın kırsal yerleşme dokusu aşağıdakilerden hangisidir?',
    choices: [
      'Toplu yerleşme',
      'Dağınık yerleşme',
      'Çizgisel vaha yerleşmesi',
      'Dairesel step yerleşmesi',
    ],
    correctIndex: 1,
    examTip:
      'Su kaynaklarının kıt, yer şekillerinin düz olduğu İç ve Güneydoğu Anadolu’da toplu yerleşme; engebeli ve yağışlı Doğu Karadeniz’de dağınık yerleşme görülür.',
    relatedTermId: 'geo_ne_04',
  },
  {
    id: 'geo_q_ne_04',
    category: 'NUFUS_EKONOMI',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Üst düzey şirket yöneticilerinin (CEO), büyük holdinglerin strateji karar organlarının ve kamu üst düzey politika yapıcılarının yer aldığı ekonomik faaliyet basamağı hangisidir?',
    choices: [
      'İkincil ekonomik faaliyet',
      'Üçüncül ekonomik faaliyet',
      'Dördüncül ekonomik faaliyet',
      'Beşincil ekonomik faaliyet',
    ],
    correctIndex: 3,
    examTip:
      'Dördüncül Ar-Ge/bilişim/veri işleme iken, beşincil faaliyet en üst düzey karar alma ve yönetim süreçlerini kapsar.',
    relatedTermId: 'geo_ne_07',
  },
  {
    id: 'geo_q_ne_05',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Güneydoğu Anadolu Projesi (GAP) kapsamında sulama imkânlarının genişlemesiyle birlikte Türkiye’de pamuk üretiminde açık ara birinci sıraya yükselen ilimiz hangisidir?',
    choices: ['Adana', 'Aydın', 'Şanlıurfa', 'Hatay'],
    correctIndex: 2,
    examTip:
      'Sulama öncesinde Çukurova ve Ege öndeyken, GAP baraj ve sulama kanalları sayesinde Şanlıurfa Türkiye pamuk üretiminin yaklaşık yarısını tek başına karşılar hâle gelmiştir.',
    relatedTermId: 'geo_ne_08',
  },
  {
    id: 'geo_q_ne_06',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Türkiye’nin dünya rezervlerinin yaklaşık %73’üne sahip olduğu ve Eskişehir (Kırka), Kütahya (Emet), Balıkesir (Bigadiç) ile Bursa’da çıkarılan stratejik madeni hangisidir?',
    choices: ['Bor mineralleri', 'Boksit', 'Fosfat', 'Taş kömürü'],
    correctIndex: 0,
    examTip:
      'Türkiye dünya bor rezervlerinde 1. sıradadır; krom (Elazığ–Muğla) ve mermer ihracatında da üst sıralarda yer alır.',
    relatedTermId: 'geo_ne_10',
  },
  {
    id: 'geo_q_ne_07',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'İzmit (İpraş), İzmir (Aliağa) ve Mersin petrol rafinerilerinin kuruluş yerinin seçiminde belirleyici olan ortak coğrafi faktör aşağıdakilerden hangisidir?',
    choices: [
      'Çıkarılan ham petrol yataklarının hemen yanında bulunmaları',
      'Deniz ulaşımı, liman imkânı ve geniş pazarlara yakınlık',
      'Taş kömürü ve linyit enerji kaynaklarına yakınlık',
      'İklim koşullarının yaz kuraklığına dayanması',
    ],
    correctIndex: 1,
    examTip:
      'Batman rafinerisi ham maddeye yakınlık nedeniyle kurulurken; İzmit, Aliağa ve Kırıkkale ulaşım (liman/boru hattı) ve pazar etmeniyle kurulmuştur.',
    relatedTermId: 'geo_ne_12',
  },
  {
    id: 'geo_q_ne_08',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Konya Kapalı Havzası’nda tarımsal sulama suyu açığını azaltmak, yer altı suyu çekimine bağlı obruk oluşumunu yavaşlatmak amacıyla Göksu Nehri sularının Mavi Tünel ile aktarıldığı proje hangisidir?',
    choices: ['GAP', 'DOKAP', 'KOP (Konya Ovası Projesi)', 'ZBK'],
    correctIndex: 2,
    examTip:
      'KOP Konya, Karaman, Aksaray, Niğde, Nevşehir, Kırşehir, Yozgat ve Kırıkkale illerini kapsar; DOKAP ise Yeşil Yol ve çay-fındık verimliliğine odaklanır.',
    relatedTermId: 'geo_ne_14',
  },

  // =========================================================================
  // 5. ULUSLARARASI_AFET (8)
  // =========================================================================
  {
    id: 'geo_q_ua_01',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'TYT_AYT',
    isHighYield: true,
    stem: 'İngiltere’nin Southampton Limanı’ndan kalkan bir yük gemisinin en kısa deniz yolunu kullanarak Hindistan’ın Mumbai Limanı’na ulaşması için sırasıyla hangi boğaz ve kanallardan geçmesi gerekir?',
    choices: [
      'Panama Kanalı → Macellan Boğazı → Malakka Boğazı',
      'Cebelitarık Boğazı → Süveyş Kanalı → Babülmendep Boğazı',
      'Kiel Kanalı → İstanbul Boğazı → Hürmüz Boğazı',
      'Bering Boğazı → Cebelitarık Boğazı → Hürmüz Boğazı',
    ],
    correctIndex: 1,
    examTip:
      'Avrupa–Hint Okyanusu en kısa rotası Atlas → Cebelitarık → Akdeniz → Süveyş Kanalı → Kızıldeniz → Babülmendep → Hint Okyanusu şeklindedir.',
    relatedTermId: 'geo_ua_02',
  },
  {
    id: 'geo_q_ua_02',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'TYT_AYT',
    isHighYield: true,
    stem: 'Dünya petrol ticaretinin çok önemli bir bölümünün Basra Körfezi’nden Umman Denizi’ne çıkışında kullanılan stratejik boğaz aşağıdakilerden hangisidir?',
    choices: [
      'Malakka Boğazı',
      'Dover Boğazı',
      'Hürmüz Boğazı',
      'Bering Boğazı',
    ],
    correctIndex: 2,
    examTip:
      'Hürmüz Boğazı İran ile Umman arasında yer alır ve Basra Körfezi ülkelerinin petrol ihracat kapısıdır.',
    relatedTermId: 'geo_ua_02',
  },
  {
    id: 'geo_q_ua_03',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Amerika kıtasındaki ilk uygarlıklardan biri olan İnka Medeniyeti’nin Mısır veya Mezopotamya’dan farklı olarak deniz seviyesindeki vadiler yerine 3000–4000 m yüksekteki And Dağları’nda kurulmasının temel nedeni nedir?',
    choices: [
      'Ekvator’a yakın alçak ovalarda aşırı sıcak ve nemli iklim koşullarının bulunması',
      'Okyanus kıyılarına ulaşım yollarının hiç olmaması',
      'Yalnızca buzullarla beslenen göllere ihtiyaç duymaları',
      'Yüksek dağların tamamında demir madeni çıkarılması',
    ],
    correctIndex: 0,
    examTip:
      'Tropikal kuşakta yüksek dağlar daha serin ve yaşanabilir iklim koşulları sunduğu için İnka uygarlığı And Dağları’nda (Machu Picchu) gelişmiştir.',
    relatedTermId: 'geo_ua_04',
  },
  {
    id: 'geo_q_ua_04',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Türkiye’nin öncülüğünde 1992 ve 1997 yıllarında İstanbul merkezli olarak kurulan iki uluslararası bölgesel/ekonomik örgüt çifti aşağıdakilerden hangisidir?',
    choices: [
      'BM ve NATO',
      'KEİ (Karadeniz Ekonomik İşbirliği) ve D-8 (Gelişen Sekiz Ülke)',
      'OPEC ve NAFTA',
      'OECD ve Avrupa Birliği',
    ],
    correctIndex: 1,
    examTip:
      'KEİ (1992) ve D-8 (1997) Türkiye’nin kurucu liderlik üstlendiği, sekretaryası İstanbul’da bulunan örgütlerdir.',
    relatedTermId: 'geo_ua_07',
  },
  {
    id: 'geo_q_ua_05',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Azerbaycan’daki Şah Deniz doğal gaz sahasından çıkarılan gazı Gürcistan ve Türkiye üzerinden Avrupa’ya ulaştıran enerji nakil projesi hangisidir?',
    choices: [
      'Kerkük–Yumurtalık Boru Hattı',
      'TANAP (Trans Anadolu Doğal Gaz Boru Hattı)',
      'Mavi Akım',
      'Bakü–Tiflis–Ceyhan Ham Petrol Hattı',
    ],
    correctIndex: 1,
    examTip:
      'BTC ham petrol, TANAP ise doğal gaz hattıdır; Mavi Akım ve TürkAkım Karadeniz altından Rusya gazını taşır.',
    relatedTermId: 'geo_ua_08',
  },
  {
    id: 'geo_q_ua_06',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'TYT_AYT',
    isHighYield: true,
    stem: 'Karadeniz Bölgesi’nin doğusunda eğimli, killi tabakalardan oluşan yamaçlarda kar erimeleri ve aşırı yağışa bağlı olarak görülen kütle hareketi (heyelan) riskini azaltmada en etkisiz veya tek başına yetersiz kalan yöntem hangisidir?',
    choices: [
      'Yamaçtaki fazla yer altı ve yüzey sularının drenaj kanallarıyla uzaklaştırılması',
      'Yamaç eteklerine istinat duvarları yapılması',
      'Yamaç eğiminin teraslama ve desteklerle azaltılması',
      'Killi kayma düzlemi üzerine yalnızca ağaç dikilmesi',
    ],
    correctIndex: 3,
    examTip:
      'Ağaçlandırma yüzeysel toprak taşınması olan erozyonu önler; ancak derin kayma düzlemli heyelanı tek başına durduramaz (hatta kökler ağırlığı artırabilir).',
    relatedTermId: 'geo_ua_11',
  },
  {
    id: 'geo_q_ua_07',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Stratosferdeki ozon tabakasını incelten kloroflorokarbon (CFC) gazlarının üretim ve tüketimini küresel düzeyde sınırlandırarak başarıya ulaşan uluslararası çevre antlaşması hangisidir?',
    choices: [
      'Ramsar Sözleşmesi (1971)',
      'Montreal Protokolü (1987)',
      'Kyoto Protokolü (1997)',
      'Paris İklim Anlaşması (2015)',
    ],
    correctIndex: 1,
    examTip:
      'Montreal (1987) ozon/CFC, Ramsar (1971) sulak alanlar, CITES (1973) yaban hayatı ticareti, Kyoto ve Paris ise sera gazı/küresel ısınma içindir.',
    relatedTermId: 'geo_ua_12',
  },
  {
    id: 'geo_q_ua_08',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Türkiye’den UNESCO Dünya Mirası Listesi’ne hem doğal hem de kültürel özellikleri nedeniyle "karma miras" statüsünde kabul edilen iki alan çifti hangisidir?',
    choices: [
      'Göreme Millî Parkı (Kapadokya) ve Hierapolis–Pamukkale',
      'Troya Antik Kenti ve Efes',
      'Göbeklitepe ve Nemrut Dağı',
      'Divriği Ulu Camii ve Safranbolu',
    ],
    correctIndex: 0,
    examTip:
      'Göreme–Kapadokya (peribacaları + kaya kiliseler) ve Hierapolis–Pamukkale (travertenler + antik kent) Türkiye’nin iki karma UNESCO mirasıdır.',
    relatedTermId: 'geo_ua_16',
  },
];
