const express = require("express");
const batchRoute = express.Router()
const { authMiddleware } = require("../Middleware/auth");
const { Order } = require("../Model/Orders.model");
const { Timeline } = require("../Model/Batch.model");
const Users = require("../Model/Student.model");

batchRoute.get()
batchRoute.post()
batchRoute.delete()
batchRoute.post()

module.exports = { batchRoute }