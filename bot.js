console.log("Bot is starting....");

var Twit = require('twit');
var keys = require('./keys');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var T = new Twit(keys);

// T.get('search/tweets', { q: 'macron', count: 2 }, function(err, data, response) {

//     tweets = data.statuses;
//     for(var i = 0; i < tweets.length; i++){
//     	console.log('Tweet ' + i + ':      ' + tweets[i].text)	
//     }


// });



var HttpClient = function() {
    this.get = function(book, chapter, verse, callback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200){
		res = anHttpRequest.responseText;
                callback(JSON.parse(res));
	    }
        }

        anHttpRequest.open( "GET", 'https://bible-api.com/' + book + chapter + ':' + verse, true );            
        anHttpRequest.send( null );
    }
}


var client = new HttpClient();

var i = 3
    setInterval(function(){
	client.get('jn', 1, i, tweetIt);
	i+=1;
    }, 1000*10);


function tweetIt(data){
    var verse = data.verses[0];
    var res = verse.text.replace(/\n/g,'') + ' - ' + verse.book_name + verse.chapter + ':'+  verse.verse;

    if (res.length <= 140){
	T.post('statuses/update', { status: res }, function(err, data, response) {
	})
	console.log("Tweet posted!")
    } else {
	console.log("Tweet is too long!");
    }
}
