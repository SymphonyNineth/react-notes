import { Badge, Stack } from 'react-bootstrap';
import { ITag } from '../types';

interface TagBadgesProps {
  tags: ITag[];
  position?: 'center' | 'left' | 'right';
}

const TagBadges = ({ tags, position = 'left' }: TagBadgesProps) => {
  return (
    <Stack
      direction="horizontal"
      className={`justify-content-${position} flex-wrap`}
      gap={2}
    >
      {tags.map((tag) => (
        <Badge
          className="text-truncate mr-1"
          key={tag.id}
        >
          {tag.label}
        </Badge>
      ))}
    </Stack>
  );
};

export default TagBadges;
