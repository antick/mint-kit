import { ImUsers } from 'react-icons/im';
import { IoIosPaper } from 'react-icons/io';
import { FaTasks } from 'react-icons/fa';
import { SiCampaignmonitor } from 'react-icons/si';
import { AiFillSetting } from 'react-icons/ai';
import UserList from './components/UserList';
import PostList from './components/PostList';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Task from './components/Task';
import Campaign from './components/Campaign';

export default [
  {
    component: UserList,
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
    component: PostList,
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
    component: Task,
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
    component: Campaign,
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
    component: Settings,
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
    component: Profile,
    path: '/profile',
  },
];
