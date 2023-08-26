import "./Month.scss";
import moment from "moment";
import "moment/locale/ru";
import { Props } from "../../types/type";
const Month = ({ sortedMonthKeys }: Props) => {
  return (
    <div className="month">
      {sortedMonthKeys?.map((monthKey) => (
        <div className="month" key={monthKey}>
          <p>{moment(monthKey).format("MMMM")}</p>
        </div>
      ))}
    </div>
  );
};

export default Month;
