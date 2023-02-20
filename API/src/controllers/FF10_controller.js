const fs = require("fs");
const chemin = "./src/model/data.json";

//GET
exports.getAllData = (request, response) => {
  fs.readFile(chemin, (err, data) => {
    if (err) {
      response.status(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    } else {
      response.status(200).json(JSON.parse(data).FF10);
    }
  });
};

// GET
exports.getDataById = (request, response) => {
  fs.readFile(chemin, (err, data) => {
    if (err) {
      response.status(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    } else {
      const jsonData = JSON.parse(data);
      const dataById = jsonData.FF10.find(
        (obj) => obj.id === parseInt(request.params.id)
      );
      if (dataById) {
        response.status(200).json({
          object: dataById,
          message: "Ca fonctionne",
        });
      } else {
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      }
    }
  });
};

// POST
exports.createData = (request, response) => {
  fs.readFile(chemin, (err, data) => {
    if (err) {
      response.status(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    } else {
      const existingData = JSON.parse(data);
      let lastId = existingData.FF10.findLast((obj) => obj.id); // cherche dernier objet;
      let newTabLine = { id: lastId.id + 1, name: request.body.name };
      let oldName = existingData.FF10.find(
        (obj) => obj.name === request.body.name
      );
      console.log(oldName);
      if (oldName) {
        response.status(500).json({
          message: "Il existe déjà un tel nom",
        });
      } else {
        existingData.FF10.push(newTabLine);
        fs.writeFile(chemin, JSON.stringify(existingData), (writeErr) => {
          if (writeErr) {
            response.status(500).json({
              message: "Une erreur est survenue lors de l'écriture des données",
            });
          } else {
            response.status(200).json({
              object: newTabLine,
              message: "Les données ont été ajouté avec succès",
            });
          }
        });
      }
    }
  });
};

// PUT
exports.updateData = (request, response) => {
  fs.readFile(chemin, (err, data) => {
    if (err) {
      response.status(500).json({
        message: "Erreur de lecture",
      });
    } else {
      const existingData = JSON.parse(data);
      const dataById = existingData.FF10.find(
        (obj) => obj.id === parseInt(request.params.id)
      );
      if (!dataById) {
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      } else {
        dataById.name = request.body.name;
        console.log(dataById.name);
        fs.writeFile(chemin, JSON.stringify(existingData), (writeErr) => {
          if (writeErr) {
            response.status(500).json({
              message: "Une erreur est survenue lors de l'écriture des données",
            });
          } else {
            response.status(200).json({
              object: dataById,
              message: "Les données ont été mise à jour avec succès",
            });
          }
        });
      }
    }
  });
};

// DELETE
exports.deleteData = (request, response) => {
  fs.readFile(chemin, (err, data) => {
    if (err) {
      response.status(500).json({
        message: "Une erreur est survenue lors de la lecture des données",
      });
    } else {
      const existingData = JSON.parse(data);
      const dataById = existingData.FF10.find(
        (obj) => obj.id === parseInt(request.params.id)
      );
      if (!dataById) {
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      } else {
        existingData.FF10 = existingData.FF10.filter(
          (obj) => obj.id != parseInt(request.params.id)
        );
        fs.writeFile(chemin, JSON.stringify(existingData), (writeErr) => {
          if (writeErr) {
            response.status(500).json({
              message: "Une erreur est survenue lors de l'écriture des données",
            });
          } else {
            response.status(200).json({
              message: "La donnée a bien été supprimée",
            });
          }
        });
      }
    }
  });
};
