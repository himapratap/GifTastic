var cartoons = ['tom and jerry', 'bluto', 'popeye', 'scooby-doo'];
$(document).ready(function() {


    function renderButtons() {
        console.log("rendering buttons..")
        $('.buttonArea').empty();
        for (var i = 0; i < cartoons.length; i++) {
            //create new buttons for each cartoon in the array
            var cartoonButton = $('<button>');
            cartoonButton.addClass('btn btn-success cartoonButton');
            cartoonButton.data('name', cartoons[i]);
            cartoonButton.text(cartoons[i]);

            // add button to button addArea
            $('.buttonArea').append(cartoonButton);

        }
        console.log("rendered buttons..")

    }

    function showGif() {
        var name = $(this).data("name");
        console.log('showing gifs for ' + name);
        var myUrl = 'https://api.giphy.com/v1/gifs/search?q=' + name + '&api_key=dc6zaTOxFJmzC&limit=10';
        $.ajax({
            url: myUrl,
            method: 'GET'
        }).done(
            function(response) {
                console.log('retrieved the gifs for ' + name);
                var data = response.data;
                $('.display').empty();
                var row = $("<div class= 'row'>");

                for (var i = 0; i < data.length; i++) {

                    if (data[i].rating !== "r" && data[i].rating !== "pg-13") {
                        var gify = data[i].images.fixed_height.url;
                        var still = data[i].images.fixed_height_still.url;

                        var gifyImg = $('<img class="gify">');
                        gifyImg.data("still", still);
                        gifyImg.data("animate", gify);
                        gifyImg.data("state", "animate");
                        gifyImg.attr('src', gify);
                        var imgBox = $('<div class = "imgBox col-sm-6">');
                        imgBox.append(gifyImg);
                        if (i % 2 == 0) {
                            row = $("<div class= 'row'>");
                        }
                        row.append(imgBox)
                        $('.display').append(row);
                    }


                }

                console.log(response);
            }
        );
    }


    $('.add').click(function(event) {
        //prevent default behaviour of submit[add] button
        event.preventDefault();
        var name = $('#cartoonName').val().trim();
        if (name != "") {
            console.log('new button to be added' + name);
            cartoons.push(name);
            $('#cartoonName').val("");
            renderButtons();
        }



    });

    function changeState() {
        console.log('changing my state..');
        var state = $(this).data('state');
        if (state == 'animate') {
            $(this).attr('src', $(this).data('still'));
            $(this).data('state', 'still');
        } else {
            $(this).attr('src', $(this).data('animate'));
            $(this).data('state', 'animate');
        }
    }

    $(document).on("click", ".cartoonButton", showGif);
    $(document).on("click", ".gify", changeState);

    renderButtons();
});
