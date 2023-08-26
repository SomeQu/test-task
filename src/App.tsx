import "./App.scss";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Cell from "./components/Cell/Cell";

function App() {
  const [dates, setDates] = useState<string[]>([]);
  // Сегодняшняя дата
  const today: string = moment().format("Y-MM-DD");
  const [api, setApi] = useState<any>(null);
  useEffect(() => {
    // Цикл для заполнения
    for (let i = 0; i <= 357; i++) {
      setDates((dates) => [
        ...dates,
        moment().subtract(i, "days").format("Y-MM-DD"),
      ]);
    }
    // Гет запрос на АПИ
    setApi(
      axios
        .get("https://dpg.gg/test/calendar.json")
        .then((response) => setApi(response.data))
    );
  }, [today]);
  function groupDatesByMonth(dates: string[]): Record<string, string[]> {
    const dateMap: Record<string, string[]> = {};

    for (let dateStr of dates) {
      const [year, month] = dateStr.split("-");
      const monthKey = `${year}-${month}`;

      if (!dateMap[monthKey]) {
        dateMap[monthKey] = [];
      }

      dateMap[monthKey].push(dateStr);
    }

    return dateMap;
  }
  const groupedDates = groupDatesByMonth(dates);
  const sortedMonthKeys = Object.keys(groupedDates).sort();
  return (
    <div className="App">
      <div className="day">
        <p>Пн</p>
        <p>Ср</p>
        <p>Пт</p>
      </div>
      <div className="element">
        <div className="month">
          {sortedMonthKeys.map((monthKey) => (
            <div className="month" key={monthKey}>
              <p>{moment(monthKey).format("MMMM")}</p>
            </div>
          ))}
        </div>
        <div className="graph">
          {dates
            .slice()
            .reverse()
            .map((cell: any, index: any) => {
              return <Cell match={api[cell]} cell={cell} key={index} />;
            })}
        </div>
        <div className="example">
          <p>Меньше</p>
          <Cell />
          <Cell match={9} />
          <Cell match={19} />
          <Cell match={29} />
          <Cell match={31} />
          <p>Больше</p>
        </div>
      </div>
    </div>
  );
}

export default App;
