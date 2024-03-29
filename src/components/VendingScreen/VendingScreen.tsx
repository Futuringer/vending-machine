import React from 'react';

import cn from 'classnames/bind';
import { getProductsList } from '@store/vending/paymentOperations';
import { useAppSelector } from '@store/utils';
import { getMoneyInTheVending } from '@store/vending/paymentOperations';

import { Product } from '@components/Product';

import styles from './VendingScreen.module.scss';

const cx = cn.bind(styles);

const VendingScreen: React.FC = () => {
  const productsList = useAppSelector(getProductsList);
  const money = useAppSelector(getMoneyInTheVending);

  return (
    <div className={cx('screen')}>
      <ul className={cx('productList')}>
        {productsList.map((product, i) => (
          <li
            className={cx('productItem')}
            key={`${product.title}${i}`}
          >
            <Product
              product={product}
              position={i + 1}
              isAvailable={money >= product.price}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { VendingScreen };
