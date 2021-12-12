"use strict";

const title = document.getElementsByTagName("h1")[0]; //1
const startBtn = document.getElementsByClassName("handler_btn")[0]; //2
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const plusBtn = document.querySelector(".screen-btn"); //3
const otherItemsPercent = document.querySelectorAll(".other-items.percent"); //4
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const rangeInput = document.querySelector(".rollback > .main-controls__range > input"); //5
const rangeSpan = document.querySelector(".rollback .range-value"); //6

const total = document.getElementsByClassName("total-input")[0]; //7
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalPrice = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen"); //8

const appData = {
  title: "",
  screens: [],
  screensCount: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isError: false,
  checkValues: function () {
    appData.isError = false;

    screens = document.querySelectorAll(".screen");

    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input[type=text]");

      if (select.value === "" || input.value.trim() === "" || parseInt(input.value) === 0) {
        appData.isError = true;
      }
    });

    if (!appData.isError) {
      appData.start();
    } else {
      alert("Пожалуйста заполните типы и количество экранов верно!");
    }
  },

  loadCheck: function () {
    rangeInput.value = 0;
    appData.loggerRange();
  },

  init: function () {
    appData.addTitle();

    startBtn.addEventListener("click", appData.checkValues);
    plusBtn.addEventListener("click", appData.addScreenBlock);
    //rangeInput.addEventListener("mouseover", appData.loggerRange);
    rangeInput.addEventListener("mousemove", appData.loggerRange);
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    window.addEventListener("load", appData.loadCheck);
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    //appData.getServicePercentPrices();
    //appData.logger();

    console.log(appData);
    appData.showResult();
  },

  loggerRange: function () {
    //circle.style.height = rangeInput.value + "%";
    //circle.style.width = rangeInput.value + "%";
    appData.rollback = rangeInput.value;
    rangeSpan.textContent = rangeInput.value + "%";
    //console.log("!!!");
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalPrice.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
  },

  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    for (const screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

    appData.servicePercentPrice = appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
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

  //getServicePercentPrice: function () {
  //  appData.servicePercentPrice = appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  //},

  splitString: function (stringToSplit, separator) {
    return stringToSplit.split(separator);
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.servicesArr);
  },
};

appData.init();
