export function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/name/`;
    const filters = '?fields=name,capital,population,flags,languages';

    return fetch(`${url}${name}${filters}`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }

        return response.json();
    })
    .catch(error => console.log(`${error.name}: ${error.message}`));
}