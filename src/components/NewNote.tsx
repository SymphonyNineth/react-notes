import { INoteData, ITag } from '../types';
import NoteForm from './NoteForm';

interface NewNoteProps {
  availableTags: ITag[];
  onSubmit: (noteData: INoteData) => void;
  onAddTag: (tag: ITag) => void;
}

const NewNote = ({ availableTags, onSubmit, onAddTag }: NewNoteProps) => {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onAddTag={onAddTag}
        onSubmit={onSubmit}
        availableTags={availableTags}
      />
    </>
  );
};

export default NewNote;
