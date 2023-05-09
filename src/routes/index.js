const express = require("express");

const productRouter = require("./productsRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");

const router = express.Router();

const routerApi = (app) => {
  app.use("/api/v1", router);
  router.use('/products', productRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoryRouter);
};

module.exports = routerApi;
