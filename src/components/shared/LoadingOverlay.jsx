import React from 'react';

const LoadingOverlay = () => {
	return (
		<div
			style={{
				position: 'fixed',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				left: 0,
				top: 0,
				bottom: 0,
				right: 0,
				paddingTop: '200px'
			}}
		>
			<img src="/oval.svg" alt="loading" />
		</div>
	);
};

export default LoadingOverlay;
