"use strict";
// easyjson.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ej = void 0;
var EasyJson = /** @class */ (function () {
    function EasyJson(initialData, callback) {
        if (initialData === void 0) { initialData = {}; }
        this.data = initialData;
        this.callback = callback;
    }
    // Initialize new instance with optional callback
    EasyJson.new = function (initialData, callback) {
        if (initialData === void 0) { initialData = {}; }
        return new EasyJson(initialData, callback);
    };
    // Search for a path in JSON and return data
    EasyJson.prototype.search = function (path, callback) {
        var keys = path.split('.');
        var result = this.data;
        try {
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                result = result[key];
                if (result === undefined) {
                    throw new Error('Path not found');
                }
            }
            if (callback)
                callback(null, result);
            return result;
        }
        catch (error) {
            if (callback)
                callback(error);
            return undefined;
        }
    };
    // Delete a node at the specified path
    EasyJson.prototype.del = function (path, callback) {
        var keys = path.split('.');
        var result = this.data;
        var parent = this.data;
        var lastKey = keys.pop();
        try {
            for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var key = keys_2[_i];
                parent = result[key];
                if (parent === undefined)
                    throw new Error('Path not found');
                result = parent;
            }
            if (lastKey && result[lastKey] !== undefined) {
                delete result[lastKey];
                if (callback)
                    callback(null, true);
                return true;
            }
            else {
                throw new Error('Path not found');
            }
        }
        catch (error) {
            if (callback)
                callback(error);
            return false;
        }
    };
    // Add a new node at the specified path with optional data
    EasyJson.prototype.add = function (path, value, callback) {
        if (value === void 0) { value = null; }
        var keys = path.split('.');
        var result = this.data;
        try {
            for (var i = 0; i < keys.length - 1; i++) {
                result = result[keys[i]] = result[keys[i]] || {};
            }
            var lastKey = keys[keys.length - 1];
            result[lastKey] = value;
            if (callback)
                callback(null, true);
            return true;
        }
        catch (error) {
            if (callback)
                callback(error);
            return false;
        }
    };
    // Edit a node at the specified path
    EasyJson.prototype.edit = function (path, value, callback) {
        var keys = path.split('.');
        var result = this.data;
        try {
            for (var i = 0; i < keys.length - 1; i++) {
                result = result[keys[i]] = result[keys[i]] || {};
            }
            var lastKey = keys[keys.length - 1];
            if (result[lastKey] === undefined) {
                throw new Error('Path not found');
            }
            result[lastKey] = value;
            if (callback)
                callback(null, true);
            return true;
        }
        catch (error) {
            if (callback)
                callback(error);
            return false;
        }
    };
    // Check if the node exists at the specified path
    EasyJson.prototype.exists = function (path) {
        var keys = path.split('.');
        var result = this.data;
        try {
            for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
                var key = keys_3[_i];
                result = result[key];
                if (result === undefined) {
                    return false;
                }
            }
            return true;
        }
        catch (error) {
            return false;
        }
    };
    return EasyJson;
}());
// Export all methods for external use
exports.ej = EasyJson;
