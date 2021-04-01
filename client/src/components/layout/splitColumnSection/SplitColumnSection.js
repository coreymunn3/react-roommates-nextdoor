import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FeatureItem from '../featureItem/FeatureItem';

const SplitColumnSection = ({ items }) => {
  const col1 = [],
    col2 = [];
  items.forEach((item, idx) => {
    if (idx % 2 === 0) {
      col1.push(item);
    } else {
      col2.push(item);
    }
  });

  return (
    <Row className='py-2'>
      <Col sm={6}>
        {col1.map((item) => (
          <FeatureItem
            key={item.title}
            featureIcon={item.icon}
            featureContent={item.title}
          />
        ))}
      </Col>
      <Col sm={6}>
        {col2.map((item) => (
          <FeatureItem
            key={item.title}
            featureIcon={item.icon}
            featureContent={item.title}
          />
        ))}
      </Col>
    </Row>
  );
};

export default SplitColumnSection;
