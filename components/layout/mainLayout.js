'use client'

import React from 'react';
import Sidebar from '../common/sidebar';
import styles from './mainLayout.module.css'

const MainLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;