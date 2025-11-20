'use client';

import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface MathFormulaProps {
  formula: string;
  block?: boolean;
  className?: string;
}

/**
 * MathFormula Atom
 * Renders LaTeX mathematical formulas using KaTeX
 */
export const MathFormula: React.FC<MathFormulaProps> = ({
  formula,
  block = false,
  className = '',
}) => {
  try {
    return (
      <span className={className}>
        {block ? (
          <BlockMath math={formula} />
        ) : (
          <InlineMath math={formula} />
        )}
      </span>
    );
  } catch (error) {
    return (
      <span className="text-red-500 font-mono text-sm">
        [خطأ في صيغة LaTeX: {formula}]
      </span>
    );
  }
};
