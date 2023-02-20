const express = require("express");
const router = express.Router();
const FF10Controller = require("../controllers/FF10_controller");

// Ex : http://localhost:3001/FF10
router.get("/FF10", FF10Controller.getAllData);

// Ex : http://localhost:3001/FF10/1
router.get("/FF10/:id", FF10Controller.getDataById);

// Ex : http://localhost:3001/FF10
router.post("/FF10", FF10Controller.createData);

// Ex : http://localhost:3001/FF10/6
router.put("/FF10/:id", FF10Controller.updateData);

// Ex : http://localhost:3001/FF10/6
router.delete("/FF10/:id", FF10Controller.deleteData);


module.exports = router;