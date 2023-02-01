$(document).ready(function() {
  console.log("document is ready");

  $("#tweet-text").keyup(function() {

    let charCount = $(this).val().length;
    let tweet = $(this).parents(".new-tweet").first();
    let counter = tweet.children(".counter");

    console.log("charCount:", charCount)

    if (charCount <= 140) {
      counter.removeClass("neg-counter").html(140 - charCount);
    } else {
      counter.addClass("neg-counter").html(140 - charCount);
    }
  });
});