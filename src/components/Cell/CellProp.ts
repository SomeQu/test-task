export default interface CellProps {
  cell?: string;
  match?: number;
  active?: boolean;
  setActive?: React.Dispatch<React.SetStateAction<any>>;
}
