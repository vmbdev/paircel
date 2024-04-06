/**
 * Converts the coordinate to DMS (Degrees, Minutes, Seconds)
 * @function
 * @param {number} coord  The coordinate value.
 * @param {'lat' | 'lng'} type  Longitude ('lng') or latitude ('lat')
 * @returns {string} The coordinate in DMS
 */
const toDMS = (coord: number, type: 'lat' | 'lng'): string | null => {
  if (
    (type === 'lat' && (coord < -90 || coord > 90)) ||
    (type === 'lng' && (coord < 0 || coord > 180))
  ) {
    return null;
  }

  const points = type === 'lng' ? ['E', 'W'] : ['N', 'S'];

  const absolute = Math.abs(coord);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

  return `${degrees}º ${minutes}" ${seconds}' ${coord > 0 ? points[0] : points[1]}`;
};

export { toDMS };
