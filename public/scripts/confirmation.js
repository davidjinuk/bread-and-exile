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
            calculateTotal(cartData[orderID]);
            orderNumber(orderID);
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
            </div>
          </div>
        <td data-th="Quantity" class="text-center">${object.item_quantity}</td>
        <td data-th="Subtotal" class="text-center">$${object.order_total}</td>
      </tr>
    `;
    return $item;
  }

  loadData();

  function calculateTotal (arrOfObjects){
    let total = 0;
    arrOfObjects.forEach(function (object){
      total += object.order_total;
    })

    $("td.hidden-xs.text-center").text("Total: $" + total);
  }

  function orderNumber (orderID) {
    $("p.orderID").append(orderID);
  }

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
          $("p.orderID").text("Your order will be ready in " + response.time + " minutes.");
          $("p.please-wait").hide();
          $("#loadingGIF").hide();
          clearInterval(interval);

          $.ajax({
            method: "GET",
            url: "/contact/customer",
            success: function(response){

            }
          })
      }
    }
  })}, 5000);

});
