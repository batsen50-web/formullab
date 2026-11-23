export interface IonSpec {
  id: string;
  symbol: string;
  formulaPart: string;
  charge: number;
  name: string;
  isPolyatomic: boolean;
  isVariableValence?: boolean;
}

export const CATIONS: readonly IonSpec[] = [
  {id: 'na', symbol: 'Na⁺', formulaPart: 'Na', charge: 1, name: 'Sodyum', isPolyatomic: false},
  {id: 'k', symbol: 'K⁺', formulaPart: 'K', charge: 1, name: 'Potasyum', isPolyatomic: false},
  {id: 'ag', symbol: 'Ag⁺', formulaPart: 'Ag', charge: 1, name: 'Gümüş', isPolyatomic: false},
  {id: 'nh4', symbol: 'NH₄⁺', formulaPart: 'NH_4', charge: 1, name: 'Amonyum', isPolyatomic: true},
  {id: 'mg', symbol: 'Mg²⁺', formulaPart: 'Mg', charge: 2, name: 'Magnezyum', isPolyatomic: false},
  {id: 'ca', symbol: 'Ca²⁺', formulaPart: 'Ca', charge: 2, name: 'Kalsiyum', isPolyatomic: false},
  {id: 'ba', symbol: 'Ba²⁺', formulaPart: 'Ba', charge: 2, name: 'Baryum', isPolyatomic: false},
  {id: 'zn', symbol: 'Zn²⁺', formulaPart: 'Zn', charge: 2, name: 'Çinko', isPolyatomic: false},
  {id: 'al', symbol: 'Al³⁺', formulaPart: 'Al', charge: 3, name: 'Alüminyum', isPolyatomic: false},
  {id: 'fe2', symbol: 'Fe²⁺', formulaPart: 'Fe', charge: 2, name: 'Demir(II)', isPolyatomic: false, isVariableValence: true},
  {id: 'fe3', symbol: 'Fe³⁺', formulaPart: 'Fe', charge: 3, name: 'Demir(III)', isPolyatomic: false, isVariableValence: true},
  {id: 'cu1', symbol: 'Cu⁺', formulaPart: 'Cu', charge: 1, name: 'Bakır(I)', isPolyatomic: false, isVariableValence: true},
  {id: 'cu2', symbol: 'Cu²⁺', formulaPart: 'Cu', charge: 2, name: 'Bakır(II)', isPolyatomic: false, isVariableValence: true},
  {id: 'pb2', symbol: 'Pb²⁺', formulaPart: 'Pb', charge: 2, name: 'Kurşun(II)', isPolyatomic: false, isVariableValence: true},
];

export const ANIONS: readonly IonSpec[] = [
  {id: 'f', symbol: 'F⁻', formulaPart: 'F', charge: -1, name: 'florür', isPolyatomic: false},
  {id: 'cl', symbol: 'Cl⁻', formulaPart: 'Cl', charge: -1, name: 'klorür', isPolyatomic: false},
  {id: 'br', symbol: 'Br⁻', formulaPart: 'Br', charge: -1, name: 'bromür', isPolyatomic: false},
  {id: 'i', symbol: 'I⁻', formulaPart: 'I', charge: -1, name: 'iyodür', isPolyatomic: false},
  {id: 'o', symbol: 'O²⁻', formulaPart: 'O', charge: -2, name: 'oksit', isPolyatomic: false},
  {id: 's', symbol: 'S²⁻', formulaPart: 'S', charge: -2, name: 'sülfür', isPolyatomic: false},
  {id: 'n', symbol: 'N³⁻', formulaPart: 'N', charge: -3, name: 'nitrür', isPolyatomic: false},
  {id: 'oh', symbol: 'OH⁻', formulaPart: 'OH', charge: -1, name: 'hidroksit', isPolyatomic: true},
  {id: 'no3', symbol: 'NO₃⁻', formulaPart: 'NO_3', charge: -1, name: 'nitrat', isPolyatomic: true},
  {id: 'cn', symbol: 'CN⁻', formulaPart: 'CN', charge: -1, name: 'siyanür', isPolyatomic: true},
  {id: 'co3', symbol: 'CO₃²⁻', formulaPart: 'CO_3', charge: -2, name: 'karbonat', isPolyatomic: true},
  {id: 'so4', symbol: 'SO₄²⁻', formulaPart: 'SO_4', charge: -2, name: 'sülfat', isPolyatomic: true},
  {id: 'po4', symbol: 'PO₄³⁻', formulaPart: 'PO_4', charge: -3, name: 'fosfat', isPolyatomic: true},
];
