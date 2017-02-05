$(() => {

  function loadData() {
      $.ajax ({
        //change to get after database is set
        method: "POST",
        url: "/api/cart",
        success: function (cartData) {
          for(let orderID in cartData){
            console.log(cartData[orderID]);
            renderData(cartData[orderID]);
          }
        }
      });
    }

  function renderData(arrOfObjects) {
    arrOfObjects.forEach(function(object){
      $(".all-items").append(createCartItem(object))
    })

  }

  function createCartItem (object){
    let $item = `
      <tr>
        <td data-th="Product">
          <div class="row">
            <div class="col-sm-10">
              <h4 class="nomargin">${object.name}</h4>
                <p>${object.description}</p>
            </div>
            <td data-th="Quantity" class="text-center">${object.item_quantity}</td>
      </tr>
    `;
    return $item;
  }

  loadData();

  $.ajax({
    method: "GET",
    url: "/contact",
    success: function(response){
      console.log("contacted restaurant");
    }
  });


 var interval = setInterval( function(){
   $.ajax({
     method: "GET",
     url: "/twilio",
     success: function(response){
      if(response.time > 0){
          console.log(response);
          $(".order-process h2").text("Your order will be ready in " + response.time + " minutes");
          $("#loadingGIF").hide();
          clearInterval(interval);
      }
   }
  })}, 5000);

});
