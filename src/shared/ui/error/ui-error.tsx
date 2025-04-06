import { FC } from "react"
import style from './ui-error.module.css'


const UiError: FC<{message: string}> = ({message}) => {
    return (
        <div className={style.message}>{message}</div>
    )
}

export { UiError }