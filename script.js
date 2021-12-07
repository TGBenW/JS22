"use strict";
let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется ваш проект?", "Новый проект");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));
  screenPrice = +screenPrice.trim();

  adaptive = !!confirm("Нужен ли адаптив на сайте?");
};

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
    return "Что-то пошло не так";
  }
};

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?", "Отправка форм");
    }

    sum += (() => {
      let n;
      do {
        n = prompt("Сколько это будет стоить?");
      } while (!isNumber(n));
      return +n;
    })();
  }
  return sum;
};

function getFullPrice(scrPrice, allSrvcPrices) {
  return scrPrice + allSrvcPrices;
}

const getTitle = function (string) {
  string = string.trim();
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getServicePercentPrices = function (a) {
  return Math.ceil(a - a * (rollback / 100));
};

const splitString = function (stringToSplit, separator) {
  return stringToSplit.split(separator);
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice);
title = getTitle(title);
//////////////////////////////////////
console.log("allServicePrices", allServicePrices);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(splitString(screens, ", "));
console.log("Cообщение о скидке пользователю - " + getRollbackMessage(fullPrice));
console.log("Cтоимость за вычетом процента отката посреднику - " + servicePercentPrice);
