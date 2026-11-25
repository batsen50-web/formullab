import type {GeographyCategoryId, GeographyExamLevel, GeographyTerm} from '../types/geography';

export const GEOGRAPHY_CATEGORY_LABELS: Record<GeographyCategoryId, string> = {
  HARITA_KONUM: 'Harita & Konum',
  IKLIM_BIYOM: 'İklim & Biyom',
  YERYUZU_SU: 'Yer Şekli & Su',
  NUFUS_EKONOMI: 'Nüfus & Ekonomi',
  ULUSLARARASI_AFET: 'Küresel & Afet',
};

export const GEOGRAPHY_EXAM_LEVEL_LABELS: Record<GeographyExamLevel, string> = {
  TYT: 'TYT',
  AYT: 'AYT',
  TYT_AYT: 'TYT-AYT',
};

export const GEOGRAPHY_TERMS: GeographyTerm[] = [
  // =========================================================================
  // 1. HARITA_KONUM (16)
  // =========================================================================
  {
    id: 'geo_hk_01',
    term: 'Geoit Şekil',
    shortCode: 'r_ekv > r_kut',
    regionOrScope: 'Dünya Şekli',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Kutuplardan basık, Ekvator’dan şişkin olan Dünya şekli nedeniyle Ekvator yarıçapı (6378 km) kutuplar yarıçapından (6357 km) 21 km büyüktür.',
    examTip:
      'Ekvator’dan kutuplara yer çekiminin artması, Ekvator çevresinin tam meridyen dairesinden uzun olması doğrudan geoitliğin sonucudur.',
    isHighYield: true,
  },
  {
    id: 'geo_hk_02',
    term: 'Küresellik ve Güneş Işını',
    shortCode: 'cos φ · Ekv→Kut',
    regionOrScope: 'Dünya Şekli',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Ekvator’dan kutuplara doğru gidildikçe Güneş ışınlarının düşme açısı küçülür; gölge boyu uzar, sıcaklık ve deniz tuzluluğu genel olarak azalır.',
    examTip:
      'Çizgisel hız ve paralel boyları da kutuplara doğru azalır; ancak açısal hız Dünya’nın her yerinde eşittir (15°/saat).',
    isHighYield: true,
  },
  {
    id: 'geo_hk_03',
    term: 'Eksen Hareketi ve Sapma',
    shortCode: 'Batı → Doğu (24s)',
    regionOrScope: 'Günlük Hareket',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Dünya’nın kendi ekseni etrafında batıdan doğuya dönmesi gece-gündüzü, meltem rüzgârlarını ve dinamik basınç kuşaklarını oluşturur.',
    examTip:
      'Coriolis etkisiyle sürekli rüzgârlar ve okyanus akıntıları Kuzey Yarım Küre’de sağa, Güney Yarım Küre’de sola sapar.',
    isHighYield: true,
  },
  {
    id: 'geo_hk_04',
    term: 'Eksen Eğikliği',
    shortCode: '23° 27′ Eğim',
    regionOrScope: 'Yıllık Hareket',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Yer ekseni ile yörünge (ekliptik) düzlemi arasındaki 66° 33′ açı, Ekvator ile ekliptik arasında 23° 27′ eğiklik oluşturarak mevsimleri meydana getirir.',
    examTip:
      'Eğiklik sayesinde dönenceler (23°27′) ve kutup daireleri (66°33′) belirlenir; yıl içinde güneş ışını açısı ve gece-gündüz süresi değişir.',
    isHighYield: true,
  },
  {
    id: 'geo_hk_05',
    term: 'Elips Yörünge ve Günberi',
    shortCode: '3 Oca · 4 Tem',
    regionOrScope: 'Yörüngenin Şekli',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Dünya 3 Ocak’ta Güneş’e en yakın (Günberi/147 mln km), 4 Temmuz’da en uzak (Günöte/152 mln km) konumda olup yörünge hızı değişir.',
    examTip:
      'Temmuz’da yavaşlama yüzünden KYK yazı 2 gün uzun sürer ve sonbahar ekinoksu 21 yerine 23 Eylül’de gerçekleşir; sıcaklık sebebi uzaklık değil açıdır.',
    isHighYield: true,
  },
  {
    id: 'geo_hk_06',
    term: 'Solstisler (21 Haz – 21 Ara)',
    shortCode: '21 Haz / 21 Ara',
    regionOrScope: 'Özel Tarihler',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      '21 Haziran’da Güneş Yengeç Dönencesi’ne dik gelir (KYK en uzun gündüz); 21 Aralık’ta Oğlak Dönencesi’ne dik gelir (GYK en uzun gündüz).',
    examTip:
      '21 Haziran’da kuzeye gidildikçe gündüz uzar; 21 Aralık’ta ise kuzeye gidildikçe gece uzar. Her iki tarihte de dönencelere sadece yılda 1 kez dik düşer.',
    isHighYield: true,
  },
  {
    id: 'geo_hk_07',
    term: 'Ekinokslar (21 Mar – 23 Eyl)',
    shortCode: '12s Gündüz = Gece',
    regionOrScope: 'Özel Tarihler',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Güneş ışınları Ekvator’a dik düşer, aydınlanma çemberi kutup noktalarından geçer ve tüm dünyada 12 saat gündüz – 12 saat gece yaşanır.',
    examTip:
      'Aynı meridyen üzerindeki tüm noktalarda Güneş sadece 21 Mart ve 23 Eylül tarihlerinde aynı anda doğar ve aynı anda batar.',
    isHighYield: true,
  },
  {
    id: 'geo_hk_08',
    term: 'Coğrafi Koordinat ve Paraleller',
    shortCode: '1° Enlem = 111 km',
    regionOrScope: 'Koordinat Sistemi',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Ekvator’a paralel 90 kuzey + 90 güney dairesi arası ardışık mesafe her yerde 111 km iken, 180+180 meridyen arası mesafe yalnızca Ekvator’da 111 km’dir.',
    examTip:
      'İki nokta aynı meridyen üzerindeyse yerel saatleri aynıdır; ancak Güneş’in doğuş-batış saatleri yalnızca ekinokslarda çakışır.',
    isHighYield: false,
  },
  {
    id: 'geo_hk_09',
    term: 'Yerel Saat ve Ulusal Saat',
    shortCode: '1° = 4 dk · 45°D',
    regionOrScope: 'Zaman Hesabı',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Ardışık iki meridyen arası 4 dakika zaman farkı vardır; doğuda yerel saat ileri, batıda geridir. Türkiye tüm yıl +3 dilimi (45° Doğu) kullanır.',
    examTip:
      'Güneş tam tepe noktasındayken (en kısa gölge) o merkezde yerel saat 12.00’dir; Tarih Değiştirme Çizgisi kabaca 180° meridyenidir.',
    isHighYield: true,
  },
  {
    id: 'geo_hk_10',
    term: 'Türkiye’nin Mutlak Konumu',
    shortCode: '36°–42°K · 26°–45°D',
    regionOrScope: 'Türkiye Konumu',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      '36°–42° Kuzey enlemleri ve 26°–45° Doğu boylamları arasında yer aldığı için kuzey-güney kuş uçuşu 666 km, doğu-batı saat farkı 76 dakikadır.',
    examTip:
      'Yengeç Dönencesi’nin kuzeyinde olması nedeniyle Güneş ışınları hiçbir zaman 90° düşmez ve gölge yönü yıl boyu öğlen kuzeyi gösterir.',
    isHighYield: true,
  },
  {
    id: 'geo_hk_11',
    term: 'Türkiye’nin Göreceli Konumu',
    shortCode: '3 Kıta · 1132 m',
    regionOrScope: 'Türkiye Konumu',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Asya–Avrupa–Afrika kavşağında İstanbul/Çanakkale Boğazlarına sahip olması, ortalama 1132 m yükseltisi ve 3 tarafının denizlerle çevrili olmasıdır.',
    examTip:
      'Aynı anda dört mevsim özelliklerinin görülmesi göreceli (yer şekli + denizellik); yıl içinde dört mevsimin belirgin yaşanması ise mutlak konum sonucudur.',
    isHighYield: true,
  },
  {
    id: 'geo_hk_12',
    term: 'Harita Projeksiyonları',
    shortCode: 'Silindir · Konik · Düzlem',
    regionOrScope: 'Kartografya',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Küreyi düzleme aktarmadaki bozulmaları azaltmak için Ekvator’da silindirik, orta kuşakta konik, kutuplarda düzlem projeksiyon kullanılır.',
    examTip:
      'Türkiye orta enlem ülkesi olduğu için en az bozulma Konik Projeksiyon ile elde edilir; silindirikte kutup alanları aşırı büyür.',
    isHighYield: true,
  },
  {
    id: 'geo_hk_13',
    term: 'Harita Ölçeği ve Ayrıntı',
    shortCode: '1 / ÖP = HU / GU',
    regionOrScope: 'Ölçek Hesapları',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Payda küçüldükçe ölçek büyür (1/200.000’e kadar büyük ölçek); ayrıntı artar, düzlem alanı genişler ancak gösterilen gerçek alan daralır.',
    examTip:
      'Alan ölçeği hesabında doğrusal ölçek paydasının karesi alınır: Gerçek Alan = Harita Alanı × (Ölçek Paydası_km)².',
    isHighYield: false,
  },
  {
    id: 'geo_hk_14',
    term: 'Eğim ve Yüzde Hesabı',
    shortCode: 'Eğim = (Δh / L) × 100',
    regionOrScope: 'Harita Hesabı',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'İki nokta arasındaki yükselti farkının (m) yatay uzaklığa (m) bölünüp 100 ile (% için) veya 1000 ile (‰ için) çarpılmasıyla bulunur.',
    examTip:
      'Yatay uzaklık soruda km verildiyse paydada mutlaka metreye (×1000) çevrilmelidir; izohipslerin sıklaştığı yerde eğim artar.',
    isHighYield: false,
  },
  {
    id: 'geo_hk_15',
    term: 'İzohips (Eş Yükselti) Kuralları',
    shortCode: '0 m = Kıyı Çizgisi',
    regionOrScope: 'Topoğrafya',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Aynı yükseltideki noktaları birleştiren kapalı eğriler birbirini kesmez; kıyı çizgisi 0 m kabul edilir ve eküidistans haritada sabit kalır.',
    examTip:
      'Çevresine göre alçakta kalan kapalı çukurluklar (krater/obruk) içeriye doğru konulan küçük ok işaretiyle gösterilir; iki tepe arası alçak düzlüğe boyun denir.',
    isHighYield: true,
  },
  {
    id: 'geo_hk_16',
    term: 'İzohipsle Vadi, Sırt, Delta, Haliç',
    shortCode: 'V Ucu = Yükselti/Sırt',
    regionOrScope: 'Topoğrafya',
    category: 'HARITA_KONUM',
    examLevel: 'TYT',
    mechanism:
      'Eş yükselti eğrilerinin büklümü yüksek yere dönükse vadi, alçak yere dönükse sırt; akarsu ağzı denize çıkıntılıysa delta, karaya girintiliyse haliçtir.',
    examTip:
      'İki ya da daha fazla izohipsin üst üste çakıştığı kıyı kesimi falez (yalıyar) varlığını gösterir.',
    isHighYield: true,
  },

  // =========================================================================
  // 2. IKLIM_BIYOM (16)
  // =========================================================================
  {
    id: 'geo_ib_01',
    term: 'Atmosfer Katmanları',
    shortCode: 'Trop · Strat · Termo',
    regionOrScope: 'Atmosfer',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Gazların %75’i ve tüm iklim olayları Troposfer’de (kalınlık Ekvator’da ~16 km, kutuplarda ~9 km); Ozon tabakası Stratosfer’dedir.',
    examTip:
      'Troposfer alttan yerden yansıyan ışınlarla ısındığı için yükseldikçe sıcaklık ortalama her 200 m’de 1 °C azalır; iyonosferde radyo dalgaları yansır.',
    isHighYield: true,
  },
  {
    id: 'geo_ib_02',
    term: 'Sıcaklığın Dağılış Etmenleri',
    shortCode: 'Enlem · Yükselti · Bakı',
    regionOrScope: 'Sıcaklık',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Güneş ışınlarının geliş açısı, yükselti, kara-deniz dağılışı (denizellik/karasallık), okyanus akıntıları ve rüzgârlar yeryüzü sıcaklığını belirler.',
    examTip:
      'Türkiye’de Ocak ayında Karadeniz kıyılarının İç Anadolu’dan sıcak olması enlemle çelişir; nedeni denizelliktir. Yükselti gerçek sıcaklık ile indirgenmiş sıcaklık farkını yaratır.',
    isHighYield: true,
  },
  {
    id: 'geo_ib_03',
    term: 'İndirgenmiş Sıcaklık ve İzotermler',
    shortCode: 'T_ind = T_ger + (h/200)',
    regionOrScope: 'Sıcaklık Haritası',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Tüm merkezlerin deniz seviyesine (0 m) indirilerek yükselti etkisinin yok edildiği haritalarda izotermler çoğunlukla enlem ve karasallığı yansıtır.',
    examTip:
      'Gerçek sıcaklık ile indirgenmiş sıcaklık arasındaki farkın en fazla olduğu bölgemiz ortalama yükseltisi en fazla olan Doğu Anadolu’dur.',
    isHighYield: true,
  },
  {
    id: 'geo_ib_04',
    term: 'Basınç Merkezleri (YB ve AB)',
    shortCode: '1013 mb · Alç./Yüks.',
    regionOrScope: 'Atmosfer Basıncı',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Yüksek basınçta (antisiklon, >1013 mb) hava alçalır, merkezden çevreye dağılır ve açıktır; Alçak basınçta (siklon) hava yükselir, bulutlu ve yağışlıdır.',
    examTip:
      'Kuzey Yarım Küre’de yüksek basınç merkezinde oklar saat yönünde dışarıya (S harfi), alçak basınçta saat yönünün tersine içeriye doğru çizilir.',
    isHighYield: true,
  },
  {
    id: 'geo_ib_05',
    term: 'Türkiye’yi Etkileyen Basınçlar',
    shortCode: 'İzlanda · Sibirya · Asor · Basra',
    regionOrScope: 'Türkiye İklimi',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Kışın Sibirya (termik YB, sert ayaz) ve İzlanda (dinamik AB, ılık yağışlı); yazın Asor (dinamik YB, kurak) ve Basra (termik AB, çok sıcak-kurak) etkilidir.',
    examTip:
      'Kuzeybatıdan gelen İzlanda kışları ılık ve kar/yağmur getirirken, kuzeydoğudan gelen Sibirya karasal soğuk ve don olaylarına yol açar.',
    isHighYield: true,
  },
  {
    id: 'geo_ib_06',
    term: 'Sürekli ve Mevsimlik Rüzgârlar',
    shortCode: 'Alize · Batı · Muson',
    regionOrScope: 'Rüzgâr Sistemleri',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Alizeler 30°→0°, Batı rüzgârları 30°→60°, Kutup rüzgârları 90°→60° arasında eser. Güneydoğu Asya’da yaz musonu denizden bol yağış getirir.',
    examTip:
      'Türkiye orta kuşakta olduğu için Batı Rüzgârları kuşağındadır; Asya musonlarının oluşum nedeni kara ve denizlerin yıl içinde farklı ısınmasıdır.',
    isHighYield: false,
  },
  {
    id: 'geo_ib_07',
    term: 'Yerel Rüzgârlar (Fön & KAyıp SaKaL)',
    shortCode: 'K-Y-P / S-K-L · Fön',
    regionOrScope: 'Yerel Rüzgârlar',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Kuzeyden Karayel, Yıldız, Poyraz soğutur; güneyden Samyeli (Keşişleme), Kıble, Lodos ısıtır. Dağdan inerken her 100 m’de 1 °C ısınan rüzgâr Fön’dür.',
    examTip:
      'Fön rüzgârı Rize’de turunçgil yetişmesine, Toros ve Kuzey Anadolu yamaçlarında erken kar erimesine ve kurutucu etkiye yol açar; Ege meltemi İmbat’tır.',
    isHighYield: true,
  },
  {
    id: 'geo_ib_08',
    term: 'Nem ve Yağış Türleri',
    shortCode: 'Bağıl Nem = Mutlak/Maks',
    regionOrScope: 'Nem & Yağış',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Sıcaklık arttıkça havanın taşıyabileceği maksimum nem artar, bağıl nem düşer. Yükselen hava soğuyarak konveksiyonel (Kırkikindi), orografik (yamaç) veya cephe yağışı bırakır.',
    examTip:
      'Türkiye’de Karadeniz kıyılarında orografik, İç Anadolu’da ilkbahar konveksiyonel, Akdeniz/Ege’de kışın cephe yağışları yaygındır.',
    isHighYield: true,
  },
  {
    id: 'geo_ib_09',
    term: 'Ekvatoral ve Savan İklimleri',
    shortCode: '0°–20° Tropikal',
    regionOrScope: 'Sıcak İklimler',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Ekvatoral iklimde yıl boyu sıcaklık (~25 °C) ve konveksiyonel yağış (2000+ mm) görülür; Savanda yazlar yağışlı, kışlar kuraktır.',
    examTip:
      'Ekvatoral iklim Amazon ve Kongo havzalarında geniş yapraklı yağmur ormanları oluştururken, 10°–20° Savanda galeri ormanları ve uzun otlar bulunur.',
    isHighYield: false,
  },
  {
    id: 'geo_ib_10',
    term: 'Akdeniz İklimi',
    shortCode: '30°–40° Kış Yağışı',
    regionOrScope: 'Ilıman İklimler',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Yazları sıcak ve kurak, kışları ılık ve cephesel yağışlıdır; Akdeniz havzası, Kaliforniya, Orta Şili, Kap Bölgesi ve GB Avustralya’da görülür.',
    examTip:
      'Doğal bitki örtüsü Kızılçam ormanıdır; kızılçam tahribiyle Maki, makinin tahribiyle Garig oluşur. Toprağı kırmızı renkli Terra Rossa’dır.',
    isHighYield: true,
  },
  {
    id: 'geo_ib_11',
    term: 'Okyanusal ve Step İklimleri',
    shortCode: '40°–60° Batı Kıyısı',
    regionOrScope: 'Ilıman İklimler',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Ilıman Okyanusal iklim Batı Rüzgârları ve sıcak akıntılarla her mevsim yağışlıdır (Doğu Karadeniz benzeri); Step ikliminde yıllık yağış 300–500 mm ve ilkbahar yağışlıdır.',
    examTip:
      'Batı Avrupa’da Körfez Akıntısı (Gulf Stream) sıcaklığı artırarak Kanada doğusundan çok daha ılıman kış koşulları sağlar.',
    isHighYield: false,
  },
  {
    id: 'geo_ib_12',
    term: 'Sert Karasal, Tundra ve Kutup',
    shortCode: 'Tayga · Permafrost',
    regionOrScope: 'Soğuk İklimler',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Sert Karasal’da (Erzurum–Kars, Sibirya) yaz yağışları ve Tayga iğne yapraklı ormanları; Tundra’da yılın 9–10 ayı donmuş toprak ve yazın liken/yosun vardır.',
    examTip:
      'Erzurum–Kars platosunda yaz yağışlarıyla gür çayırlar ve dünyanın en verimli zonal toprağı olan Çernezyom gelişir.',
    isHighYield: true,
  },
  {
    id: 'geo_ib_13',
    term: 'Türkiye’nin İklim Çeşitliliği',
    shortCode: 'Akdeniz · Karad · Karasal',
    regionOrScope: 'Türkiye İklimi',
    category: 'IKLIM_BIYOM',
    examLevel: 'TYT',
    mechanism:
      'Dağların kıyıya uzanış yönü denizel etkinin iç kesimlere sokulmasını sınırlar; en çok yağışı Doğu Karadeniz (Rize), en az yağışı Tuz Gölü çevresi alır.',
    examTip:
      'Kıyı Ege’de dağlar kıyıya dik uzandığı için Akdeniz iklimi 150–200 km iç kesimlere ilerler; Karadeniz ve Akdeniz’de ise paralel uzanış iç bölgeyi kurak bırakır.',
    isHighYield: true,
  },
  {
    id: 'geo_ib_14',
    term: 'Biyomlar ve Biyoçeşitlilik',
    shortCode: 'Kara & Su Biyomları',
    regionOrScope: 'Ekosistemler',
    category: 'IKLIM_BIYOM',
    examLevel: 'AYT',
    mechanism:
      'Benzer iklim ve bitki örtüsüne sahip yaşam kuşaklarıdır; biyoçeşitlilik en fazla Tropikal Yağmur Ormanı ve Mercan Resifi biyomlarındadır.',
    examTip:
      'İklim ve yer şekilleri dışında kıtaların kayması (paleocoğrafya) aynı hayvan veya bitki fosillerinin birbirinden uzak kıtalarda bulunmasını açıklar.',
    isHighYield: true,
  },
  {
    id: 'geo_ib_15',
    term: 'Ekosistemde Enerji Akışı',
    shortCode: '%10 Kuralı (Piramit)',
    regionOrScope: 'Ekosistem İşleyişi',
    category: 'IKLIM_BIYOM',
    examLevel: 'AYT',
    mechanism:
      'Üreticilerden tüketicilere tek yönlü enerji aktarılır; her basamakta enerjinin yaklaşık %10’u bir üst basamağa geçer, ayrıştırıcılar tüm basamaklara bağlanır.',
    examTip:
      'Besin piramidinde yukarı çıkıldıkça birey sayısı ve biyokütle azalır; buna karşın dokularda biriken zehir (biyobirikim) artar.',
    isHighYield: true,
  },
  {
    id: 'geo_ib_16',
    term: 'Madde Döngüleri (Karbon & Azot)',
    shortCode: 'CO₂ · N₂ Fiksasyonu',
    regionOrScope: 'Ekosistem İşleyişi',
    category: 'IKLIM_BIYOM',
    examLevel: 'AYT',
    mechanism:
      'Fotosentez atmosferden CO₂ tüketirken solunum ve fosil yakıtlar CO₂ üretir; atmosferdeki %78’lik serbest azot şimşek ve Rhizobium bakterileriyle toprağa bağlanır.',
    examTip:
      'Karbonun en büyük doğal deposu okyanuslar ve kireç taşı/fosil kayaçlardır; denitrifikasyon bakterileri azotu tekrar atmosfere kazandırır.',
    isHighYield: true,
  },

  // =========================================================================
  // 3. YERYUZU_SU (16)
  // =========================================================================
  {
    id: 'geo_ys_01',
    term: 'Dünya’nın İç Yapısı ve Levhalar',
    shortCode: 'Kabuk · Manto · Çekirdek',
    regionOrScope: 'Tektonik',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Manto’daki konveksiyonel akımlar üzerindeki Sial (kıtasal) ve Sima (okyanusal) levhaları hareket ettirerek kıtaların kaymasına ve depremlere yol açar.',
    examTip:
      'Büyük Okyanus kıyıları (Pasifik Ateş Çemberi) ile Alp–Himalaya kuşağı ve Doğu Afrika rift hattı aktif volkanizma ve deprem alanlarıdır.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_02',
    term: 'Jeolojik Zamanlar ve Türkiye',
    shortCode: 'I. Masif · III. Alp · IV. Egeid',
    regionOrScope: 'Jeolojik Geçmiş',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'I. Zaman’da Zonguldak taş kömürü ve masif araziler; III. Zaman’da Alp–Himalaya kıvrımları, linyit-bor-petrol; IV. Zaman’da boğazların açılması ve toptan yükselme oldu.',
    examTip:
      'Türkiye’nin temel yer şekilleri genç (III. ve IV. Zaman) oluşumlu olduğu için yükseltisi fazla, akarsular denge profiline uzak ve deprem riski yüksektir.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_03',
    term: 'Kayaç Türleri ve Döngüsü',
    shortCode: 'Magmatik · Tortul · Başkalaşım',
    regionOrScope: 'Litosfer',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Magmanın soğumasıyla granit (iç) ve bazalt/obsidyen (dış) püskürükler; birikme/kimyasal yolla kumtaşı/kalker/linyit tortullar; ısı-basınçla mermer/gnays oluşur.',
    examTip:
      'Fosil barındıran tek kayaç grubu tortul (sedimanter) kayaçlardır; Ürgüp–Göreme peribacalarında tüf ve sert bazalt birlikte aşınır.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_04',
    term: 'İç Kuvvetler (Orojenez & Epirojenez)',
    shortCode: 'Kıvrım · Kırık · Kıta',
    regionOrScope: 'İç Kuvvetler',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Yan basınçlarla esnek tabakalar antiklinal/senklinal kıvrım; sert tabakalar ise faylanarak Horst/Graben kırık dağları oluşturur. Epirojenez geniş kıta yükselme/çökmesidir.',
    examTip:
      'Ege’deki Kaz, Madra, Yunt, Bozdağlar, Aydın ve Menteşe dağları horst; aralarındaki Bakırçay, Gediz, Küçük ve Büyük Menderes ovaları ise grabendir.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_05',
    term: 'Türkiye’de Volkanizma ve Depremler',
    shortCode: 'KAF · DAF · BAF',
    regionOrScope: 'Türkiye Tektoniği',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Kuzey Anadolu (KAF), Doğu Anadolu (DAF) ve Batı Anadolu (BAF) fay kuşakları sismik risk yaratır; Ağrı, Tendürek, Süphan, Nemrut ve Erciyes-Hasan Dağı genç volkanlardır.',
    examTip:
      'Mardin Eşiği, Konya–Karaman çevresi, Yıldız Dağları ve Taşeli Platosu Türkiye’de tektonik deprem riskinin en düşük olduğu alanlardandır.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_06',
    term: 'Akarsu Aşındırma ve Biriktirme Şekilleri',
    shortCode: 'Kırgıbayır · Delta · Menderes',
    regionOrScope: 'Dış Kuvvetler',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Eğimin fazla olduğu yerde çentik vadi, dev kazanı, kırgıbayır ve peribacası; eğimin azaldığı yerde ise menderes, ırmak adası, birikinti konisi ve delta ovası oluşur.',
    examTip:
      'Menderes çizen bir akarsuda eğim azalmış, boyu uzamış, yatak değiştirme artmış ve hem aşındırma hem biriktirme aynı anda gerçekleşmektedir.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_07',
    term: 'Karstik Şekiller (Kalker & Jips)',
    shortCode: 'Lapya→Polye · Traverten',
    regionOrScope: 'Dış Kuvvetler',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Kireç taşı (kalker) ve alçı taşının (jips) suda erimesiyle lapya, dolin, uvala, polye, obruk ve mağara aşınım; sarkıt, dikit, sütun ve traverten birikim şekilleri oluşur.',
    examTip:
      'Türkiye’de karstik şekiller en yaygın olarak Batı ve Orta Toroslar’da (Teke–Taşeli, Göller Yöresi); jipsli karst ise Sivas çevresinde görülür.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_08',
    term: 'Rüzgâr ve Buzul Yer Şekilleri',
    shortCode: 'Barkan · Sirk · Moren',
    regionOrScope: 'Dış Kuvvetler',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Kurak çöllerde mantar kaya, tafoni, yardang, şahit tepe ve barkan (hilal kumul); yüksek dağ ve kutuplarda sirk çukuru, hörgüç kaya, moren ve drumlin oluşur.',
    examTip:
      'Türkiye orta kuşakta yer aldığı için deniz kıyılarında buzul şekli yoktur; sirk gölleri 2200 m üzerindeki Kaçkar, Cilo, Aladağ ve Bolkar dağlarındadır.',
    isHighYield: false,
  },
  {
    id: 'geo_ys_09',
    term: 'Kıyı Tipleri',
    shortCode: 'Boyuna · Enine · Ria · Fiyort',
    regionOrScope: 'Kıyı Şekilleri',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Karadeniz ve Akdeniz’de boyuna; Ege’de enine; İstanbul-Çanakkale ve Muğla’da ria; Kaş–Finike’de dalmaçya kıyısı görülür. Fiyort ve skyer yüksek enlemlere özgüdür.',
    examTip:
      'Enine kıyılarda girinti-çıkıntı, doğal liman ve ada fazladır; Kapıdağ Yarımadası ve Sinop İnceburun tombolo, Büyükçekmece ve Ölüdeniz ise lagün örneğidir.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_10',
    term: 'Türkiye’nin Dağ, Plato ve Ovaları',
    shortCode: 'Bafra · Çukurova · Bozok',
    regionOrScope: 'Türkiye Yer Şekilleri',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Kuzey Anadolu ve Toroslar kıvrım dağları; Erzurum–Kars (lav), Teke–Taşeli (karstik), Haymana-Cihanbeyli-Obruk-Bozok (yatay duruşlu) platolardır.',
    examTip:
      'Çukurova (Seyhan–Ceyhan), Silifke (Göksu), Bafra (Kızılırmak) ve Çarşamba (Yeşilırmak) önemli delta ovalarıdır; Iğdır, Erbaa, Elbistan ve Bursa tektonik ovadır.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_11',
    term: 'Dünya Su Kaynakları ve Okyanuslar',
    shortCode: '%97,5 Tuzlu · %2,5 Tatlı',
    regionOrScope: 'Hidrosfer',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Yeryüzündeki suların %97,5’i tuzlu, %2,5’i tatlı sudur; tatlı suların %68,7’si buzullarda, %30,1’i yer altında ve yalnızca %0,3’ü yüzey göl/akarsularındadır.',
    examTip:
      'Kullanılabilir temiz tatlı suyun ezici çoğunluğu kutup/dağ buzulları ve derin yer altı akiferlerindedir.',
    isHighYield: false,
  },
  {
    id: 'geo_ys_12',
    term: 'Türkiye Akarsuları ve Havzaları',
    shortCode: 'Açık & Kapalı Havza',
    regionOrScope: 'Türkiye Suları',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Türkiye akarsularının yatak eğimi yüksek, rejimleri genellikle düzensiz ve hidroelektrik potansiyelleri fazladır; ulaşıma (Bartın Çayı hariç) elverişli değildir.',
    examTip:
      'Fırat, Dicle, Aras, Kura, Çoruh yurt dışına dökülür; Meriç ve Asi yurt dışından gelir; Van Gölü, Tuz Gölü, Göller Yöresi ve Aras-Kura kapalı havzadır.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_13',
    term: 'Türkiye Gölleri (Oluşumlarına Göre)',
    shortCode: 'Tektonik · Set · Karma',
    regionOrScope: 'Türkiye Suları',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Tuz, İznik, Sapanca, Burdur tektonik; Abant, Sera, Tortum heyelan set; Çıldır, Erçek volkanik set; Köyceğiz, Bafa, Mogan alüvyal set gölleridir.',
    examTip:
      'Van Gölü (tektonik + Nemrut volkanik set) ve Beyşehir/Eğirdir (tektonik + karstik) karma oluşumlu göllerdir; göl suyunu gideğenle boşaltanların suları tatlıdır.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_14',
    term: 'Zonal Topraklar',
    shortCode: 'Laterit · Terra · Çernezyom',
    regionOrScope: 'Toprak Tipleri',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'İklim ve ana kaya kontrolünde A, B, C, D horizonlu topraklardır: Akdeniz’de Terra Rossa, soğuk-nemlide Podzol, Ekvator’da Laterit, stepte Kestane/Kahverengi.',
    examTip:
      'Karadeniz kıyısında aşırı yıkanma nedeniyle kireç ve tuz bakımından fakir kahverengi orman/lateritleşmiş topraklar yaygındır.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_15',
    term: 'Azonal ve İntrazonal Topraklar',
    shortCode: 'Alüvyal · Vertisol · Regosol',
    regionOrScope: 'Toprak Tipleri',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'Dış kuvvetlerin taşıdığı horizonsuz genç topraklar (alüvyal, lös, moren, regosol, kolüvyal) çok verimlidir; killi Vertisol (dönen toprak) Ergene ve Muş’ta görülür.',
    examTip:
      'Volkanik kumlu Regosol topraklar Nevşehir–Niğde patates ve bağcılığı için çok elverişlidir; Tuz Gölü ve Konya’da Halomorfik (tuzlu) topraklar vardır.',
    isHighYield: true,
  },
  {
    id: 'geo_ys_16',
    term: 'Türkiye Bitkileri (Endemik & Relikt)',
    shortCode: '12.000 Tür · 3.800 End.',
    regionOrScope: 'Bitki Coğrafyası',
    category: 'YERYUZU_SU',
    examLevel: 'TYT',
    mechanism:
      'İklim geçişi, yükselti ve jeolojik geçmiş sayesinde ~12.000 bitki türünün ~3.800’ü endemik, yaklaşık beşte biri kalıntı (relikt) türdür.',
    examTip:
      'Köyceğiz Sığla ağacı, Eğirdir Kasnak meşesi, Datça hurması ve Kazdağı göknarı başlıca endemik türlerdir; Psödomaki Karadeniz’de tahrip alanlarında görülür.',
    isHighYield: true,
  },

  // =========================================================================
  // 4. NUFUS_EKONOMI (16)
  // =========================================================================
  {
    id: 'geo_ne_01',
    term: 'Nüfus Sayımları ve Sıfır Nüfus',
    shortCode: 'De Facto / De Jure',
    regionOrScope: 'Nüfus Bilimi',
    category: 'NUFUS_EKONOMI',
    examLevel: 'TYT',
    mechanism:
      'Modern ilk sayımlar İskandinav ülkelerinde başlamış, Türkiye’de 1927’de de facto (sayım günü bulunulan yer), 2007’den beri ADNKS (de jure) uygulanmaktadır.',
    examTip:
      'Tarihte nüfus üç büyük sıçrama yaşadı: Alet yapımı (1), Yerleşik tarım (2) ve Sanayi Devrimi (3). Doğal artış doğum–ölüm; gerçek artış göçleri de içerir.',
    isHighYield: false,
  },
  {
    id: 'geo_ne_02',
    term: 'Nüfus Piramitleri (5 Temel Tip)',
    shortCode: 'Kenar İçe · Arı Kovanı · Çan',
    regionOrScope: 'Nüfus Yapısı',
    category: 'NUFUS_EKONOMI',
    examLevel: 'TYT',
    mechanism:
      'Kenarları içe çökük piramit yüksek doğum/ölümü (az gelişmiş); arı kovanı düşük doğum/ölüm ve yaşlı nüfusu (gelişmiş); tabanı daralan piramit doğurganlık düşüşünü gösterir.',
    examTip:
      'Çan şekilli piramit (ABD, Kanada) düşük doğumun ardından artışa geçişi; asimetrik/tabanı hızla daralan piramit (Türkiye, Çin) doğurganlık hızındaki ani düşüşü anlatır.',
    isHighYield: true,
  },
  {
    id: 'geo_ne_03',
    term: 'Türkiye Nüfusu ve Politikaları',
    shortCode: '85,3 Milyon · %93 Kent',
    regionOrScope: 'Türkiye Nüfusu',
    category: 'NUFUS_EKONOMI',
    examLevel: 'TYT_AYT',
    mechanism:
      '2023 TÜİK’e göre 85,37 milyon nüfusun %93’ü il-ilçe merkezlerinde; çalışanların %56,5’i hizmet, %27,7’si sanayi ve %15,8’i tarım sektöründedir.',
    examTip:
      '1923–1965 arası artırıcı, 1965–2005 arası azaltıcı/planlamacı, 2005 sonrası ise niteliği ve doğurganlığı artırıcı nüfus politikası uygulanmıştır.',
    isHighYield: true,
  },
  {
    id: 'geo_ne_04',
    term: 'Kırsal Yerleşmeler ve Sakin Şehir',
    shortCode: 'Köy Altı · Cittaslow',
    regionOrScope: 'Yerleşme',
    category: 'NUFUS_EKONOMI',
    examLevel: 'TYT_AYT',
    mechanism:
      'Su kaynağı yetersiz İç Anadolu’da toplu yerleşme; engebeli ve suyun bol olduğu Doğu Karadeniz’de dağınık yerleşme görülür. Yayla, mezra, divan ve oba köy altı yerleşmeleridir.',
    examTip:
      'Sakin Şehir (Cittaslow) ağına Türkiye’den ilk katılan yerleşim Seferihisar (İzmir) olup Safranbolu, Kemaliye, Halfeti, Ahlat ve Şavşat ağ üyeleridir.',
    isHighYield: true,
  },
  {
    id: 'geo_ne_05',
    term: 'Kentsel Fonksiyonlar ve Küresel Şehir',
    shortCode: 'Metropol · Etki Alanı',
    regionOrScope: 'Şehir Coğrafyası',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    mechanism:
      'New York, Londra ve Tokyo küresel etkiye; Roma, Kudüs ve Mekke dinî etkiye; Oxford ve Cambridge eğitim; Essen ve Manchester sanayi fonksiyonuna sahiptir.',
    examTip:
      'İdari şehirlerin küresel ölçekte etki kazanması yalnız nüfusa değil finans, borsa, teknoloji, diplomasi ve ulaşım bağlantılarına bağlıdır.',
    isHighYield: true,
  },
  {
    id: 'geo_ne_06',
    term: 'Göç Türleri ve Beyin Göçü',
    shortCode: 'İç · Dış · Mübadele · Beyin',
    regionOrScope: 'Göçler',
    category: 'NUFUS_EKONOMI',
    examLevel: 'TYT',
    mechanism:
      'Ekonomik fırsat arama gönüllü, Lozan 1923 nüfus mübadelesi zorunlu, mevsimlik tarım/turizm geçici, yetişmiş uzman göçü ise beyin göçüdür.',
    examTip:
      'Türkiye’de iç göçlerde en büyük yön kırdan kente ve doğudan batıya (İstanbul, Ankara, İzmir, Bursa, Kocaeli, Antalya) doğrudur.',
    isHighYield: true,
  },
  {
    id: 'geo_ne_07',
    term: 'Ekonomik Faaliyet Türleri (I–V)',
    shortCode: 'Birincil → Beşincil',
    regionOrScope: 'Ekonomi Coğrafyası',
    category: 'NUFUS_EKONOMI',
    examLevel: 'TYT',
    mechanism:
      'Birincil tarım-madencilik, ikincil sanayi-enerji, üçüncül hizmet-ticaret-turizm, dördüncül Ar-Ge ve bilişim, beşincil ise üst düzey karar verici yöneticilerdir.',
    examTip:
      'Gelişmiş ülkelerde çalışanların çok büyük oranı üçüncül, dördüncül ve beşincil sektörlerde yoğunlaşır.',
    isHighYield: true,
  },
  {
    id: 'geo_ne_08',
    term: 'Türkiye’de Tarım ve İklim İlişkisi',
    shortCode: 'Çay · Fındık · İncir · Zeytin',
    regionOrScope: 'Türkiye Ekonomisi',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    mechanism:
      'Çay (%100 Doğu Karadeniz) ve fındık Karadeniz; incir (Aydın) ve üzüm Ege; zeytin ve turunçgil Akdeniz-Ege; şeker pancarı ve buğday iç bölgelerde yoğunlaşır.',
    examTip:
      'GAP ile sulamanın artması sonucu pamuk üretiminde Şanlıurfa açık ara lider konuma geçmiş, mısırda ise Konya birinci sıraya yerleşmiştir.',
    isHighYield: true,
  },
  {
    id: 'geo_ne_09',
    term: 'Hayvancılık, Ormancılık ve Su Ürünleri',
    shortCode: 'Mera · Besi · Arıcılık',
    regionOrScope: 'Türkiye Ekonomisi',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    mechanism:
      'Erzurum–Kars ve Doğu Karadeniz’de mera büyükbaş hayvancılığı; büyük kent çevresinde besi hayvancılığı; İç ve Doğu Anadolu’da küçükbaş; Ordu-Muğla’da arıcılık gelişmiştir.',
    examTip:
      'Türkiye’de deniz balıkçılığında %70’i aşan pay Karadeniz’e aittir; orman varlığında ise en yüksek pay %25 ile Karadeniz bölgesindedir.',
    isHighYield: false,
  },
  {
    id: 'geo_ne_10',
    term: 'Türkiye Madenleri',
    shortCode: 'Bor · Krom · Demir · Bakır',
    regionOrScope: 'Madenler',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    mechanism:
      'Dünya bor rezervinin ~%73’ü Türkiye’de (Balıkesir, Kütahya, Eskişehir Kırka, Bursa); demir Sivas Divriği–Malatya Hekimhan; bakır Artvin Murgul–Kastamonu Küre–Elazığ Maden’dedir.',
    examTip:
      'Krom Elazığ Guleman ve Muğla Köyceğiz’de; boksit Konya Seydişehir’de; fosfat Mardin Mazıdağı’nda çıkarılır.',
    isHighYield: true,
  },
  {
    id: 'geo_ne_11',
    term: 'Türkiye Enerji Kaynakları',
    shortCode: 'Linyit · Taş Kömürü · Jeotermal',
    regionOrScope: 'Enerji Coğrafyası',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    mechanism:
      'Taş kömürü Zonguldak–Bartın’da (demir-çelik için); linyit Afşin-Elbistan, Soma, Yatağan, Tunçbilek’te; petrol Batman–Adıyaman–Diyarbakır’da; jeotermal Batı Anadolu’dadır.',
    examTip:
      'Denizli Sarayköy ve Aydın Germencik Türkiye’nin ilk ve en büyük jeotermal santral sahalarıdır; güneş enerjisi potansiyeli en yüksek bölge Güneydoğu Anadolu ve Konya çevresidir.',
    isHighYield: true,
  },
  {
    id: 'geo_ne_12',
    term: 'Türkiye Sanayisi ve Kuruluş Şartları',
    shortCode: 'Ham Madde · Ulaşım · Enerji',
    regionOrScope: 'Sanayi Coğrafyası',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    mechanism:
      'Çabuk bozulan şeker, çay ve konserve fabrikaları ham maddeye; demir-çelik ise enerji (Karabük–Ereğli taş kömürü) ve ulaşım/limana (İskenderun) yakın kurulur.',
    examTip:
      'İzmit, İzmir-Aliağa ve Kırıkkale petrol rafinerilerinin kuruluşunda ulaşım (boru hattı/liman) ve pazar etkiliyken, Batman rafinerisinde ham madde etkilidir.',
    isHighYield: true,
  },
  {
    id: 'geo_ne_13',
    term: 'Bölge Sınıflaması (Şekilsel & İşlevsel)',
    shortCode: 'Doğal / Beşerî · Hizmet',
    regionOrScope: 'Bölge Kavramı',
    category: 'NUFUS_EKONOMI',
    examLevel: 'TYT_AYT',
    mechanism:
      'Dağlık veya iklim gibi doğal şekilsel bölgelerin sınırları çok yavaş değişirken; tarım, nüfus veya işlevsel hizmet/kalkınma bölgelerinin sınırları daha hızlı değişir.',
    examTip:
      'Akdeniz İklim Bölgesi ile Zeytin Tarım Bölgesi sınırları büyük ölçüde örtüşür; ancak işlevsel bölgeler bir merkezden (meteoroloji, DSİ, KGM) yönetilir.',
    isHighYield: true,
  },
  {
    id: 'geo_ne_14',
    term: 'Bölgesel Kalkınma Projeleri (GAP – KOP)',
    shortCode: 'GAP · KOP · DAP · DOKAP',
    regionOrScope: 'Türkiye Planlaması',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    mechanism:
      'GAP (Fırat–Dicle sulama ve 14 HES), KOP (Konya Kapalı Havzası Mavi Tünel su aktarımı), DAP (hayvancılık/enerji) ve DOKAP (Yeşil Yol ekoturizm/tarım) projeleridir.',
    examTip:
      'ZBK (Zonguldak–Bartın–Karabük) taş kömürü ve demir-çelik dönüşümü odaklıdır; YHGP ise Yeşilırmak Havzası’nda erozyon ve taşkın önlemeye odaklanır.',
    isHighYield: true,
  },
  {
    id: 'geo_ne_15',
    term: 'Küresel Ticaret ve Üretim Bölgeleri',
    shortCode: 'Pazar · Sanayi · Hammadde',
    regionOrScope: 'Küresel Ekonomi',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    mechanism:
      'Kuzey Amerika, Batı Avrupa ve Doğu Asya küresel üretim ve tüketim merkezleriyken; Orta Doğu ve Rusya enerji ham maddesinde öne çıkar.',
    examTip:
      'Dünya ticaretinde deniz yolu ulaşımı en düşük birim maliyet ve tek seferde en büyük yük kapasitesi nedeniyle birinci sıradadır.',
    isHighYield: false,
  },
  {
    id: 'geo_ne_16',
    term: 'Türkiye Ulaşım, Turizm ve Dış Ticaret',
    shortCode: 'Liman · YHT · Ekoturizm',
    regionOrScope: 'Hizmet Sektörü',
    category: 'NUFUS_EKONOMI',
    examLevel: 'AYT',
    mechanism:
      'Dağların kıyıya paralel uzandığı Karadeniz ve Akdeniz’de iç ulaşım Zigana, Kop, Sertavul, Gülek ve Belen geçitleri ile tünellerden sağlanır.',
    examTip:
      'Demir yolu ağı olan limanların (İzmir, Mersin, Samsun, İskenderun) hinterlandı geniş; Trabzon ve Sinop limanlarının hinterlandı ise dağlar nedeniyle dardır.',
    isHighYield: true,
  },

  // =========================================================================
  // 5. ULUSLARARASI_AFET (16)
  // =========================================================================
  {
    id: 'geo_ua_01',
    term: 'Cebelitarık, İstanbul ve Çanakkale Boğazları',
    shortCode: 'Atlas ↔ Akdeniz ↔ Karadeniz',
    regionOrScope: 'Su Yolları',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Cebelitarık Akdeniz’i Atlas Okyanusu’na; Çanakkale ve İstanbul boğazları ise Karadeniz’i Marmara ve Ege üzerinden Akdeniz’e bağlayan doğal boğazlardır.',
    examTip:
      'Karadeniz ülkelerinin açık denizlere çıkışı yalnızca Türk Boğazları’yla mümkündür; buradaki gemi trafiği Panama’nın ~4 katıdır.',
    isHighYield: true,
  },
  {
    id: 'geo_ua_02',
    term: 'Süveyş, Babülmendep ve Hürmüz',
    shortCode: 'Akdeniz ↔ Kızıldeniz ↔ Basra',
    regionOrScope: 'Su Yolları',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Süveyş Kanalı (1869) Akdeniz ile Kızıldeniz’i birleştirerek Ümit Burnu yolunu kısalttı; Babülmendep Kızıldeniz çıkışını, Hürmüz Boğazı ise Basra Körfezi petrol çıkışını kontrol eder.',
    examTip:
      'Avrupa’dan Hindistan ve Çin’e giden en kısa deniz yolu sırasıyla Cebelitarık → Süveyş → Babülmendep → Malakka geçitlerini kullanır.',
    isHighYield: true,
  },
  {
    id: 'geo_ua_03',
    term: 'Panama, Kiel ve Malakka Geçitleri',
    shortCode: 'Atlantik ↔ Pasifik · Asya',
    regionOrScope: 'Su Yolları',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Panama Kanalı (1914) Atlantik ile Pasifik arasındaki Macellan Boğazı ihtiyacını azalttı; Kiel Kuzey–Baltık denizlerini, Malakka ise Hint Okyanusu–Güney Çin Denizi’ni bağlar.',
    examTip:
      'Boğazlar doğal, kanallar (Panama, Süveyş, Kiel, Korint) ise insan yapımı su yollarıdır; Bering Boğazı Asya ile Kuzey Amerika’yı ayırır.',
    isHighYield: true,
  },
  {
    id: 'geo_ua_04',
    term: 'İlk Kültür Merkezleri',
    shortCode: 'Mezopotamya · Mısır · Hint · Çin',
    regionOrScope: 'Kültür Coğrafyası',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    mechanism:
      'Mezopotamya (Fırat–Dicle), Mısır (Nil), Hint (İndus–Ganj), Çin (Sarı–Gök Irmak) ile yüksek enlemli Aztek–Maya–İnka uygarlıkları ilk kültür merkezleridir.',
    examTip:
      'Eski Dünya uygarlıkları verimli akarsu vadileri ve ılıman iklimde doğarken, İnka (And Dağları) Ekvator sıcaklığı nedeniyle yüksek dağlarda kurulmuştur.',
    isHighYield: true,
  },
  {
    id: 'geo_ua_05',
    term: 'Türk Kültürü ve Anadolu Medeniyetleri',
    shortCode: 'Orta Asya → Anadolu',
    regionOrScope: 'Kültür Coğrafyası',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    mechanism:
      'Orta Asya bozkırlarında göçebe hayvancılık ve at kültürüyle doğan Türk kültürü göçlerle Anadolu ve Balkanlara yayılıp İslam ve yerel kültürlerle sentezlenmiştir.',
    examTip:
      'Anadolu’da Hitit, Frig, Lidya, İyon ve Urartu uygarlıklarının gelişmesinde verimli tarım alanları, su ve ticaret yolları (Kral Yolu) belirleyicidir.',
    isHighYield: false,
  },
  {
    id: 'geo_ua_06',
    term: 'Küresel Örgütler (BM · NATO · OECD)',
    shortCode: 'BM (5 Daimî) · NATO (1952)',
    regionOrScope: 'Jeopolitik',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    mechanism:
      'Birleşmiş Milletler’in 5 daimî üyesi (ABD, Rusya, Çin, İngiltere, Fransa) veto hakkına sahiptir; Türkiye 1952’de NATO’ya katılmış, 32 üyeli savunma ittifakıdır.',
    examTip:
      'OPEC petrol ihraç eden ülkeler örgütüdür; G-20 ise dünyanın önde gelen gelişmiş ve Türkiye dahil gelişmekte olan 19 ekonomisi + AB’den oluşur.',
    isHighYield: true,
  },
  {
    id: 'geo_ua_07',
    term: 'Bölgesel Örgütler (AB · KEİ · D-8)',
    shortCode: 'AB · KEİ (1992) · D-8 (1997)',
    regionOrScope: 'Jeopolitik',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    mechanism:
      'Karadeniz Ekonomik İşbirliği (KEİ, 1992) ve Gelişen Sekiz Ülke (D-8, 1997) Türkiye’nin öncülüğünde İstanbul merkezli kurulan uluslararası iş birliği örgütleridir.',
    examTip:
      'NAFTA (USMCA) Kuzey Amerika; BDT ise Sovyetler Birliği sonrası bağımsız cumhuriyetlerin oluşturduğu bölgesel örgüttür.',
    isHighYield: true,
  },
  {
    id: 'geo_ua_08',
    term: 'Türkiye ve Enerji Nakil Hatları',
    shortCode: 'TANAP · BTC · TürkAkım',
    regionOrScope: 'Jeopolitik',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    mechanism:
      'Bakü–Tiflis–Ceyhan (BTC) ve Kerkük–Yumurtalık ham petrol; TANAP, Mavi Akım ve TürkAkım ise doğal gaz taşıyarak Türkiye’yi enerji koridoruna dönüştürür.',
    examTip:
      'TANAP, Azerbaycan Şah Deniz doğal gazını Gürcistan ve Türkiye üzerinden Avrupa’ya (TAP bağlantısı) ulaştıran stratejik projedir.',
    isHighYield: true,
  },
  {
    id: 'geo_ua_09',
    term: 'Sıcak Çatışma Bölgeleri ve Sınıraşan Sular',
    shortCode: 'Orta Doğu · Fırat-Dicle · Nil',
    regionOrScope: 'Jeopolitik',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    mechanism:
      'Orta Doğu (petrol ve kutsal yerler), Kafkasya ve Doğu Avrupa enerji ve sınır anlaşmazlıklarıyla; Fırat–Dicle ve Nil ise sınıraşan su paylaşımı nedeniyle kritik alanlardır.',
    examTip:
      'Sınıraşan su sorunlarında kaynak ülkenin baraj projeleri ile mansap (aşağı çığır) ülkelerinin tarımsal su talepleri arasında gerilim yaşanabilir.',
    isHighYield: false,
  },
  {
    id: 'geo_ua_10',
    term: 'Jeolojik ve Hidrometeorolojik Afetler',
    shortCode: 'Deprem · Tsunami · Sel · Kuraklık',
    regionOrScope: 'Doğal Afetler',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Deprem, tsunami ve volkanizma jeolojik-jeomorfolojik kökenliyken; sel, fırtına, kasırga, çığ ve kuraklık meteorolojik-klimatolojik kökenli afetlerdir.',
    examTip:
      'Kuraklık yavaş gelişen ancak en geniş alanda ve en uzun sürede sosyoekonomik etki bırakan afettir; heyelan ise eğim, kil, yağış ve tabaka yönüne bağlı kütle hareketidir.',
    isHighYield: true,
  },
  {
    id: 'geo_ua_11',
    term: 'Türkiye’de Afetler ve Önlemler',
    shortCode: 'Heyelan (Karad.) · Erozyon',
    regionOrScope: 'Türkiye Afetleri',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Türkiye’de heyelan en çok Doğu Karadeniz’de (ilkbahar kar erimesi + eğim + yağış); çığ Doğu Anadolu’da; orman yangınları Akdeniz–Ege kıyılarında görülür.',
    examTip:
      'Ağaçlandırma erozyonu (toprağın süpürülmesi) önlemede çok etkilidir; ancak derin kayma olan heyelanı tek başına ağaç dikmek durduramaz (istinat duvarı/drenaj gerekir).',
    isHighYield: true,
  },
  {
    id: 'geo_ua_12',
    term: 'Hava Kirliliği ve Ozon Seyrelmesi',
    shortCode: 'Londra · Los Angeles · CFC',
    regionOrScope: 'Çevre Sorunları',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    mechanism:
      'Kükürtlü kömür dumanıyla Londra tipi (kış), egzoz gazlarının güneş ışığıyla tepkimesiyle Los Angeles tipi (fotokimyasal yaz) hava kirliliği oluşur; CFC gazları ozonu inceltir.',
    examTip:
      '1987 Montreal Protokolü ozon tabakasını incelten kloroflorokarbon (CFC) gazlarının üretim ve tüketimini yasaklamada başarılı olmuş küresel antlaşmadır.',
    isHighYield: true,
  },
  {
    id: 'geo_ua_13',
    term: 'Küresel İklim Değişikliği ve Paris',
    shortCode: 'Sera Gazı · Kyoto · Paris (<2 °C)',
    regionOrScope: 'Çevre Sorunları',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    mechanism:
      'CO₂, metan (CH₄) ve diazot monoksitin artışı sera etkisini güçlendirir; 1997 Kyoto ve 2015 Paris Anlaşması sıcaklık artışını 1,5–2 °C ile sınırlamayı hedefler.',
    examTip:
      'Türkiye 2021’de Paris İklim Anlaşması’nı onaylayarak 2053 net sıfır emisyon hedefini açıklamıştır.',
    isHighYield: true,
  },
  {
    id: 'geo_ua_14',
    term: 'Sulak Alanlar ve Ramsar Sözleşmesi',
    shortCode: 'Ramsar 1971 · 14 Alan TR',
    regionOrScope: 'Çevre Sözleşmeleri',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    mechanism:
      '1971 Ramsar Sözleşmesi göçmen kuşlar ve biyoçeşitlilik için kritik sulak alanları korur; Manyas Kuş Cenneti, Göksu Deltası ve Kızılırmak Deltası Türkiye’deki alanlardandır.',
    examTip:
      'CITES (1973) nesli tehlikedeki yabani bitki ve hayvanların uluslararası ticaretini denetleyen sözleşmedir.',
    isHighYield: false,
  },
  {
    id: 'geo_ua_15',
    term: 'Atık Yönetimi ve Sıfır Atık',
    shortCode: 'Azalt · Yeniden Kullan · Dönüştür',
    regionOrScope: 'Sürdürülebilirlik',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    mechanism:
      'Atıkların kaynağında azaltılması, ayrıştırılması ve geri kazanılması ham madde tüketimini ve ekolojik ayak izini küçültür.',
    examTip:
      'Türkiye’de 2017’de başlatılan Sıfır Atık Projesi, BM Genel Kurulu tarafından 30 Mart Uluslararası Sıfır Atık Günü kararıyla küresel ölçekte benimsenmiştir.',
    isHighYield: true,
  },
  {
    id: 'geo_ua_16',
    term: 'UNESCO Dünya Mirası ve Türkiye',
    shortCode: '21 Miras · Gordion (2023)',
    regionOrScope: 'Kültürel Miras',
    category: 'ULUSLARARASI_AFET',
    examLevel: 'AYT',
    mechanism:
      'Türkiye’de Göreme–Kapadokya ile Pamukkale–Hierapolis hem doğal hem kültürel (karma) miras; Göbeklitepe, Efes, Divriği, Troya ve 2023’te Gordion ile Ahşap Camiler listededir.',
    examTip:
      'Sorularda en sık çıkan iki karma miras alanı Kapadokya (Nevşehir) ve Pamukkale–Hierapolis (Denizli) olarak bilinmelidir.',
    isHighYield: true,
  },
];
