import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react"
import styles from '~/styles/note-details.css'
import { getStoredNotes } from '../data/notes';

function NoteDetailsPage() {
  const note = useLoaderData();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes.</Link>
        </nav>
        <h1>{ note.title }</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  )
}

export async function loader({ params }) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note) => note.id === noteId);

  if (!selectedNote) {
    throw json(
      {
        message: `Couldn't find note for is ${noteId}`,
      },
      {
        status: 404,
        // statusText: 'Not Found'
      }
    );
  }

  return selectedNote;
}

export default NoteDetailsPage

export function links() {
  return [{
    rel: 'stylesheet',
    href: styles
  }]
}

export function meta(data) {
  return {
    title: data.data.title,
    description: 'Manage your notes with ease.'
  };    
}