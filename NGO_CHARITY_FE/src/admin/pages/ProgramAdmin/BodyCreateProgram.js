import { useEffect } from 'react';

import InputProgram from './InputProgram';

function BodyCreateProgram({ fomik, avatar, setAvatar, setShowErrorFile, showErrorFile, listCategory }) {
    const handleAvatar = (e) => {
        const file = e.target.files[0];

        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
        const fileExtension = file.type;

        if (allowedFormats.includes(fileExtension)) {
            setShowErrorFile(false);
        } else {
            setShowErrorFile(true);
        }

        file.pre = URL.createObjectURL(file);
        setAvatar(file);
        e.target.value = null;
    };

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.pre);
        };
    }, [avatar]);

    return (
        <div className="row">
            <div className="col-md-4 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3">
                    <input className="mt-2 mb-2" type="file" name="photo" onChange={handleAvatar} />
                    {avatar && !showErrorFile && <img width={100} src={avatar.pre} alt="avatar" />}
                    {showErrorFile && <div className="text-danger">Allow file jpeg, png, gif</div>}
                </div>
            </div>

            <div className="col-md-4 border-right">
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right">Create Program</h4>
                    </div>

                    <InputProgram
                        labelName="Title"
                        inputName="title"
                        onChange={fomik.handleChange}
                        value={fomik.values.title}
                        touched={fomik.touched.title}
                        error={fomik.errors.title}
                        {...fomik.getFieldProps('title')}
                    />
                    <InputProgram
                        labelName="Budget"
                        inputName="budget"
                        inputType="number"
                        min={0}
                        onChange={fomik.handleChange}
                        value={fomik.values.budget}
                        touched={fomik.touched.budget}
                        error={fomik.errors.budget}
                        {...fomik.getFieldProps('budget')}
                    />

                    <div className="row mt-2">
                        <div className="col-md-12 text-left">
                            <label className="profile__pages_detail--labels mt-2">Category</label>
                        </div>
                        <div className="col-md-12">
                            <select className="form-select" name="categoryId" onChange={fomik.handleChange} value={fomik.values.categoryId}>
                                <option defaultValue={'---'}>Open this select menu</option>
                                {listCategory.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 border-right">
                <div>
                    <div className="row mt-5">
                        <div className="col-md-12" style={{ textAlign: 'left' }}>
                            <label className="profile__pages_detail--labels mt-2">Description:</label>
                        </div>
                        <div className="col-md-12">
                            <textarea
                                type="text"
                                name="description"
                                placeholder="Enter description"
                                className="form-control profile__pages_detail--form-control"
                                onChange={fomik.handleChange}
                                value={fomik.values.description}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyCreateProgram;
