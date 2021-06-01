import React, { useState, useEffect } from 'react';
import styles from './hero.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
// images
import hero1 from '../../../../img/hero/hero1.jpg';
import hero2 from '../../../../img/hero/hero2.jpg';
import hero3 from '../../../../img/hero/hero3.jpg';
import hero4 from '../../../../img/hero/hero4.jpg';

const imgVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 0.6,
  },
  exit: {
    opacity: 0,
  },
};

const Hero = () => {
  const images = [hero1, hero2, hero3, hero4];
  const heroImgs = images.map((image, idx) => (
    <motion.img
      key={idx}
      variants={imgVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      transition={{
        opacity: { duration: 0.5 },
      }}
      src={image}
      className={styles.heroImg}
    />
  ));

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(currentIndex);
      if (currentIndex === images.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prevState) => (prevState += 1));
      }
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex]);
  return (
    <header className={styles.hero}>
      <AnimatePresence exitBeforeEnter initial={false}>
        {heroImgs[currentIndex]}
      </AnimatePresence>
      <section className={styles.overlay}>
        <h1>Your New Home Awaits</h1>
      </section>
    </header>
  );
};

export default Hero;
