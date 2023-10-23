import { ReactNode } from 'react';
import { Col, Stack } from 'react-bootstrap';
import { StackDirection } from 'react-bootstrap/esm/Stack';
import { ResponsiveUtilityValue } from 'react-bootstrap/esm/createUtilityClasses';
import { GapValue } from 'react-bootstrap/esm/types';

interface ButtonRowProps {
  gap?: ResponsiveUtilityValue<GapValue>;
  direction?: StackDirection;
  children: ReactNode;
}

const ButtonRow = ({
  gap = 2,
  direction = 'horizontal',
  children,
}: ButtonRowProps) => {
  return (
    <Col xs="auto">
      <Stack
        gap={gap}
        direction={direction}
      >
        {children}
      </Stack>
    </Col>
  );
};

export default ButtonRow;
