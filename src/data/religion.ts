import type {ReligionCategoryId, ReligionExamLevel, ReligionTerm} from '../types/religion';

export const RELIGION_CATEGORY_LABELS: Record<ReligionCategoryId, string> = {
  BILGI_IMAN_ALLAH: 'Bilgi, İman & Allah İnancı',
  IBADET_AHIRET_PEYGAMBER: 'İbadet, Ahiret & Peygamber',
  AHLAK_DEGERLER_GUNCEL: 'Ahlak, Kur’an & Güncel Mesele',
  MEDENIYET_BILIM_SAHSIYET: 'Medeniyet, Bilim & Anadolu',
  MEZHEP_TASAVVUF_DINLER: 'Mezhep, Tasavvuf & Dinler',
};

export const RELIGION_EXAM_LEVEL_LABELS: Record<ReligionExamLevel, string> = {
  TYT: 'TYT',
  AYT: 'AYT',
  TYT_AYT: 'TYT · AYT',
};

export const RELIGION_TERMS: ReligionTerm[] = [
  // =========================================================================
  // 1. BİLGİ, İMAN ESASLARI & ALLAH İNANCI (15 KAVRAM)
  // =========================================================================
  {
    id: 'rel_bilgi_kaynaklari',
    term: 'İslam’da Bilgi Kaynakları (Esbâb-ı İlim)',
    shortCode: '3 Bilgi Kaynağı',
    scopeOrSource: 'Kelam & Epistemoloji',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Doğru ve kesin bilgiye üç yolla ulaşılır: Selim Akıl (önyargısız doğru düşünen akıl), Sadık Haber (vahiy ve mütevatir haber) ve Salim Duyular (sağlıklı beş duyu).',
    examTip:
      'Rüya, ilham ve keşif kişiye özel (öznel) olduğu için İslam’da herkesi bağlayan genel bilgi kaynağı sayılmaz.',
    isHighYield: true,
  },
  {
    id: 'rel_sadik_haber_mutevatir',
    term: 'Sadık Haber (Vahiy & Mütevatir Haber)',
    shortCode: 'Mütevatir',
    scopeOrSource: 'Bilgi Kaynakları',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Sadık haber ikiye ayrılır: Peygamberlerden gelen Vahiy (haber-i resul) ve yalan üzere birleşmesi imkânsız kalabalık toplulukların aktardığı Mütevatir Haber.',
    examTip:
      'Kur’an-ı Kerim’in bize kadar değişmeden ulaşması hem vahiy hem de mütevatir nakil ile sabit kesin bilgidir.',
    isHighYield: true,
  },
  {
    id: 'rel_bilgi_ahlaki',
    term: 'İslam’da Bilgi Ahlakı & Doğrulama',
    shortCode: 'İsra 36',
    scopeOrSource: 'Kur’an Bilgi Etiği',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Bilgiyi gizlememek (ketmetmemek), kaynağını araştırmadan hüküm vermemek (Hucurat 6 / İsra 36) ve bilginin faydalı amele dönüşmesini sağlamak bilgi ahlakıdır.',
    examTip:
      'İsra 36. ayette "Hakkında bilgin olmayan şeyin ardına düşme; kulak, göz ve kalp bunların hepsi sorumludur" uyarısı yer alır.',
    isHighYield: false,
  },
  {
    id: 'rel_iman_tasdik_ikrar',
    term: 'İman: Tasdik, İkrar ve Amel İlişkisi',
    shortCode: 'Kalp & Dil',
    scopeOrSource: 'İman Esasları',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'İmanın aslı kalp ile tasdiktir (onay); dil ile söylemek ikrardır. Ehlisünnet’e göre amel imandan bir parça değildir ancak imanı güçlendirir.',
    examTip:
      'Kalbiyle inanmadığı hâlde diliyle inandığını söyleyen kişiye münafık; inanıp günah işleyen Müslümana ise fasık denir.',
    isHighYield: true,
  },
  {
    id: 'rel_taklidi_tahkiki_iman',
    term: 'Taklidî İman ve Tahkikî İman',
    shortCode: 'Araştırılmış İman',
    scopeOrSource: 'İman Türleri',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Taklidî iman delil ve araştırma olmadan çevre/aile etkisiyle inanmaktır; Tahkikî iman ise akıl, bilgi ve tefekkürle delillere dayalı sağlam imandır.',
    examTip:
      'Şüphe ve itirazlar karşısında sarsılmaması için Müslümanın taklidî imanı tahkikî imana yükseltmesi istenir.',
    isHighYield: true,
  },
  {
    id: 'rel_fitrat_haniflik',
    term: 'Fıtrat ve Haniflik',
    shortCode: 'Doğuştan Yöneliş',
    scopeOrSource: 'Rum 30 · İnanç',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Fıtrat insanın doğuştan iyiye, doğruya ve tek olan Allah’ı tanımaya yatkın yaratılışıdır; Haniflik ise Hz. İbrahim’in tevhit inancına sadık kalmaktır.',
    examTip:
      'Rum Suresi 30. ayette İslam "Allah’ın insanları üzerinde yarattığı fıtrat dini" olarak tanımlanır.',
    isHighYield: true,
  },
  {
    id: 'rel_tevhit_sirk',
    term: 'Tevhit ve Şirk',
    shortCode: 'İhlas Suresi',
    scopeOrSource: 'Temel Akide',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Tevhit Allah’ı zatında, sıfatlarında ve mabut oluşunda birlemektir (La ilahe illallah); Şirk ise Allah’a ortak koşmaktır ve Kur’an’a göre en büyük zulümdür.',
    examTip:
      'Nisa 48 ve 116. ayetlerde Allah’ın kendisine şirk koşulmasını (tövbesiz) bağışlamayacağı vurgulanır.',
    isHighYield: true,
  },
  {
    id: 'rel_allahi_tanimada_sifatlar',
    term: 'Allah’ın Zati ve Subuti Sıfatları',
    shortCode: 'Tekvin & Vahdaniyet',
    scopeOrSource: 'Kelam Sıfatları',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Zati sıfatlar yalnız Allah’a özgüdür (Vücud, Kıdem, Beka, Vahdaniyet, Muhalefetün lil-havadis, Kıyam bi-nefsihi); Subuti sıfatlar (Hayat, İlim, Semi, Basar, İrade, Kudret, Kelam, Tekvin) yaratmasında görülür.',
    examTip:
      'Tekvin (yoktan yaratma) sıfatını Matüridiler subuti sıfat sayarken Eşariler kudret sıfatı içinde değerlendirir.',
    isHighYield: true,
  },
  {
    id: 'rel_esmayihusna',
    term: 'Esmayıhüsna (Allah’ın Güzel İsimleri)',
    shortCode: '99 İsim',
    scopeOrSource: 'Haşr 22–24 · A’raf 180',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Halık (yaratan), Bâri (uyumlu yaratan), Musavvir (şekil veren), Muhyi (hayat veren), Rezzak (rızık veren), Şâfî (şifa veren), Rahman/Rahim (merhametli), Hayy (diri), Ehad (tek).',
    examTip:
      'Sınav sorularında verilen ayet veya olay metninden doğru Esmayıhüsna eşleştirmesi sıkça istenir (ör. rızık → Rezzak).',
    isHighYield: true,
  },
  {
    id: 'rel_gaye_nizam_ekmel',
    term: 'Allah’ın Varlığının Delilleri (Gaye-Nizam & Ekmel)',
    shortCode: 'Kozmolojik Delil',
    scopeOrSource: 'Kelam & Din Felsefesi',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Gaye ve Nizam Delili (Teleolojik): Evrendeki hassas düzen, ölçü ve amaçlılık üstün bir yaratıcıyı gösterir. Ekmel Varlık Delili (Ontolojik): İnsandaki kusursuz varlık düşüncesi Allah’ın varlığından gelir.',
    examTip:
      'Kur’an’da göklerin ve yerin düzenine dikkat çeken ayetler Gaye ve Nizam deliliyle doğrudan ilişkilidir.',
    isHighYield: true,
  },
  {
    id: 'rel_kulun_allah_irtibati',
    term: 'İnsanın Allah ile İrtibatı (Dua, İbadet, Tövbe)',
    shortCode: '4 İrtibat Yolu',
    scopeOrSource: 'Furkan 77 · Bakara 186',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kulun Allah ile bağı dört temel yoldan kurulur: Dua (yakarış), İbadet (itaat), Tövbe-İstiğfar (pişmanlıkla dönüş) ve Kur’an okuma (Kıraat/Tilavet).',
    examTip:
      'Kıraat Kur’an’ı kurallarına göre okumak; Tilavet ise okuyup anlamak ve hayatına uygulamaktır.',
    isHighYield: true,
  },
  {
    id: 'rel_hidayet_dalalet',
    term: 'Hidayet ve Dalalet',
    shortCode: 'Doğru Yol',
    scopeOrSource: 'Temel Kur’an Kavramları',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hidayet Allah’ın gösterdiği doğru yolu bulmak ve İslam üzere yaşamaktır; Dalalet ise hak yoldan sapmak ve bâtıla yönelmektir.',
    examTip:
      'Sırat-ı Müstakim, hidayetin ifadesi olan aşırılıklardan uzak dosdoğru yol anlamına gelir.',
    isHighYield: false,
  },
  {
    id: 'rel_ihlas_ihsan_takva',
    term: 'İhlas, İhsan ve Takva',
    shortCode: 'İbadet Bilinci',
    scopeOrSource: 'Cibril Hadisi & Kur’an',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'İhlas ibadeti yalnız Allah rızası için yapmaktır (gösteriş/riya karşıtı); İhsan Allah’ı görüyormuşçasına kulluk etmektir; Takva Allah’ın emir ve yasaklarına titizlikle uymaktır.',
    examTip:
      'Hucurat 13. ayete göre Allah katında üstünlük soy-sop veya zenginlikte değil "Takva"dadır.',
    isHighYield: true,
  },
  {
    id: 'rel_cihat_salih_amel',
    term: 'Cihat ve Salih Amel',
    shortCode: 'İyilik Çabası',
    scopeOrSource: 'Kur’an Kavramları',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Cihat yalnız savaş değil; nefsiyle mücadele etmek, ilimle uğraşmak ve iyiliği yaymak için her türlü çabayı göstermektir. Salih amel ise imana dayalı faydalı güzel iştir.',
    examTip:
      'Peygamberimiz savaş dönüşünde nefsle mücadeleyi "en büyük cihat" olarak nitelendirmiştir.',
    isHighYield: false,
  },
  {
    id: 'rel_kader_irade',
    term: 'Kaza, Kader, Cüzi İrade ve Tevekkül',
    shortCode: 'Sorumluluk',
    scopeOrSource: 'İman Esasları',
    category: 'BILGI_IMAN_ALLAH',
    examLevel: 'TYT_AYT',
    mechanism:
      'Allah’ın sonsuz iradesi Küllî İrade, insana verilen seçme özgürlüğü Cüzi İradedir; insan cüzi iradesiyle seçtiklerinden sorumludur. Tevekkül ise tüm tedbirleri aldıktan sonra Allah’a güvenmektir.',
    examTip:
      'Çalışmadan "kaderim böyleymiş" demek yanlış kader anlayışıdır (Cebriye yaklaşımı); doğru tevekkül önce emek gerektirir.',
    isHighYield: true,
  },

  // =========================================================================
  // 2. İBADET YÜKÜMLÜLÜĞÜ, AHİRET & HZ. MUHAMMED (15 KAVRAM)
  // =========================================================================
  {
    id: 'rel_mukellef_efal',
    term: 'Mükellef ve Efâl-i Mükellefin',
    shortCode: '8 Dinî Hüküm',
    scopeOrSource: 'Fıkıh Usulü',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Akıl ve ergenlik çağına (bülûğ) sahip sorumlu kişiye Mükellef denir. Davranışların hükümleri: Farz, Vacip, Sünnet, Mendup (Müstehap), Mübah, Haram, Mekruh ve Müfsit.',
    examTip:
      'Farz-ı Ayn (herkese tek tek farz: beş vakit namaz) ile Farz-ı Kifaye (bir grup yapınca diğerlerinden düşen: cenaze namazı) ayrımı sıkça sorulur.',
    isHighYield: true,
  },
  {
    id: 'rel_vacip_sunnet_mekruh',
    term: 'Vacip, Sünnet ve Mekruh Ayrımı',
    shortCode: 'Fıkhî Dereceler',
    scopeOrSource: 'İbadet Fıkhı',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Vacip delili farz kadar açık olmayan güçlü emirdir (Vitir/Bayram namazı, Kurban, Fıtır sadakası). Sünnet-i Müekkede (sabah/öğle sünnetleri) Peygamberin sürekli yaptığıdır. Mekruh dinen hoş görülmeyendir.',
    examTip:
      'Tahrimen mekruh harama yakın mekruh (terki gerekli), Tenzihen mekruh ise helale yakın mekruhtur.',
    isHighYield: true,
  },
  {
    id: 'rel_bidat_hurafe',
    term: 'Bidat ve Hurafe',
    shortCode: 'Asılda Olmayan',
    scopeOrSource: 'İbadet İlkeleri',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Bidat Hz. Peygamber döneminde olmayıp sonradan dinin özüne/ibadet şekline eklenen uygulamalardır; Hurafe ise akla ve dine aykırı batıl inanışlardır (türbelere bez bağlamak gibi).',
    examTip:
      'Matbaa, elektrik veya hoparlör gibi dünyevi teknik yenilikler ibadetin özünü değiştirmediği için kötü bidat sayılmaz.',
    isHighYield: false,
  },
  {
    id: 'rel_ibadet_ilkeleri',
    term: 'İbadetlerde Temel İlkeler (İtidal, Kolaylık, Niyet)',
    shortCode: 'Yüsr & İhlas',
    scopeOrSource: 'İbadet Felsefesi',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'İbadetler yalnızca Kur’an ve Sünnetle belirlenir (Taabbudîlik), niyet ve ihlas şarttır, güç yetirilebilirlik/kolaylık esastır (ruhbanlık veya aşırı zorlama yoktur).',
    examTip:
      'Yolculukta namazın kısaltılması veya hastalıkta teyemmüm İslam’daki "kolaylaştırma (ruhsat)" ilkesinin sonucudur.',
    isHighYield: true,
  },
  {
    id: 'rel_ahiret_asamalari',
    term: 'Ahiret Hayatının Aşamaları (Berzah – Haşir – Mizan)',
    shortCode: '6 Aşama',
    scopeOrSource: 'İman Esasları',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Sırasıyla: Ecel/Ölüm → Berzah (kabir hayatı) → Kıyamet (İsrafil’in ilk Sûr’u) → Baas (ikinci Sûr ile diriliş) → Haşir/Mahşer (toplanma) → Hesap ve Mizan (amellerin tartılması) → Sırat/Cennet-Cehennem.',
    examTip:
      'Sıralama sorularında Baas’ın (yeniden diriliş) Haşir’den (toplanma) önce geldiğine dikkat edilmelidir.',
    isHighYield: true,
  },
  {
    id: 'rel_cennet_cehennem_isimleri',
    term: 'Cennet ve Cehennem İsimleri (AYT)',
    shortCode: 'Adn & Hâviye',
    scopeOrSource: 'Kur’an Tasvirleri',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'AYT',
    mechanism:
      'Cennet: Adn, Firdevs, Me’va, Naîm, Darüsselam. Cehennem: Cahîm, Hâviye, Hutame, Saîr, Sakar, Lezâ.',
    examTip:
      'Cennet için "selam/esenlik yurdu" anlamına gelen Darüsselam; Cehennem için ise "uçurum" anlamındaki Hâviye sıkça kavram eşleştirmesinde çıkar.',
    isHighYield: false,
  },
  {
    id: 'rel_cenaze_ugurlama',
    term: 'Ahirete Uğurlama (Techiz, Tekfin, Teşyi)',
    shortCode: 'Cenaze Adabı',
    scopeOrSource: 'Toplumsal İbadet',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Ölen kişinin yıkanıp kefenlenmesi (Techiz ve Tekfin), cenaze namazının kılınması (Farz-ı Kifaye · rükû ve secdesiz ayakta 4 tekbir), kabre uğurlanması (Teşyi), taziye ve vasiyetinin yerine getirilmesi.',
    examTip:
      'Cenaze namazı ölen kişi için bir dua niteliğinde olup içinde rükû ve secde bulunmaz.',
    isHighYield: true,
  },
  {
    id: 'rel_usve_i_hasene',
    term: 'Hz. Muhammed’in Örnekliği (Üsve-i Hasene)',
    shortCode: 'Ahzab 21',
    scopeOrSource: 'Nübüvvet & Siyer',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kur’an Hz. Muhammed’i hem beşer (insan) hem de tüm Müslümanlar için en güzel örnek (Üsve-i Hasene · Ahzab 21) ve âlemlere rahmet (Enbiya 107) olarak tanıtır.',
    examTip:
      'O’nun insanüstü değil bir beşer olması, söz ve davranışlarının Müslümanlarca örnek alınıp uygulanabilmesini mümkün kılar.',
    isHighYield: true,
  },
  {
    id: 'rel_peygamberlik_gorevleri',
    term: 'Hz. Muhammed’in Nübüvvet Görevleri',
    shortCode: 'Tebliğ-Tebyin-Teşri',
    scopeOrSource: 'Peygamberlik',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Tebliğ (vahyi eksiksiz iletme), Tebyin (Kur’an’ı açıklama/yorumlama), Teşri (hüküm koyma yetkisi) ve Temsil (yaşayarak örnek olma). Hatemünnebiyyin ise son peygamber demektir.',
    examTip:
      'Kur’an’da yalnız "namaz kılın" emrinin bulunup rekât ve kılınışının Hz. Peygamber tarafından gösterilmesi "Tebyin" görevine örnektir.',
    isHighYield: true,
  },
  {
    id: 'rel_hadis_sunnet_turleri',
    term: 'Hadis ve Sünnet Türleri (Kavlî, Fiilî, Takrirî)',
    shortCode: '3 Sünnet Türü',
    scopeOrSource: 'Hadis Usulü',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kavlî Sünnet: Peygamberin sözleri ("Ameller niyetlere göredir"). Fiilî Sünnet: Davranış ve uygulamaları (abdest alışı). Takrirî Sünnet: Sahabenin yaptığı bir davranışı görüp onaylaması.',
    examTip:
      'Sahabenin bir uygulamasını duyup sessiz kalması veya tebessümle karşılaması Takrirî Sünnet sayılır.',
    isHighYield: true,
  },
  {
    id: 'rel_kutubisitte',
    term: 'Kütübisitte (6 Güvenilir Hadis Kitabı)',
    shortCode: 'Buhari & Müslim',
    scopeOrSource: 'Hadis Tarihi',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Buhari, Müslim (Sahihayn), Ebu Davud, Tirmizi, Nesai ve İbn Mace’nin eserlerinden oluşan en güvenilir 6 hadis külliyatıdır (Ahmed bin Hanbel, Darimi ve Muvatta eklenince Kütübitisa olur).',
    examTip:
      'Kütübisitte eserleri hadisleri senet (ravi zinciri) ve metin tenkidine tabi tutarak derlemiştir.',
    isHighYield: true,
  },
  {
    id: 'rel_genc_sahabiler',
    term: 'Genç Sahabiler (Erkam, Musab, Üsame, Hz. Aişe)',
    shortCode: 'Asr-ı Saadet Gençleri',
    scopeOrSource: 'Siyer & Örnek Gençlik',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Erkam bin Ebülerkam (evini ilk eğitim merkezi Darülerkâm yaptı), Musab bin Umeyr (Medine’nin ilk öğretmeni), Üsame bin Zeyd (18 yaşında ordu komutanı), Muaz bin Cebel (Yemen valisi/fıkıh âlimi), Hz. Aişe (en çok hadis ve fıkıh aktaran âlim hanım sahabi).',
    examTip:
      'Cafer bin Ebu Talib ise Habeşistan kralı Necaşi’nin huzurunda Meryem Suresi’ni okuyarak Müslümanları savunan genç sözcüdür.',
    isHighYield: true,
  },
  {
    id: 'rel_zakat_infak',
    term: 'Zekât, Sadaka, İnfak ve Sadaka-i Cariye',
    shortCode: 'Malî İbadetler',
    scopeOrSource: 'Sosyal Dayanışma',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'İnfak Allah yolunda harcamadır; Zekât nisap miktarı mala sahip zenginlere farzdır (Tevbe 60’taki 8 sınıfa verilir); Sadaka-i Cariye ise öldükten sonra da sevabı devam eden okul, çeşme, ilim gibi kalıcı hayırlardır.',
    examTip:
      'Anne-baba, eş ve çocuklara zekât verilmez; ancak kardeş, teyze, amca gibi bakmakla yükümlü olunmayan fakir akrabaya zekât verilebilir.',
    isHighYield: true,
  },
  {
    id: 'rel_kurana_saygi_tefsir_meal',
    term: 'Meal, Tefsir ve Mukabele',
    shortCode: 'Kur’an Kültürü',
    scopeOrSource: 'Kur’an İlimleri',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Meal Kur’an ayetlerinin başka bir dile yaklaşık çevirisidir; Tefsir ise ayetlerin iniş sebepleri ve bağlamıyla geniş yorumudur. Mukabele karşılıklı Kur’an okuyup takip etmektir.',
    examTip:
      'Türkçedeki en meşhur tefsir Atatürk’ün talebiyle Elmalılı Muhammed Hamdi Yazır tarafından yazılan "Hak Dini Kur’an Dili"dir.',
    isHighYield: true,
  },
  {
    id: 'rel_ramazan_oruc_kadir',
    term: 'Ramazan, İtikâf, Fitre ve Kadir Gecesi',
    shortCode: 'Oruç İbadeti',
    scopeOrSource: 'İbadetler',
    category: 'IBADET_AHIRET_PEYGAMBER',
    examLevel: 'TYT_AYT',
    mechanism:
      'İmsaktan iftara kadar oruç tutulur; İtikâf Ramazan’ın son 10 gününde camide ibadete çekilmektir; Fitre (Fıtır sadakası) bayram öncesi ihtiyaç sahiplerine verilen vacip sadakadır.',
    examTip:
      'Kadir Gecesi "bin aydan daha hayırlı" olup Kur’an-ı Kerim’in indirilmeye başlandığı gecedir.',
    isHighYield: false,
  },

  // =========================================================================
  // 3. AHLAK, DEĞERLER, KUR'AN MESAJLARI & GÜNCEL MESELELER (15 KAVRAM)
  // =========================================================================
  {
    id: 'rel_degerler_orf_adet',
    term: 'Değer Kavramı, Örf ve Âdet',
    shortCode: 'Maddi & Manevi',
    scopeOrSource: 'Değerler Eğitimi',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'Değer bir toplumun önem verdiği inanç, ahlak, sanat ve davranış ölçütleridir. Örf nesilden nesile aktarılan köklü toplumsal kurallar; Âdet ise günlük alışkanlıklardır.',
    examTip:
      'Din ve ahlak kurallarına aykırı olmayan iyi örfe "Maruf" (örf-i sahih) denir ve fıkıhta dikkate alınır.',
    isHighYield: false,
  },
  {
    id: 'rel_dort_temel_erdem',
    term: 'Dört Temel Ahlaki Erdem & İtidal',
    shortCode: 'Adalet-Hikmet-İffet-Şecaat',
    scopeOrSource: 'İslam Ahlakı',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'İslam ahlak felsefesinin dört ana erdemi: Hikmet (bilgelik/doğru hüküm), İffet (arzuları kontrol/edep), Şecaat (cesaret/yiğitlik) ve Adalet (denge/herkese hakkını verme). İtidâl ise ifrat ile tefrit arasındaki orta yoldur.',
    examTip:
      'Cesaretin aşırılığı (ifrat) saldırganlık/tehevvür, eksikliği (tefrit) korkaklık, ortası (itidal) ise Şecaattir.',
    isHighYield: true,
  },
  {
    id: 'rel_yerilen_davranislar',
    term: 'Yerilen Davranışlar (Gıybet, Tecessüs, Suizan, Haset)',
    shortCode: 'Hucurat 11–12',
    scopeOrSource: 'Toplumsal Ahlak',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'Gıybet (arkadan çekiştirme), İftira (olmayan suçu atma), Tecessüs (gizli ayıpları/mahremiyeti araştırma), Suizan (kötü niyetle yargılama), Haset (başkasındaki nimetin yok olmasını isteme).',
    examTip:
      'Haset ile Gıpta karıştırılmamalıdır: Haset kıskanıp zarar dilemektir (yasak); Gıpta ise başkasındaki iyiliğe imrenip kendisi için de istemektir (caiz).',
    isHighYield: true,
  },
  {
    id: 'rel_israf_iktisat_emek',
    term: 'İsraf, İktisat, Emek ve İş Ahlakı',
    shortCode: 'A’raf 31 · Necm 39',
    scopeOrSource: 'İktisadi Ahlak',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'İsraf kaynakları gereksiz tüketmektir; iktisat ise cimrilik ile savurganlık arasındaki dengedir. Necm 39’a göre "İnsan için ancak çalıştığının karşılığı vardır"; ölçü ve tartıda hile (Mutaffifin) haramdır.',
    examTip:
      'Ahilik felsefesindeki "eline, beline, diline sahip ol" ve "alın teri kurumadan işçinin hakkını ver" ilkeleri iş ahlakının özüdür.',
    isHighYield: true,
  },
  {
    id: 'rel_cevre_hayvan_ahlaki',
    term: 'Çevre Bilinci ve Emanet Anlayışı',
    shortCode: 'Rum 41 · Rahmân',
    scopeOrSource: 'Ekolojik Ahlak',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'Doğa insana mülk değil Allah’ın bir "emanetidir". Suyun israf edilmemesi (akan nehir kenarında bile), ağaç dikilmesi ve canlılara merhamet dinî sorumluluktur.',
    examTip:
      'Rum 41. ayet "İnsanların kendi işledikleri yüzünden karada ve denizde bozulma (fesat) ortaya çıktı" uyarısını yapar.',
    isHighYield: false,
  },
  {
    id: 'rel_zarurat_i_diniye',
    term: 'Zarurat-ı Diniye (5 Temel Koruma İlkesi)',
    shortCode: '5 Temel Hak',
    scopeOrSource: 'Makasıd-ı Şeria',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'İslam hukukunun korumayı hedeflediği beş temel değer: Canın korunması, Aklın korunması, Dinin korunması, Neslin korunması ve Malın korunması.',
    examTip:
      'İçki ve uyuşturucu yasağı aklın korunmasına; nikâh/aile neslin; hırsızlık/faiz yasağı malın; kan davası/intihar yasağı ise canın korunmasına girer.',
    isHighYield: true,
  },
  {
    id: 'rel_ibaha_ilkesi',
    term: 'Eşyada Asıl Olan İbahadır & Kolaylık İlkeleri',
    shortCode: 'Fıkıh Kuralı',
    scopeOrSource: 'Güncel Fıkhî Hükümler',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hakkında açık bir yasak (haram) bulunmayan her şeyin ilke olarak serbest (mübah) sayılmasına "Eşyada asıl olan ibahadır" denir; zaruretler yasakları geçici olarak mubah kılar.',
    examTip:
      'Güncel bir tıp veya teknoloji meselesi çözümlenirken önce Kur’an-Sünnet, sonra kıyas, içtihat ve Zarurat-ı Diniye gözetilir.',
    isHighYield: true,
  },
  {
    id: 'rel_organ_otopsi_otanazi',
    term: 'Organ Nakli, Kan Bağışı, Otopsi ve Ötanazi',
    shortCode: 'Tıbbi Fıkıh',
    scopeOrSource: 'Güncel Meseleler',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'İslam’a göre hayat kurtarmak amacıyla ticari çıkar olmadan organ ve kan bağışı caizdir (Maide 32). Adli veya tıbbi zorunlulukta otopsi caizdir. Ötanazi ise yaşam hakkına müdahale/intihar hükmünde olduğundan haramdır.',
    examTip:
      'Maide 32: "Kim bir canı kurtarırsa bütün insanları kurtarmış gibi olur" ayeti organ ve kan bağışının temel dayanağıdır.',
    isHighYield: true,
  },
  {
    id: 'rel_bagimlilik_akl_koruma',
    term: 'Bağımlılıklarla Mücadele & Kumar/Alkol Yasağı',
    shortCode: 'Maide 90',
    scopeOrSource: 'Güncel Sosyal Sorunlar',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'Alkol, uyuşturucu, sigara ve kumar/şans oyunları akla, sağlığa ve aile ekonomisine zarar verdiği için haram kılınmıştır; dijital ve oyun bağımlılığı da irade ve zaman israfı nedeniyle sakıncalıdır.',
    examTip:
      '"Çoğu sarhoşluk verenin azı da haramdır" hadisi bağımlılık yapan maddelere karşı sıfır tolerans ilkesini koyar.',
    isHighYield: false,
  },
  {
    id: 'rel_isra_23_29_mesaj',
    term: 'Kur’an Mesajları: İsra Suresi 23–29. Ayetler',
    shortCode: 'Anne-Baba & İtidal',
    scopeOrSource: 'Kur’an’dan Mesajlar',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'Yalnız Allah’a kulluk, anne-babaya "öf" bile dememek ve güzel söz söylemek, akrabaya/yoksula/yolda kalmışa yardım etmek, savurgan (şeytanın kardeşi) ve eli sıkı olmamak emredilir.',
    examTip:
      'İsra 29’da "Elini boynuna bağlama (cimri olma), büsbütün de açma (savurgan olma)" denilerek harcamada itidal öğretilir.',
    isHighYield: true,
  },
  {
    id: 'rel_bakara_177_birr',
    term: 'Kur’an Mesajları: Bakara 177 (Birr / İyilik Ayeti)',
    shortCode: 'Birr Ayeti',
    scopeOrSource: 'Kur’an’dan Mesajlar',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'Gerçek iyiliğin (Birr) sadece yüzü doğuya/batıya çevirmek değil; iman etmek, sevdiği maldan yakına/yetime/yoksula infak etmek, namaz/zekât, sözünde durmak ve zorlukta sabretmek olduğu bildirilir.',
    examTip:
      'Bakara 177 iman, ibadet ve toplumsal ahlakı tek bir bütünlük içinde özetleyen en kapsamlı ayetlerdendir.',
    isHighYield: true,
  },
  {
    id: 'rel_hucurat_10_13',
    term: 'Kur’an Mesajları: Hucurat 10–13 (Kardeşlik & Takva)',
    shortCode: 'Toplumsal Barış',
    scopeOrSource: 'Kur’an’dan Mesajlar',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'Müminler kardeştir; alay etmek, kötü lakap takmak, suizan, tecessüs ve gıybet yasaklanır; tüm insanlar farklı kabile/milletlerde tanışsınlar diye yaratılmış olup üstünlük yalnız takvadadır.',
    examTip:
      'Hucurat 12 gıybeti "ölmüş kardeşinin etini yemeye" benzeterek toplumsal güveni korur.',
    isHighYield: true,
  },
  {
    id: 'rel_ali_imran_103_159',
    term: 'Kur’an Mesajları: Al-i İmran 103–105 & 159 (Birlik & İstişare)',
    shortCode: 'Tefrika Yasağı',
    scopeOrSource: 'Kur’an’dan Mesajlar',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'Allah’ın ipine (Kur’an’a) sımsıkı sarılıp parçalanmamak (103), iyiliği emredip kötülükten sakındırmak (104), yumuşak huylu olmak ve işlerde istişare etmek (159) emredilir.',
    examTip:
      'Al-i İmran 159 yöneticilikte kaba/katı kalplilik yerine merhamet, af ve danışmayı (istişare) esas alır.',
    isHighYield: true,
  },
  {
    id: 'rel_nisa_136_bakara_153',
    term: 'Kur’an Mesajları: Nisa 59/136 & Bakara 153–157',
    shortCode: 'Sabır & İman',
    scopeOrSource: 'Kur’an’dan Mesajlar',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'TYT_AYT',
    mechanism:
      'Nisa 136 tüm iman esaslarını sıralar; Nisa 59 anlaşmazlıkları Allah’a ve Resulüne götürmeyi ister; Bakara 153–157 sabır ve namazla yardım istemeyi, musibet anında "İnna lillahi ve inna ileyhi raciun" (İstirca) demeyi öğretir.',
    examTip:
      'Musibet anında söylenen "Biz Allah’tan geldik ve O’na döneceğiz" ifadesine İstirca denir.',
    isHighYield: false,
  },
  {
    id: 'rel_enam_151_152_fatir',
    term: 'Kur’an Mesajları: En’am 151–152 & Fatır 27–28',
    shortCode: 'İlim & Hakikat',
    scopeOrSource: 'Kur’an’dan Mesajlar',
    category: 'AHLAK_DEGERLER_GUNCEL',
    examLevel: 'AYT',
    mechanism:
      'En’am 151–152 şirkten kaçınma, anne-babaya iyilik, yetim malı yememe ve adaletle konuşma gibi 10 temel ilkeyi verir; Fatır 27–28 ise tabiattaki çeşitliliği anlatıp "Allah’tan ancak âlim kulları hakkıyla korkar" der.',
    examTip:
      'Fatır 28, tabiatı ve bilimi inceleyen âlimlerin Allah’ın kudretini daha derin kavrayacağını vurgular.',
    isHighYield: false,
  },

  // =========================================================================
  // 4. İSLAM MEDENİYETİ, BİLİM, SANAT & ANADOLU İRFANI (15 KAVRAM)
  // =========================================================================
  {
    id: 'rel_medeniyet_havzalari',
    term: 'İslam Medeniyeti Kültür Havzaları',
    shortCode: '8 Havza',
    scopeOrSource: 'İslam Medeniyeti',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hicaz (Mekke-Medine · doğuş), Kudüs (Mescid-i Aksa), Şam-Bağdat (Beytülhikme · bilim), Horasan-Maveraünnehir (Buhara, Semerkant), Anadolu-Balkanlar, Mısır-Mağrip, Hint Alt Kıtası ve Endülüs (Kurtuba-Elhamra).',
    examTip:
      'Endülüs (İspanya) havzası çeviriler yoluyla Avrupa’da Rönesans ve bilimsel uyanışı doğrudan etkilemiştir.',
    isHighYield: true,
  },
  {
    id: 'rel_suffe_beytulhikme',
    term: 'Suffe ve Beytülhikme',
    shortCode: 'İlk Eğitim Kurumları',
    scopeOrSource: 'Eğitim Kurumları',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Suffe Mescid-i Nebevî’nin bitişiğinde yoksul ve bekar sahabilerin yatılı ilim öğrendiği ilk İslam okuludur (Ashab-ı Suffe). Beytülhikme ise Abbasiler döneminde Bağdat’ta kurulan akademi ve çeviri merkezidir.',
    examTip:
      'Ebu Hureyre gibi en çok hadis aktaran sahabiler Ashab-ı Suffe içinde yetişmiştir.',
    isHighYield: true,
  },
  {
    id: 'rel_darulkurra_darulhadis',
    term: 'Nizamiye, Darülkurra, Darülhadis & Darüşşifa',
    shortCode: 'İhtisas Kurumları',
    scopeOrSource: 'Medrese & Şifa',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Nizamiye Medreseleri (ilk sistemli yükseköğretim), Darülkurra (Kur’an kıraati/hafızlık), Darülhadis (hadis ihtisası), Darüşşifa/Bimaristan (hastane ve tıp eğitimi), Rasathane (gözlemevi).',
    examTip:
      'Anadolu’daki ilk darüşşifalar Selçuklu döneminde (Geveher Nesibe Şifahanesi vb.) musiki ile tedavi de uygulamıştır.',
    isHighYield: true,
  },
  {
    id: 'rel_din_bilim_iliskisi',
    term: 'İslam’da Din ve Bilim İlişkisi & İlim Dalları',
    shortCode: 'Naklî & Aklî',
    scopeOrSource: 'İlim Tasnifi',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'İslam akıl ile vahyi çatışan değil birbirini tamamlayan iki rehber sayar. Dinî ilimler: Tefsir (Kur’an yorumu), Hadis (sünnet), Fıkıh (ibadet/hukuk), Kelam (inanç esaslarını akılla savunma).',
    examTip:
      'Kelam ilmi akli ve nakli delillerle İslam inanç esaslarını temellendirir ve dış eleştirilere karşı savunur.',
    isHighYield: true,
  },
  {
    id: 'rel_islam_bilim_alimleri',
    term: 'İslam Bilim Öncüleri (Harezmi, Biruni, İbnülheysem, Cezeri)',
    shortCode: 'Altın Çağ',
    scopeOrSource: 'Bilim Tarihi',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Harezmi (cebir ve algoritma), İbnülheysem (Kitabü’l-Menazır · modern optik ve kamera obscura), Zehravi (cerrahi aletler), Biruni (astronomi ve Dünya yarıçapı), El-Cezeri (otomatlar ve sibernetik), Ali Kuşçu & Uluğ Bey.',
    examTip:
      'El-Cezeri Artuklular döneminde yaşamış olup robotik ve sibernetik biliminin kurucusu kabul edilir.',
    isHighYield: true,
  },
  {
    id: 'rel_islam_sanatlari',
    term: 'İslam Sanatları (Hat, Tezhip, Ebru, Minyatür)',
    shortCode: 'Estetik Sanatlar',
    scopeOrSource: 'Kültür & Sanat',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hat (Arap harfleriyle güzel yazı · "Hattat"), Tezhip (el yazmalarını altın yaldızla süsleme · "Müzehhip"), Ebru (su üzerine boya serpme), Minyatür (perspektifsiz küçük kitap resmi · "Nakkaş").',
    examTip:
      'Tevhit inancı ve putperestlikten uzaklaşma hassasiyeti İslam sanatında soyut geometrik desenler, hat ve mimarinin öne çıkmasını sağlamıştır.',
    isHighYield: true,
  },
  {
    id: 'rel_turklerin_musluman_olusu',
    term: 'Türklerin Müslüman Olma Sebepleri & Talas 751',
    shortCode: 'Gök Tanrı – Tevhit',
    scopeOrSource: 'Türk-İslam Tarihi',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      '751 Talas Savaşı sonrası yakınlaşma hızlandı. Gök Tanrı inancındaki tek tanrı anlayışı, ahiret, kurban, temizlik, ahlak ve cihan hâkimiyeti/gaza düşüncesinin İslam ile benzerliği kabulu kolaylaştırdı.',
    examTip:
      'Türklerin İslamiyet’i benimsemesi zorla değil; inanç ve ahlak benzerlikleri ile ticari-kültürel etkileşim sonucu kitlesel olmuştur.',
    isHighYield: true,
  },
  {
    id: 'rel_ebu_hanife_maturidi',
    term: 'Ebu Hanife ve İmam Matüridi',
    shortCode: 'Akıl & Rey Ekolü',
    scopeOrSource: 'Türklerin Benimsediği Önderler',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'İmam-ı Azam Ebu Hanife (Fıkhu’l-Ekber) Kur’an ve Sünnet yanında akıl (kıyas/istihsan) ve örfe büyük yer verdi; İmam Matüridi (Kitabü’t-Tevhid · Semerkant) ise insanın irade özgürlüğünü ve aklın Allah’ı bulabileceğini savundu.',
    examTip:
      'Türklerin büyük çoğunluğu fıkıhta Hanefi, inançta (itikatta) ise Matüridi çizgiyi benimsemiştir.',
    isHighYield: true,
  },
  {
    id: 'rel_safii_esari_cafer',
    term: 'İmam Şafii, İmam Eşari ve Cafer-i Sadık',
    shortCode: 'Mezhep İmamları',
    scopeOrSource: 'Büyük İslam Âlimleri',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'İmam Şafii fıkıh usulünün ilk sistemli eseri "er-Risale"yi yazdı; İmam Eşari itikatta nakli merkeze alan Eşariliği kurdu; Cafer-i Sadık ise 12 İmam’ın altıncısı olup fıkıh ve hadiste derin iz bıraktı.',
    examTip:
      'Anadolu’da Doğu ve Güneydoğu bölgelerinde Şafii fıkıh mezhebi yaygın olarak uygulanmaktadır.',
    isHighYield: false,
  },
  {
    id: 'rel_ahmet_yesevi',
    term: 'Hoca Ahmet Yesevi (Pir-i Türkistan)',
    shortCode: 'Divân-ı Hikmet',
    scopeOrSource: 'Orta Asya → Anadolu',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Türkistan’da Türkçe yazdığı "Hikmet" şiirleriyle (Divân-ı Hikmet) İslamiyet’i göçebe Türkmenlere sade dille öğretti; yetiştirdiği Horasan Erenleri Anadolu’yu İslamlaştırdı.',
    examTip:
      'Hacı Bektaş Veli, Sarı Saltuk ve Yunus Emre geleneği fikrî olarak Ahmet Yesevi’nin açtığı Türkçe tasavvuf yoluna dayanır.',
    isHighYield: true,
  },
  {
    id: 'rel_mevlana',
    term: 'Mevlana Celaleddin Rumi',
    shortCode: 'Mesnevi & Şebiarus',
    scopeOrSource: 'Anadolu İrfanı',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Konya’da yaşayan Mevlana, Mesnevi ve Divân-ı Kebir eserleriyle ilahî aşk, hoşgörü ve insan sevgisini anlattı; ölümü Allah’a kavuşma gecesi saydığı için 17 Aralık "Şebiarus" (düğün gecesi) olarak anılır.',
    examTip:
      'Mevlana’nın "Ne olursan ol yine gel" yaklaşımı bütün insanlığı kapsayan evrensel merhameti ifade eder.',
    isHighYield: true,
  },
  {
    id: 'rel_ahi_evran_ahilik',
    term: 'Ahi Evran ve Ahilik / Fütüvvet Teşkilatı',
    shortCode: 'Esnaf Dayanışması',
    scopeOrSource: 'Anadolu Esnaf Ahlakı',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Fütüvvetnamelere dayalı olarak Kırşehir merkezli Ahiliği kuran Ahi Evran; meslek eğitimi (çırak-kalfa-usta), kalite denetimi, orta sandığı ve "eline-beline-diline sahip ol" ahlakını yerleştirdi.',
    examTip:
      'Ahilik, Anadolu’nun Türkleşmesinde ve Osmanlı Devleti’nin kuruluşunda hem ekonomik hem sosyal sigorta görevi görmüştür.',
    isHighYield: true,
  },
  {
    id: 'rel_haci_bektas_yunus',
    term: 'Hacı Bektaş Veli ve Yunus Emre',
    shortCode: 'Makalat & Risaletü’n-Nushiyye',
    scopeOrSource: 'Anadolu İrfanı',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hacı Bektaş Veli ("Makalat" · Dört Kapı Kırk Makam; "Eline, beline, diline sahip ol") ve Yunus Emre ("Risaletü’n-Nushiyye", "Divan"; "Yaratılanı severiz Yaratandan ötürü") sade Türkçe ve sevgiyle Anadolu’yu birleştirdi.',
    examTip:
      'Hacı Bektaş Veli’nin "İncinsen de incitme" ve "Okunacak en büyük kitap insandır" sözleri Anadolu irfanının özetidir.',
    isHighYield: true,
  },
  {
    id: 'rel_haci_bayram_sari_saltuk',
    term: 'Hacı Bayram Veli ve Sarı Saltuk',
    shortCode: 'Ankara & Balkanlar',
    scopeOrSource: 'Anadolu & Balkan İrfanı',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'AYT',
    mechanism:
      'Hacı Bayram Veli (Bayramiye kurucusu · çalışmayı ve ziraatı ibadetle birleştirdi; Fatih’in hocası Akşemseddin’in mürşididir); Sarı Saltuk ise Balkanlar (Dobruca/Romanya) fethinden önce bölgeyi irşat eden alperendir.',
    examTip:
      'Hacı Bayram Veli’nin Ankara’da esnaf ve çiftçiyle kurduğu imece kültürü Anadolu sosyal dayanışmasını güçlendirmiştir.',
    isHighYield: false,
  },
  {
    id: 'rel_ribat_kervansaray_vakif',
    term: 'Ribat, Kervansaray ve Vakıf Medeniyeti',
    shortCode: 'İnfak Kurumları',
    scopeOrSource: 'Sosyal Yardımlaşma',
    category: 'MEDENIYET_BILIM_SAHSIYET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Ribat başlangıçta sınır karakoluyken zamanla kervansaray ve ilim-tasavvuf merkezine dönüştü; Vakıflar ise imaret, köprü, medrese, hasta hayvan bakımı ve borçlu desteği gibi her alanı finanse etti.',
    examTip:
      'Vakıf malları satılamaz, devredilemez ve geliri yalnız vakfedenin belirlediği hayır şartı (vakfiye) doğrultusunda kullanılır.',
    isHighYield: false,
  },

  // =========================================================================
  // 5. DİNÎ/TASAVVUFİ YORUMLAR, İNANÇ AKIMLARI & YAŞAYAN DİNLER (15 KAVRAM)
  // =========================================================================
  {
    id: 'rel_din_anlayislari_nedenleri',
    term: 'Din ile Din Anlayışı Farkı & Mezhep Nedenleri',
    shortCode: 'Yorum Çeşitliliği',
    scopeOrSource: 'İslam Düşüncesi',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Din vahye dayanır ve tektir; din anlayışı ise insanın anlama çabası olup çoktur. Yorum farklılıkları: İnsanın yapısı, sosyal-kültürel ortam, dinî metinlerin (müteşabih) farklı anlaşılması ve siyasi olaylardır.',
    examTip:
      'İslam’daki mezhep ve yorum farklılıkları dinin özünü (tevhit, peygamber, ahiret) değiştirmez; kültürel zenginliktir.',
    isHighYield: true,
  },
  {
    id: 'rel_itikadi_ehlisunnet',
    term: 'İtikadi Yorumlar: Matüridilik ve Eşarilik',
    shortCode: 'Ehlisünnet İtikat',
    scopeOrSource: 'İtikadi Mezhepler',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Matüridilik (akıl vahiy gelmese de Allah’ı bulabilir; Tekvin ayrı sıfattır; kul seçer Allah yaratır) ve Eşarilik (sorumluluk peygamber gönderilince başlar; nakil merkezlidir) Ehlisünnet’in iki ana inanç ekolüdür.',
    examTip:
      'Her iki ekol de büyük günah işleyen kişinin dinden çıkmayacağını (günahkâr mümin kalacağını) kabul eder.',
    isHighYield: true,
  },
  {
    id: 'rel_sia_imamiye_zeydiye',
    term: 'Şia (İmamiye / Caferilik ve Zeydiye)',
    shortCode: 'İmamet Anlayışı',
    scopeOrSource: 'Siyasi-İtikadi Yorum',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hz. Peygamber sonrası imametin (yönetimin) Hz. Ali ve soyunun hakkı olduğunu savunur. İmamiye (İsnaaşeriye) 12 Masum İmam’a inanır; Zeydiye ise Ehlisünnet’e en yakın Şii kol olup şartları taşıyan her Ehl-i Beyt üyesini imam sayar.',
    examTip:
      'İmamiye’nin fıkıhtaki karşılığı altıncı imam Cafer-i Sadık’a nispetle Caferiliktir.',
    isHighYield: true,
  },
  {
    id: 'rel_fikhi_mezhepler',
    term: 'Beş Fıkhi Yorum (Hanefi, Maliki, Şafii, Hanbeli, Caferi)',
    shortCode: 'Amelî Mezhepler',
    scopeOrSource: 'Fıkıh Ekolleri',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hanefilik (Ebu Hanife · rey/kıyas · Türkiye/Orta Asya), Malikilik (İmam Malik · Muvatta/Medine halkı ameli · Kuzey Afrika), Şafiilik (İmam Şafii · er-Risale · Doğu Anadolu/Mısır), Hanbelilik (Ahmed bin Hanbel · el-Müsned · Hicaz), Caferilik.',
    examTip:
      'Kur’an ve Sünnet sonrası hüküm çıkarma yöntemleri (İcma, Kıyas, Medine ameli, Maslahat) bu mezhepleri doğurmuştur.',
    isHighYield: true,
  },
  {
    id: 'rel_tasavvuf_donemleri',
    term: 'Tasavvufun Dönemleri (Züht – Tasavvuf – Tarikat)',
    shortCode: 'İnsan-ı Kâmil',
    scopeOrSource: 'Tasavvuf Tarihi',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Züht (dünyaya aşırı bağlanmama, ilk iki asır) → Tasavvuf (sistematik kavramlar ve eserler dönemi) → Tarikat (12. yy’dan itibaren tekke/dergâh kurumlaşması). Amaç nefsi tezkiye edip İnsan-ı Kâmil olmaktır.',
    examTip:
      'Tasavvufta "Edep" (güzel ahlak ve ölçü) ve "Zikir" (Allah’ı anma) temel eğitim araçlarıdır.',
    isHighYield: true,
  },
  {
    id: 'rel_baslica_tarikatlar',
    term: 'Başlıca Tasavvufi Yorumlar (Yesevilik, Kadirilik, Mevlevilik, Nakşibendilik)',
    shortCode: 'Tarikatlar',
    scopeOrSource: 'Tasavvufi Ekoller',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Yesevilik (Ahmet Yesevi · ilk Türk tarikatı), Kadirilik (Abdülkadir Geylani · ilk tarikat), Mevlevilik (Mevlana/Sultan Veled · Sema ve sanat), Nakşibendilik (Bahaeddin Nakşibend · sessiz zikir/Hatm-i Hacegân), Rifailik.',
    examTip:
      'Mevlevilikte ney ve kudüm eşliğinde dönülerek yapılan zikir ayinine "Sema" (mukabele) denir.',
    isHighYield: true,
  },
  {
    id: 'rel_alevilik_bektasilik',
    term: 'Alevilik–Bektaşilik Kavramları (Cem, Musahiplik, 4 Kapı)',
    shortCode: 'On İki Hizmet',
    scopeOrSource: 'Tasavvufi Yorumlar',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Hak-Muhammed-Ali sevgisi temeldir. Dört Kapı Kırk Makam (Şeriat, Tarikat, Marifet, Hakikat), Cem/Cemevi, Dede rehberliği, Musahiplik (ahiret kardeşliği), Semah, On İki Hizmet, Gülbank duası ve Muharrem/Hızır orucu.',
    examTip:
      'Cem ibadetinde küskünlerin barıştırılıp herkesin rızasının alınmasına "Rızalık / Görgü" süreci denir.',
    isHighYield: true,
  },
  {
    id: 'rel_inanc_akimlari_teizm_deizm',
    term: 'İnanç Akımları: Teizm, Deizm ve Agnostisizm',
    shortCode: 'Tanrı Yaklaşımları',
    scopeOrSource: 'Güncel İnanç Meseleleri',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Teizm: Evreni yaratan, vahiy ve peygamber gönderen Tanrı’ya inanır. Deizm: Tanrı evreni yaratmış fakat vahiy/peygamber göndermemiş ve müdahale etmez der. Agnostisizm: Tanrı’nın varlığının veya yokluğunun bilinemeyeceğini savunur.',
    examTip:
      'Deizm "yaratıcıyı" kabul edip "din, vahiy, peygamber ve mucizeyi" reddetmesiyle Teizmden ayrılır.',
    isHighYield: true,
  },
  {
    id: 'rel_ateizm_materyalizm_nihilizm',
    term: 'Ateizm, Materyalizm, Pozitivizm, Sekülarizm & Nihilizm',
    shortCode: 'İnanç Krizleri',
    scopeOrSource: 'Felsefi Akımlar',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Ateizm (Tanrı’yı inkâr), Materyalizm (var olan yalnız maddedir), Pozitivizm (yalnız deney/gözlem bilgisi geçerlidir), Sekülarizm (dünyevileşme/dinin kamusal alandan çekilmesi), Nihilizm (hiççilik/değerleri inkâr).',
    examTip:
      '"Evrende kötülük ve acı varsa her şeye gücü yeten ve mutlak iyi bir Tanrı yoktur" iddiasına "Kötülük Problemi" denir.',
    isHighYield: true,
  },
  {
    id: 'rel_islamofobi_yeni_hareketler',
    term: 'Yeni Dinî Hareketler ve İslamofobi',
    shortCode: 'Güncel Meseleler',
    scopeOrSource: 'Çağdaş Din Sosyolojisi',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'AYT',
    mechanism:
      'İslamofobi İslam’a ve Müslümanlara karşı önyargılı korku ve nefret tutumudur. Yeni Dinî Hareketler (Milenyum kültleri vb.) ise geleneksel dinlerden kopuk, karizmatik liderli modern akımlardır.',
    examTip:
      'Yıkıcı yeni dinî hareketlerde liderin mutlak otoritesi, aileden koparma ve kapalı grup baskısı görülür.',
    isHighYield: false,
  },
  {
    id: 'rel_yahudilik',
    term: 'Yahudilik (Musevilik) Temel Özellikleri',
    shortCode: 'Tanah & Şabat',
    scopeOrSource: 'Yaşayan Dünya Dinleri',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kutsal kitabı Tanah (Tevrat/Tora dâhil) ve sözlü geleneği Talmud’dur. İbadet yeri Sinagog/Havra, din adamı Haham, sembolü Menora (7 kollu şamdan) ve Davud Yıldızıdır. Cumartesi günü Şabat (dinlenme) yasağı vardır.',
    examTip:
      'Önemli bayramları Roş Haşana (Yılbaşı), Yom Kippur (Kefaret günü), Fısıh (Pesah · Mısır’dan çıkış) ve Hanuka’dır; yalnız İbrani soyuna özgü millî bir din görülür.',
    isHighYield: true,
  },
  {
    id: 'rel_hristiyanlik',
    term: 'Hristiyanlık (Teslis, Mezhepler & Sakramentler)',
    shortCode: 'İznik 325',
    scopeOrSource: 'Yaşayan Dünya Dinleri',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kutsal kitabı Kitab-ı Mukaddes (Eski + Yeni Ahit/4 İncil: Matta, Markos, Luka, Yuhanna). 325 İznik Konsili’nde Teslis (Baba–Oğul–Kutsal Ruh) benimsendi. Üç ana mezhep: Katolik (Papa), Ortodoks (Patrik), Protestan (Martin Luther).',
    examTip:
      'Katolik ve Ortodokslarda Vaftiz, Evharistiya (Ekmek-Şarap) gibi 7 Sakrament varken Protestanlık yalnız Vaftiz ve Evharistiya’yı kabul eder.',
    isHighYield: true,
  },
  {
    id: 'rel_hinduizm',
    term: 'Hinduizm (Vedalar, Kast, Karma & Reenkarnasyon)',
    shortCode: 'Hint Dini',
    scopeOrSource: 'Doğu Dinleri',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kutsal metinleri Vedalar ve Upanişadlardır; kurucusu yoktur. Kast Sistemi (Brahmanlar, Kşatriyalar, Vaisyalar, Sudralar + Paryalar), Karma (eylem-karşılık yasası), Reenkarnasyon (tenasüh/yeniden doğuş) ve Mokşa (kurtuluş) temeldir.',
    examTip:
      'Hinduizmde ineğin kutsal sayılması, Ganj Nehri’nde arınma ve Brahma-Vişnu-Şiva üçlemesi ayırt edici özellikleridir.',
    isHighYield: true,
  },
  {
    id: 'rel_budizm',
    term: 'Budizm (Buda, Dört Gerçek & Nirvana)',
    shortCode: 'Sekiz Dilimli Yol',
    scopeOrSource: 'Doğu Dinleri',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'TYT_AYT',
    mechanism:
      'Kurucusu Siddhartha Gautama’dır (Buda/Uyanmış). Kutsal kitabı Tripitaka’dır (Üç Sepet). Kast sistemini reddeder; acıdan kurtuluşu "Dört Yüce Gerçek" ve "Sekiz Aşamalı Orta Yol" ile "Nirvana"ya (arzuların sönmesi) ulaşmakta görür.',
    examTip:
      'Budizm Hinduizme tepki olarak doğmuş olup ruhban/kast sınıfını reddetmesiyle Hint dışı Asya’ya hızla yayılmıştır.',
    isHighYield: true,
  },
  {
    id: 'rel_konfucyanizm_taoizm',
    term: 'Konfüçyanizm ve Taoizm (Çin Dinleri)',
    shortCode: 'Lun Yü & Yin-Yang',
    scopeOrSource: 'Uzak Doğu Dinleri',
    category: 'MEZHEP_TASAVVUF_DINLER',
    examLevel: 'AYT',
    mechanism:
      'Konfüçyanizm (Konfüçyüs · Lun Yü · ahlak, aile/devlet saygısı, Li ve Ren erdemleri); Taoizm (Lao-tzu · Tao Te King · doğayla uyum içinde Wu-Wei çabasız akış ve Yin-Yang zıtlık dengesi).',
    examTip:
      'Konfüçyanizm toplumsal düzen ve ahlakı merkeze alırken, Taoizm tabiatın akışına (Tao) uyumu vurgular.',
    isHighYield: false,
  },
];
