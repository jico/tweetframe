(function($) {
	
	$.fn.tweetframe = function(options) {
		// Default parameters and settings
		var defaults = {
			username : 'jicooo',		// Twitter handle
			count : 5,					// Number of tweets to display
			userbar : true,				// Display user information
			location : true,			// Display user location
			stats_tweets : true,		// Display tweets count
			stats_followers : true,		// Display follower count
			stats_friends : true,		// Display friends count
			bio : true,					// Display bio
			detail : 'time',			// Details of tweets to display ('time', 'full', or 'none')
			firstLarger : true			// Makes first tweet font size larger
		};
		
		// Extend default parameters with custom params
		options = $.extend(defaults, options);
		
		var tweetCache = {};
		var twitterUser = {};
		var page = 0;
		
		// Main function
		return this.each(function() {
			// Add tweetframe div
			$('<div class="tweetframe"><div class="tweetframe_stream"></div></div>').appendTo(this);
			
			// Load userbar
			if (options.userbar == true) {
				$('<div class="tweetframe_userbar"></div>')
					.prependTo('.tweetframe');
				fetchUser(options.username, function() {
					loadUserbar();
				});
			}

			fetchTweets(options.username, options.count, page, function() {
				loadTweets();
				if (options.firstLarger) $('.tweetframe_tweet:first-child').css('font-size','larger');
			});

		});
		
		// Fetch user object	
		function fetchUser(sn, callback) {
			var user_url = 'http://api.twitter.com/1/users/show.json?callback=?&screen_name=' + sn;
			
			$.getJSON(user_url, function(user_data) {
				twitterUser = user_data;
				console.log(twitterUser);
				if (typeof callback == 'function') callback();
			});
		}
		
		// Fetch user timeline object
		function fetchTweets(sn, count, pg, callback) {		
			var tweets_url = 'http://api.twitter.com/1/statuses/user_timeline.json?callback=?&screen_name=' + sn + '&count=' + count + '&page=' + pg;
			
			// Fetch and cache tweets
			$.getJSON(tweets_url, function(tweet_data) {
				tweetCache = tweet_data;
				if (typeof callback == 'function') callback();
			});
		}
		
		// Loads user bar 
		function loadUserbar() {
					
				// Add twitter profile image
				$('<div class="tf_profile_pic"><img class="tf_profile_image" src="' +  twitterUser.profile_image_url + '" /></div>')
					.prependTo('.tweetframe_userbar');
				
				// Add twitter username
				$('<div class="tf_username"><a href="' + twitterUser.screen_name + '">' + twitterUser.screen_name + '</a></div>')
					.appendTo('.tweetframe_userbar');
				
				// Add user location
				if (options.location == true) $('<div class="tf_location">' + twitterUser.location + '</div>').appendTo('.tweetframe_userbar');
					
				// Add twitter statistics (followers, friends, number of tweets)
				if (options.stats_tweets == true || options.stats_followers == true || options.stats_friends == true) {
					$('<ul class="tf_twitter_stats"></ul>').appendTo('.tweetframe_userbar');
					
					if (options.stats_tweets == true) {
						$('<li class="tf_stat"><span class="tf_stat_title">Tweets</span><br />' + twitterUser.statuses_count + '</li>')
							.appendTo('ul.tf_twitter_stats');
					}
					if (options.stats_followers == true) {
						$('<li class="tf_stat"><span class="tf_stat_title">Followers</span><br />' + twitterUser.followers_count + '</li>')
							.appendTo('ul.tf_twitter_stats');
					}
					if (options.stats_friends == true) {
						$('<li class="tf_stat"><span class="tf_stat_title">Friends</span><br />' + twitterUser.friends_count + '</li>')
							.appendTo('ul.tf_twitter_stats');
					}
				}	
				
				// Add user bio/description
				if (options.bio == true) {
					$('<div class="tf_bio">' + twitterUser.description + '</div>')
						.appendTo('.tweetframe_userbar');
				} else console.log('Bio is false');
		}
		
		// Append tweets to stream with tweet detail according to options
		function loadTweets() {
			for( i = 0; i < tweetCache.length; i++) {
				var tweet = '<div class="tweetframe_tweet">' + linkifyTweet(tweetCache[i].text) + '</div>';
				if (options.detail == 'time') {
					tweet = '<div class="tweetframe_tweet">' + linkifyTweet(tweetCache[i].text) + '<div class="tf_tweet_detail">' + parseTwitterDate(tweetCache[i].created_at) + '</div></div>';
				} else if (options.detail == 'full') {
					tweet = '<div class="tweetframe_tweet">' + linkifyTweet(tweetCache[i].text) + '<div class="tf_tweet_detail">' + parseTwitterDate(tweetCache[i].created_at) + ' via ' + tweetCache[i].source + '</div></div>';
				}
				
				$(tweet).appendTo('.tweetframe_stream');
			}
		}
		
		// Changes Tweet time to relative time (i.e. about 20 mins ago)
		function parseTwitterDate(stamp) {	
			// Fixes problem with date parsing in IE	
			var parsed_date = Date.parse(stamp.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));

			var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
			var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
			var pluralize = function (singular, n) {
				return '' + n + ' ' + singular + (n == 1 ? '' : 's');
			};
			if (delta < 60) {
				return 'less than a minute ago';
			} else if(delta < (60*60)) {
				return 'about ' + pluralize("minute", parseInt(delta / 60)) + ' ago';
			} else if(delta < (24*60*60)) {
				return 'about ' + pluralize("hour", parseInt(delta / 3600)) + ' ago';
			} else {
				return 'about ' + pluralize("day", parseInt(delta / 86400)) + ' ago';
			}
		}
		
		// Replaces @usernames, #hashtags, and urls with html links
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