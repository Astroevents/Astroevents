console.log("entrando");
function getPokemonInfo(id) {
  $.ajax({
    url: "https://api.nasa.gov/planetary/apod?api_key=A2WsxudHGixiEWIX6tMDmCKa0SiyIUN9NENLN0WK" + id,
    method: "GET",
    success: function (response) {
      console.log(response);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

$("#pokeButton").on('click', function(){
  getPokemonInfo(1);
});
