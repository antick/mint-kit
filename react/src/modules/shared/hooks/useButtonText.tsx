import ClipLoader from 'react-spinners/ClipLoader';

// Change button text and add spinner when submitting state is set
const useButtonText = (submitting: any, text: any) => (
  <>
    {submitting && (<ClipLoader size="20px" color="#fff" />)}
    {submitting ? <span className="ml-2">Please wait...</span> : text}
  </>
);

export default useButtonText;
