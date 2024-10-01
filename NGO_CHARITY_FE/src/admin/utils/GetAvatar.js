const getAvatar = (image) => {
    if (image !== null) {
        return image;
    } else {
        const defaultImage = '/assets/images/defaultAvatar.jpg';
        return defaultImage;
    }
};

export default getAvatar;
