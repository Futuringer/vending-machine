import React from 'react';

import cn from 'classnames/bind';

import { ProductType } from '@src/types/common';

import styles from './Product.module.scss';

const cx = cn.bind(styles);

type Props = {
  product: ProductType;
  position?: number;
  isAvailable?: boolean;
};

const Product: React.FC<Props> = ({ product, position, isAvailable }) => {
  const { title, description, price } = product;
  return (
    <div className={cx('product', { isAvailable })}>
      <h3 className={cx('title')}>{title}</h3>
      <p className={cx('description')}>{description}</p>
      <div className={cx('priceContainer')}>
        <span className={cx('price')}>{price}₽</span>
        <span className={cx('position')}>{position}</span>
      </div>
    </div>
  );
};

export { Product };
