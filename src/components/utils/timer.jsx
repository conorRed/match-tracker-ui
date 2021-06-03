export function format(hours, minutes, seconds) {
  hours = hours + "";
  if (hours.length === 1) {
    hours = "0" + hours;
  }
  minutes = minutes + "";
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }
  seconds = seconds + "";
  if (seconds.length === 1) {
    seconds = "0" + seconds;
  }
  let timestamp = hours + ":" + minutes + ":" + seconds;
  return timestamp;
}
