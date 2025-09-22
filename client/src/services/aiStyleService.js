// 실제 AI API를 사용한 스타일 분석 서비스
class AIStyleService {
  constructor() {
    // 실제 운영 시에는 환경 변수에서 가져오기
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
    this.availableModel = 'gpt-3.5-turbo'; // 기본 모델
  }

  // OpenAI GPT를 사용한 스타일 분석
  async analyzeStyleWithAI(userAnswers) {
    try {
      // 사용자 답변을 AI가 이해할 수 있는 프롬프트로 변환
      const prompt = this.createStyleAnalysisPrompt(userAnswers);

      // 실제 OpenAI API 호출 (데모용으로 시뮬레이션)
      const aiResponse = await this.callOpenAI(prompt);

      // AI 응답을 구조화된 데이터로 파싱
      const recommendation = this.parseAIResponse(aiResponse);

      return recommendation;
    } catch (error) {
      console.error('AI 분석 오류:', error);
      // 에러 시 폴백으로 기본 추천 제공
      return this.getFallbackRecommendation(userAnswers);
    }
  }

  // AI 분석용 프롬프트 생성
  createStyleAnalysisPrompt(answers) {
    const faceShapeMap = {
      round: '둥근형',
      oval: '계란형',
      square: '사각형',
      long: '긴형',
    };

    const lifestyleMap = {
      business: '직장인/비즈니스',
      casual: '캐주얼/일상',
      trendy: '트렌디/패셔너블',
      classic: '클래식/정통',
    };

    const hairTypeMap = {
      straight: '직모',
      wavy: '곱슬',
      thick: '굵고 많음',
      thin: '얇고 적음',
    };

    const maintenanceMap = {
      minimal: '최소 (5분 이하)',
      quick: '간단 (5-10분)',
      moderate: '보통 (10-20분)',
      detailed: '정성 (20분 이상)',
    };

    return `
당신은 15년 경력의 전문 남성 헤어 스타일리스트입니다. 
다음 고객 정보를 바탕으로 최적의 헤어스타일을 추천해주세요.

고객 정보:
- 얼굴형: ${faceShapeMap[answers.faceShape]}
- 라이프스타일: ${lifestyleMap[answers.lifestyle]}  
- 모발 타입: ${hairTypeMap[answers.hairType]}
- 스타일링 시간: ${maintenanceMap[answers.maintenance]}

다음 JSON 형식으로 정확히 응답해주세요:
{
  "style": "추천 스타일명",
  "description": "스타일에 대한 상세한 설명 (50자 이내)",
  "confidence": 85,
  "tips": [
    "구체적인 스타일링 팁 1",
    "구체적인 스타일링 팁 2", 
    "구체적인 스타일링 팁 3"
  ],
  "products": [
    "추천 제품 1",
    "추천 제품 2"
  ],
  "maintenance": "관리 난이도 (쉬움/보통/어려움)",
  "occasions": ["어울리는 상황 1", "어울리는 상황 2"],
  "reasoning": "이 스타일을 추천하는 전문적인 이유"
}

한국어로 응답하고, 실제 바버샵에서 제공할 수 있는 현실적인 스타일을 추천해주세요.
`;
  }

  // OpenAI API 호출 (실제 구현)
  // async callOpenAI(prompt) {
  //   console.log('🤖 OpenAI API 호출 중...');
  //   console.log('API 키 확인:', this.apiKey ? '설정됨' : '없음');

  //   // API 키가 없으면 시뮬레이션 사용
  //   if (!this.apiKey) {
  //     console.log('⚠️ API 키가 없어 시뮬레이션 모드로 실행');
  //     return this.simulateAIResponse(prompt);
  //   }

  //   try {
  //     const response = await fetch(this.baseURL, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${this.apiKey}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         model: this.availableModel,
  //         messages: [
  //           {
  //             role: 'system',
  //             content:
  //               '당신은 15년 경력의 전문 남성 헤어 스타일리스트입니다. 얼굴형, 라이프스타일, 모발 타입, 관리 시간을 종합적으로 분석하여 최적의 헤어스타일을 추천해주세요. 반드시 JSON 형식으로 응답하세요.',
  //           },
  //           {
  //             role: 'user',
  //             content: prompt,
  //           },
  //         ],
  //         max_tokens: 1000,
  //         temperature: 0.7,
  //         response_format: { type: 'json_object' },
  //       }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       const errorMessage = errorData.error?.message || '알 수 없는 오류';

  //       // 특정 오류 코드에 따른 처리
  //       if (response.status === 429) {
  //         throw new Error(
  //           `OpenAI API 할당량 초과: ${errorMessage}. 시뮬레이션 모드로 전환합니다.`
  //         );
  //       } else if (response.status === 401) {
  //         throw new Error(
  //           `OpenAI API 인증 실패: ${errorMessage}. API 키를 확인해주세요.`
  //         );
  //       } else if (response.status === 403) {
  //         throw new Error(
  //           `OpenAI API 접근 거부: ${errorMessage}. 모델 접근 권한을 확인해주세요.`
  //         );
  //       } else {
  //         throw new Error(
  //           `OpenAI API 오류: ${response.status} - ${errorMessage}`
  //         );
  //       }
  //     }

  //     const data = await response.json();
  //     console.log('✅ OpenAI API 응답 성공');
  //     return data.choices[0].message.content;
  //   } catch (error) {
  //     console.error('❌ OpenAI API 호출 실패:', error);
  //     console.log('🔄 시뮬레이션 모드로 폴백');
  //     return this.simulateAIResponse(prompt);
  //   }
  // }

  // AI 응답 시뮬레이션 (실제 GPT 스타일)
  simulateAIResponse(prompt) {
    // 프롬프트에서 사용자 답변 추출
    const answers = this.extractAnswersFromPrompt(prompt);

    // 시뮬레이션된 AI 분석
    const aiResponses = {
      '둥근형-직장인/비즈니스-직모-최소': {
        style: '비즈니스 가르마',
        description:
          '둥근 얼굴형을 길어보이게 하는 클래식하고 신뢰감 있는 비즈니스 스타일',
        confidence: 92,
        tips: [
          '7:3 또는 8:2 비율로 깔끔하게 가르마를 타세요',
          '사이드는 짧게 정리하여 얼굴 라인을 또렷하게 만드세요',
          '매트 왁스를 소량 사용하여 자연스러운 광택을 연출하세요',
        ],
        products: ['매트 왁스', '볼륨 스프레이'],
        maintenance: '쉬움',
        occasions: ['비즈니스 미팅', '공식 행사', '일상 업무'],
        reasoning:
          '둥근 얼굴형의 경우 가르마로 수직 라인을 강조하면 얼굴이 길어보이는 효과가 있습니다. 직장인 라이프스타일과 최소 관리 시간을 고려할 때 가장 실용적이면서도 전문적인 이미지를 연출할 수 있는 스타일입니다.',
      },
      '계란형-트렌디/패셔너블-곱슬-보통': {
        style: '내추럴 웨이브',
        description: '자연스러운 곱슬을 살린 모던하고 세련된 트렌디 스타일',
        confidence: 88,
        tips: [
          '자연스러운 곱슬 텍스처를 살려 스타일링하세요',
          '크림 타입 제품으로 컬을 정의하고 윤기를 더하세요',
          '반건조 상태에서 손으로 자연스럽게 모양을 잡으세요',
        ],
        products: ['컬 크림', '텍스처 스프레이'],
        maintenance: '보통',
        occasions: ['캐주얼 데이트', '파티', '트렌디한 모임'],
        reasoning:
          '계란형은 가장 이상적인 얼굴형으로 다양한 스타일이 어울립니다. 곱슬 모발의 자연스러운 텍스처를 살리면서 트렌디한 이미지를 원하는 고객에게 완벽한 선택입니다.',
      },
      default: {
        style: '클래식 컷',
        description: '어떤 상황에도 어울리는 안전하고 세련된 만능 스타일',
        confidence: 75,
        tips: [
          '깔끔하고 정돈된 느낌으로 스타일링하세요',
          '적당한 볼륨으로 자연스러운 실루엣을 만드세요',
          '간단한 왁스로 마무리하세요',
        ],
        products: ['올인원 왁스'],
        maintenance: '쉬움',
        occasions: ['일상', '비즈니스', '캐주얼'],
        reasoning:
          '안전하고 무난한 선택으로, 대부분의 상황에 적합한 스타일입니다.',
      },
    };

    // 답변 조합으로 적절한 응답 선택
    const key = `${answers.faceShape}-${answers.lifestyle}-${answers.hairType}-${answers.maintenance}`;
    return JSON.stringify(aiResponses[key] || aiResponses.default);
  }

  // 프롬프트에서 답변 추출
  extractAnswersFromPrompt(prompt) {
    const faceShapeMatch = prompt.match(/얼굴형: (.+)/);
    const lifestyleMatch = prompt.match(/라이프스타일: (.+)/);
    const hairTypeMatch = prompt.match(/모발 타입: (.+)/);
    const maintenanceMatch = prompt.match(/스타일링 시간: (.+)/);

    return {
      faceShape: faceShapeMatch ? faceShapeMatch[1] : '',
      lifestyle: lifestyleMatch ? lifestyleMatch[1] : '',
      hairType: hairTypeMatch ? hairTypeMatch[1] : '',
      maintenance: maintenanceMatch ? maintenanceMatch[1] : '',
    };
  }

  // AI 응답 파싱
  parseAIResponse(response) {
    try {
      console.log('📝 AI 응답 파싱 중:', response);

      // JSON 파싱
      const parsed = JSON.parse(response);

      // 필수 필드 검증
      if (!parsed.style || !parsed.description) {
        throw new Error('필수 필드가 누락되었습니다');
      }

      // 응답 데이터 정규화
      const normalizedResponse = {
        style: parsed.style,
        description: parsed.description,
        confidence: parsed.confidence || 75,
        tips: Array.isArray(parsed.tips) ? parsed.tips : [],
        products: Array.isArray(parsed.products) ? parsed.products : [],
        maintenance: parsed.maintenance || '보통',
        occasions: Array.isArray(parsed.occasions) ? parsed.occasions : [],
        reasoning: parsed.reasoning || 'AI가 분석한 결과입니다.',
        image: this.getStyleEmoji(parsed.style),
        personalizedTips: Array.isArray(parsed.tips) ? parsed.tips : [],
        score: Math.min(Math.max((parsed.confidence || 75) / 10, 0), 10), // 0-10 스케일로 변환
        rank: 1,
      };

      console.log('✅ AI 응답 파싱 완료');
      return normalizedResponse;
    } catch (error) {
      console.error('❌ AI 응답 파싱 오류:', error);
      console.log('🔄 폴백 추천으로 전환');
      return this.getFallbackRecommendation();
    }
  }

  // 스타일별 이모지 매핑
  getStyleEmoji(styleName) {
    const emojiMap = {
      '프로페셔널 사이드파트': '👔',
      '텍스처 크롭 페이드': '🎨',
      클래식: '🎩',
      페이드: '⚡',
      언더컷: '🔥',
      모던: '✨',
    };

    // 스타일명에서 키워드 찾기
    for (const [keyword, emoji] of Object.entries(emojiMap)) {
      if (styleName.includes(keyword)) {
        return emoji;
      }
    }
    return '✨'; // 기본 이모지
  }

  // 폴백 추천 (AI 실패 시)
  getFallbackRecommendation(userAnswers = {}) {
    console.log('🔄 폴백 추천 시스템 활성화');

    // 사용자 답변에 따른 기본 추천
    const fallbackStyles = {
      round: {
        style: '비즈니스 가르마',
        description: '둥근 얼굴형에 어울리는 클래식한 비즈니스 스타일',
        tips: [
          '7:3 비율로 가르마를 타세요',
          '사이드를 짧게 정리하세요',
          '매트 왁스를 사용하세요',
        ],
      },
      oval: {
        style: '내추럴 컷',
        description: '계란형 얼굴에 완벽한 세련된 스타일',
        tips: [
          '자연스러운 볼륨을 유지하세요',
          '텍스처를 살려 스타일링하세요',
          '간단한 제품으로 마무리하세요',
        ],
      },
      square: {
        style: '페이드 컷',
        description: '사각형 얼굴을 부드럽게 만드는 스타일',
        tips: [
          '부드러운 라인을 연출하세요',
          '적당한 길이를 유지하세요',
          '자연스러운 스타일링을 하세요',
        ],
      },
      long: {
        style: '볼륨 컷',
        description: '긴 얼굴형을 균형있게 만드는 스타일',
        tips: [
          '옆머리에 볼륨을 주세요',
          '너무 길지 않게 조절하세요',
          '자연스러운 웨이브를 연출하세요',
        ],
      },
    };

    const faceShape = userAnswers.faceShape || 'oval';
    const selectedStyle = fallbackStyles[faceShape] || fallbackStyles['oval'];

    return {
      style: selectedStyle.style,
      description: selectedStyle.description,
      confidence: 70,
      personalizedTips: selectedStyle.tips,
      products: ['올인원 왁스', '볼륨 스프레이'],
      maintenance: '쉬움',
      occasions: ['일상', '비즈니스', '캐주얼'],
      image: '✨',
      score: 7.0,
      rank: 1,
      reasoning:
        'AI 분석이 일시적으로 불가능하여 전문가가 추천하는 안전한 스타일을 제공합니다.',
    };
  }

  // API 상태 확인 함수
  async checkAPIStatus() {
    if (!this.apiKey || this.apiKey === 'your-openai-api-key') {
      return { status: 'no-key', message: 'API 키가 설정되지 않았습니다' };
    }

    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const availableModels = data.data.map((model) => model.id);

        // 사용 가능한 모델 확인
        const preferredModels = ['gpt-3.5-turbo'];
        const availableModel = preferredModels.find((model) =>
          availableModels.includes(model)
        );

        return {
          status: 'active',
          message: `OpenAI API 연결 성공 (사용 모델: ${availableModel || 'gpt-3.5-turbo'})`,
          availableModel: availableModel || 'gpt-3.5-turbo',
        };
      } else {
        const errorData = await response.json();
        return {
          status: 'error',
          message: `API 연결 실패: ${response.status} - ${errorData.error?.message || '알 수 없는 오류'}`,
        };
      }
    } catch (error) {
      return { status: 'error', message: `네트워크 오류: ${error.message}` };
    }
  }

  // 이미지 분석 API (미래 확장용)
  async analyzeUserPhoto(imageFile) {
    // Google Vision API 또는 Face++ API 사용
    console.log('📸 얼굴 이미지 분석 중...');

    // 실제 구현 시:
    // 1. 이미지를 base64로 변환
    // 2. 얼굴 인식 API 호출
    // 3. 얼굴형 자동 분석
    // 4. 결과 반환

    return {
      faceShape: 'oval', // 분석 결과
      confidence: 0.92,
      landmarks: {}, // 얼굴 특징점
    };
  }

  // 트렌드 분석 API
  async getTrendingStyles() {
    console.log('📈 실시간 트렌드 분석 중...');

    // 실제 구현 시:
    // 1. 소셜 미디어 API 연동 (Instagram, Pinterest)
    // 2. 검색 트렌드 분석 (Google Trends)
    // 3. 예약 데이터 분석
    // 4. 트렌드 점수 계산

    return {
      trending: ['페이드 컷', '텍스처 크롭'],
      rising: ['모던 언더컷'],
      declining: ['클래식 포마드'],
      seasonal: '봄 시즌 자연스러운 웨이브 인기 상승',
    };
  }

  // 실시간 학습 시스템 (미래 확장)
  async updateModelWithFeedback(userId, styleRecommendation, satisfaction) {
    console.log('🔄 AI 모델 업데이트 중...');

    // 실제 구현 시:
    // 1. 사용자 피드백 수집
    // 2. 추천 정확도 계산
    // 3. 모델 가중치 조정
    // 4. A/B 테스트 결과 반영

    return {
      updated: true,
      newAccuracy: 0.89,
      learningProgress: '모델이 업데이트되었습니다',
    };
  }

  /**
   * 채팅 응답을 위한 AI 호출 (하이브리드 방식)
   * @param {string} userMessage - 사용자 메시지
   * @param {Array} chatHistory - 채팅 히스토리
   * @returns {Promise<string>} AI 응답
   */
  async getChatResponse(userMessage, chatHistory = []) {
    // 1. 먼저 기본 질문인지 확인
    const predefinedResponse = this.getPredefinedResponse(userMessage);
    if (predefinedResponse) {
      console.log('📝 기본 질문으로 인식, 사전 정의된 응답 사용');
      return predefinedResponse;
    }

    // 2. 기본 질문이 아니면 AI 사용
    console.log('🤖 복잡한 질문으로 인식, OpenAI API 사용');
    return await this.getAIResponse(userMessage, chatHistory);
  }

  /**
   * 사전 정의된 질문인지 확인하고 응답 반환
   * @param {string} userMessage - 사용자 메시지
   * @returns {string|null} 사전 정의된 응답 또는 null
   */
  getPredefinedResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // 기본 질문 패턴들
    const basicQuestions = {
      예약: '예약을 도와드리겠습니다! 원하시는 날짜와 시간을 알려주시면 확인해드릴게요. 또는 네이버 예약 페이지로 바로 이동하실 수도 있습니다. 📅',
      가격: '헤어 디자인은 25,000원부터, 헤어 케어는 35,000원부터 시작됩니다. 정확한 가격은 원하시는 스타일에 따라 달라질 수 있어요. 자세한 상담을 원하시면 언제든 말씀해주세요! 💰',
      비용: '헤어 디자인은 25,000원부터, 헤어 케어는 35,000원부터 시작됩니다. 정확한 가격은 원하시는 스타일에 따라 달라질 수 있어요. 자세한 상담을 원하시면 언제든 말씀해주세요! 💰',
      요금: '헤어 디자인은 25,000원부터, 헤어 케어는 35,000원부터 시작됩니다. 정확한 가격은 원하시는 스타일에 따라 달라질 수 있어요. 자세한 상담을 원하시면 언제든 말씀해주세요! 💰',
      시간: 'LOOKMANS는 평일 오전 10시부터 오후 8시까지, 토요일은 오전 10시부터 오후 6시까지 영업합니다. 일요일은 휴무입니다. 🕐',
      영업시간:
        'LOOKMANS는 평일 오전 10시부터 오후 8시까지, 토요일은 오전 10시부터 오후 6시까지 영업합니다. 일요일은 휴무입니다. 🕐',
      위치: 'LOOKMANS는 서울시 강남구 테헤란로 123에 위치해 있습니다. 지하철 2호선 강남역에서 도보 5분 거리예요. 자세한 길찾기는 연락처 페이지에서 확인하실 수 있습니다. 📍',
      주소: 'LOOKMANS는 서울시 강남구 테헤란로 123에 위치해 있습니다. 지하철 2호선 강남역에서 도보 5분 거리예요. 자세한 길찾기는 연락처 페이지에서 확인하실 수 있습니다. 📍',
      어디: 'LOOKMANS는 서울시 강남구 테헤란로 123에 위치해 있습니다. 지하철 2호선 강남역에서 도보 5분 거리예요. 자세한 길찾기는 연락처 페이지에서 확인하실 수 있습니다. 📍',
      스타일:
        '다양한 남성 헤어 스타일을 제공합니다! 스타일 진단 페이지에서 본인에게 어울리는 스타일을 찾아보시거나, 갤러리에서 다양한 스타일을 확인해보세요. 💇‍♂️',
      헤어: '다양한 남성 헤어 스타일을 제공합니다! 스타일 진단 페이지에서 본인에게 어울리는 스타일을 찾아보시거나, 갤러리에서 다양한 스타일을 확인해보세요. 💇‍♂️',
      컷: '다양한 남성 헤어 스타일을 제공합니다! 스타일 진단 페이지에서 본인에게 어울리는 스타일을 찾아보시거나, 갤러리에서 다양한 스타일을 확인해보세요. 💇‍♂️',
      감사: '천만에요! 언제든 도움이 필요하시면 말씀해주세요. 좋은 하루 되세요! 😊',
      고마워:
        '천만에요! 언제든 도움이 필요하시면 말씀해주세요. 좋은 하루 되세요! 😊',
      고맙: '천만에요! 언제든 도움이 필요하시면 말씀해주세요. 좋은 하루 되세요! 😊',
    };

    // 키워드 매칭
    for (const [keyword, response] of Object.entries(basicQuestions)) {
      if (message.includes(keyword)) {
        return response;
      }
    }

    return null; // 기본 질문이 아님
  }

  /**
   * OpenAI API를 사용한 응답 생성
   * @param {string} userMessage - 사용자 메시지
   * @param {Array} chatHistory - 채팅 히스토리
   * @returns {Promise<string>} AI 응답
   */
  async getAIResponse(userMessage, chatHistory = []) {
    try {
      // API 키 확인
      if (!this.apiKey || this.apiKey === 'your-openai-api-key') {
        console.log('⚠️ API 키가 없어 시뮬레이션 모드로 실행');
        return this.getSimulatedChatResponse(userMessage);
      }

      // 채팅 히스토리와 함께 프롬프트 생성
      const messages = [
        {
          role: 'system',
          content: `당신은 LOOKMANS 헤어샵의 전문 상담사입니다. 
          
다음 정보를 바탕으로 고객에게 도움을 드리세요:

🏪 매장 정보:
- 이름: LOOKMANS Premium Barbershop
- 위치: 서울시 강남구 테헤란로 123
- 영업시간: 평일 10:00-20:00, 토요일 10:00-18:00, 일요일 휴무
- 전화번호: 02-1234-5678

💇‍♂️ 서비스:
- 헤어 디자인: 25,000원부터
- 헤어 케어: 35,000원부터
- 예약: 네이버 예약 시스템 사용

🎯 역할:
- 친근하고 전문적인 상담사
- 고객의 질문에 정확하고 도움이 되는 답변
- 예약, 가격, 위치, 스타일 등에 대한 상세 안내
- 필요시 다른 페이지로 안내

답변은 한국어로 하고, 친근하면서도 전문적인 톤을 유지하세요.`,
        },
        ...chatHistory.slice(-10), // 최근 10개 메시지만 포함
        {
          role: 'user',
          content: userMessage,
        },
      ];

      const response = await fetch(`${this.baseURL}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.availableModel || 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `OpenAI API 오류: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('❌ OpenAI 채팅 API 호출 실패:', error);
      return this.getSimulatedChatResponse(userMessage);
    }
  }

  /**
   * 시뮬레이션된 채팅 응답
   * @param {string} userMessage - 사용자 메시지
   * @returns {string} 시뮬레이션 응답
   */
  getSimulatedChatResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.includes('예약') || message.includes('예약하기')) {
      return '예약을 도와드리겠습니다! 원하시는 날짜와 시간을 알려주시면 확인해드릴게요. 또는 네이버 예약 페이지로 바로 이동하실 수도 있습니다. 📅';
    } else if (
      message.includes('가격') ||
      message.includes('비용') ||
      message.includes('요금')
    ) {
      return '헤어 디자인은 25,000원부터, 헤어 케어는 35,000원부터 시작됩니다. 정확한 가격은 원하시는 스타일에 따라 달라질 수 있어요. 자세한 상담을 원하시면 언제든 말씀해주세요! 💰';
    } else if (message.includes('시간') || message.includes('영업시간')) {
      return 'LOOKMANS는 평일 오전 10시부터 오후 8시까지, 토요일은 오전 10시부터 오후 6시까지 영업합니다. 일요일은 휴무입니다. 🕐';
    } else if (
      message.includes('위치') ||
      message.includes('주소') ||
      message.includes('어디')
    ) {
      return 'LOOKMANS는 서울시 강남구 테헤란로 123에 위치해 있습니다. 지하철 2호선 강남역에서 도보 5분 거리예요. 자세한 길찾기는 연락처 페이지에서 확인하실 수 있습니다. 📍';
    } else if (
      message.includes('스타일') ||
      message.includes('헤어') ||
      message.includes('컷')
    ) {
      return '다양한 남성 헤어 스타일을 제공합니다! 스타일 진단 페이지에서 본인에게 어울리는 스타일을 찾아보시거나, 갤러리에서 다양한 스타일을 확인해보세요. 💇‍♂️';
    } else if (
      message.includes('감사') ||
      message.includes('고마워') ||
      message.includes('고맙')
    ) {
      return '천만에요! 언제든 도움이 필요하시면 말씀해주세요. 좋은 하루 되세요! 😊';
    } else {
      const responses = [
        '좋은 질문이네요! 더 자세한 정보가 필요하시면 언제든 말씀해주세요. 🤔',
        '그 부분에 대해 도움을 드리고 싶습니다. 좀 더 구체적으로 말씀해주시면 더 정확한 답변을 드릴 수 있어요. 💬',
        'LOOKMANS의 서비스에 대해 궁금한 점이 있으시면 언제든 문의해주세요! 🏪',
        '예약, 가격, 위치, 스타일 등에 대해 문의하시면 도움을 드릴게요. 📞',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
}

export default AIStyleService;
