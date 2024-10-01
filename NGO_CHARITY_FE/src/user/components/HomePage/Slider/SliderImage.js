import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SliderImage(props) {
    const settingSliderShow = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToScroll: 1,
    };

    const showImageSlider = [
        {
            image: 'assets/images/slider/slider-3.jpg',
            title: 'Most Stylish Free Travel Website.',
            description: 'Journey to Brighter Futures: Showcasing the Lives of Courageous Children in Underserved Rural Communities',
        },
        {
            image: 'assets/images/slider/slider-1.jpg',
            title: "It's time for better help.",
            description: "Bringing Joy to Far-Flung Communities: Supporting Children's Dreams in Poverty-Stricken Regions",
        },
        {
            image: 'assets/images/slider/slider-2.jpg',
            title: 'Most Attractive Travel Template',
            description: 'Beyond Boundaries: Exploring the Lives of Underprivileged Children in Isolated, Rural Environments',
        },
    ];

    return (
        <Slider {...settingSliderShow}>
            {showImageSlider.map((item, index) => (
                <div className="item" key={index}>
                    <div className="slider-img">
                        <img src={item.image} alt="" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-offset-2 col-lg-8 col-md-offset-2 col-md-8 col-sm-12 col-xs-12">
                                <div className="animated bounceInDown slider-captions">
                                    <h1 className="slider-title">{item.title}</h1>
                                    <p className="slider-text hidden-xs">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
}

export default SliderImage;
