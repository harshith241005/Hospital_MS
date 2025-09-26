"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
function notFoundHandler(_req, res, _next) {
    res.status(404).json({ message: 'Route not found' });
}
function errorHandler(err, _req, res, _next) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message, ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {}) });
}
