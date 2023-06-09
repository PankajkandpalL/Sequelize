const express = require("express");
const studentRoute = express.Router()
const { authMiddleware } = require("../Middleware/auth");
const { Order } = require("../Model/Orders.model");
const { Timeline } = require("../Model/Batch.model");
const Users = require("../Model/Student.model");

studentRoute.get()
studentRoute.post()
studentRoute.delete()
studentRoute.post()

module.exports = { studentRoute }