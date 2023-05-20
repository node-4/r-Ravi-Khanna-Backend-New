const res = require('express/lib/response');
const Blog = require('../models/blog.model');

// Create a new blog post
const createBlog = async (req, res) => {
    const { image, title, content, tags } = req.body;
    const userId = req.user._id;
    const authorName = req.user.name;
    const date = Date.now();

    try {
        const newBlog = await Blog.create({
            userId,
            authorName,
            image,
            title,
            content,
            tags,
            date
        });
        res.status(201).send({ message: "blog added successfully", data: newBlog });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        if (blogs.length === 0) {
            return res.status(404).send({ message: 'No blogs found' });
        }
        res.status(200).send({ data: blogs });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
};

// Get a single blog post by ID
const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }
        blog.views += 1;
        await blog.save();
        res.status(200).send({ data: blog });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
};

// Update a blog post by ID
const updateBlogById = async (req, res) => {

    const { title, content, image, tagsToAdd, tagsToRemove } = req.body;

    try {
        var result = await Blog.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    title: title,
                    content: content,
                    image: image,
                    // date: "2022-01-01"
                },
                $addToSet: {
                    tags: tagsToAdd

                },

            },

            { new: true }
        );
        if (req.body.tagsToRemove) {
            var result = await Blog.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        title: title,
                        content: content,
                        image: image,
                        // date: "2022-01-01"
                    },

                    $pull: {
                        tags: { $in: tagsToRemove }
                    }
                },

                { new: true }
            );
        }

        return res.status(200).send({ message: "updated", data: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
};


// Delete a blog post by ID
const deleteBlogById = async (req, res) => {

    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }


        res.status(200).send({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
};
const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, {
            $inc: {
                likes: 1
            }
        }, { new: true });
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }
        res.status(200).send({ message: ' liked ' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Server error' });
    }
};
exports.comment = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, {
            $inc: {
                comments: 1
            }
        }, { new: true });
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }
        res.status(200).send({
            message: 'commented ', data: result
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Server error' });

    }
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById, likeBlog };
