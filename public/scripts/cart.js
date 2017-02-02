$(() => {


$('#add-to-cart-button').click(function(){

  $.ajax({
    method: "POST",
    url: "/cart/add"
  })

}




//end of doc ready
})
