$(document).ready(function() {

// *
// * Functions used to make it re-usable 
// *

// show takes id element and duration in milliseconds
function show(id, duration){
    $(id).animate({right: '-40px', opacity: 1.5}, duration);
}

// imageEffect takes id where you want to implement effect
// url1 is the changed image
// url2 is the default image
function imageEffect(id, url1, url2){

    $(id).mouseover(function(){
        $(this).attr("src", url1);
    });
    $(id).mouseout(function(){
        $(this).attr("src", url2);
    });

}

// * Function to implement AJAX call
// * It makes call to one url which in turns runs one function
// * of python which makes use of the data and then save it in
// * database
$('#submit').click(function() {
    var name = document.forms.survey.Name.value;
    var address = document.forms.survey.Address.value;
    var email = document.forms.survey.Email.value;
    $.ajax({
        type: "GET",
        url: "/ajax/data?name="+name+"&address="+address+"&email="+email,
        success: function(data) {
            if(data == 'no'){
                $("#confirmation").html("<h1>Error: Your information has not been Submitted</h1>")
            }
            else{
                $("#confirmation").html("<h1>Your information has been Submitted</h1>")
            }
        }
    });
});

// *
// * Autocomplete makes one AJAX calls
// *
$("#name-search").keyup(function(){
    $.ajax({
        type: "GET",
        url: "/ajax/suggestionname",
        data:'keyword='+$(this).val(),
        beforeSend: function(){
            // Nothing to send
        },
        success: function(data){
            $("#name-suggestion").html('');
            for(var i=0; i<data.length; i++)
            {
                $("#name-suggestion").append('<option value="'+data[i]+'">');
            }
        }
    });
});


// *
// *
// * MAIN EVENT STARTED
// *
// *

imageEffect('#image-set-1',
        'http://www.catprotection.com.au/wp-content/uploads/2014/11/2236629-cats-m.jpg',
        'https://timedotcom.files.wordpress.com/2015/02/cats.jpg?quality=85')

imageEffect('#image-set-2',
        'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg',
        'https://d1wn0q81ehzw6k.cloudfront.net/additional/thul/media/0eaa14d11e8930f5?w=400&h=400')

show('#head-1', 1000);

setTimeout(function(){
    show('#head-2', 1000);
}, 500);
setTimeout(function(){
    show('#head-3', 1000);
}, 1000);

});