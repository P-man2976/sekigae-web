import {
  Flex,
  VStack,
  Text,
  HStack,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { SeatColumn } from "../components/seats/SeatColumn";
import { FiLoader, FiPlus, FiRefreshCcw } from "react-icons/fi";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Random } from "../utils/random";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { MotionFlex, MotionStack } from "../components/motion/Motion";

export const Home = () => {
  const [room, setRoom] = useState<Seat[][]>(
    JSON.parse(localStorage.getItem("room") || "[]")
  );
  const [nameList, setNameList] = useState<Student[]>(
    JSON.parse(localStorage.getItem("nameList") || "[]")
  );

  const [isReversed, setIsReversed] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  // for (const col of room) {
  //   for (const row of col) {
  //     row.student = undefined;
  //     if (row.disabled)
  //       continue;

  //     const student =
  //       tmpNameList[random.nextInt(0, tmpNameList.length - 1)];
  //     row.student = student;
  //     tmpNameList = tmpNameList.filter((name) => name !== student);
  //   }
  // }

  const seatCount = useMemo(() => {
    let count = {
      enabled: 0,
      disabled: 0,
    };
    for (const col of room) {
      for (const row of col) {
        row.disabled ? count.disabled++ : count.enabled++;
      }
    }
    return count;
  }, [room]);

  const onAddCol = useCallback(() => {
    setRoom((oldRoom) => [
      ...oldRoom,
      [
        {
          index: 0,
        },
      ],
    ]);
  }, []);

  const onAddRow = useCallback(
    (index: number) => {
      // setRoom((oldRoom) => {
      //   const newRoom = [...oldRoom];
      //   newRoom[index].push({
      //     index: newRoom[index].length,
      //   });
      //   console.log("state refreshed");
      //   return newRoom;
      // });
      const newRoom = [...room];
      newRoom[index].push({
        index: newRoom[index].length,
      });
      setRoom(newRoom);
    },
    [room]
  );

  const onDelRow = useCallback(
    (index: number, rowIndex: number) => {
      // setRoom((oldRoom) => {
      //   const newRoom = [...oldRoom];
      //   newRoom[index].splice(rowIndex, 1);
      //   return newRoom;
      // });
      const newRoom = [...room];
      newRoom[index].splice(rowIndex, 1);
      setRoom(newRoom);
    },
    [room]
  );

  const onReset = useCallback(
    (index: number) => {
      // setRoom((oldRoom) => {
      //   const newRoom = [...oldRoom];
      //   newRoom.splice(index, 1);
      //   return newRoom;
      // });
      const newRoom = [...room];
      newRoom.splice(index, 1);
      setRoom(newRoom);
    },
    [room]
  );

  const onDisableToggle = useCallback(
    (index: number, rowIndex: number) => {
      // setRoom((oldRoom) => {
      //   const newRoom = [...oldRoom];
      //   newRoom[index][rowIndex].disabled = !!!newRoom[index][rowIndex].disabled;
      //   console.log(newRoom[index][rowIndex].disabled)
      //   return newRoom;
      // })
      const newRoom = [...room];
      newRoom[index][rowIndex].disabled = !!!newRoom[index][rowIndex].disabled;
      setRoom(newRoom);
    },
    [room]
  );

  useEffect(() => {
    localStorage.setItem("room", JSON.stringify(room));
  }, [room]);

  useEffect(() => {
    localStorage.setItem("nameList", JSON.stringify(nameList));
  }, [nameList]);

  useEffect(() => {
    if (searchParams.has("seed")) {
      setRoom((oldRoom) => {
        console.log("Change seat!");
        let tmpNameList = [...nameList];
        const random = new Random(Number(searchParams.get("seed")));
        const newRoom = [...oldRoom];
        for (const col of newRoom) {
          for (const row of col) {
            row.student = undefined;
            if (row.disabled) {
              continue;
            }
            const student =
              tmpNameList[random.nextInt(0, tmpNameList.length - 1)];
            row.student = student;
            tmpNameList = tmpNameList.filter((name) => name !== student);
          }
        }
        return newRoom;
      });
    }
  }, [searchParams, nameList]);

  return (
    <Flex minH="100vh" minW="100vw" p={12} justify="flex-start" align="center">
      <AnimatePresence>
        <MotionStack
          layout
          p={32}
          pb={40}
          spacing={8}
          direction={isReversed ? "column-reverse" : "column"}
        >
          <LayoutGroup>
            <MotionFlex
              layout
              w="100%"
              justify="center"
              p={4}
              color="white"
              bg="green"
              rounded="lg"
              fontSize="2xl"
              fontWeight={600}
            >
              黒板
            </MotionFlex>
            <MotionStack
              layout
              transition={{}}
              align="flex-start"
              direction={isReversed ? "row-reverse" : "row"}
            >
              {room?.map((seatCol: Seat[], index) => (
                <SeatColumn
                  col={seatCol}
                  onAddRow={onAddRow}
                  onDelRow={onDelRow}
                  onReset={onReset}
                  onDisableToggle={onDisableToggle}
                  index={index}
                  key={index}
                  reversed={isReversed}
                />
              ))}
              <MotionFlex
                layout
                minH="100%"
                flex={1}
                align="center"
                rounded="lg"
                p={2}
              >
                <Button leftIcon={<FiPlus />} onClick={onAddCol}>
                  列を追加
                </Button>
              </MotionFlex>
            </MotionStack>
          </LayoutGroup>
        </MotionStack>
      </AnimatePresence>
      <HStack
        bg="float"
        position="fixed"
        top={0}
        right={0}
        m={4}
        p={8}
        shadow="lg"
        rounded="xl"
        align="center"
        justify="center"
      >
        <input
          hidden
          type="file"
          ref={inputRef}
          accept=".json"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return;
            const reader = new FileReader();
            reader.onload = () => {
              setNameList(
                JSON.parse(
                  typeof reader.result === "string" ? reader.result : "[]"
                )
              );
            };
            reader.readAsText(e.target.files[0]);
          }}
        />
        <Button
          leftIcon={<FiPlus />}
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          名簿読み込み
        </Button>
        <IconButton
          aria-label="reverse"
          icon={<FiRefreshCcw />}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        />
        <IconButton
          aria-label="reset"
          icon={<FiLoader />}
          onClick={() => {
            setRoom(
              room.map((col) =>
                col.map((row) => ({ ...row, student: undefined }))
              )
            );
            setSearchParams({});
          }}
        />
        <ColorModeSwitcher />
      </HStack>
      <VStack
        bg="float"
        position="fixed"
        bottom={0}
        right={0}
        spacing={4}
        m={4}
        p={8}
        shadow="lg"
        rounded="xl"
        align="center"
        justify="center"
      >
        <HStack spacing={8}>
          <VStack align="flex-start" spacing={2}>
            <Text fontSize="4xl" fontWeight={600}>
              {seatCount.enabled}
            </Text>
            <Text>有効席数</Text>
          </VStack>
          <VStack align="flex-start" spacing={2}>
            <Text fontSize="4xl" fontWeight={600}>
              {seatCount.disabled}
            </Text>
            <Text>無効席数</Text>
          </VStack>
          <VStack align="flex-start" spacing={2}>
            <Text fontSize="4xl" fontWeight={600}>
              {nameList.length}
            </Text>
            <Text>名簿内人数</Text>
          </VStack>
        </HStack>

        <Button
          variant="solid"
          colorScheme="blue"
          w="100%"
          onClick={() => {
            searchParams.set("seed", Date.now().toString());
            setSearchParams(searchParams);
          }}
        >
          席替え
        </Button>
        {/* <Stat>
          <StatNumber>{seatCount}</StatNumber>
          <StatLabel>総席数</StatLabel>
        </Stat> */}
      </VStack>
    </Flex>
  );
};
