import { create } from "zustand";

interface FilterStore {
    priceRange: { min: number, max: number };
    reviewScore: boolean[];
    accommodationType: string[];
    categoryArea: string[];
    facilities: string[];

    setPriceRange: (priceRagne: { min: number, max: number }) => void;
    setReviewScore: (reviewScore: boolean[]) => void;
    setAccommodationType: (accommodationType: string[]) => void;
    setCategoryArea: (categoryArea: string[]) => void;
    setFacilities: (facilities: string[]) => void;
}

const useStore = create<FilterStore>(set => ({
    priceRange: { min: 0, max: 200000 },
    reviewScore: [false, false, false, false, false],
    accommodationType: [],
    categoryArea: [],
    facilities: [],

    setPriceRange: (priceRange: { min: number, max: number }) => set(state => ({ ...state, priceRange })),
    setReviewScore: (reviewScore: boolean[]) => set(state => ({ ...state, reviewScore })),
    setAccommodationType: (accommodationType: string[]) => set(state => ({ ...state, accommodationType })),
    setCategoryArea: (categoryArea: string[]) => set(state => ({ ...state, categoryArea })),
    setFacilities: (facilities: string[]) => set(state => ({ ...state, facilities })),
}))

export default useStore;