"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const _connection_1 = require("@connection");
const _routes_1 = require("@routes");
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: './.env' });
const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE || 'mongodb://localhost:27017/ecommerce';
(0, _connection_1.mongooseConnection)(DATABASE);
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/user', _routes_1.user_routes);
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map