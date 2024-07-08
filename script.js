var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

// schedule

//profile
document.getElementById('upload-image').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('profile-pic').src = e.target.result;
      localStorage.setItem('profilePic', e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('profile-name').addEventListener('input', function(event) {
  const name = event.target.textContent;
  localStorage.setItem('profileName', name);
});

// Set initial values from localStorage if available
document.addEventListener('DOMContentLoaded', function() {
  const storedName = localStorage.getItem('profileName');
  if (storedName) {
    document.getElementById('profile-name').textContent = storedName;
  }

  const storedPic = localStorage.getItem('profilePic');
  if (storedPic) {
    document.getElementById('profile-pic').src = storedPic;
  }
});



//mobile


document.getElementById('toggle-button').addEventListener('click', function() {
  const targetDiv = document.getElementById('target-div');
  if (targetDiv.style.visibility === 'hidden') {
      targetDiv.style.visibility = 'visible';
  } else {
      targetDiv.style.visibility = 'hidden';
  }
});