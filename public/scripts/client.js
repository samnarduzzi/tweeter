// const { create } = require("domain");

$(document).ready(function() {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1675119835294
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1675206235294
  //   }
  // ];


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
        <p>${tweet.content.text}</p>
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
    /* Your code for creating the tweet element */

    return $tweet;
  };


  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      // console.log($tweet);
      $(".tweet-container").append($tweet);
    }

  };

  $('.form-tweet').submit(function(event) {
    event.preventDefault();
    const tweetCount = $('#tweet-text').val()
    
    if (tweetCount === "") {
      return alert("Error! Can not post tweet with no text")
    } 
    
    if (tweetCount.length > 140) {
      return alert("Error! Your post can not have more than 140 characters")
    }
    
    const newTweets = $('.form-tweet').serialize();
    $.post('/tweets/', newTweets, function(result) {
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