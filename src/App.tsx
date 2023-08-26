import Cell from "./components/Cell/Cell";
import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Example from "./components/Example/Example";
import Days from "./components/Days/Days";
import Month from "./components/Month/Month";

function App() {
  //Групировка по месяцам (исходя ииз последней даты)
  function groupDatesByMonth(dates: string[]): Record<string, string[]> {
    const dateMap: Record<string, string[]> = {};

    for (const dateStr of dates) {
      const [year, month] = dateStr.split("-");
      const monthKey = `${year}-${month}`;

      if (!dateMap[monthKey]) {
        dateMap[monthKey] = [];
      }

      dateMap[monthKey].push(dateStr);
    }

    return dateMap;
  }

  // Массив для заполнения датами
  const [dates, setDates] = useState<string[]>([]);
  //API
  const [api, setApi] = useState<any>(null);
  useEffect(() => {
    // Цикл для заполнения
    for (let i = 0; i <= 356; i++) {
      setDates((dates) => [
        ...dates,
        moment().subtract(i, "days").format("Y-MM-DD"),
      ]);
    }
    if (dates.length > 0) {
      const newDates = [...dates];
      newDates[newDates.length - 1] = moment(newDates[newDates.length - 1])
        .subtract(1, "day")
        .format("Y-MM-DD");
      setDates(newDates);
    }
    // Гет запрос на АПИ
    setApi(
      axios
        .get("https://dpg.gg/test/calendar.json")
        .then((response) => setApi(response.data))
    );
  }, []);

  const groupedDates = groupDatesByMonth(dates);
  //отсортированный массив
  const sortedMonthKeys = Object.keys(groupedDates).sort();

  return (
    <div className="App">
      <Days />
      <div className="element">
        <Month sortedMonthKeys={sortedMonthKeys} />
        <div className="graph">
          {dates
            .slice()
            .reverse()
            .map((cell, index) => {
              return <Cell match={api[cell]} cell={cell} key={index} />;
            })}
        </div>
        <Example />
      </div>
    </div>
  );
}

export default App;
