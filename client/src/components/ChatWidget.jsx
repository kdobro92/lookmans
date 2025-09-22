import React, { useState, useRef, useEffect } from 'react';
import AIStyleService from '../services/aiStyleService';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '안녕하세요! LOOKMANS 고객센터입니다. 무엇을 도와드릴까요?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking');
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef(null);
  const aiService = useRef(new AIStyleService());

  // 빠른 질문 목록
  const quickQuestions = [
    { text: '예약하고 싶어요', icon: '📅' },
    { text: '가격이 얼마인가요?', icon: '💰' },
    { text: '영업시간이 언제인가요?', icon: '🕐' },
    { text: '위치가 어디인가요?', icon: '📍' },
    { text: '어떤 스타일이 있나요?', icon: '💇‍♂️' },
    { text: '전화번호가 뭔가요?', icon: '📞' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // API 상태 확인
  useEffect(() => {
    const checkAPI = async () => {
      try {
        const status = await aiService.current.checkAPIStatus();
        setApiStatus(status.status);
      } catch (error) {
        setApiStatus('error');
      }
    };
    checkAPI();
  }, []);

  const handleSendMessage = async (messageText = null) => {
    const userMessage = messageText || inputMessage;
    if (!userMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setShowQuickQuestions(false); // 메시지 전송 후 빠른 질문 숨기기
    setIsTyping(true);

    try {
      // 채팅 히스토리 생성 (AI API용)
      const chatHistory = messages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      // OpenAI API 호출
      const botResponse = await aiService.current.getChatResponse(
        userMessage,
        chatHistory
      );

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('채팅 응답 오류:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      {/* 채팅 버튼 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            1
          </span>
        </button>
      )}

      {/* 채팅창 */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* 헤더 */}
          <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  apiStatus === 'active'
                    ? 'bg-green-500'
                    : apiStatus === 'no-key'
                      ? 'bg-yellow-500'
                      : 'bg-indigo-500'
                }`}
              >
                <span className="text-sm font-bold">L</span>
              </div>
              <div>
                <h3 className="font-semibold">LOOKMANS 고객센터</h3>
                <p className="text-xs text-indigo-200">
                  {apiStatus === 'active'
                    ? 'AI 상담 (실시간)'
                    : apiStatus === 'no-key'
                      ? '시뮬레이션 모드'
                      : '온라인 상담'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-indigo-200 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-indigo-200'
                        : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* 타이핑 인디케이터 */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />

            {/* 빠른 질문 버튼들 */}
            {showQuickQuestions && messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">
                  자주 묻는 질문
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question.text)}
                      className="flex items-center space-x-2 p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                    >
                      <span className="text-sm">{question.icon}</span>
                      <span className="text-gray-700">{question.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 입력 영역 */}
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            {/* 빠른 질문 버튼들 (입력창 아래) */}
            {messages.length > 1 && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2 font-medium">빠른 질문</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.slice(0, 4).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question.text)}
                      className="flex items-center space-x-2 px-3 py-2 text-xs bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 border border-transparent rounded-lg transition-all duration-200 text-left group"
                    >
                      <span className="text-sm group-hover:scale-110 transition-transform duration-200">{question.icon}</span>
                      <span className="text-gray-700 group-hover:text-indigo-700 font-medium">{question.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
