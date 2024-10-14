import { FC } from "react";
import style from "./LogOut.module.css"

const LogOut: FC = () => {
  return <>
    <button className={style.bg}>
      <span>Выход</span>
    </button>
  </>
}

export { LogOut }