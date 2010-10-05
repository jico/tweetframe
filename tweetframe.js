(function($) {
	
	$.fn.tweetframe = function() {
		// Default parameters
		var param = {
			sn: 'jicooo',
			count: 10,
			user_bar: true,
		}
		
		var _frame = this; // Reference to implicit parameter
		var tweetCache = {};
		var twitterUser = {};
		
		$('<div class="tweetframe"><div class="tweetframe_stream"></div></div>').appendTo(this);
		
		if (param.user_bar == true) {
			$('<div class="tweetframe_user"></div>')
				.prependTo('.tweetframe');
		} else alert('no frame');
			
		fetchTweets(param.sn, param.count, 1, function() {
			loadTweets();
		});
			
		function fetchUser(sn) {
			var user_url = 'http://api.twitter.com/1/users/show.json?callback=?&screen_name=' + sn;
			
			$.getJSON(user_url, function(user_data) {
				twitterUser = user_data;
				if (typeof callback == 'function') callback();
			});
		}
		
		function fetchTweets(sn, count, pg, callback) {		
			var tweets_url = 'http://api.twitter.com/1/statuses/user_timeline.json?callback=?&screen_name=' + sn + '&count=' + count + '&page=' + pg;
			
			// Fetch and cache tweets
			$.getJSON(tweets_url, function(tweet_data) {
				tweetCache = tweet_data;
				if (typeof callback == 'function') callback();
			});
		}
		
		function loadTweets() {
			for( i = 0; i < tweetCache.length; i++) {
				$('<div class="tweet">' + linkifyTweet(tweetCache[i].text) + '<br /><span class="tweet_detail">' + parseTwitterDate(tweetCache[i].created_at) + ' via ' + tweetCache[i].source + '</span></div>').appendTo('.tweetframe_stream').fadeIn(100);
			}

		}
		
		
		function parseTwitterDate(stamp) {	
			// Fixes problem with date parsing in IE	
			var parsed_date = Date.parse(stamp.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));

			var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
			var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
			var pluralize = function (singular, n) {
				return '' + n + ' ' + singular + (n == 1 ? '' : 's');
			};
			if(delta < 60) {
				return 'less than a minute ago';
			} else if(delta < (60*60)) {
				return 'about ' + pluralize("minute", parseInt(delta / 60)) + ' ago';
			} else if(delta < (24*60*60)) {
				return 'about ' + pluralize("hour", parseInt(delta / 3600)) + ' ago';
			} else {
				return 'about ' + pluralize("day", parseInt(delta / 86400)) + ' ago';
			}
		}
		
		function linkifyTweet(tweet) {
			var url_exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
			var user_exp = /(^|\s)(@\w+)/gm;
			var hash_exp = /#(\w+)/g;

			var new_tweet = tweet
							.replace(url_exp, '<a href="$1">$1</a>')
							.replace(user_exp, '$1<a href="http://www.twitter.com/$2">$2</a>')
							.replace(hash_exp, '<a href="http://www.twitter.com/search?q=$1">#$1</a>');

			return new_tweet;
		}
		
		
	}
})(jQuery);