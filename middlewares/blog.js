const blogFields = (req, res, next) => {
    const { title, content, date } = req.body;

    if (!title || !content) {
        return res.status(400).send({ message: 'Title and content are required' });
    }

    // if (!req.user || !req.user._id) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    next();
};

module.exports = {
    blogFields
}