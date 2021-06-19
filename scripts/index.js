error = $(".error");
embed = $("#embed");
content = $(".content-wrapper");

// On submit
$("form").submit(function (e) {
  e.preventDefault();

  original = $(this).find("input").val(); // inputed url
  video = $(this).attr("id"); // form id

  // Check if submitted input has value
  if (!original) {
    error.text("Input cannot be empty.");
  } else {
    // If Youtube form submitted
    if (video == "youtube") {
      if (~original.indexOf("youtube.com/watch?v=")) {
        embedLink = original.replace("https://www.youtube.com/watch?v=",  "/watch?v=");
        // create embed link
      } else {
        error.text("Please insert a YouTube video link");
      }
      // If Wistia form submitted
    }
    if (video == "youtube") {
      if (~original.indexOf("youtu.be")) {
        embedLink = original.replace("https://youtu.be/", "/watch?v=");
        // create embed link
      } else {
        error.text("Please insert a YouTube video link");
      }
      // If Wistia form submitted
    }

    // Flip to show embed link
    $("#link").text("Click here").attr("href", embedLink);;
    
    content.addClass("hover");
    embed.removeClass().addClass(video);
    error.text("");
  }
});

document.getElementById("typelink").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    setTimeout(() => {
      document.getElementById("link").click();
    }, 500);
  }
});

// Go back to forms
// $(".back").on("click", function () {
//   content.removeClass("hover");
//   $('input[type="text"]').val("").attr("value", "").attr('href', embedLink);
// });


console.log("[console > index.js] Page load")