"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const _connection_1 = require("@connection");
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const dotenv_1 = require("dotenv");
const _routes_1 = require("@routes");
const _utils_1 = require("@utils");
(0, dotenv_1.config)({ path: './.env' });
let env = process.env.NODE_ENV;
const PORT = env == 'development' ? process.env.PORT : process.env.TEST_PORT;
const DATABASE = env == 'development' ? process.env.TEST_DATABASE : process.env.DATABASE;
(0, _connection_1.mongooseConnection)(DATABASE);
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
_utils_1.redisclient.on('connect', () => {
    console.log('connected with redis-server successfully');
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/user', _routes_1.user_routes);
server.listen(PORT, () => {
    console.log(`Server is up and running in ${env} on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map