export function heightToStride(height: number) {
  return 0.3 * height + 21;
}

export function timeInSeconds(hour: number, min: number, sec: number) {
  return hour * 3600 + min * 60 + sec;
}

export function toInches(centimeters: number) {
  return centimeters / 2.54;
}

export function toMiles(kilometers: number) {
  return kilometers * 0.621371;
}

export function toMilesPerSec(kps: number) {
  return kps * 1.609344;
}

export function calcBPM(pace: number, stride: number) {
  // 5280 ft/mile * 12 inch/ft * 60 sec/min
  // pace is in sec/mile
  // stride is in inch/step
  // left with step/min which is equivalent to beat/min
  return Math.round((5280 * 12 * 60) / (pace * stride));
}
