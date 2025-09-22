export const questions = [
  {
    id: 'faceShape',
    title: '얼굴형을 선택해주세요',
    options: [
      { 
        value: 'round', 
        label: '둥근형', 
        emoji: '🟡',
        faceType: 'round'
      },
      { 
        value: 'oval', 
        label: '계란형', 
        emoji: '🥚',
        faceType: 'oval'
      },
      { 
        value: 'square', 
        label: '사각형', 
        emoji: '⬜',
        faceType: 'square'
      },
      { 
        value: 'long', 
        label: '긴형', 
        emoji: '📏',
        faceType: 'long'
      },
    ],
  },
  {
    id: 'lifestyle',
    title: '라이프스타일을 선택해주세요',
    options: [
      { value: 'business', label: '직장인/비즈니스', emoji: '💼' },
      { value: 'casual', label: '캐주얼/일상', emoji: '👕' },
      { value: 'trendy', label: '트렌디/패셔너블', emoji: '✨' },
      { value: 'classic', label: '클래식/정통', emoji: '🎩' },
    ],
  },
  {
    id: 'hairType',
    title: '모발 타입을 선택해주세요',
    options: [
      { value: 'straight', label: '직모', emoji: '📏', hairType: 'straight' },
      { value: 'wavy', label: '곱슬', emoji: '🌊', hairType: 'wavy' },
      { value: 'thick', label: '굵고 많음', emoji: '💪', hairType: 'thick' },
      { value: 'thin', label: '얇고 적음', emoji: '🪶', hairType: 'thin' },
    ],
  },
  {
    id: 'maintenance',
    title: '스타일링 시간은 얼마나 투자하시나요?',
    options: [
      { value: 'minimal', label: '최소 (5분 이하)', emoji: '⚡' },
      { value: 'quick', label: '간단 (5-10분)', emoji: '⏰' },
      { value: 'moderate', label: '보통 (10-20분)', emoji: '🕐' },
      { value: 'detailed', label: '정성 (20분 이상)', emoji: '👨‍🎨' },
    ],
  },
];

export const styleRecommendations = {
  'round-business-straight-minimal': {
    style: '비즈니스 가르마',
    description: '둥근 얼굴형을 길어보이게 하는 전문적인 스타일',
    image: '👔',
    tips: [
      '7:3 가르마로 얼굴 라인 정리',
      '짧은 사이드로 깔끔한 느낌',
      '매일 간단한 왁스 스타일링',
    ],
  },
  'oval-trendy-wavy-moderate': {
    style: '내추럴 웨이브',
    description: '자연스러운 곱슬을 살린 모던한 스타일',
    image: '🎨',
    tips: [
      '자연스러운 웨이브 텍스처 활용',
      '크림 타입 제품 사용',
      '손으로 자연스럽게 스타일링',
    ],
  },
  'square-casual-thick-quick': {
    style: '페이드 컷',
    description: '사각 얼굴형을 부드럽게 만드는 트렌디한 스타일',
    image: '⚡',
    tips: [
      '사이드 페이드로 부드러운 라인',
      '탑 볼륨으로 균형감',
      '매트 왁스로 자연스러운 마감',
    ],
  },
  'long-business-straight-quick': {
    style: '프로페셔널 컷',
    description: '긴 얼굴형에 어울리는 전문적인 비즈니스 스타일',
    image: '💼',
    tips: [
      '사이드 볼륨으로 얼굴 균형',
      '깔끔한 뒷머리 정리',
      '젤 타입 제품으로 고정',
    ],
  },
  'oval-casual-wavy-moderate': {
    style: '내추럴 웨이브',
    description: '자연스러운 곱슬을 살린 캐주얼한 스타일',
    image: '🌊',
    tips: [
      '자연스러운 웨이브 살리기',
      '무스 제품 활용',
      '반건조 상태에서 스타일링',
    ],
  },
  'round-trendy-thick-detailed': {
    style: '언더컷',
    description: '트렌디하고 개성 있는 모던 스타일',
    image: '🔥',
    tips: ['과감한 사이드 컷', '탑 볼륨 강조', '정교한 라인 정리'],
  },
  default: {
    style: '클래식 컷',
    description: '어떤 상황에도 어울리는 만능 스타일',
    image: '✨',
    tips: [
      '깔끔하고 정돈된 느낌',
      '비즈니스와 캐주얼 모두 OK',
      '간단한 스타일링으로 완성',
    ],
  },
};
