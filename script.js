"use strict";
let rollback = 23.47;

let title = prompt("Как называется ваш проект?", "Новый проект");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = +prompt("Сколько будет стоить данная работа?", 20000);
let adaptive = !!confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

let allServicePrices, fullPrice, servicePercentPrice;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 300000) {
    return "Даем скидку в 5%";
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
};

const getAllServicePrices = function (a, b) {
  return a + b;
};

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

function getFullPrice(a, b) {
  return a + b;
}

fullPrice = getFullPrice(screenPrice, allServicePrices);

const getTitles = function (string) {
  string = string.trim();
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getServicePercentPrices = function (a) {
  return Math.ceil(a - a * (rollback / 100));
};

servicePercentPrice = getServicePercentPrices(fullPrice);

const splitString = function (stringToSplit, separator) {
  return stringToSplit.split(separator);
};

//////////////////////////////////////
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(splitString(screens, ", "));
console.log("Cообщение о скидке пользователю - " + getRollbackMessage(fullPrice));
console.log("Cтоимость за вычетом процента отката посреднику - " + servicePercentPrice);
