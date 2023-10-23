import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import NewNote from './components/NewNote';
import { INote, INoteData, IRawNote, ITag } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import NoteList from './components/NoteList';
import NoteLayout from './components/NoteLayout';
import Note from './components/Note';
import EditNote from './components/EditNote';

function App() {
  const [rawNotes, setRawNotes] = useLocalStorage<IRawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<ITag[]>('TAGS', []);

  const notes = useMemo(
    () =>
      rawNotes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      })),
    [rawNotes, tags]
  );

  const handleCreateNode = ({ tags, ...data }: INoteData) => {
    setRawNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: uuid(), tagIds: tags.map((tag) => tag.id) },
    ]);
  };

  const addTag = (tag: ITag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const updateTag = (tag: ITag) => {
    setTags((prevTags) =>
      prevTags.map((prevTag) => (prevTag.id === tag.id ? tag : prevTag))
    );
  };

  const removeTag = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  const handleUpdateNote = ({ id, tags, ...data }: INote) => {
    setRawNotes((prevNotes) =>
      prevNotes.map((prevNote) =>
        prevNote.id === id
          ? { ...data, id, tagIds: tags.map((tag) => tag.id) }
          : prevNote
      )
    );
  };

  const handleRemoveNote = (id: string) => {
    setRawNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              availableTags={tags}
              notes={notes}
              onUpdateTag={updateTag}
              onRemoveTag={removeTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              availableTags={tags}
              onAddTag={addTag}
              onSubmit={handleCreateNode}
            />
          }
        />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
        <Route
          path="/:id"
          element={<NoteLayout notes={notes} />}
        >
          <Route
            index
            element={<Note onRemove={handleRemoveNote} />}
          />
          <Route
            path="edit"
            element={
              <EditNote
                availableTags={tags}
                onAddTag={addTag}
                onSubmit={handleUpdateNote}
              />
            }
          />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
