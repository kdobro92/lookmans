class NaverBlogService {
  constructor() {
    // 네이버 API 키 (Vite 환경에서는 import.meta.env 사용)
    this.clientId = import.meta.env.VITE_NAVER_API_CLIENT_ID;
    this.clientSecret = import.meta.env.VITE_NAVER_API_CLIENT_SECRET;
    // 프록시를 통해 API 호출
    this.baseUrl = '/api/naver';

    // 디버깅용 로그
    console.log('🔑 네이버 API 키 상태:', {
      clientId: this.clientId ? `${this.clientId.substring(0, 8)}...` : '없음',
      clientSecret: this.clientSecret
        ? `${this.clientSecret.substring(0, 8)}...`
        : '없음',
      baseUrl: this.baseUrl,
    });
  }

  // 네이버 블로그 검색
  async searchBlogs(query, options = {}) {
    const {
      display = 10, // 한 번에 표시할 검색 결과 개수
      start = 1, // 검색 시작 위치
      sort = 'sim', // 정렬 옵션 (sim: 정확도순, date: 날짜순)
    } = options;

    try {
      const params = new URLSearchParams({
        query: query,
        display: display.toString(),
        start: start.toString(),
        sort: sort,
      });

      const response = await fetch(`${this.baseUrl}?${params}`, {
        method: 'GET',
        // 헤더는 프록시에서 처리됨
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.formatBlogData(data);
    } catch (error) {
      console.error('네이버 블로그 API 오류:', error);
      throw error;
    }
  }

  // 특정 블로그의 모든 포스트 가져오기 (개선된 방식)
  async getBlogPosts(blogUrl, maxPages = 10) {
    const blogName = blogUrl.replace('https://blog.naver.com/', '');
    const allPosts = [];

    console.log(`📝 ${blogName} 블로그의 모든 포스트를 가져오는 중...`);

    // 빈 쿼리로 모든 블로그 검색 후 필터링
    for (let page = 1; page <= maxPages; page++) {
      console.log(`📄 ${page}페이지 검색 중...`);

      try {
        const result = await this.searchBlogs(blogName, { // 블로그명으로 직접 검색
          display: 100, // 페이지당 최대 100개
          start: (page - 1) * 100 + 1,
          sort: 'date', // 날짜순으로 정렬하여 최신순으로 가져오기
        });

        if (result.posts.length === 0) {
          console.log(`📄 ${page}페이지에서 더 이상 포스트가 없습니다.`);
          break;
        }

        // 간단한 필터링: API 응답에서 특정 블로그만 추출
        const filteredPosts = result.posts.filter(item => 
          item.link && item.link.includes(`blog.naver.com/${blogName}`)
        );

        if (filteredPosts.length > 0) {
          allPosts.push(...filteredPosts);
          console.log(`📄 ${page}페이지: ${filteredPosts.length}개 ${blogName} 포스트 로드됨`);
        }

        // 네이버 API는 최대 1000개까지만 검색 가능
        if (allPosts.length >= 1000) {
          console.log('📊 최대 검색 한도(1000개)에 도달했습니다.');
          break;
        }

        // API 호출 제한을 위한 딜레이
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`❌ ${page}페이지 로드 실패:`, error);
        break;
      }

      // 충분한 포스트를 찾았으면 중단
      if (allPosts.length >= 200) {
        console.log(`✅ 충분한 포스트(${allPosts.length}개)를 찾았습니다.`);
        break;
      }
    }

    // 중복 제거
    const uniquePosts = allPosts.filter(
      (post, index, self) =>
        index === self.findIndex((p) => p.link === post.link)
    );

    console.log(`✅ 총 ${uniquePosts.length}개의 고유 포스트를 가져왔습니다.`);

    return {
      posts: uniquePosts,
      total: uniquePosts.length,
      hasMore: uniquePosts.length >= 1000,
    };
  }

  // 미용실/헤어 관련 블로그 검색
  async getHairBlogs(category = 'all', page = 1) {
    const queries = {
      all: '블로그',
      trends: '블로그',
      care: '블로그',
      styling: '블로그',
      news: '블로그',
    };

    const query = queries[category] || queries['all'];
    const start = (page - 1) * 10 + 1;

    console.log(`🔍 블로그 검색: "${query}" (페이지 ${page})`);

    return await this.searchBlogs(query, {
      display: 10,
      start: start,
      sort: 'date',
    });
  }

  // API 응답 데이터를 블로그 포스트 형식으로 변환
  formatBlogData(apiData) {
    if (!apiData.items) {
      return {
        posts: [],
        total: 0,
        hasMore: false,
      };
    }

    const posts = apiData.items.map((item, index) => ({
      id: `naver_${index + 1}`,
      title: this.removeHtmlTags(item.title),
      excerpt: this.removeHtmlTags(item.description),
      image:
        this.extractImageFromContent(item.description) ||
        this.getDefaultImage(),
      author: this.extractAuthorFromBloggername(item.bloggername),
      date: this.formatDate(item.postdate),
      readTime: this.estimateReadTime(item.description),
      tags: this.extractTags(item.title, item.description),
      category: this.categorizePost(item.title, item.description),
      link: item.link,
      bloggername: item.bloggername,
      isNaverBlog: true,
    }));

    return {
      posts: posts,
      total: apiData.total || 0,
      hasMore: posts.length === 10,
    };
  }

  // HTML 태그 제거
  removeHtmlTags(text) {
    return text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '');
  }

  // 이미지 URL 추출
  extractImageFromContent(content) {
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i);
    return imgMatch ? imgMatch[1] : null;
  }

  // 기본 이미지 반환
  getDefaultImage() {
    const defaultImages = [
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ];
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  }

  // 작성자명 정리
  extractAuthorFromBloggername(bloggername) {
    return bloggername || '네이버 블로거';
  }

  // 날짜 포맷팅
  formatDate(postdate) {
    if (!postdate) return '날짜 미상';

    const year = postdate.substring(0, 4);
    const month = postdate.substring(4, 6);
    const day = postdate.substring(6, 8);

    return `${year}.${month}.${day}`;
  }

  // 읽기 시간 추정
  estimateReadTime(content) {
    const wordCount = this.removeHtmlTags(content).length;
    const minutes = Math.ceil(wordCount / 200); // 분당 200자 기준
    return `${minutes}분`;
  }

  // 태그 추출
  extractTags(title, description) {
    const text = `${title} ${description}`.toLowerCase();
    const keywords = [
      '트렌드',
      '헤어스타일',
      '바버샵',
      '미용실',
      '페이드컷',
      '클래식',
      '두피케어',
      '모발케어',
      '관리법',
      '스타일링',
      '왁스',
      '포마드',
      '비즈니스',
      '직장인',
      '정장스타일',
      '계절관리',
      '헤어제품',
    ];

    const foundTags = keywords.filter((keyword) =>
      text.includes(keyword.toLowerCase())
    );

    return foundTags.slice(0, 3); // 최대 3개 태그
  }

  // 카테고리 분류
  categorizePost(title, description) {
    const text = `${title} ${description}`.toLowerCase();

    if (
      text.includes('트렌드') ||
      text.includes('2024') ||
      text.includes('인기')
    ) {
      return 'trends';
    } else if (
      text.includes('케어') ||
      text.includes('관리') ||
      text.includes('건강')
    ) {
      return 'care';
    } else if (
      text.includes('스타일링') ||
      text.includes('제품') ||
      text.includes('왁스')
    ) {
      return 'styling';
    } else if (
      text.includes('오픈') ||
      text.includes('리뉴얼') ||
      text.includes('소식')
    ) {
      return 'news';
    }

    return 'trends'; // 기본값
  }

  // API 키 유효성 검사
  async checkApiStatus() {
    // API 키가 설정되지 않은 경우
    if (
      !this.clientId ||
      this.clientId === 'YOUR_NAVER_CLIENT_ID' ||
      !this.clientSecret ||
      this.clientSecret === 'YOUR_NAVER_CLIENT_SECRET'
    ) {
      return {
        status: 'no-key',
        message: 'API 키가 설정되지 않았습니다 (시뮬레이션 모드)',
      };
    }

    try {
      console.log('🔍 네이버 API 테스트 중...');
        const result = await this.searchBlogs('블로그', { display: 1 });
      console.log('✅ 네이버 API 연결 성공:', result);
      return {
        status: 'active',
        message: `네이버 블로그 API 연결됨 (${result.total}개 블로그 검색 가능)`,
      };
    } catch (error) {
      console.error('❌ 네이버 API 오류:', error);

      if (error.message.includes('401')) {
        return {
          status: 'no-key',
          message: 'API 키가 유효하지 않습니다 (시뮬레이션 모드)',
        };
      } else if (error.message.includes('403')) {
        return {
          status: 'no-key',
          message: 'API 접근 권한이 없습니다 (시뮬레이션 모드)',
        };
      }
      return {
        status: 'error',
        message: `API 연결 실패: ${error.message} (시뮬레이션 모드)`,
      };
    }
  }

  // 폴백 데이터 (API 사용 불가시)
  getFallbackBlogs(category = 'all') {
    const fallbackPosts = [
      {
        id: 'fallback_1',
        title: '2024년 남성 헤어 트렌드 TOP 5',
        excerpt:
          '올해 가장 인기 있는 남성 헤어스타일을 소개합니다. 페이드 컷부터 클래식 스타일까지...',
        image:
          'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: '김준호 바버',
        date: '2024.03.15',
        readTime: '5분',
        tags: ['트렌드', '페이드컷', '모던스타일'],
        category: 'trends',
        isNaverBlog: false,
      },
      {
        id: 'fallback_2',
        title: '건강한 두피를 위한 일상 관리법',
        excerpt:
          '바버가 알려주는 두피 건강 관리의 모든 것. 올바른 샴푸 방법부터 두피 마사지까지...',
        image:
          'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: '이동훈 전문가',
        date: '2024.03.12',
        readTime: '7분',
        tags: ['두피케어', '건강', '관리법'],
        category: 'care',
        isNaverBlog: false,
      },
    ];

    if (category === 'all') {
      return {
        posts: fallbackPosts,
        total: fallbackPosts.length,
        hasMore: false,
      };
    }

    const filteredPosts = fallbackPosts.filter(
      (post) => post.category === category
    );
    return {
      posts: filteredPosts,
      total: filteredPosts.length,
      hasMore: false,
    };
  }
}

export default NaverBlogService;
