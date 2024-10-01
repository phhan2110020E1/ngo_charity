/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from 'react';

import { SliderImage } from '../components';
import { GetToTalPriceInNull } from '~/admin';
import TotalDonate from './DonationMoney/TotalDonate';

function HomePage(props) {
    const [totalPriceInNull, setTotalPriceInNull] = useState();

    const fetchApiUserReceipt = () => {
        // setIsLoading(true);
        try {
            GetToTalPriceInNull()
                .then((result) => {
                    if (result.status === 200) {
                        setTotalPriceInNull(result.data);
                        // setTimeout(() => {
                        //     // setIsLoading(false);
                        // }, 1500);
                    }
                })
                .catch((error) => {
                    console.clear();
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApiUserReceipt();
    }, []);

    return (
        <Fragment>
            <SliderImage />

            {/* <!--  ************************* About Us Starts Here ************************** -->     */}

            <div className="about-us container-fluid">
                <div className="container">
                    <div className="row natur-row no-margin w-100">
                        <div className="text-part col-md-6">
                            <h2>About Our Charity</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius faucibus ligula non congue. Suspendisse at
                                pretium massa, sit amet vulputate nibh. Nam posuere eros dolor. Donec vel arcu sagittis, pretium nisl{' '}
                            </p>
                            <p>
                                {' '}
                                Cras faucibus laoreet nibh, sit amet tincidunt leo mollis in. Etiam eu mauris metus. Nulla facilisi. Etiam vestibulum,
                                nisi et convallis elementum, leo orci aliquam metus, id posuere massa neque vitae arcu.
                            </p>

                            <p>
                                Integer vulputate vehicula dolor a eleifend. Duis aliquam condimentum sapien, eget tempor justo. Aenean porttitor nibh
                                metus, sollicitudin egestas metus posuere et . Fusce egestas volutpat metus, in sodales sem bibendum porta. Nunc
                                hendrerit nunc sit amet tellus posuere, at malesuada sem gravida. Integer maximus ultricies augue, at dapibus elit
                                bibendum consequat. Cras faucibus tellus eleifend, fermentum purus in, dapibus sapien. Praesent nec ornare risus.
                                Etiam iaculis, ligula vel gravida vestibulum, urna justo posuere ante, id pretium massa arcu sed mi. Nunc a
                                sollicitudin sem. Duis tempus{' '}
                            </p>
                        </div>
                        <div className="image-part col-md-6">
                            <div
                                className="about-quick-box row"
                                style={{
                                    background: '#fd645b',
                                    padding: '25px 40px',
                                    borderRadius: '10px',
                                    zIndex: 0,
                                    position: 'relative',
                                }}
                            >
                                <div style={{ fontSize: 50 }}>
                                    <TotalDonate targetNumber={totalPriceInNull ? totalPriceInNull.money : 1000000} title="Total charity money" />
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="about-qcard">
                                        <i className="fas fa-user"></i>
                                        <p>Becom a Volunteer</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="about-qcard ">
                                        <i className="fas fa-search-dollar red"></i>
                                        <p>Quick Fundrais</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- ################# Mission Vision Start Here #######################---> */}

            <section className="container-fluid mission-vision">
                <div className="container">
                    <div className="row mission">
                        <div className="col-md-6 mv-det">
                            <h1>Our Mission</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer neque libero, pulvinar et elementum quis, facilisis
                                eu ante. Mauris non placerat sapien. Pellentesque tempor arcu non odio scelerisque ullamcorper. Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit. Nam varius eros consequat auctor gravida. Fusce tristique lacus at urna
                                sollicitudin pulvinar. Suspendisse hendrerit ultrices mauris.
                            </p>
                        </div>
                        <div className="col-md-6 mv-img">
                            <img src="assets/images/misin.jpg" alt="" />
                        </div>
                    </div>
                    <div className="row vision">
                        <div className="col-md-6 mv-img">
                            <img src="assets/images/vision.jpg" alt="" />
                        </div>
                        <div className="col-md-6 mv-det">
                            <h1>Our Vision</h1>
                            <p>
                                Ut ultricies lacus a rutrum mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                                mus. Sed porta dolor quis felis pulvinar dignissim. Etiam nisl ligula, ullamcorper non metus vitae, maximus efficitur
                                mi. Vivamus ut ex ullamcorper, scelerisque lacus nec, commodo dui. Proin massa urna, volutpat vel augue eget, iaculis
                                tristique dui.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- ################# Events Start Here#######################---> */}
            <section className="events">
                <div className="container">
                    <div className="session-title row">
                        <h2>Popular Causes</h2>
                        <p>We are a non-profital & Charity raising money for child education</p>
                    </div>
                    <div className="event-ro row">
                        <div className="col-md-4 col-sm-6">
                            <div className="event-box">
                                <img src="assets/images/events/image_08.jpg" alt="" />
                                <h4>Child Education in Africa</h4>

                                <p className="raises">
                                    <span>Raised : $34,425</span> / $500,000{' '}
                                </p>
                                <p className="desic">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's{' '}
                                </p>
                                <button className="btn btn-success btn-sm">Donate Now</button>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="event-box">
                                <img src="assets/images/events/image_06.jpg" alt="" />
                                <h4>Child Education in Africa</h4>
                                <p className="raises">
                                    <span>Raised : $34,425</span> / $500,000{' '}
                                </p>
                                <p className="desic">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's{' '}
                                </p>
                                <button className="btn btn-success btn-sm">Donate Now</button>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="event-box">
                                <img src="assets/images/events/image_04.jpg" alt="" />
                                <h4>Child Education in Africa</h4>
                                <p className="raises">
                                    <span>Raised : $34,425</span> / $500,000{' '}
                                </p>
                                <p className="desic">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's{' '}
                                </p>
                                <button className="btn btn-success btn-sm">Donate Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- ################# Charity Number Starts Here#######################---> */}

            <div className="doctor-message">
                <div className="inner-lay">
                    <div className="container">
                        <div className="row session-title">
                            <h2>Our Achievemtns in Numbers</h2>
                            <p>
                                We can talk for a long time about advantages of our Dental clinic before other medical treatment facilities. But you
                                can read the following facts in order to make sure of all pluses of our clinic:
                            </p>
                        </div>
                        <div className="row">
                            <div className="col-sm-3 numb">
                                <h3>12+</h3>
                                <span>YEARS OF EXPEREANCE</span>
                            </div>
                            <div className="col-sm-3 numb">
                                <h3>1812+</h3>
                                <span>HAPPY CHILDRENS</span>
                            </div>
                            <div className="col-sm-3 numb">
                                <h3>52+</h3>
                                <span>EVENTS</span>
                            </div>
                            <div className="col-sm-3 numb">
                                <h3>48+</h3>
                                <span>FUNT RAISED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!--################### Our Team Starts Here #######################---> */}
            <section className="our-team team-11">
                <div className="container">
                    <div className="session-title row">
                        <h2>Meet our Team</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla vel nisl a dictum. Donec ut est arcu. Donec
                            hendrerit velit
                        </p>
                    </div>
                    <div className="row team-row">
                        <div className="col-md-3 col-sm-6">
                            <div className="single-usr">
                                <img src="assets/images/team/team-memb1.jpg" alt="" />
                                <div className="det-o">
                                    <h4>David Kanuel</h4>
                                    <i>CEO </i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="single-usr">
                                <img src="assets/images/team/team-memb2.jpg" alt="" />
                                <div className="det-o">
                                    <h4>David Kanuel</h4>
                                    <i>CFO</i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="single-usr">
                                <img src="assets/images/team/team-memb3.jpg" alt="" />
                                <div className="det-o">
                                    <h4>David Kanuel</h4>
                                    <i>Team Leader</i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="single-usr">
                                <img src="assets/images/team/team-memb4.jpg" alt="" />
                                <div className="det-o">
                                    <h4>David Kanuel</h4>
                                    <i>Project Manager</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- ################# Our Blog Starts Here#######################---> */}

            <section className="our-blog">
                <div className="container">
                    <div className="row session-title">
                        <h2> Our Blog </h2>
                        <p>Take a look at what people say about US </p>
                    </div>
                    <div className="blog-row row">
                        <div className="col-md-4 col-sm-6">
                            <div className="single-blog">
                                <figure>
                                    <img src="assets/images/events/image_01.jpg" alt="" />
                                </figure>
                                <div className="blog-detail">
                                    <small>By Admin | August 10 2018</small>
                                    <h4>Methods of Recuirtments</h4>
                                    <p>
                                        {' '}
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo neque, aliquet sit amet elementum vel,
                                        vehicula eget eros. Vivamus arcu metus, mattis sed sagittis at, sagittis quis neque. Praesent.
                                    </p>
                                    <div className="link">
                                        <a href="">Read more </a>
                                        <i className="fas fa-long-arrow-alt-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="single-blog">
                                <figure>
                                    <img src="assets/images/events/image_02.jpg" alt="" />
                                </figure>
                                <div className="blog-detail">
                                    <small>By Admin | August 10 2018</small>
                                    <h4>Methods of Recuirtments</h4>
                                    <p>
                                        {' '}
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo neque, aliquet sit amet elementum vel,
                                        vehicula eget eros. Vivamus arcu metus, mattis sed sagittis at, sagittis quis neque. Praesent.
                                    </p>
                                    <div className="link">
                                        <a href="">Read more </a>
                                        <i className="fas fa-long-arrow-alt-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="single-blog">
                                <figure>
                                    <img src="assets/images/events/image_03.jpg" alt="" />
                                </figure>
                                <div className="blog-detail">
                                    <small>By Admin | August 10 2018</small>
                                    <h4>Methods of Recuirtments</h4>
                                    <p>
                                        {' '}
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo neque, aliquet sit amet elementum vel,
                                        vehicula eget eros. Vivamus arcu metus, mattis sed sagittis at, sagittis quis neque. Praesent.
                                    </p>
                                    <div className="link">
                                        <a href="">Read more </a>
                                        <i className="fas fa-long-arrow-alt-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default HomePage;
