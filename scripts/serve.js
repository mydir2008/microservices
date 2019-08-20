/**
 * 创建serve，模拟mock服务,参考实现:
 * https://github.com/zeit/serve/blob/master/bin/serve.js
 * https://github.com/zeit/serve-handler/blob/master/src/index.js
 */
const handler = require('serve-handler');
const http = require('http');

const registerShutdown = (fn) => {
    let run = false;

    const wrapper = () => {
        if (!run) {
            run = true;
            fn();
        }
    };

    process.on('SIGINT', wrapper);
    process.on('SIGTERM', wrapper);
    process.on('exit', wrapper);
};

registerShutdown(() => {
    process.on('SIGINT', () => {
        process.exit(0);
    });
});

const waitTimer = async () => {
    return new Promise((resolve, reject) => { setTimeout(resolve, 3000); })
}

const server = http.createServer(async (request, response) => {
    //模拟服务延期
    if (request.url.startsWith('/mocks')) {
        await waitTimer()
    }
    await handler(request, response, {
        public: './remote'
    });
})

server.on('error', (err) => {
    process.exit(1);
});

server.listen(8880, () => {
    console.log('启动Mock服务');
    registerShutdown(() => server.close());
});

