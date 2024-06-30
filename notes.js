document.addEventListener('DOMContentLoaded', () => {
    loadNotesUnique();
    document.getElementById('addNoteBtn_rkrl').addEventListener('click', addNoteUnique);
});

function addNoteUnique() {
    const notesContainer = document.getElementById('notesContainer_aizv');
    const newNote = createNoteElementUnique();
    notesContainer.appendChild(newNote);
    attachNoteListenersUnique(newNote);
    saveNotesUnique();
}

function createNoteElementUnique(subject = '', details = '') {
    const note = document.createElement('div');
    note.className = 'note_wzti';
    note.innerHTML = `
        <input type="text" class="subject_vzyw" placeholder="Subject" value="${subject}">
        <div class="details_yrvb" contenteditable="true">${details}</div>
        <div class="toolbar_zssf">
            <button class="boldBtn_cfor">B</button>
            <button class="italicBtn_vsbj">I</button>
            <button class="linkBtn_ngez">Link</button>
            <button class="bulletedBtn_dlrv">• List</button>
            <input type="color" class="textColor_iydh" title="Change Text Color">
            <button class="underlineBtn_lcyu">U</button>
            <input type="color" class="bgColor_mnwj" title="Change Background Color">
        </div>
        <button class="deleteBtn_hwnh">Delete</button>
    `;
    return note;
}

function attachNoteListenersUnique(note) {
    const details = note.querySelector('.details_yrvb');
    note.querySelector('.boldBtn_cfor').addEventListener('click', () => {
        document.execCommand('bold');
        saveNotesUnique();
    });
    note.querySelector('.italicBtn_vsbj').addEventListener('click', () => {
        document.execCommand('italic');
        saveNotesUnique();
    });
    note.querySelector('.underlineBtn_lcyu').addEventListener('click', () => {
        document.execCommand('underline');
        saveNotesUnique();
    });
    note.querySelector('.linkBtn_ngez').addEventListener('click', () => {
        const url = prompt('Enter the URL:');
        if (url) {
            document.execCommand('createLink', false, url);
            saveNotesUnique();
        }
    });
    note.querySelector('.bulletedBtn_dlrv').addEventListener('click', () => {
        document.execCommand('insertUnorderedList');
        saveNotesUnique();
    });
    note.querySelector('.textColor_iydh').addEventListener('input', function() {
        document.execCommand('foreColor', false, this.value);
        saveNotesUnique();
    });
    note.querySelector('.bgColor_mnwj').addEventListener('input', function() {
        document.execCommand('hiliteColor', false, this.value);
        saveNotesUnique();
    });

    // Save notes when any input changes
    note.querySelector('.subject_vzyw').addEventListener('input', saveNotesUnique);
    details.addEventListener('input', saveNotesUnique);
    details.addEventListener('blur', saveNotesUnique);

    // Delete note
    note.querySelector('.deleteBtn_hwnh').addEventListener('click', () => {
        note.remove();
        saveNotesUnique();
    });
}

function saveNotesUnique() {
    const notes = [];
    document.querySelectorAll('.note_wzti').forEach(note => {
        const subject = note.querySelector('.subject_vzyw').value;
        const details = note.querySelector('.details_yrvb').innerHTML;
        notes.push({ subject, details });
    });
    localStorage.setItem('notesUnique', JSON.stringify(notes));
}

function loadNotesUnique() {
    const notesContainer = document.getElementById('notesContainer_aizv');
    notesContainer.innerHTML = ''; // Clear existing notes to prevent duplication
    const notes = JSON.parse(localStorage.getItem('notesUnique')) || [];
    notes.forEach(noteData => {
        const note = createNoteElementUnique(noteData.subject, noteData.details);
        notesContainer.appendChild(note);
        attachNoteListenersUnique(note);
    });
}
