$(document).ready(function() {
  console.log("DOM is ready");
});

$(document).ready(function() {
  $("textarea").keyup(function() {

    let charCount = $(this).val().length;
    let tweet = $(this).parents(".new-tweet").first();
    let counter = tweet.children(".counter");

    if (charCount <= 140) {
      counter.removeClass("neg-counter").html(140 - charCount);
    } else {
      counter.addClass("neg-counter").html(140 - charCount);
    }
  });
});