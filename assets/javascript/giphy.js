$(document).ready(function() {

    var myUrl = 'https://api.giphy.com/v1/gifs/search?q=tom+jerry&api_key=dc6zaTOxFJmzC&limit=10';
    $.ajax({
        url: myUrl,
        method: 'GET'
    }).done(
        function(response) {
            console.log("haai");
            var data = response.data;
            for (var i = 0; i < 3; i++) {

              if (data[i].rating !== "r" && data[i].rating !== "pg-13") {
                var gify = data[i].images.fixed_height.url;
                var gifyImg = $('<img class="col-sm-6">');
                gifyImg.attr('src', gify);
                $('.display').append(gifyImg);
              }


            }

            console.log(response);
        }
    );
});
