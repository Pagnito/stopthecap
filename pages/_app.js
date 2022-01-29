import '../styles/globals.css'
import Layout from '../components/Layout'
import wrapper from '../store'
function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}


export default wrapper.withRedux(MyApp)
