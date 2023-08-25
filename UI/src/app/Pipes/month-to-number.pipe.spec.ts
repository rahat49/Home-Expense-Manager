import { MonthToNumberPipe } from './month-to-number.pipe';

describe('MonthToNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new MonthToNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
