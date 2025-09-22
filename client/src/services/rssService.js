class RSSService {
  constructor() {
    this.corsProxies = [
      'https://api.allorigins.win/get?url=',
      'https://corsproxy.io/?',
      'https://thingproxy.freeboard.io/fetch/'
    ];
    this.currentProxyIndex = 0;
  }

  // 다른 프록시 시도
  async tryWithDifferentProxy(rssUrl) {
    for (let i = 0; i < this.corsProxies.length; i++) {
      try {
        const proxyUrl = `${this.corsProxies[i]}${encodeURIComponent(rssUrl)}`;
        console.log(`📡 프록시 ${i + 1} 시도: ${this.corsProxies[i]}`);
        
        const response = await fetch(proxyUrl);
        if (response.ok) {
          const data = await response.json();
          if (data.contents) {
            console.log(`✅ 프록시 ${i + 1} 성공`);
            return data.contents;
          }
        }
      } catch (error) {
        console.warn(`프록시 ${i + 1} 실패:`, error.message);
      }
    }
    throw new Error('모든 프록시 서비스 실패');
  }

  // 네이버 블로그 RSS 피드에서 포스트 가져오기
  async getBlogPostsFromRSS(blogId) {
    try {
      // 다양한 RSS URL 패턴 시도
      const rssUrls = [
        `https://blog.naver.com/${blogId}/rss`,
        `https://blog.naver.com/${blogId}.rss`,
        `https://blog.naver.com/${blogId}/RSS`,
        `https://rss.blog.naver.com/${blogId}.xml`,
        `https://blog.naver.com/PostListRss.nhn?blogId=${blogId}`
      ];
      
      for (const rssUrl of rssUrls) {
        try {
          console.log(`📡 RSS 피드 시도: ${rssUrl}`);
          
          // 여러 프록시 서비스 시도
          const rssText = await this.tryWithDifferentProxy(rssUrl);
          
          if (rssText && (rssText.includes('<rss') || rssText.includes('<feed'))) {
      console.log('📡 RSS 텍스트 길이:', rssText.length);
      console.log('📡 RSS 텍스트 미리보기:', rssText.substring(0, 500));
      console.log('📡 RSS에 이미지 태그 포함 여부:', rssText.includes('<img'));
      console.log('📡 RSS에 description 태그 포함 여부:', rssText.includes('<description>'));
            
            return this.parseRSSFeed(rssText, blogId);
          }
        } catch (urlError) {
          console.warn(`URL ${rssUrl} 실패:`, urlError.message);
          continue;
        }
      }
      
      throw new Error('모든 RSS URL 패턴이 실패했습니다. 네이버 블로그 RSS 피드에 접근할 수 없습니다.');
    } catch (error) {
      console.error('RSS 피드 오류:', error);
      throw error;
    }
  }

  // RSS 피드 파싱
  parseRSSFeed(rssText, blogId) {
    try {
      if (!rssText) {
        throw new Error('RSS 텍스트가 비어있습니다.');
      }

      // HTML 페이지인지 확인 (RSS가 아닌 경우)
      if (rssText.includes('<html') || rssText.includes('<!DOCTYPE')) {
        console.error('❌ RSS 피드가 아닌 HTML 페이지가 반환되었습니다.');
        console.error('HTML 내용 미리보기:', rssText.substring(0, 1000));
        throw new Error('RSS 피드가 아닌 HTML 페이지가 반환되었습니다. 네이버에서 RSS 피드 접근을 차단하고 있을 수 있습니다.');
      }

      // XML/RSS 형식인지 확인
      if (!rssText.includes('<rss') && !rssText.includes('<feed')) {
        console.error('❌ 올바른 RSS/XML 형식이 아닙니다.');
        console.error('응답 내용 미리보기:', rssText.substring(0, 500));
        throw new Error('올바른 RSS/XML 형식이 아닙니다.');
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(rssText, 'text/xml');
      
      // 에러 체크
      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        console.error('RSS 파싱 오류:', parseError.textContent);
        console.error('파싱 실패한 내용:', rssText.substring(0, 1000));
        throw new Error('RSS 파싱 오류: ' + parseError.textContent);
      }

      const items = xmlDoc.querySelectorAll('item');
      console.log(`📡 RSS에서 ${items.length}개의 아이템을 찾았습니다.`);
      
      const posts = [];

      items.forEach((item, index) => {
        try {
          const title = this.getTextContent(item, 'title');
          const description = this.getTextContent(item, 'description');
          const link = this.getTextContent(item, 'link');
          const pubDate = this.getTextContent(item, 'pubDate');
          
          console.log(`📄 아이템 ${index + 1}:`, {
            title: title ? title.substring(0, 50) + '...' : '제목 없음',
            link: link ? link.substring(0, 100) + '...' : '링크 없음',
            hasDescription: !!description,
            descriptionLength: description ? description.length : 0,
            descriptionPreview: description ? description.substring(0, 200) + '...' : '설명 없음'
          });
          
          // 필수 필드 체크
          if (!title && !link) {
            console.warn(`아이템 ${index + 1}: 제목과 링크가 모두 없습니다.`);
            return;
          }
          
          // 이미지 추출
          console.log(`🖼️ 아이템 ${index + 1} 이미지 추출 시도:`, {
            hasDescription: !!description,
            descriptionContainsImg: description ? description.includes('<img') : false,
            descriptionContainsSrc: description ? description.includes('src=') : false
          });
          
          const extractedImage = this.extractImageFromDescription(description);
          const image = extractedImage || this.getDefaultImage();
          
          console.log(`🖼️ 아이템 ${index + 1} 최종 이미지:`, {
            extracted: extractedImage,
            final: image,
            isDefault: !extractedImage
          });
          
          // 태그 추출
          const tags = this.extractTags(title, description);
          
          // 읽기 시간 추정
          const readTime = this.estimateReadTime(description);

          const post = {
            id: `rss_${blogId}_${index + 1}`,
            title: this.cleanText(title) || '제목 없음',
            excerpt: this.cleanText(description).substring(0, 200) + (description.length > 200 ? '...' : ''),
            image: image,
            author: blogId,
            date: this.formatDate(pubDate),
            readTime: readTime,
            tags: tags,
            category: this.categorizePost(title, description),
            link: link || '#',
            isNaverBlog: true,
            source: 'rss'
          };
          
          posts.push(post);
        } catch (itemError) {
          console.warn(`아이템 ${index + 1} 파싱 실패:`, itemError);
        }
      });

      console.log(`✅ RSS에서 ${posts.length}개 포스트를 파싱했습니다.`);

      return {
        posts: posts,
        total: posts.length,
        hasMore: false
      };
    } catch (error) {
      console.error('RSS 파싱 오류:', error);
      throw error;
    }
  }

  // XML 요소에서 텍스트 내용 추출
  getTextContent(parent, tagName) {
    const element = parent.querySelector(tagName);
    return element ? element.textContent.trim() : '';
  }

  // 텍스트 정리 (HTML 태그 제거 등)
  cleanText(text) {
    if (!text) return '';
    return text
      .replace(/<[^>]*>/g, '') // HTML 태그 제거
      .replace(/&[^;]+;/g, '') // HTML 엔티티 제거
      .replace(/\s+/g, ' ') // 연속된 공백을 하나로
      .trim();
  }

  // 설명에서 이미지 URL 추출 (개선된 버전)
  extractImageFromDescription(description) {
    if (!description) return null;
    
    // 여러 이미지 태그 패턴 시도
    const patterns = [
      /<img[^>]+src="([^"]+)"/i,
      /<img[^>]+src='([^']+)'/i,
      /src="([^"]+\.(jpg|jpeg|png|gif|webp)[^"]*)"[^>]*>/i,
      /src='([^']+\.(jpg|jpeg|png|gif|webp)[^']*)'[^>]*>/i
    ];
    
    for (const pattern of patterns) {
      const match = description.match(pattern);
      if (match && match[1]) {
        let imageUrl = match[1];
        
        // 상대 URL을 절대 URL로 변환
        if (imageUrl.startsWith('//')) {
          imageUrl = 'https:' + imageUrl;
        } else if (imageUrl.startsWith('/')) {
          imageUrl = 'https://blog.naver.com' + imageUrl;
        }
        
        console.log('📸 이미지 URL 추출:', imageUrl);
        return imageUrl;
      }
    }
    
    return null;
  }

  // 기본 이미지 반환
  getDefaultImage() {
    const defaultImages = [
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ];
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  }

  // 날짜 포맷팅
  formatDate(pubDate) {
    if (!pubDate) return '날짜 미상';
    
    try {
      const date = new Date(pubDate);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\./g, '.').replace(/\s/g, '');
    } catch (error) {
      console.warn('날짜 파싱 실패:', pubDate);
      return '날짜 미상';
    }
  }

  // 읽기 시간 추정
  estimateReadTime(content) {
    const wordCount = this.cleanText(content).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes}분`;
  }

  // 태그 추출
  extractTags(title, description) {
    const text = `${title} ${description}`.toLowerCase();
    const keywords = [
      '트렌드', '헤어스타일', '바버샵', '미용실', '페이드컷',
      '클래식', '두피케어', '모발케어', '관리법', '스타일링',
      '왁스', '포마드', '비즈니스', '직장인', '정장스타일'
    ];

    const foundTags = keywords.filter(keyword =>
      text.includes(keyword.toLowerCase())
    );

    return foundTags.slice(0, 3);
  }

  // 카테고리 분류
  categorizePost(title, description) {
    const text = `${title} ${description}`.toLowerCase();

    if (text.includes('트렌드') || text.includes('2024') || text.includes('인기')) {
      return 'trends';
    } else if (text.includes('케어') || text.includes('관리') || text.includes('건강')) {
      return 'care';
    } else if (text.includes('스타일링') || text.includes('제품') || text.includes('왁스')) {
      return 'styling';
    } else if (text.includes('오픈') || text.includes('리뉴얼') || text.includes('소식')) {
      return 'news';
    }

    return 'trends';
  }
}

export default RSSService;
