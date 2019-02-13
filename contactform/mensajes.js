var config = {
apiKey: "AIzaSyDk7RA4IdXFC8WGhMP2nyBb1T6n3XIlaaw",
authDomain: "prueba-c2b23.firebaseapp.com",
databaseURL: "https://prueba-c2b23.firebaseio.com",
projectId: "prueba-c2b23",
storageBucket: "prueba-c2b23.appspot.com",
};


firebase.initializeApp(config);
var dbRef = firebase.database().ref().child('comments');
$('#submit').on('click', function(){
	var d = new Date();
	dbRef.push({
		username: $('#username_field').val(),
		comment_body: $('#comment_body_field').val(),
		date: d.getTime()
	});
});
dbRef.on('child_added', function(data){
	var d = new Date(data.val().date);
	$('#comment-area').after('<div class="comment"><p class="username">' + data.val().username + " - " + d.toLocaleString() + '</p><p class="comment_body">' + data.val().comment_body + '</p></div>');
});