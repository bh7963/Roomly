import { SignInUser } from "src/types";
import { create } from "zustand";

interface SignInUserStore {
    signInUser: SignInUser | null;
    setSignInUser: (signInUser: SignInUser | null) => void;
}

// create라는 매개변수에는 set이라는 상태를 변경하는 함수를 콜백함수로 전달 해줘야 한다.
const useStore = create<SignInUserStore>(set => ({
    signInUser: null,
    setSignInUser: (signInUser: SignInUser | null) => set(state => ({ ...state, signInUser }))
}));

export default useStore;