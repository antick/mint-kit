import {
  SUCCESS,
  ERROR,
  CLEAR,
} from './types/alertType.ts';
import { action } from '../utils/actionUtility.ts';

const success = (message: any) => action(SUCCESS, message);

const error = (message: any) => action(ERROR, message);

const clear = () => action(CLEAR);

export default {
  success,
  error,
  clear,
};
