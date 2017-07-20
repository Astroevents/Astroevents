$(function(){
  $('#voting').on('click', function(e){
    var assistantInfo = {
      user: currentUser.user._id,
      event: currentUser.event._id
    };
    console.log(assistantInfo);
    $.post('/events/'+currentUser.event._id+'/assist', assistantInfo)
      .then( response => {
        console.log(response);
        $("#assistans-count").html(response.length);
        newAssistant = '<img class="assistant-img" id="imagen" src="'+response[response.length-1].userID.imgUrl+'"></img>'
        $(".assistans-wrapper").append(newAssistant);
        $("#voting").attr("disabled",true)
      });
    });
});
