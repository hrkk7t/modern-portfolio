/* --- About.tsx --- */
import PageTransition from '../components/PageTransition';
import { motion, Variants } from 'framer-motion';

type StrengthItem = {
  name: string;
  detail: string;
};

type ToolCategory = {
  category: string;
  items: string[];
};

const strengthsData: StrengthItem[] = [
  { name: "TypeScript / React", detail: "厳格な型チェック（strict: true）のコンパイルオプションをクリアした、堅牢で型安全なコンポーネント設計。既存のJavaScript環境からの完全な移行・リファクタリングを完遂。" },
  { name: "Python / GAS", detail: "WordPress APIを活用した入稿補助ツールや自動集約システムを自作。年間1,000件以上のデータを整理し、業務の75%を自動化した仕組み化の実装力。" },
  { name: "UI/UX 情報設計", detail: "教員経験で培った「論理的言語化能力」を武器に、ユーザーの認知負荷を下げて迷わせない設計を徹底。システムを理解しエンジニアと共通言語で対話可能。" }
];

const toolsData: ToolCategory[] = [
  {
    category: "DEVELOPMENT & CODING",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "PHP", "Python", "GAS", "DreamWeaver"]
  },
  {
    category: "DESIGN & CREATIVE",
    items: ["Photoshop", "Illustrator", "Figma", "XD", "ClipStudioPaint"]
  },
  {
    category: "CERTIFICATIONS & AI / OTHERS",
    items: ["ChatGPT / Gemini", "ITパスポート", "高等学校教諭一種免許状(国語)", "普通自動車免許"]
  }
];

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

function About() {
  return (
    <PageTransition>
      <div className="page about-page">
        <motion.h2 
          className="page-title"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          ABOUT
        </motion.h2>

        <motion.div 
          className="about-content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <div className="about-text">
            <h3 className="name">Haruka Tobishima</h3>
            <p className="bio">
              1992.10.19生まれ。弘前大学人文学部、同大学院人文社会科学研究科を卒業。
              8年間の県立高校教諭を経て、Web・システム開発の世界へ転身。
              現在は印刷会社DX事業部にて、言葉の背景にある意図を読み解く力と、テクノロジーによる「仕組みのデザイン」を融合させた開発・制作に従事しています。
            </p>
          </div>

          {/* --- セクション1：核心的な強み（コア・ストレングス） --- */}
          <div className="strengths-section">
            <h3 className="section-subtitle">CORE STRENGTHS</h3>
            <div className="strengths-grid">
              {strengthsData.map((strength, idx) => (
                <div key={idx} className="strength-box">
                  <strong className="strength-name">{strength.name}</strong>
                  <span className="strength-detail">{strength.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* --- セクション2：使用ツール・スキル一覧（テクニカル・ツールズ） --- */}
          <div className="tools-section">
            <h3 className="section-subtitle">TECHNICAL TOOLS & SKILLS</h3>
            {toolsData.map((cat, idx) => (
              <div key={idx} className="tools-category">
                <h4>{cat.category}</h4>
                <div className="tools-grid">
                  {cat.items.map((item, iIdx) => (
                    <div key={iIdx} className="tool-box">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </PageTransition>
  );
}

export default About;