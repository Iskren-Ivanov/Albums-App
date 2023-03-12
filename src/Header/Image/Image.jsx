import React from 'react';
import { Carousel } from 'react-bootstrap';
import {
  newYorkCityImg,
  nashvilleCityImg,
  cityscapeSilhouette,
} from '../../PngImages/top/PngImages';

import './Image.css';

const Image = () => (
  <div className='img-container'>
    <Carousel>
      <Carousel.Item>
        <img width={400} height={300} alt='400x300' src={newYorkCityImg} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={400} height={300} alt='400x300' src={nashvilleCityImg} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={400} height={300} alt='400x300' src={cityscapeSilhouette} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
);

export default Image;
