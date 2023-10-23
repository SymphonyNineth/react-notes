import { Card, CardBody, Stack } from 'react-bootstrap';
import { INote } from '../../types';
import { Link } from 'react-router-dom';
import styles from './NoteCard.module.css';
import TagBadges from '../TagBadges';

interface NoteCardProps {
  note: INote;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const { id, title, tags } = note;
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <CardBody>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <TagBadges
              position="center"
              tags={tags}
            />
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NoteCard;
