$(document).ready(() => {
  const apiBaseUrl = "http://localhost:3001/";

  function getAllData() {
    $.ajax({
      type: "GET",
      url: apiBaseUrl + "FF8",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (result) => {
        console.log(result);
        let monTab = "";
        result.forEach((obj) => {
          monTab += "<p class='monTab'>" + obj.name + " </p>";
        });
        $("#getAllFF8").html(monTab);
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
    const afficheFF8 = $("#afficheFF8");
    const id = $("#dataIdFF8").val();
    $.ajax({
      type: "GET",
      url: apiBaseUrl + "FF8/" + id,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (result) => {        
        let imgTab = [
          "a",
          "src/squall.jpg",
          "src/linoa.jpg",
          "src/quistis.jpg",
        ];
        for (i = 0; i < imgTab.length; i++) {
          if (result.object.id === i) {
            afficheFF8.html(
              "<img src=" +
                imgTab[i] +
                ">" +
                "<p class='afficheResult'><span>Identité :</span> " +
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
    const newData = { name: $("#createFF8-name").val() };
    console.log(newData);
    const pCreate = $("#p-createFF8");
    $.ajax({
      type: "POST",
      url: apiBaseUrl + "FF8/",
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
        // alert("status: " + status + "error: " + error);
        pCreate.html("Le personnage s'y trouve déjà. Entre un autre nom.");
      },
    });
  }

  function updateData() {
    const updateId = $("#dataIdFF8-update").val();
    const newName = { name: $("#dataFF8-new-name").val() };
    console.log(newName);
    const pUpdate = $("#p-updateFF8");
    $.ajax({
      type: "PUT",
      url: apiBaseUrl + "FF8/" + updateId,
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
    const id = $("#data-deleteFF8").val();
    const pDelete = $("#p-deleteFF8");
    $.ajax({
      type: "DELETE",
      url: apiBaseUrl + "FF8/" + id,
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

  //eventListeners
  $("#btnFF8").click(getAllData);
  $("#getByIdFF8-button").click(getDataById);
  $("#createFF8-button").click(createData);
  $("#updateFF8-button").click(updateData);
  $("#deleteFF8-button").click(deleteData);
});
