import React from 'react';

export const FormErrors = ({ formErrors }) => (
	<div className="text-center">
		{Object.keys(formErrors).map((fieldName, i) => {
			if (formErrors[fieldName].length > 0) {
				return (
					<p key={i} style={{ backgroundColor: 'red', color: 'white' }}>
						{fieldName} {formErrors[fieldName]}
					</p>
				);
			} else {
				return '';
			}
		})}
	</div>
);
