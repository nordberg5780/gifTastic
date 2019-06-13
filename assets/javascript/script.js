$(document).ready(function(){
    function who(){
        $('button').on('click', function() { 
            var doctor = $(this).data('name');
           //connects to giphy to retreive images
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + doctor + "&api_key=706366aca6d647718a5c439725cd93a8&limit=10";
            $.ajax({
                url: queryURL,
                method: 'GET'
            })
            //animates giphys and freezes them
            .done(function(response) {
                console.log(response)
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var doctorDiv = $('<div/>');
                    var p =$('<p/>');
                    p.text(results[i].rating);
                    var doctorImage = $('<img/>');
                    doctorImage.addClass('anImg')
                    doctorImage.attr('src', results[i].images.fixed_height_still.url);
                    doctorImage.attr('data-still', results[i].images.fixed_height_still.url)
                    doctorImage.attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', 'still');
                    doctorDiv.append(p);
                    doctorDiv.append(doctorImage);
                    doctorDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function() {
                    var state = $(this).attr('data-state'); 
                    console.log(this);
                    if (state == 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {                            
                        $(this).attr('src', $(this).data('still'));                   
                        $(this).attr('data-state', 'still');
                    }      
                });
            });
        });
    }

    who();
    console.log("document ready")

    

    // Adds GIF Search buttons
    $('#theButton').on('click', function(){
        event.preventDefault();        
        console.log("adding a button")
        var doctorButton = $("#gif-input").val();
        var newButton = $("<button/>").addClass( "doctor").attr('data-name',doctorButton).html(doctorButton);
        $("#doctorbuttons").append(newButton);
        who();
        console.log("yeaaa");
    });
});