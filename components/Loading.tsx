import * as React from 'react'

import { LoadingIcon } from './LoadingIcon'
import styles from './styles.module.css'

export const Loading: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.loadingWrapper}>
      <LoadingIcon />
      <p className={styles.loadingText}>Loading...</p>
    </div>
  </div>
)
