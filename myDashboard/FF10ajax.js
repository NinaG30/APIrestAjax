$(document).ready(() => {
    const apiBaseUrl = "http://localhost:3001/";

    
  function getAllData() {
    $.ajax({
      type: "GET",
      url: apiBaseUrl + "FF10",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (result) => {
        console.log(result);
        let monTab = "";
        result.forEach((obj) => {
          monTab += "<p class='monTab'>" + obj.name + " </p>";
        });
        $("#getAllFF10").html(monTab);
      },
      error: (xhr, status, error) => {
        console.log(xhr);
        console.log(status);
        console.log(error);
        alert("status: " + status + "error: " + error);
      },
    });
  }


    function getDataById() {
        const afficheFF10 = $("#afficheFF10");
        const id = $("#dataIdFF10").val();
        $.ajax({
          type: "GET",
          url: apiBaseUrl + "FF10/" + id,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: (result) => {        
            let imgTab = [
              "",
              "src/tidus.jpg",
              "src/yuna.jpg",
              "src/wakka.jpg",
            ];
            for (i = 0; i < imgTab.length; i++) {
              if (result.object.id === i) {
                afficheFF10.html(
                  "<img src=" +
                    imgTab[i] +
                    ">" +
                    "<p><span>Identité :</span> " +
                    result.object.name +
                    "<br><span>Arme :</span> " +
                    result.object.arme +
                    "<br><span>Description :</span> " +
                    result.object.description +
                    "</p>"
                );
              }
            }
          },
          error: (xhr, status, error) => {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert("status: " + status + "error: " + error);
          },
        });
      }

      function createData() {
        const newData = { name: $("#createFF10-name").val() };
        console.log(newData);
        const pCreate = $("#p-createFF10");
        $.ajax({
          type: "POST",
          url: apiBaseUrl + "FF10/",
          data: JSON.stringify(newData),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: (result) => {
            console.log(result);
            getAllData();
            pCreate.html(
              " Cette donnée a été ajoutée :<br>id: " +
                result.object.id +
                " name: " +
                result.object.name
            );
          },
          error: (xhr, status, error) => {
            console.log(xhr);
            console.log(status);
            console.log(error);            
            pCreate.html("Le personnage s'y trouve déjà. Entre un autre nom.");
          },
        });
      }
    
      function updateData() {
        const updateId = $("#dataIdFF10-update").val();
        const newName = { name: $("#dataFF10-new-name").val() };
        console.log(newName);
        const pUpdate = $("#p-updateFF10");
        $.ajax({
          type: "PUT",
          url: apiBaseUrl + "FF10/" + updateId,
          data: JSON.stringify(newName),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: (result) => {
            getAllData();
            console.log(result);
            pUpdate.html(
              "Nouvelle donnée :<br>id: " +
                result.object.id +
                " name: " +
                result.object.name
            );
          },
          error: (xhr, status, error) => {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert("status: " + status + "error: " + error);
          },
        });
      }
    
      function deleteData() {
        const id = $("#dataFF10-delete").val();
        const pDelete = $("#p-deleteFF10");
        $.ajax({
          type: "DELETE",
          url: apiBaseUrl + "FF10/" + id,
          contentType: "application/json; charset-utf-8",
          dataType: "json",
          success: (result) => {
            getAllData();
            console.log(result);
            pDelete.html(result.message);
          },
          error: (xhr, status, error) => {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert("status: " + status + "error: " + error);
          },
        });
      }
      
      //Events
      $("#btnFF10").click(getAllData);
      $("#getByIdFF10-button").click(getDataById);
      $("#createFF10-button").click(createData);
      $("#updateFF10-button").click(updateData);
      $("#deleteFF10-button").click(deleteData);      
    
})
    