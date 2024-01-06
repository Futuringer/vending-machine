import React, { useMemo } from 'react';

import cn from 'classnames/bind';

import { ProductType } from '@src/types/common';

import { formChange } from '@utils/commonFunctions';

import styles from './ResultDisplay.module.scss';

const cx = cn.bind(styles);
const changeBanknotes = [10, 5, 2, 1];

type Props = {
  moneyLeft: number;
  chosenProducts: ProductType[];
  resetVending: () => void;
};

const ResultDisplay: React.FC<Props> = ({ moneyLeft, chosenProducts, resetVending }) => {
  const changeArray = useMemo(() => {
    return formChange(moneyLeft, changeBanknotes);
  }, [moneyLeft]);

  return (
    <div className={cx('displaysContainer')}>
      <div className={cx('display')}>
        {chosenProducts.length > 0 &&
          changeArray.map((item) => (
            <div
              className={cx('chargeItem')}
              key={item.banknote}
            >
              {item.amount > 0 && <div>{`${item.banknote}₽: ${item.amount} coins`}</div>}
            </div>
          ))}
      </div>
      <ul className={cx('display', 'itemsList')}>
        {chosenProducts.length > 0 &&
          chosenProducts.map((item) => (
            <li
              className={cx('item')}
              key={item.title}
            >
              <button
                className={cx('product')}
                onClick={resetVending}
              >
                <div className={cx('title')}>{item?.title}</div>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { ResultDisplay };
