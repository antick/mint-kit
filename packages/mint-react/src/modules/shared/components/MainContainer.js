import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => {
  const backgroundColor = 'bg-gray-100 bg-gradient-to-br from-teal-400 via-blue-400 to-emerald-400';

  return (
    <>
      <div className={`flex px-4 py-4 xl:px-14 xl:py-12 min-h-screen ${backgroundColor}`}>
        {children}
      </div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.any,
};

export default Container;
