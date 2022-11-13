import {
  Center,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FiEye, FiEyeOff, FiX } from "react-icons/fi";
import { MotionFlex } from "../motion/Motion";

type ClickEventHandler = React.MouseEventHandler<HTMLButtonElement>;
interface SeatProps extends Seat {
  onDelete: ClickEventHandler;
  onDisableToggle: ClickEventHandler;
}

export const Seat = ({
  index,
  classIndex,
  student,
  disabled,
  onDelete,
  onDisableToggle,
}: SeatProps) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const borderColor = useColorModeValue("gray.400", "gray.400");

  return (
    <MotionFlex
      layout
      role="group"
      h={32}
      w="100%"
      p={2}
      direction="column"
      rounded="lg"
      bg={disabled ? "blackAlpha.200" : "transparent"}
      borderStyle="solid"
      borderWidth={1}
      borderColor={borderColor}
      position="relative"
      _hover={{
        shadow: "lg",
      }}
    >
      <HStack
        transition="all .3s ease"
        opacity={0}
        position="absolute"
        top={0}
        right={0}
        _groupHover={{
          opacity: 1,
        }}
      >
        <IconButton
          variant="ghost"
          aria-label="disable seat"
          icon={disabled ? <FiEyeOff /> : <FiEye />}
          onClick={onDisableToggle}
        />
        <IconButton
          variant="ghost"
          aria-label="delete seat"
          icon={<FiX />}
          onClick={onDelete}
        />
      </HStack>
      {student && (
        <>
          {student.name || student.kana ? (
            <>
              <Text fontSize="xl">{student.index}</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {student.name}
              </Text>
              <Text fontSize="sm" color={textColor}>
                {student.kana}
              </Text>
            </>
          ) : (
            <Center flex={1}>
              <Text fontWeight="bold" fontFamily="Albert Sans" fontSize="6xl">
                {student.index}
              </Text>
            </Center>
          )}
        </>
      )}
    </MotionFlex>
  );
};
