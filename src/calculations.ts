export function calculateStride(height: number) {
  return height * 0.414;
}

export function timeInSeconds(hour: number, min: number, sec: number) {
  return hour * 3600 + min * 60 + sec;
}
