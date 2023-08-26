import Cell from "./components/Cell/Cell";
import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Modal from "./components/Modal/Modal";

function App() {
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
  // Сегодняшняя дата
  const today: string = moment().format("Y-MM-DD");
  const [api, setApi] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        .format("Y-MM-DD"); // Сдвигаем последнюю дату на 1 день назад
      setDates(newDates);
    }
    // Гет запрос на АПИ
    setApi(
      axios
        .get("https://dpg.gg/test/calendar.json")
        .then((response) => setApi(response.data))
    );
  }, [today]);

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
      <Modal />
    </div>
  );
}

export default App;
