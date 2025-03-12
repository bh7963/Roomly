import SignInHost from "src/types/sign-in-host.interface";
import { create } from "zustand";

interface SignInHostStore {
    signInHost: SignInHost | null;
    setSignInHost: (signInHost: SignInHost | null) => void;
}

// create라는 매개변수에는 set이라는 상태를 변경하는 함수를 콜백함수로 전달 해줘야 한다.
const useHostStore = create<SignInHostStore>(set => ({
    signInHost: null,
    setSignInHost: (signInHost: SignInHost | null) => set(state => ({ ...state, signInHost }))
}));

export default useHostStore;