import React,{ Component } from 'react';
import{Carousel, CarouselItem, CarouselCaption,CarouselControl,CarouselIndicators} from 'reactstrap';
import img1 from './Slide1.JPG';
import img2 from './Slide2.JPG';
import img3 from './Slide3.JPG';
import img4 from './Slide4.jpg';

const items = [
    {
      src: img1,
      altText: '',
      caption: ''
    },
    {
      src: img2,
      altText: '',
      caption: ''
    },
    {
      src: img3,
      altText: '',
      caption: ''
    },
    {
        src: img4,
        altText:'',
        caption:''
    }
  ];
  
  class HomeCarousel extends Component {
    constructor(props) {
      super(props);
      this.state = { activeIndex: 0 };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
    }
  
    onExiting() {
      this.animating = true;
    }
  
    onExited() {
      this.animating = false;
    }
  
    next() {
        //alert(items[1].src);
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
    }
  
    previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
    }
  
    goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
    }
  
    render() {
      const { activeIndex } = this.state;
  
      const slides = items.map((item) => {
        return (
          <CarouselItem
            className="carouselImg"
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
          >
            <img className="d-block w-100" src={item.src} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
          </CarouselItem>
        );
      });
  
      return (
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      );
    }
  }
  
  export default HomeCarousel;