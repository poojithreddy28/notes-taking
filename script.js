const addbtn = document.querySelector("#addbtn");
const main = document.querySelector("#main");

addbtn.addEventListener("click",addNote);

function addNote(){
    const note=document.createElement("div");
    note.classList.add("note");
    note.innerHTML =
    `
    <div class="tool">
        <i class="save fa-solid fa-cloud"> </i>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea class="" name="" id=""> </textarea>
    `;

    const save = note.querySelector(".save");
    const trash = note.querySelector(".trash");
    const textarea = note.querySelector("textarea");

    save.addEventListener("click",saveNotes);
    textarea.addEventListener("input",saveNotes);
    trash.addEventListener("click",()=>{
        note.remove("notes");
        saveNotes();
    })
    main.appendChild(note);

}

function saveNotes(){
    const notes = document.querySelectorAll(".note textarea");
    const data = Array.from(notes).map(note=>note.value);
    console.log(notes,data);
    if(data.length===0){
        localStorage.removeItem(notes);
    }
    else{
        localStorage.setItem("notes",JSON.stringify(data));
    }
}
function loadNotes(){
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    if(lsNotes !== null && lsNotes.length > 0){
        lsNotes.forEach(Element => {
            addNote();
            const notes = document.querySelectorAll(".note textarea");
            const lastNote = notes[notes.length - 1];
            lastNote.value = Element;
        });
    }
    else{
        addNote();
    }
}

loadNotes();