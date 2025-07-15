import * as React from 'react'

import { FaEnvelopeOpenText } from '@react-icons/all-files/fa/FaEnvelopeOpenText'
import { FaGithub } from '@react-icons/all-files/fa/FaGithub'
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'
import { FaMastodon } from '@react-icons/all-files/fa/FaMastodon'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube'
import { FaZhihu } from '@react-icons/all-files/fa/FaZhihu'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import { FaHeart } from '@react-icons/all-files/fa/FaHeart'

import * as config from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

// TODO: merge the data and icons from PageSocial with the social links in Footer
   
export const FooterImpl: React.FC = () => {

  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const onToggleDarkMode = React.useCallback(
    (e) => {
      e.preventDefault()
      toggleDarkMode()
    },
    [toggleDarkMode]
  )

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <footer className={styles.modernFooter}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <div className={styles.footerBrand}>
            <h3 className={styles.brandTitle}>{config.author}</h3>
            <p className={styles.brandSubtitle}>Full-stack Developer & Digital Creator</p>
          </div>
        </div>

        <div className={styles.footerSection}>
          <div className={styles.socialLinks}>
            {config.github && (
              <a
                className={styles.socialLink}
                href={`https://github.com/${config.github}`}
                title={`GitHub @${config.github}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaGithub />
              </a>
            )}

            {config.linkedin && (
              <a
                className={styles.socialLink}
                href={`https://www.linkedin.com/in/${config.linkedin}`}
                title={`LinkedIn ${config.author}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedin />
              </a>
            )}

            {config.twitter && (
              <a
                className={styles.socialLink}
                href={`https://twitter.com/${config.twitter}`}
                title={`Twitter @${config.twitter}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaTwitter />
              </a>
            )}

            {config.youtube && (
              <a
                className={styles.socialLink}
                href={`https://www.youtube.com/${config.youtube}`}
                title={`YouTube ${config.author}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaYoutube />
              </a>
            )}

            {config.newsletter && (
              <a
                className={styles.socialLink}
                href={`${config.newsletter}`}
                title={`Newsletter ${config.author}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaEnvelopeOpenText />
              </a>
            )}
          </div>
        </div>

        <div className={styles.footerSection}>
          <div className={styles.footerControls}>
            {hasMounted && (
              <button
                className={styles.themeToggle}
                onClick={onToggleDarkMode}
                title='Toggle dark mode'
              >
                {isDarkMode ? <IoMoonSharp/> : <IoSunnyOutline/>}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerDivider}></div>
        <p className={styles.copyright}>
          Made with <FaHeart className={styles.heart} /> by {config.author} © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

export const Footer = React.memo(FooterImpl)
