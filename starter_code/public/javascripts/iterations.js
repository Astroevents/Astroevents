
function addAssitans(){
let assistInfo = {
  user:currentUser.user._id,
  event: currentUser.event._id
};
console.log(currentUser.user._id);

// Make a POST request
 $.ajax({
   method:  'POST',
   url:     'http://localhost:3000/events/'+currentUser.event._id+'/assist',
   data:    assistInfo,
   success: showFeedback,
   error:   handleError
 });


function showFeedback (postResponse) {
 console.log('post success');
 console.log(postResponse);
 $("#assistans-count").html(postResponse.length);
 $(".assistant-img").append(src="<%=assistant.userID.imgUrl%>");
}

function handleError (err) {
 console.log('Oh no! Error:');
 console.log(err);
}

}
