let title = "TourAgency";
let screens = "Simple, Complex, Interactive";
let screenPrice = 1200;
let rollback = 25;
let fullPrice = 84350;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

console.log(screens.toLowerCase());

console.log(screens.split(", "));

console.log(fullPrice * (rollback / 100));
