/**
 * Convert a monetary number to string.
 *
 * Ex.: 123456 to 1.234,56
 */
export function monetaryNumberToString(number: number) {
  return (number / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });
}
