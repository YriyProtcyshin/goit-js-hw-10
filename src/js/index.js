import '../css/styles.css';
import { fetchCountries } from '../js/fetchCountries';
import countryListTpl from '../templates/countryList.hbs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const divElemenetRef = document.querySelector('.country-list');
const inputForm = document.querySelector('#search-box');

inputForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchQuery = e.target.value.trim();

  if (searchQuery) {
    const response = fetchCountries(searchQuery);

    response
      .then(json => {
        if (json.message != 'Not Found') {
          if (json.length < 10) {
            console.log(json);
            if (json.length === 1) {
              divElemenetRef.classList.toggle('active');
            }
            renderList(json);
          } else {
            Notify.info(
              '"Too many matches found. Please enter a more specific name.'
            );
          }
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        divElemenetRef.innerHTML = '';
        Notify.failure('Oops, there is no country with that name');
      });
  } else {
    Notify.failure('Oops, there is no country with that name');
    divElemenetRef.innerHTML = '';
  }
}

function checkData(data) {
  console.log(data.length);
}

function renderList(countriesList) {
  divElemenetRef.innerHTML = countryListTpl(countriesList);
}
