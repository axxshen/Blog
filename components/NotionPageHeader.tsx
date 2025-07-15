import * as React from 'react'

import * as types from 'notion-types'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <button
      className={cs(styles.modernThemeToggle, !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
      title="Toggle dark mode"
    >
      {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </button>
  )
}

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { components, mapPageUrl } = useNotionContext()

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className={styles.modernHeader}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <Breadcrumbs block={block} rootOnly={true} />
        </div>

        <div className={styles.headerRight}>
          <div className={styles.navLinks}>
            {navigationLinks
              ?.map((link, index) => {
                if (!link.pageId && !link.url) {
                  return null
                }

                if (link.pageId) {
                  return (
                    <components.PageLink
                      href={mapPageUrl(link.pageId)}
                      key={index}
                      className={styles.modernNavLink}
                    >
                      {link.title}
                    </components.PageLink>
                  )
                } else {
                  return (
                    <components.Link
                      href={link.url}
                      key={index}
                      className={styles.modernNavLink}
                    >
                      {link.title}
                    </components.Link>
                  )
                }
              })
              .filter(Boolean)}
          </div>

          <div className={styles.headerControls}>
            <ToggleThemeButton />
            {isSearchEnabled && (
              <div className={styles.searchWrapper}>
                <Search block={block} title={null} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
