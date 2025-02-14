import React, { useState } from 'react';
import PrivateImage from './PrivateImage';

const FileUploader = () => {
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [filesUrls, setFilesUrls] = useState([]);
	const [error, setError] = useState([]);
	const [isMultiple, setIsMultiple] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);

	const handleFileChange = (event) => {
		const selectedFiles = Array.from(event.target.files);

		if (!isMultiple && selectedFiles?.length > 1) {
			setError('Solo se permite subir un archivo');
		}

		setFiles(selectedFiles);
		setError(null);
	};

	const handleUpload = async () => {
		try {
			if (!files?.length) {
				setError('Por favor, selecciona añ menos un archivo');
			}

			setUploading(true);
			setError(null);

			const formData = new FormData();

			files.map((file) => {
				formData.append(isMultiple ? 'files' : 'file', file);
			});

			const endpoint = isMultiple ? '/upload/multiple' : '/upload';
			const response = await fetch(
				`http://localhost:3000/api/v2/${endpoint}?type=${
					isPrivate ? 'private' : 'public'
				}`,
				{
					method: 'POST',
					body: formData,
				}
			);

			if (!response.ok) {
				throw new Error('Error al subir el/los archivos');
			}

			const data = await response.json();
			setFilesUrls(isMultiple ? data.urls : [data.url]);
		} catch (error) {
			setError(error.message);
		} finally {
			setUploading(false);
		}
	};

	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlBlcGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJyb2xlIjoiVVNFUiIsImlhdCI6MTczOTQ4ODI4MSwiZXhwIjoxNzQ3MjY0MjgxfQ.YBWDWEF84gNUI4lSfuchOuNnDXiH-J2En-FuS4S2guA';

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
					disabled={uploading || !files?.length}
					className={`py-[10px] px-[20px] ${
						uploading ? 'bg-[#ccc]' : 'bg-[#007bff]'
					} text-white border-none rounded cursor-pointer`}
				>
					{uploading ? 'Subiendo...' : 'Subir archivos'}
				</button>

				{error && <p className="text-red-500 mt-[10px]">{error}</p>}

				{filesUrls.length > 0 && (
					<div className="mt-[20px]">
						<h2>Archivos subidos:</h2>
						<div className="flex flex-wrap gap-[10px]">
							{filesUrls?.map((url, index) =>
								url.includes('private') ? (
									<PrivateImage
										imageUrl={url}
										token={token}
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
