const Notification = ({ message, type }) => {
  return <div className={`alert alert-${type}`}>{message}</div>;
};

export default Notification;
