$(document).ready(function() {

  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
      <header class="tweet-header">
        <div>
          <img src="${tweet.user.avatars}"/>
            <span>${tweet.user.name}</span>
        </div>

        <div class="tweet-handler"> 
          <span>${tweet.user.handle}</span>
        </div>
      </header>

      <div class="tweet-test">
        <p>${escape(tweet.content.text)}</p>
      </div>

      <footer class="tweet-footer">
        <span>${timeago.format(tweet.created_at)}</span>

        <div class="tweet-icon">
          <span>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </span>
        </div>
      </footer>
    </article>
  `);

    return $tweet;
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    console.log(div.innerHTML);
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    $(".tweet-container").empty();

    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".tweet-container").prepend($tweet);
    }

  };

  $('.form-tweet').submit(function(event) {
    event.preventDefault();
    const tweetCount = $('#tweet-text').val();

    $(".error").slideUp();

    if (tweetCount === "") {
      $(".error").html("<i class='fa-solid fa-triangle-exclamation'></i> Error! Can not post tweet with no text <i class='fa-solid fa-triangle-exclamation'></i>").slideDown();

      setTimeout(function() {
        $(".error").slideUp();
      }, 5000);
      return;
    }

    if (tweetCount.length > 140) {
      $(".error").html("<i class='fa-solid fa-triangle-exclamation'></i> Error! Your post can not have more than 140 characters <i class='fa-solid fa-triangle-exclamation'></i>").slideDown();

      setTimeout(function() {
        $(".error").slideUp();
      }, 5000);
      return;
    }

    const newTweets = $('.form-tweet').serialize();
    $.post('/tweets/', newTweets, function(result) {
      $('#tweet-text').val('');
      $('.counter').html(140); 
      loadTweets();
    });
  });

  const loadTweets = function() {
    $.get('/tweets/', function(newTweets) {
      console.log("success", newTweets);
      renderTweets(newTweets);
    });
  };

  loadTweets();

});