import "./Graph.scss";
import { useEffect, useState } from "react";
import { Props } from "../../types/type";
import Cell from "../Cell/Cell";
import axios from "axios";

const Graph = ({ dates }: Props) => {
  //API
  const [api, setApi] = useState<any>(null);
  useEffect(() => {
    setApi(
      axios
        .get("https://dpg.gg/test/calendar.json")
        .then((response) => setApi(response.data))
    );
  }, []);
  return (
    <div className="graph">
      {dates
        ?.slice()
        .reverse()
        .map((cell, index) => {
          return <Cell match={api[cell]} cell={cell} key={index} />;
        })}
    </div>
  );
};

export default Graph;
