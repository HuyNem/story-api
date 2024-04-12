const storyRouter = require('./StoryRouter');
const userRouter = require('./UserRouter');
const categoryRouter = require('./CategoryRouter');
const chapterRouter = require('./ChapterRouter');
const commentRouter = require('./CommentRouter');

const routes = (app) => {
    app.use('/api/category', categoryRouter);
    app.use('/api/story', storyRouter);
    app.use('/api/chapter', chapterRouter);
    app.use('/api/comment', commentRouter);
    app.use('/api', userRouter)
}

module.exports = routes;
