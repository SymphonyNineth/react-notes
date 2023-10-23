import { Navigate, Outlet, useParams } from 'react-router-dom';
import { INote } from '../types';

interface NoteLayoutProps {
  notes: INote[];
}

const NoteLayout = ({ notes }: NoteLayoutProps) => {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);
  if (!note) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }
  return <Outlet context={note} />;
};

export default NoteLayout;
