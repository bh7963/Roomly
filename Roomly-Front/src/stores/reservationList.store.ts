import { UseInformation } from "src/types";
import { create } from "zustand";

interface ReservationListStore {
    reservation: UseInformation | null;
    setReservation: (reservation: UseInformation | null) => void;
}

// create라는 매개변수에는 set이라는 상태를 변경하는 함수를 콜백함수로 전달 해줘야 한다.
const useReservation = create<ReservationListStore>(set => ({
    reservation: null,
    setReservation: (reservation: UseInformation | null) => set(state => ({ ...state, reservation }))
}));

export default useReservation;