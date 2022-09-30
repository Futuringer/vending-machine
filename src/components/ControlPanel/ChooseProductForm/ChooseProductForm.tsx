import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import cn from 'classnames/bind';

import { ProductType } from '@src/types/common';

import { Input } from '@components/shared/Input';
import { Label } from '@components/shared/Label';

import styles from './ChooseProductForm.module.scss';

const cx = cn.bind(styles);

type Props = {
  allProducts: ProductType[];
  moneyInTheVending: number;
  buyProduct: (value: ProductType) => void;
  chosenProduct: ProductType | null;
};

const ChooseProductForm: React.FC<Props> = ({
  allProducts,
  moneyInTheVending,
  buyProduct,
  chosenProduct,
}) => {
  const [labelText, setLabelText] = useState('/');
  const [inputValue, setInputValue] = useState('');
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const lowestPrice = useMemo(() => {
    const prices = allProducts.map((item) => {
      return item.price;
    });

    return Math.min(...prices);
  }, [allProducts]);

  const canPurchase = moneyInTheVending >= lowestPrice;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product = allProducts[+inputValue - 1];

    if (!product) {
      setLabelText('Enter a correct product number');
      timeout.current = setTimeout(
        () => setLabelText(canPurchase ? 'Choose a product' : '/'),
        2000,
      );
    } else if (product.price > moneyInTheVending) {
      setLabelText('Not enough money');
      timeout.current = setTimeout(
        () => setLabelText(canPurchase ? 'Choose a product' : '/'),
        2000,
      );
    } else {
      setLabelText('Success');
      buyProduct(product);
      setInputValue('');
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, [inputValue]);

  useEffect(() => {
    if (moneyInTheVending >= lowestPrice) {
      setLabelText('Choose a product');
    } else {
      setLabelText('/');
    }
  }, [moneyInTheVending, lowestPrice]);

  return (
    <form
      className={cx('form')}
      onSubmit={handleSubmit}
    >
      <Label>{labelText}</Label>
      <Input
        disabled={!!chosenProduct || !moneyInTheVending}
        onChange={handleChange}
        value={inputValue}
      />
    </form>
  );
};

export { ChooseProductForm };
