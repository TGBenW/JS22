'use strict';

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const plusBtn = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const rangeInput = document.querySelector('.rollback > .main-controls__range > input');
const rangeSpan = document.querySelector('.rollback .range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalPrice = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

const cms = document.querySelector('.cms');
const cmsCheckSelect = document.getElementById('cms-select');
const hiddenItemsCms = cms.querySelector('.hidden-cms-variants');
const hiddenInputCms = document.querySelector('.hidden-cms-variants .main-controls__input');

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
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
  cmsPercent: 0,

  counterScreens: function () {
    const screensInput = document.querySelectorAll('.screen input');
    let count = 0;
    screensInput.forEach((item) => {
      count += +item.value;
    });
    return count;
  },

  checkValues: function () {
    this.isError = false;

    screens = document.querySelectorAll('.screen');

    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input[type=text]');

      if (select.value === '' || input.value.trim() === '' || parseInt(input.value) === 0) {
        this.isError = true;
      }
    });

    if (!this.isError) {
      this.start();
    } else {
      alert('Пожалуйста заполните типы и количество экранов верно!');
    }
  },

  loadCheck: function () {
    rangeInput.value = 0;
    this.loggerRange();
    total.value = 0;
    totalCount.value = 0;
    totalCountOther.value = 0;
    fullTotalPrice.value = 0;
    totalCountRollback.value = 0;
  },

  init: function () {
    this.loadCheck();
    this.addTitle();

    startBtn.addEventListener('click', this.checkValues.bind(this));
    plusBtn.addEventListener('click', this.addScreenBlock);
    rangeInput.addEventListener('mousemove', this.loggerRange);
    resetBtn.addEventListener('click', () => {
      this.addUnblock();
      this.resetValue();
    });
    cms.querySelector('#cms-open').addEventListener('click', () => {
      this.openCms();
    });
    cmsCheckSelect.addEventListener('change', (event) => {
      if (event.target.selectedIndex === 2) {
        hiddenInputCms.style.display = 'flex';
      } else {
        hiddenInputCms.querySelector('input').value = '';
        hiddenInputCms.style.display = 'none';
      }
    });
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();

    this.showResult();
    this.addBlock();
  },

  loggerRange: function () {
    this.rollback = rangeInput.value;
    rangeSpan.textContent = rangeInput.value + '%';
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.counterScreens();
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalPrice.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    if (this.servicePercentPrice >= 0) {
      rangeInput.addEventListener('mousemove', this.rollbackPriceLive);
    }
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
  },

  openCms: () => {
    const cmsCheck = cms.querySelector('#cms-open');
    if (cmsCheck.checked) {
      hiddenItemsCms.style.display = 'flex';
    } else {
      hiddenItemsCms.style.display = 'none';
    }
  },

  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  addPrices: function () {
    for (const screen of this.screens) {
      this.screenPrice += +screen.price;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    if (this.isNumber(+hiddenInputCms.querySelector('input').value)) {
      cmsCheckSelect.querySelector('#cms-other-select').value =
        +hiddenInputCms.querySelector('input').value;
      this.cmsPercent = this.fullPrice + +cmsCheckSelect.value * (this.fullPrice / 100);
      this.fullPrice = this.cmsPercent;
      this.servicePercentPrice = this.fullPrice - rangeInput.value * (this.fullPrice / 100);
    } else if (
      !this.isNumber(+hiddenInputCms.querySelector('input').value) ||
      hiddenInputCms.querySelector('input').value.trim() === ''
    ) {
      alert('Пожалуйста введите % стоимости за работу цифрой!');
      cmsCheckSelect.querySelector('#cms-other-select').value = '';
    } else {
      this.servicePercentPrice = this.fullPrice - this.rollback * (this.fullPrice / 100);
    }
  },

  addBlock: () => {
    const input = document.querySelectorAll('.screen input');
    const selector = document.querySelectorAll('.screen select');
    const checkBox = document.querySelectorAll('.main-controls__checkbox input');
    const plusBtn = document.querySelector('.screen-btn');
    input.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
    selector.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
    checkBox.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
    plusBtn.setAttribute('disabled', 'disabled');
    cmsCheckSelect.setAttribute('disabled', 'disabled');
    startBtn.style.display = 'none';
    resetBtn.style.display = 'flex';
  },

  addUnblock: () => {
    const input = document.querySelectorAll('.screen input');
    const selector = document.querySelectorAll('.screen select');
    const checkBox = document.querySelectorAll('.main-controls__checkbox input');
    const otherInput = document.getElementById('cms-other-input');
    input.forEach((item) => {
      item.removeAttribute('disabled');
      item.value = '';
    });
    selector.forEach((item) => {
      item.removeAttribute('disabled');
      item.value = '';
    });
    checkBox.forEach((item) => {
      if (item.checked) {
        item.checked = false;
      }
      item.removeAttribute('disabled');
    });
    plusBtn.removeAttribute('disabled');
    cmsCheckSelect.removeAttribute('disabled');
    otherInput.removeAttribute('disabled');
    const screens = document.querySelectorAll('.screen');
    screens.forEach((item, index) => {
      if (index !== 0) {
        item.remove();
      }
    });
    rangeSpan.textContent = `${0}%`;
    this.rollback = 0;
    rangeInput.value = 0;
    startBtn.style.display = 'flex';
    resetBtn.style.display = 'none';
    cmsCheckSelect.value = '';
    hiddenItemsCms.style.display = 'none';
    hiddenInputCms.style.display = 'none';
  },

  resetValue: function () {
    total.value = '0';
    totalCount.value = '0';
    totalCountOther.value = '0';
    fullTotalPrice.value = '0';
    totalCountRollback.value = '0';
    this.fullPrice = 0;
    this.rollback = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.cmsPercent = 0;
    this.screenPrice = 0;
    this.screens = [];
  },

  rollbackPriceLive: function () {
    appData.loggerRange();
    appData.servicePercentPrice = parseInt(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
    appData.showResult();
  },

  addScreenBlock: function () {
    const screens = document.querySelectorAll('.screen');
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.querySelector('input').value = '';
    screens[screens.length - 1].after(cloneScreen);
  },
};

window.addEventListener('load', appData.init());
