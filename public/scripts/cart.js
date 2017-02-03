 $(() => {

   console.log("hello");

let cartObject;

  $.ajax({
    method: "GET",
    url: "/api/cart",
    success: function (response){
      cartObject = response;
      console.log(response);
    }
  }).then(

    for(let orderid in cartObject){

      orderid.forEach(function (obj){

        let $orderItem = $("<div>")
        $("<h1>").text(obj.id).appendTo($orderItem);
        $("<p>").text(obj.item_quantity).appendTo($orderItem);
        $("<p>").text(obj.order_total).appendTo($orderItem);
      })
    }

  );










//end of doc ready
 })
