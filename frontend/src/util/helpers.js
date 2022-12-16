export const epochToElapsed = (epochString) => {
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const epoch = parseInt(epochString);

  // calculate elapsed time
  const elapsedTime = Date.now() - epoch;
  const elapsedMinutes = (elapsedTime / (1000 * 60)).toFixed(0);
  const elapsedHours = (elapsedTime / (1000 * 60 * 60)).toFixed(0);

  // return elapsed minutes if less than 1 hour has passed
  if (elapsedHours < 1) {
    return `${elapsedMinutes} minutes ago`;
  }

  // return elapsed hours if less than 24 hours have passed
  if (elapsedHours < 24) {
    return `${elapsedHours} hours ago`;
  }

  // generate & return date if more than 24 hours have passed
  const date = new Date(epoch);
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
};
