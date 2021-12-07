"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: "",
  service2: "",
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Новый проект");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные, Интерактивные"
    );

    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!appData.isNumber(appData.screenPrice));
    appData.screenPrice = +appData.screenPrice.trim();

    appData.adaptive = !!confirm("Нужен ли адаптив на сайте?");
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
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?", "Отправка форм");
      }

      sum += (() => {
        let n;
        do {
          n = prompt("Сколько это будет стоить?");
        } while (!appData.isNumber(n));
        return +n;
      })();
    }
    return sum;
  },
  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function () {
    appData.title = appData.title.trim();
    appData.title = appData.title.toLowerCase();
    return appData.title.charAt(0).toUpperCase() + appData.title.slice(1);
  },
  getServicePercentPrices: function () {
    return Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
  },
  splitString: function (stringToSplit, separator) {
    return stringToSplit.split(separator);
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    for (const key in appData) {
      console.log(key);
    }
  },
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
    appData.logger();
  },
};

appData.start();
