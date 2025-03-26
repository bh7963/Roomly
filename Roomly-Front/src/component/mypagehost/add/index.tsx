import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import HostList from '../ReservationStatusList';
import ReservationStatusList from '../ReservationStatusList';
import { useNavigate } from 'react-router-dom';
import { MyAccommodationManagement } from '../MyAccommodationManagement';



interface Props {
    titletext: string;
    username: string;
    activite: boolean;
}

export default function Add({ titletext, username, activite }: Props) {

    const navigator = useNavigate();

    const onClickMoveAdd = () => {
        navigator('/mypagehost/enrollment')
    }

    return (
        <>
            {activite && (
                <div id="reservationstatus-wrapper">
                    <MyAccommodationManagement/>
                </div>
            )}
        </>
    );
}
