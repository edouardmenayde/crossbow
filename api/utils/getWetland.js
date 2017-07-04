import {Wetland} from 'wetland';
import config from '../config/wetland';

export default function getWetland() {
  return new Wetland(config);
}
