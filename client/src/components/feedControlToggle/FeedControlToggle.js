import React, { useState } from 'react';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { FaSortDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './feedControlToggle.module.scss';

const FeedControlToggle = ({ children, eventKey }) => {
  const handleOpen = useAccordionToggle(eventKey, () => {
    console.log(rotated);
    setRotated(!rotated);
    console.log(rotated);
  });
  const [rotated, setRotated] = useState(false);

  const toggleVariants = {
    open: {
      rotate: 180,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      rotate: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <motion.div variants={toggleVariants} animate={rotated ? 'open' : 'closed'}>
      <FaSortDown
        size='2em'
        className={styles.accordionToggle}
        onClick={handleOpen}
      >
        {children}
      </FaSortDown>
    </motion.div>
  );
};

export default FeedControlToggle;
