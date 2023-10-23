import { useOutletContext } from 'react-router-dom';
import { INote } from '../types';

const useNote = () => useOutletContext<INote | null>();

export default useNote;
