const str = "hello world";

const titleCase = str
  .split(" ")
  .map(word => word[0].toUpperCase() + word.slice(1))
  .join(" ");

console.log(titleCase); 
