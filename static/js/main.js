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

function showReplies(commentId, userComment)
{
    $.ajax({
        type: "GET",
        url: "/ajax/getreplies",
        data:'keyword='+commentId,
        beforeSend: function(){
            // Nothing to send
        },
        success: function(data){
            console.log(data);
            $('#head-7').append('<ul>');
            for(let i=0;i<data[0].length;i++)
            {
                if(data[2][i] == userComment)
                {
                    user = 'chat me';
                }
                else{
                    user = 'chat them';
                }
                $('#head-7').append('<li class = "'+ user +'">'+'<b><p style="font-size:12px">'+ data[2][i] +'</p></b>'+data[0][i]+'</li>');
            }
            $('#head-7').append('</ul>');
            $("#head-7 li").each(function(i) {
            $(this).delay(1500 * i).fadeIn(500);
            });

        }
    });
}

function storyOut()
{
    $("#story").fadeOut();
    $("#head-2").fadeOut();
    $("#head-3").fadeOut();
    $("#head-4").fadeOut();
    $("#head-5").fadeOut();
    $("#head-6").fadeOut();
    $("#head-7").fadeOut();
    $("#refresh").fadeOut('fast');
}

$('#refresh').click(function() {
    storyOut();
    $("#head-1").fadeIn();
    $("#intro-icons").fadeIn();
    $("#head-7").html('');
    $("#head-6").html('');
});

$('#about').click(function() {
    
    $('#head-1').fadeOut();
    $('#about-content').fadeIn();
});

$('#back').click(function() {
    $('#about-content').fadeOut();
    $('#head-1').fadeIn();
})

// *
// *
// * MAIN EVENT STARTED
// *
// *
storyOut();
$('.carousel.carousel-slider').carousel({fullWidth: true});
show('#head-1', 1000);

document.getElementById('main-input').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
        $("#head-1").fadeOut();
        $("#intro-icons").fadeOut();
        $("#story").fadeIn();
        $("#head-2").html('This is the tale of  ... ').fadeIn();
        var user;
        $.ajax({
            type: "GET",
            url: "/ajax/getuser",
            data:'keyword='+$(this).val(),
            beforeSend: function(){
                // Nothing to send
            },
            success: function(data){
                if(data == 'no')
                {
                    console.log("NO");    
                    Materialize.toast('Wrong Username', 4000);
                    $("#head-1").fadeIn();
                    $("#head-2").fadeOut();
                    $("#story").fadeOut();
                }
                else
                {
                    $("#refresh").fadeIn();
                    user = data;
                    console.log(data['name']);
                    $("#head-3").html(data['name']+'  ...  ').fadeIn();
                    $("#head-4").html('who posted one post').fadeIn();
                }
                //$("#image").append('<img src="'+data+'"/>'); 
                $.ajax({
                    type: "GET",
                    url: "/ajax/getpost",
                    data:'keyword='+user['id'],
                    beforeSend: function(){
                    // Nothing to send
                },
                success: function(data){
                    console.log(data);
                    $("#head-2").fadeOut('slow');
                    $("#head-3").fadeOut('slow');
                    $("#head-4").fadeOut('slow');
                    $('#head-5').html('<p>'+data[0]+'</p>').fadeIn();
                    if(data[1] != '')
                    {
                        $('#head-5').append('<img src = "' + data[1] + '" style="width: auto;height:500px;"><br>').fadeIn();
                    }
                    else
                    {
                        $('#head-5').append('').fadeIn();
                    }
                    var postid = data[2];
                $.ajax({
                    type: "GET",
                    url: "/ajax/getcomments",
                    data:'keyword='+postid,
                    beforeSend: function(){
                    // Nothing to send
                },
                success: function(data){
                    console.log(data);
                    $('#head-6').append('<p class = "flow-text">And from ' + data[0] + ' comments someone named '+ data[1]['from']['name'] + ' commented ...').delay(3000).fadeIn();
                    console.log(data[1]['message']);
                    $('#head-7').append('<p class = "flow-text">" '+data[1]['message']+ ' "</p>').delay(7000).fadeIn();
                    
                     $(this).delay(9000).queue(function() {

                        showReplies(data[1]['id'], data[1]['from']['name']);

                        $(this).dequeue();

                        });
                }
            });
                }
            });
            }
        });
      return false;
    }
  }
});