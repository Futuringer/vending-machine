import { combineReducers } from '@reduxjs/toolkit';

import paymentOperations from './paymentOperations';

const vending = combineReducers({
  paymentOperations,
});

export default vending;
