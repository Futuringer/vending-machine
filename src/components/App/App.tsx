import React from 'react';

import cn from 'classnames/bind';

import { VendingScreen } from '@components/VendingScreen';
import { ControlPanel } from '@components/ControlPanel';

import styles from './App.module.scss';

const cx = cn.bind(styles);

const App: React.FC = () => {
  return (
    <div className={cx('container')}>
      <VendingScreen />
      <ControlPanel />
    </div>
  );
};

export { App };
