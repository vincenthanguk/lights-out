const ranBool = function () {
  const randomNumber = Math.random();
  if (randomNumber > 0.5) return true;
  else return false;
};

const checkBooleans = function (arr) {
  return arr.every((n) => n === true);
};

export { ranBool, checkBooleans };
