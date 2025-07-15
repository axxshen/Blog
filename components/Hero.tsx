import * as React from 'react'
import { FaGithub } from '@react-icons/all-files/fa/FaGithub'
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'
import { FaEnvelope } from '@react-icons/all-files/fa/FaEnvelope'
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown'
import * as config from '@/lib/config'

import styles from './Hero.module.css'

export const Hero: React.FC = () => {
  const scrollToContent = () => {
    const content = document.querySelector('.notion-page-content')
    if (content) {
      content.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            Hello, I&apos;m <span className={styles.heroName}>Ao Shen</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Full-stack Developer & Digital Creator
          </p>
          <p className={styles.heroDescription}>
            I build beautiful, functional digital experiences with modern technologies. 
            Passionate about clean code, elegant design, and solving complex problems.
          </p>
          
          <div className={styles.heroActions}>
            <button 
              className={styles.ctaButton}
              onClick={scrollToContent}
            >
              View My Work
            </button>
            <div className={styles.socialLinks}>
              {config.github && (
                <a
                  href={`https://github.com/${config.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title="GitHub"
                >
                  <FaGithub />
                </a>
              )}
              {config.linkedin && (
                <a
                  href={`https://linkedin.com/in/${config.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              )}
              <a
                href="mailto:aoshen.dev@gmail.com"
                className={styles.socialLink}
                title="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.heroVisual}>
          <div className={styles.profileCard}>
            <div className={styles.profileImage}>
              <div className={styles.profileImagePlaceholder}>
                AS
              </div>
            </div>
            <div className={styles.profileInfo}>
              <h3>Ao Shen</h3>
              <p>Full-stack Developer</p>
              <div className={styles.profileTags}>
                <span className={styles.tag}>React</span>
                <span className={styles.tag}>Next.js</span>
                <span className={styles.tag}>Node.js</span>
                <span className={styles.tag}>TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.scrollIndicator} onClick={scrollToContent}>
        <FaChevronDown />
      </div>
      
      <div className={styles.heroBackground}>
        <div className={styles.backgroundGrid}></div>
        <div className={styles.gradientOverlay}></div>
      </div>
    </section>
  )
}
