import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import useAuth from '../hooks/useAuth';

const CustomLoading = () => {
	const { loading } = useAuth();
	const [open, setOpen] = useState(loading);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState('Content of the modal');

	const showModal = () => {
		setOpen(true);
	};

	const handleOk = () => {
		setModalText('The modal will be closed after two seconds');
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 2000);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<>
			<Button
				type="primary"
				onClick={showModal}
			>
				Open Modal with async logic
			</Button>
			<Modal
				title="Title"
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<p>{modalText}</p>
			</Modal>
		</>
	);
};
export default CustomLoading;
