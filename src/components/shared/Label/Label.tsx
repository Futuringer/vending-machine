import React from 'react';

import cn from 'classnames/bind';

import styles from './Label.module.scss';

const cx = cn.bind(styles);

type Props = {
  children: React.ReactNode;
};

const Label: React.FC<Props> = ({ children }) => {
  return <label className={cx('label')}>{children}</label>;
};

export { Label };
