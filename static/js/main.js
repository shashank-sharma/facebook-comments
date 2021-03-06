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

// *
// * Autocomplete makes one AJAX calls
// *
function autoComplete()
{
    $.ajax({
        type: "GET",
        url: "/ajax/suggestionname",
        //data:'keyword='+$(this).val(),
        beforeSend: function(){
            // Nothing to send
        },
        success: function(someData){
            var data = {}
            for(i=0;i<someData.length;i++)
            {
                data[someData[i]] = null;
            }
            $('input.autocomplete').autocomplete({
            data: data,
        });
            var name = someData[Math.floor((Math.random() * someData.length) + 0)];
        $('input').attr('placeholder', name);
        }
    });
}

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
                $('#head-7').append('<li style = "list-style-type: none;" class = "lii '+ user +'">'+'<b><p style="font-size:12px">'+ data[2][i] +'</p></b>'+data[0][i]+'</li>');
            }
            $('#head-7').append('</ul>');
            $("#head-7 li").each(function(i) {
            $(this).delay(1500 * i).fadeIn(500);
            });

        }
    });
}

function getClap(cs)
{
    $.ajax({
        type: "GET",
        url: "/ajax/getclap",
        success: function(data) {
        var clap = data;
        $('#clap-count').html('<center>'+(parseInt(clap)+cs)+'</center>');
        var clap = clap + cs;
        $(this).addClass("pulse");
        $.ajax({
            type: "GET",
            url: "/ajax/clap",
            data:'keyword='+clap,
            success: function(data) {
            $('#clap-count').html('<center>'+data+'</center>');
            }
        });
            setTimeout(function() {    
            $('#clap').removeClass("pulse");
            }, 500);
        }
    });
}

var count = 0;
function updateClap()
{
    var clap = $("#clap-count").text();
    count += 1;
    $('#clap-count').html('<center>'+(parseInt(clap)+1)+'</center>');
}

    $("#clap").mousedown(function() {
        count = 0;
        $(this).addClass("pulse");
        int = setInterval(updateClap, 200);
    }).mouseup(function() {
        clearInterval(int);
        var clap = getClap(count);
        setTimeout(function() {    
        $('#clap').removeClass("pulse");
        }, 500); 
    });

$('.fixed-action-btn').on( 'click', '#clap', function() {
    if(count == 0)
    {
    getClap(1);
    }
});

function clapcount()
{
    $.ajax({
        type: "GET",
        url: "/ajax/getclap",
        success: function(data) {
        $('#clap-count').html('<center>'+data+'</center>');
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
    autoComplete();
    storyOut();
    $("#head-1").fadeIn();
    $("#intro-icons").fadeIn();
    $("#head-7").html('');
    $("#head-6").html('');
    $('input').value('');
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
clapcount();
autoComplete();
storyOut();
$('.carousel.carousel-slider').carousel({fullWidth: true});
show('#head-1', 1000);

document.getElementById('main-input autocomplete-input').onkeypress = function(e){
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
                    Materialize.toast('Wrong Username', 4000);
                    $("#head-1").fadeIn();
                    $("#head-2").fadeOut();
                    $("#story").fadeOut();
                }
                else
                {
                    $("#refresh").fadeIn();
                    user = data;
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
                    $('#head-6').append('<p class = "flow-text">And from ' + data[0] + ' comments someone named '+ data[1]['from']['name'] + ' commented ...').delay(3000).fadeIn();
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