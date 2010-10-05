# Tweetframe

Tweetframe is a simple twitter plugin for jQuery.
Check out a [demo](http://www.jicobaligod.com/tweetframe).


## Including Tweetframe

You will need jQuery to use this plugin. To include jQuery on your site, include the code below before the closing _head_ tag on the page you will be placing Tweetframe:
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.2.min.js"></script>
	
Or, link to the included file:
	<script type="text/javascript" src="folder/jquery-1.4.2.min.js"></script>
where _folder_ is the containing folder of the file.

Then, include the Tweetframe plugin also before the closing _head_ tag, but after the jQuery reference:
	<script type="text/javascript" src="folder/jquery.tweetframe.js"></script>
where _folder_ is the containing folder of the file.


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


### Options

+	**username:**	Your Twitter handle [String] *ex. username: 'jicooo'*
+	**count:** 		Number of tweets to display [int, default: 5] *ex. count: 10*
+	**userbar:** 	Display Twitter user information [boolean, default: true] *ex. userbar: false*
+	**stats_tweets:**	Display tweet count [boolean, default: true] *ex. stats_tweets: false*
+	**stats_followers:** Display followers count [boolean, default: true] *ex. stats_followers: false*
+	**stats_friends:**	Display friends count [boolean, default: true] *ex. stats_friends: false*
+	**bio:**		Display Twitter bio [boolean, default: true] *ex. bio: false*
