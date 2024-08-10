// import useSilentToken from '../../auth/hooks/useSilentToken';
// import auth from '../../auth/utilities/authUtility';

const PrivateRoute = () => {
  const isAuthenticated = true;
  // const PrivateRoute = ({ component: Component, ...rest }) => {
  // const isAuthenticated = true;
  // const isAuthenticated = auth.isAuthenticated();
  // useSilentToken();

  return (
    <div>
      {isAuthenticated} private route
    </div>
    // <Route {...rest} render={(props) => (
    //   isAuthenticated
    //     ? <Component auth={isAuthenticated} {...props} {...rest} />
    //     : <Navigate to='/login' replace />
    // )} />
  );
};

export default PrivateRoute;
