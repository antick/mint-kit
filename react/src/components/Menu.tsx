import { RiDashboardFill } from 'react-icons/ri';
import { ImUsers } from 'react-icons/im';
import { IoIosPaper } from 'react-icons/io';
import { FaTasks } from 'react-icons/fa';
import { SiCampaignmonitor } from 'react-icons/si';
import { AiFillSetting } from 'react-icons/ai';

const routes = [
  { path: '/login', public: true },
  { path: '/register', public: true },
  { path: '/forgot-password', public: true },
  { path: '/reset-password', public: true },
  {
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
  {
    path: '/users',
    menu: {
      title: 'Users',
      icon: <ImUsers className="nav-link" />,
      visible: {
        top: false,
        right: false,
        bottom: false,
        left: true,
      },
    },
  },
  {
    path: '/posts',
    menu: {
      title: 'Posts',
      icon: <IoIosPaper className="nav-link" />,
      visible: {
        top: false,
        right: false,
        bottom: false,
        left: true,
      },
    },
  },
  {
    path: '/tasks',
    menu: {
      title: 'Tasks',
      icon: <FaTasks className="nav-link" />,
      visible: {
        top: false,
        right: false,
        bottom: false,
        left: true,
      },
    },
  },
  {
    path: '/campaigns',
    menu: {
      title: 'Campaigns',
      icon: <SiCampaignmonitor className="nav-link" />,
      visible: {
        top: false,
        right: false,
        bottom: false,
        left: true,
      },
    },
  },
  {
    path: '/settings',
    menu: {
      title: 'Settings',
      icon: <AiFillSetting className="nav-link" />,
      visible: {
        top: false,
        right: false,
        bottom: false,
        left: true,
      },
    },
  },
  {
    path: '/profile',
  },
];

export default routes;
