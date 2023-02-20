const express = require("express");
const router = express.Router();
const FF8Controller = require("../controllers/FF8_controller");

// Ex : http://localhost:3001/FF8
router.get("/FF8", FF8Controller.getAllData);

// Ex : http://localhost:3001/FF8/1
router.get("/FF8/:id", FF8Controller.getDataById);

// Ex : http://localhost:3001/FF8
router.post("/FF8", FF8Controller.createData);

// Ex : http://localhost:3001/FF8/6
router.put("/FF8/:id", FF8Controller.updateData);

// Ex : http://localhost:3001/FF8/6
router.delete("/FF8/:id", FF8Controller.deleteData);

module.exports = router;
