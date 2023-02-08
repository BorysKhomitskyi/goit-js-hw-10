import './css/styles.css';

import { fetchCountries } from './js/fetchCountries';
import { refs } from './js/refs-elem';
import { countryСard, countryList } from './js/markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
refs.searchBox.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));


function onInputSearch(evt) {
    const searchParams = refs.searchBox.value.trim();
    if (searchParams === '') {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        return;
    }

    fetchCountries(searchParams)
        .then(countrys => {
            if (countrys.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
                refs.countryInfo.innerHTML = '';
                refs.countryList.innerHTML = '';
                return;
            }

            if (countrys.length <= 10) {
                const listMarkup = countrys.map(country => countryList(country));
                refs.countryList.innerHTML = listMarkup.join('');
                refs.countryInfo.innerHTML = '';
            }

            if (countrys.length === 1) {
                const markup = countrys.map(country => countryСard(country));
                refs.countryInfo.innerHTML = markup.join('');
                refs.countryList.innerHTML = '';
            }
        })
        .catch(error => {
            Notify.failure('Oops, there is no country with that name');
            refs.countryInfo.innerHTML = '';
            refs.countryList.innerHTML = '';
            return error;
        });
}