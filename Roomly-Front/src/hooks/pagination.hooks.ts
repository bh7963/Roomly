import { useEffect, useState } from "react";

// variable: 페이지 당 아이템 수 //
const ITEMS_PER_PAGE = 10;
// variable: 섹션 당 페이지 수 //
const PAGES_PER_SECTION = 5;

const usePagenation = <T>() => {
    const [viewList, setViewList] = useState<T[]>([]);
}