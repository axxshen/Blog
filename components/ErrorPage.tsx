import * as React from 'react'

import { PageHead } from './PageHead'
import styles from './styles.module.css'

export const ErrorPage: React.FC<{ statusCode: number }> = ({ statusCode }) => {
  const title = 'Error'

  return (
    <>
      <PageHead title={title} />

      <div className={styles.pageContainer}>
        <main className={styles.pageMain}>
          <h1 className={styles.pageTitle}>Something went wrong</h1>

          {statusCode && <p className={styles.errorText}>Error code: {statusCode}</p>}

          <img src='/error.png' alt='Error' className={styles.errorImage} />
        </main>
      </div>
    </>
  )
}
