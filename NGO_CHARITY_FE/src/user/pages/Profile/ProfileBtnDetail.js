function ProfileBtnDetail({ getInfoUser }) {
    return (
        <div className="container rounded bg-white">
            <div className="row">
                <div className="col-md-12">
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile User</h4>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-4">
                                <label className="profile__pages_detail--labels mt-2">Address:</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    className="form-control profile__pages_detail--form-control"
                                    value={getInfoUser.address ? getInfoUser.address : 'Chưa có'}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-4">
                                <label className="profile__pages_detail--labels mt-2">Phone:</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    className="form-control profile__pages_detail--form-control"
                                    value={getInfoUser.phone ? getInfoUser.phone : 'Chưa có'}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-4">
                                <label className="profile__pages_detail--labels mt-2">Region:</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    className="form-control profile__pages_detail--form-control"
                                    value={getInfoUser.region ? getInfoUser.region : 'Chưa có'}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileBtnDetail;
