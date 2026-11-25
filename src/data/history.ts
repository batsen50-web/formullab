import type {HistoryCategoryId, HistoryExamLevel, HistoryTerm} from '../types/history';

export const HISTORY_CATEGORY_LABELS: Record<HistoryCategoryId, string> = {
  ILK_ORTA_TURK: 'İlk Çağ & İlk Türkler',
  TURK_ISLAM_SELCUKLU: 'Türk-İslam & Selçuklu',
  OSMANLI_KLASIK: 'Osmanlı Klasik Dönem',
  OSMANLI_DEGISIM_SON: 'Osmanlı Değişim & XX. yy',
  INKILAP_CAGDAS: 'Millî Mücadele & Çağdaş',
};

export const HISTORY_EXAM_LEVEL_LABELS: Record<HistoryExamLevel, string> = {
  TYT: 'TYT',
  AYT: 'AYT',
  TYT_AYT: 'TYT · AYT',
};

export const HISTORY_TERMS: HistoryTerm[] = [
  // =========================================================================
  // 1. TARİH BİLİMİ, İLK ÇAĞ & İLK TÜRKLER (15 KAVRAM)
  // =========================================================================
  {
    id: 'hist_yardimci_bilimler',
    term: 'Tarihe Yardımcı Bilimler',
    shortCode: 'Tarih Yöntemi',
    eraOrDate: 'TYT · AYT Tarih Bilimi',
    category: 'ILK_ORTA_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kronoloji zamanı, Paleografya eski yazıları, Epigrafi kitabeleri, Nümismatik paraları, Heraldik armaları, Diplomatik ferman ve antlaşmaları inceler.',
    examTip:
      'Yazı öncesi (Tarih Öncesi) dönemlerin aydınlatılmasında yazılı kaynak olmadığından Arkeoloji ve Antropoloji temel rol oynar.',
    isHighYield: true,
  },
  {
    id: 'hist_takvimler',
    term: 'Türklerin Kullandığı Takvimler',
    shortCode: '5 Takvim',
    eraOrDate: 'İslamiyet Öncesi → Cumhuriyet',
    category: 'ILK_ORTA_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      '12 Hayvanlı (Güneş), Hicri (Ay yılı · tek ay takvimi), Celâli (Büyük Selçuklu · Güneş), Rûmî (Osmanlı mali · Güneş), Miladi (1 Ocak 1926).',
    examTip:
      'Hicri takvim Ay yılı esaslı olduğu için Güneş yılı esaslı diğer dört takvimden yıl başına yaklaşık 11 gün kısadır.',
    isHighYield: true,
  },
  {
    id: 'hist_tarih_oncesi',
    term: 'Tarih Öncesi Çağlar & Anadolu Yerleşimleri',
    shortCode: 'Göbeklitepe',
    eraOrDate: 'Paleolitik – Kalkolitik',
    category: 'ILK_ORTA_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Göbeklitepe (Şanlıurfa · en eski tapınak merkezi), Çayönü (Diyarbakır · ilk köy/üretim), Çatalhöyük (Konya · ilk şehir yerleşimi).',
    examTip:
      'Göbeklitepe Neolitik döneme geçişte tarımdan önce inanç merkezlerinin kurulduğunu kanıtlayarak tarih bilgisini değiştirmiştir.',
    isHighYield: true,
  },
  {
    id: 'hist_sumer_babil',
    term: 'Sümerler ve Babiller',
    shortCode: 'Çivi Yazısı',
    eraOrDate: 'Mezopotamya Uygarlığı',
    category: 'ILK_ORTA_TURK',
    examLevel: 'AYT',
    mechanism:
      'Sümerler zigguratlar etrafında çivi yazısını, Urgakina Yasalarını ve Ay yılı takvimini buldu; Babiller ise Hammurabi ile kısasa kısas yasalar koydu.',
    examTip:
      'Sümer şehir devletlerine "Site", rahip-krallarına "Patesi/Ensi" denir; Gılgamış Destanı ilk yazılı destan örneğidir.',
    isHighYield: true,
  },
  {
    id: 'hist_hititler',
    term: 'Hititler (Pankuş & Anal)',
    shortCode: 'Kadeş MÖ 1280',
    eraOrDate: 'Anadolu İlk Çağ',
    category: 'ILK_ORTA_TURK',
    examLevel: 'AYT',
    mechanism:
      'Başkenti Hattuşaş olan Hititlerde Pankuş Meclisi kralı denetlerdi; Tavananna adlı kraliçe ve tanrıya hesap veren Anal yıllıkları vardır.',
    examTip:
      'Mısır ile imzalanan Kadeş Antlaşması (MÖ 1280) tarihte bilinen ilk yazılı barış antlaşmasıdır.',
    isHighYield: true,
  },
  {
    id: 'hist_frig_lidya_urartu',
    term: 'Frigler, Lidyalılar ve Urartular',
    shortCode: 'Paranın İcadı',
    eraOrDate: 'Anadolu Uygarlıkları',
    category: 'ILK_ORTA_TURK',
    examLevel: 'AYT',
    mechanism:
      'Frigler tarımı koruyan sert yasalar ve tapates halıları, Lidyalılar sikke (para) ve Kral Yolu, Urartular Tuşpa merkezli su kanalları ve kale mimarisi kurdu.',
    examTip:
      'Lidyalıların parayı icat etmesiyle takas ekonomisi sona ermiş, ücretli askerlik ise devletin kısa ömürlü olmasında etkili olmuştur.',
    isHighYield: true,
  },
  {
    id: 'hist_iyon_yunan',
    term: 'İyonya, Yunan Polisleri & Hellenizm',
    shortCode: 'Polis & Bilim',
    eraOrDate: 'Ege & Doğu Akdeniz',
    category: 'ILK_ORTA_TURK',
    examLevel: 'AYT',
    mechanism:
      'İyon şehir devletlerinde özgür düşünce (Thales, Pisagor, Herodot) gelişti; Atina’da Solon–Klistenes demokrasisi ve Büyük İskender ile Hellenizm doğdu.',
    examTip:
      'Doğu ile Batı kültürlerinin kaynaşmasıyla ortaya çıkan sentez uygarlığa Hellenizm adı verilir.',
    isHighYield: false,
  },
  {
    id: 'hist_misir_fenike',
    term: 'Mısır, Fenike ve İbraniler',
    shortCode: 'Hiyeroglif',
    eraOrDate: 'Doğu Akdeniz & Afrika',
    category: 'ILK_ORTA_TURK',
    examLevel: 'AYT',
    mechanism:
      'Mısır Nil çevresinde nom şehirleriyle gelişip hiyeroglif ve mumyacılıkta ilerledi; Fenike ilk alfabeyi oluşturdu; İbraniler ilk tek tanrılı dine inandı.',
    examTip:
      'Mısır coğrafi olarak çöl ve denizlerle çevrili olduğundan uzun süre istilalardan korunup özgün bir uygarlık geliştirmiştir.',
    isHighYield: false,
  },
  {
    id: 'hist_asya_hun',
    term: 'Asya Hun Devleti & Mete Han',
    shortCode: 'Onlu Sistem',
    eraOrDate: 'MÖ 220 – MS 216',
    category: 'ILK_ORTA_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Tarihte bilinen ilk teşkilatlı Türk devleti (Teoman). Mete Han Türk boylarını ilk kez tek bayrak altında topladı ve Onlu Ordu Sistemini kurdu.',
    examTip:
      'Mete Han’ın Çin’i vergiye bağlayıp yerleşim içine girmemesi, Türklerin kalabalık Çin nüfusu içinde asimile olmasını önleme politikasıdır.',
    isHighYield: true,
  },
  {
    id: 'hist_kokturkler',
    term: 'I. ve II. Kök Türk Devleti',
    shortCode: 'Orhun Abideleri',
    eraOrDate: '552 – 744',
    category: 'ILK_ORTA_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Bumin Kağan "Türk" adını devlet adı yaptı; II. Kök Türk (Kutluk) döneminde Bilge Kağan, Kültigin ve Tonyukuk adına Orhun Yazıtları dikildi.',
    examTip:
      'Orhun Abideleri Türk adının geçtiği ilk Türkçe yazılı belgeler olup sosyal devlet anlayışı ve siyasetname özelliği taşır.',
    isHighYield: true,
  },
  {
    id: 'hist_uygurlar',
    term: 'Uygur Devleti & Yerleşik Hayat',
    shortCode: 'Yerleşik Türk',
    eraOrDate: '744 – 840',
    category: 'ILK_ORTA_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Bögü Kağan döneminde Maniheizm’i kabul eden Uygurlar tarıma, mimariye (balık/şehir), matbaaya (hareketli harf) ve minyatür-fresko sanatına geçti.',
    examTip:
      'Maniheizm’in et yemeyi ve savaşmayı yasaklaması Uygurlarda savaşçılık özelliğinin zayıflamasına, kültür-sanatın yükselmesine yol açtı.',
    isHighYield: true,
  },
  {
    id: 'hist_kavimler_avrupa_hun',
    term: 'Kavimler Göçü ve Avrupa Hunları',
    shortCode: '375 Göçü',
    eraOrDate: '375 – 469',
    category: 'ILK_ORTA_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      '375’te Balamir önderliğindeki Hun hareketi Roma’yı ikiye böldü ve Orta Çağ başladı; Avrupa Hunları Attila döneminde Margus ve Anatolius antlaşmalarını yaptı.',
    examTip:
      'Kavimler Göçü sonucunda Avrupa’da feodalite (derebeylik) güçlenmiş, bugünkü Avrupa milletlerinin temeli atılmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_diger_turk_boylari',
    term: 'Hazarlar, Karluklar, Avarlar & Türgişler',
    shortCode: 'Türk Boyları',
    eraOrDate: '6 – 11. Yüzyıl',
    category: 'ILK_ORTA_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hazarlar Museviliği seçip "Hazar Barış Çağı"nı kurdu; Karluklar İslamiyet’i seçen ilk Türk boyu oldu; Avarlar İstanbul’u kuşattı; Türgişler kendi adına para bastırdı.',
    examTip:
      '751 Talas Savaşı’nda Karlukların Abbasileri desteklemesi Türk–İslam tarihinin başlangıcı kabul edilir.',
    isHighYield: true,
  },
  {
    id: 'hist_kut_kurultay_tore',
    term: 'Kut, İkili Teşkilat, Kurultay & Töre',
    shortCode: 'Devlet Geleneği',
    eraOrDate: 'İlk Türk Devlet Yönetimi',
    category: 'ILK_ORTA_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kut yönetme yetkisinin Tanrı tarafından hanedana verilmesidir (taht kavgalarına yol açar); doğu-batı ikili teşkilat, Kurultay (Toy) danışma meclisi, Töre ise yazılı olmayan hukuktur.',
    examTip:
      'Kurultayda son sözün kağana ait olması danışma meclisi olduğunu, törenin kağanı da bağlaması ise hukuk devleti anlayışını gösterir.',
    isHighYield: true,
  },
  {
    id: 'hist_ilk_turk_kultur',
    term: 'İlk Türk Ekonomisi ve Kültürü',
    shortCode: 'Kurgan & Balbal',
    eraOrDate: 'Bozkır Kültürü',
    category: 'ILK_ORTA_TURK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Yarı göçebe hayvancılık nedeniyle taşınabilir eşya ve "hayvan üslubu" gelişti; Kurgan (oda mezar), Balbal (mezar taşı) ve Yuğ (cenaze töreni) ahiret inancını kanıtlar.',
    examTip:
      'Kurganlarda günlük eşya ve atla gömülme geleneği, İlk Türklerde ölümden sonraki yaşam (ahiret) inancının kesin kanıtıdır.',
    isHighYield: false,
  },

  // =========================================================================
  // 2. İSLAMİYET & TÜRK-İSLAM TARİHİ (15 KAVRAM)
  // =========================================================================
  {
    id: 'hist_dort_halife',
    term: 'Dört Halife Dönemi (Hulefa-yi Raşidin)',
    shortCode: '632 – 661',
    eraOrDate: 'İslam Tarihi',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'TYT_AYT',
    mechanism:
      'Halifeler seçimle belirlendi: Hz. Ebubekir Kur’an’ı kitaplaştırdı, Hz. Ömer divan-ikta-Hicri takvim kurdu, Hz. Osman Kur’an’ı çoğalttı, Hz. Ali iç karışıklıklarla mücadele etti.',
    examTip:
      'Dört Halife devrine seçim esası nedeniyle "Cumhuriyet Devri" de denir; Emevilerle birlikte saltanat başlamıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_emeviler_abbasiler',
    term: 'Emeviler (Mevali) ve Abbasiler (Beytülhikme)',
    shortCode: '661 – 1258',
    eraOrDate: 'İslam İmparatorlukları',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'TYT_AYT',
    mechanism:
      'Emeviler Arap milliyetçiliği (Mevali) izledi, Puvatya’da durduruldu; Abbasiler eşitlikçi ümmet politikası güttü, Türkler için Samarra şehirleri ve Avasım sınır kentleri kurdu.',
    examTip:
      'Abbasilerdeki Beytülhikme çeviri ve bilim merkezi sayesinde Antik Yunan eserleri Arapçaya kazandırılmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_misir_turk_devletleri',
    term: 'Mısır’da Kurulan Türk Devletleri',
    shortCode: 'TEMA',
    eraOrDate: '868 – 1517',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'AYT',
    mechanism:
      'Tolunoğulları (ilk Mısır Türk devleti), İhşîdîler (Akşitler · Hicaz’a hâkim ilk Türk devleti), Eyyubiler (Hıttin 1187 ile Kudüs’ü aldı), Memlûklular (Ayn Calut’ta Moğolları yendi).',
    examTip:
      'Memlûklularda veraset hanedana değil güçlü komutanın tahta çıkmasına dayanırdı; bu durum sık sık iktidar değişimine yol açmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_karahanlilar',
    term: 'Karahanlılar',
    shortCode: '840 – 1212',
    eraOrDate: 'Orta Asya Türk-İslam',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'TYT_AYT',
    mechanism:
      'Orta Asya’da kurulan ilk Müslüman Türk devleti (Satuk Buğra Han). Resmî dili Türkçe tuttu, ilk bimarhane, ilk kervansaray (ribat) ve ilk burslu medrese sistemini kurdu.',
    examTip:
      'Yöneticisi de halkı da Türk olduğu için Karahanlılar millî benliğini ve Türkçe resmî dil geleneğini korumuştur.',
    isHighYield: true,
  },
  {
    id: 'hist_gazneliler',
    term: 'Gazneliler ve Dandanakan Savaşı',
    shortCode: '963 – 1187',
    eraOrDate: 'Horasan & Hindistan',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'TYT_AYT',
    mechanism:
      'Gazneli Mahmut Abbasi halifesini Şii Büveyhîlere karşı koruyarak "Sultan" unvanını alan ilk Türk hükümdar oldu; Hindistan’a 17 sefer düzenleyip İslamiyet’i yaydı.',
    examTip:
      '1040 Dandanakan Savaşı ile Gazneliler yıkılış sürecine girerken Büyük Selçuklu Devleti resmen kuruldu.',
    isHighYield: true,
  },
  {
    id: 'hist_buyuk_selcuklu',
    term: 'Büyük Selçuklu (Pasinler & Malazgirt)',
    shortCode: '1040 – 1157',
    eraOrDate: 'Tuğrul Bey → Sencer',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'TYT_AYT',
    mechanism:
      '1048 Pasinler (Bizans ile ilk savaş), 1055 Bağdat Seferi (Tuğrul Bey "Doğu ve Batı’nın Sultanı"), 1071 Malazgirt Zaferi (Sultan Alparslan · Anadolu’nun kapıları açıldı).',
    examTip:
      'Malazgirt sonrası Alparslan’ın "Fethedilen toprak fethedenin malıdır" emri Anadolu’da I. Dönem Beyliklerin kurulmasını hızlandırdı.',
    isHighYield: true,
  },
  {
    id: 'hist_ilk_beylikler',
    term: 'I. Dönem Anadolu Beylikleri',
    shortCode: 'DSMAÇ',
    eraOrDate: '1071 – 1202',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'TYT_AYT',
    mechanism:
      'Danişmentliler (Anadolu’nun ilk medresesi Yağıbasan), Saltuklular (Erzurum · ilk beylik), Mengücekliler (Divriği Ulu Camii), Artuklular (Malabadi Köprüsü & El-Cezerî), Çaka Beyliği (ilk Türk denizcisi).',
    examTip:
      '1081 Çaka Beyliği’nin kuruluşu günümüzde Türk Deniz Kuvvetlerinin kuruluş yıl dönümü olarak kabul edilir.',
    isHighYield: true,
  },
  {
    id: 'hist_turkiye_selcuklu',
    term: 'Türkiye Selçuklu (Miryokefalon & Kösedağ)',
    shortCode: '1077 – 1308',
    eraOrDate: 'İznik → Konya',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'TYT_AYT',
    mechanism:
      '1176 Miryokefalon Savaşı ile Anadolu kesin Türk yurdu oldu; I. Alaeddin Keykubat dönemi en parlak devirdir; 1243 Kösedağ Savaşı ile Moğol (İlhanlı) egemenliğine girildi.',
    examTip:
      'Kösedağ yenilgisi sonrası Anadolu’da merkezî otorite çökmüş ve II. Dönem Anadolu Beylikleri (Osmanoğulları dâhil) kurulmuştur.',
    isHighYield: true,
  },
  {
    id: 'hist_hacli_seferleri',
    term: 'Haçlı Seferleri ve Sonuçları',
    shortCode: '1096 – 1270',
    eraOrDate: 'Orta Çağ Doğu–Batı',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'TYT_AYT',
    mechanism:
      'Türkiye Selçuklu başkenti İznik’ten Konya’ya taşındı; Avrupa, İslam dünyasından kâğıt, matbaa, pusula ve barut gibi teknik buluşları öğrenerek Coğrafi Keşifler ve Rönesans’a zemin hazırladı.',
    examTip:
      'Haçlı Seferleri sonucunda kilisenin otoritesi ve feodalite zayıflamış, Akdeniz ticareti canlanmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_turk_islam_teskilat',
    term: 'Türk-İslam Devlet Teşkilatı & İkta',
    shortCode: 'Divan & İkta',
    eraOrDate: 'Selçuklu Kurumları',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'TYT_AYT',
    mechanism:
      'Divân-ı Saltanat yüksek yönetim organıydı; Melik (şehzade) + Atabey (hoca) sistemi vardı; İkta ile toprak geliri karşılığında maaş ödenip cebelü/sipahi ordusu yetiştirildi.',
    examTip:
      'Atabeylerin melikleri kışkırtarak bağımsızlık ilan etmeleri Büyük Selçuklu’nun parçalanma nedenlerinden biridir.',
    isHighYield: true,
  },
  {
    id: 'hist_gulaman_hassa',
    term: 'Türk-İslam Ordusu (Gulamân & Hassa)',
    shortCode: 'Ordu Yapısı',
    eraOrDate: 'Karahanlı – Selçuklu',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'AYT',
    mechanism:
      'Gulamân-ı Saray devşirme/köle kökenli olup "Bistegani" adlı üç aylık maaş alırdı; İkta askerleri ise hazineden para çıkmadan beslenen asıl süvari gücünü oluştururdu.',
    examTip:
      'Selçuklu ikta ordusu yapısı daha sonra Osmanlı Devleti’nde Tımar (Dirlik) Sistemi olarak devam ettirilmiştir.',
    isHighYield: false,
  },
  {
    id: 'hist_nizamiye_medreseleri',
    term: 'Nizamiye Medreseleri & Ahilik',
    shortCode: 'Bilim & Esnaf',
    eraOrDate: '11 – 13. Yüzyıl',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'TYT_AYT',
    mechanism:
      'Nizamülmülk’ün kurduğu Nizamiye Medreseleri Batıniliğe karşı Sünni düşünceyi savundu ve devlet memuru yetiştirdi; Ahilik (Ahi Evran) ise Anadolu’da esnaf ahlakı ve üretimi düzenledi.',
    examTip:
      'Ahilik teşkilatında gayrimüslimlere yer verilmezken Osmanlı’da ilerleyen dönemde gayrimüslimleri de kapsayan Lonca sistemi gelişmiştir.',
    isHighYield: true,
  },
  {
    id: 'hist_gecis_eserleri',
    term: 'İlk Türk-İslam Yazılı Eserleri',
    shortCode: '4 Büyük Eser',
    eraOrDate: '11 – 12. Yüzyıl',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kutadgu Bilig (Yusuf Has Hacib · ilk siyasetname), Divânü Lûgati’t-Türk (Kaşgarlı Mahmut · ilk sözlük), Atabetü’l-Hakayık (Edip Ahmet), Divân-ı Hikmet (Hoca Ahmet Yesevi).',
    examTip:
      'Nizamülmülk’ün Farsça yazdığı "Siyasetname" de Büyük Selçuklu devlet yönetim anlayışını anlatan temel kaynaktır.',
    isHighYield: true,
  },
  {
    id: 'hist_turk_islam_alimleri',
    term: 'Türk-İslam Bilginleri (Farabi, İbn Sina, Biruni)',
    shortCode: 'Bilim Öncüleri',
    eraOrDate: '9 – 12. Yüzyıl',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'AYT',
    mechanism:
      'Farabi (Muallim-i Sânî · İhsau’l-Ulum), İbn Sina (El-Kanun fi’t-Tıb · Avicenna), Biruni (Dünyanın çapını ölçtü), Gazali (İhya), İbn Rüşd (Averroes), Harezmi (cebir ve sıfır).',
    examTip:
      'İbn Sina’nın El-Kanun fi’t-Tıb eseri yüzyıllarca Avrupa üniversitelerinde temel tıp ders kitabı olarak okutulmuştur.',
    isHighYield: true,
  },
  {
    id: 'hist_mogollar_harzemsah',
    term: 'Harzemşahlar & Yassıçemen Savaşı',
    shortCode: '1230 Yassıçemen',
    eraOrDate: '13. Yüzyıl Anadolu',
    category: 'TURK_ISLAM_SELCUKLU',
    examLevel: 'AYT',
    mechanism:
      '1230 Yassıçemen Savaşı’nda Türkiye Selçuklu’nun Harzemşahları yenmesiyle Selçuklular Moğollarla doğrudan komşu olmuş ve 1243 Kösedağ felaketine zemin hazırlanmıştır.',
    examTip:
      'Harzemşahlar Devleti’nin yıkılması Anadolu ile Moğol İstilası arasındaki tampon bölgenin ortadan kalkması demektir.',
    isHighYield: false,
  },

  // =========================================================================
  // 3. OSMANLI KURULUŞ, YÜKSELME & KLASİK DÜZEN (15 KAVRAM)
  // =========================================================================
  {
    id: 'hist_kurulus_savaslari',
    term: 'Osmanlı Kuruluş Dönemi & Bizans Savaşları',
    shortCode: '1302 – 1353',
    eraOrDate: 'Osman Bey – Orhan Bey',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      '1302 Koyunhisar (Bapheus · ilk Osmanlı-Bizans savaşı), 1326 Bursa fethi, 1329 Palekanon (Maltepe), 1353 Çimpe Kalesi ile Rumeli’ye ilk geçiş.',
    examTip:
      'Orhan Bey döneminde ilk kez düzenli ordu (Yaya ve Müsellem), ilk divan, ilk medrese (İznik) ve ilk gümüş para (akçe) oluşturuldu.',
    isHighYield: true,
  },
  {
    id: 'hist_iskan_istimalet',
    term: 'İskân ve İstimâlet Politikaları',
    shortCode: 'Rumeli Politikası',
    eraOrDate: '14 – 16. Yüzyıl',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      'İskân: Konar-göçer Türkmenlerin fethedilen Balkan topraklarına yerleştirilip bölgenin Türkleştirilmesi. İstimâlet: Balkan halkına hoşgörülü, koruyucu adalet yönetimi.',
    examTip:
      'İskân politikasıyla hem Rumeli’de kalıcılık sağlanmış hem de Anadolu’daki kavgalı aşiretler yatıştırılmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_balkan_hacli_savaslari',
    term: 'Sırpsındığı, I. Kosova, Niğbolu, Varna & II. Kosova',
    shortCode: 'Balkan Haçlıları',
    eraOrDate: '1364 – 1448',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      '1364 Sırpsındığı (ilk Osmanlı-Haçlı savaşı), 1389 I. Kosova (ilk top sesi · I. Murat şehit), 1396 Niğbolu (Yıldırım "Sultân-ı İklîm-i Rûm"), 1444 Varna, 1448 II. Kosova (Balkanlar kesin Türk yurdu).',
    examTip:
      'Miryokefalon (1176) Anadolu’yu kesin Türk yurdu yaparken, II. Kosova (1448) Balkanları kesin Türk yurdu hâline getirmiştir.',
    isHighYield: true,
  },
  {
    id: 'hist_ankara_fetret',
    term: '1402 Ankara Savaşı ve Fetret Devri',
    shortCode: '1402 – 1413',
    eraOrDate: 'Yıldırım Bayezid – Timur',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      '1402’de Timur’un Osmanlı’yı yenmesiyle 11 yıllık Fetret Devri başladı ve Anadolu Türk siyasi birliği bozuldu; I. Mehmet (Çelebi) birliği yeniden kurdu ("İkinci Kurucu").',
    examTip:
      'Fetret Devri’nde Anadolu’da karışıklık çıkmasına rağmen Balkanlarda ciddi toprak kaybı yaşanmaması İskân ve İstimâlet politikalarının başarısıdır.',
    isHighYield: true,
  },
  {
    id: 'hist_istanbul_fethi',
    term: 'İstanbul’un Fethi ve Sonuçları',
    shortCode: '29 Mayıs 1453',
    eraOrDate: 'Fatih Sultan Mehmet',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Rumeli Hisarı yaptırıldı, Şahi topları döküldü, donanma karadan Haliç’e indirildi. İpek Yolu Osmanlı denetimine geçti, Orta Çağ kapanıp Yeni Çağ başladı.',
    examTip:
      'Fatih’in Ortodoks Patrikhanesi’ni himaye altına alması Hristiyan dünyasındaki Katolik-Ortodoks birliğini engelleme siyasetidir.',
    isHighYield: true,
  },
  {
    id: 'hist_yavuz_seferleri',
    term: 'Çaldıran, Turnadağ, Mercidabık & Ridaniye',
    shortCode: '1514 – 1517',
    eraOrDate: 'Yavuz Sultan Selim',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      '1514 Çaldıran (Safevi tehlikesi önlendi), 1515 Turnadağ (Dulkadiroğulları alınarak Anadolu Türk birliği kesin sağlandı), 1516 Mercidabık & 1517 Ridaniye (Memlûk yıkıldı · Halifelik ve Baharat Yolu Osmanlı’ya geçti).',
    examTip:
      'Yavuz 8 yıllık kısa saltanatında Osmanlı hazinesini doldurmuş ve devleti doğu/İslam dünyasının tartışmasız lideri yapmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_kanuni_donemi',
    term: 'Mohaç, İstanbul Antlaşması & Preveze',
    shortCode: '1526 – 1538',
    eraOrDate: 'Kanuni Sultan Süleyman',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      '1526 Mohaç (2 saatte Macaristan fethi), 1533 İstanbul Antlaşması (Avusturya Arşidükü Osmanlı Sadrazamına denk sayıldı), 1538 Preveze Deniz Zaferi (Barbaros · Akdeniz Türk gölü).',
    examTip:
      '1533 İstanbul Antlaşması’ndaki protokol üstünlüğü 1606 Zitvatorok Antlaşması’na kadar sürmüştür.',
    isHighYield: true,
  },
  {
    id: 'hist_iran_antlasmalari',
    term: 'Amasya (1555) ve Ferhat Paşa (1590)',
    shortCode: 'Doğu Sınırı',
    eraOrDate: 'Osmanlı – İran',
    category: 'OSMANLI_KLASIK',
    examLevel: 'AYT',
    mechanism:
      '1555 Amasya Antlaşması İran (Safeviler) ile yapılan ilk resmî antlaşmadır; 1590 Ferhat Paşa Antlaşması ile ise Osmanlı Devleti doğuda en geniş sınırlarına ulaştı.',
    examTip:
      'Doğuda en geniş sınırlar Ferhat Paşa (1590), batıda en geniş sınırlar ise Bucaş (1672) Antlaşması ile elde edilmiştir.',
    isHighYield: true,
  },
  {
    id: 'hist_divan_i_humayun',
    term: 'Divân-ı Hümâyun ve Üyeleri',
    shortCode: 'Seyfiye-İlmiye-Kalemiye',
    eraOrDate: 'Osmanlı Merkez Yönetimi',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Seyfiye (yönetim/asker: Sadrazam, Vezirler, Kaptanıderya, Yeniçeri Ağası), İlmiye (din/eğitim/hukuk: Şeyhülislam, Kazasker, Kadı), Kalemiye (bürokrasi/maliye: Nişancı, Defterdar, Reisülküttab).',
    examTip:
      'Fatih’ten itibaren Divan başkanlığını Padişah yerine Sadrazam üstlenmiş, Divan karar organından danışma organına dönüşmüştür.',
    isHighYield: true,
  },
  {
    id: 'hist_millet_sistemi',
    term: 'Osmanlı Millet Sistemi',
    shortCode: 'Din Temelli Hukuk',
    eraOrDate: 'Klasik Toplum Düzeni',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Osmanlı’da toplum ırk veya dile göre değil din ve mezhep aidiyetine (Müslüman, Ortodoks, Ermeni, Musevi milletleri) göre örgütlenmiş ve yönetilmiştir.',
    examTip:
      'Millet sistemi iç işlerinde cemaatlere özerklik tanıyarak asimilasyon olmadan yüzyıllarca birlikte yaşamayı sağlamıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_toprak_sistemi',
    term: 'Osmanlı Toprak Sistemi (Dirlik / Tımar)',
    shortCode: 'Has-Zeamet-Tımar',
    eraOrDate: 'Mirî Arazi',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Devlet arazisi (Mirî) içinde Dirlik toprakları gelire göre Has (>100 bin akçe), Zeamet (20–100 bin) ve Tımar (3–20 bin) diye ayrılır; Tımar sahibi "Cebelü" asker beslerdi.',
    examTip:
      'Toprağı mazeretsiz 3 yıl üst üste ekmeyenden "Çiftbozan" vergisi alınıp toprağın geri alınması üretimin sürekliliğini amaçlar.',
    isHighYield: true,
  },
  {
    id: 'hist_mukataa_iltizam',
    term: 'Mukataa, İltizam ve Malikâne Sistemi',
    shortCode: 'Nakit Vergi',
    eraOrDate: '16 – 18. Yüzyıl Maliye',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Geliri doğrudan merkez hazineye ayrılan Mukataa topraklarının vergi toplama hakkı açık artırmayla Mültezimlere peşin satılırdı (İltizam); ömür boyu verilmesine Malikâne denirdi.',
    examTip:
      'İltizam sisteminin yaygınlaşması taşrada toprak ağalarının (Ayanların) güçlenmesine ve Tımar sisteminin bozulmasına yol açmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_ekber_ersed_kafes',
    term: 'Veraset Değişimleri (Ekber ve Erşed)',
    shortCode: 'I. Ahmet (1603)',
    eraOrDate: 'Veraset Sistemi',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      'I. Murat ("Devlet padişah ve oğullarınındır"), Fatih (Kardeş katli yasası), I. Ahmet ise taht kavgalarını önlemek için hanedanın en büyük ve akıllı üyesinin tahta çıkacağı Ekber ve Erşed’i getirdi.',
    examTip:
      'Sancak sisteminin kaldırılıp şehzadelerin Kafes Usulüyle sarayda yetişmesi devlet tecrübesi az padişahların çıkmasına yol açtı.',
    isHighYield: true,
  },
  {
    id: 'hist_devsirrme_yeniceri',
    term: 'Devşirme Sistemi ve Kapıkulu Ordusu',
    shortCode: 'Ulufe & Cülus',
    eraOrDate: 'Merkez Ordusu',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hristiyan ailelerin yetenekli çocukları alınıp Müslüman aile yanında eğitildikten sonra Acemi Ocağına, oradan Yeniçeri Ocağına veya Enderun’a alınırdı.',
    examTip:
      'Yeniçeriler üç ayda bir "Ulufe" maaşı ve her padişah değişikliğinde "Cülus Bahşişi" alırdı.',
    isHighYield: false,
  },
  {
    id: 'hist_lonca_narh_vakif',
    term: 'Lonca Teşkilatı, Narh & Vakıf Sistemi',
    shortCode: 'Ekonomik Düzen',
    eraOrDate: 'Osmanlı İktisadı',
    category: 'OSMANLI_KLASIK',
    examLevel: 'TYT_AYT',
    mechanism:
      'Loncalar "Gedik" adı verilen iş yeri açma ruhsatı verir, kaliteyi ve devletin belirlediği tavan fiyatı (Narh) denetlerdi; Vakıflar ise cami, imaret, darüşşifa ve medreseleri yaşatırdı.',
    examTip:
      'Osmanlı ekonomisinin üç temel ilkesi İaşecilik (bolluk), Gelenekçilik (denge) ve Fiskalizm (hazine gelirini koruma) olarak bilinir.',
    isHighYield: true,
  },

  // =========================================================================
  // 4. OSMANLI DEĞİŞİM, DİPLOMASİ & XX. YÜZYIL (15 KAVRAM)
  // =========================================================================
  {
    id: 'hist_zitvatorok_kasri_sirin',
    term: 'Zitvatorok (1606) ve Kasr-ı Şirin (1639)',
    shortCode: 'Denge Antlaşmaları',
    eraOrDate: '17. Yüzyıl Diplomasisi',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      '1606 Zitvatorok ile Avusturya arşidükü Osmanlı padişahına denk sayıldı; 1639 Kasr-ı Şirin (IV. Murat) ile bugünkü Türkiye–İran sınırı büyük ölçüde çizildi.',
    examTip:
      'Zitvatorok, Osmanlı’nın Avrupa’ya karşı 1533’te kazandığı siyasi/protokol üstünlüğünün sona ermesi bakımından dönüm noktasıdır.',
    isHighYield: true,
  },
  {
    id: 'hist_karlofca_1699',
    term: 'Karlofça (1699) ve İstanbul (1700)',
    shortCode: '1699 Karlofça',
    eraOrDate: 'Gerileme Başlangıcı',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      'II. Viyana Bozgunu sonrası Kutsal İttifak (Avusturya, Lehistan, Venedik, Rusya, Malta) ile imzalanan Karlofça, Osmanlı’nın batıda ilk kez büyük çapta toprak kaybettiği antlaşmadır.',
    examTip:
      '1700 İstanbul Antlaşması ile Azak Kalesi Rusya’ya verilmiş ve Rusya İstanbul’da daimî elçi bulundurma hakkı elde etmiştir.',
    isHighYield: true,
  },
  {
    id: 'hist_lale_devri_pasaroftca',
    term: 'Pasarofça (1718) ve Lâle Devri Islahatları',
    shortCode: '1718 – 1730',
    eraOrDate: 'III. Ahmet & Damat İbrahim',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      '1718 Pasarofça sonrası Batı’nın üstünlüğü kabul edildi; ilk Türk matbaası (İbrahim Müteferrika · Vankulu Lügatı), ilk çiçek aşısı, itfaiye (Tulumbacılar) ve çini/kumaş fabrikaları açıldı.',
    examTip:
      'Lâle Devri’nde askerî alanda ıslahat yapılmamış olup 1730 Patrona Halil İsyanı ile sona ermiştir.',
    isHighYield: true,
  },
  {
    id: 'hist_kucuk_kaynarca',
    term: '1774 Küçük Kaynarca Antlaşması',
    shortCode: '1774 Kaynarca',
    eraOrDate: 'Osmanlı – Rusya',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kırım bağımsız oldu (halifelik bağı sürdü), Osmanlı ilk kez savaş tazminatı ödedi, Rusya Karadeniz’de donanma ve Ortodoksları koruma hakkı elde etti.',
    examTip:
      'Rusya’nın Ortodoksları himaye maddesi, Osmanlı’nın iç işlerine müdahale etmesinin en önemli dayanağı hâline gelmiştir.',
    isHighYield: true,
  },
  {
    id: 'hist_nizam_i_cedid_sened',
    term: 'Nizâm-ı Cedîd & Sened-i İttifak (1808)',
    shortCode: '1789 – 1808',
    eraOrDate: 'III. Selim & II. Mahmut',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      'III. Selim ilk radikal ordu ve kalıcı elçilik (Londra · Yusuf Agâh) reformlarını yaptı (Nizâm-ı Cedîd); II. Mahmut 1808 Sened-i İttifak ile Ayanların varlığını tanıdı.',
    examTip:
      'Sened-i İttifak padişahın yetkilerinin ilk kez sınırlandırıldığı belge olup Türk tarihinde Magna Carta’ya benzetilir.',
    isHighYield: true,
  },
  {
    id: 'hist_ii_mahmut_yenilikleri',
    term: 'II. Mahmut Islahatları (Vaka-i Hayriye)',
    shortCode: '1826 Hayriye',
    eraOrDate: 'Merkeziyetçi Reformlar',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      '1826’da Yeniçeri Ocağı kaldırılıp Asâkir-i Mansûre-i Muhammediye kuruldu; Divan yerine Nazırlıklar, Takvim-i Vekayi (ilk resmî gazete), ilköğretim zorunluluğu ve müsaderenin kalkması gerçekleşti.',
    examTip:
      '1838 Balta Limanı Ticaret Antlaşması ile İngiltere’ye düşük gümrük ayrıcalığı tanınması Osmanlı lonca ve sanayisini çökertti.',
    isHighYield: true,
  },
  {
    id: 'hist_tanzimat_islahat',
    term: 'Tanzimat (1839) ve Islahat (1856) Fermanları',
    shortCode: '1839 & 1856',
    eraOrDate: 'Abdülmecit Dönemi',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      'Tanzimat (Gülhane Hatt-ı Hümâyunu) herkes için can/mal/namus güvencesi ve kanun üstünlüğü getirdi; 1856 Islahat Fermanı ise gayrimüslimlere memurluk, okul, banka ve bedelli askerlik hakları tanıdı.',
    examTip:
      'Tanzimat Fermanı ile padişah kendi isteğiyle kanun gücünü üstün sayarken Islahat Fermanı Paris Konferansı öncesi dış baskıyla ilan edilmiştir.',
    isHighYield: true,
  },
  {
    id: 'hist_mesrutiyetler',
    term: 'I. ve II. Meşrutiyet (Kanun-ı Esasî)',
    shortCode: '1876 & 1908',
    eraOrDate: 'II. Abdülhamit Dönemi',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      '1876’da ilk anayasa (Kanun-ı Esasî) ve Meclis-i Mebusan ile anayasal monarşiye geçildi; 1908 II. Meşrutiyet ve 1909 değişiklikleriyle padişahın meclisi feshetme ve sürgün yetkisi kısıtlandı.',
    examTip:
      '1909’daki 31 Mart Vakası rejim karşıtı ilk isyan olup Hareket Ordusu tarafından bastırılmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_duyun_i_umumiye',
    term: '1881 Muharrem Kararnamesi & Düyûn-ı Umûmiye',
    shortCode: 'Dış Borçlar',
    eraOrDate: 'Ekonomik Bağımlılık',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      '1854 Kırım Savaşı’nda alınan ilk dış borç sonrası Osmanlı 1881’de iflasını açıkladı; alacaklı devletler temel vergilere el koymak için Düyûn-ı Umûmiye İdaresi’ni kurdu.',
    examTip:
      'Düyûn-ı Umûmiye İdaresi Lozan Barış Antlaşması (1923) ile tamamen kaldırılmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_fikir_akimlari',
    term: 'Osmanlı’yı Kurtarma Fikir Akımları',
    shortCode: '4 Fikir Akımı',
    eraOrDate: '19 – 20. Yüzyıl',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      'Osmanlıcılık (Namık Kemal, Mithat Paşa), İslamcılık (II. Abdülhamit, Mehmet Akif), Türkçülük (Ziya Gökalp, Yusuf Akçura), Batıcılık (Abdullah Cevdet, Tevfik Fikret).',
    examTip:
      'Balkan Savaşları Osmanlıcılığı, I. Dünya Savaşı’ndaki Arap isyanları İslamcılığı bitirmiş; Millî Mücadele Türkçülük ve Batıcılık temeline oturmuştur.',
    isHighYield: true,
  },
  {
    id: 'hist_trablusgarp_balkan',
    term: 'Trablusgarp (1911) ve Balkan Savaşları (1912–13)',
    shortCode: '1911 – 1913',
    eraOrDate: 'Son Osmanlı Savaşları',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      'İtalya’nın Trablusgarp’a saldırmasıyla Mustafa Kemal (Derne/Tobruk) gönüllü savaştı; Uşi Antlaşması ile Kuzey Afrika’daki son toprak gitti. Balkan Savaşlarında Midye-Enez hattına çekilinip II. Balkan’da Edirne geri alındı.',
    examTip:
      'Balkan Savaşlarındaki yenilginin temel sebebi subaylar arasındaki particilik (siyaset–ordu karışması) ve ulaşım sorunlarıdır.',
    isHighYield: true,
  },
  {
    id: 'hist_i_dunya_cepheleri',
    term: 'I. Dünya Savaşı Cepheleri & Çanakkale',
    shortCode: '1914 – 1918',
    eraOrDate: 'İttifak – İtilaf',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      'Taarruz cepheleri: Kafkas (Sarıkamış) ve Kanal. Savunma: Çanakkale (tek zafer), Irak (Kut’ül Amare), Hicaz-Yemen, Suriye-Filistin. Yardım: Galiçya, Makedonya, Romanya.',
    examTip:
      'Çanakkale Zaferi Rusya’ya yardım gitmesini önlemiş, I. Dünya Savaşı’nı 2 yıl uzatmış ve Mustafa Kemal’i tüm yurda tanıtmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_gizli_antlasmalar',
    term: 'Gizli Antlaşmalar ve Wilson İlkeleri',
    shortCode: 'Sykes–Picot',
    eraOrDate: '1915 – 1918',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      'İtilaf Devletleri Osmanlı’yı Sykes–Picot, Londra, St. Jean de Maurienne ile paylaştı; Bolşevik Rusya bunları dünyaya açıkladı. Wilson İlkeleri (1918) ise her ulusun çoğunlukta olduğu yerde kendi devletini kurmasını savundu.',
    examTip:
      'Wilson’daki "yenilenlerden savaş tazminatı ve toprak alınmayacak" ilkesi İtilaf Devletlerince "manda ve himaye" adıyla delinmiştir.',
    isHighYield: true,
  },
  {
    id: 'hist_mondros_1918',
    term: 'Mondros Ateşkes Antlaşması (30 Ekim 1918)',
    shortCode: '7. ve 24. Madde',
    eraOrDate: 'Rauf Orbay – Calthorpe',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      '7. Madde (güvenliği tehdit eden yerin işgali) tüm Anadolu’yu işgale açık bıraktı; 24. Madde (Vilayet-i Sitte) doğuda Ermeni devleti kurma zemini oluşturdu; ordu terhis edildi.',
    examTip:
      'Mondros sonrası işgal edilen ilk Osmanlı toprağı Musul (İngiltere), ilk direniş ise Hatay Dörtyol’da başlamıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_paris_izmir_isgali',
    term: 'Paris Barış Konferansı ve İzmir’in İşgali',
    shortCode: '15 Mayıs 1919',
    eraOrDate: 'Kuvâ-yı Milliye Doğuşu',
    category: 'OSMANLI_DEGISIM_SON',
    examLevel: 'TYT_AYT',
    mechanism:
      'İngiltere güçlü İtalya yerine Yunanistan’ı destekleyince İtilaf bloğunda ilk görüş ayrılığı çıktı; 15 Mayıs 1919’da İzmir’in işgaliyle Hasan Tahsin ilk kurşunu attı ve Kuvâ-yı Milliye doğdu.',
    examTip:
      'Amiral Bristol Raporu, Batı Anadolu’daki Yunan işgalinin haksızlığını ve Türklerin çoğunlukta olduğunu kanıtlayan ilk uluslararası belgedir.',
    isHighYield: true,
  },

  // =========================================================================
  // 5. MİLLÎ MÜCADELE, ATATÜRK DÖNEMİ & ÇAĞDAŞ TARİH (15 KAVRAM)
  // =========================================================================
  {
    id: 'hist_cemiyetler',
    term: 'Yararlı ve Zararlı Cemiyetler',
    shortCode: 'Müdafaa-i Hukuk',
    eraOrDate: '1918 – 1919',
    category: 'INKILAP_CAGDAS',
    examLevel: 'TYT_AYT',
    mechanism:
      'Yararlılar (Trakya-Paşaeli, Şark Vilayetleri, İzmir Müdafaa-i Hukuk, Kilikyalılar, Millî Kongre) bölgesel kurtuluşu savundu ve Sivas Kongresi’nde tek çatı altında birleşti; Azınlık ve Millî Varlığa Düşman cemiyetler işgalleri kolaylaştırdı.',
    examTip:
      'Millî Kongre Cemiyeti diğerlerinden farklı olarak bölgesel değil tüm yurdu temsil edip basın-yayın yolunu kullanmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_genelgeler_kongreler',
    term: 'Havza, Amasya Genelgeleri & Erzurum–Sivas Kongreleri',
    shortCode: '1919 Genelge-Kongre',
    eraOrDate: 'Mayıs – Eylül 1919',
    category: 'INKILAP_CAGDAS',
    examLevel: 'TYT_AYT',
    mechanism:
      'Amasya Genelgesi ("Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır") ihtilal bildirisidir; Erzurum’da ilk kez manda reddedilip millî sınırlardan söz edildi; Sivas’ta tüm cemiyetler birleşti.',
    examTip:
      'Amasya Görüşmeleri (Ekim 1919) ile İstanbul Hükümeti Temsil Heyeti’nin hukuki varlığını ilk kez resmen tanımıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_misak_i_milli_tbmm',
    term: 'Misak-ı Millî, I. TBMM & Sevr Antlaşması',
    shortCode: '1920 Dönüm Yılı',
    category: 'INKILAP_CAGDAS',
    eraOrDate: 'Ocak – Ağustos 1920',
    examLevel: 'TYT_AYT',
    mechanism:
      'Son Osmanlı Mebusan Meclisi Misak-ı Millî’yi kabul edince İstanbul işgal edildi ve 23 Nisan 1920’de olağanüstü yetkili (güçler birliği) I. TBMM açıldı; Mebusan onaylamadığı için Sevr hukuken ölü doğdu.',
    examTip:
      'Misak-ı Millî’de sınırlar, azınlık hakları, kapitülasyonlar, boğazlar ve halk oylaması (Kars-Ardahan-Batum, Batı Trakya, Arap illeri) vurgulanmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_dogu_guney_cepheleri',
    term: 'Doğu (Gümrü) ve Güney (Ankara) Cepheleri',
    shortCode: '1920 – 1921',
    eraOrDate: 'Kâzım Karabekir & Kuvâ-yı Milliye',
    category: 'INKILAP_CAGDAS',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kâzım Karabekir komutasındaki 15. Kolordu Ermenistan’ı yenip Gümrü Antlaşması’nı (TBMM’nin ilk askerî ve siyasi başarısı) imzaladı; Güney’de halk direnişi Sakarya Zaferi sonrası 1921 Ankara Antlaşması ile sonuçlandı.',
    examTip:
      'Gümrü Antlaşması’nda ilk kez "Türkiye" adı resmî uluslararası bir belgede geçmiştir.',
    isHighYield: true,
  },
  {
    id: 'hist_bati_cephesi_inonu',
    term: 'I. İnönü, II. İnönü ve Kütahya–Eskişehir Savaşları',
    shortCode: 'Düzenli Ordu 1921',
    eraOrDate: 'Ocak – Temmuz 1921',
    category: 'INKILAP_CAGDAS',
    examLevel: 'TYT_AYT',
    mechanism:
      'I. İnönü (düzenli ordunun ilk zaferi) sonrasında Teşkilat-ı Esasiye, Londra Konferansı, İstiklal Marşı ve Moskova Antlaşması (1921) geldi; Kütahya–Eskişehir çekilmesiyle Mustafa Kemal’e Başkomutanlık ve Tekâlif-i Millîye yetkisi verildi.',
    examTip:
      'Moskova Antlaşması’nda Batum’un Gürcistan’a bırakılması Misak-ı Millî’den verilen ilk tavizdir.',
    isHighYield: true,
  },
  {
    id: 'hist_sakarya_buyuk_taarruz',
    term: 'Sakarya Meydan Muharebesi & Büyük Taarruz',
    shortCode: '1921 – 1922',
    eraOrDate: 'Kurtuluşun Zaferleri',
    category: 'INKILAP_CAGDAS',
    examLevel: 'TYT_AYT',
    mechanism:
      '"Hattı müdafaa yoktur, sathı müdafaa vardır" stratejisiyle Sakarya (1921) kazanılıp Kars ve Ankara antlaşmaları yapıldı; 26 Ağustos 1922 Büyük Taarruz ile Yunan ordusu denize döküldü.',
    examTip:
      '1683 II. Viyana’dan beri süren Türk geri çekilişi Sakarya Zaferi ile son bulmuştur.',
    isHighYield: true,
  },
  {
    id: 'hist_mudanya_lozan',
    term: 'Mudanya Ateşkesi (1922) ve Lozan Barışı (1923)',
    shortCode: '24 Temmuz 1923',
    eraOrDate: 'Bağımsızlık Belgesi',
    category: 'INKILAP_CAGDAS',
    examLevel: 'TYT_AYT',
    mechanism:
      'Mudanya ile Doğu Trakya, İstanbul ve Boğazlar savaşsız alındı; Lozan’da kapitülasyonlar ve Düyûn-ı Umûmiye tamamen kalktı, tam bağımsız Türkiye Cumhuriyeti dünyaca tanındı.',
    examTip:
      'Lozan’da çözülemeyip sonraya bırakılan tek sorun Musul (Irak sınırı) meselesi olmuştur.',
    isHighYield: true,
  },
  {
    id: 'hist_siyasi_inkilaplar',
    term: 'Saltanatın Kaldırılması, Cumhuriyet ve Halifelik',
    shortCode: '1922 – 1924',
    eraOrDate: 'Siyasi İnkılaplar',
    category: 'INKILAP_CAGDAS',
    examLevel: 'TYT_AYT',
    mechanism:
      '1 Kasım 1922 Saltanatın kaldırılması (Lozan’a ikili temsili önledi), 29 Ekim 1923 Cumhuriyetin ilanı (kabine sistemine geçiş), 3 Mart 1924 Halifeliğin kaldırılması (laikliğin en büyük adımı).',
    examTip:
      '3 Mart 1924’te aynı gün Tevhid-i Tedrisat Kanunu da çıkarılarak tüm okullar Millî Eğitim Bakanlığına bağlandı.',
    isHighYield: true,
  },
  {
    id: 'hist_hukuk_egitim_ekonomi',
    term: 'Medeni Kanun, Harf İnkılabı & İzmir İktisat',
    shortCode: '1923 – 1933',
    eraOrDate: 'Toplumsal & Ekonomik',
    category: 'INKILAP_CAGDAS',
    examLevel: 'TYT_AYT',
    mechanism:
      '1926 Türk Medeni Kanunu (İsviçre · kadın-erkek hukuki eşitliği), 1928 Yeni Türk Harfleri & Millet Mektepleri, TTK (1931), TDK (1932), Kabotaj Kanunu (1926), Teşvik-i Sanayi & Devletçilik.',
    examTip:
      '1926 Medeni Kanun’da kadına siyasi haklar (seçme-seçilme) yoktu; bunlar 1930 Belediye, 1933 Muhtar ve 1934 Milletvekili haklarıyla verildi.',
    isHighYield: true,
  },
  {
    id: 'hist_ataturk_ilkeleri',
    term: 'Atatürk’ün 6 Temel İlkesi',
    shortCode: '6 İlke (1937)',
    eraOrDate: 'Cumhuriyet İdeolojisi',
    category: 'INKILAP_CAGDAS',
    examLevel: 'TYT_AYT',
    mechanism:
      'Cumhuriyetçilik (millî egemenlik), Milliyetçilik (kültür birliği), Halkçılık (eşitlik/imtiyazsız toplum), Devletçilik (karma ekonomi), Laiklik (akıl/bilim/din-devlet ayrımı), İnkılapçılık (çağdaşlaşma).',
    examTip:
      'Atatürk ilkeleri 1937 yılında yapılan anayasa değişikliği ile 1924 Anayasası’na resmen eklenmiştir.',
    isHighYield: true,
  },
  {
    id: 'hist_cok_partili_denemeler',
    term: 'Çok Partili Hayata Geçiş Denemeleri (TCF & SCF)',
    shortCode: '1924 – 1930',
    eraOrDate: 'Demokrasi Denemeleri',
    category: 'INKILAP_CAGDAS',
    examLevel: 'TYT_AYT',
    mechanism:
      'İlk muhalefet partisi Terakkiperver Cumhuriyet Fırkası (1924) Şeyh Sait İsyanı sonrası, Serbest Cumhuriyet Fırkası (1930) ise Menemen Olayı öncesi gericilerin sızması üzerine kapandı.',
    examTip:
      'Şeyh Sait İsyanı (1925) hem çok partili denemeyi kesintiye uğratmış hem de Musul’un kaybedilmesinde etkili olmuştur.',
    isHighYield: true,
  },
  {
    id: 'hist_dis_politika_ataturk',
    term: 'Atatürk Dönemi Dış Politika (Montrö & Hatay)',
    shortCode: '1923 – 1939',
    eraOrDate: 'Yurtta Sulh Cihanda Sulh',
    category: 'INKILAP_CAGDAS',
    examLevel: 'TYT_AYT',
    mechanism:
      '1926 Ankara Antlaşması (Musul bırakıldı), 1930 Nüfus Mübadelesi, 1932 Milletler Cemiyeti, 1934 Balkan Antantı, 1936 Montrö Boğazlar Sözleşmesi, 1937 Sadabat Paktı, 1939 Hatay’ın anavatana katılması.',
    examTip:
      'Montrö Boğazlar Sözleşmesi ile Boğazlar Komisyonu kaldırılıp Boğazlardaki tam Türk egemenliği sağlanmıştır.',
    isHighYield: true,
  },
  {
    id: 'hist_ii_dunya_soguk_savas',
    term: 'II. Dünya Savaşı & Soğuk Savaş Blokları (AYT)',
    shortCode: '1939 – 1960',
    eraOrDate: 'Çağdaş Türk ve Dünya Tarihi',
    category: 'INKILAP_CAGDAS',
    examLevel: 'AYT',
    mechanism:
      'Türkiye II. Dünya Savaşı’nda denge politikası izleyip savaş sonu BM kurucu üyesi oldu; Soğuk Savaş’ta ABD (Truman Doktrini, Marshall Planı, NATO 1952) ile SSCB (Varşova Paktı, Comecon) kutuplaştı.',
    examTip:
      'Türkiye 1950 Kore Savaşı’na asker göndererek 1952’de NATO’ya tam üye olmuştur.',
    isHighYield: true,
  },
  {
    id: 'hist_kibris_dis_sorunlar',
    term: 'Kıbrıs Barış Harekâtı & Türk–Yunan İlişkileri',
    shortCode: '1974 Kıbrıs',
    eraOrDate: 'Çağdaş Tarih (AYT)',
    category: 'INKILAP_CAGDAS',
    examLevel: 'AYT',
    mechanism:
      'EOKA terörü ve 1974 Yunan darbesi üzerine Türkiye garantörlük hakkını kullanarak 20 Temmuz 1974 Kıbrıs Barış Harekâtı’nı düzenledi; 1983’te KKTC ilan edildi.',
    examTip:
      'Harekât sonrası ABD’nin Türkiye’ye silah ambargosu uygulaması millî savunma sanayisi (ASELSAN vb.) hamlesini doğurmuştur.',
    isHighYield: true,
  },
  {
    id: 'hist_sscb_dagilmasi_ab',
    term: 'SSCB’nin Dağılması, Türk Cumhuriyetleri & AB Süreci',
    shortCode: '1991 Sonrası',
    eraOrDate: 'Küreselleşen Dünya (AYT)',
    category: 'INKILAP_CAGDAS',
    examLevel: 'AYT',
    mechanism:
      'Gorbaçov’un Glasnost/Perestroyka politikaları sonrası 1991’de SSCB dağıldı ve Azerbaycan, Kazakistan, Özbekistan, Türkmenistan, Kırgızistan bağımsız oldu; TİKA ve Türk Devletleri Teşkilatı gelişti.',
    examTip:
      'Türkiye’nin AB ile 1963 Ankara Antlaşmasıyla başlayan ilişkileri 1996 Gümrük Birliği ve 1999 Helsinki Zirvesi ile adaylık statüsüne ulaştı.',
    isHighYield: false,
  },
];
