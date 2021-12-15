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

  counterScreens: function () {
    const screensInput = document.querySelectorAll(".screen input");
    let count = 0;
    screensInput.forEach((item) => {
      count += +item.value;
    });
    return count;
  },

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
    total.value = 0;
    totalCount.value = 0;
    totalCountOther.value = 0;
    fullTotalPrice.value = 0;
    totalCountRollback.value = 0;
    appData.init();
  },

  init: function () {
    appData.addTitle();

    startBtn.addEventListener("click", appData.checkValues);
    plusBtn.addEventListener("click", appData.addScreenBlock);
    rangeInput.addEventListener("mousemove", appData.loggerRange);
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();

    appData.showResult();
  },

  loggerRange: function () {
    appData.rollback = rangeInput.value;
    rangeSpan.textContent = rangeInput.value + "%";
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.counterScreens();
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

  addScreenBlock: function () {
    const screens = document.querySelectorAll(".screen");
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },
};

window.addEventListener("load", appData.loadCheck);
