/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { GetReceiptUserProgram, ToastError } from '~/admin/utils';
import { PathUser } from '~/routers/PathUser';
import AuthenticateAdmin from '~/admin/utils/AuthenticateAdmin';
import './Profile.css';
import DetailDonateUser from './DetailDonateUser';

function ProfileBtnDonate({ getInfoUser }) {
    const [activeTab, setActiveTab] = useState(0);
    const [listReceiptUserProgram, setListReceiptUserProgram] = useState([]);
    const { inforUser } = AuthenticateAdmin;
    const navigate = useNavigate();

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const tabColors = ['green', '#ff8500', 'red'];
    const tabStatus = ['UP_COMING', 'COMING', 'CLOSE'];

    const groupedRecords = tabStatus.map((status) => {
        return listReceiptUserProgram.filter((record) => record.status === status && record.userId === inforUser.id);
    });

    const fetchApiGetReceiptUserProgram = () => {
        try {
            GetReceiptUserProgram()
                .then((result) => {
                    if (result.status === 200) {
                        setListReceiptUserProgram(result.data);
                    }
                })
                .catch((error) => {
                    if (error.message === 'Network Error') {
                        navigate(PathUser.userNotFound);
                    } else {
                        const errorValid = error.response.data;
                        if (errorValid.status === 400) {
                            ToastError(errorValid.message);
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApiGetReceiptUserProgram();
    }, []);

    return (
        <Fragment>
            <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>
                <TabList>
                    {tabStatus.map((item, index) => (
                        <Tab key={index} style={{ backgroundColor: activeTab === index ? tabColors[index] : '' }}>
                            {item}
                        </Tab>
                    ))}
                </TabList>

                {groupedRecords.map((group, index) => (
                    <TabPanel key={index}>
                        {group.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Money</th>
                                            <th>createdAt</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {group.map((item, index) => (
                                            <tr key={index}>
                                                <th>{item.programName}</th>
                                                <td>{item.money.toLocaleString()} $</td>
                                                <td>{item.createdAt}</td>

                                                <td>
                                                    <DetailDonateUser item={item} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div>Hiện tại chưa có program nào</div>
                        )}
                    </TabPanel>
                ))}
            </Tabs>
        </Fragment>
    );
}

export default ProfileBtnDonate;
