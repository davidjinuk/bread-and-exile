$.ajax({
  method: "POST",
  url: "/api/cart",
  success: function (response){
    console.log("The api response should be:");
    console.log(response);
  }

})


function createCartItem (obj){

  let $tr = $("<tr>");
  let $td = $("<td>").addProperty("data-th", "Product");
  let $div1 = $("<div>").addClass("row");
  let $div2 = $("<div>").addClass("col-sm-10");
  let $h4 = $("<h4>").addClass("nomargin");
  let $p






}



<tr>
  <td data-th="Product">
    <div class="row">
      <div class="col-sm-10">
        <h4 class="nomargin"><%=orderentry.name%></h4>
        <p><%=orderentry.description%></p>
      </div>
  <td data-th="Price"><%=orderentry.item_price%></td>
  <td data-th="Quantity">
    <input type="number" class="form-control text-center" value="1">
  </td>
  <td data-th="Subtotal" class="text-center"><%=orderentry.order_total%></td>
  <td class="actions" data-th="">
    <button class="btn btn-default btn-sm"><i class="fa fa-refresh"></i></button>
    <button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>
  </td>
</tr>
