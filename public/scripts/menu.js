$(() => {
   $.ajax({
    method: "GET",
    url: "/api/menues"
  }).done((menues) => {
    for(item of menues) {
      let $menuItem = $("<div>")
      $("<h1>").text(item.name).appendTo($menuItem);
      $("<h2>").text("$" + item.price).appendTo($menuItem);
      $("<p>").text(item.description).appendTo($menuItem);
      $menuItem.appendTo("body");
    }
  });;
 });
