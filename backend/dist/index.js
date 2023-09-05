"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const tempService = __importStar(require("./services/temp.service"));
const timeService = __importStar(require("./services/time.service"));
const alarmService = __importStar(require("./api/alarm/alarm.service"));
const fc_routes_1 = require("./api/fc/fc.routes");
const alarm_routes_1 = require("./api/alarm/alarm.routes");
const user_routes_1 = require("./api/user/user.routes");
const socket_service_1 = require("./services/socket.service");
dotenv_1.default.config();
const app = (0, express_1.default)();
const HTTP = __importStar(require("http"));
const http = HTTP.createServer(app);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static('public'));
(0, socket_service_1.setupSocketAPI)(http);
const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
// app.use(cors())
// app.use(express.static(path.resolve(__dirname, 'public')))
const port = process.env.PORT || 3030;
app.use('/api/fc', fc_routes_1.fcRoutes);
app.use('/api/alarm', alarm_routes_1.alarmRoutes);
app.use('/api/user', user_routes_1.userRoutes);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
http.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
tempService.startTempInterval();
timeService.startTimeInterval();
alarmService.startAckInterval();
