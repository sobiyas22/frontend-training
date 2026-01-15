const arr = [20, 4, 6, 23, 1, 50];

const doubled = arr.map(n => n * 2);

const greaterThanTen = arr.filter(n => n > 10);


const sum = arr.reduce((total, n) => total + n, 0);
const reversed = [...arr].reverse();
