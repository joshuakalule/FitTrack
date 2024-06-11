import React, { Component } from 'react';
import HeroWorkout from '../assets/images/Hero.png';
import '../assets/styles/Carousel.scss';

export default class ExampleCarouselImage extends Component {
  render() {
    return (
      <div>
        <img
          className="d-block w-100 carousel-image"
          src={ HeroWorkout }
          alt="Hero"
        />
      </div>
    );
  }
}
