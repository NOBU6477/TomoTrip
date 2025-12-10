/**
 * TomoTrip Landing Page v2 - JavaScript
 * Mobile-first, conversion-optimized interactions
 */

(function() {
  'use strict';

  // ===================================================================
  // CONFIGURATION
  // ===================================================================
  // TODO: Replace these with your actual LINE account details
  const LINE_ACCOUNT_ID = 'REPLACE_WITH_YOUR_LINE_ID'; // Without @ symbol
  const LINE_ADD_FRIEND_URL = 'https://lin.ee/REPLACE_ME'; // Fallback URL
  
  // TODO: Replace these with your actual YouTube video URLs
  const VIDEO_URLS = {
    guide: 'https://www.youtube.com/watch?v=GUIDE_VIDEO_ID',
    tourist: 'https://www.youtube.com/watch?v=TOURIST_VIDEO_ID',
    sponsor: 'https://www.youtube.com/watch?v=SPONSOR_VIDEO_ID'
  };

  // ===================================================================
  // ANALYTICS TRACKING HOOK
  // ===================================================================
  /**
   * Analytics tracking function
   * TODO: Integrate with actual analytics platform (GA4, GTM, etc.)
   */
  window.ttTrack = window.ttTrack || function(eventName, eventData) {
    if (typeof console !== 'undefined' && console.log) {
      console.log('[TomoTrip Analytics]', eventName, eventData);
    }
    
    // Example integration points:
    // if (window.gtag) {
    //   gtag('event', eventName, eventData);
    // }
    // if (window.dataLayer) {
    //   window.dataLayer.push({
    //     event: eventName,
    //     ...eventData
    //   });
    // }
  };

  // ===================================================================
  // LINE REGISTRATION MODAL WITH DEEP LINK
  // ===================================================================
  const lineModal = document.getElementById('lineModal');
  const openLineModalBtn = document.getElementById('openLineModalBtn');
  const closeLineModalBtn = document.getElementById('closeLineModal');
  const lineModalOverlay = document.getElementById('lineModalOverlay');
  const lineFallbackHelper = document.getElementById('lineFallbackHelper');
  const fallbackKeyword = document.getElementById('fallbackKeyword');
  const copyKeywordBtn = document.getElementById('copyKeywordBtn');

  /**
   * Generate LINE oaMessage deep link
   * @param {string} keyword - The pre-filled message keyword
   * @returns {string} LINE deep link URL
   */
  function lineOaMessageLink(keyword) {
    return `https://line.me/R/oaMessage/@${LINE_ACCOUNT_ID}/?${encodeURIComponent(keyword)}`;
  }

  /**
   * Show fallback helper UI with copy functionality
   * @param {string} keyword - The keyword to display and copy
   */
  function showCopyHelper(keyword) {
    if (!lineFallbackHelper || !fallbackKeyword) return;
    
    fallbackKeyword.textContent = keyword;
    lineFallbackHelper.style.display = 'block';
    
    // Scroll to fallback helper
    setTimeout(() => {
      lineFallbackHelper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  /**
   * Hide fallback helper UI
   */
  function hideCopyHelper() {
    if (!lineFallbackHelper) return;
    lineFallbackHelper.style.display = 'none';
  }

  /**
   * Open LINE with keyword (with fallback)
   * @param {string} keyword - The keyword to send
   */
  function openLineWithKeyword(keyword) {
    const oaMessageUrl = lineOaMessageLink(keyword);
    
    // Track click event
    window.ttTrack('line_registration_click', {
      keyword: keyword,
      deep_link: oaMessageUrl
    });
    
    // Try to open LINE with oaMessage deep link
    const win = window.open(oaMessageUrl, '_blank');
    
    // Fallback mechanism (for desktop or if deep link doesn't work)
    setTimeout(() => {
      if (!win || win.closed || typeof win.closed === 'undefined') {
        // Open friend add URL as fallback
        if (LINE_ADD_FRIEND_URL && LINE_ADD_FRIEND_URL !== 'https://lin.ee/REPLACE_ME') {
          window.open(LINE_ADD_FRIEND_URL, '_blank');
        }
        // Show copy helper
        showCopyHelper(keyword);
        
        window.ttTrack('line_fallback_triggered', {
          keyword: keyword
        });
      }
    }, 800);
  }

  function openLineModal() {
    if (!lineModal) return;
    lineModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeLineModalBtn?.focus();
    hideCopyHelper(); // Reset fallback helper
    
    window.ttTrack('line_modal_open', { source: 'hero_button' });
  }

  function closeLineModal() {
    if (!lineModal) return;
    lineModal.classList.remove('active');
    document.body.style.overflow = '';
    openLineModalBtn?.focus();
    hideCopyHelper(); // Hide fallback helper
    
    window.ttTrack('line_modal_close', {});
  }

  if (openLineModalBtn) {
    openLineModalBtn.addEventListener('click', openLineModal);
  }

  // Add event listeners to all buttons with 'open-line-modal' class
  document.querySelectorAll('.open-line-modal').forEach(btn => {
    btn.addEventListener('click', function() {
      openLineModal();
      
      // Track which button opened the modal
      const source = this.getAttribute('data-testid') || 'unknown';
      window.ttTrack('line_modal_open', { source: source });
    });
  });

  if (closeLineModalBtn) {
    closeLineModalBtn.addEventListener('click', closeLineModal);
  }

  if (lineModalOverlay) {
    lineModalOverlay.addEventListener('click', closeLineModal);
  }

  // LINE registration type selection buttons
  document.querySelectorAll('#lineModal .option-card[data-keyword]').forEach(card => {
    card.addEventListener('click', function() {
      const keyword = this.getAttribute('data-keyword');
      openLineWithKeyword(keyword);
    });
  });

  // Copy keyword button
  if (copyKeywordBtn) {
    copyKeywordBtn.addEventListener('click', function() {
      const keyword = fallbackKeyword?.textContent;
      if (!keyword) return;
      
      // Copy to clipboard
      navigator.clipboard.writeText(keyword).then(() => {
        // Visual feedback
        const originalText = this.innerHTML;
        this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>コピー完了！';
        
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
        
        window.ttTrack('keyword_copied', { keyword: keyword });
      }).catch(err => {
        console.error('Failed to copy keyword:', err);
        alert('コピーに失敗しました。手動でキーワードをコピーしてください。');
      });
    });
  }

  // ===================================================================
  // VIDEO SELECTION MODAL - Open YouTube in New Tab
  // ===================================================================
  const videoModal = document.getElementById('videoModal');
  const openVideoModalBtn = document.getElementById('openVideoModalBtn');
  const closeVideoModalBtn = document.getElementById('closeVideoModal');
  const videoModalOverlay = document.getElementById('videoModalOverlay');

  function openVideoModal() {
    if (!videoModal) return;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeVideoModalBtn?.focus();
    
    window.ttTrack('video_selection_modal_open', { source: 'hero_button' });
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    openVideoModalBtn?.focus();
    
    window.ttTrack('video_selection_modal_close', {});
  }

  if (openVideoModalBtn) {
    openVideoModalBtn.addEventListener('click', openVideoModal);
  }

  if (closeVideoModalBtn) {
    closeVideoModalBtn.addEventListener('click', closeVideoModal);
  }

  if (videoModalOverlay) {
    videoModalOverlay.addEventListener('click', closeVideoModal);
  }

  // Video selection buttons - Open YouTube in new tab
  document.querySelectorAll('#videoModal .option-card[data-video-url]').forEach(card => {
    card.addEventListener('click', function() {
      const videoUrl = this.getAttribute('data-video-url');
      if (!videoUrl || videoUrl.includes('VIDEO_ID')) {
        console.warn('[TomoTrip] Video URL not configured:', videoUrl);
        alert('動画URLが設定されていません。設定ファイルを確認してください。');
        return;
      }
      
      // Determine video type from card class
      const videoType = this.classList.contains('option-card--guide') ? 'guide' :
                        this.classList.contains('option-card--tourist') ? 'tourist' : 'sponsor';
      
      // Track video open event
      window.ttTrack('video_open', {
        video_type: videoType,
        video_url: videoUrl
      });
      
      // Open YouTube video in new tab
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
      
      // Close video selection modal
      closeVideoModal();
    });
  });

  // Close modals on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (lineModal?.classList.contains('active')) {
        closeLineModal();
      } else if (videoModal?.classList.contains('active')) {
        closeVideoModal();
      }
    }
  });

  // ===================================================================
  // AUDIENCE TABS
  // ===================================================================
  const tabs = document.querySelectorAll('[role="tab"]');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');

  /**
   * Get initial audience from URL parameters or hash
   * Supports: ?audience=student or #audience=student
   */
  function getInitialAudience() {
    // Check URL search params first
    const urlParams = new URLSearchParams(window.location.search);
    const audienceParam = urlParams.get('audience');
    if (audienceParam && ['student', 'night', 'homemaker', 'pro'].includes(audienceParam)) {
      return audienceParam;
    }
    
    // Check URL hash
    const hash = window.location.hash;
    if (hash.startsWith('#audience=')) {
      const hashAudience = hash.replace('#audience=', '');
      if (['student', 'night', 'homemaker', 'pro'].includes(hashAudience)) {
        return hashAudience;
      }
    }
    
    // Default to student
    return 'student';
  }

  /**
   * Set active audience tab
   * @param {string} audience - 'student', 'night', 'homemaker', or 'pro'
   */
  window.setAudience = function(audience) {
    if (!['student', 'night', 'homemaker', 'pro'].includes(audience)) {
      console.warn('[TomoTrip] Invalid audience:', audience);
      return;
    }

    // Update tabs
    tabs.forEach(tab => {
      const isActive = tab.getAttribute('data-audience') === audience;
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      
      if (isActive) {
        tab.classList.add('tab--active');
      } else {
        tab.classList.remove('tab--active');
      }
    });

    // Update panels
    tabPanels.forEach(panel => {
      const panelId = panel.id;
      const shouldShow = panelId === `panel-${audience}`;
      
      if (shouldShow) {
        panel.hidden = false;
      } else {
        panel.hidden = true;
      }
    });

    // Update URL without page reload
    const newUrl = `${window.location.pathname}?audience=${audience}${window.location.hash}`;
    if (window.history.replaceState) {
      window.history.replaceState({ audience }, '', newUrl);
    }

    // Track audience view
    window.ttTrack('audience_view', {
      audience: audience,
      source: 'tab_click'
    });

    // Update hero content for pro audience
    updateHeroForAudience(audience);
  };

  /**
   * Update hero button and card text based on audience
   * @param {string} audience - Current audience type
   */
  function updateHeroForAudience(audience) {
    const heroBtn = document.querySelector('#openLineModalBtn');
    const heroCard = document.querySelector('.hero-line-card');
    const heroCardTitle = document.querySelector('.hero-line-title');
    const heroCardDesc = document.querySelector('.hero-line-desc');

    if (!heroBtn || !heroCard) return;

    if (audience === 'pro') {
      // Pro audience: App-focused messaging
      // Update button text (preserve SVG icon)
      const btnIcon = heroBtn.querySelector('.btn__icon');
      const btnSubtitle = heroBtn.querySelector('.btn__subtitle');
      if (btnIcon && btnSubtitle) {
        heroBtn.innerHTML = '';
        heroBtn.appendChild(btnIcon);
        heroBtn.appendChild(document.createTextNode(' 公式アプリで登録を始める '));
        btnSubtitle.textContent = 'ガイド・協賛店・観光客 登録 OK';
        heroBtn.appendChild(btnSubtitle);
      }

      // Update card content
      if (heroCardTitle) {
        heroCardTitle.textContent = '✨ アプリ登録で案内が届きます ✨';
      }
      if (heroCardDesc) {
        heroCardDesc.innerHTML = '登録区分（ガイド／協賛店／観光客）をアプリ内で選ぶだけで、<br>あなたに合った、わかりやすい登録フローが届きます📱✨<br>登録後はLINEでもサポート案内が届くので安心です。';
      }
    } else {
      // Other audiences: LINE-focused messaging (default)
      const btnIcon = heroBtn.querySelector('.btn__icon');
      const btnSubtitle = heroBtn.querySelector('.btn__subtitle');
      if (btnIcon && btnSubtitle) {
        heroBtn.innerHTML = '';
        heroBtn.appendChild(btnIcon);
        heroBtn.appendChild(document.createTextNode(' LINEで登録する '));
        btnSubtitle.textContent = 'ガイド・観光客・協賛店';
        heroBtn.appendChild(btnSubtitle);
      }

      // Reset card content to default
      if (heroCardTitle) {
        heroCardTitle.textContent = '✨ LINE登録で案内が届きます ✨';
      }
      if (heroCardDesc) {
        heroCardDesc.innerHTML = '希望内容を選ぶだけで、<br>ガイド登録・協賛店登録・観光客登録の<br>わかりやすい案内フローが届きます📲';
      }
    }
  }

  /**
   * Initialize tabs with keyboard navigation
   */
  function initTabs() {
    const initialAudience = getInitialAudience();
    window.setAudience(initialAudience);

    tabs.forEach((tab, index) => {
      // Click handler
      tab.addEventListener('click', function() {
        const audience = this.getAttribute('data-audience');
        window.setAudience(audience);
      });

      // Keyboard navigation
      tab.addEventListener('keydown', function(e) {
        let targetTab = null;

        // Arrow key navigation
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (index + 1) % tabs.length;
          targetTab = tabs[nextIndex];
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (index - 1 + tabs.length) % tabs.length;
          targetTab = tabs[prevIndex];
        } else if (e.key === 'Home') {
          e.preventDefault();
          targetTab = tabs[0];
        } else if (e.key === 'End') {
          e.preventDefault();
          targetTab = tabs[tabs.length - 1];
        }

        if (targetTab) {
          targetTab.focus();
          const audience = targetTab.getAttribute('data-audience');
          window.setAudience(audience);
        }
      });
    });
  }

  // Initialize tabs when DOM is ready
  if (tabs.length > 0) {
    initTabs();
  }

  // ===================================================================
  // I18N (INTERNATIONALIZATION) - Future Implementation
  // ===================================================================
  /**
   * Language switcher stub
   * TODO: Implement full i18n with translation JSON files
   * @param {string} lang - Language code (e.g., 'ja', 'en', 'zh')
   */
  window.setLang = function(lang) {
    console.log('[TomoTrip i18n] Language switch requested:', lang);
    
    // Future implementation:
    // 1. Load translation JSON file for the language
    // 2. Find all elements with data-i18n attribute
    // 3. Replace text content with translated values
    // 4. Update HTML lang attribute
    // 5. Store preference in localStorage
    // 6. Track language change event
    
    /*
    Example structure:
    
    const translations = {
      ja: {
        'hero.title': 'あなたの街が"仕事場"になる。',
        'hero.subtitle': 'TomoTrip（旅友）— 地元ガイドで、好きな時間に収入を。'
      },
      en: {
        'hero.title': 'Your City Becomes Your Workplace',
        'hero.subtitle': 'TomoTrip - Earn income as a local guide on your schedule'
      }
    };
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = translations[lang]?.[key];
      if (translation) {
        el.textContent = translation;
      }
    });
    
    document.documentElement.lang = lang;
    localStorage.setItem('tt_lang', lang);
    */
    
    window.ttTrack('language_change', { language: lang });
  };

  // ===================================================================
  // CTA CLICK TRACKING
  // ===================================================================
  /**
   * Track all CTA button clicks
   */
  function initCTATracking() {
    const ctaButtons = document.querySelectorAll('a[href*="lin.ee"], a[data-testid*="line-register"]');
    
    ctaButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        const buttonId = this.getAttribute('data-testid') || 'unknown';
        const buttonText = this.textContent.trim();
        const buttonLocation = getButtonLocation(this);
        
        window.ttTrack('cta_click', {
          button_id: buttonId,
          button_text: buttonText,
          button_location: buttonLocation,
          destination_url: this.href
        });
      });
    });
  }

  /**
   * Helper to determine button location on page
   */
  function getButtonLocation(element) {
    if (element.closest('#hero')) return 'hero';
    if (element.closest('#campaign')) return 'campaign';
    if (element.closest('.mobile-cta')) return 'mobile_cta';
    return 'unknown';
  }

  // ===================================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===================================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or for tab anchors
        if (href === '#' || href.startsWith('#audience=')) {
          return;
        }
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          const yOffset = -80; // Offset for fixed headers if any
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
          
          // Update URL hash
          if (window.history.pushState) {
            window.history.pushState(null, null, href);
          }
          
          // Move focus to target for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  }

  // ===================================================================
  // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  // ===================================================================
  function initScrollAnimations() {
    // Only apply if user hasn't requested reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
      // Skip hero section
      if (index === 0) return;
      
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  }

  // ===================================================================
  // FAQ ACCORDION TRACKING
  // ===================================================================
  function initFAQTracking() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      item.addEventListener('toggle', function() {
        if (this.open) {
          const question = this.querySelector('.faq-item__question')?.textContent.trim();
          const faqId = this.getAttribute('data-testid') || 'unknown';
          
          window.ttTrack('faq_open', {
            faq_id: faqId,
            question: question
          });
        }
      });
    });
  }

  // ===================================================================
  // PAGE VIEW TRACKING
  // ===================================================================
  function trackPageView() {
    const audience = getInitialAudience();
    const referrer = document.referrer || 'direct';
    
    window.ttTrack('page_view', {
      page_url: window.location.href,
      page_title: document.title,
      initial_audience: audience,
      referrer: referrer,
      user_agent: navigator.userAgent,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight
    });
  }

  // ===================================================================
  // MOBILE CTA BAR VISIBILITY
  // ===================================================================
  function initMobileCTA() {
    const mobileCTA = document.getElementById('mobileCTA');
    if (!mobileCTA) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateCTAVisibility() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show CTA after scrolling down 300px
      // Hide when near bottom (within 200px of footer)
      const showCTA = scrollY > 300 && (scrollY + windowHeight) < (documentHeight - 200);
      
      if (showCTA) {
        mobileCTA.style.display = 'block';
      } else {
        mobileCTA.style.display = 'none';
      }
      
      lastScrollY = scrollY;
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateCTAVisibility);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    updateCTAVisibility(); // Initial check
  }

  // ===================================================================
  // FORM VALIDATION (if forms are added later)
  // ===================================================================
  /**
   * Basic form validation helper
   * Can be extended when contact/registration forms are added
   */
  window.validateEmail = function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  window.validatePhone = function(phone) {
    // Japanese phone number format
    const re = /^[\d\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  // ===================================================================
  // PERFORMANCE MONITORING
  // ===================================================================
  function trackPerformance() {
    if ('PerformanceObserver' in window) {
      // Track Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          window.ttTrack('performance_lcp', {
            value: lastEntry.renderTime || lastEntry.loadTime,
            element: lastEntry.element?.tagName
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Silently fail if not supported
      }

      // Track First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            window.ttTrack('performance_fid', {
              value: entry.processingStart - entry.startTime,
              name: entry.name
            });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Silently fail if not supported
      }
    }

    // Track page load time
    window.addEventListener('load', function() {
      setTimeout(function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        
        window.ttTrack('performance_load', {
          page_load_time: pageLoadTime,
          dom_ready_time: domReadyTime,
          dns_time: perfData.domainLookupEnd - perfData.domainLookupStart,
          tcp_time: perfData.connectEnd - perfData.connectStart,
          response_time: perfData.responseEnd - perfData.requestStart
        });
      }, 0);
    });
  }

  // ===================================================================
  // ERROR TRACKING
  // ===================================================================
  window.addEventListener('error', function(e) {
    window.ttTrack('javascript_error', {
      message: e.message,
      filename: e.filename,
      line: e.lineno,
      column: e.colno,
      stack: e.error?.stack
    });
  });

  // ===================================================================
  // INITIALIZATION
  // ===================================================================
  function init() {
    // Track initial page view
    trackPageView();
    
    // Initialize all features
    initCTATracking();
    initSmoothScroll();
    initScrollAnimations();
    initFAQTracking();
    initMobileCTA();
    trackPerformance();
    
    console.log('[TomoTrip] Landing page initialized successfully');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ===================================================================
  // UTILITY FUNCTIONS (exposed globally)
  // ===================================================================
  
  /**
   * Scroll to top utility
   */
  window.scrollToTop = function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Check if element is in viewport
   */
  window.isInViewport = function(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

})();
