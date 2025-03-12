import React from 'react'
import './style.css'

interface Props {
    text : string;
    activite : boolean;
    onClick: (distimction: string) => void;
}

export default function MypageCatalogButton({text, activite, onClick} : Props) {

  return (
    <div className='catalogbutton-wrapper'  onClick={() => onClick(text)}>
        {activite && <div className='catalogbutton-box-select'>
            <div className='catalogbutton-text-select'>{text+' >'}</div>
        </div>}
        {!activite && <div className='catalogbutton-box'>
            <div className='catalogbutton-text'>{text}</div>
        </div>}
    </div>
  )
}

