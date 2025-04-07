class NoteItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="note">
        <h3>${this.getAttribute("title")}</h3>
        <p>${this.getAttribute("body")}</p>
        <small>Created At: ${new Date(this.getAttribute("createdAt")).toLocaleString()}</small>
        <br/>
        <button class="delete-button">Hapus</button>
      </div>
    `;

    // Tambahkan event untuk tombol hapus
    this.querySelector(".delete-button").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("deleteNote", {
        bubbles: true,
        detail: { id: this.getAttribute("id") }
      }));
    });
  }
}

if (!customElements.get("note-item")) {
  customElements.define("note-item", NoteItem);
}

export default NoteItem;
