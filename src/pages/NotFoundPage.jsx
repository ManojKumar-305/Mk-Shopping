import { Header } from '../components/Header';
// import { Helmet } from 'react-helmet-async';
import './NotFoundPage.css';

export function NotFoundPage(){
  return(
    <>
      {/* <Helmet> */}
        <title>404 Page Not Found</title>
        <link rel="icon" href="/images/home-favicon.png" />
      {/* </Helmet> */}

      <Header />

      <div className="not-found-message">
        Page not found
      </div>
    </>
  );
}