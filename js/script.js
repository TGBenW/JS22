"use strict";

const title = document.getElementsByTagName('h1')[0];
const buttons = document.getElementsByClassName('handler_btn');
const plusBtn = document.querySelector('.screen-btn');
const percentElem = document.querySelectorAll('.other-items.percent');
const numberElem = document.querySelectorAll('.other-items.number');
const rangeElem = document.querySelector('.rollback .range-value');
const totalInputArr = [{}];

const getTotalInputArr = function () {
  for (let i = 0; i < document.getElementsByClassName('total-input').length; i++) {
    totalInputArr[i] = document.getElementsByClassName('total-input')[i];
  }
};
getTotalInputArr();

let screenBlocks = document.querySelectorAll('.screen');


const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesArr: [
    {name: "", price: 0},
    {name: "", price: 0}
  ],
  asking: function () {
    do {
      appData.title = prompt("Как называется ваш проект?", "Новый проект").trim();
    } while (appData.isNumber(appData.title) || appData.title.length === 0);

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt("Какие типы экранов нужно разработать?", "Простой").trim();
      } while (appData.isNumber(name) || name.length === 0);

      do {
        price = prompt("Сколько будет стоить данная работа?");
        console.log(price, typeof price);
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: +price });
      console.log(appData.screens);
    }

    for (let i = 0; i < 2; i++) {
      do {
        appData.servicesArr[i].name = prompt("Какой дополнительный тип услуги нужен?", "Метрика").trim();
      } while (appData.isNumber(appData.servicesArr[i].name) || appData.servicesArr[i].name.length === 0);

      do {
        appData.servicesArr[i].price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(appData.servicesArr[i].price));
    }

    appData.adaptive = !!confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    let screenPriceArray = [];
    for (let i = 0; i < appData.screens.length; i++) {
      screenPriceArray[i] = appData.screens[i].price;
    }
    appData.screenPrice = screenPriceArray.reduce(function(a, b) {
      return a + b;
    });
    console.log("!!!! - " + appData.screenPrice);

    for (let i = 0; i < appData.servicesArr.length; i++) {
      appData.allServicePrices += +appData.servicesArr[i].price;
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 300000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что-то пошло не так";
    }
  },
  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function () {
    appData.title = appData.title.trim();
    appData.title = appData.title.toLowerCase();
    appData.title = appData.title.charAt(0).toUpperCase() + appData.title.slice(1);
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },
  splitString: function (stringToSplit, separator) {
    return stringToSplit.split(separator);
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.servicesArr);
  },
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();

    appData.logger();
  },
};

//appData.start();
