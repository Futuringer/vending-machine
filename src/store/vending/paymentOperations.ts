import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/root';

import { ProductType } from '@src/types/common';

type State = {
  money: number;
  productsList: ProductType[];
  chosenProduct: ProductType | null;
};

const initialState: State = {
  money: 0,
  chosenProduct: null,
  productsList: [
    {
      title: 'Lay’s',
      description: 'Chips',
      price: 75,
    },
    {
      title: 'Coca-Cola',
      description: 'Drink',
      price: 180,
    },
    {
      title: 'Light',
      description: 'Rusks',
      price: 220,
    },
    {
      title: 'Chaka',
      description: 'Peanut',
      price: 600,
    },
    {
      title: 'Water',
      description: 'Drink',
      price: 40,
    },
    {
      title: 'Fanta',
      description: 'Cold drink',
      price: 400,
    },
    {
      title: 'Nutella',
      description: 'Chocolate paste',
      price: 550,
    },
  ],
};

const paymentOperationsSlice = createSlice({
  name: 'vending/payment',
  initialState,
  reducers: {
    dropState: () => {
      return initialState;
    },
    pushMoney: (state, action: PayloadAction<number>) => {
      state.money += action.payload;
    },
    chooseProduct: (state, action: PayloadAction<ProductType>) => {
      state.chosenProduct = action.payload;
      state.money -= action.payload.price;
    },
  },
});

const selectSelf = (state: RootState) => state.vending.paymentOperations;

const getProductsList = createSelector(selectSelf, ({ productsList }) => productsList);
const getMoneyInTheVending = createSelector(selectSelf, ({ money }) => money);
const getChosenProduct = createSelector(selectSelf, ({ chosenProduct }) => chosenProduct);

export const { dropState, pushMoney, chooseProduct } = paymentOperationsSlice.actions;

export { getMoneyInTheVending, getProductsList, getChosenProduct };

export default paymentOperationsSlice.reducer;
