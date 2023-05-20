
const { authJwt, objectId, validateBlog } = require('../middlewares');
const {
    createBlog,
    getBlogById,
    getAllBlogs,
    updateBlogById,
    deleteBlogById,
    likeBlog
} = require('../controllers/blog.controller');


module.exports = (app) => {
    app.post('/api/v1/admin/blogs', [authJwt.isAdmin, validateBlog.blogFields], createBlog);

    // Get all blog posts
    app.get('/api/v1/blogs', getAllBlogs);

    // Get a single blog post by ID
    app.get('/api/v1/admin/blogs/:id', getBlogById);
    // Update a blog post by ID and like a blog
    app.put('/api/v1/admin/bloglikes/:id', [authJwt.isAdmin, objectId.validId], likeBlog);
    // Update a blog post by ID (only accessible to authenticated users who own the blog post)
    app.put('/api/v1/admin/blogs/:id', [authJwt.isAdmin, objectId.validId], updateBlogById);

    // Delete a blog post by ID (only accessible to authenticated users who own the blog post)
    app.delete('/api/v1/admin/blogs/:id', [authJwt.isAdmin, objectId.validId], deleteBlogById);

    //users Apis

    app.post('/api/v1/blogs', [authJwt.verifyToken, validateBlog.blogFields], createBlog);

    // Get all blog posts
    app.get('/api/v1/blogs', getAllBlogs);
    app.put('/api/v1/bloglikes/:id', [authJwt.verifyToken, objectId.validId], likeBlog);

    // Get a single blog post by ID
    app.get('/api/v1/blogs/:id', [objectId.validId], getBlogById);

    // Update a blog post by ID (only accessible to authenticated users who own the blog post)
    app.put('/api/v1/blogs/:id', [authJwt.verifyToken, objectId.validId], updateBlogById);

    // Delete a blog post by ID (only accessible to authenticated users who own the blog post)
    app.delete('/api/v1/blogs/:id', [authJwt.verifyToken, objectId.validId], deleteBlogById);
};
