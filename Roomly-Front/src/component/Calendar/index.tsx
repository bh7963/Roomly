import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
    value: Value
    onChange: (value: Value) => void
}


const CalendarEnd = ({onChange}: Props) => {


};

export default CalendarEnd;
