import { Alert } from "react-bootstrap";

const Notification = ({ notification }) => {
	if (notification === null) {
		return null;
	}

	if (notification.type === "error") {
		return <Alert variant="danger">{notification.message}</Alert>;
	}

	return <Alert variant="success">{notification.message}</Alert>;
};

export default Notification;
