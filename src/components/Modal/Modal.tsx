import { useEffect, useRef } from "react";
import "./Modal.scss";
import { CellProps } from "../../types/type";
import moment from "moment";
const Modal = ({ active, setActive, match, cell }: CellProps): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null); // Указываем тип элемента
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setActive!(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active, setActive]);
  return (
    <div ref={modalRef} className={active ? "active" : "modal"}>
      <span>{match} Contributions</span>
      <p>{moment(cell).format("dddd, MMM DD, Y")}</p>
    </div>
  );
};

export default Modal;
