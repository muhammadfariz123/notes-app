import "./note-item.js";

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.notes = [];
  }

  set notesData(notes) {
    this.notes = notes;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = "";
    this.notes.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.setAttribute("id", note.id); // Tambah id
      noteItem.setAttribute("title", note.title);
      noteItem.setAttribute("body", note.body);
      noteItem.setAttribute("createdAt", note.createdAt);

      // Dengarkan event hapus dari note-item
      noteItem.addEventListener("deleteNote", (event) => {
        this.dispatchEvent(new CustomEvent("noteDeleted", {
          detail: event.detail,
          bubbles: true
        }));
      });

      this.appendChild(noteItem);
    });
  }
}

if (!customElements.get("note-list")) {
  customElements.define("note-list", NoteList);
}

export default NoteList;
