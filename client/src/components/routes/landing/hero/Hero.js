import React, { useState, useEffect } from 'react';
import styles from './hero.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from 'react-bootstrap/esm/Navbar';
import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { getRandomPost } from '../../../../redux/postSlice';
import SimplePostCard from '../../../postCard/SimplePostCard';
// images
import hero1 from '../../../../img/hero/hero1.jpg';
import hero2 from '../../../../img/hero/hero2.jpg';
import hero3 from '../../../../img/hero/hero3.jpg';
import hero4 from '../../../../img/hero/hero4.jpg';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/esm/Dropdown';

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

const landingContentVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      duration: 1,
    },
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

  // effect to fetch a random post
  const [randomPost, setRandomPost] = useState();
  useEffect(() => {
    const getData = async () => {
      const randomPost = await getRandomPost();
      setRandomPost(randomPost);
    };
    getData();
  }, []);

  console.log(randomPost);

  return (
    <header className={styles.hero}>
      <AnimatePresence exitBeforeEnter initial={false}>
        {heroImgs[currentIndex]}
      </AnimatePresence>
      <section className={styles.overlay}>
        <Navbar>
          <Container fluid>
            <Navbar.Brand style={{ color: '#fff' }}>Roommates</Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/login'>
                <Button variant='outline-primary'>Log In</Button>
              </Nav.Link>
            </Nav>
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
            <h4>New Rooms, Shares, and Group Living Options Daily</h4>
            <Button size='lg' as={Link} to='/signup'>
              Sign Up
            </Button>
          </div>
          <div>{randomPost && <SimplePostCard post={randomPost} />}</div>
        </motion.div>
        <div className={styles.footer}>
          <DropdownButton drop='up' variant='outline-primary' title='Roommates'>
            <Dropdown.Item>About</Dropdown.Item>
            <Dropdown.Item>News</Dropdown.Item>
            <Dropdown.Item>Press Releases</Dropdown.Item>
            <Dropdown.Item>Careers</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            drop='up'
            variant='outline-primary'
            title='Communities'
          >
            <Dropdown.Item>Supported Communities</Dropdown.Item>
            <Dropdown.Item>Rules & Guidelines</Dropdown.Item>
            <Dropdown.Item>Want Roommates Near You?</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            drop='up'
            variant='outline-primary'
            title='NonProfits'
          >
            <Dropdown.Item>Our Support</Dropdown.Item>
            <Dropdown.Item>Our Initiatives</Dropdown.Item>
          </DropdownButton>
        </div>
      </section>
    </header>
  );
};

export default Hero;
