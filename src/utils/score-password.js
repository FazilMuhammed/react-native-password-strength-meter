/* eslint radix: ["error", "as-needed"] */
function scorePassword(pass, minLength, limit) {
  let score = 0;
  let variationCount = 0;
  const letters = {};

  if (!pass || pass.length < minLength) {
    return score;
  }

  /* Score unique letters until 5 repetitions */
  for (let i = 0; i < pass.length; i += 1) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1;
    score += 5.0 / letters[pass[i]];
  }

  /* Score character variation */
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  };

  Object.keys(variations).forEach((check) => {
    variationCount += variations[check] === true ? 1 : 0;
  });
  score += (variationCount - 1) * 10;

  return parseInt(score) > limit ? limit : parseInt(score);
}

export default scorePassword;