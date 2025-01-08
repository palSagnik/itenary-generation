import React from 'react'
import sliderImg1 from '../../assets/images/slider/1.png'
import sliderImg2 from '../../assets/images/slider/2.png'
import sliderImg3 from '../../assets/images/slider/3.png'
import { Carousel } from 'react-bootstrap'
import "./banner.css"

const Banner = () => {
  return (
    <>
      <section className='slider'>
        <Carousel variant='dark'>
          <Carousel.Item>
            <img src={sliderImg1} className='d-block w-100' alt="First slide" />
            <Carousel.Caption>
              <div className='slider-des'>
                <h5 className='heading'>WELCOME TO <span>ITINERARY GENERATOR</span></h5>
                <p className='sub_text'>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={sliderImg2} className='d-block w-100' alt="Second slide" />
            <Carousel.Caption>
              <div className='slider-des'>
                <h5 className='heading'>WELCOME TO <span>ITINERARY GENERATOR</span></h5>
                <p className='sub_text'>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={sliderImg3} className='d-block w-100' alt="Third slide" />
            <Carousel.Caption>
              <div className='slider-des'>
                <h5 className='heading'>WELCOME TO <span>ITINERARY GENERATOR</span></h5>
                <p className='sub_text'>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    </>
  )
}

export default Banner