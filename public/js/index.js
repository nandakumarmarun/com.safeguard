var path = location.protocol + "//" + location.host;
$(document).ready(function() {
  // jQuery code to handle click event
  $('.nav-link').click(function(e) {
      // e.preventDefault();
      // console.log(path)
      adminPage();
  });
});


const adminPage = async () => {
  location.href = path +"/HTML/login.html"
};