const express = require("express");
const ServicioAPI = require("../../restaurante-db");
const pedidoCollection = "pedido";

function pedidoAPI(app) {
  const router = express.Router();
  app.use("/api/pedido", router);
  const pedidoServicio = ServicioAPI(pedidoCollection);

  router.get("/", async function (req, res, next) {
    let limit = req.query.limit;
    let skip = req.query.skip;
    const { tags } = req.query;
    try {
      pedidoServicio
        .getAll({
          tags,
          skip,
          limit,
        })
        .then((data) => {
          res.status(200).json({
            data: data,
            mensaje: "OK",
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });



  router.get("/:itemId", async function (req, res, next) {
    const { itemId } = req.params;
    try {
      pedidoServicio
        .getItem({ itemId })
        .then((data) => {
          res.status(200).json({
            data: data,
            mensaje: "OK",
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });

  router.get("/porusuario/:usuarioId", async function (req, res, next) {
    const { usuarioId } = req.params;
    let limit = req.query.limit;
    let skip = req.query.skip;
    try {
      // TODO: por hacer el servicio
      pedidoServicio
        .getPedidosPorUsuarioId({ usuarioId, skip, limit })
        .then((data) => {
          res.status(200).json({
            data: data,
            mensaje: "OK",
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });

  router.get("/porrestaurante/:restauranteId", async function (req, res, next) {
    const { restauranteId } = req.params;
    try {
      // TODO: por hacer el servicio
      pedidoServicio
        .getProductosDeRestaurante({ restauranteId })
        .then((data) => {
          res.status(200).json({
            data: data,
            mensaje: "OK",
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async function (req, res, next) {
    const { body: pedido } = req;

    try {
      pedidoServicio
        .createPedido({ pedido })
        .then((data) => {
          res.status(201).json({
            data: data,
            mensaje: "OK",
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });


  router.put(
    "/:itemId",
   
    async function (req, res, next) {
      const { itemId } = req.params;
      const { body: item } = req;
      try {
        pedidoServicio
          .update({ itemId, item })
          .then((data) => {
            res.status(200).json({
              data: data,
              mensaje: "OK",
            });
          })
          .catch((err) => next(err));
      } catch (err) {
        next(err);
      }
    }
  );










}

module.exports = pedidoAPI;

// get de pedidos por usuarios

// get de pedidos por restaurante

// post para aprobar o denegar o despachar un pedido
