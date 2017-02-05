$(() => {


 function loadData() {
     $.ajax ({
       method: "GET",
       url: "/api/menues",
       success: function (menuItem) {
         renderData(menuItem);
         console.log(menuItem);
       }
     });
   }



   function renderData(arrOfObjects) {
     arrOfObjects.forEach(function(object){
       $("#menu").append(createMenuItem(object))
     })
    }

    function createMenuItem (orders){
      console.log("CREATE CART ITEM");
      console.log(orders.name);
      let $menu = `
        <tbody>
          <tr>
            <td data-th="Product">
              <div class="row">
                <div class="col-sm-2 hidden-xs"><img src="${orders.img_url}" alt="..." class="img-responsive"/></div>
                <div class="col-sm-10">
             <h4 class="nomargin">${orders.name}</h4>
             <p>${orders.description}</p>
             </div>
           </div>
          </td>
          <td data-th="Price">$${orders.price}</td>
          <td class="actions" data-th="">
            <form action="/cart/add" id="add-to-cart-button" method="POST">
              <input type="number" name="item_quantity" class="form-control text-center " value="1">
              <input type="submit" name="button" class="btn btn-info" value="Add To Cart">
              <input type = "hidden" name = "item_price" value = "${orders.price}" >
              <input type = "hidden" name = "item_id" value = "${orders.id}" >

            </form>
            </td>
          </td>
         </tr>
         </tbody>
          `;
        return $menu
        }
        // <input type="text" name="item_quantity">



        // <td data-th="Quantity">
        //   <input type="text" name="item_quantity" class="form-control text-center" value=1>

loadData();

//end of doc ready
});
