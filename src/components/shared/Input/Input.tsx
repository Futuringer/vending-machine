import React from 'react';

import cn from 'classnames/bind';

import styles from './Input.module.scss';

const cx = cn.bind(styles);

type Props = {
  value: string | number;
  disabled?: boolean;
  placeholder?: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({ value, onChange, disabled, placeholder = '...' }) => {
  return (
    <input
      className={cx('input')}
      type="text"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export { Input };
