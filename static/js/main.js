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

show('#head-1', 1000);

document.getElementById('main-input').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
        $.ajax({
            type: "GET",
            url: "/ajax/getpage",
            data:'keyword='+$(this).val(),
            beforeSend: function(){
                // Nothing to send
            },
            success: function(data){
                console.log(data);
                $("#name-suggestion").html('');
                $("#image").append('<img src="'+data+'"/>');
                //$("#name-suggestion").html('');
                //for(var i=0; i<data.length; i++)
                //{
                //    $("#name-suggestion").append('<option value="'+data[i]+'">');
                //}
            }
        });
      return false;
    }
  }

});