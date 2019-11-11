function deleteData() {
  if (confirm("Confirmer la suppression de données ?")) {
    $.ajax({
      type: "POST",
      url: '/deleteData',
      success: function() {
        $("#data").html("");
      }
    });
  }
}
