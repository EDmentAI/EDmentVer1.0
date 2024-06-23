document.addEventListener('DOMContentLoaded', (event) => {
    loadNotes();
    
    // Add event listeners for text inputs and checkboxes to save automatically
    const textInputs = document.querySelectorAll('.note-text');
    const checkboxes = document.querySelectorAll('.note-check');

    textInputs.forEach(input => {
        input.addEventListener('input', saveNotes);
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', saveNotes);
    });
});

function saveNotes() {
    const notes = [];
    const noteElements = document.querySelectorAll('.note');

    noteElements.forEach(noteElement => {
        const noteText = noteElement.querySelector('.note-text').value;
        const noteCheck = noteElement.querySelector('.note-check').checked;
        notes.push({ text: noteText, checked: noteCheck });
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const noteElements = document.querySelectorAll('.note');
    noteElements.forEach((noteElement, index) => {
        if (notes[index]) {
            noteElement.querySelector('.note-text').value = notes[index].text;
            noteElement.querySelector('.note-check').checked = notes[index].checked;
        }
    });
}

function clearNotes() {
    const noteElements = document.querySelectorAll('.note');
    
    noteElements.forEach(noteElement => {
        noteElement.querySelector('.note-text').value = '';
        noteElement.querySelector('.note-check').checked = false;
    });

    // Clear the notes from local storage as well
    localStorage.removeItem('notes');
}
