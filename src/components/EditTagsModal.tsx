import {
  Button,
  Col,
  Form,
  FormControl,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Row,
  Stack,
} from 'react-bootstrap';
import { ITag } from '../types';

interface EditTagsModalProps {
  tags: ITag[];
  show: boolean;
  onClose: () => void;
  onRemoveTag: (id: string) => void;
  onUpdateTag: (tag: ITag) => void;
}

const EditTagsModal = ({
  tags,
  show,
  onClose,
  onRemoveTag,
  onUpdateTag,
}: EditTagsModalProps) => {
  const handleUpdateTag = (label: string, id: string) => {
    onUpdateTag({ id, label });
  };
  return (
    <Modal
      show={show}
      onHide={onClose}
    >
      <ModalHeader closeButton>
        <ModalTitle>Edit Tags</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Stack gap={2}>
            {tags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <FormControl
                    type="text"
                    value={tag.label}
                    onChange={(e) => handleUpdateTag(e.target.value, tag.id)}
                  ></FormControl>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => onRemoveTag(tag.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditTagsModal;
