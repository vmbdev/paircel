import { toDMS } from '@/helpers/geocoords';

describe('Date differences', () => {
  test('Convert 52.998256 latitude to DMS', () => {
    const coords = toDMS(52.998256, 'lat');
    expect(coords).toBe('52º 59" 53\' N');
  });
  test('Convert 35.773382 longitude to DMS', () => {
    const coords = toDMS(35.773382, 'lng');
    expect(coords).toBe('35º 46" 24\' E');
  });
  test('Try to convert 95 latitude to DMS', () => {
    const coords = toDMS(95, 'lat');
    expect(coords).toBe(null);
  });
  test('Try to convert -10 longitude to DMS', () => {
    const coords = toDMS(-10, 'lng');
    expect(coords).toBe(null);
  });
});
