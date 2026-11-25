import type {PhysicsExamQuestion} from '../types/physics';

export const PHYSICS_EXAM_QUESTIONS: PhysicsExamQuestion[] = [
  // ==========================================
  // 1. MADDE & MEKANİK (8 soru)
  // ==========================================
  {
    id: 'physq-01',
    category: 'MADDE_HAREKET',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'SI birim sisteminde temel büyüklükler ve birimleri eşleştirilirken yapılan aşağıdaki eşleştirmelerden hangisi yanlıştır?',
    choices: [
      'Sıcaklık — Santigrat derece (°C)',
      'Akım şiddeti — Amper (A)',
      'Işık şiddeti — Kandela (cd)',
      'Madde miktarı — Mol (mol)',
    ],
    correctIndex: 0,
    examTip: 'SI sisteminde sıcaklığın temel birimi Santigrat değil Kelvin (K) olarak kabul edilir.',
    relatedTermId: 'phys-temel-buyuklukler',
  },
  {
    id: 'physq-02',
    category: 'MADDE_HAREKET',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Aynı maddeden yapılmış içleri dolu küp biçimindeki X ve Y cisimlerinden Y’nin bir ayrıtı X’in 2 katıdır. Buna göre Y’nin kendi ağırlığına karşı dayanıklılığı X’in kaç katıdır?',
    choices: ['1/2', '2', '4', '1/4'],
    correctIndex: 0,
    examTip:
      'Düzgün prizmalarda dayanıklılık Kesit Alanı / Hacim = 1/h ile orantılıdır; boyut 2 katına çıkınca dayanıklılık yarıya düşer.',
    relatedTermId: 'phys-dayaniklilik',
  },
  {
    id: 'physq-03',
    category: 'MADDE_HAREKET',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Kılcal bir cam borunun su içine daldırıldığında suyun yükselmesi, cıva içine daldırıldığında ise cıvanın alçalması olayları için hangisi doğrudur?',
    choices: [
      'Suda adezyon kohezyondan, cıvada ise kohezyon adezyondan büyüktür.',
      'Her iki sıvıda da adezyon kuvveti kohezyondan büyüktür.',
      'Cıvada yüzey gerilimi sıfır olduğu için sıvı alçalır.',
      'Boru çapı büyüdükçe suyun yükselme miktarı artar.',
    ],
    correctIndex: 0,
    examTip:
      'Islatan sıvılarda (su-cam) adezyon > kohezyon olduğu için içbükey menisküs ve yükselme; ıslatmayanlarda (cıva-cam) kohezyon > adezyon olduğu için alçalma görülür.',
    relatedTermId: 'phys-adezyon-kohezyon',
  },
  {
    id: 'physq-04',
    category: 'MADDE_HAREKET',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Yatay düzlemde durmakta olan 4 kg kütleli cisme uygulanan yatay kuvvet 12 N’dır. Yüzey ile cisim arasındaki statik sürtünme katsayısı k_s = 0,5 ve g = 10 m/s² olduğuna göre cisme etkiyen sürtünme kuvveti kaç N olur?',
    choices: ['12 N', '20 N', '8 N', '0 N'],
    correctIndex: 0,
    examTip:
      'Maksimum statik sürtünme f_max = 0,5 × 40 = 20 N’dır. Uygulanan 12 N kuvvet cismi hareket ettiremediğinden statik sürtünme uygulanan kuvvete eşit (12 N) olur.',
    relatedTermId: 'phys-surtunme',
  },
  {
    id: 'physq-05',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Akıntı hızının kıyıya paralel ve sabit v_a olduğu bir nehirde, suya göre hızı v olan bir yüzücü karşı kıyıya dik olarak yüzmeye başlıyor. Akıntı hızı artırılsaydı aşağıdakilerden hangisi değişirdi?',
    choices: [
      'Yüzücünün karşı kıyıda sürüklendiği yatay mesafe artardı.',
      'Yüzücünün karşı kıyıya geçme süresi kısalırdı.',
      'Yüzücünün karşı kıyıya geçme süresi uzardı.',
      'Yüzücünün suya göre hızının büyüklüğü artardı.',
    ],
    correctIndex: 0,
    examTip:
      'Karşıya geçme süresini yalnızca kıyıya dik hız bileşeni belirler; kıyıya paralel akıntı yalnızca sürüklenmeyi (x = v_x · t) değiştirir.',
    relatedTermId: 'phys-bagil-hareket',
  },
  {
    id: 'physq-06',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Hava sürtünmesinin ihmal edildiği bir ortamda aynı noktadan eşit büyüklükteki v₀ hızlarıyla yatayla 37° ve 53° açı yapacak biçimde eğik atılan K ve L cisimleri için hangisi kesinlikle eşittir?',
    choices: [
      'Yatayda aldıkları menzil uzaklıkları',
      'Çıkabildikleri maksimum yükseklikler',
      'Havada kalma (uçuş) süreleri',
      'Tepe noktasındaki anlık hız büyüklükleri',
    ],
    correctIndex: 0,
    examTip:
      'Birbirini 90°’ye tamamlayan açılarla (37° + 53° = 90°) aynı ilk hızla atılan cisimlerin yatay menzilleri eşittir.',
    relatedTermId: 'phys-egik-atis',
  },
  {
    id: 'physq-07',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Sürtünmesiz yatay düzlemde sabit v hızıyla hareket eden m kütleli bir oyuncak vagonuna düşey yukarıdan m kütleli bir kum torbası düşüp yapışıyor. Yeni sistemin ortak hızı ve kinetik enerjisi için ne söylenir?',
    choices: [
      'Ortak hız v/2 olur, toplam kinetik enerji azalır.',
      'Ortak hız v olur, toplam kinetik enerji korunur.',
      'Ortak hız v/2 olur, toplam kinetik enerji değişmez.',
      'Ortak hız 2v olur, toplam momentum artar.',
    ],
    correctIndex: 0,
    examTip:
      'Yatayda dış kuvvet olmadığından momentum korunur (m·v = 2m·v_ort ⇒ v_ort = v/2), ancak esnek olmayan yapışma ısıya enerji kaybettirir.',
    relatedTermId: 'phys-itme-momentum',
  },
  {
    id: 'physq-08',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Sürtünmelerin ihmal edildiği bir palanga sisteminde 120 N’lık yük 30 N kuvvetle dengelenebilmektedir. Yükü 2 m yükseltmek için kuvvetin uygulandığı ip kaç metre çekilmelidir?',
    choices: ['8 m', '4 m', '2 m', '6 m'],
    correctIndex: 0,
    examTip:
      'İdeal basit makinelerde kuvvetten kazanç (120/30 = 4 kat) oranında yoldan kayıp olur; ip 2 × 4 = 8 m çekilir.',
    relatedTermId: 'phys-basit-makineler',
  },

  // ==========================================
  // 2. ISI, BASINÇ & KALDIRMA (8 soru)
  // ==========================================
  {
    id: 'physq-09',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Sıcaklık ve ısı kavramlarıyla ilgili aşağıdaki ifadelerden hangisi bilimsel olarak doğrudur?',
    choices: [
      'Isı, sıcaklık farkı nedeniyle bir sistemden diğerine aktarılan enerjidir.',
      'Bir bardak sıcak çayın ısısı, bir kova ılık suyun ısısından büyüktür.',
      'Sıcaklık kalorimetre kabı ile ölçülür ve birimi Joule’dür.',
      '20 °C sıcaklıktaki bir cismin sıcaklığı 10 °C’nin tam iki katıdır.',
    ],
    correctIndex: 0,
    examTip:
      'Bir cismin "ısısı" olmaz, iç enerjisi vardır. Sıcaklık termometreyle ölçülür ve iki kat karşılaştırma yalnızca Kelvin cinsinden yapılır.',
    relatedTermId: 'phys-isi-sicaklik',
  },
  {
    id: 'physq-10',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Özdeş ısıtıcılarla eşit süre ısıtılan eşit kütleli X ve Y saf katılarından X’in sıcaklığı ΔT, Y’nin sıcaklığı ise 2ΔT artıyor (hâl değişimi yok). Buna göre X ve Y için hangisi doğrudur?',
    choices: [
      'X’in öz ısısı, Y’nin öz ısısının 2 katıdır.',
      'Y’nin ısı sığası, X’in ısı sığasından büyüktür.',
      'X ve Y aynı cins maddelerdir.',
      'Y’ye verilen ısı enerjisi X’e verilenden daha fazladır.',
    ],
    correctIndex: 0,
    examTip:
      'Q = m·c·ΔT eşitliğinde Q ve m aynı iken sıcaklık artışı ΔT küçük olan X’in öz ısısı c daha büyüktür (c_X = 2·c_Y).',
    relatedTermId: 'phys-ozisi-qmc',
  },
  {
    id: 'physq-11',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Saf bir katı maddenin erime sıcaklığında bulunduğu sırada dışarıdan ısı almaya devam ettiği görülüyor. Bu süreçte madde ile ilgili hangisi doğrudur?',
    choices: [
      'Ortalama kinetik enerjisi sabit kalır, potansiyel enerjisi artar.',
      'Hem kinetik hem potansiyel enerjisi birlikte artar.',
      'Sıcaklığı yükselir, özkütlesi mutlaka artar.',
      'Aldığı ısı yalnızca taneciklerin öteleme hızını artırır.',
    ],
    correctIndex: 0,
    examTip:
      'Hâl değişimi boyunca sıcaklık sabit kaldığı için ortalama kinetik enerji değişmez; verilen enerji bağları kopararak potansiyel enerjiyi artırır.',
    relatedTermId: 'phys-hal-degisimi',
  },
  {
    id: 'physq-12',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Boyca uzama katsayıları λ_K > λ_L olan K ve L metal şeritleri birbirine perçinlenerek oda sıcaklığında düz bir çift oluşturuluyor. Bu çiftin sıcaklığı artırılırsa nasıl şekil alır?',
    choices: [
      'K daha fazla uzayacağı için metal çifti L’nin bulunduğu tarafa doğru bükülür.',
      'L daha fazla uzayacağı için metal çifti K’nin bulunduğu tarafa bükülür.',
      'Her iki metal de aynı miktar uzar ve şerit düz kalır.',
      'Sadece kalın olan metal bükülür, ince olan düz kalır.',
    ],
    correctIndex: 0,
    examTip:
      'Isıtılan metal çiftinde uzama katsayısı büyük olan dış yayda kalır, yani şerit uzaması az olan tarafa bükülür.',
    relatedTermId: 'phys-genlesme',
  },
  {
    id: 'physq-13',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Deniz seviyesinde 0 °C’de yapılan Torricelli açık hava basıncı deneyinde cam borudaki cıva yüksekliği 76 cm ölçülüyor. Aynı ortamda kesit alanı 2 katına çıkarılmış daha kalın bir boru kullanılsaydı cıva yüksekliği ne olurdu?',
    choices: ['Yine 76 cm olurdu.', '38 cm’ye düşerdi.', '152 cm’ye çıkardı.', 'Borunun eğimine göre artardı.'],
    correctIndex: 0,
    examTip:
      'Açık hava basıncıyla dengelenen sıvı yüksekliği borunun kesitine, şekline ve eğikliğine bağlı değildir; yalnızca P₀ ve sıvı özkütlesine bağlıdır.',
    relatedTermId: 'phys-torricelli',
  },
  {
    id: 'physq-14',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Şiddetli fırtınalarda evlerin çatılarının dışarıya (yukarı) doğru uçmasının ve uçak kanatlarının kaldırma kuvveti oluşturmasının temel fizik ilkesi hangisidir?',
    choices: [
      'Bernoulli İlkesi (Akışkan hızı arttıkça basıncı azalır)',
      'Pascal Prensibi (Sıvılar basıncı her yöne iletir)',
      'Arşimet İlkesi (Yüzen cisim ağırlığı kadar sıvı taşırır)',
      'Boyle-Mariotte Yasası (Gaz basıncı hacimle ters orantılıdır)',
    ],
    correctIndex: 0,
    examTip:
      'Çatının üstünden hızla esen rüzgâr üst tarafta alçak basınç oluştururken içerideki durgun havanın yüksek basıncı çatıyı yukarı iter.',
    relatedTermId: 'phys-bernoulli',
  },
  {
    id: 'physq-15',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Ağzına kadar su ile dolu taşma kabına bırakılan K ve L cisimlerinden K yüzmekte, L ise kabın dibine batmaktadır. Buna göre taşma kabının toplam ağırlığındaki değişim için hangisi doğrudur?',
    choices: [
      'K kabı ağırlaştırmazken L kabın ağırlaşmasına neden olur.',
      'Her iki cisim de kabı kendi ağırlığı kadar ağırlaştırır.',
      'Yalnızca K kabı ağırlaştırır, L ağırlaştırmaz.',
      'İkisi de kabın toplam ağırlığını değiştirmez.',
    ],
    correctIndex: 0,
    examTip:
      'Yüzen ve askıda kalan cisimler kendi ağırlıkları kadar sıvı taşırır (ΔG = 0). Dibe batan L ise ağırlığından az sıvı taşırdığı için kabı ağırlaştırır.',
    relatedTermId: 'phys-kap-agirlasma',
  },
  {
    id: 'physq-16',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    isHighYield: false,
    stem: 'Düzgün silindirik bir K katısı tabanı yere gelecek biçimde dururken zemine P basıncı yapıyor. Bu silindir tam ortasından düşey olarak iki özdeş yarım silindire bölünürse parçalardan birinin zemine yaptığı basınç ne olur?',
    choices: ['P (Değişmez)', 'P/2', '2P', 'P/4'],
    correctIndex: 0,
    examTip:
      'Düşey bölünmede hem ağırlık hem taban alanı aynı oranda yarıya düştüğü için basınç (P = G/S = h·d·g) değişmez.',
    relatedTermId: 'phys-kati-basinci',
  },

  // ==========================================
  // 3. ELEKTRİK & MANYETİZMA (8 soru)
  // ==========================================
  {
    id: 'physq-17',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'İç direnci önemsiz bir üretece paralel olarak bağlanmış özdeş K ve L lambalarından K’nin bulunduğu koldaki anahtar açılırsa L lambasının parlaklığı nasıl değişir?',
    choices: ['Değişmez', 'Artar', 'Azalır', 'Önce artar sonra söner'],
    correctIndex: 0,
    examTip:
      'İç direnci önemsiz üretece paralel bağlı her kol doğrudan üreteç gerilimini (V) alır; bir kolun açılması diğer paralel kolun gerilimini ve gücünü değiştirmez.',
    relatedTermId: 'phys-lamba-parlaklik',
  },
  {
    id: 'physq-18',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Yıldırımlı havalarda araç içindekilerin veya iletken kafes içindeki elektronik cihazların dış elektrik alandan etkilenmemesinin temel nedeni nedir?',
    choices: [
      'İletkenlerin iç kısmında elektrik alan ve net yükün sıfır olması (Faraday Kafesi)',
      'Yalıtkan havanın yükleri tamamen yok etmesi',
      'Manyetik alanın elektronları hızlandırması',
      'Yüklerin yalnızca iletkenin merkezinde toplanması',
    ],
    correctIndex: 0,
    examTip:
      'Faraday kafesi ilkesine göre iletkenin üzerindeki fazla yükler en dış yüzeyde birikir ve iç bölgede E = 0 olur.',
    relatedTermId: 'phys-elektrostatik',
  },
  {
    id: 'physq-19',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'V potansiyel farkıyla yüklenen aralarında d uzaklığı bulunan paralel levhalardan pozitif levha önünden serbest bırakılan +q yüklü parçacık karşı levhaya E_k kinetik enerjisiyle çarpıyor. Levhalar arası uzaklık 2d yapılırsa (V sabit) parçacığın karşı levhaya çarpma enerjisi ne olur?',
    choices: ['Değişmez (E_k = q·V)', 'Yarıya düşer', '2 katına çıkar', '4 katına çıkar'],
    correctIndex: 0,
    examTip:
      'Levhalar arasında elektriksel kuvvetin yaptığı iş W = (qV/d)·d = qV olduğundan karşı levhaya ulaşma kinetik enerjisi levhalar arası uzaklıktan bağımsızdır.',
    relatedTermId: 'phys-duzgun-e-alan',
  },
  {
    id: 'physq-20',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Bir üreteçle yüklenen düzlem sığaç üreteçten ayrıldıktan sonra levhaları arasındaki uzaklık artırılıyor. Bu işlem sırasında sığacın sığası (C) ve levhaları arasındaki potansiyel farkı (V) nasıl değişir?',
    choices: ['C azalır, V artar (q sabittir).', 'C artar, V azalır.', 'C azalır, V sabit kalır.', 'Hem C hem q artar.'],
    correctIndex: 0,
    examTip:
      'Üreteçten ayrılan sığacın yükü q korunur. d artınca C = εA/d azalır; q = C·V eşitliğine göre gerilim V artar.',
    relatedTermId: 'phys-sigac',
  },
  {
    id: 'physq-21',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Düzgün ve sayfa düzleminden içeri doğru B manyetik alanına sayfa düzleminde dik v hızıyla giren q yüklü parçacığın izlediği çembersel yörüngenin yarıçapı (r) aşağıdakilerden hangisinin artırılmasıyla küçülür?',
    choices: [
      'Manyetik alan şiddeti (B)',
      'Parçacığın kütlesi (m)',
      'Parçacığın hız büyüklüğü (v)',
      'Parçacığın çizgisel momentumu (mv)',
    ],
    correctIndex: 0,
    examTip:
      'Mavi Küba formülü r = m·v / (q·B) uyarınca B veya q büyüdükçe parçacık daha küçük yarıçaplı çember çizer.',
    relatedTermId: 'phys-manyetik-kuvvet',
  },
  {
    id: 'physq-22',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Lenz yasasına göre bir iletken tel çerçeve içindeki manyetik akı dış etkenle zamanla azalıyorsa çerçevede oluşan indüksiyon akımının meydana getireceği manyetik alanın yönü nasıldır?',
    choices: [
      'Mevcut dış manyetik alan ile aynı yönde oluşarak azalmayı engellemeye çalışır.',
      'Mevcut dış manyetik alana zıt yönde oluşur.',
      'Çerçeveye paralel olarak sıfır akı oluşturur.',
      'Her zaman sayfa düzleminden dışarı doğru olur.',
    ],
    correctIndex: 0,
    examTip:
      'Lenz yasası değişime karşı koyar: akı azalıyorsa desteklemek için mevcut alanla aynı yönde, artıyorsa azaltmak için zıt yönde indüksiyon alanı üretir.',
    relatedTermId: 'phys-lenz',
  },
  {
    id: 'physq-23',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Direnç, bobin ve sığaçtan oluşan seri bir RLC alternatif akım devresinde akım kaynağının frekansı artırılmaktadır. Başlangıçta X_L = X_C (rezonans) olan devrede frekans artırıldığında X_L ve X_C nasıl değişir?',
    choices: [
      'X_L artar, X_C azalır; devre rezonanstan çıkar ve etkin akım azalır.',
      'X_L azalır, X_C artar; empedans küçülür.',
      'Hem X_L hem X_C sabit kalır.',
      'Rezonans bozulmadığından etkin akım maksimumda kalır.',
    ],
    correctIndex: 0,
    examTip:
      'X_L = 2πfL frekansla doğru, X_C = 1/(2πfC) frekansla ters orantılıdır. Rezonansta empedans en küçük (Z = R) olduğu için frekans değişirse akım düşer.',
    relatedTermId: 'phys-empedans-rezonans',
  },
  {
    id: 'physq-24',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Primer sarım sayısı 200, sekonder sarım sayısı 1000 olan ideal bir transformatörün primer ucuna 50 V sabit doğru akım (DC) kaynağı bağlanırsa sekonder uçtan kaç Volt gerilim alınır?',
    choices: ['0 V', '250 V', '10 V', '50 V'],
    correctIndex: 0,
    examTip:
      'Transformatörler manyetik akı değişimi ile çalıştığı için yalnızca alternatif akımda (AC) çalışır; sabit DC geriliminde akı değişmediğinden sekonder çıkış 0 V olur.',
    relatedTermId: 'phys-transformator',
  },

  // ==========================================
  // 4. DALGALAR & OPTİK (8 soru)
  // ==========================================
  {
    id: 'physq-25',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'İnce bir yayda oluşturulan baş yukarı bir atma, ucuna eklenmiş daha kalın bir yaya ulaştığında yansıyan ve iletilen atmaların durumu ne olur?',
    choices: [
      'Yansıyan atma baş aşağı döner, iletilen atma baş yukarı kalır.',
      'Her iki atma da baş yukarı olarak yoluna devam eder.',
      'Yansıyan atma baş yukarı, iletilen atma baş aşağı olur.',
      'İletilen atmanın hızı, yansıyan atmanın hızından büyük olur.',
    ],
    correctIndex: 0,
    examTip:
      'İletilen atma her zaman gelenle aynı taraftadır. İnceden kalına geçişte ek yeri sabit uç gibi davrandığından yansıyan atma ters döner.',
    relatedTermId: 'phys-yay-dalgalari',
  },
  {
    id: 'physq-26',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Bir dalga leğeninde sabit frekansla üretilen su dalgaları sığ bölgeden derin bölgeye geçerken dalgaların hızı (v), dalga boyu (λ) ve frekansı (f) nasıl değişir?',
    choices: [
      'v artar, λ artar, f değişmez.',
      'v azalır, λ azalır, f artar.',
      'v artar, λ azalır, f artar.',
      'v değişmez, λ artar, f azalır.',
    ],
    correctIndex: 0,
    examTip:
      'Frekans yalnızca kaynağa bağlı olduğu için değişmez; derinlik arttığında v ve λ = v/f birlikte artar.',
    relatedTermId: 'phys-su-dalgalari',
  },
  {
    id: 'physq-27',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Aynı ortamda farklı müzik aletlerinden (ör. keman ve flüt) çıkan aynı frekansta ve aynı şiddetteki iki sesin kulak tarafından birbirinden ayırt edilmesini sağlayan ses özelliği hangisidir?',
    choices: ['Tını', 'Yükseklik (Frekans)', 'Şiddet (Gürlük)', 'Yayılma Hızı'],
    correctIndex: 0,
    examTip:
      'Frekansı ve şiddeti aynı olan sesleri kaynağına göre ayırt ettiren özellik sesin tınısıdır.',
    relatedTermId: 'phys-ses-deprem',
  },
  {
    id: 'physq-28',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Işık şiddeti I olan noktasal kaynak r yarıçaplı içi boş kürenin merkezine yerleştirilmiştir. Kürenin yarıçapı 2r yapılırsa iç yüzeydeki toplam ışık akısı (Φ) ve yüzeyin bir noktasındaki aydınlanma şiddeti (E) nasıl değişir?',
    choices: [
      'Φ değişmez, E dörtte birine (E/4) düşer.',
      'Φ dört katına çıkar, E değişmez.',
      'Hem Φ hem E yarıya düşer.',
      'Φ yarıya düşer, E dörtte birine iner.',
    ],
    correctIndex: 0,
    examTip:
      'Tam küre yüzeyindeki toplam ışık akısı Φ = 4πI yarıçaptan bağımsızdır; aydınlanma E = I/r² ise uzaklığın karesiyle ters orantılıdır.',
    relatedTermId: 'phys-aydinlanma',
  },
  {
    id: 'physq-29',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Tümsek ayna ve kalın kenarlı mercek önüne konulan gerçek bir cismin oluşan görüntüsü için aşağıdakilerden hangisi daima doğrudur?',
    choices: [
      'Cisme göre düz, cisimden küçük ve sanaldır.',
      'Cisme göre ters ve gerçek olup perdeye düşürülebilir.',
      'Cisim odakla ayna arasındaysa cisimden büyüktür.',
      'Mercek veya aynaya yaklaştıkça görüntü sonsuza gider.',
    ],
    correctIndex: 0,
    examTip:
      'Tümsek ayna ve kalın kenarlı mercek (hava ortamında) önündeki gerçek cisimlerin görüntüsü her zaman odak-tepe arasında, düz, küçük ve sanaldır.',
    relatedTermId: 'phys-kuresel-ayna',
  },
  {
    id: 'physq-30',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    isHighYield: true,
    stem: 'Beyaz ışık altında yeşil görünen bir kitap, yalnızca saf kırmızı ışık yayan bir odada ve yalnızca saf sarı (kırmızı+yeşil karışımı) ışık yayan bir odada sırasıyla hangi renklerde görünür?',
    choices: [
      'Siyah ve Yeşil',
      'Kırmızı ve Sarı',
      'Siyah ve Sarı',
      'Yeşil ve Siyah',
    ],
    correctIndex: 0,
    examTip:
      'Yeşil kitap yalnızca yeşil ışığı yansıtır. Kırmızı ışıkta yansıtacak ışın olmadığından siyah; K+Y karışımı sarı ışıkta ise içindeki yeşili yansıtıp yeşil görünür.',
    relatedTermId: 'phys-renk-filtre',
  },
  {
    id: 'physq-31',
    category: 'DALGA_OPTIK',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Tek renkli ışıkla yapılan Young (çift yarık) girişim deneyinde ekran ile yarıklar düzlemi arasındaki hava boşluğu kırıcılık indisi n > 1 olan saydam bir sıvıyla doldurulursa saçak genişliği (Δx) nasıl değişir?',
    choices: [
      'Azalır, ekranda gözlenen saçak sayısı artar.',
      'Artar, merkezi aydınlık saçak iki kat genişler.',
      'Değişmez, yalnızca saçakların parlaklığı azalır.',
      'Tamamen kaybolur ve girişim deseni oluşmaz.',
    ],
    correctIndex: 0,
    examTip:
      'Δx = (L · λ) / (d · n) formülüne göre ortamın indisi n arttıkça ışığın ortamdaki dalga boyu ve saçak genişliği Δx küçülür.',
    relatedTermId: 'phys-cift-yarik',
  },
  {
    id: 'physq-32',
    category: 'DALGA_OPTIK',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Elektromanyetik dalga spektrumundaki ışımalarla ilgili aşağıdakilerden hangisi yanlıştır?',
    choices: [
      'Yüklü olduklarından elektrik ve manyetik alanlarda sapmaya uğrarlar.',
      'Boşlukta aynı c ışık hızıyla yayılırlar ve enine dalgalardır.',
      'Frekansı en büyük olan gama ışınlarının dalga boyu en küçüktür.',
      'Yüklerin ivmeli hareketi sonucunda oluşurlar.',
    ],
    correctIndex: 0,
    examTip:
      'Elektromanyetik dalgalar elektrik ve manyetik alan bileşeni taşısalar da yüksüzdürler; bu nedenle elektrik/manyetik alanda sapmazlar.',
    relatedTermId: 'phys-em-spektrum',
  },

  // ==========================================
  // 5. ÇEMBERSEL & MODERN FİZİK (8 soru)
  // ==========================================
  {
    id: 'physq-33',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Buz pateni yapan bir sporcu kolları açık biçimde kendi ekseni etrafında dönmekteyken kollarını vücuduna doğru kapatıyor (dış tork sıfır). Sporcunun eylemsizlik momenti (I), açısal momentumu (L) ve açısal hızı (ω) nasıl değişir?',
    choices: [
      'I azalır, L değişmez, ω artar.',
      'I artar, L azalır, ω değişmez.',
      'Hem I hem L azalır, ω sabit kalır.',
      'I azalır, L artar, ω azalır.',
    ],
    correctIndex: 0,
    examTip:
      'Dış tork yoksa açısal momentum L = I·ω korunur. Kollar kapanınca yarıçap küçüldüğünden I azalır ve ω artar.',
    relatedTermId: 'phys-eylemsizlik-acisal',
  },
  {
    id: 'physq-34',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Güneş etrafında eliptik yörüngede dolanan bir gezegen Güneş’e en uzak noktadan en yakın noktaya doğru hareket ederken çizgisel hızı (v) ve Güneş’e göre açısal momentumu (L) nasıl değişir?',
    choices: [
      'v artar, L değişmez.',
      'v azalır, L artar.',
      'Hem v hem L artar.',
      'Hem v hem L azalır.',
    ],
    correctIndex: 0,
    examTip:
      'Kütle çekim kuvvetinin uzantısı Güneş merkezinden geçtiği için tork oluşturmaz ve açısal momentum L = mvr korunur; r azaldıkça v artar.',
    relatedTermId: 'phys-kepler',
  },
  {
    id: 'physq-35',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Dünya yüzeyinde eşit periyotlu olarak ayarlanmış bir yay sarkacı ve bir basit sarkaç, yer çekimi ivmesinin Dünya’dakinin 1/6’sı olduğu Ay yüzeyine götürülüyor. Periyotlar için ne söylenir?',
    choices: [
      'Yay sarkacının periyodu değişmez, basit sarkacın periyodu artar.',
      'Her ikisinin de periyodu artar.',
      'Yay sarkacının periyodu azalır, basit sarkacınki değişmez.',
      'İkisinin de periyodu değişmez.',
    ],
    correctIndex: 0,
    examTip:
      'T_yay = 2π√(m/k) formülünde g yer almaz; T_sarkaç = 2π√(L/g) ise g küçüldükçe büyür.',
    relatedTermId: 'phys-bhh',
  },
  {
    id: 'physq-36',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Bir fotoelektrik devresinde katoda gönderilen eşik enerjisinin üzerindeki monokromatik ışığın yalnızca şiddeti (birim zamanda gelen foton sayısı) artırılırsa hangisi artar?',
    choices: [
      'Devrede oluşan maksimum fotoelektrik akım şiddeti (i_max)',
      'Kopan fotoelektronların maksimum kinetik enerjisi',
      'Devreyi durduran kesme potansiyeli (V_kesme)',
      'Katot metalinin eşik (bağlanma) enerjisi',
    ],
    correctIndex: 0,
    examTip:
      'Işık şiddeti (foton sayısı) yalnızca sökülen elektron sayısını ve maksimum akımı artırır; elektronların kinetik enerjisini ve V_kesme’yi yalnızca fotonun enerjisi (frekans/λ) değiştirir.',
    relatedTermId: 'phys-fotoelektrik',
  },
  {
    id: 'physq-37',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Compton saçılması olayında durgun bir elektrona çarparak saçılan X-ışını fotonunun niceliklerinden hangisi çarpışma sonrası değişmez?',
    choices: ['Yayılma hızı (c)', 'Frekansı', 'Dalga boyu', 'Çizgisel momentumu'],
    correctIndex: 0,
    examTip:
      'Saçılan foton enerjisinin ve momentumunun bir kısmını elektrona aktarır (dalga boyu büyür, frekansı azalır) ancak boşluktaki yayılma hızı daima c sabit kalır.',
    relatedTermId: 'phys-compton-debroglie',
  },
  {
    id: 'physq-38',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Bohr atom modeline göre uyarılmış bir hidrojen atomundaki elektron n = 4 enerji düzeyinden n = 2 enerji düzeyine geçiş yaptığında salınan foton hangi spektrum serisine aittir?',
    choices: ['Balmer serisi (Görünür ışık)', 'Lyman serisi (Morötesi)', 'Paschen serisi (Kızılötesi)', 'Brackett serisi'],
    correctIndex: 0,
    examTip:
      'n→1 geçişleri Lyman (morötesi), n→2 geçişleri Balmer (görünür ışık), n→3 geçişleri Paschen (kızılötesi) serisini oluşturur.',
    relatedTermId: 'phys-bohr-atom',
  },
  {
    id: 'physq-39',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Standart modele göre atom çekirdeğindeki proton ve nötronlar 3 kuarktan oluşan baryon grubundadır. Proton (uud) ve nötron (udd) için hangisi doğrudur?',
    choices: [
      'Güçlü nükleer kuvvet aracısı gluonlar kuarkları bir arada tutar; elektron ise leptondur.',
      'Proton ve nötron temel (alt parçacığı olmayan) leptonlardır.',
      'Mezonlar 3 kuarktan, baryonlar ise 1 kuark ve 1 karşıt kuarktan oluşur.',
      'Higgs bozonu elektromanyetik kuvveti taşır.',
    ],
    correctIndex: 0,
    examTip:
      'Baryonlar 3 kuark (qqq), mezonlar 1 kuark + 1 karşıt kuark (q q̄) yapısındadır; elektron kuarklardan oluşmayan temel bir leptondur.',
    relatedTermId: 'phys-standart-model',
  },
  {
    id: 'physq-40',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    isHighYield: true,
    stem: 'Modern tıpta kullanılan görüntüleme yöntemlerinden hangileri hastayı iyonlaştırıcı X-ışını veya gama radyasyonuna maruz bırakmadan görüntü elde eder?',
    choices: [
      'MR (Manyetik Rezonans) ve Ultrason (USG)',
      'Bilgisayarlı Tomografi (BT) ve Röntgen',
      'PET ve Röntgen',
      'BT ve PET',
    ],
    correctIndex: 0,
    examTip:
      'MR radyo dalgaları + manyetik alanla, USG ise yüksek frekanslı ses dalgalarıyla çalışır ve iyonlaştırıcı radyasyon içermez.',
    relatedTermId: 'phys-goruntuleme',
  },
];
