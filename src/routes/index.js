const storyRouter = require('./StoryRouter');
const userRouter = require('./UserRouter');
const categoryRouter = require('./CategoryRouter');

const routes = (app) => {
    app.use('/admin/category', categoryRouter);
    app.use('/admin/story', storyRouter);
    app.use('/api', userRouter)
}

module.exports = routes;
