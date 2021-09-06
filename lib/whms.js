"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.baseConfig = void 0;
var Whms_1 = require("./core/Whms");
var config = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    data: {},
    requestUrl: "http://192.168.8.188:8088/whms/ajax/",
    baseUrl: "http://192.168.8.188:8088/",
    projectUrl: "http://192.168.8.188:8088/whms/workhour/list/"
};
// Create Whs instance
var whms = new Whms_1.Whms(config);
/**
 * Upload work record list to database.
 *
 * @param uploadConfig
 */
var upload = whms.upload.bind(whms);
exports.upload = upload;
var baseConfig = whms.baseConfig;
exports.baseConfig = baseConfig;
exports.default = whms;
