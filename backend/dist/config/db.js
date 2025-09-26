"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDatabase(mongoUri) {
    const uri = mongoUri || process.env.MONGO_URI;
    if (!uri) {
        throw new Error('MONGO_URI is not defined');
    }
    mongoose_1.default.set('strictQuery', true);
    await mongoose_1.default.connect(uri);
    // Optional: log connection state
}
