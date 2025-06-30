var popupoverlay = document.getElementById("popupoverlay");
var popupbox = document.getElementById("popupbox");
var addpopbtn = document.getElementById("addpopbtn");

addpopbtn.addEventListener("click", function () {
  popupbox.style.display = "block";
  popupoverlay.style.display = "block";
});


var cancelpop = document.getElementById("cancelpop");
cancelpop.addEventListener("click", function (event) {
  event.preventDefault();
  popupbox.style.display = "none";
  popupoverlay.style.display = "none";
});
var container = document.querySelector(".container");
var addpop = document.getElementById("addpop");
var notes = document.getElementById("notes");

window.onload = function () {
  let savedNotes = JSON.parse(localStorage.getItem("notesApp")) || [];
  savedNotes.forEach(function (noteText) {
    createNote(noteText);
  });
};
addpop.addEventListener("click", function (event) {
  event.preventDefault();
  let noteText = notes.value.trim();
  if (noteText) {
    createNote(noteText);
    saveNoteToStorage(noteText);
    notes.value = "";
  }
  popupbox.style.display = "none";
  popupoverlay.style.display = "none";
});
function createNote(noteText) {
  var div = document.createElement("div");
  div.setAttribute("class", "Notescontainer");
  div.innerHTML = `
    <p>${noteText}</p>
    <button class="deletebtn">Delete</button>
  `;
  container.append(div);

  div.querySelector(".deletebtn").addEventListener("click", function () {
    div.remove();
    removeNoteFromStorage(noteText);
  });
}

function saveNoteToStorage(noteText) {
  let savedNotes = JSON.parse(localStorage.getItem("notesApp")) || [];
  savedNotes.push(noteText);
  localStorage.setItem("notesApp", JSON.stringify(savedNotes));
}


function removeNoteFromStorage(noteText) {
  let savedNotes = JSON.parse(localStorage.getItem("notesApp")) || [];
  let updatedNotes = savedNotes.filter(note => note !== noteText);
  localStorage.setItem("notesApp", JSON.stringify(updatedNotes));
}
