$(document).ready(function() {
  console.log("document is ready");

  $("#tweet-text").on("input", function() {
    let charCount = $(this).val().length;
    $(".counter").html(140 - charCount);

    if (charCount > 140) {
      $(".counter").addClass("neg-count");
    } else {
      $(".counter").removeClass("neg-count");
    }
  });
});
