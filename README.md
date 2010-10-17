# Tweetframe

Tweetframe is a simple twitter plugin for jQuery.
Check out a [demo](http://labs.jicobaligod.com/tweetframe) on my labs page!


## Including Tweetframe

You will need jQuery to use this plugin. To include jQuery on your site, paste the code below before the closing _head_ tag on the page you will be placing Tweetframe:
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.2.min.js"></script>
	
Or, link to the included file:
	<script type="text/javascript" src="folder/jquery-1.4.2.min.js"></script>
where _folder_ is the containing folder of the file.

Then, include the Tweetframe plugin also before the closing _head_ tag, but after the jQuery reference:
	<script type="text/javascript" src="folder/jquery.tweetframe.js"></script>
where _folder_ is the containing folder of the file.


## Appearance

You'll need to include the CSS file to make Tweetframe look pretty:
	<link rel="stylesheet" href="tweetframe.css" type="text/css" />

Or if you'd like to customize the look for yourself, here's the layout within the selected div:
	<div class="tweetframe">
		<div class="tweetframe_userbar">
			<div class="tf_profile_pic"><img class="tf_profile_image" /></div>
			<span class="tf_username"><a>USERNAME</a></span>
			<ul class="tf_twitter_stats">
				<li class="tf_stat"><span class="tf_stat_title"></span></li>
			</ul>
			<div class="tf_bio"></div>
		</div> <!-- .tweetframe_userbar -->
		<div class="tweetframe_stream">
			<div class="tweetframe_tweet">
				<div class="tf_tweet_detail"></div>
			</div>
		</div> <!-- .tweetframe_stream -->
	</div>


## Initializing Tweetframe

Turning Tweetframe on is simple.

Create a div where you want Tweetframe to be located.
	<div class="twitter"></div>
	
Then select that div with jQuery and initialize tweetframe like so:
	$('.twitter').tweetframe();
	
If you don't know how to use javascript or jQuery, no problem. Just copy and paste this code right before the closing _head_ tag of the page:
	<script type="text/javascript">
		$('.SELECT_DIV').tweetframe();
	</script>
And replace _.SELECT_DIV_ with well, your selected div.


## Customizing

Tweetframe comes with some customization options (with more to come). The list of options are listed in the next section. To customize these options, pass an object literal when calling tweetframe and set the options you want (or don't want).

Example:
	$('.twitter').tweetframe({
		username: 'yournamehere',
		count: 10,
		bio: false
	});


### Options

+	**username:**	Your Twitter handle [String] *i.e. username: 'jicooo'*
+	**count:** 		Number of tweets to display [int, default: 5] *i.e. count: 10*
+	**userbar:** 	Display Twitter user information [boolean, default: true] *i.e. userbar: false*
+	**location:**	Display user location under username [boolean, default: true] *i.e. location: false*
+	**stats_tweets:**	Display tweet count [boolean, default: true] *i.e. stats_tweets: false*
+	**stats_followers:** Display followers count [boolean, default: true] *i.e. stats_followers: false*
+	**stats_friends:**	Display friends count [boolean, default: true] *i.e. stats_friends: false*
+	**bio:**		Display Twitter bio [boolean, default: true] *i.e. bio: false*
+	**detail:**		Display details of tweet. [String, 'time' by default, 'full' for both time and source, or 'none'] *i.e. detail: 'full'*
+	**firstLarger:**	Make first/latest tweet font-size larger [boolean, default: true] *i.e. detail: 'false'*
+	**imagePreview:**	Display image links as previews in-stream (inside tweet box). Supports yfrog, tweetphoto, and plixi. [boolean, default: true] *i.e. imagePreview: false*



Copyright &copy; 2010 Jico Baligod  
Under the [MIT License](http://www.opensource.org/licenses/mit-license.php)
