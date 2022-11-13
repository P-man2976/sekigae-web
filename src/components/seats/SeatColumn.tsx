import { Button, useColorModeValue, IconButton } from "@chakra-ui/react";
import { LayoutGroup } from "framer-motion";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Seat } from "./Seat";
import { MotionStack } from "../motion/Motion";

export const SeatColumn = ({
  index,
  col,
  onAddRow,
  onDelRow,
  onReset,
  onDisableToggle,
  reversed,
}: {
  index: number;
  col: Seat[];
  onAddRow: any;
  onDelRow: any;
  onReset: any;
  onDisableToggle: any;
  reversed: boolean;
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // const [seatRow, setSeatRow] = useRecoilState(seatRowState(index));
  // const resetCol = useResetRecoilState(seatRowState(index));
  // const [seatRowIndex, setSeatRowIndex] = useRecoilState(seatRowIndexState);

  return (
    <MotionStack
      layout
      direction={reversed ? "column-reverse" : "column"}
      p={2}
      spacing={4}
      rounded="lg"
      borderStyle="solid"
      borderWidth={1}
      borderColor="transparent"
      _hover={{
        borderColor: borderColor,
      }}
    >
      <LayoutGroup>
        {col?.map((seat, rowIndex) => (
          <Seat
            {...seat}
            index={rowIndex}
            key={`${index}-${rowIndex}`}
            onDelete={() => {
              onDelRow(index, rowIndex);
            }}
            onDisableToggle={() => {
              onDisableToggle(index, rowIndex);
            }}
          />
        ))}
      </LayoutGroup>
      <MotionStack direction="row">
        <Button
          leftIcon={<FiPlus />}
          onClick={() => {
            onAddRow(index);
          }}
        >
          席を追加
        </Button>
        <IconButton
          variant="ghost"
          aria-label="delete-column"
          icon={<FiTrash />}
          colorScheme="red"
          onClick={() => {
            onReset(index);
          }}
        />
      </MotionStack>
    </MotionStack>
  );
};
