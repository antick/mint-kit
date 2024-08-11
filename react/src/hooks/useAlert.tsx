// import { useSelector } from 'react-redux';

// Show alert bar for showing alert messages
const useAlert = () => {
  const alert = 'test alert';
  // const alert = useSelector((state) => state.alertReducer);

  return (
    <>
      {alert}
      {/* {alert.message && <div className={alert.type}>{alert.message}</div>} */}
    </>
  );
};

export default useAlert;
