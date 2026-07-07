// import { Helmet } from 'react-helmet-async';
import { EmptyState } from '../../components/ui/EmptyState';
import './NotFoundPage.css';

export function NotFoundPage(){
  return(
    <>
      {/* <Helmet> */}
        <title>404 Page Not Found</title>
        <link rel="icon" href="/images/home-favicon.png" />
      {/* </Helmet> */}

      <EmptyState
        title="Page not found"
        message="The page you are looking for does not exist."
      />
    </>
  );
}