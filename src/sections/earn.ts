import { mountCalculator } from './calculator.ts';

/** Creator-economy section. */
export function mountEarn(root: HTMLElement) {
  const calculator = root.querySelector<HTMLElement>('#calculator');
  if (calculator) mountCalculator(calculator);
}
