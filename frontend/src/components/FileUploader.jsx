import React, { useEffect, useState } from 'react';
import PrivateImage from './PrivateImage';
import useFetch from '../hooks/useFetch';
import useAuth from '../hooks/useAuth';

const FileUploader = () => {
	const [files, setFiles] = useState([]);
	const [filesUrls, setFilesUrls] = useState([]);
	const [localError, setLocalError] = useState([]);
	const [isMultiple, setIsMultiple] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);

	const { session } = useAuth();

	const handleFileChange = (event) => {
		const selectedFiles = Array.from(event.target.files);

		if (!isMultiple && selectedFiles?.length > 1) {
			setLocalError('Solo se permite subir un archivo');
		}

		setFiles(selectedFiles);
		setLocalError(null);
	};

	const formData = new FormData();
	const endpoint = isMultiple ? 'upload/multiple' : 'upload';

	const { data, loading, error, fetchData } = useFetch(
		`${endpoint}?type=${isPrivate ? 'private' : 'public'}`,
		{
			method: 'POST',
			body: formData,
			isFile: true,
		}
	);

	useEffect(() => {
		if (data && !error) {
			setFilesUrls(isMultiple ? data.urls : [data.url]);
		}
	}, [data, error]);

	const handleUpload = () => {
		if (!files?.length) {
			setLocalError('Por favor, selecciona al menos un archivo');
		}
		setLocalError(null);

		files.map((file) => {
			formData.append(isMultiple ? 'files' : 'file', file);
		});
		fetchData();
	};

	return (
		<>
			<div className="p-[20px]">
				<h1>Subir archivos</h1>
				<label htmlFor="">
					<input
						className="mr-[10px]"
						type="checkbox"
						checked={isMultiple}
						onChange={(e) => setIsMultiple(e.target.checked)}
					/>
					Subir múltiples archivos
				</label>
				<label htmlFor="">
					<input
						className="mr-[10px]"
						type="checkbox"
						checked={isPrivate}
						onChange={(e) => setIsPrivate(e.target.checked)}
					/>
					Es privado
				</label>
				<input
					type="file"
					multiple={isMultiple}
					onChange={handleFileChange}
					className="mb-[10px] block"
				/>

				<button
					onClick={handleUpload}
					disabled={loading || !files?.length}
					className={`py-[10px] px-[20px] ${
						loading ? 'bg-[#ccc]' : 'bg-[#007bff]'
					} text-white border-none rounded cursor-pointer`}
				>
					{loading ? 'Subiendo...' : 'Subir archivos'}
				</button>

				{setLocalError && (
					<p className="text-red-500 mt-[10px]">{setLocalError}</p>
				)}

				{filesUrls.length > 0 && (
					<div className="mt-[20px]">
						<h2>Archivos subidos:</h2>
						<div className="flex flex-wrap gap-[10px]">
							{filesUrls?.map((url, index) =>
								url.includes('private') ? (
									<PrivateImage
										imageUrl={url}
										token={session.data.token}
									/>
								) : (
									<img
										key={index}
										src={url}
										alt={`Imagen ${index + 1}`}
										className="w-[150px] h-[150px] object-cover rounded"
									/>
								)
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default FileUploader;
