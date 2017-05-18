const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});

const createApp = require('/path/to/built-server-bundle.js');

server.get('*', (req, res) => {
    const context = {url: req.url};

    createApp(context).then(app => {
        renderer.renderToString(app, (err, html) => {
            if (err) {
                if (err.code === 404) {
                    res.status(404).send('Page not found.');
                } else {
                    res.status(500).send('Internal Server Error');
                }
            } else {
                res.send(html);
            }
        })
    })
})
