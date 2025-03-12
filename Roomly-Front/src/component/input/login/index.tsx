import React, { ChangeEvent, KeyboardEvent } from 'react';
import './style.css';

interface Props {
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    message: string;
    messageError: boolean;

    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKey?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputBox({ 
    type, 
    placeholder, 
    value, 
    message,
    messageError,
    onChange,
    onKey
}: Props) {

    return (
        <div className="input-box">
            <div className="input-area">
                <input value={value} type={type} placeholder={placeholder} onChange={onChange} onKeyDown={onKey} />
            </div>
            <div className={`message ${messageError ? 'error' : 'primary'}`}>{message}</div>
        </div>
    )

}