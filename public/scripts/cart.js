$(() => {

$.ajax({
  method: "GET",
  url: "/api/cart",
  success: function (response){
    console.log(response);
}

})

})
