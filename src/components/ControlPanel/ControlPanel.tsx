import React from 'react';

import cn from 'classnames/bind';
import {
  getMoneyInTheVending,
  pushMoney,
  getProductsList,
  getChosenProduct,
  chooseProduct,
  getProductsBought,
  dropState,
} from '@store/vending/paymentOperations';
import { useAppDispatch, useAppSelector } from '@store/utils';

import { ProductType } from '@src/types/common';

import { InsertMoneyForm } from '@components/ControlPanel/InsertMoneyForm';
import { ChooseProductForm } from '@components/ControlPanel/ChooseProductForm';
import { ResultDisplay } from '@components/ControlPanel/ResultDisplay';

import styles from './ControlPanel.module.scss';

const cx = cn.bind(styles);

const ControlPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const moneyInTheVending = useAppSelector(getMoneyInTheVending);
  const allProducts = useAppSelector(getProductsList);
  const chosenProduct = useAppSelector(getChosenProduct);
  const productsBought = useAppSelector(getProductsBought);
  const insertBanknote = (currentAmount: number) => dispatch(pushMoney(+currentAmount));
  const buyProduct = (product: ProductType) => dispatch(chooseProduct(product));
  const resetVending = () => dispatch(dropState());

  return (
    <div className={cx('controlPanel')}>
      <InsertMoneyForm
        insertBanknote={insertBanknote}
        moneyInTheVending={moneyInTheVending}
        chosenProduct={chosenProduct}
      />
      <ChooseProductForm
        moneyInTheVending={moneyInTheVending}
        allProducts={allProducts}
        buyProduct={buyProduct}
        chosenProduct={chosenProduct}
      />
      <ResultDisplay
        resetVending={resetVending}
        moneyLeft={moneyInTheVending}
        chosenProducts={productsBought}
      />
    </div>
  );
};

export { ControlPanel };
