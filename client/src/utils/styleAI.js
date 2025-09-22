// AI 기반 스타일 추천 엔진
export class StyleAI {
  constructor() {
    // 각 특성별 가중치 설정
    this.weights = {
      faceShape: 0.35,    // 얼굴형이 가장 중요
      lifestyle: 0.25,    // 라이프스타일
      hairType: 0.25,     // 모발 타입
      maintenance: 0.15   // 관리 시간
    };

    // 스타일 점수 매트릭스
    this.styleMatrix = {
      'classic-side-part': {
        faceShape: { round: 9, oval: 8, square: 7, long: 6 },
        lifestyle: { business: 10, classic: 9, casual: 6, trendy: 4 },
        hairType: { straight: 9, wavy: 6, thick: 8, thin: 7 },
        maintenance: { minimal: 8, quick: 9, moderate: 7, detailed: 6 }
      },
      'fade-cut': {
        faceShape: { round: 8, oval: 9, square: 10, long: 7 },
        lifestyle: { business: 7, classic: 6, casual: 8, trendy: 10 },
        hairType: { straight: 8, wavy: 7, thick: 9, thin: 6 },
        maintenance: { minimal: 6, quick: 8, moderate: 9, detailed: 7 }
      },
      'texture-crop': {
        faceShape: { round: 7, oval: 10, square: 8, long: 9 },
        lifestyle: { business: 6, classic: 5, casual: 9, trendy: 10 },
        hairType: { straight: 6, wavy: 10, thick: 8, thin: 7 },
        maintenance: { minimal: 5, quick: 7, moderate: 9, detailed: 8 }
      },
      'business-classic': {
        faceShape: { round: 8, oval: 9, square: 8, long: 10 },
        lifestyle: { business: 10, classic: 9, casual: 5, trendy: 4 },
        hairType: { straight: 10, wavy: 6, thick: 8, thin: 9 },
        maintenance: { minimal: 9, quick: 10, moderate: 8, detailed: 6 }
      },
      'modern-undercut': {
        faceShape: { round: 9, oval: 8, square: 9, long: 7 },
        lifestyle: { business: 5, classic: 4, casual: 8, trendy: 10 },
        hairType: { straight: 8, wavy: 7, thick: 10, thin: 6 },
        maintenance: { minimal: 4, quick: 6, moderate: 8, detailed: 10 }
      },
      'natural-wave': {
        faceShape: { round: 6, oval: 9, square: 7, long: 8 },
        lifestyle: { business: 6, classic: 7, casual: 10, trendy: 8 },
        hairType: { straight: 4, wavy: 10, thick: 7, thin: 8 },
        maintenance: { minimal: 7, quick: 8, moderate: 10, detailed: 9 }
      }
    };

    // 스타일 정보 데이터베이스
    this.styleDatabase = {
      'classic-side-part': {
        style: '클래식 사이드파트',
        description: '전통적이면서도 세련된 비즈니스 스타일',
        image: '👔',
        tips: ['사이드 파팅으로 얼굴 라인 정리', '짧은 사이드로 깔끔한 느낌', '매일 간단한 왁스 스타일링'],
        difficulty: '쉬움',
        maintenance: '낮음',
        occasion: ['비즈니스', '정장', '공식석상']
      },
      'fade-cut': {
        style: '페이드 컷',
        description: '모던하고 트렌디한 그라데이션 스타일',
        image: '⚡',
        tips: ['사이드 페이드로 부드러운 라인', '탑 볼륨으로 균형감', '매트 왁스로 자연스러운 마감'],
        difficulty: '보통',
        maintenance: '보통',
        occasion: ['캐주얼', '데이트', '일상']
      },
      'texture-crop': {
        style: '텍스처 크롭',
        description: '자연스러운 텍스처를 살린 모던한 스타일',
        image: '🎨',
        tips: ['자연스러운 텍스처 활용', '크림 타입 제품 사용', '손으로 자연스럽게 스타일링'],
        difficulty: '보통',
        maintenance: '보통',
        occasion: ['트렌디', '캐주얼', '아티스틱']
      },
      'business-classic': {
        style: '비즈니스 클래식',
        description: '프로페셜널한 직장인을 위한 완벽한 스타일',
        image: '💼',
        tips: ['사이드 볼륨으로 얼굴 균형', '깔끔한 뒷머리 정리', '젤 타입 제품으로 고정'],
        difficulty: '쉬움',
        maintenance: '낮음',
        occasion: ['비즈니스', '미팅', '프레젠테이션']
      },
      'modern-undercut': {
        style: '모던 언더컷',
        description: '개성 있고 트렌디한 언더컷 스타일',
        image: '🔥',
        tips: ['과감한 사이드 컷', '탑 볼륨 강조', '정교한 라인 정리'],
        difficulty: '어려움',
        maintenance: '높음',
        occasion: ['트렌디', '파티', '개성표현']
      },
      'natural-wave': {
        style: '내추럴 웨이브',
        description: '자연스러운 곱슬을 살린 캐주얼한 스타일',
        image: '🌊',
        tips: ['자연스러운 웨이브 살리기', '무스 제품 활용', '반건조 상태에서 스타일링'],
        difficulty: '보통',
        maintenance: '보통',
        occasion: ['캐주얼', '휴가', '자연스러운 룩']
      }
    };
  }

  // AI 추천 메인 함수
  analyzeAndRecommend(userAnswers) {
    console.log('🤖 AI 분석 시작:', userAnswers);
    
    // 1단계: 각 스타일별 점수 계산
    const styleScores = this.calculateStyleScores(userAnswers);
    
    // 2단계: 상위 3개 스타일 선택
    const topStyles = this.getTopRecommendations(styleScores, 3);
    
    // 3단계: 개인화된 추천 이유 생성
    const recommendations = topStyles.map((style, index) => ({
      ...this.styleDatabase[style.id],
      score: style.score,
      confidence: this.calculateConfidence(style.score),
      personalizedTips: this.generatePersonalizedTips(style.id, userAnswers),
      rank: index + 1
    }));

    console.log('🎯 AI 추천 결과:', recommendations);
    return recommendations;
  }

  // 각 스타일별 점수 계산
  calculateStyleScores(userAnswers) {
    const scores = {};
    
    Object.keys(this.styleMatrix).forEach(styleId => {
      let totalScore = 0;
      
      Object.keys(userAnswers).forEach(characteristic => {
        const userValue = userAnswers[characteristic];
        const styleScore = this.styleMatrix[styleId][characteristic]?.[userValue] || 5;
        const weight = this.weights[characteristic] || 0.25;
        
        totalScore += styleScore * weight;
      });
      
      scores[styleId] = Math.round(totalScore * 10) / 10; // 소수점 1자리
    });
    
    return scores;
  }

  // 상위 추천 스타일 선택
  getTopRecommendations(scores, count = 3) {
    return Object.entries(scores)
      .map(([id, score]) => ({ id, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  }

  // 신뢰도 계산
  calculateConfidence(score) {
    if (score >= 9) return '매우 높음';
    if (score >= 8) return '높음';
    if (score >= 7) return '보통';
    if (score >= 6) return '낮음';
    return '매우 낮음';
  }

  // 개인화된 팁 생성
  generatePersonalizedTips(styleId, userAnswers) {
    const baseTips = this.styleDatabase[styleId].tips;
    const personalizedTips = [...baseTips];

    // 얼굴형별 추가 팁
    if (userAnswers.faceShape === 'round') {
      personalizedTips.push('둥근 얼굴형을 위해 사이드 볼륨을 줄이세요');
    } else if (userAnswers.faceShape === 'long') {
      personalizedTips.push('긴 얼굴형을 위해 사이드에 볼륨을 주세요');
    }

    // 모발 타입별 추가 팁
    if (userAnswers.hairType === 'thin') {
      personalizedTips.push('얇은 모발을 위해 볼륨 제품을 사용하세요');
    } else if (userAnswers.hairType === 'thick') {
      personalizedTips.push('굵은 모발을 위해 강력한 홀드 제품을 사용하세요');
    }

    // 관리 시간별 추가 팁
    if (userAnswers.maintenance === 'minimal') {
      personalizedTips.push('바쁜 아침을 위해 밤에 미리 스타일링하세요');
    } else if (userAnswers.maintenance === 'detailed') {
      personalizedTips.push('충분한 시간을 활용해 디테일한 마감을 완성하세요');
    }

    return personalizedTips;
  }

  // 스타일 호환성 분석
  analyzeCompatibility(userAnswers) {
    const compatibility = {};
    
    Object.keys(this.styleMatrix).forEach(styleId => {
      const scores = [];
      Object.keys(userAnswers).forEach(characteristic => {
        const score = this.styleMatrix[styleId][characteristic]?.[userAnswers[characteristic]] || 5;
        scores.push(score);
      });
      
      compatibility[styleId] = {
        average: scores.reduce((a, b) => a + b, 0) / scores.length,
        variance: this.calculateVariance(scores),
        consistency: scores.every(score => score >= 6) ? 'high' : 'mixed'
      };
    });
    
    return compatibility;
  }

  // 분산 계산 (일관성 측정)
  calculateVariance(scores) {
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
    return Math.round(variance * 100) / 100;
  }

  // 트렌드 분석 (시뮬레이션)
  getTrendAnalysis() {
    return {
      rising: ['fade-cut', 'texture-crop'],
      stable: ['classic-side-part', 'business-classic'],
      seasonal: {
        spring: 'natural-wave',
        summer: 'fade-cut',
        fall: 'texture-crop',
        winter: 'classic-side-part'
      }
    };
  }
}
