import { Fragment } from 'react';

function OutPartner(props) {
    return (
        <Fragment>
            <div className="page-nav no-margin row">
                <div className="container">
                    <div className="row">
                        <h2>Our Partners</h2>
                        <ul>
                            <li>
                                {' '}
                                <a href="/">
                                    <i className="fas fa-home"></i> Home
                                </a>
                            </li>
                            <li>
                                <i className="fas fa-angle-double-right"></i> Gallery
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="portfolio" className="gallery">
                <div className="container">
                    <div className="row">
                        <div className="gallery-filter d-none d-sm-block">
                            <button className="btn btn-default filter-button" data-filter="all">
                                All
                            </button>
                            <button className="btn btn-default filter-button" data-filter="hdpe">
                                Finance
                            </button>
                            <button className="btn btn-default filter-button" data-filter="sprinkle">
                                Digital Marketing
                            </button>
                            <button className="btn btn-default filter-button" data-filter="spray">
                                {' '}
                                Money
                            </button>
                            <button className="btn btn-default filter-button" data-filter="irrigation">
                                Business Alaysis
                            </button>
                        </div>
                        <br />

                        <div className="gallery_product col-lg-3 col-md-3 col-sm-4 col-xs-6 filter hdpe">
                            <img alt="" src="assets/images/events/image_01.jpg" className="img-responsive" />
                        </div>

                        <div className="gallery_product col-lg-3 col-md-3 col-sm-4 col-xs-6 filter sprinkle">
                            <img alt="" src="assets/images/events/image_02.jpg" className="img-responsive" />
                        </div>

                        <div className="gallery_product col-lg-3 col-md-3 col-sm-4 col-xs-6 filter hdpe">
                            <img alt="" src="assets/images/events/image_01.jpg" className="img-responsive" />
                        </div>

                        <div className="gallery_product col-lg-3 col-md-3 col-sm-4 col-xs-6 filter irrigation">
                            <img alt="" src="assets/images/events/image_03.jpg" className="img-responsive" />
                        </div>

                        <div className="gallery_product col-lg-3 col-md-3 col-sm-4 col-xs-6 filter spray">
                            <img alt="" src="assets/images/events/image_04.jpg" className="img-responsive" />
                        </div>

                        <div className="gallery_product col-lg-3 col-md-3 col-sm-4 col-xs-6 filter spray">
                            <img alt="" src="assets/images/events/image_05.jpg" className="img-responsive" />
                        </div>

                        <div className="gallery_product col-lg-3 col-md-3 col-sm-4 col-xs-6 filter irrigation">
                            <img alt="" src="assets/images/events/image_06.jpg" className="img-responsive" />
                        </div>

                        <div className="gallery_product col-lg-3 col-md-4 col-sm-3 col-xs-6 filter irrigation">
                            <img alt="" src="assets/images/events/image_07.jpg" className="img-responsive" />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default OutPartner;
