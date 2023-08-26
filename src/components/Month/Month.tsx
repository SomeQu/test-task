import moment from "moment";
interface Propps {
  sortedMonthKeys: string[];
}
const Month = ({ sortedMonthKeys }: Propps) => {
  console.log(sortedMonthKeys);
  return (
    <div className="month">
      {sortedMonthKeys.map((monthKey) => (
        <div className="month" key={monthKey}>
          <p>{moment(monthKey).format("MMMM")}</p>
        </div>
      ))}
    </div>
  );
};

export default Month;
