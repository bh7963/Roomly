import React, { useState } from 'react';
import './style.css';
import Topbar from 'src/component/topbar';

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  { id: 1, category: '예약', question: '예약을 취소하고 싶어요.', answer: '예약 취소는 예약 페이지에서 가능합니다.' },
  { id: 2, category: '공통', question: '천재지변/감염병으로 인한 예약취소는 어떻게 하나요?', answer: '고객센터에 문의해 주세요.' },
  { id: 3, category: '예약', question: '예약대기 건 예약취소하고 싶어요.', answer: '예약 내역에서 대기 예약을 취소할 수 있습니다.' },
  { id: 4, category: '숙박', question: '체크인 날짜를 변경하고 싶어요.', answer: '변경은 예약 변경 메뉴에서 가능합니다.' },
  { id: 5, category: '결제', question: '영수증/거래내역서 발급받고 싶어요.', answer: '마이페이지에서 영수증을 출력할 수 있습니다.' },
];

const categories = ['TOP7', '예약', '공통', '결제/영수증', '숙박', '해외 숙소'];

const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('TOP7');
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const filteredFaqs = selectedCategory === 'TOP7' ? faqData : faqData.filter(faq => faq.category === selectedCategory);

  const toggleAnswer = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  const handleKakaoClick = () => {
    window.open('http://pf.kakao.com/_axcqVn', '_blank', 'noopener,noreferrer');
  };


  return (
    <>
    <Topbar/>
    <div className="faq-container">
        
      <h1>고객센터</h1>
      <p>어려움이나 궁금한 점이 있으신가요?</p>
      <div className="contact">
        <p>고객센터 전화: <strong>1670-6250</strong></p>
        <button className="kakao-button" onClick={handleKakaoClick}>카카오 문의</button>
      </div>

      {/* 카테고리 탭 */}
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ 리스트 */}
      <ul className="faq-list">
        {filteredFaqs.map((faq) => (
          <li key={faq.id} className="faq-item">
            <div className="question" onClick={() => toggleAnswer(faq.id)}>
              <span>Q {faq.question}</span>
              <span className="arrow">{openItemId === faq.id ? '▲' : '▼'}</span>
            </div>
            {openItemId === faq.id && <div className="answer">A {faq.answer}</div>}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default FAQ;
