import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';
// import ExampleCarouselImage from './ExampleCarouselImage';
import '../assets/styles/Carousel.scss';
import '../assets/styles/custom.scss';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="custom-carousel">
      <Carousel.Item>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Carousel.Caption className='hero-text'>
          <h1 className='title'>Welcome to <span>FitTrack</span></h1>
          <h3 className='sub-title'>Your Fitness Companion</h3>
          <p className='description'>Track your fitness journey and achieve your goals.</p>
          <div className="mb-2">
            <Button variant="primary" className='hero-button' size="lg">
              Log In
            </Button>{' '}
            <Button variant='secondary' className='hero-button' size="lg">
              Join Us
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Carousel.Caption className='hero-text'>
          <h1 className='title'>Tracking Fitness</h1>
          <h3 className='sub-title'>Track Your Progress</h3>
          <p className='description'>Log workouts and crush goals as you stay fit and motivated when you monitor your progress.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Carousel.Caption className='hero-text'>
          <h1 className='title'>Setting Goals</h1>
          <h3 className='sub-title'>Visualize Your Success</h3>
          <p className='description'>See how far you’ve come and celebrate every milestone.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;