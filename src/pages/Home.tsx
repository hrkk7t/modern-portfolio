import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

function Home() {
  return (
    <PageTransition>
      <div className="page home-page">
        
        <div className="marquee-container">
          <motion.div 
            className="marquee-track"
            animate={{ x: [0, "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            <span>CREATIVE DEVELOPER / UI DESIGNER / HARUKA TOBISHIMA / </span>
            <span>CREATIVE DEVELOPER / UI DESIGNER / HARUKA TOBISHIMA / </span>
          </motion.div>
        </div>

        <div className="hero">
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <img src="/images/hero-name.svg" alt="TOBISHIMA HARUKA" className="hero-name-img" />
          </motion.div>
          
          <div className="title-mask">
            <motion.p 
              className="hero-subtitle"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            >
              Creative Developer / UI Designer
            </motion.p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Home;