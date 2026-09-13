/** Formats a date while the user types: 040926 becomes "04 09 26". */
export function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean).join(' ');
}

/** Accepts DD MM YY and DD MM YYYY. Two-digit years mean 20YY. */
export function parseDateInput(value?: string) {
  const match = value && /^(\d{2})\D+(\d{2})\D+(\d{2}|\d{4})$/.exec(value.trim());
  if (!match) return undefined;

  const year = match[3].length === 2 ? 2000 + Number(match[3]) : Number(match[3]);
  const date = new Date(year, Number(match[2]) - 1, Number(match[1]));
  return date.getFullYear() === year && date.getMonth() === Number(match[2]) - 1 && date.getDate() === Number(match[1]) ? date : undefined;
}

export function isValidDateInput(value?: string) {
  return Boolean(parseDateInput(value));
}
