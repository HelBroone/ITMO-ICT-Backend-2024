"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const UserBookController_1 = require("../controllers/UserBookController");
const ExchangeRequestController_1 = require("../controllers/ExchangeRequestController");
const ProfileController_1 = require("../controllers/ProfileController");
const AuthController_1 = require("../controllers/AuthController");
const BookController_1 = require("../controllers/BookController");
const router = express_1.default.Router();
exports.userRoutes = router;
router.post("/register", AuthController_1.AuthController.register);
router.post("/login", AuthController_1.AuthController.login);
router.post('/users/:userId/profile', ProfileController_1.ProfileController.createOrUpdateProfile);
router.get('/users/:userId/getprofile', ProfileController_1.ProfileController.getProfileByUserId);
router.post("/users", UserController_1.UserController.createUser);
router.get("/users/:id", UserController_1.UserController.getUserById);
router.delete("/users/:id", UserController_1.UserController.deleteUser);
router.post('/books', BookController_1.BookController.createBook);
router.get('/available-books', BookController_1.BookController.getAllBooks);
router.post("/user/:userId/book", UserBookController_1.UserBookController.addUserBook);
router.delete("/user/book/:id", UserBookController_1.UserBookController.deleteUserBook);
router.get("/user/:userId/books", UserBookController_1.UserBookController.getUserBooks);
router.post("/exchange/request", ExchangeRequestController_1.ExchangeRequestController.createExchangeRequest);
router.delete("/exchange/:id", ExchangeRequestController_1.ExchangeRequestController.deleteExchangeRequest);
router.get('/exchange/user/:userId', ExchangeRequestController_1.ExchangeRequestController.getUserExchangeRequests); // получение заявок на обмен для конкретного пользователя
