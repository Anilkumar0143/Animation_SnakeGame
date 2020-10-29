 $(document).ready(function () {
     $("img").click(function () {
         $("#myModal").css("display", "block");
         $("#modalImg").attr("src", $(this).attr('src'));
     })
     $(".close").click(function () {
         $("#myModal").css("display", "none");
     })
 
 });
  