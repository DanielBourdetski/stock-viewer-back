const calcMonthAgo = date => {
  const month = -1;
  if (date && month) {
    var m,
      d = (date = new Date(+date)).getDate();

    date.setMonth(date.getMonth() + month, 1);
    m = date.getMonth();
    date.setDate(d);
    if (date.getMonth() !== m) date.setDate(0);
  }
  return date;
};

const padDateWithZero = date => date.toString().padStart(2, '0');

const getDateString = date =>
  `${date.getUTCFullYear()}-${padDateWithZero(date.getUTCMonth())}-${padDateWithZero(date.getUTCDate())}`;

module.exports = {
  calcMonthAgo,
  getDateString,
};
