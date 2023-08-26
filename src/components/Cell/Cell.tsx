import { useState } from "react";
import Modal from "../Modal/Modal";
import "./Cell.scss";
import { CellProps } from "../../types/type";
const Cell = ({ cell, match }: CellProps): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);
  const openModal = () => {
    setActive(true);
  };
  const moreThanThirty: string =
    match! >= 30 ? "moreThanThirty" : "no-contribution";
  const lessThanThirty: string =
    match! <= 29 && match! >= 20 ? "lessThanThirty" : moreThanThirty;
  const lessThanTwenty: string =
    match! <= 19 && match! >= 10 ? "lessThanTwenty" : lessThanThirty;
  const lessThanTen: string = match! <= 9 ? "lessThanTen" : lessThanTwenty;
  return (
    <div onClick={() => openModal()} className="singeCell">
      <div className={lessThanTen}>
        <p> ㅤ</p>
      </div>
      {active && (
        <Modal
          active={active}
          setActive={setActive}
          match={match}
          cell={cell}
        />
      )}
    </div>
  );
};

export default Cell;
