"use strict";

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Новый проект");
    /*appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные, Интерактивные"
    );

    do {
      appData.screenPrice = +prompt("Сколько будет стоить данная работа?");
      //console.log(appData.screenPrice, typeof appData.screenPrice);
    } while (!appData.isNumber(appData.screenPrice));*/

    for (let i = 0; i < 2; i++) {
      let name = prompt("Какие типы экранов нужно разработать?");
      let price = 0;

      do {
        price = +prompt("Сколько будет стоить данная работа?");
        //console.log(price, typeof price);
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
      let price = 0;
      do {
        price = prompt("Сколько это будет стоить?");
        //console.log(price, typeof price);
      } while (!appData.isNumber(price));

      appData.services[name] = +price;
      //console.log(price, typeof price);
    }

    //appData.screenPrice = +appData.screenPrice.trim();
    appData.adaptive = !!confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
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
  //getAllServicePrices: function () {
  //for (let key in appData.services) {
  //  appData.allServicePrices += appData.services[key];
  //}
  //},
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
    console.log(appData.services);
    console.log(appData.screens);
    /*for (const key in appData) {
      console.log(key);
    }*/
  },
  start: function () {
    appData.asking();
    appData.addPrices();
    //appData.getAllServicePrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();

    appData.logger();
  },
};

appData.start();
