import "./styles.css";
import "./components/note-form.js";
import "./components/note-list.js";
import { showLoading, hideLoading } from "./utils/loading.js";

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");

  const form = document.createElement("note-form");
  const list = document.createElement("note-list");

  if (!app.querySelector("note-form")) app.appendChild(form);
  if (!app.querySelector("note-list")) app.appendChild(list);

  await fetchNotes();

  document.addEventListener("noteAdded", fetchNotes);

  // ✅ Dengarkan event penghapusan catatan
  document.addEventListener("noteDeleted", async (event) => {
    await deleteNote(event.detail.id);
  });
});

async function fetchNotes() {
  try {
    showLoading();
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
    const data = await response.json();

    if (data.status === "success") {
      document.querySelector("note-list").notesData = data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    alert(`Gagal mengambil data: ${error.message}`);
  } finally {
    hideLoading();
  }
}

async function deleteNote(id) {
  try {
    showLoading();
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (data.status === "success") {
      await fetchNotes();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    alert(`Gagal menghapus catatan: ${error.message}`);
  } finally {
    hideLoading();
  }
}
