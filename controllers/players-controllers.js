const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Player = require("../models/player");
const User = require("../models/user");
const Oferta = require("../models/oferta");

const getPlayers = async (req, res, next) => {
  let players;
  try {
    players = await Player.find({}).populate("ofertas").sort("-clausula");
  } catch (err) {
    const error = new HttpError(
      "Fallo en la obtención de jugadores, inténtelo de nuevo",
      500
    );
    return next(error);
  }
  res.json({
    players: players.map((player) => player.toObject({ getters: true })),
  });
};

const getPlayersMercado = async (req, res, next) => {
  let players;
  try {
    players = await Player.find({
      $or: [{ transferible: true }, { team: "Sin equipo" }],
    }).sort("-clausula");
  } catch (err) {
    const error = new HttpError(
      "Fallo en la obtención de jugadores, inténtelo de nuevo",
      500
    );
    return next(error);
  }
  res.json({
    players: players.map((player) => player.toObject({ getters: true })),
  });
};

const getPlayerById = async (req, res, next) => {
  const playerId = req.params.pid;

  let player;
  try {
    player = await Player.findById(playerId);
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo encontrar al jugador.",
      500
    );
    return next(error);
  }

  if (!player) {
    const error = new HttpError(
      "No se ha encontrado a un jugador con ese id.",
      404
    );
    return next(error);
  }

  res.json({ player: player.toObject({ getters: true }) });
};

const getPlayersByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithPlayers;
  try {
    userWithPlayers = await User.findById(userId).populate("players");
  } catch (err) {
    const error = new HttpError(
      "Fallo en la obtención de jugadores, inténtelo de nuevo.",
      500
    );
    return next(error);
  }

  res.json({
    players: userWithPlayers.players.map((player) =>
      player.toObject({ getters: true })
    ),
  });
};

const createPlayer = async (req, res, next) => {
  const playerId = req.params.pid;
  /* const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo encontrar al usuario.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "No se ha encontrado a un usuario con ese id.",
      404
    );
    return next(error);
  }
  if (user.players.length === 18) {
    const error = new HttpError(
      "Operación cancelada, no puede superar el límite de 18 jugadores en plantilla.",
      404
    );
    return next(error);
  } */
  const {
    title,
    clausula,
    address,
    posIndex,
    image,
    escudo,
    Expires,
    clausulaInicial,
    team,
    creator,
    creatorName,
  } = req.body;

  const createdPlayer = new Player({
    title,
    clausula,
    escudo,
    address,
    posIndex,
    transferible: false,
    marketValue: 0,
    Expires,
    clausulaInicial,
    team,
    image,
    ofertas: [],
    creatorName,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Fallo en la creación del jugador, inténtelo de nuevo.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("No se encontró un usuario con ese id", 404);
    return next(error);
  }

  let userWithOfertas;
  try {
    userWithOfertas = await Oferta.find({ ofertanteId: creator });
  } catch (err) {
    const error = new HttpError(
      "La obtención de ofertas falló, inténtelo de nuevo.",
      500
    );
    return next(error);
  }

  const filteredOffers = userWithOfertas.filter(
    (oferta) => oferta.playerId.toString() !== playerId.toString()
  );

  if (user.players.length + filteredOffers.length >= 18) {
    const error = new HttpError(
      "Operación cancelada, ya que el número de jugadores en plantilla más las ofertas realizadas pendientes sería mayor a 18.",
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlayer.save({ session: sess });
    user.players.push(createdPlayer);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "La creación del jugador falló, inténtelo de nuevo.",
      500
    );
    return next(error);
  }

  res.status(201).json({ player: createdPlayer });
};

const createDiscardedPlayer = async (req, res, next) => {
  const userId = req.params.uid;
  const {
    title,
    clausula,
    address,
    posIndex,
    image,
    escudo,
    Expires,
    clausulaInicial,
    team,
    ownerDiscard,
    discardExpiresDate,
    creatorName,
  } = req.body;

  const createdPlayer = new Player({
    title,
    clausula,
    escudo,
    address,
    posIndex,
    transferible: false,
    marketValue: 0,
    Expires,
    clausulaInicial,
    ownerDiscard,
    discardExpiresDate,
    team,
    image,
    ofertas: [],
    creatorName,
  });

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo encontrar al jugador.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "No se pudo encontrar al usuario con ese id.",
      404
    );
    return next(error);
  }

  /* if (user.players.length < 14) {
    const error = new HttpError(
      "Operación cancelada, ya que se quedaría con menos de 14 jugadores.",
      404
    );
    return next(error);
  } */

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlayer.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "La creación del jugador falló, inténtelo de nuevo",
      500
    );
    return next(error);
  }

  res.status(201).json({ player: createdPlayer });
};

const updatePlayer = async (req, res, next) => {
  const { clausula } = req.body;
  const playerId = req.params.pid;

  let player;
  try {
    player = await Player.findById(playerId);
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo actualizar al jugador.",
      500
    );
    return next(error);
  }

  if (player.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      "No está autorizado para realizar la operación.",
      401
    );
    return next(error);
  }
  if (player.clausula > clausula) {
    const error = new HttpError(
      "No puedes bajar la cláusula de rescisión del jugador.",
      401
    );
    return next(error);
  }

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo encontrar al jugador.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "No se pudo encontrar al usuario con ese id.",
      404
    );
    return next(error);
  }

  const userPresupuesto = user.presupuesto;

  let userWithOfertas;
  try {
    userWithOfertas = await Oferta.find({ ofertanteId: req.userData.userId });
  } catch (err) {
    const error = new HttpError(
      "La obtención de ofertas falló, inténtelo de nuevo.",
      500
    );
    return next(error);
  }

  const quantityOffer = userWithOfertas.map((oferta) => oferta.cantidad);
  let sum = quantityOffer.reduce((x, y) => x + y, 0);

  if (!userWithOfertas) {
    sum = 0;
  }

  const debt = Number(clausula) - Number(player.clausula) + Number(sum);

  if (Number(userPresupuesto) < debt) {
    console.log(userPresupuesto);
    const error = new HttpError(
      `Operación denegada. Tu presupuesto es menor a la deuda acumulada`,
      404
    );
    return next(error);
  }

  player.clausula = clausula;

  try {
    await player.save();
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo actualizar al jugador.",
      500
    );
    return next(error);
  }

  res.status(200).json({ player: player.toObject({ getters: true }) });
};

const updateTransferiblePlayer = async (req, res, next) => {
  const { transferible, marketValue } = req.body;
  const playerId = req.params.pid;

  let player;
  try {
    player = await Player.findById(playerId);
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo actualizar al jugador.",
      500
    );
    return next(error);
  }

  if (player.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      "No estás autorizado para realizar la operación.",
      401
    );
    return next(error);
  }
  if (player.clausula < marketValue) {
    const error = new HttpError(
      "No puedes poner el jugador a la venta por un importe mayor al de su cláusula de rescisión.",
      401
    );
    return next(error);
  }

  player.transferible = transferible;
  player.marketValue = marketValue;

  try {
    await player.save();
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo actualizar al jugador.",
      500
    );
    return next(error);
  }

  res.status(200).json({ player: player.toObject({ getters: true }) });
};

const deletePlayer = async (req, res, next) => {
  const { actionType } = req.body;
  const playerId = req.params.pid;
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const initDateSummerTransfer = new Date(year, month, 15, 22, 30);
  const endDateSummerTransfer = new Date(year, month, 18, 22, 30);
  const initDateWinterTransfer = new Date(year, month + 1, 1, 22, 30);
  const endDateWinterTransfer = new Date(year, month, 4, 22, 30);

  let player;
  let ofertasPlayer;
  try {
    player = await Player.findById(playerId).populate("creator");
    ofertasPlayer = await Oferta.find({ playerId: playerId });
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo eliminar al jugador.",
      500
    );
    return next(error);
  }

  if (!player) {
    const error = new HttpError(
      "No se ha encontrado el jugador con ese id",
      404
    );
    return next(error);
  }

  /* if (
    player.creator.players.length <= 14 &&
    player.creator.id !== req.userData.userId
  ) {
    const error = new HttpError(
      "Operación cancelada, ya que el número de jugadores en plantilla del usuario sería menor a 14.",
      403
    );
    return next(error);
  } */

  /* if (
     player.creator.players.length <= 14 &&
     player.creator.id === req.userData.userId
  ) {
    const error = new HttpError(
    "Operación cancelada, ya que el número de jugadores en plantilla sería menor a 14.",
       404
    );
    return next(error);
  } */

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      "Fallo en la creación del jugador, inténtelo de nuevo.",
      500
    );
    return next(error);
  }

  if (req.userData.userId !== player.creator.id) {
    let userWithOfertas;
    try {
      userWithOfertas = await Oferta.find({ ofertanteId: req.userData.userId });
    } catch (err) {
      const error = new HttpError(
        "La obtención de ofertas falló, inténtelo de nuevo.",
        500
      );
      return next(error);
    }
    const filteredOffers = userWithOfertas.filter(
      (oferta) => oferta.playerId.toString() !== playerId.toString()
    );

    if (user.players.length + filteredOffers.length >= 18) {
      const error = new HttpError(
        "Operación cancelada, ya que el número de jugadores en plantilla más las ofertas realizadas pendientes sería mayor a 18.",
        404
      );
      return next(error);
    }
  }

  if (
    user.equipo === "Equipo no asignado" ||
    (user.equipo !== "Admin" && player.title === "Prueba2(NO ME FICHES)") ||
    (user.equipo !== "Admin" && player.title === "Prueba1") ||
    (actionType === "Clausulazo" &&
      date >= endDateSummerTransfer &&
      user.equipo !== "Admin") ||
    (actionType === "Clausulazo" &&
      date < initDateSummerTransfer &&
      user.equipo !== "Admin")
  ) {
    const error = new HttpError(
      "Operación cancelada, solo se puede pagar cláusulas de rescisión durante los mercados de verano (del 15 al 18 de cada mes)",
      404
    );
    return next(error);
  }

  if (
    user.equipo === "Equipo no asignado" ||
    (user.equipo !== "Admin" && player.title === "Prueba2(NO ME FICHES)") ||
    (user.equipo !== "Admin" && player.title === "Prueba1") ||
    (actionType !== "Clausulazo" &&
      date >= endDateSummerTransfer &&
      date < initDateWinterTransfer &&
      user.equipo !== "Admin") ||
    (actionType !== "Clausulazo" &&
      date >= endDateWinterTransfer &&
      date < initDateSummerTransfer &&
      user.equipo !== "Admin")
  ) {
    const error = new HttpError(
      "Operación cancelada, el mercado de fichajes no se encuentra abierto",
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await player.remove({ session: sess });
    ofertasPlayer?.map((ofertasPlayer) =>
      ofertasPlayer.remove({ session: sess })
    );
    player.creator.players.pull(player);
    await player.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo eliminar al jugador.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted player." });
};

const deleteDiscardedPlayer = async (req, res, next) => {
  const { actionType } = req.body;
  const playerId = req.params.pid;
  const userId = req.params.uid;
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const initDateSummerTransfer = new Date(year, month, 15, 22, 30);
  const endDateSummerTransfer = new Date(year, month, 18, 22, 30);
  const initDateWinterTransfer = new Date(year, month + 1, 1, 22, 30);
  const endDateWinterTransfer = new Date(year, month, 4, 22, 30);
  let player;

  try {
    player = await Player.findById(playerId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo eliminar al jugador.",
      500
    );
    return next(error);
  }

  if (!player) {
    const error = new HttpError("No se encontró un jugador para ese id.", 404);
    return next(error);
  }
  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo encontrar al usuario.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("No se encontró un usuario para ese id.", 404);
    return next(error);
  }

  let userWithOfertas;
  try {
    userWithOfertas = await Oferta.find({ ofertanteId: userId });
  } catch (err) {
    const error = new HttpError(
      "La obtención de ofertas falló, inténtelo de nuevo.",
      500
    );
    return next(error);
  }

  if (user.players.length + userWithOfertas.length >= 18) {
    const error = new HttpError(
      "Operación cancelada, ya que el número de jugadores en plantilla más las ofertas realizadas pendientes sería mayor a 18.",
      404
    );
    return next(error);
  }

  if (
    user.equipo === "Equipo no asignado" ||
    (user.equipo !== "Admin" && player.title === "Prueba2(NO ME FICHES)") ||
    (user.equipo !== "Admin" && player.title === "Prueba1") ||
    (actionType === "Clausulazo" &&
      date >= endDateSummerTransfer &&
      user.equipo !== "Admin") ||
    (actionType === "Clausulazo" &&
      date < initDateSummerTransfer &&
      user.equipo !== "Admin")
  ) {
    const error = new HttpError(
      "Operación cancelada, solo se puede pagar cláusulas de rescisión durante los mercados de verano (del 15 al 18 de cada mes)",
      404
    );
    return next(error);
  }

  if (
    user.equipo === "Equipo no asignado" ||
    (user.equipo !== "Admin" && player.title === "Prueba2(NO ME FICHES)") ||
    (user.equipo !== "Admin" && player.title === "Prueba1") ||
    (actionType !== "Clausulazo" &&
      date >= endDateSummerTransfer &&
      date < initDateWinterTransfer &&
      user.equipo !== "Admin") ||
    (actionType !== "Clausulazo" &&
      date >= endDateWinterTransfer &&
      date < initDateSummerTransfer &&
      user.equipo !== "Admin")
  ) {
    const error = new HttpError(
      "Operación cancelada, el mercado de fichajes no se encuentra abierto",
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await player.remove({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Algo fue mal, no se pudo eliminar al jugador.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted player." });
};

exports.getPlayerById = getPlayerById;
exports.getPlayersByUserId = getPlayersByUserId;
exports.createPlayer = createPlayer;
exports.updatePlayer = updatePlayer;
exports.deletePlayer = deletePlayer;
exports.getPlayersMercado = getPlayersMercado;
exports.getPlayers = getPlayers;
exports.updateTransferiblePlayer = updateTransferiblePlayer;
exports.createDiscardedPlayer = createDiscardedPlayer;
exports.deleteDiscardedPlayer = deleteDiscardedPlayer;
