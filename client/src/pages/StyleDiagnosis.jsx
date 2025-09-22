import React, { useState } from 'react';
import { questions } from '../data/styleDiagnosisData';
import AIStyleService from '../services/aiStyleService';

const StyleDiagnosis = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);

  // 스타일별 이미지 매핑 함수 (고정 이미지)
  const getStyleImages = (styleName) => {
    const styleImageMap = {
      '비즈니스 가르마': [
        {
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '클래식 비즈니스',
          description: '깔끔하고 신뢰감 있는 비즈니스 가르마',
        },
        {
          url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '모던 가르마',
          description: '우아하고 세련된 가르마 스타일',
        },
        {
          url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '엘레강트 가르마',
          description: '모던하고 트렌디한 비즈니스 룩',
        },
      ],
      '내추럴 웨이브': [
        {
          url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '자연스러운 웨이브',
          description: '부드럽고 자연스러운 컬 스타일',
        },
        {
          url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '캐주얼 웨이브',
          description: '일상적인 분위기의 웨이브',
        },
        {
          url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '텍스처 웨이브',
          description: '질감이 살아있는 자연스러운 웨이브',
        },
      ],
      '프로페셔널 컷': [
        {
          url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '클래식 프로페셔널',
          description: '전문적이고 정돈된 프로페셔널 컷',
        },
        {
          url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '모던 프로페셔널',
          description: '깔끔하고 신뢰감 있는 프로페셔널',
        },
        {
          url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '비즈니스 프로페셔널',
          description: '모던하고 세련된 프로페셔널 컷',
        },
      ],
      언더컷: [
        {
          url: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '클래식 언더컷',
          description: '전통적이고 세련된 언더컷',
        },
        {
          url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '모던 언더컷',
          description: '현대적이고 개성있는 언더컷',
        },
        {
          url: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '페이드 언더컷',
          description: '부드러운 페이드가 있는 언더컷',
        },
      ],
      '클래식 컷': [
        {
          url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '클래식 사이드파트',
          description: '전통적이고 우아한 사이드파트',
        },
        {
          url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '볼륨 클래식',
          description: '볼륨감 있는 클래식 컷',
        },
        {
          url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '텍스처 클래식',
          description: '질감이 살아있는 클래식 스타일',
        },
      ],
    };

    // 스타일명에 따라 이미지 반환, 없으면 기본 이미지들
    return (
      styleImageMap[styleName] || [
        {
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '클래식 스타일',
          description: '전통적이고 세련된 스타일',
        },
        {
          url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '모던 스타일',
          description: '현대적이고 트렌디한 스타일',
        },
        {
          url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          title: '비즈니스 스타일',
          description: '전문적이고 신뢰감 있는 스타일',
        },
      ]
    );
  };

  // 실제 AI 서비스 인스턴스 생성
  const aiStyleService = new AIStyleService();

  // 컴포넌트 마운트 시 API 상태 확인
  React.useEffect(() => {
    const checkAPI = async () => {
      const status = await aiStyleService.checkAPIStatus();
      setApiStatus(status);

      // 사용 가능한 모델 정보 업데이트
      if (status.availableModel) {
        aiStyleService.availableModel = status.availableModel;
      }
    };
    checkAPI();
  }, []);

  const handleAnswer = async (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // AI 분석 시작
      setIsAnalyzing(true);

      // 실제 AI API 분석
      try {
        const aiRecommendation =
          await aiStyleService.analyzeStyleWithAI(newAnswers);
        setResult(aiRecommendation);
        setIsAnalyzing(false);
      } catch (error) {
        console.error('AI 분석 실패:', error);

        // 할당량 초과 시 특별한 메시지 표시
        if (error.message.includes('할당량 초과')) {
          console.log('🔄 API 할당량 초과로 시뮬레이션 모드 전환');
        }

        // 에러 시 폴백 시스템
        const fallback = aiStyleService.getFallbackRecommendation(newAnswers);
        setResult(fallback);
        setIsAnalyzing(false);
      }
    }
  };

  const resetDiagnosis = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setIsAnalyzing(false);
  };

  // AI 분석 중 로딩 화면
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-8"></div>
          <h2 className="text-3xl font-bold font-display text-gray-800 mb-4">
            🤖 AI 분석 중...
          </h2>
          <p className="text-xl text-gray-600 font-body mb-4">
            당신의 답변을 바탕으로 최적의 스타일을 분석하고 있습니다
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 결과 섹션 */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold font-display text-gray-800 mb-4 tracking-tight">
                스타일 진단 결과
              </h1>
              <p className="text-xl text-gray-600 font-body">
                당신에게 추천하는 완벽한 스타일입니다
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <div className="text-8xl mb-4">{result.image}</div>
                <div className="flex items-center justify-center mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                    🤖 AI 추천
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                    매칭도: {Math.round(result.score * 10)}%
                  </span>
                </div>
                <h2 className="text-3xl font-bold font-display text-gray-800 mb-4 tracking-tight">
                  {result.style}
                </h2>
                <p className="text-lg text-gray-600 font-body leading-relaxed max-w-2xl mx-auto">
                  {result.description}
                </p>
                <div className="mt-4">
                  <span className="text-sm text-gray-500 font-body">
                    신뢰도: {result.confidence} | 추천 순위: #{result.rank}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold font-display text-gray-800 mb-4">
                    🤖 AI 맞춤 스타일링 팁
                  </h3>
                  <ul className="space-y-3">
                    {result.personalizedTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-600 mr-3 mt-1">✓</span>
                        <span className="text-gray-600 font-body">{tip}</span>
                      </li>
                    ))}
                  </ul>

                  {result.products && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">
                        🧴 AI 추천 제품
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.products.map((product, idx) => (
                          <span
                            key={idx}
                            className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-body"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-body">
                      💡 <strong>AI 분석:</strong> 관리 난이도{' '}
                      {result.maintenance}
                      {result.occasions &&
                        ` | 추천 상황: ${result.occasions.join(', ')}`}
                    </p>
                  </div>

                  {result.reasoning && (
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">
                        🧠 AI 추론 과정
                      </h4>
                      <p className="text-sm text-purple-700 font-body leading-relaxed">
                        {result.reasoning}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold font-display text-gray-800 mb-4">
                    당신의 선택
                  </h3>
                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">얼굴형:</span>
                      <span className="font-semibold text-gray-800">
                        {
                          questions[0].options.find(
                            (opt) => opt.value === answers.faceShape
                          )?.label
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">라이프스타일:</span>
                      <span className="font-semibold text-gray-800">
                        {
                          questions[1].options.find(
                            (opt) => opt.value === answers.lifestyle
                          )?.label
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">모발 타입:</span>
                      <span className="font-semibold text-gray-800">
                        {
                          questions[2].options.find(
                            (opt) => opt.value === answers.hairType
                          )?.label
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">관리 시간:</span>
                      <span className="font-semibold text-gray-800">
                        {
                          questions[3].options.find(
                            (opt) => opt.value === answers.maintenance
                          )?.label
                        }
                      </span>
                    </div>
                  </div>

                  {/* 추천 헤어 이미지 (박스 안에 하나만) */}
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      추천 헤어 스타일
                    </h4>
                    <div className="max-w-sm mx-auto">
                      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                        <img
                          src={getStyleImages(result.style)[0].url}
                          alt={`${result.style} 스타일`}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-sm font-semibold">
                            {getStyleImages(result.style)[0].title}
                          </p>
                          <p className="text-xs text-gray-200">
                            {getStyleImages(result.style)[0].description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8 space-y-4">
                <a
                  href="https://booking.naver.com/booking/13/bizes/1092304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 font-semibold mr-4"
                >
                  이 스타일로 예약하기
                </a>
                <button
                  onClick={resetDiagnosis}
                  className="inline-block border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition duration-300 font-semibold"
                >
                  다시 진단하기
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 섹션 */}
      <section className="pt-32 pb-20 bg-white flex items-center justify-center min-h-[400px]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold font-display text-gray-800 mb-6 tracking-tight">
            스타일 진단
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body leading-relaxed">
            몇 가지 질문으로 당신에게 가장 어울리는 헤어 스타일을 찾아보세요
          </p>

          {/* API 상태 표시 */}
          {apiStatus && (
            <div className="mt-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-body">
                {apiStatus.status === 'active' ? (
                  <span className="bg-green-100 text-green-800">
                    ✅ {apiStatus.message}
                  </span>
                ) : apiStatus.status === 'no-key' ? (
                  <span className="bg-yellow-100 text-yellow-800">
                    ⚠️ {apiStatus.message} (시뮬레이션 모드)
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800">
                    ❌ {apiStatus.message} (시뮬레이션 모드)
                  </span>
                )}
              </div>

              {/* 추가 정보 */}
              {apiStatus.status === 'error' && (
                <div className="mt-2 text-xs text-gray-500 font-body">
                  💡 API 키를 확인하거나 네트워크 연결을 점검해주세요
                  {apiStatus.message.includes('할당량') && (
                    <div className="mt-1 text-orange-600">
                      ⚠️ API 사용량 한도 초과 - 시뮬레이션 모드로 동작합니다
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 진단 섹션 */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* 진행률 표시 */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-body text-gray-600">진행률</span>
              <span className="text-sm font-body text-gray-600">
                {currentStep + 1}/{questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentStep + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* 질문 카드 */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-display text-gray-800 mb-4">
                {questions[currentStep].title}
              </h2>
              <p className="text-gray-600 font-body">
                {currentStep + 1}단계 / {questions.length}단계
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentStep].options.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() =>
                    handleAnswer(questions[currentStep].id, option.value)
                  }
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-600 hover:bg-indigo-50 transition duration-300 text-center group"
                >
                  <div className="mb-3 group-hover:scale-105 transition duration-300">
                    {option.faceType ? (
                      <div className="w-16 h-16 mx-auto flex items-center justify-center">
                        <svg 
                          width="48" 
                          height="48" 
                          viewBox="0 0 48 48" 
                          className="group-hover:scale-110 transition duration-300"
                        >
                          {option.faceType === 'round' && (
                            <circle 
                              cx="24" 
                              cy="24" 
                              r="20" 
                              fill="none" 
                              stroke="#6366f1" 
                              strokeWidth="2"
                              className="group-hover:stroke-indigo-600 transition-colors duration-300"
                            />
                          )}
                          {option.faceType === 'oval' && (
                            <ellipse 
                              cx="24" 
                              cy="24" 
                              rx="18" 
                              ry="22" 
                              fill="none" 
                              stroke="#10b981" 
                              strokeWidth="2"
                              className="group-hover:stroke-emerald-600 transition-colors duration-300"
                            />
                          )}
                          {option.faceType === 'square' && (
                            <rect 
                              x="8" 
                              y="12" 
                              width="32" 
                              height="24" 
                              rx="4" 
                              fill="none" 
                              stroke="#8b5cf6" 
                              strokeWidth="2"
                              className="group-hover:stroke-violet-600 transition-colors duration-300"
                            />
                          )}
                          {option.faceType === 'long' && (
                            <rect 
                              x="12" 
                              y="8" 
                              width="24" 
                              height="32" 
                              rx="12" 
                              fill="none" 
                              stroke="#f59e0b" 
                              strokeWidth="2"
                              className="group-hover:stroke-amber-600 transition-colors duration-300"
                            />
                          )}
                          {/* 공통 얼굴 특징들 */}
                          <circle cx="18" cy="20" r="1.5" fill="#374151" />
                          <circle cx="30" cy="20" r="1.5" fill="#374151" />
                          <path 
                            d="M20 28 Q24 32 28 28" 
                            fill="none" 
                            stroke="#374151" 
                            strokeWidth="1.5" 
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    ) : option.hairType ? (
                      <div className="w-16 h-16 mx-auto flex items-center justify-center">
                        <svg 
                          width="48" 
                          height="48" 
                          viewBox="0 0 48 48" 
                          className="group-hover:scale-110 transition duration-300"
                        >
                          {/* 얼굴 윤곽선 */}
                          <ellipse 
                            cx="24" 
                            cy="28" 
                            rx="16" 
                            ry="18" 
                            fill="none" 
                            stroke="#d1d5db" 
                            strokeWidth="1.5"
                          />
                          
                          {/* 모발 타입별 머리 모양 */}
                          {option.hairType === 'straight' && (
                            <>
                              {/* 직모 - 깔끔한 직선 머리 */}
                              <path d="M8 20 Q24 8 40 20 L40 16 Q24 4 8 16 Z" fill="#6366f1" className="group-hover:fill-indigo-600 transition-colors duration-300" />
                              <path d="M8 20 Q24 8 40 20" stroke="#4f46e5" strokeWidth="1" fill="none" />
                            </>
                          )}
                          
                          {option.hairType === 'wavy' && (
                            <>
                              {/* 곱슬 - 자연스러운 웨이브 머리 */}
                              <path d="M8 18 Q12 12 16 18 Q20 8 24 18 Q28 8 32 18 Q36 12 40 18 L40 14 Q36 8 32 14 Q28 4 24 14 Q20 4 16 14 Q12 8 8 14 Z" fill="#10b981" className="group-hover:fill-emerald-600 transition-colors duration-300" />
                              <path d="M8 18 Q12 12 16 18 Q20 8 24 18 Q28 8 32 18 Q36 12 40 18" stroke="#059669" strokeWidth="1" fill="none" />
                            </>
                          )}
                          
                          {option.hairType === 'thick' && (
                            <>
                              {/* 굵고 많음 - 풍성한 머리 */}
                              <path d="M6 18 Q24 6 42 18 L42 14 Q24 2 6 14 Z" fill="#f59e0b" className="group-hover:fill-amber-600 transition-colors duration-300" />
                              <path d="M6 18 Q24 6 42 18" stroke="#d97706" strokeWidth="1" fill="none" />
                              {/* 추가 볼륨 */}
                              <path d="M8 16 Q24 4 40 16" stroke="#d97706" strokeWidth="1" fill="none" />
                            </>
                          )}
                          
                          {option.hairType === 'thin' && (
                            <>
                              {/* 얇고 적음 - 얇은 머리 */}
                              <path d="M12 20 Q24 10 36 20 L36 18 Q24 8 12 18 Z" fill="#ef4444" className="group-hover:fill-red-600 transition-colors duration-300" />
                              <path d="M12 20 Q24 10 36 20" stroke="#dc2626" strokeWidth="1" fill="none" />
                            </>
                          )}
                          
                          {/* 공통 얼굴 특징들 */}
                          <circle cx="18" cy="26" r="1.5" fill="#374151" />
                          <circle cx="30" cy="26" r="1.5" fill="#374151" />
                          <path d="M20 32 Q24 36 28 32" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    ) : (
                      <div className="text-4xl group-hover:scale-110 transition duration-300">
                        {option.emoji}
                      </div>
                    )}
                  </div>
                  <div className="text-lg font-semibold font-display text-gray-800 mb-2">
                    {option.label}
                  </div>
                </button>
              ))}
            </div>

            {/* 이전 버튼 */}
            {currentStep > 0 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-gray-600 hover:text-gray-800 font-body"
                >
                  ← 이전 질문으로
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 안내 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display text-gray-800 mb-8">
            진단 후 혜택
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold font-display text-gray-800 mb-2">
                맞춤 추천
              </h3>
              <p className="text-gray-600 font-body">
                당신만을 위한 개인 맞춤 스타일 추천
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-semibold font-display text-gray-800 mb-2">
                할인 혜택
              </h3>
              <p className="text-gray-600 font-body">
                진단 후 예약 시 10% 할인
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">👨‍💼</div>
              <h3 className="text-lg font-semibold font-display text-gray-800 mb-2">
                전문 상담
              </h3>
              <p className="text-gray-600 font-body">
                바버와의 1:1 맞춤 상담 제공
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StyleDiagnosis;
