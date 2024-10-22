"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteApp = void 0;
require("./index.css"); // 引入编译后的 CSS 文件
var NoteApp = /** @class */ (function () {
    function NoteApp() {
    }
    NoteApp.prototype.addBlockClass = function (childBlockEle) {
        childBlockEle.classList.add('block-main');
    };
    return NoteApp;
}());
exports.NoteApp = NoteApp;
