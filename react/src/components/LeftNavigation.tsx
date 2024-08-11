// import { get } from 'lodash';
import { Link } from '@tanstack/react-router';
// import { Link, useLocation } from 'react-router-dom';
import Motion from './Motion.tsx';
import routes from './Menu';

// const onlyPrivateLeftMenu = (route: never) => get(route, 'menu.visible.left', false) && !get(route, 'public', false);

const LeftNavigation = () => {
  // const location = useLocation();

  const navLinks = routes
    // .filter(onlyPrivateLeftMenu)
    .map((route, index) => (
      <Link
        to="/"
        // to={route.path}
        key={`${route}_${index}`}
        // className={`item${location?.pathname === route.path ? ' active' : ''}`}
        className="item"
        title="route.menu.title"
      >
        <div className="links">
          <div className="icon">
            route.menu.icon
          </div>

          <span className="title">
            route.menu.title
          </span>
        </div>
      </Link>
    ));

  return (
    <nav className="left">
      <div className="profile">
        <div className="avatar">
          <Link to="/" title="Update Profile">
            <img className="picture" src={'./images/avatar.jpg'} alt="avatar" />
          </Link>
        </div>
      </div>
      <Motion type="4" className="menu">
        {navLinks}
      </Motion>
    </nav>
  );
};

export default LeftNavigation;
