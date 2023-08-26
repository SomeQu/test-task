import React from "react";
import Cell from "../Cell/Cell";
import CellProps from "../Cell/CellProp";

const Example = () => {
  return (
    <div className="example">
      <p>Меньше</p>
      <Cell />
      <Cell match={9} />
      <Cell match={19} />
      <Cell match={29} />
      <Cell match={31} />
      <p>Больше</p>
    </div>
  );
};

export default Example;
