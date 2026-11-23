import type {FC} from 'react';
import {parseFormulaTokens} from '../utils/chemistryLogic';

interface FormulaTextProps {
  formula: string;
  className?: string;
}

export const FormulaText: FC<FormulaTextProps> = ({formula, className = ''}) => {
  const tokens = parseFormulaTokens(formula);

  return (
    <span className={`font-mono tracking-tight ${className}`}>
      {tokens.map((token, idx) =>
        token.isSub ? (
          <sub key={idx} className="text-[0.68em] leading-none align-sub font-semibold">
            {token.text}
          </sub>
        ) : (
          <span key={idx}>{token.text}</span>
        ),
      )}
    </span>
  );
};
