import { useState } from 'react';

import DetailDonate from './DetailDonate';

function UserDonate({ listReceiptData, listProgram, listUserReceipt }) {
    const [selectedType, setSelectedType] = useState('all');

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const filteredList = listReceiptData.filter((item) => {
        if (selectedType === 'all') {
            return true; // Hiển thị tất cả các bản ghi
        } else {
            return item.type === parseInt(selectedType); // Lọc theo trạng thái được chọn
        }
    });

    return (
        <div>
            <select value={selectedType} onChange={handleTypeChange}>
                <option value="all">All </option>
                <option value="1">List price in</option>
                <option value="2">List price out</option>
            </select>

            <div className="col-md-12 border-top mt-3">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User_Id</th>
                                <th>Program_Id</th>
                                <th>Money</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredList &&
                                filteredList.map((receipt, index) => {
                                    const userName = listUserReceipt.find((user) => user.id === receipt.userId)?.name;
                                    const programTitle = listProgram.find((program) => program.id === receipt.programId)?.title;
                                    return (
                                        <tr key={index}>
                                            <th>{receipt.id}</th>
                                            <td>{userName}</td>
                                            <td>{programTitle}</td>
                                            <td>{receipt.money.toLocaleString()} $</td>
                                            <td>
                                                <DetailDonate receipt={receipt} userName={userName} programTitle={programTitle} />
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserDonate;
