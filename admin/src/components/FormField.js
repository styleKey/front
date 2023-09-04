import React from 'react';

const FormField = ({ label, type, value, onChange, options }) => {
    return (
        <div>
            <label>{label}</label>
            {type === 'textarea' ? (
                <textarea value={value} onChange={onChange} required />
            ) : (
                <input type={type} value={value} onChange={onChange} required />
            )}
        </div>
    );
};

export default FormField;
