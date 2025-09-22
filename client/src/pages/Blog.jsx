import React, { useState, useEffect } from 'react';
import { categories } from '../data/blogData';
import NaverBlogService from '../services/naverBlogService';
import RSSService from '../services/rssService';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const naverBlogService = new NaverBlogService();
  const rssService = new RSSService();

  // API 상태 확인
  useEffect(() => {
    const checkApiStatus = async () => {
      const status = await naverBlogService.checkApiStatus();
      setApiStatus(status);
    };
    checkApiStatus();
  }, []);

  // 블로그 데이터 로드
  useEffect(() => {
    // 항상 edgerok 블로그만 표시 (RSS 피드 사용)
    loadSpecificBlog();
  }, [selectedCategory, currentPage]);

  const loadBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await naverBlogService.getHairBlogs(selectedCategory, currentPage);
      setPosts(result.posts);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('블로그 로드 실패:', error);
      setError('블로그를 불러오는데 실패했습니다.');
      
      // 폴백 데이터 사용
      const fallbackResult = naverBlogService.getFallbackBlogs(selectedCategory);
      setPosts(fallbackResult.posts);
      setHasMore(fallbackResult.hasMore);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setPosts([]);
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const loadSpecificBlog = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('📡 RSS 피드로 edgerok 블로그 포스트를 가져오는 중...');
      
      // RSS 피드에서 edgerok 블로그 포스트 가져오기 (우선순위 1)
      const result = await rssService.getBlogPostsFromRSS('edgerok');
      
      // 카테고리별 필터링
      let filteredPosts = result.posts;
      if (selectedCategory !== 'all') {
        filteredPosts = result.posts.filter(post => post.category === selectedCategory);
        console.log(`📂 ${selectedCategory} 카테고리로 필터링: ${filteredPosts.length}개 포스트`);
      }
      
      setPosts(filteredPosts);
      setHasMore(false); // RSS 피드는 한 번에 모든 데이터를 가져오므로 hasMore는 항상 false
      
      console.log(`✅ RSS 피드에서 ${filteredPosts.length}개의 포스트를 표시합니다.`);
      
      if (filteredPosts.length === 0) {
        if (result.posts.length === 0) {
          console.log('❌ RSS 피드에서 포스트를 찾을 수 없습니다.');
          setError('RSS 피드에서 포스트를 가져올 수 없습니다. 블로그가 비공개이거나 RSS 피드가 활성화되지 않았을 수 있습니다.');
        } else {
          console.log(`❌ ${selectedCategory} 카테고리에 해당하는 포스트가 없습니다.`);
          setError(`${selectedCategory} 카테고리에 해당하는 포스트가 없습니다.`);
        }
      }
    } catch (error) {
      console.error('RSS 피드 로드 실패:', error);
      
      // RSS 피드 실패 시 네이버 API 시도 (우선순위 2)
      try {
        console.log('📡 네이버 API로 재시도 중...');
        const apiResult = await naverBlogService.getBlogPosts('https://blog.naver.com/edgerok');
        
        let filteredPosts = apiResult.posts;
        if (selectedCategory !== 'all') {
          filteredPosts = apiResult.posts.filter(post => post.category === selectedCategory);
        }
        
        setPosts(filteredPosts);
        setHasMore(apiResult.hasMore);
        setError(null);
        
        console.log(`✅ 네이버 API에서 ${filteredPosts.length}개의 포스트를 표시합니다.`);
        
        if (filteredPosts.length === 0) {
          setError('네이버 API에서도 포스트를 가져올 수 없습니다.');
        }
      } catch (apiError) {
        console.error('네이버 API도 실패:', apiError);
        
        // 모든 방법 실패 시 폴백 데이터 사용 (우선순위 3)
        console.log('📋 폴백 데이터를 사용합니다.');
        const fallbackResult = naverBlogService.getFallbackBlogs(selectedCategory);
        setPosts(fallbackResult.posts);
        setHasMore(fallbackResult.hasMore);
        setError('RSS 피드와 네이버 API 모두 실패했습니다. 폴백 데이터를 표시합니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <section className="pt-32 pb-20 bg-gray-50 flex items-center justify-center min-h-[400px]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold font-display text-gray-800 mb-6 tracking-tight">
            블로그
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body leading-relaxed">
            헤어 트렌드부터 관리법까지, LOOKMANS 전문가들의 노하우를 공유합니다
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
                    ⚠️ {apiStatus.message}
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800">
                    ❌ {apiStatus.message}
                  </span>
                )}
              </div>
              
              {/* API 키 설정 안내 */}
              {apiStatus.status !== 'active' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg max-w-2xl mx-auto">
                  <h3 className="font-semibold text-gray-800 mb-2">네이버 API 키 설정 방법:</h3>
                  <ol className="text-sm text-gray-600 space-y-1 font-body">
                    <li>1. <a href="https://developers.naver.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">네이버 개발자 센터</a>에서 애플리케이션 등록</li>
                    <li>2. 검색 API 사용 설정</li>
                    <li>3. Client ID와 Client Secret 복사</li>
                    <li>4. 프로젝트 루트에 .env 파일 생성 후 키 입력:</li>
                  </ol>
                  <div className="mt-2 p-2 bg-gray-800 text-green-400 rounded text-xs font-mono">
                    REACT_APP_NAVER_CLIENT_ID=your_client_id<br/>
                    REACT_APP_NAVER_CLIENT_SECRET=your_client_secret
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 카테고리 필터 */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
        </div>
      </section>

      {/* 블로그 포스트 그리드 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* 로딩 상태 */}
          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-body">블로그를 불러오는 중...</p>
            </div>
          )}

          {/* 에러 상태 */}
          {error && (
            <div className="text-center py-20">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-gray-600 font-body mb-4">{error}</p>
              <button 
                onClick={loadBlogs}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                다시 시도
              </button>
            </div>
          )}

          {/* 블로그 포스트 그리드 */}
          {!loading && !error && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 group cursor-pointer"
                    onClick={() => {
                      if (post.link && post.link !== '#') {
                        window.open(post.link, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          console.warn('이미지 로딩 실패:', post.image);
                          e.target.src = 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {categories.find((cat) => cat.id === post.category)?.name}
                        </span>
                      </div>
                      {post.isNaverBlog && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            네이버
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="h-12 mb-3">
                        <h2 className="text-base font-bold font-display text-gray-800 leading-tight hover:text-indigo-600 transition duration-300 line-clamp-2">
                          {post.title}
                        </h2>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <img 
                              src="/images/logo.jpg" 
                              alt="LOOKMANS Logo" 
                              className="w-4 h-4 mr-2 object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            <span className="font-body">LOOKMANS</span>
                          </div>
                          <span className="font-body">{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* 더 보기 버튼 */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
                  >
                    더 많은 블로그 보기
                  </button>
                </div>
              )}

              {/* 포스트가 없을 때 */}
              {posts.length === 0 && !loading && (
                <div className="text-center py-20">
                  <div className="text-gray-400 text-6xl mb-4">📝</div>
                  <p className="text-gray-600 font-body">해당 카테고리에 블로그가 없습니다.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 구독 섹션 */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-display text-white mb-6">
            뉴스레터 구독
          </h2>
          <p className="text-xl text-white/90 font-body mb-8 max-w-2xl mx-auto">
            최신 헤어 트렌드와 LOOKMANS의 특별한 소식을 가장 먼저 받아보세요
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 p-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white font-body"
              />
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300 font-semibold font-body">
                구독하기
              </button>
            </div>
            <p className="text-white/70 text-sm mt-4 font-body">
              언제든지 구독을 취소할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
