import assert from 'node:assert/strict';
import test from 'node:test';
import {ANIONS, CATIONS} from '../data/ions.ts';
import {crossIons, gcd, generateIonChallenge} from './ionLogic.ts';

test('gcd calculates greatest common divisor accurately', () => {
  assert.equal(gcd(2, 2), 2);
  assert.equal(gcd(3, 2), 1);
  assert.equal(gcd(2, 4), 2);
});

test('crossIons simplifies subscripts and handles polyatomic parentheses', () => {
  const al = CATIONS.find((c) => c.id === 'al')!;
  const so4 = ANIONS.find((a) => a.id === 'so4')!;
  const alSulfate = crossIons(al, so4);
  assert.equal(alSulfate.formula, 'Al_2(SO_4)_3');
  assert.equal(alSulfate.plainFormula, 'Al2(SO4)3');
  assert.equal(alSulfate.systematicName, 'Alüminyum sülfat');

  const mg = CATIONS.find((c) => c.id === 'mg')!;
  const o = ANIONS.find((a) => a.id === 'o')!;
  const mgOxide = crossIons(mg, o);
  assert.equal(mgOxide.formula, 'MgO');
  assert.equal(mgOxide.gcdValue, 2);

  const nh4 = CATIONS.find((c) => c.id === 'nh4')!;
  const co3 = ANIONS.find((a) => a.id === 'co3')!;
  const amCarbonate = crossIons(nh4, co3);
  assert.equal(amCarbonate.formula, '(NH_4)_2CO_3');
  assert.equal(amCarbonate.systematicName, 'Amonyum karbonat');

  const fe3 = CATIONS.find((c) => c.id === 'fe3')!;
  const oh = ANIONS.find((a) => a.id === 'oh')!;
  const feHydroxide = crossIons(fe3, oh);
  assert.equal(feHydroxide.formula, 'Fe(OH)_3');
  assert.equal(feHydroxide.systematicName, 'Demir(III) hidroksit');
});

test('generateIonChallenge returns 4 unique choices including the exact crossed formula', () => {
  let seed = 0.42;
  const rng = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 10; i++) {
    const challenge = generateIonChallenge(CATIONS, ANIONS, rng);
    assert.equal(challenge.choices.length, 4);
    assert.equal(new Set(challenge.choices).size, 4);
    assert.ok(challenge.choices.includes(challenge.correctFormula));
  }
});
