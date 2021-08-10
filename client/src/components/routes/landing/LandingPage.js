import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './landingPage.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import CountUp from 'react-countup';
import Navbar from 'react-bootstrap/esm/Navbar';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
// images
import logo from '../../../img/RoommatesLogoWhite.svg';
import hero1 from '../../../img/hero/hero1.jpg';
import hero2 from '../../../img/hero/hero2.jpg';
import hero3 from '../../../img/hero/hero3.jpg';
import hero4 from '../../../img/hero/hero4.jpg';

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

const LANDING_TRANSITION_DELAY = 1;
const LANDING_TRANSITION_DURATION = 1.5;
const landingContentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: LANDING_TRANSITION_DELAY,
      duration: LANDING_TRANSITION_DURATION,
      type: 'ease',
    },
  },
};

const LandingPage = () => {
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

  // effect to cycle through background Images
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
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
        <Navbar>
          <Container fluid>
            <Navbar.Brand style={{ color: '#fff' }}>
              <img src={logo} className={styles.logo} />
            </Navbar.Brand>
          </Container>
        </Navbar>
        <motion.div
          className={styles.landingContent}
          variants={landingContentVariants}
          initial='hidden'
          animate='visible'
        >
          <div>
            <h1>Your New Home Awaits</h1>
            <h4>
              {'Over '}
              <CountUp
                end={10000}
                delay={LANDING_TRANSITION_DELAY}
                duration={3}
                useEasing={true}
                separator=','
              />
              {' Rooms Filled'}
            </h4>
            <div className='buttonBox'>
              <Button
                style={{ marginRight: '10px' }}
                size='lg'
                as={Link}
                to='/signup'
              >
                Sign Up
              </Button>
              <Button size='lg' variant='light' as={Link} to='/login'>
                Log In
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </header>
  );
};

export default LandingPage;
