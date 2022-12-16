import Footer from '../components/common/footer';
import Navbar from '../components/navbar/navbar';
import '../../styles/main.css';
import { AuthContextProvider } from '../util/auth-context';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </AuthContextProvider>
  );
}

export default MyApp;
