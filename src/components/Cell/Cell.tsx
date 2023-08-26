import "./Cell.scss";
interface CellProps {
  cell?: string;
  match?: number;
  active?: boolean;
}
const Cell = ({ cell, match }: CellProps): JSX.Element => {
  const moreThanThirty: string =
    match! >= 30 ? "moreThanThirty" : "no-contribution";
  const lessThanThirty: string =
    match! <= 29 && match! >= 20 ? "lessThanThirty" : moreThanThirty;
  const lessThanTwenty: string =
    match! <= 19 && match! >= 10 ? "lessThanTwenty" : lessThanThirty;
  const lessThanTen: string = match! <= 9 ? "lessThanTen" : lessThanTwenty;
  return (
    <div className="singeCell">
      <div className={lessThanTen}>
        <p> ㅤ</p>
      </div>
    </div>
  );
};

export default Cell;
