$(() => {

  function loadData() {
      $.ajax ({
        method: "POST",
        url: "/api/cart",
        success: function (cartData) {
          for(let orderID in cartData){
            console.log(cartData[orderID]);
            renderData(cartData[orderID]);
            calculateTotal(cartData[orderID]);
          }
        }
      });
    }

  function renderData(arrOfObjects) {
    arrOfObjects.forEach(function(object, index){
      console.log(object);
      console.log(index);
      $(".all-items").append(createCartItem(object, index))
    })

  }

  function createCartItem (object, index){
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
              <form action="/${index}/delete" method="POST">
                <button name="delete" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i>
                </button>
              </form>
            </td>
      </tr>
    `;

    return $item;
  }

  loadData();
  let total = 0;
  function calculateTotal (arrOfObjects){
    arrOfObjects.forEach(function (object){
      total += object.order_total;
    })

    $("td.hidden-xs.text-center").text("Total: $" + total);
  }

});
