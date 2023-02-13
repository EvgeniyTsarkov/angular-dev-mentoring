import { FormatDurationPipe } from './format-duration.pipe';

describe('FormatDurationPipe', () => {

  it('shall return correct duration representation', () =>{
    const firstDurationCase = 45;
    const secondDurationCase = 75;

    const formatDurationPipe = new FormatDurationPipe();

    const firstFormattedDuration = formatDurationPipe.transform(firstDurationCase);
    const secondFormattedDuration = formatDurationPipe.transform(secondDurationCase);

    expect(firstFormattedDuration).toBe('45 min');
    expect(secondFormattedDuration).toBe('1h 15 min');
  });

  it('create an instance', () => {
    const pipe = new FormatDurationPipe();
    expect(pipe).toBeTruthy();
  });
});
