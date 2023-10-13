"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
const isEmpty = (data) => {
    return (data == '' ||
        data == undefined ||
        data == null ||
        data == 'null' ||
        (data === null || data === void 0 ? void 0 : data.length) == 0);
};
exports.isEmpty = isEmpty;
