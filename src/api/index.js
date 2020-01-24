import axios from 'axios';

const SERVER_URL = 'https://restcountries.eu/rest/v2';

const request = (route, params) => {
  const query = new URLSearchParams(params).toString();
  const url = `${SERVER_URL}${route}?${query}`;

  return axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};

export const API = {
  getAllRegions: async () => await request('/all', { fields: 'region' }),
  getCountries: async region =>
    await request(`/region/${region}`, { fields: 'name;population' }),
  getCountry: async country => await request(`/name/${country}`)
};
