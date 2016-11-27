var twitterAPI = require('twitter');
import _ from 'lodash';

var twitter = new twitterAPI({
  consumer_key: "zjSjQbj3xyOV01QECh3zzuYRp",
  consumer_secret: "hb47i9sGZ8bHIVEbPRLJ5j7SMRQVeG6uxeboBwfoQCC3AHohYW",
  access_token_key: "2320754958-hQv1iTw6s4DD7FZp4OmncjgIPuRd7tWHCc38a3m",
  access_token_secret: "7veEanjO5rwFlnlJMBWTmYwxRAq14QLiA9067vblxFgWJ"
});

export const getUser      = (screen_name)       => returnPromise('users/show', { screen_name: screen_name}, 'location');
export const getTweets    = (user_id, count)    => returnPromise('statuses/user_timeline', { user_id, count });
export const getTweet     = (id)                => returnPromise('statuses/show', { id });
export const getRetweets  = (id, count)         => returnPromise('statuses/retweets', { id, count });
export const searchTweets = (queryParams)       => returnPromise("search/tweets", Object.assign({result_type: 'recent'}, queryParams), 'statuses');


const returnPromise = (endpoint, parameters, resultPath = null) => {

  return new Promise((resolve, reject) => {

    twitter.get(
      endpoint,
      parameters,
      (error, result) => {
        if (error) {
          reject(error);
        }
        else {
          resolve( resultPath !== null ? _.get(result, resultPath) : result );
        }
      }
    )
  });
};
