import { showLoading, hideLoading } from "../utils/loading.js";

class NoteForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.querySelector("#add-note").addEventListener("click", () => this.addNote());
  }

  async addNote() {
    const title = this.querySelector("#note-title").value.trim();
    const body = this.querySelector("#note-body").value.trim();

    if (!title || !body) {
      alert("Judul dan isi catatan tidak boleh kosong!");
      return;
    }

    try {
      showLoading();
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });

      const data = await response.json();
      if (data.status === "success") {
        this.querySelector("#note-title").value = "";
        this.querySelector("#note-body").value = "";
        document.dispatchEvent(new Event("noteAdded"));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert("Gagal menambahkan catatan: " + error.message);
    } finally {
      hideLoading();
    }
  }

  render() {
    this.innerHTML = `
      <div class="note-form">
        <input type="text" id="note-title" placeholder="Judul catatan" />
        <textarea id="note-body" placeholder="Isi catatan"></textarea>
        <button id="add-note">Tambah Catatan</button>
      </div>
    `;
  }
}

// ✅ Cegah error duplicate define
if (!customElements.get("note-form")) {
  customElements.define("note-form", NoteForm);
}
