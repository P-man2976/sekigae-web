type ClickEventHandler = React.MouseEventHandler<HTMLButtonElement>;

interface Seat {
  index: number;
  classIndex?: number;
  student?: Student;
  disabled?: boolean;
}

interface SeatCol {
  seat: Seat[];
}

interface Classroom {
  blackboard: "front" | "rear";
  isReversed: boolean;
  seatCol: SeatCol[];
}

interface Student {
  index: number;
  name: string;
  english_name?: string;
  kana?: string;
  gender?: "man" | "woman" | "other";
}
