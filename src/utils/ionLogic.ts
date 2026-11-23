import type {IonSpec} from '../data/ions';
import {shuffleArray} from './chemistryLogic';

export interface CrossedCompoundResult {
  formula: string;
  plainFormula: string;
  systematicName: string;
  cationCount: number;
  anionCount: number;
  gcdValue: number;
}

export interface IonChallenge {
  cation: IonSpec;
  anion: IonSpec;
  correctFormula: string;
  systematicName: string;
  choices: string[];
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y !== 0) {
    const tmp = y;
    y = x % y;
    x = tmp;
  }
  return x || 1;
}

function formatIonPart(ion: IonSpec, count: number): string {
  if (count <= 1) return ion.formulaPart;
  if (ion.isPolyatomic) return `(${ion.formulaPart})_${count}`;
  return `${ion.formulaPart}_${count}`;
}

export function crossIons(cation: IonSpec, anion: IonSpec): CrossedCompoundResult {
  const posCharge = Math.abs(cation.charge);
  const negCharge = Math.abs(anion.charge);
  const gcdValue = gcd(posCharge, negCharge);

  const cationCount = negCharge / gcdValue;
  const anionCount = posCharge / gcdValue;

  const formula = `${formatIonPart(cation, cationCount)}${formatIonPart(anion, anionCount)}`;
  const plainFormula = formula.replace(/_/g, '');
  const systematicName = `${cation.name} ${anion.name}`;

  return {
    formula,
    plainFormula,
    systematicName,
    cationCount,
    anionCount,
    gcdValue,
  };
}

export function generateIonChallenge(
  cations: readonly IonSpec[],
  anions: readonly IonSpec[],
  rng: () => number = Math.random,
): IonChallenge {
  const cation = cations[Math.floor(rng() * cations.length)];
  const anion = anions[Math.floor(rng() * anions.length)];
  const result = crossIons(cation, anion);

  const candidateSet = new Set<string>([result.formula]);

  // 1. Common student error: swapped subscripts
  const swapped = `${formatIonPart(cation, Math.abs(cation.charge))}${formatIonPart(
    anion,
    Math.abs(anion.charge),
  )}`;
  candidateSet.add(swapped);

  // 2. Common student error: omitted parentheses on polyatomic ion
  if (anion.isPolyatomic && result.anionCount > 1) {
    candidateSet.add(`${formatIonPart(cation, result.cationCount)}${anion.formulaPart}_${result.anionCount}`);
  }
  if (cation.isPolyatomic && result.cationCount > 1) {
    candidateSet.add(`${cation.formulaPart}_${result.cationCount}${formatIonPart(anion, result.anionCount)}`);
  }

  // 3. Common student error: unsimplified charges
  if (result.gcdValue > 1) {
    candidateSet.add(
      `${formatIonPart(cation, Math.abs(anion.charge))}${formatIonPart(
        anion,
        Math.abs(cation.charge),
      )}`,
    );
  }

  // 4. Fill remaining distractors with plausible count variations
  const fallbackPairs: [number, number][] = [
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 3],
    [3, 2],
    [1, 3],
    [3, 1],
  ];

  for (const [cCount, aCount] of shuffleArray(fallbackPairs, rng)) {
    if (candidateSet.size >= 4) break;
    candidateSet.add(`${formatIonPart(cation, cCount)}${formatIonPart(anion, aCount)}`);
  }

  const distractors = Array.from(candidateSet)
    .filter((f) => f !== result.formula)
    .slice(0, 3);

  const choices = shuffleArray([result.formula, ...distractors], rng);

  return {
    cation,
    anion,
    correctFormula: result.formula,
    systematicName: result.systematicName,
    choices,
  };
}
