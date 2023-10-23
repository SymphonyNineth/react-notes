import { Button, Col, Row } from 'react-bootstrap';
import useNote from '../hooks/useNote';
import TagBadges from './TagBadges';
import { Link, useNavigate } from 'react-router-dom';
import ButtonRow from './ButtonRow';
import { INote } from '../types';
import Markdown from './Markdown';

interface NoteProps {
  onRemove: (id: string) => void;
}

const Note = ({ onRemove }: NoteProps) => {
  const { title, markdown, tags, id } = useNote() as INote;
  const navigate = useNavigate();
  const handleRemove = () => {
    onRemove(id);
    navigate('/');
  };
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{title}</h1>
          <TagBadges tags={tags} />
        </Col>
        <ButtonRow>
          <Link to="edit">
            <Button variant="primary">Edit</Button>
          </Link>
          <Button
            onClick={handleRemove}
            variant="outline-danger"
          >
            Delete
          </Button>
          <Link to="/">
            <Button variant="outline-secondary">Back</Button>
          </Link>
        </ButtonRow>
      </Row>
      <Markdown>{markdown}</Markdown>
    </>
  );
};

export default Note;
