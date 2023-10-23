import { FormEvent, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Stack,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { INote, INoteData, ITag } from '../types';
import TagsSelect from './TagsSelect';
import useNote from '../hooks/useNote';

interface NoteFormProps<T extends INoteData> {
  availableTags: ITag[];
  onSubmit: (noteData: T) => void;
  onAddTag: (tag: ITag) => void;
}

function NoteForm<T extends INoteData | INote>({
  availableTags,
  onSubmit,
  onAddTag,
}: NoteFormProps<T>) {
  const note = useNote();

  const [selectedTags, setSelectedTags] = useState<ITag[]>(note?.tags ?? []);
  const [title, setTitle] = useState(note?.title ?? '');
  const [markdown, setMarkdown] = useState(note?.markdown ?? '');

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (note) {
      onSubmit({ id: note.id, title, tags: selectedTags, markdown } as T);
    } else {
      onSubmit({
        title,
        markdown,
        tags: selectedTags,
      } as T);
    }

    navigate('..');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <FormGroup controlId="title">
              <FormLabel>Title</FormLabel>
              <FormControl
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col>
            <TagsSelect
              availableTags={availableTags}
              selectedTags={selectedTags}
              editMode
              onAddTag={onAddTag}
              setSelectedTags={setSelectedTags}
            />
          </Col>
        </Row>
        <FormGroup controlId="markdown">
          <FormLabel>Body</FormLabel>
          <FormControl
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            required
            as="textarea"
            rows={15}
          />
        </FormGroup>
        <Stack
          direction="horizontal"
          className="justify-content-end"
          gap={2}
        >
          <Button
            type="submit"
            variant="primary"
          >
            Save
          </Button>
          <Link to="..">
            <Button
              type="button"
              variant="outline-secondary"
            >
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NoteForm;
