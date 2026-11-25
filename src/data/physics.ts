import type {PhysicsCategoryId, PhysicsExamLevel, PhysicsTerm} from '../types/physics';

export const PHYSICS_CATEGORY_LABELS: Record<PhysicsCategoryId, string> = {
  MADDE_HAREKET: 'Madde & Mekanik',
  ISI_BASINC: 'Isı, Basınç & Kaldırma',
  ELEKTRIK_MANYETIZMA: 'Elektrik & Manyetizma',
  DALGA_OPTIK: 'Dalgalar & Optik',
  CEMBER_MODERN: 'Çembersel & Modern Fizik',
};

export const PHYSICS_EXAM_LEVEL_LABELS: Record<PhysicsExamLevel, string> = {
  TYT: 'TYT',
  AYT: 'AYT',
  TYT_AYT: 'TYT-AYT',
};

export const PHYSICS_TERMS: PhysicsTerm[] = [
  // ==========================================
  // 1. MADDE & MEKANİK (16 kavram)
  // ==========================================
  {
    id: 'phys-temel-buyuklukler',
    term: 'SI Temel Büyüklükler (KISA MUZ)',
    formula: 'kg, m, s, A, K, mol, cd',
    siUnit: 'SI Temel Birimleri',
    category: 'MADDE_HAREKET',
    examLevel: 'TYT',
    mechanism:
      'Kütle, ışık şiddeti, sıcaklık, akım şiddeti, madde miktarı, uzunluk ve zaman tek başına ölçülebilen skaler 7 temel büyüklüktür.',
    examTip:
      'Sıcaklığın SI birimi Celsius değil Kelvin (K), akım şiddetinin birimi Amper (A), kuvvet ve ağırlık ise türetilmiş ve vektöreldir.',
    isHighYield: true,
  },
  {
    id: 'phys-ozkutle',
    term: 'Özkütle (Yoğunluk)',
    formula: 'd = m / V',
    siUnit: 'kg/m³ (g/cm³)',
    category: 'MADDE_HAREKET',
    examLevel: 'TYT',
    mechanism:
      'Sabit sıcaklık ve basınç altında saf maddeler için ayırt edici bir özelliktir; birim hacmin kütlesini verir.',
    examTip:
      'Sıcaklık artışı genellikle hacmi artırdığından özkütleyi düşürür; suyun 0 °C’den +4 °C’ye ısınırken özkütlesinin artması istisnadır.',
    isHighYield: true,
  },
  {
    id: 'phys-dayaniklilik',
    term: 'Dayanıklılık (Kesit / Hacim)',
    formula: 'D ∝ A / V = 1 / h',
    siUnit: '1/m',
    category: 'MADDE_HAREKET',
    examLevel: 'TYT',
    mechanism:
      'Düzgün prizma veya silindir biçimindeki katıların kendi ağırlığına karşı dayanıklılığı kesit alanının hacme oranıyla, yani yükseklikle ters orantılıdır.',
    examTip:
      'Bir cismin tüm boyutları k katına çıkarılırsa hacmi k³, kesit alanı k² artar; kendi ağırlığına karşı dayanıklılığı 1/k katına iner.',
    isHighYield: true,
  },
  {
    id: 'phys-adezyon-kohezyon',
    term: 'Adezyon, Kohezyon ve Yüzey Gerilimi',
    formula: 'F_kohezyon vs F_adezyon',
    siUnit: 'N / (N/m)',
    category: 'MADDE_HAREKET',
    examLevel: 'TYT',
    mechanism:
      'Kohezyon aynı cins moleküller arasındaki çekim, adezyon farklı cins moleküller arasındaki yapışma kuvvetidir; yüzey gerilimi kohezyon kaynaklıdır.',
    examTip:
      'Sıcaklık artışı ve sabun/deterjan yüzey gerilimini azaltırken tuz eklenmesi artırır; ince boruda sıvının yükselmesi kılcallıktır.',
    isHighYield: true,
  },
  {
    id: 'phys-newton-ikinci',
    term: 'Newton’un Temel Hareket Yasası',
    formula: 'F_net = m · a',
    siUnit: 'N = kg·m/s²',
    category: 'MADDE_HAREKET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Bir cisme etki eden net kuvvet sıfırdan farklıysa cisim net kuvvet yönünde ve büyüklüğüyle doğru orantılı bir ivme kazanır.',
    examTip:
      'Net kuvvet sıfır olduğunda cisim durabilir veya sabit hızla doğrusal hareketine devam edebilir (eylemsizlik).',
    isHighYield: true,
  },
  {
    id: 'phys-surtunme',
    term: 'Statik ve Kinetik Sürtünme Kuvveti',
    formula: 'f_s ≤ k_s · N  |  f_k = k_k · N',
    siUnit: 'N (Newton)',
    category: 'MADDE_HAREKET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Yüzeye dik tepki kuvveti N ile orantılıdır ve sürtünen yüzey alanından bağımsızdır; statik sürtünme uygulanan kuvvete kadar değer alabilir.',
    examTip:
      'Duran cisme uygulanan yatay kuvvet maksimum statik sürtünmeden küçükse sürtünme kuvveti uygulanan kuvvete eşittir (f_s = F).',
    isHighYield: true,
  },
  {
    id: 'phys-bagil-hareket',
    term: 'Bağıl Hız ve Nehir Problemleri',
    formula: 'v_bağıl = v_gözlenen − v_gözlemci',
    siUnit: 'm/s',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    mechanism:
      'Gözlemciye göre hareketlinin hızı vektörel fark ile bulunur; nehirde karşıya geçme süresi yalnızca suya dik hız bileşenine bağlıdır.',
    examTip:
      'Akıntı hızı yüzücünün karşı kıyıya geçme süresini değiştirmez, yalnızca sürüklenme miktarını (x = v_yer,x · t) etkiler.',
    isHighYield: true,
  },
  {
    id: 'phys-sabit-ivmeli',
    term: 'Sabit İvmeli Doğrusal Hareket',
    formula: 'v = v₀ ± a·t  |  v² = v₀² ± 2ax',
    siUnit: 'm, m/s, m/s²',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    mechanism:
      'Hız-zaman grafiğinin eğimi ivmeyi, zaman ekseniyle arasındaki alan ise yer değiştirmeyi verir; düzgün hızlanmada yollar x, 3x, 5x artar.',
    examTip:
      'Konum-zaman grafiğinin eğimi anlık hızı, eğimin değişimi ivmenin işaretini belirler.',
    isHighYield: true,
  },
  {
    id: 'phys-egik-atis',
    term: 'Eğik Atış ve Menzil',
    formula: 'h_max = v_y²/(2g)  |  X = v₀²·sin(2α)/g',
    siUnit: 'm, s',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    mechanism:
      'Yatay doğrultuda kuvvet etkimediği için v_x = v₀·cosα sabit kalır; düşeyde sabit g ivmesiyle yukarı atış hareketi yapılır.',
    examTip:
      'Sürtünmesiz ortamda birbirini 90°’ye tamamlayan açılarla (ör. 37° ve 53°) aynı hızla atılan cisimlerin menzilleri eşittir; maksimum menzil 45°’dedir.',
    isHighYield: true,
  },
  {
    id: 'phys-limit-hiz',
    term: 'Hava Direnci ve Limit Hız',
    formula: 'F_d = K·A·v²  ⇒  v_lim = √(m·g / (K·A))',
    siUnit: 'm/s',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    mechanism:
      'Hava direnç kuvveti düşey aşağı etkiyen ağırlığa eşit olduğunda net kuvvet ve ivme sıfırlanır; cisim sabit limit hızla düşer.',
    examTip:
      'Paraşüt açıldığında en büyük kesit alanı (A) büyüdüğü için limit hız azalır; cisim daha küçük bir sabit hızla yere iner.',
    isHighYield: false,
  },
  {
    id: 'phys-is-enerji',
    term: 'İş, Mekanik Enerji ve Güç',
    formula: 'W = F·Δx = ΔE_k  |  P = W / t',
    siUnit: 'J (Joule), W (Watt)',
    category: 'MADDE_HAREKET',
    examLevel: 'TYT_AYT',
    mechanism:
      'Net kuvvetin yaptığı iş kinetik enerji değişimine eşittir; yalnızca korunumlu kuvvetler iş yapıyorsa E_m = E_k + E_p sabit kalır.',
    examTip:
      'Harekete dik kuvvetler (ör. yatay yolda ağırlık veya çemberselde merkezcil kuvvet) fiziksel anlamda iş yapmaz.',
    isHighYield: true,
  },
  {
    id: 'phys-yay-enerjisi',
    term: 'Hooke Yasası ve Esneklik Potansiyel Enerjisi',
    formula: 'F_yay = −k·x  |  E_p = ½·k·x²',
    siUnit: 'N/m, Joule',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    mechanism:
      'Esnek bir yaya uygulanan kuvvet uzanımla doğru orantılıdır; F-x grafiğinin altındaki alan yayda depolanan enerjiyi verir.',
    examTip:
      'Yay k eşdeğer sabiti: seri bağlı yaylarda 1/k_eş = 1/k₁ + 1/k₂ (azaltır), paralel bağlı yaylarda k_eş = k₁ + k₂ (artırır).',
    isHighYield: false,
  },
  {
    id: 'phys-itme-momentum',
    term: 'İtme ve Çizgisel Momentum Korunumu',
    formula: 'I = F·Δt = ΔP = m·Δv',
    siUnit: 'N·s = kg·m/s',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    mechanism:
      'Sisteme dışarıdan net bir kuvvet etki etmiyorsa toplam çizgisel momentum vektörel olarak her türlü çarpışma ve iç patlamada korunur.',
    examTip:
      'Esnek çarpışmada hem momentum hem kinetik enerji korunurken, esnek olmayan (kenetlenen) çarpışmada yalnızca momentum korunur.',
    isHighYield: true,
  },
  {
    id: 'phys-tork-denge',
    term: 'Tork ve Statik Denge Şartları',
    formula: 'τ = F·d·sinθ  |  ΣF = 0, Στ = 0',
    siUnit: 'N·m',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    mechanism:
      'Kuvvetin döndürme etkisi torktur ve sağ el kuralıyla yönü belirlenir; tam denge için hem net kuvvet hem net tork sıfır olmalıdır.',
    examTip:
      'Uzantısı dönme ekseninden geçen kuvvetlerin torku sıfırdır; Lami teoreminde küçük açının karşısındaki kuvvet en büyüktür.',
    isHighYield: true,
  },
  {
    id: 'phys-kutle-merkezi',
    term: 'Kütle ve Ağırlık Merkezi',
    formula: 'x_km = Σ(m_i · x_i) / Σm_i',
    siUnit: 'm',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    mechanism:
      'Kuvvet alanının düzgün olmadığı çok yüksek yapılarda kütle merkezi üstte, yer çekiminin daha güçlü olduğu tabana yakın kısımda ise ağırlık merkezi daha alttadır.',
    examTip:
      'İple asılan cisim dengede kaldığında ipin uzantısı mutlaka kütle merkezinden geçer.',
    isHighYield: false,
  },
  {
    id: 'phys-basit-makineler',
    term: 'Basit Makineler (Kuvvet Kazancı & Verim)',
    formula: 'F·x_F = P·x_P  |  Kuvvet Kazancı = P / F',
    siUnit: 'Birimisiz oran',
    category: 'MADDE_HAREKET',
    examLevel: 'AYT',
    mechanism:
      'Basit makineler kuvvetin yönünü veya büyüklüğünü değiştirerek iş kolaylığı sağlar; sürtünmesiz ideal makinede enerjiden ya da işten kazanç olmaz.',
    examTip:
      'Kuvvetten kaç kat kazanç sağlanırsa yoldan da aynı oranda kayıp olur; vida adımı a olan vidada tur başına ilerleme h = n·a kadardır.',
    isHighYield: true,
  },

  // ==========================================
  // 2. ISI, BASINÇ & KALDIRMA (16 kavram)
  // ==========================================
  {
    id: 'phys-isi-sicaklik',
    term: 'Isı, Sıcaklık ve İç Enerji Farkı',
    formula: 'Q_alınan = Q_verilen',
    siUnit: 'Joule / Kelvin',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'İç enerji maddenin tüm taneciklerinin kinetik ve potansiyel enerjileri toplamıdır; ısı ise sıcaklık farkı nedeniyle aktarılan enerjidir.',
    examTip:
      'Bir cismin "ısısı" ifadesi fiziksel olarak yanlıştır; cisimlerin ısısı ölçülmez, yalnızca sıcaklık ve ısı değişimi ölçülür.',
    isHighYield: true,
  },
  {
    id: 'phys-termometre',
    term: 'Termometre Ölçek Dönüşümü',
    formula: 'C / 100 = (F − 32) / 180 = (K − 273) / 100',
    siUnit: '°C, °F, K',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Termometrelerde donma ve kaynama noktaları arasındaki bölme sayısı duyarlılığı belirler; Kelvin mutlak sıcaklıktır ve negatif değer almaz.',
    examTip:
      '20 °C sıcaklık 10 °C’nin iki katı değildir; iki katı sıcaklık kıyası yalnızca Kelvin (K) cinsinden yapılabilir.',
    isHighYield: true,
  },
  {
    id: 'phys-ozisi-qmc',
    term: 'Öz Isı ve Isı Sığası',
    formula: 'Q = m·c·ΔT  |  C = m·c',
    siUnit: 'J/(kg·K), J/K',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Öz ısı (c) madde miktarından bağımsız ayırt edici özelliktir; ısı sığası (C = m·c) kütleye bağlıdır ve sıcaklık değişimine direnci belirler.',
    examTip:
      'Öz ısısı küçük olan maddeler aynı ısıyla daha çabuk ısınır ve daha çabuk soğur (karalar denizlerden hızlı ısınıp soğur).',
    isHighYield: true,
  },
  {
    id: 'phys-hal-degisimi',
    term: 'Hâl Değişimi Isısı',
    formula: 'Q = m · L',
    siUnit: 'J/kg (cal/g)',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Saf maddeler hâl değiştirirken verilen ısı sıcaklığı artırmaz, tanecikler arası bağları kopararak potansiyel enerjiyi artırır.',
    examTip:
      'Saf maddenin erime ve kaynama süresince ortalama kinetik enerjisi (sıcaklığı) sabit kalır, potansiyel enerjisi değişir.',
    isHighYield: true,
  },
  {
    id: 'phys-isil-denge',
    term: 'Isıl Denge ve Denge Sıcaklığı',
    formula: 'T_denge = (C₁·T₁ + C₂·T₂) / (C₁ + C₂)',
    siUnit: '°C / K',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Isıca yalıtılmış ortamda temas eden cisimlerden sıcak olan soğuk olana ısı verir ve sıcaklıklar eşitlenince ısı alışverişi durur.',
    examTip:
      'Hâl değişimi yoksa denge sıcaklığı daima ısı sığası (m·c) büyük olan maddenin ilk sıcaklığına daha yakın olur.',
    isHighYield: false,
  },
  {
    id: 'phys-isi-iletim',
    term: 'Isı İletim Yolları ve Hızı',
    formula: 'ΔQ/Δt = k · A · ΔT / Δx',
    siUnit: 'Watt (J/s)',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Isı katılarda iletim (titreşim), akışkanlarda konveksiyon (özkütle farkı), boşlukta ise yalnızca ışıma (elektromanyetik dalga) yoluyla yayılır.',
    examTip:
      'Güneş enerjisinin Dünya’ya ulaşması ışıma, kaloriferin odayı ısıtması ise ağırlıklı olarak konveksiyon yoluyla gerçekleşir.',
    isHighYield: true,
  },
  {
    id: 'phys-genlesme',
    term: 'Katı ve Sıvılarda Genleşme',
    formula: 'ΔL = L₀ · λ · ΔT  |  ΔV = V₀ · α · ΔT',
    siUnit: '1/°C (1/K)',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Sıcaklık değişiminde cisimlerin tüm boyutları fotokopi büyümesi/küçülmesi gibi orantılı olarak genleşir veya büzülür.',
    examTip:
      'Metal çifti ısıtıldığında genleşme katsayısı büyük olan metal daha çok uzadığı için küçük olanın tarafına doğru bükülür.',
    isHighYield: true,
  },
  {
    id: 'phys-kati-basinci',
    term: 'Katı Basıncı ve Basınç Kuvveti',
    formula: 'P = F / S  (Düzgün prizma: P = h·d·g)',
    siUnit: 'Pa = N/m²',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Katılar üzerlerine uygulanan kuvveti aynı doğrultu ve büyüklükte tabana iletir; basıncı azaltmak için temas yüzeyi genişletilir.',
    examTip:
      'Düzgün kesitli türdeş bir katı dikey olarak iki parçaya bölünürse her parçanın yere yaptığı basınç değişmez.',
    isHighYield: true,
  },
  {
    id: 'phys-sivi-basinci',
    term: 'Durgun Sıvı Basıncı',
    formula: 'P_sıvı = h · d · g',
    siUnit: 'Pa',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Sıvı basıncı sıvının serbest açık yüzeyinden olan derinliğe (h), özkütleye (d) ve yer çekimine bağlıdır; kabın şekline bağlı değildir.',
    examTip:
      'Taban alanı A ve yüksekliği h olan kapta sıvı basınç kuvveti F = h·d·g·A dir; kabın üstü genişliyorsa sıvı ağırlığı F’den büyüktür.',
    isHighYield: true,
  },
  {
    id: 'phys-pascal',
    term: 'Pascal Prensibi ve Bileşik Kaplar',
    formula: 'F₁ / S₁ = F₂ / S₂',
    siUnit: 'Pa',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Kapalı bir kaptaki sıkıştırılamaz sıvıya uygulanan basınç, sıvının her noktasına ve kap çeperlerine dik olarak aynen iletilir.',
    examTip:
      'Su cenderesi, hidrolik fren ve berber koltukları Pascal prensibiyle küçük kuvvetlerle büyük ağırlıkları dengeler.',
    isHighYield: false,
  },
  {
    id: 'phys-torricelli',
    term: 'Açık Hava Basıncı (Torricelli Deneyi)',
    formula: 'P₀ = h · d_civa · g = 76 cmHg',
    siUnit: 'atm / cmHg / Pa',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Deniz seviyesinde 0 °C’de açık hava basıncı 76 cm yüksekliğindeki cıva sütununun basıncını dengeler; yükseğe çıkıldıkça P₀ azalır.',
    examTip:
      'Barometredeki cıva yüksekliği h, cam borunun kesit alanına, şekline veya eğik durmasına bağlı değildir; yalnızca P₀ ve sıvı özkütlesine bağlıdır.',
    isHighYield: true,
  },
  {
    id: 'phys-gaz-basinci',
    term: 'Kapalı Kaplarda Gaz Basıncı ve Manometre',
    formula: 'P · V = n · R · T',
    siUnit: 'Pa / atm',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Kapalı kaptaki gazın her noktasında basınç aynıdır; sabit sıcaklık ve mol sayısında basınç ile hacim ters orantılıdır.',
    examTip:
      'Esnek balon veya sürtünmesiz hareketli pistonlu kaplarda iç gaz basıncı daima dış basınca eşittir.',
    isHighYield: false,
  },
  {
    id: 'phys-bernoulli',
    term: 'Bernoulli İlkesi (Akışkan Basıncı)',
    formula: 'Kesit ↓ ⇒ Akış Hızı ↑ ⇒ Basınç ↓',
    siUnit: 'Pa',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Akışkanların kesit alanının daraldığı yerde akış hızı artar; hızın arttığı bölgede ise akışkanın çeperlere yaptığı statik basınç azalır.',
    examTip:
      'Uçak kanadının üst yüzeyinin kavisli olması akışı hızlandırıp basıncı düşürür ve yukarı yönlü kaldırma farkı oluşturur.',
    isHighYield: true,
  },
  {
    id: 'phys-kaldirma-kuvveti',
    term: 'Arşimet Kaldırma Kuvveti',
    formula: 'F_k = V_batan · d_sıvı · g',
    siUnit: 'N (Newton)',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Bir akışkana kısmen veya tamamen batan cisme etki eden yukarı yönlü kaldırma kuvveti, cismin yerini değiştirdiği sıvının ağırlığına eşittir.',
    examTip:
      'Yüzen ve askıda kalan cisimlerde F_k = G_cisim iken batan cisimlerde F_k < G_cisim olur.',
    isHighYield: true,
  },
  {
    id: 'phys-kap-agirlasma',
    term: 'Taşma Kabında Ağırlaşma Koşulları',
    formula: 'ΔG_kap = G_giren − G_taşan',
    siUnit: 'N',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Taşma düzeyine kadar dolu kaba bırakılan yüzen veya askıda kalan cisimler kendi ağırlıkları kadar sıvı taşırdığı için kap ağırlaşmaz.',
    examTip:
      'Yalnızca dibe batan cisimler (d_cisim > d_sıvı) kendi ağırlığından daha az sıvı taşırdığı için taşma kabında ağırlaşmaya neden olur.',
    isHighYield: true,
  },
  {
    id: 'phys-sera-kuresel',
    term: 'Küresel Isınma ve Isı Yalıtımı',
    formula: 'Isı İletim Katsayısı (k) ↓ ⇒ Yalıtım ↑',
    siUnit: 'W/(m·K)',
    category: 'ISI_BASINC',
    examLevel: 'TYT',
    mechanism:
      'Isı iletim katsayısı düşük (ör. köpük, cam yünü, durgun hava boşluklu çift cam) malzemeler ısı kaybını yavaşlatarak enerji tasarrufu sağlar.',
    examTip:
      'Atmosferdeki CO₂ ve metan gibi gazların artışı yeryüzünden yansıyan kızılötesi ışımayı tutarak sera etkisini güçlendirir.',
    isHighYield: false,
  },

  // ==========================================
  // 3. ELEKTRİK & MANYETİZMA (16 kavram)
  // ==========================================
  {
    id: 'phys-elektrostatik',
    term: 'Elektriklenme ve Elektroskop',
    formula: 'q_toplam = n · e  (Sürtünme, Dokunma, Etki)',
    siUnit: 'C (Coulomb)',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'TYT',
    mechanism:
      'Yük korunumludur ve sürtünmede yalnızca elektron (−) alışverişi olur; dokunma ile elektriklenmede toplam yük yarıçapla orantılı paylaşılır.',
    examTip:
      'İletken yüklü kürelerin içinde elektrik alan ve net yük sıfırdır; tüm fazla yük dış yüzeyde toplanır (Faraday kafesi).',
    isHighYield: true,
  },
  {
    id: 'phys-ohm-direnc',
    term: 'Elektriksel Direnç ve Ohm Yasası',
    formula: 'R = ρ · L / A  |  V = I · R',
    siUnit: 'Ω (Ohm), V (Volt), A (Amper)',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'TYT',
    mechanism:
      'İletkenin direnci boyla doğru, kesit alanıyla ters orantılıdır; sabit sıcaklıkta gerilim ile akım şiddeti doğru orantılıdır.',
    examTip:
      'Ampermetre devreye seri (iç direnci ~0), voltmetre ise devreye paralel (iç direnci çok büyük) bağlanır.',
    isHighYield: true,
  },
  {
    id: 'phys-lamba-parlaklik',
    term: 'Elektriksel Güç ve Lamba Parlaklığı',
    formula: 'P = V·I = I²·R = V² / R',
    siUnit: 'W (Watt)',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'TYT',
    mechanism:
      'Özdeş lambaların parlaklığı birim zamanda tükettikleri elektriksel güç ile doğru orantılıdır; paralel kollarda gerilim eşittir.',
    examTip:
      'İç direnci önemsiz üretece paralel bağlı lambalardan biri söndüğünde diğerlerinin gerilimi ve parlaklığı değişmez.',
    isHighYield: true,
  },
  {
    id: 'phys-uretec-baglama',
    term: 'Seri ve Paralel Üreteçler',
    formula: 'Seri: ε_eş = ε₁ ± ε₂  |  Paralel: ε_eş = ε',
    siUnit: 'V (Volt)',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'TYT',
    mechanism:
      'Seri düz bağlı üreteçler toplam EMK’yi artırırken paralel bağlı özdeş üreteçler gerilimi artırmaz, akımı bölüşerek tükenme ömrünü uzatır.',
    examTip:
      'Bir üretecin ömrü üzerinden çekilen akım şiddeti ile ters orantılıdır.',
    isHighYield: false,
  },
  {
    id: 'phys-coulomb',
    term: 'Coulomb Kuvveti ve Elektrik Alan',
    formula: 'F = k·q₁·q₂ / d²  |  E = k·q / d²',
    siUnit: 'N, N/C (V/m)',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    mechanism:
      'Noktasal iki yük arasındaki elektriksel itme/çekme kuvveti uzaklığın karesiyle ters orantılıdır; elektrik alan +1 C yüke etkiyen kuvvettir.',
    examTip:
      'Elektrik alan çizgileri + yükten dışarı, − yüke içeri doğrudur ve birbirini asla kesmez.',
    isHighYield: true,
  },
  {
    id: 'phys-potansiyel',
    term: 'Elektriksel Potansiyel ve Yapılan İş',
    formula: 'V = k·q / d  |  W = q · (V_son − V_ilk)',
    siUnit: 'V = J/C',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    mechanism:
      'Elektriksel potansiyel skaler bir büyüklüktür; yükün eş potansiyel yüzeyi üzerinde hareket ettirilmesi sırasında elektriksel iş yapılmaz.',
    examTip:
      'İki yük arasındaki elektriksel potansiyel enerji E_p = k·q₁·q₂ / d bağıntısında yüklerin (+ / −) işareti mutlaka formüle yazılır.',
    isHighYield: true,
  },
  {
    id: 'phys-duzgun-e-alan',
    term: 'Paralel Levhalar ve Düzgün Elektrik Alan',
    formula: 'E = V / d  |  F = q·E = q·V / d',
    siUnit: 'V/m',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    mechanism:
      'Potansiyel farkı V ile yüklenmiş d mesafeli paralel levhalar arasında elektrik alan her noktada sabit ve + levhadan − levhaya doğrudur.',
    examTip:
      'Bir levhadan serbest bırakılan q yüklü parçacığın karşı levhaya çarpma kinetik enerjisi E_k = q·V olup levhalar arası uzaklık d’den bağımsızdır.',
    isHighYield: true,
  },
  {
    id: 'phys-sigac',
    term: 'Sığaç (Kondansatör) ve Sığa',
    formula: 'C = ε · A / d  |  q = C · V  |  E = ½·C·V²',
    siUnit: 'F (Farad)',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    mechanism:
      'Sığa yalnızca levha alanı (A), uzaklık (d) ve aradaki dielektrik katsayısına (ε) bağlıdır; doğru akımda yüklenene kadar akım geçirip yük depolar.',
    examTip:
      'Üreteçten ayrılan sığacın yükü (q) sabit kalır; üretece bağlıyken levha uzaklığı değişirse gerilim (V) sabit kalır.',
    isHighYield: true,
  },
  {
    id: 'phys-manyetik-alan',
    term: 'Akım Geçen Tellerde Manyetik Alan',
    formula: 'Düz: 2Ki/d  |  Halka: 2πKi/r  |  Bobin: 4πKNi/L',
    siUnit: 'T (Tesla)',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'TYT_AYT',
    mechanism:
      'Akım geçen her iletkenin çevresinde sağ el kuralıyla yönü belirlenen manyetik alan oluşur; bobin içinde düzgün alan meydana gelir.',
    examTip:
      'Düz telde başparmak akımı, bükülen dört parmak manyetik alan halkalarının dönme yönünü gösterir.',
    isHighYield: true,
  },
  {
    id: 'phys-manyetik-kuvvet',
    term: 'Manyetik Kuvvet ve Yüklü Parçacık Yörüngesi',
    formula: 'F = B·i·L·sinα  |  F = q·v·B·sinα  |  r = mv / (qB)',
    siUnit: 'N (Newton), m',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    mechanism:
      'Manyetik kuvvet hıza daima dik olduğundan parçacığın süratini değiştirmez, yalnızca yönünü saptırarak çembersel yörünge çizdirir.',
    examTip:
      'Aynı yönde akım taşıyan paralel iki tel birbirini çeker, zıt yönde akım taşıyanlar birbirini iter.',
    isHighYield: true,
  },
  {
    id: 'phys-aki-induksiyon',
    term: 'Manyetik Akı ve İndüksiyon EMK (Faraday)',
    formula: 'Φ = B·A·cosα  |  ε = −N · ΔΦ / Δt',
    siUnit: 'Wb (Weber), V',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    mechanism:
      'Kapalı bir yüzeyden geçen manyetik akı zamanla değişirse devrede indüksiyon elektromotor kuvveti ve akımı oluşur.',
    examTip:
      'Manyetik alan içinde sabit hızla çekilen telin uçlarında ε = B·v·L, bir ucu etrafında dönen çubukta ε = ½·B·ω·L² oluşur.',
    isHighYield: true,
  },
  {
    id: 'phys-lenz',
    term: 'Lenz Yasası ve Öz-İndüksiyon',
    formula: 'ε_öz = −L · Δi / Δt',
    siUnit: 'H (Henry), V',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    mechanism:
      'İndüksiyon akımı daima kendisini doğuran manyetik akı değişimine karşı koyacak yönde oluşur; öz-indüksiyon akım değişimine tepki verir.',
    examTip:
      'Akı artıyorsa indüksiyon B_ind mevcut B’ye zıt; akı azalıyorsa B_ind mevcut B ile aynı yöndedir.',
    isHighYield: true,
  },
  {
    id: 'phys-alternatif-akim',
    term: 'Alternatif Akım (AC) ve Etkin Değer',
    formula: 'V_etkin = V_max / √2  |  I_etkin = I_max / √2',
    siUnit: 'V, A, Hz',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    mechanism:
      'Yönü ve şiddeti zamana bağlı olarak sinüzoidal değişen akımdır; şebeke gerilimi (220 V) etkin değerdir ve ölçüm aletleri etkin değeri okur.',
    examTip:
      'Sığaç doğru akımda devreyi keserken alternatif akımda sürekli dolup boşalarak akım geçişine izin verir.',
    isHighYield: false,
  },
  {
    id: 'phys-empedans-rezonans',
    term: 'İndüktif, Kapasitif Reaktans ve Rezonans',
    formula: 'X_L = ω·L = 2πfL  |  X_C = 1 / (ωC)',
    siUnit: 'Ω (Ohm)',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    mechanism:
      'AC frekansı arttıkça bobinin direnci X_L artar, sığacın direnci X_C azalır; X_L = X_C olduğunda RLC devresi rezonansa girer.',
    examTip:
      'Rezonans durumunda empedans (Z) minimum olup dirence (R) eşitlenir ve devreden geçen etkin akım maksimuma ulaşır.',
    isHighYield: true,
  },
  {
    id: 'phys-transformator',
    term: 'Transformatörler (Gerilim Dönüştürücü)',
    formula: 'V_p / V_s = N_p / N_s  |  Verim: P_çıkış / P_giriş',
    siUnit: 'Birimisiz oran / %',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'AYT',
    mechanism:
      'Manyetik akı değişimi prensibiyle yalnızca alternatif akımla çalışarak gerilimi yükseltir veya alçaltır.',
    examTip:
      'Transformatörler doğru akımla (DC) çalışmaz; ideal transformatörde P_giriş = P_çıkış olduğundan gerilim yükselirse akım düşer.',
    isHighYield: true,
  },
  {
    id: 'phys-eddy-motor',
    term: 'Elektrik Motoru ve Jeneratör (Dinamo)',
    formula: 'Motor: Elektrik → Mekanik  |  Jeneratör: Mekanik → Elektrik',
    siUnit: 'W',
    category: 'ELEKTRIK_MANYETIZMA',
    examLevel: 'TYT_AYT',
    mechanism:
      'Elektrik motoru manyetik alandaki akım geçen çerçeveye etkiyen torkla döner; jeneratör ise dönen çerçevede akı değişimiyle EMK üretir.',
    examTip:
      'Uzun mesafe enerji iletiminde telde I²R ısı kaybını azaltmak için gerilim yükseltilip akım düşürülür.',
    isHighYield: false,
  },

  // ==========================================
  // 4. DALGALAR & OPTİK (16 kavram)
  // ==========================================
  {
    id: 'phys-dalga-temel',
    term: 'Dalga Hızı, Frekans ve Dalga Boyu',
    formula: 'v = λ · f = λ / T',
    siUnit: 'm/s, m, Hz (1/s)',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    mechanism:
      'Yayılma hızı (v) yalnızca ortama, frekans (f) ve periyot (T) ise yalnızca kaynağa bağlıdır.',
    examTip:
      'Ortam değişmediği sürece dalganın hızı değişmez; kaynak değişmedikçe dalganın frekansı değişmez.',
    isHighYield: true,
  },
  {
    id: 'phys-yay-dalgalari',
    term: 'Yay Dalgalarında Hız, Yansıma ve İletim',
    formula: 'v = √(F / μ)   (μ = m / L)',
    siUnit: 'm/s',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    mechanism:
      'İnce yayda hız büyük, kalın yayda küçüktür; sabit uçtan yansıyan atma baş aşağı dönerken serbest uçtan aynı taraftan yansır.',
    examTip:
      'İletilen atma her zaman gelen atma ile aynı taraftadır; inceden kalına geçerken yansıyan atma ters döner.',
    isHighYield: true,
  },
  {
    id: 'phys-su-dalgalari',
    term: 'Su Dalgalarında Derinlik, Kırılma ve Stroboskop',
    formula: 'v_derin > v_sığ  |  f_d = n · f_s',
    siUnit: 'm/s, Hz',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    mechanism:
      'Su derinliği arttıkça dalganın hızı ve dalga boyu artar; stroboskopta dalga tepeleri duruyor gibi göründüğünde f_d = n · f_s bağıntısı geçerlidir.',
    examTip:
      'Sığdan derine eğik giren su dalgası hızlanarak normalden uzaklaşır; dalga boyu büyür ama frekansı sabit kalır.',
    isHighYield: true,
  },
  {
    id: 'phys-ses-deprem',
    term: 'Ses Dalgaları ve Deprem Büyüklüğü',
    formula: 'f (Yükseklik/Tizlik), A (Şiddet/Gürlük), Tını',
    siUnit: 'Hz, dB (Desibel)',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    mechanism:
      'Ses boşlukta yayılmaz ve en hızlı katılarda yayılır; yükseklik frekansa, şiddet genliğe, tını ise kaynağın cinsine bağlıdır.',
    examTip:
      'Depremin büyüklüğü (Richter) açığa çıkan enerjiyi ölçer ve tek bir değerdir; şiddeti ise yarattığı hasardır ve yere göre değişir.',
    isHighYield: true,
  },
  {
    id: 'phys-aydinlanma',
    term: 'Işık Şiddeti, Işık Akısı ve Aydınlanma',
    formula: 'Φ = 4πI  |  E = (I / d²) · cosα',
    siUnit: 'cd, lm (Lümen), lx (Lüks)',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    mechanism:
      'Küre merkezindeki noktasal kaynağın küre yüzeyinde oluşturduğu toplam ışık akısı yalnızca I’ya bağlıdır, yarıçaptan bağımsızdır.',
    examTip:
      'Paralel ışık demetinin yüzeye dik düştüğü noktada aydınlanma şiddeti mesafeden bağımsız ve maksimumdur.',
    isHighYield: true,
  },
  {
    id: 'phys-golge',
    term: 'Tam Gölge ve Yarı Gölge',
    formula: 'Işık almayan bölge = Tam Gölge',
    siUnit: 'Alan (m²)',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    mechanism:
      'Işığın doğrusal yayılması sonucu saydam olmayan engel arkasında hiçbir kaynaktan ışık almayan bölge tam, kısmen alan bölge yarı gölge olur.',
    examTip:
      'Küresel ışık kaynağı engele yaklaştırılırsa tam gölge küçülürken yarı gölge alanı büyür.',
    isHighYield: false,
  },
  {
    id: 'phys-duzlem-ayna',
    term: 'Düzlem Aynada Yansıma ve Görüş Alanı',
    formula: 'θ_gelme = θ_yansıma  |  Görüş: Göz simetriği',
    siUnit: 'Derece (°)',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    mechanism:
      'Düzlem aynada görüntü simetrik, düz, sanal ve cisimle aynı boydadır; ayna α kadar döndürülürse yansıyan ışın 2α döner.',
    examTip:
      'Gözlemci aynaya dik olarak yaklaşırsa görüş alanı büyür; paralel hareket ederse görüş alanının büyüklüğü değişmez.',
    isHighYield: true,
  },
  {
    id: 'phys-kuresel-ayna',
    term: 'Çukur ve Tümsek Aynalar',
    formula: '1/f = 1/d_c + 1/d_g  |  f = R / 2',
    siUnit: 'm (Odak Uzaklığı)',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    mechanism:
      'Odak uzaklığı yalnızca eğrilik yarıçapına bağlıdır; çukur ayna ışığı toplarken tümsek ayna dağıtır ve daima düz-küçük sanal görüntü verir.',
    examTip:
      'Tüm sanal görüntüler cisimle aynı yönlü (düz), tüm gerçek görüntüler ise cisme göre terstir ve perde üzerine düşürülebilir.',
    isHighYield: true,
  },
  {
    id: 'phys-snell-kirilma',
    term: 'Işığın Kırılması ve Snell Yasası',
    formula: 'n₁ · sin(i) = n₂ · sin(r)  |  v = c / n',
    siUnit: 'Birimisiz indis (n ≥ 1)',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    mechanism:
      'Işık az yoğun ortamdan çok yoğun ortama geçerken yavaşlar ve normale yaklaşır; çok yoğundan az yoğuna sınır açısından büyük gelirse tam yansıma yapar.',
    examTip:
      'Sınır açısı yalnızca iki ortamın kırıcılık indislerine bağlıdır; fiber optik kablolar ve serap olayı tam yansıma ile açıklanır.',
    isHighYield: true,
  },
  {
    id: 'phys-gorunur-derinlik',
    term: 'Görünür Derinlik',
    formula: 'h_görünür = h_gerçek · (n_göz / n_cisim)',
    siUnit: 'm',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    mechanism:
      'Havadan suya bakan gözlemci balığı gerçek yerinden daha yakında (yüzeye yakın) görür; sudan havaya bakan balık ise cismi daha uzakta görür.',
    examTip:
      'Küresel yüzey veya paralel yüzlü camdan bakılırken ortamın indisi arttıkça yaklaşma miktarı da artar.',
    isHighYield: false,
  },
  {
    id: 'phys-mercekler',
    term: 'İnce ve Kalın Kenarlı Mercekler',
    formula: '1/f = (n_m/n_o − 1)·(1/R₁ + 1/R₂)',
    siUnit: 'm, Diyoptri (1/m)',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    mechanism:
      'Merceğin odak uzaklığı eğrilik yarıçaplarının yanında hem kendi kırıcılık indisine hem de bulunduğu ortamın indisine bağlıdır.',
    examTip:
      'Mercek kendi indisinden büyük indisli bir ortama konursa karakter değiştirir (ince kenarlı mercek ışığı dağıtmaya başlar).',
    isHighYield: true,
  },
  {
    id: 'phys-renk-filtre',
    term: 'Işık ve Boya Renkleri ile Filtreler',
    formula: 'Işık: K + Y + M = Beyaz  |  Boya: S + C + Mg = Siyah',
    siUnit: 'Renk Tayfı',
    category: 'DALGA_OPTIK',
    examLevel: 'TYT',
    mechanism:
      'Işıkta ana renkler Kırmızı, Yeşil, Mavi iken boyada Sarı, Cyan, Magenta ana renktir; cisimler yalnızca yansıttığı veya geçirdiği renkte görünür.',
    examTip:
      'Sarı ışık (K+Y) altında mavi cisim hiçbir bileşeni yansıtamadığı için siyah görünür; saf sarı ile K+Y karışımı filtre geçişinde aynı davranır.',
    isHighYield: true,
  },
  {
    id: 'phys-cift-yarik',
    term: 'Çift Yarıkta Girişim (Young Deneyi)',
    formula: 'Δx = (L · λ) / (d · n)',
    siUnit: 'm (Saçak Genişliği)',
    category: 'DALGA_OPTIK',
    examLevel: 'AYT',
    mechanism:
      'Tek renkli ışığın iki yarıktan geçip girişim yapmasıyla ekranda eşit genişlikte aydınlık ve karanlık saçaklar oluşur.',
    examTip:
      'Ekran ile yarık arasına indisi (n) büyük ortam konursa saçak genişliği Δx azalır ve ekrana sığan saçak sayısı artar.',
    isHighYield: true,
  },
  {
    id: 'phys-tek-yarik',
    term: 'Tek Yarıkta Kırınım',
    formula: 'Δx = (L · λ) / (w · n)  |  A₀ genişliği = 2·Δx',
    siUnit: 'm',
    category: 'DALGA_OPTIK',
    examLevel: 'AYT',
    mechanism:
      'Işığın w genişliğindeki tek yarıktan geçerken bükülmesi sonucu merkezî aydınlık saçak diğer saçakların iki katı genişlikte ve en parlak olur.',
    examTip:
      'Su dalgalarında kırınımın gözlenmesi için yarık genişliği w ≤ λ olmalıdır.',
    isHighYield: true,
  },
  {
    id: 'phys-doppler',
    term: 'Doppler Olayı (Ses ve Işık)',
    formula: 'f_algılanan = f · (v ± v_g) / (v ∓ v_k)',
    siUnit: 'Hz',
    category: 'DALGA_OPTIK',
    examLevel: 'AYT',
    mechanism:
      'Kaynak ile gözlemci birbirine yaklaşırken algılanan frekans artar (dalga boyu azalır, ışıkta maviye kayma); uzaklaşırken azalır (kızıla kayma).',
    examTip:
      'Uzak galaksilerden gelen ışığın kızıla kayması evrenin genişlediğinin kanıtıdır.',
    isHighYield: true,
  },
  {
    id: 'phys-em-spektrum',
    term: 'Elektromanyetik Dalgalar ve Spektrum',
    formula: 'E_max = B_max · c  |  λ·f = c',
    siUnit: 'm/s, Hz, eV',
    category: 'DALGA_OPTIK',
    examLevel: 'AYT',
    mechanism:
      'Yüklerin ivmeli hareketiyle oluşur, enine dalgadır ve boşlukta ışık hızıyla yayılır; enerji sırası Radyo < Mikro < Kızılötesi < Görünür < Morötesi < X < Gama şeklindedir.',
    examTip:
      'Elektrik ve manyetik alan bileşenleri yüksüz olduğundan elektromanyetik dalgalar elektrik ve manyetik alanda sapmaz.',
    isHighYield: true,
  },

  // ==========================================
  // 5. ÇEMBERSEL & MODERN FİZİK (16 kavram)
  // ==========================================
  {
    id: 'phys-cembersel',
    term: 'Düzgün Çembersel Hareket ve Merkezcil Kuvvet',
    formula: 'v = ω·r = 2πr/T  |  F_m = m·v²/r = m·ω²·r',
    siUnit: 'rad/s, m/s², N',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Sürat sabit kalsa da hızın yönü sürekli değiştiği için merkeze yönelik net bir merkezcil ivme ve kuvvet vardır.',
    examTip:
      'Merkezcil kuvvet ayrı bir temel kuvvet değildir; ipte gerilme, virajda sürtünme veya ağırlık bileşenlerinin net bileşkesidir.',
    isHighYield: true,
  },
  {
    id: 'phys-viraj',
    term: 'Yatay ve Eğimli Viraj Şartı',
    formula: 'Yatay: v_max = √(g·r·k)  |  Eğimli: v = √(g·r·tanθ)',
    siUnit: 'm/s',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Yatay virajda savrulmamak için sürtünme kuvveti merkezcil kuvveti sağlamalıdır; sürtünmesiz eğimli virajda ise normal kuvvetin yatay bileşeni görev yapar.',
    examTip:
      'Hem yatay hem sürtünmesiz eğimli virajda güvenli dönüş hızı aracın kütlesinden (m) bağımsızdır.',
    isHighYield: true,
  },
  {
    id: 'phys-eylemsizlik-acisal',
    term: 'Eylemsizlik Momenti ve Açısal Momentum',
    formula: 'I = k·m·r²  |  L = I·ω = m·v·r  |  τ_net = ΔL/Δt',
    siUnit: 'kg·m², kg·m²/s',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Dönme hareketine karşı gösterilen direnç eylemsizlik momentidir; dış tork sıfır olduğunda açısal momentum (L) korunur.',
    examTip:
      'Buz patencisi kollarını kapattığında I azalır; L = I·ω korunduğu için açısal hızı ω artar.',
    isHighYield: true,
  },
  {
    id: 'phys-oteleme-donme',
    term: 'Yuvarlanma (Öteleme + Dönme) Kinetik Enerjisi',
    formula: 'E_toplam = ½·m·v² + ½·I·ω²',
    siUnit: 'J (Joule)',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Kaymadan yuvarlanan cismin hem öteleme hem dönme kinetik enerjisi vardır; tepe noktasında anlık hız 2v, yere değen noktada sıfırdır.',
    examTip:
      'Eğik düzlemden bırakılan eşit kütleli cisimlerden eylemsizlik momenti (I) küçük olan (ör. dolu küre, halkaya göre) daha hızlı hızlanır ve tabana önce ulaşır.',
    isHighYield: false,
  },
  {
    id: 'phys-kepler',
    term: 'Kütle Çekimi ve Kepler Yasaları',
    formula: 'F = G·M·m / r²  |  R³ / T² = sabit',
    siUnit: 'N, m³/s²',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Gezegenler odaklarından birinde Güneş bulunan eliptik yörüngelerde dolanır ve eşit sürede eşit alan tararlar.',
    examTip:
      'Gezegen Güneş’e yaklaştıkça açısal momentumu sabit kalırken kütle çekim potansiyel enerjisi azalır, çizgisel hızı ve kinetik enerjisi artar.',
    isHighYield: true,
  },
  {
    id: 'phys-bhh',
    term: 'Basit Harmonik Hareket (Yay ve Basit Sarkaç)',
    formula: 'T_yay = 2π·√(m/k)  |  T_sarkaç = 2π·√(L/g)',
    siUnit: 's (Periyot)',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Geri çağırıcı kuvvet uzanımla doğru orantılı ve denge konumuna yöneliktir (F = −m·ω²·x); denge noktasında hız maksimum, uçlarda ivme maksimumdur.',
    examTip:
      'Yay sarkacının periyodu yer çekimi ivmesi g’den bağımsızdır (Ay’da değişmez); basit sarkacın periyodu ise kütleden bağımsızdır.',
    isHighYield: true,
  },
  {
    id: 'phys-ozel-gorelilik',
    term: 'Özel Görelilik (Einstein Postülatları)',
    formula: 'c = sabit  |  Zaman Genişlemesi & Uzunluk Büzülmesi  |  E = mc²',
    siUnit: 'm/s, J',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Işık hızı boşlukta tüm eylemsiz gözlem çerçeveleri için aynıdır; ışık hızına yakın hızlarda hareket eden saat yavaşlar ve hareket doğrultusundaki boy kısalır.',
    examTip:
      'Michelson-Morley deneyi esir (eter) maddesinin var olmadığını ve ışık hızının kaynağın hareketinden bağımsız olduğunu kanıtlamıştır.',
    isHighYield: true,
  },
  {
    id: 'phys-siyah-cisim',
    term: 'Siyah Cisim Işıması ve Planck Kuantumu',
    formula: 'λ_max · T = 2,898×10⁻³ m·K (Wien)  |  E = h·f',
    siUnit: 'K, J (eV)',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Cisimlerin sıcaklığı arttıkça yaptıkları maksimum şiddetli ışımanın dalga boyu kısalır (kırmızıdan mavi-beyaza kayar); enerji h·f paketçikleriyle kuantumludur.',
    examTip:
      'Klasik fiziğin açıklayamadığı morötesi felaketi, Planck’ın enerji kuantumlaşması hipoteziyle çözülmüştür.',
    isHighYield: false,
  },
  {
    id: 'phys-fotoelektrik',
    term: 'Fotoelektrik Olay ve Einstein Denklemi',
    formula: 'E_foton = h·c / λ = 12400 / λ(Å) = E₀ + e·V_kesme',
    siUnit: 'eV, Volt',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Foton enerjisi metalin bağlanma (eşik) enerjisi E₀’dan büyükse elektron koparılır; kalan enerji kopan fotoelektronun maksimum kinetik enerjisine dönüşür.',
    examTip:
      'Işık şiddeti (akı) yalnızca birim zamanda kopan elektron sayısını ve maksimum akımı artırır; kopan elektronların Kinetik Enerjisi ile V_kesme’yi artırmaz!',
    isHighYield: true,
  },
  {
    id: 'phys-compton-debroglie',
    term: 'Compton Saçılması ve De Broglie Dalga Boyu',
    formula: 'Δλ = (h / m_e·c)·(1 − cosθ)  |  λ = h / (m·v)',
    siUnit: 'm / Å',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Compton olayında X-ışını fotonu serbest elektrona çarpınca enerjisinin bir kısmını aktarır ve daha büyük dalga boyuyla saçılır; fotonun hızı c sabit kalır.',
    examTip:
      'Compton ve fotoelektrik ışığın tanecik doğasını, girişim ve kırınım ise dalga doğasını kanıtlar (De Broglie madde dalgaları).',
    isHighYield: true,
  },
  {
    id: 'phys-bohr-atom',
    term: 'Bohr Atom Modeli ve Hidrojen Spektrumu',
    formula: 'r_n = 0,53·n²/Z Å  |  E_n = −13,6·Z²/n² eV',
    siUnit: 'Å, eV',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Elektronlar yalnızca L = n·h/(2π) açısal momentumuna sahip kararlı yörüngelerde ışıma yapmadan dolanır; üst yörüngeden alta inerken ΔE enerjili foton salar.',
    examTip:
      'Lyman (n→1, morötesi), Balmer (n→2, görünür ışık) ve Paschen (n→3, kızılötesi) serileridir; yörünge büyüdükçe |E_n| azalır, toplam enerji artar.',
    isHighYield: true,
  },
  {
    id: 'phys-buyuk-patlama',
    term: 'Büyük Patlama (Big Bang) ve Hubble Yasası',
    formula: 'v = H₀ · d',
    siUnit: 'km/s, Mpc',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Evren yaklaşık 13,8 milyar yıl önce tekillikten genişlemeye başlamıştır; kozmik mikrodalga artalan ışıması ve kızıla kayma bu kuramın temel kanıtlarıdır.',
    examTip:
      'Hubble yasasına göre bizden daha uzaktaki galaksiler daha büyük bir hızla uzaklaşmaktadır.',
    isHighYield: false,
  },
  {
    id: 'phys-standart-model',
    term: 'Standart Model (Kuarklar, Leptonlar, Bozonlar)',
    formula: 'Baryon = 3 Kuark (qqq)  |  Mezon = q + q̄',
    siUnit: 'e (Temel Yük)',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Fermiyonlar (6 kuark + 6 lepton) maddeyi oluştururken bozonlar (foton, gluon, W/Z, graviton) temel kuvvetleri taşır; Higgs bozonu parçacıklara kütle kazandırır.',
    examTip:
      'Proton (uud: +2/3 +2/3 −1/3 = +1) ve nötron (udd: 0) baryon grubundadır ve güçlü nükleer kuvvetle bir arada tutulur; elektron ise bir leptondur.',
    isHighYield: true,
  },
  {
    id: 'phys-radyoaktivite',
    term: 'Radyoaktivite, Fisyon ve Füzyon',
    formula: 'α (⁴₂He): Z−2, A−4  |  β⁻: Z+1, A sabit',
    siUnit: 'Bq (Becquerel)',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Kararsız çekirdekler alfa, beta ve gama bozunmalarıyla kararlı hâle geçer; fisyonda ağır çekirdek bölünür, füzyonda hafif çekirdekler birleşir.',
    examTip:
      'Gama (γ) ışıması elektromanyetik dalga olduğu için çekirdeğin atom numarasını (Z) ve kütle numarasını (A) değiştirmez.',
    isHighYield: true,
  },
  {
    id: 'phys-goruntuleme',
    term: 'Tıbbi Görüntüleme (Röntgen, MR, PET, USG)',
    formula: 'Röntgen/BT: X-ışını  |  MR: Radyo  |  USG: Ses',
    siUnit: 'Hz / λ',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Röntgen ve BT iyonlaştırıcı X-ışınlarıyla, MR güçlü manyetik alan ve radyo dalgalarıyla, USG ise yüksek frekanslı ses dalgalarıyla görüntü üretir.',
    examTip:
      'MR ve Ultrason (USG) iyonlaştırıcı radyasyon içermez; PET ise pozitron-elektron yok olması sonucu çıkan gama ışınlarını kullanır.',
    isHighYield: true,
  },
  {
    id: 'phys-yari-super-laser',
    term: 'Yarı İletkenler, Süper İletkenlik ve LASER',
    formula: 'Diyot (Tek Yön) · Meissner Etkisi (R=0) · Uyarılmış Emisyon',
    siUnit: 'Ω, K',
    category: 'CEMBER_MODERN',
    examLevel: 'AYT',
    mechanism:
      'Yarı iletkenlerde diyot akımı tek yönde geçirir; süper iletkenler kritik sıcaklığın altında sıfır direnç ve manyetik alanı dışlama (Meissner) gösterir.',
    examTip:
      'LASER ışığı uyarılmış emisyonla elde edildiğinden tek renkli (monokromatik), aynı fazlı ve dağılmadan uzaklara giden eş evreli ışıktır.',
    isHighYield: true,
  },
];
