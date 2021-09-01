"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Whms = void 0;
var axios_1 = require("axios");
var Whms = /** @class */ (function () {
    function Whms(baseConfig) {
        this.section = [
            "00:00~01:00", "01:00~02:00", "02:00~03:00", "03:00~04:00", "04:00~05:00",
            "05:00~06:00", "06:00~07:00", "07:00~08:00", "08:00~09:00", "09:00~10:00",
            "10:00~11:00", "11:00~12:00", "13:30~14:30", "14:30~15:30",
            "15:30~16:30", "16:30~17:30", "17:30~18:30", "19:00~20:00",
            "20:00~21:00", "21:00~22:00", "22:00~23:00", "23:00~24:00"
        ];
        this.baseConfig = baseConfig;
    }
    /**
     * @deprecated
     * @param path
     * @param filename
     * @param data
     */
    Whms.prototype.saveToLocal = function (path, filename, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("" + data);
                console.log(filename + " saved to " + path);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Get method for projects, employees and workhours.
     *
     * @param {Object} config Whs Requset Config
     * @returns AxiosResponse
     */
    Whms.prototype.get = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(this.baseConfig.requestUrl + config.method, {
                            headers: { 'Content-Type': 'application/json', },
                            data: config.data
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    ;
    /**
     * Post Method for update value
     *
     * @param config Whs Requset Config
     * @returns AxiosResponse
     */
    Whms.prototype.post = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post(this.baseConfig.requestUrl + config.method, JSON.stringify(config.data), {
                            headers: { 'Content-Type': 'application/json', },
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    ;
    /**
     * Save work record list to the database.
     *
     * @param workRecordList WorkRecord[]
     * @returns
     */
    Whms.prototype.save = function (workRecordList) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var createDate, res, workRecordCreateDate, dateString;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    createDate = workRecordList[0].createDate;
                                    if (workRecordList.length !== 22)
                                        return [2 /*return*/, reject("Wrong list length: " + workRecordList.length + ". It should be 22.")];
                                    return [4 /*yield*/, this.post({
                                            method: 'addWorkRecord',
                                            data: {
                                                workRecordList: workRecordList
                                            }
                                        })];
                                case 1:
                                    res = _a.sent();
                                    workRecordCreateDate = new Date(createDate);
                                    dateString = workRecordCreateDate.getFullYear() +
                                        '-' + (workRecordCreateDate.getMonth() + 1) +
                                        '-' + workRecordCreateDate.getDate();
                                    console.log(res.status == 200 ? dateString + " uploaded." : ("Failed: " + res.status + " " + dateString + " upload failed"));
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Create and return work record list;
     *
     * @param workRecordConfig
     * @returns WorkRecord[]
     */
    Whms.prototype.generateWorkReocrd = function (workRecordConfig) {
        var serial = 1;
        var workRecordList = [];
        for (var i = 0; i < this.section.length; i++) {
            var workRecord = {
                employee: workRecordConfig.employee,
                createDate: workRecordConfig.createDate,
                serial: serial++,
                section: this.section[i],
                projectId: 0,
                content: '',
            };
            if (i <= 16 && i >= 9) {
                workRecord.projectId = workRecordConfig.projectId;
                workRecord.content = workRecordConfig.content;
            }
            workRecordList.push(workRecord);
        }
        return workRecordList;
    };
    return Whms;
}());
exports.Whms = Whms;
