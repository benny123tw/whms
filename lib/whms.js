"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.baseConfig = void 0;
var Whms_1 = require("./core/Whms");
var fs_1 = require("fs");
var path = require("path");
var file = fs_1.readFileSync(path.join(__dirname, '..', 'config', 'base.json'), { encoding: 'utf-8', flag: 'r+' });
var config = JSON.parse(file);
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
