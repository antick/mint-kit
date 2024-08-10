import { RiDashboardFill } from 'react-icons/ri';
import Dashboard from './components/Dashboard';

export default [
  {
    component: Dashboard,
    path: '/',
    exact: true,
    menu: {
      title: 'Dashboard',
      icon: <RiDashboardFill className="nav-link" />,
      visible: {
        top: false,
        right: false,
        bottom: false,
        left: true,
      },
    },
  },
];
