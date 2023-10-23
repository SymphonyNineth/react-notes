import { INote, ITag } from '../types';
import NoteForm from './NoteForm';

interface EditNoteProps {
  availableTags: ITag[];
  onSubmit: (noteData: INote) => void;
  onAddTag: (tag: ITag) => void;
}

const EditNote = ({ availableTags, onSubmit, onAddTag }: EditNoteProps) => {
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        onAddTag={onAddTag}
        onSubmit={onSubmit}
        availableTags={availableTags}
      />
    </>
  );
};

export default EditNote;
