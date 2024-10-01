/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastError, getListCategory, getListProgram } from '~/admin';
import { PathUser } from '~/routers/PathUser';

function Donate(props) {
    const [listProgram, setListProgram] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [filter, setFilter] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate();

    const handleDonate = (program) => {
        navigate(`../${PathUser.userDonationMoney}`, { state: { program_id: program } });
    };

    const handleFilter = (id) => {
        setFilter(id);
        console.log(id);
    };

    const fetchApiProgram = () => {
        try {
            getListProgram()
                .then((result) => {
                    if (result.status === 200) {
                        setTimeout(() => {
                            setListProgram(result.data);
                        }, 1500);
                    }
                })
                .catch((error) => {
                    if (error.message === 'Network Error') {
                        navigate(`../${PathUser.userNotFound}`);
                    } else {
                        const errorValid = error.response.data;
                        if (errorValid.status === 404) {
                            ToastError(errorValid.message);
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchApiCategory = () => {
        try {
            getListCategory()
                .then((result) => {
                    if (result.status === 200) {
                        setListCategory(result.data);
                    }
                })
                .catch((error) => {
                    if (error.message === 'Network Error') {
                        navigate(`${PathUser.userNotFound}`);
                    } else {
                        const errorValid = error.response.data;
                        if (errorValid.status === 404) {
                            ToastError(errorValid.message);
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApiProgram();
        fetchApiCategory();

        const filterData = listProgram.filter((item) => item.categoryId === filter && item.status === 'COMING');
        setFilteredData(filterData);
    }, [filter]);

    return (
        <Fragment>
            <div className="page-nav no-margin row">
                <div className="container">
                    <div className="row">
                        <h2>Popular Causes</h2>
                        <ul>
                            <li>
                                {' '}
                                <a href="/">
                                    <i className="fas fa-home"></i> Home
                                </a>
                            </li>
                            <li>
                                <i className="fas fa-angle-double-right"></i> Donate
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="gallery-filter d-none d-sm-block mt-3">
                <button className="btn btn-default filter-button" onClick={() => setFilter('')}>
                    All
                </button>
                {listCategory.map((category, index) => (
                    <button key={index} className="btn btn-default filter-button" onClick={() => handleFilter(category.id)}>
                        {category.title}
                    </button>
                ))}
            </div>

            <br />

            <section className="events">
                <div className="container">
                    <div className="event-ro row">
                        {filter && filteredData.length > 0
                            ? filteredData.map((program, index) => (
                                  <div key={index} className="col-md-4 col-sm-6">
                                      <div className="event-box">
                                          <img src={program.image} style={{ width: 316, height: 211 }} alt="" />
                                          <h4>{program.title}</h4>

                                          <p className="raises">
                                              {/* <span>Raised : $34,425</span> / $500,000{' '} */}
                                              <span>Budget: ${program.budget.toLocaleString()}</span>
                                          </p>
                                          <p className="desic">{program.description}</p>
                                          <button onClick={() => handleDonate(program)} className="btn btn-success btn-sm">
                                              Donate Now
                                          </button>
                                      </div>
                                  </div>
                              ))
                            : listProgram.map((program, index) => (
                                  <div key={index} className="col-md-4 col-sm-6">
                                      <div className="event-box">
                                          <img src={program.image} style={{ width: 316, height: 211 }} alt="" />
                                          <h4>{program.title}</h4>

                                          <p className="raises">
                                              <span>Budget: ${program.budget.toLocaleString()}</span>
                                          </p>
                                          <p className="desic">{program.description}</p>
                                          <div>
                                              <span
                                                  className={`desic label ${
                                                      program.status === 'UP_COMING'
                                                          ? 'label-success'
                                                          : program.status === 'COMING'
                                                          ? 'label-warning'
                                                          : program.status === 'CLOSE'
                                                          ? 'label-danger'
                                                          : ''
                                                  }`}
                                              >
                                                  {program.status}
                                              </span>
                                          </div>
                                          {program.status === 'COMING' && (
                                              <button onClick={() => handleDonate(program)} className="mt-3 btn btn-success btn-sm">
                                                  Donate Now
                                              </button>
                                          )}
                                      </div>
                                  </div>
                              ))}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Donate;
