import { Regions, Region } from '../modules/Regions';
import { Country } from '../modules/Country';

export const routes = [
  {
    path: '/',
    component: Regions,
    exact: true
  },
  {
    path: '/region/:region',
    component: Region,
    exact: false
  },
  {
    path: '/:country',
    component: Country,
    exact: false
  }
];
