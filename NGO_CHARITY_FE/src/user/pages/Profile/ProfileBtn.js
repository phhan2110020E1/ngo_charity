import InputToolTip from '~/admin/components/TippyTooltip/InputToolTip';

function ProfileBtn({ setActiveBtnProfile }) {
    return (
        <div className="mt-3 user__pages__profile--wrapper-content-btn">
            <InputToolTip
                openModal={() => setActiveBtnProfile(1)}
                content="Infor User"
                placement="left"
                classBtn="btn-info"
                icon="fa-solid fa-circle-info"
            />

            <InputToolTip
                openModal={() => setActiveBtnProfile(2)}
                content="Edit"
                placement="bottom"
                classBtn="btn-warning"
                icon="fa-solid fa-pen-to-square"
            />

            <InputToolTip
                openModal={() => setActiveBtnProfile(3)}
                content="Is donated"
                placement="bottom"
                classBtn="btn-success"
                icon="fa-solid fa-circle-dollar-to-slot"
            />

            <InputToolTip
                openModal={() => setActiveBtnProfile(4)}
                content="Change Password"
                placement="right"
                classBtn="btn-danger"
                icon="fa-solid fa-gear"
            />
        </div>
    );
}

export default ProfileBtn;
