
import './style.css';

import Sidebar from './sidebarfilter';

import { useFilterStore } from 'src/stores';

const Filter: React.FC = () => {
  // 필터 상태 정의
  const {setPriceRange} = useFilterStore();
  const {setReviewScore} = useFilterStore();
  const {setAccommodationType} = useFilterStore();
  const {setCategoryArea} = useFilterStore();
  const {setFacilities} = useFilterStore();

  const resetFilters = () => {
    setPriceRange({ min: 0, max: 5000000 });
    setReviewScore([false, false, false, false, false]);
    setAccommodationType([]);
    setCategoryArea([]);
    setFacilities([]);
  };
  
  return (
    <div id="filter-wrapper">
      <Sidebar resetFilters={resetFilters} />
    </div>
  );
};

export default Filter;
