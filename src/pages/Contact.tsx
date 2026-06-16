import PageTransition from '../components/PageTransition';
import { motion, Variants } from 'framer-motion';
import Magnetic from '../components/Magnetic';

/* --- Variants --- */
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

/* --- Component --- */
function Contact() {
  return (
    <PageTransition>
      <div className="page contact-page">
        <motion.h2 
          className="page-title"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          CONTACT
        </motion.h2>
        <div className="contact-content">
          <motion.p 
            className="contact-lead"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            Please feel free to contact me.
          </motion.p>
          <motion.form 
            className="modern-form" 
            action="https://formspree.io/f/xwvjolvd" 
            method="POST"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <div className="input-group">
              <input type="text" name="name" required placeholder="Name" />
            </div>
            <div className="input-group">
              <input type="email" name="email" required placeholder="Email" />
            </div>
            <div className="input-group">
              <textarea name="message" rows={4} required placeholder="Message"></textarea>
            </div>
            <Magnetic>
              <button type="submit" className="submit-btn">SEND MESSAGE</button>
            </Magnetic>
          </motion.form>
        </div>
      </div>
    </PageTransition>
  );
}

export default Contact;