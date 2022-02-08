import Head from 'next/head';
import styles from './layout.module.css';
import Footer from './footer/classic-footer';
import Header from './header/edgy-transparent';
import ClassicHeader from "./header/classic-header";


const Layout = ({ children }) => {
  return (
    <div className={styles.app}>
      <Head>
        <title>Stop The Cap</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClassicHeader />

      <Header/>
      <div>
        <main>
          {children}
        </main>
        <Footer />
      </div>
  
    </div>
  )
}

export default Layout;