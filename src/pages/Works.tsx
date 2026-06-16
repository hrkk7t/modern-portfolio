import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

type WorkItem = {
  id: number;
  category: string;
  thumbnail: string;
  image: string;
  flowImage?: string;
  title: string;
  shortDesc: string;
  url: string;
  details: {
    period: string;
    role: string;
    tech: string[];
    challenge: string;
    solution: string;
  };
};

const worksData: WorkItem[] = [
  { 
    id: 1, 
    category: 'web', 
    thumbnail: '/images/thumb-hp-01.webp',
    image: '/images/hp-01.webp', 
    title: '保険代理店 コーポレートサイト', 
    shortDesc: '公式Webサイトの新規立ち上げ。自作イラストを用いた直感的な安心感の訴求。', 
    url: 'https://hosho1986.com/',
    details: {
      period: '2025.07 - 2026.02',
      role: 'アートディレクション / UIデザイン / コーディング / イラスト制作',
      tech: ['Photoshop', 'Illustrator', 'XD', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
      challenge: '「保険＝堅苦しい・難しい」というユーザーが抱く心理的ハードルが、お問い合わせ（CV）の最大の阻害要因になっていると分析。',
      solution: 'ファーストビューに親しみやすい自作イラストを据え、直感的な「安心感」を演出して離脱を防止。全体の色数を抑える「引き算」を徹底し、最もPRしたいコンテンツやCVボタンにのみアクセントカラーを配置して最短距離で目的のアクションへ導く視線誘導を実装。'
    }
  },
  { 
    id: 2, 
    category: 'web', 
    thumbnail: '/images/thumb-hp-02.webp',
    image: '/images/hp-02.webp', 
    title: '建設会社 コーポレートサイト', 
    shortDesc: '長期運用で複雑化したサイトマップの再構築と、YouTube発信の動的統合。', 
    url: 'https://www.kitamura-tech.com/',
    details: {
      period: '2025.10 - 2026.04',
      role: '情報設計 / UI・UXデザイン / フロントエンド実装',
      tech: ['Photoshop', 'Illustrator', 'XD', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
      challenge: '長期にわたる情報追加の結果、サイト構造が複雑化。企業の最大の強みである「圧倒的な実績数」や「YouTubeでの動画発信」がユーザーに届きづらい状態になっていた。',
      solution: 'UI/UXの大幅な見直しを行い、サイトマップを完全再構築。トップページに公式YouTubeを動的に自動表示させる仕組みを組み込み露出を最大化。さらにPHPでカスタム投稿タイプを独自設計し、クライアントが直感的に実績を追加・更新できる持続可能な運用システムを確立。'
    }
  },
  { 
    id: 3, 
    category: 'web', 
    thumbnail: '/images/thumb-hp-03.webp',
    image: '/images/hp-03.webp', 
    title: 'NPO法人 Webサイト', 
    shortDesc: 'UI/UXの刷新による複雑化したサイト構造の最適化と、運用性を高めるカスタム投稿機能。', 
    url: 'http://www.tohoku-tech.org/',
    details: {
      period: '2025.12 - 2026.06',
      role: 'デザイン / コーディング / 運用設計',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
      challenge: '長期的な情報追加によるサイト構造の複雑化。さらに、日々の運用・管理オペレーションが難解になり、担当者の運用負荷が高まっていることが大きな課題となっていた。',
      solution: 'UI/UXの大幅な見直しを敢行し、複雑化していたサイトマップと導線を直感的に分かりやすく再設計。さらに、クライアントが専門知識を必要とせず、日常の業務の中でスムーズかつ簡単に更新・管理できるよう、投稿機能を独自にカスタム実装。'
    }
  },
  { 
    id: 4, 
    category: 'web', 
    thumbnail: '/images/thumb-hp-04.webp',
    image: '/images/hp-04.webp', 
    title: '美容院グループ Webサイト', 
    shortDesc: '多店舗展開における情報の構造化と、ブランド価値を担保する「引き算のデザイン」。', 
    url: 'https://crayon-beauty.jp/',
    details: {
      period: '2024.12 - 2025.02',
      role: 'デザインのみ',
      tech: ['Photoshop', 'Illustrator', 'XD'],
      challenge: '複数店舗の展開に伴う情報の煩雑化と、それに伴うブランドイメージの希薄化・ユーザーの離脱リスク。',
      solution: '各店舗の膨大な情報を徹底的に構造化し、ユーザーが迷わない情報設計を構築。明朝体と無彩色を基調とした「引き算のデザイン」でサロンの高級感と質感を引き立てつつ、全店舗の特徴を一目で把握できる高い利便性を両立。'
    }
  },
  { 
    id: 5, 
    category: 'web', 
    thumbnail: '/images/thumb-hp-05.webp',
    image: '/images/hp-05.webp', 
    title: '電気工事会社 コーポレートサイト', 
    shortDesc: '紙媒体とのビジュアル乖離を解消し、有権者へのシームレスな信頼感を訴求。', 
    url: 'https://www.toho-ew.co.jp/',
    details: {
      period: '2026.02 - 2026.03',
      role: 'UIデザイン / コーディング / イラスト制作',
      tech: ['Photoshop', 'Illustrator', 'PHP', 'JavaScript', 'HTML5', 'CSS3'],
      challenge: '配布物（チラシ等の紙媒体）とWebの視覚的イメージが乖離していることで、ブランド認知が分散してしまうリスクが存在。',
      solution: '配布物との厳格な世界観・カラー統一を保持しつつ、Web特有のアクセシビリティを追求。デバイスを問わず、ユーザーや関係者の「信頼」を損なわないシームレスなビジュアルイメージと高い操作性を両立。'
    }
  },
  { 
    id: 6, 
    category: 'web', 
    thumbnail: '/images/thumb-hp-06.webp',
    image: '/images/hp-06.webp', 
    title: '透ける津軽塗LP', 
    shortDesc: '伝統工芸 of 新しい表現を伝えるモノトーン構成と、直感的にクリックを促すUI。', 
    url: 'https://tanaka-meisan.jp/sukeru-tsugarunuri/',
    details: {
      period: '2026.01 - 2026.02',
      role: 'アートディレクション / UIデザイン / コーディング',
      tech: ['XD', 'Photoshop', 'Illustrator', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
      challenge: '「透ける津軽塗」という前代未聞の新しい漆表現に対し、ユーザーが使用用途や商品自体の美しさを具体的にイメージしづらいという認知の壁。',
      solution: '視覚情報を「透ける質感」一点に集中させるため、背景とテキストを完全にモノトーンで構成。余白を贅沢に使うことで商品の希少性を演出。さらに、ボタン自体に津軽塗のデザインを施すことで「この美しい質感に触れてみたい」という衝動を刺激し、クリック（CV）への明確な動機付けを計算して設計。'
    }
  },
  { 
    id: 7, 
    category: 'dev', 
    thumbnail: '/images/thumb-dev-01.webp',
    image: '/images/dev-01.webp', 
    flowImage: '/images/oshi-note-flow.webp',
    title: '推し活アプリ「Oshi Note」', 
    shortDesc: 'API連携と深いインサイトから、ファンの事務的ストレスを徹底排除したWebアプリ。', 
    url: 'https://oshi-note.com/',
    details: {
      period: '2025.04 - 運用中',
      role: 'システム設計 / フロントエンド開発 / バックエンド開発',
      tech: ['Python', 'Flask', 'YouTube API'],
      challenge: '配信者のファン層において、「複数プラットフォームに散らばる配信情報の確認」と「推し活費用の管理」が煩雑になり、活動自体が事務的なストレスになっているペインを特定。',
      solution: 'YouTube APIを活用し、名前入力だけでチャンネルIDを自動取得するロジックを組み、入力の手間を徹底排除。カラーコードによる「無限の推し色設定」を実装し、ファンの深いこだわりを満たす没入感を演出。さらに活動記録が貯金に直結するゲーミフィケーションを導入し、継続的な再訪問率を最大化。'
    }
  },
  { 
    id: 8, 
    category: 'dev', 
    thumbnail: '/images/thumb-dev-02.webp',
    image: '/images/dev-02.webp', 
    title: 'データ連携・自動集約システム (GAS)', 
    shortDesc: 'PythonとAI、GASを組み合わせ、1,500件超の手作業を完全自動化したデータ基盤。', 
    url: '',
    details: {
      period: '2025.06 - 2025.07',
      role: 'システム設計 / バックエンド開発',
      tech: ['Python', 'GAS (Google Apps Script)', 'Gemini AI API'],
      challenge: '自社運営メディアにおいて、1,500件を超える非定型な地域イベント情報を手作業で整理・更新しており、莫大な工数とヒューマンエラーが発生。他業務のリソースを激しく圧迫していた。',
      solution: 'Pythonを用いてWordPressからデータを一括抽出し、Gemini AI APIを連携させて非定型なテキストデータを表形式へ自動クレンジング。Googleスプレッドシートと連携した管理用データベースを構築し、15分おきの定期ポーリングによる自動検知システムで完全なハンズフリー化を実現。'
    }
  },
  { 
    id: 9, 
    category: 'dev', 
    thumbnail: '/images/thumb-dev-03.webp',
    image: '/images/dev-03.webp', 
    flowImage: '/images/dev-03-code.webp',
    title: '入稿補助システム開発', 
    shortDesc: 'PDFからWordPress下書きへ自動解析・生成を行う内製業務効率化システム。', 
    url: '',
    details: {
      period: '2025.08 - 2025.09',
      role: 'システム設計 / フロントエンド / バックエンド開発',
      tech: ['Python', 'WordPress API', 'HTML5/CSS3/JavaScript', 'PHP'],
      challenge: '主催者から送られてくる多種多様なフォーマットのPDFデータ（メール添付）を見ながらの手動入稿作業に伴う、速度低下とヒューマンエラーのリスク。',
      solution: 'Pythonをベースとしたシステムを開発。管理画面からPDFをアップロードするだけで内容を自動解析し、WordPress APIを通じて瞬時に「下書き」を自動生成するロジックを構築。カテゴリ設定やGoogle Mapsの位置情報まで自動でマッピングさせ、内製運用のオペレーションを劇的に効率化。'
    }
  },
  { 
    id: 10, 
    category: 'graphic', 
    thumbnail: '/images/thumb-graphic-01.webp',
    image: '/images/graphic-01.webp', 
    title: 'メインビジュアル（3D）', 
    shortDesc: '複雑なサービス全体の構造を、親しみやすく立体的に可視化する3Dイラスト。', 
    url: 'https://www.keiso.co/',
    details: {
      period: '2025.04 - 2025.05',
      role: 'メインビジュアル制作（アイソメトリックイラスト）',
      tech: ['Illustrator'],
      challenge: '専門度が高いサービス全体の構造がユーザーにとって「分かりにくく、堅苦しい」印象を与えてしまい、直帰・離脱リスクを引き起こしていた。',
      solution: '立体的な空間構造を分かりやすく視覚化できる「アイソメトリック図法」を採用。専門的で冷たい印象を完全に払拭するため、丸みのある滑らかなフォルム and 清潔感のあるクリーンなカラー構成で描き起こし、直感的な理解度を高め離脱を防止。'
    }
  },
  { 
    id: 11, 
    category: 'graphic', 
    thumbnail: '/images/thumb-graphic-02.webp',
    image: '/images/graphic-02.webp', 
    title: 'Webサイトイラスト全般', 
    shortDesc: '視覚的ノイズを極限までそぎ落とし、サイトの独自性とブランド認知を高めるアートワーク。', 
    url: 'https://www.hiroka.jp/',
    details: {
      period: '2025.04 - 2025.05',
      role: 'サイトTOPイラスト / フロアマップ / その他イラスト制作全般',
      tech: ['Illustrator', 'Photoshop'],
      challenge: 'よくあるフリー素材の多用によるサイトの没個性化、および過剰な装飾（視覚的ノイズ）によるユーザーの脳内への認知負荷の上昇。',
      solution: '無駄な装飾やノイズを極限までそぎ落としつつ、個性的な独自のフォルムを取り入れたイラスト全般を制作。フロアマップ等に配置し、汎用素材とは一線を画す「あのサイト」と一目で認識できるオリジナリティを確立。認知負荷を下げつつ、ブランド認知度を劇的に向上。'
    }
  },
  { 
    id: 12, 
    category: 'graphic', 
    thumbnail: '/images/thumb-graphic-03.webp',
    image: '/images/graphic-03.webp', 
    title: 'UIピクトグラム・ロゴ', 
    shortDesc: '無彩色グレーに限定したUIピクトグラムによる、迷わせない情報設計。', 
    url: '',
    details: {
      period: '2024.11 - 2024.12',
      role: 'UIアイコン・ロゴデザイン開発',
      tech: ['Illustrator'],
      challenge: '文字情報だけに頼った複雑なメニュー構成による視認性の低下と、それに伴うユーザーの混乱・離脱リスクを特定。',
      solution: '直感的にサービス内容を理解させるためのオリジナルピクトグラム（UIアイコン）を新規設計。さらに視覚的ノイズを極限まで排除するため、配色を「濃淡2色のグレーのみ」に厳格に限定。徹底した『引き算のデザイン』により、ユーザーの認知負荷を最小化し、目的のページへ迷わずスムーズに誘導するUI動線をグラフィックの力で構築。'
    }
  }
];

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

function Works() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const filteredWorks = worksData.filter(work =>
    activeFilter === 'all' ? true : work.category === activeFilter
  );

  useEffect(() => {
    if (selectedWork || enlargedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedWork, enlargedImage]);

  const handlePrev = () => {
    if (!selectedWork) return;
    const currentIndex = worksData.findIndex(w => w.id === selectedWork.id);
    const prevIndex = (currentIndex - 1 + worksData.length) % worksData.length;
    setSelectedWork(worksData[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedWork) return;
    const currentIndex = worksData.findIndex(w => w.id === selectedWork.id);
    const nextIndex = (currentIndex + 1) % worksData.length;
    setSelectedWork(worksData[nextIndex]);
  };

  return (
    <PageTransition>
      <div className="page works-page">
        <motion.h2 className="page-title" initial="hidden" whileInView="show" viewport={{ once: true }} variants={revealVariants}>WORKS</motion.h2>

        <motion.div className="filter-nav" initial="hidden" whileInView="show" viewport={{ once: true }} variants={revealVariants}>
          <button className={activeFilter === 'all' ? 'active' : ''} onClick={() => setActiveFilter('all')}>ALL</button>
          <button className={activeFilter === 'web' ? 'active' : ''} onClick={() => setActiveFilter('web')}>WEB</button>
          <button className={activeFilter === 'dev' ? 'active' : ''} onClick={() => setActiveFilter('dev')}>DEV</button>
          <button className={activeFilter === 'graphic' ? 'active' : ''} onClick={() => setActiveFilter('graphic')}>GRAPHIC</button>
        </motion.div>

        <motion.div className="works-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                className="work-item"
                layout
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={revealVariants}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedWork(work)}
              >
                <div className="work-image-wrapper">
                  <img src={work.thumbnail} alt={work.title} />
                  <div className="work-overlay">
                    <button className="view-details-btn">VIEW DETAILS</button>
                  </div>
                </div>
                <div className="work-info">
                  <h3>{work.title}</h3>
                  <p>{work.shortDesc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedWork && (
            <div className="modal-backdrop" onClick={() => setSelectedWork(null)}>
              <motion.div 
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <button className="modal-close-btn" onClick={() => setSelectedWork(null)}>✕</button>
                <div className="modal-body">
                  <div className="modal-body-inner">
                    
                    <div 
                      className="modal-image-pane" 
                      style={{ 
                        flexDirection: 'column', 
                        justifyContent: selectedWork.flowImage ? 'flex-start' : 'center',
                        gap: '40px',
                        padding: selectedWork.flowImage ? '50px 30px' : '30px'
                      }}
                    >
                      <img 
                        src={selectedWork.image} 
                        alt={selectedWork.title} 
                        onClick={() => setEnlargedImage(selectedWork.image)}
                        style={{ cursor: 'zoom-in' }} 
                      />
                      
                      {selectedWork.flowImage && (
                        <div style={{ width: '100%' }}>
                          <h4 style={{ color: '#666', fontSize: '0.75rem', letterSpacing: '0.15em', marginBottom: '15px', fontFamily: 'Montserrat, sans-serif', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
                            SYSTEM ARCHITECTURE & DATA FLOW
                          </h4>
                          <img 
                            src={selectedWork.flowImage} 
                            alt="システム構成図" 
                            onClick={() => setEnlargedImage(selectedWork.flowImage || null)}
                            style={{ width: '100%', height: 'auto', borderRadius: '4px', cursor: 'zoom-in' }} 
                          />
                        </div>
                      )}
                    </div>

                    <div className="modal-text-pane">
                      <span className="modal-category">{selectedWork.category.toUpperCase()}</span>
                      <h2>{selectedWork.title}</h2>
                      
                      <div className="meta-grid">
                        <div>
                          <strong>DURATION</strong>
                          <span>{selectedWork.details.period}</span>
                        </div>
                        <div>
                          <strong>ROLE</strong>
                          <span>{selectedWork.details.role}</span>
                        </div>
                      </div>

                      <div className="tech-tags">
                        {selectedWork.details.tech.map((t, i) => <span key={i}>{t}</span>)}
                      </div>

                      <div className="logic-section">
                        <h3>THE CHALLENGE</h3>
                        <p>{selectedWork.details.challenge}</p>
                      </div>

                      <div className="logic-section">
                        <h3>THE SOLUTION</h3>
                        <p>{selectedWork.details.solution}</p>
                      </div>

                      <div className="modal-actions-wrapper">
                        {selectedWork.url && (
                          <a href={selectedWork.url} target="_blank" rel="noopener noreferrer" className="modal-visit-btn">
                            VISIT SITE ➔
                          </a>
                        )}
                        
                        <div className="modal-pager">
                          <button onClick={handlePrev} className="pager-btn">PREV</button>
                          <span className="pager-divider">/</span>
                          <button onClick={handleNext} className="pager-btn">NEXT</button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {enlargedImage && (
            <motion.div 
              className="fullscreen-image-overlay" 
              onClick={() => setEnlargedImage(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'fixed',
                top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                zIndex: 11000,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: 'zoom-out'
              }}
            >
              <button 
                onClick={() => setEnlargedImage(null)}
                style={{
                  position: 'absolute', top: '30px', right: '40px',
                  background: 'none', border: 'none', color: '#a0a0a0',
                  fontSize: '1.8rem', cursor: 'pointer', zIndex: 11001,
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                ✕
              </button>

              <motion.img 
                src={enlargedImage} 
                alt="Enlarged View" 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                  maxWidth: '90vw', 
                  maxHeight: '85vh', 
                  objectFit: 'contain',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}

export default Works;