import React from 'react';
import './Error.css';

const Error = ({err}) => {
	return (
		<div className='Error'>
			<h1>{err.name}</h1>
			<p>{err.message}</p>
		</div>
	);
}

export default Error;