import React, { FormEvent, useEffect, useRef, useState } from 'react';

import cn from 'classnames/bind';

import { ProductType } from '@src/types/common';

import { Input } from '@components/shared/Input';
import { Label } from '@components/shared/Label';

import styles from './InsertMoneyForm.module.scss';

const cx = cn.bind(styles);
const regex = /^(50|100|200|500)$/;

type Props = {
  insertBanknote: (currentAmount: number) => void;
  moneyInTheVending: number;
  chosenProduct: ProductType | null;
};

const InsertMoneyForm: React.FC<Props> = ({ insertBanknote, moneyInTheVending, chosenProduct }) => {
  const [labelText, setLabelText] = useState('Insert money');
  const [currentAmount, setCurrentAmount] = useState('');
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentAmount(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (regex.test(currentAmount)) {
      setCurrentAmount('');
      insertBanknote(+currentAmount);
    } else {
      const savelabel = labelText;
      setLabelText('Money is not accepted');
      timeout.current = setTimeout(() => setLabelText(savelabel), 2000);
    }
  };

  useEffect(() => {
    setLabelText(
      moneyInTheVending ? `Inserted money: ${moneyInTheVending.toString()}₽` : 'Insert money',
    );
    setCurrentAmount('');
  }, [moneyInTheVending]);

  useEffect(() => {
    return clearTimeout(timeout.current);
  }, [currentAmount]);

  return (
    <form
      className={cx('form')}
      onSubmit={handleSubmit}
    >
      <Label>{labelText}</Label>
      <Input
        disabled={!!chosenProduct}
        onChange={handleChange}
        value={currentAmount}
        placeholder=". . ."
      />
      <span className={cx('description')}>
        Available banknotes: 50, 100, 200 or 500 ₽. The machine gives change in 1, 2, 5 and 10 ₽
        coins
      </span>
    </form>
  );
};

export { InsertMoneyForm };
