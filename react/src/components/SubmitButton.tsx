import useButtonText from '../hooks/useButtonText.tsx';

// Submit button with submitting state handling
const SubmitButton = ({
  state, submitting, text, ...props
}: { state: any, submitting: any, text: any }) => {
  const { isValid, dirty } = state;
  const buttonText = useButtonText(submitting, text);

  return (
    <button
      {...props}
      type="submit"
      disabled={!(dirty && isValid) || submitting}
      className={`btn-submit ${!(dirty && isValid) ? 'btn-disabled' : ''}`}
    >
      {buttonText}
    </button>
  );
};

export default SubmitButton;
