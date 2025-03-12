import React, { useState } from 'react';
import './style.css';

interface distinctionProps {
    text: string;
    activite: boolean;
    onClick: (distimction: string) => void;
}


export default function DistimctionButton( {text, activite, onClick} : distinctionProps) {

  return (
    <div id='distinctionButton-warpper' onClick={() => onClick(text)}>
        { activite && <div className='distinctionoutLine-false'>
            <div className='distinctiontext-false'>{text}</div>
        </div>}
        { !activite && <div className='distinctionoutLine-true'>
            <div className='distinctiontext-true'>{text}</div>
        </div>}
    </div>
  )
}
