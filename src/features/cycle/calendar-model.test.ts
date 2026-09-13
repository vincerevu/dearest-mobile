import { buildCalendarCells, getCycleDayForDate } from './calendar-model';

const cycle = { cycleLength: 28, lastPeriodDate: '01/01/2090', periodLength: 5, regularity: 'regular' as const };

describe('calendar model', () => {
  it('keeps user-reported flow as actual and predicts only future cycle days', () => {
    const cells = buildCalendarCells(new Date(2090, 0, 1), cycle, {
      '2090-01-10': { date: '2090-01-10', energy: 'medium', flow: 2, mood: 'neutral', symptoms: [] },
    }, '2090-01-10');

    expect(cells.find(cell => cell.dateKey === '2090-01-10')?.state).toBe('actual');
    expect(cells.find(cell => cell.dateKey === '2090-01-29')?.state).toBe('predicted');
  });

  it('calculates a cycle day from the user-reported baseline', () => {
    expect(getCycleDayForDate(cycle, '2090-01-15')).toBe(15);
  });
});
