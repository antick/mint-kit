// import { useDispatch } from 'react-redux';
import { Link } from '@tanstack/react-router';
import { TiArrowSortedDown } from 'react-icons/ti';
import { BsFillForwardFill } from 'react-icons/bs';
import { IoPowerSharp } from 'react-icons/io5';
// import userActions from '../../../user/actions/userAction';

const TopNavigation = () => {
  // const dispatch = useDispatch();

  const logout = () => {};
  // const logout = () => dispatch(userActions.logout(history));

  return (
    <nav className="top">
      <div className="menu">
        <div className="item">
          <button className="link">
            Documents
          </button>
        </div>
        <div className="item">
          <div className="group">
            <button className="link flex items-center">
              Multi Menu
              <TiArrowSortedDown
                className="w-4 h-4 mt-1 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
              />
            </button>
            <ul className="multi-menu scale-0 group-hover:scale-100 transform transition duration-150 ease-in-out">
              <li className="multi-menu-item">
                <div className="multi-menu-icon">
                  <BsFillForwardFill className="w-6 h-6" />
                </div>
                <div className="multi-menu-text">
                  <p className="font-semibold">Appearance</p>
                  <p className="text-sm">Easy customization</p>
                </div>
              </li>
              <li className="multi-menu-item">
                <div className="multi-menu-icon">
                  <BsFillForwardFill className="w-6 h-6" />
                </div>
                <div className="multi-menu-text">
                  <p className="font-semibold">Settings</p>
                  <p className="text-sm">Update your settings</p>
                </div>
              </li>
              <li className="multi-menu-item">
                <div className="multi-menu-icon">
                  <BsFillForwardFill className="w-6 h-6" />
                </div>
                <div className="multi-menu-text">
                  <p className="font-semibold">Item 1</p>
                  <p className="text-sm">This is your item 1</p>
                </div>
              </li>

              <li className="multi-menu-item">
                <div className="multi-menu-icon">
                  <BsFillForwardFill className="w-6 h-6" />
                </div>
                <div className="multi-menu-text">
                  <p className="font-semibold">Item 2</p>
                  <p className="text-sm">Take a look at your item</p>
                </div>
              </li>

              <li className="multi-sub-menu">
                <button className="w-full text-left flex items-center outline-none focus:outline-none">
                  <span className="pr-1 flex-1">Sub menu</span>
                  <span className="mr-auto">
                    <TiArrowSortedDown className="w-4 h-4 transition duration-150 ease-in-out" />
                  </span>
                </button>
                <ul className="sub-menu">
                  <li className="px-3 py-1 hover:bg-gray-100">
                    <button className="sub-menu-button">Submenu Link #5</button>
                  </li>
                  <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
                    <button className="w-full text-left flex items-center outline-none focus:outline-none">
                      <span className="pr-1 flex-1">
                        <span className="sub-menu-button">Submenu Link #6</span>
                      </span>
                      <span className="mr-auto">
                        <TiArrowSortedDown className="w-4 h-4 transition duration-150 ease-in-out" />
                      </span>
                    </button>
                    <ul className="sub-menu">
                      <li className="px-3 py-1 hover:bg-gray-100">
                        <button className="sub-menu-button">Submenu Link #1</button>
                      </li>
                      <li className="px-3 py-1 hover:bg-gray-100">
                        <button className="sub-menu-button">Submenu Link #2</button>
                      </li>
                    </ul>
                  </li>
                  <li className="px-3 py-1 hover:bg-gray-100">
                    <button className="sub-menu-button">Submenu Link #3</button>
                  </li>
                  <li className="px-3 py-1 hover:bg-gray-100">
                    <button className="sub-menu-button">Submenu Link #4</button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="item">
          <Link to="/" title="Update Profile">
            <button className="link">
              My Profile
            </button>
          </Link>
        </div>
        <div className="item">
          <Link to="/" title="Update Profile">
            <button className="link">
              Settings
            </button>
          </Link>
        </div>
      </div>

      <div className="flex w-full">
        <div className="flex w-full justify-end items-center pr-4">
          <div className="flex relative rounded-full items-center">
            <div className="group inline-block">
              <button
                id="logout-button"
                className="flex rounded-full p-2 focus:outline-none border border-gray-400"
                onClick={logout}
                title="Logout">
                {/* eslint-disable-next-line max-len */}
                <IoPowerSharp className="w-4 h-4 fill-current text-pink-600 transition duration-500 ease-in-out transform hover:rotate-360" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
