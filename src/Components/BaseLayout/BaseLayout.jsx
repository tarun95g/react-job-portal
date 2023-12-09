import styles from './BaseLayout.module.scss'

const BaseLayout = ({ seo, header, footer, children }) => {
  return (
    <>
      {seo}
      {header}
      <section data-testid='layout' className={styles.body}>
        {children}
      </section>
      {footer}
    </>
  )
};

export default BaseLayout;
