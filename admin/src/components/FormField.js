import React from 'react';

const FormField = ({ label, type, value, onChange, options }) => {
    return (
        <div>
            <label>{label}</label>
            {type === 'textarea' ? (
                <textarea value={value} onChange={onChange} required />
            ) : type === 'select' ? (
                <select value={value} onChange={onChange}>
                    <option value="">Select an option</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input type={type} value={value} onChange={onChange} required />
            )}
        </div>
    );
};

export default FormField;
