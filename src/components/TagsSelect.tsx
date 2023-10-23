import { FormGroup, FormLabel } from 'react-bootstrap';
import reactSelect from 'react-select';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuid } from 'uuid';
import { ITag } from '../types';

interface TagsSelect {
  editMode?: boolean;
  availableTags: ITag[];
  selectedTags: ITag[];
  onAddTag?: (tag: ITag) => void;
  setSelectedTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}

const TagsSelect = ({
  editMode,
  availableTags,
  selectedTags,
  onAddTag,
  setSelectedTags,
}: TagsSelect) => {
  const SelectComponent = editMode ? CreatableReactSelect : reactSelect;

  const mapTags = (tags: ITag[]) =>
    tags.map((tag) => ({ label: tag.label, value: tag.id }));

  return (
    <FormGroup controlId="tags">
      <FormLabel>Tags</FormLabel>
      <SelectComponent
        isMulti
        value={mapTags(selectedTags)}
        onChange={(tags) => {
          setSelectedTags(
            tags.map((tag) => ({ label: tag.label, id: tag.value }))
          );
        }}
        options={mapTags(availableTags)}
        onCreateOption={(label: string) => {
          const newTag = { label, id: uuid() };
          onAddTag?.(newTag);
          setSelectedTags((prev) => [...prev, newTag]);
        }}
      />
    </FormGroup>
  );
};

export default TagsSelect;
