import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { INote, ITag } from '../types';
import { Link } from 'react-router-dom';
import TagsSelect from './TagsSelect';
import { useMemo, useState } from 'react';
import NoteCard from './NoteCard/NoteCard';
import ButtonRow from './ButtonRow';
import EditTagsModal from './EditTagsModal';

interface NoteListProps {
  notes: INote[];
  availableTags: ITag[];
  onRemoveTag: (id: string) => void;
  onUpdateTag: (tag: ITag) => void;
}

const NoteList = ({
  notes,
  availableTags,
  onUpdateTag,
  onRemoveTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [title, setTitle] = useState('');
  const [showEditTagsModal, setShowEditTagsModal] = useState(false);

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          (title.length === 0 ||
            note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
          (selectedTags.length === 0 ||
            selectedTags.every((selectedTag) =>
              note.tags.some((tag) => tag.id === selectedTag.id)
            ))
      ),
    [title, selectedTags, notes]
  );

  const openEditTagsModal = () => {
    setShowEditTagsModal(true);
  };

  const closeEditTagsModal = () => {
    setShowEditTagsModal(false);
  };

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <ButtonRow>
          <Link to="/new">
            <Button variant="primary">Create</Button>
          </Link>
          <Button
            variant="outline-secondary"
            onClick={openEditTagsModal}
          >
            Edit Tags
          </Button>
        </ButtonRow>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <FormGroup controlId="title">
              <FormLabel>Title</FormLabel>
              <FormControl
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <TagsSelect
              availableTags={availableTags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </Col>
        </Row>
      </Form>
      <Row
        xs={1}
        sm={2}
        lg={3}
        xl={4}
        className="g-3"
      >
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        show={showEditTagsModal}
        tags={availableTags}
        onUpdateTag={onUpdateTag}
        onRemoveTag={onRemoveTag}
        onClose={closeEditTagsModal}
      />
    </>
  );
};

export default NoteList;
