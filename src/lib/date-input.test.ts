import { formatDateInput, isValidDateInput, parseDateInput } from './date-input';

describe('date input', () => {
  it('groups typed digits with spaces and supports a two-digit year', () => {
    expect(formatDateInput('040926')).toBe('04 09 26');
    expect(parseDateInput('04 09 26')).toEqual(new Date(2026, 8, 4));
  });

  it('accepts an existing four-digit-year value and rejects invalid calendar dates', () => {
    expect(isValidDateInput('04/09/2026')).toBe(true);
    expect(isValidDateInput('31 02 26')).toBe(false);
  });
});
