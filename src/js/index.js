import '../css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './fetchCountries';
// импорт шаблонов
import countryListTmp from '../templates/countryList.hbs';
import countryInfoTmp from '../templates/countryInfo.hbs';

// задержка вызова функции про вводе текста
const DEBOUNCE_DELAY = 300;

// options для Notify
const options = {
  position: 'center-top',
};

// ссылка на  HTML элементы
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
    // получить список языков и преобразовать в строку
    const arrLang = Object.values(json[0].languages).join(', ');

    countryInfoRef.innerHTML = countryInfoTmp({
      country: json[0],
      lang: arrLang,
    });
  } else if (json.length < 10) {
    divElemenetRef.innerHTML = countryListTmp(json);
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
