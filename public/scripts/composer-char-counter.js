$(document).ready(function() {
  console.log("document is ready");

  $("#tweet-text").keyup(function() {

    let charCount = $(this).val().length;
     $("#tweet-text, .counter").html(140 - charCount);
    // console.log("charCount:", charCount)

      if (charCount > 140) {
      $("#tweet-text, .counter").addClass("neg-count");

    } else {
        $("#tweet-text, .counter").removeClass("neg-count");
    }
  });
});