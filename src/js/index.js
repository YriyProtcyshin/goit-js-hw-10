import '../css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import countryListTmp from '../templates/countryList.hbs';
import countryInfoTmp from '../templates/countryInfo.hbs';

// import { templateList, countryInfo } from '../templates/templates.js';

// const Handlebars = require('handlebars');

// import Handlebars from 'handlebars';
// const elemenetListTmp = Handlebars.compile(templateList);
// const countryInfoTmp = Handlebars.compile(countryInfo);

const DEBOUNCE_DELAY = 300;
const options = {
  position: 'center-top',
};

// ссылка на div для вставки списка
const divElemenetRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

// ссылка на поле ввода запроса
const inputForm = document.querySelector('#search-box');

inputForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// ============ Main function ============================================
function onInput(e) {
  const searchQuery = e.target.value.trim();

  // 1. Если input пустой очищаю HTML и прерываю функцию
  if (!searchQuery) {
    cleanHtmlList();
    errorMessage();
    return;
  }

  // 2. Обработка запроса
  fetchCountries(searchQuery)
    .then(json => {
      // Обработка ошибки 404
      if (json.message === 'Not Found') {
        console.log('Not Found');
        throw new Error();
      }
      cleanHtmlList();
      renderingHtml(json);
    })
    .catch(json => {
      errorMessage();
    });
}

// =========================================================================

function renderingHtml(json) {
  if (json.length === 1) {
    countryInfoRef.innerHTML = countryInfoTmp(json[0]);
  } else if (json.length < 10) {
    divElemenetRef.innerHTML = countryListTmp(json);
    // divElemenetRef.innerHTML = elemenetListTmp(json);
  } else {
    infoMessage();
  }
}

function cleanHtmlList() {
  divElemenetRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}

function errorMessage() {
  Notify.failure('Oops, there is no country with that name', options);
  divElemenetRef.innerHTML = '';
}

function infoMessage() {
  Notify.info(
    'Too many matches found. Please enter a more specific name.',
    options
  );
}
