export const services = [
  {
    icon: "✂️",
    title: "헤어 디자인",
    description: "클래식부터 트렌디까지, 개인의 얼굴형과 스타일에 맞는 완벽한 헤어 디자인",
    price: "40,000원부터",
    features: ["페이드 컷", "클래식 컷", "모던 스타일", "비즈니스 룩", "스타일링"]
  },
  {
    icon: "💆‍♂️",
    title: "헤어 케어",
    description: "두피와 모발 건강을 위한 전문적인 케어 프로그램과 프리미엄 트리트먼트",
    price: "60,000원부터",
    features: ["두피 진단", "딥 클렌징", "영양 트리트먼트", "모발 복구", "홈케어 가이드"]
  }
];

export const detailedServices = [
  {
    category: "헤어 디자인",
    image: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    services: [
      { name: "클래식 컷", price: "40,000원", description: "전통적인 남성 헤어스타일" },
      { name: "페이드 컷", price: "45,000원", description: "모던하고 세련된 그라데이션 컷" },
      { name: "언더컷", price: "45,000원", description: "트렌디한 사이드 컷 스타일" },
      { name: "비즈니스 스타일", price: "50,000원", description: "프로페셔널한 직장인 스타일" }
    ]
  },
  {
    category: "헤어 케어",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    services: [
      { name: "두피 케어", price: "60,000원", description: "전문적인 두피 진단 및 케어" },
      { name: "모발 트리트먼트", price: "70,000원", description: "손상된 모발 복구 및 영양 공급" },
      { name: "딥 클렌징", price: "50,000원", description: "깊숙한 모공 청소 및 케어" },
      { name: "프리미엄 케어", price: "90,000원", description: "종합적인 두피 및 모발 관리" }
    ]
  }
];
