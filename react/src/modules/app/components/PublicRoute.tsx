// import { Route, Navigate } from 'react-router-dom';
// import auth from '../../auth/utilities/authUtility';

const PublicRoute = () => {
// const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = true;
  // const isAuthenticated = auth.isAuthenticated();

  return (
    <div>
      {isAuthenticated} public route
    </div>
    // <Route {...rest} render={(props) => (
    //   !isAuthenticated
    //     ? <Component auth={isAuthenticated} {...props} {...rest} />
    //     : <Navigate to='/' />
    // )} />
  );
};

export default PublicRoute;
