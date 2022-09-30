import React, { useMemo } from 'react';

import cn from 'classnames/bind';

import { ProductType } from '@src/types/common';

import { formChange } from '@utils/commonFunctions';

import styles from './ResultDisplay.module.scss';

const cx = cn.bind(styles);
const changeBanknotes = [10, 5, 2, 1];

type Props = {
  moneyLeft: number;
  chosenProduct: ProductType | null;
  resetVending: () => void;
};

const ResultDisplay: React.FC<Props> = ({ moneyLeft, chosenProduct, resetVending }) => {
  const changeArray = useMemo(() => {
    return formChange(moneyLeft, changeBanknotes);
  }, [moneyLeft]);

  return (
    <div className={cx('displaysContainer')}>
      <div className={cx('display')}>
        {chosenProduct &&
          changeArray.map((item) => (
            <div
              className={cx('chargeItem')}
              key={item.banknote}
            >
              {item.amount > 0 && <div>{`${item.banknote}₽: ${item.amount} coins`}</div>}
            </div>
          ))}
      </div>
      <div className={cx('display')}>
        {chosenProduct && (
          <div
            className={cx('product')}
            onClick={resetVending}
          >
            <div className={cx('title')}>{chosenProduct?.title}</div>
            <div className={cx('description')}>{chosenProduct?.description}</div>
            <div className={cx('price')}>{chosenProduct?.price}₽</div>
          </div>
        )}
      </div>
    </div>
  );
};

export { ResultDisplay };
