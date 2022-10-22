import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

/**
 * Change button text and add spinner when submitting state is set
 *
 * @param submitting
 * @param text
 * @returns {string|*}
 */
const useButtonText = (submitting, text) => (
  <>
    {submitting && (<ClipLoader size="20px" color="#fff" />)}
    {submitting ? <span className="ml-2">Please wait...</span> : text}
  </>
);

export default useButtonText;
