export interface Props {
  sortedMonthKeys?: string[];
  dates?: string[];
}
export interface CellProps {
  cell?: string;
  match?: number;
  active?: boolean;
  setActive?: React.Dispatch<React.SetStateAction<any>>;
}
