$(() => {

  function loadData() {
      $.ajax ({
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
            <td data-th="Price">$${object.item_price}</td>
            <td data-th="Quantity" class="text-center">${object.item_quantity}</td>
            <td data-th="Subtotal" class="text-center">$${object.order_total}</td>
            <td class="actions" data-th="">
              <button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>
            </td>
      </tr>
    `;
    return $item;
  }

  loadData();

});
