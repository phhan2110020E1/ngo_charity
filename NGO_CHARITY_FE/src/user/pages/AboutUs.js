import React, { Fragment } from 'react';

function AboutUs(props) {
    return (
        <Fragment> 
            <div className="page-nav no-margin row">
                <div className="container">
                    <div className="row">
                        <h2>About Our Charity</h2>
                        <ul>
                            <li> <a href="/"><i className="fas fa-home"></i> Home</a></li>
                            <li><i className="fas fa-angle-double-right"></i> About Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            
            {/* <!--  ************************* About Us Starts Here ************************** -->     */}
            
            <div className="about-us container-fluid">
                <div className="container">

                    <div className="row natur-row no-margin w-100">
                        <div className="text-part col-md-6">
                            <h2>About Our Charity</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius faucibus
                                ligula non congue. Suspendisse at pretium massa, sit amet
                                vulputate nibh. Nam posuere eros dolor. Donec vel arcu sagittis, pretium nisl </p>
                            <p> Cras faucibus laoreet nibh, sit amet tincidunt leo mollis in. Etiam eu mauris metus.
                                Nulla facilisi. Etiam vestibulum,
                                nisi et convallis elementum, leo orci aliquam metus, id posuere massa neque vitae
                                arcu.</p>

                            <p>Integer vulputate vehicula dolor a eleifend. Duis aliquam condimentum sapien,
                                eget tempor justo. Aenean porttitor nibh metus, sollicitudin egestas metus posuere et
                                . Fusce egestas volutpat metus, in sodales sem bibendum porta. Nunc hendrerit nunc sit
                                amet tellus posuere, at malesuada sem gravida. Integer maximus ultricies augue, at
                                dapibus elit bibendum consequat. Cras faucibus tellus eleifend, fermentum purus in,
                                dapibus sapien. Praesent nec ornare risus. Etiam iaculis, ligula vel gravida
                                vestibulum, urna justo posuere ante,
                                id pretium massa arcu sed mi. Nunc a sollicitudin sem. Duis tempus </p>
                        </div>
                        <div className="image-part col-md-6">
                            <div className="about-quick-box row">
                                <div className="col-md-6">
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
                                </div>
                                <div className="col-md-6">
                                    <div className="about-qcard ">
                                    <i className="fas fa-donate yell"></i>
                                        <p>Giv Donation</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="about-qcard ">
                                    <i className="fas fa-hands-helping blu"></i>
                                        <p>Help Someone</p>
                                    </div>
                                </div>
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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer neque libero, pulvinar et elementum quis, facilisis eu ante. Mauris non placerat sapien. Pellentesque tempor arcu non odio scelerisque ullamcorper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius eros consequat auctor gravida. Fusce tristique lacus at urna sollicitudin pulvinar. Suspendisse hendrerit ultrices mauris.</p>
                        </div>
                        <div className="col-md-6 mv-img">
                            <img src="assets/images/misin.jpg" alt=""/>
                        </div>
                    </div>
                    <div className="row vision">
                        <div className="col-md-6 mv-img">
                            <img src="assets/images/vision.jpg" alt=""/>
                        </div>
                        <div className="col-md-6 mv-det">
                            <h1>Our Vision</h1>
                            <p>Ut ultricies lacus a rutrum mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed porta dolor quis felis pulvinar dignissim. Etiam nisl ligula, ullamcorper non metus vitae, maximus efficitur mi. Vivamus ut ex ullamcorper, scelerisque lacus nec, commodo dui. Proin massa urna, volutpat vel augue eget, iaculis tristique dui.</p>
                        </div>
                    </div>
                </div>
            </section>   
   
        </Fragment>
    );
}

export default AboutUs;