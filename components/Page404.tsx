import * as React from 'react'

import * as types from '@/lib/types'

import { PageHead } from './PageHead'
import styles from './styles.module.css'

export const Page404: React.FC<types.PageProps> = ({ site, pageId, error }) => {
  const title = site?.name || 'Notion Page Not Found'

  return (
    <>
      <PageHead site={site} title={title} />

      <div className={styles.pageContainer}>
        <main className={styles.pageMain}>
          <h1 className={styles.pageTitle}>Page Not Found</h1>

          {error ? (
            <p className={styles.errorText}>{error.message}</p>
          ) : (
            pageId && (
              <p className={styles.errorText}>
                Sorry, the Notion page &quot;{pageId}&quot; could not be accessed.
              </p>
            )
          )}

          <img
            src='/404.png'
            alt='Page Not Found'
            className={styles.errorImage}
          />
        </main>
      </div>
    </>
  )
}
