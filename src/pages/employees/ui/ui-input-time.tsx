import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import { setHours } from 'date-fns/setHours';
import { setMinutes } from 'date-fns/setMinutes';
import style from './ui-input-time.module.css';

interface IProps {
    title: string; 
    dataTime: string | null;
    hours: number; 
    minutes: number; 
    minTime?: [number, number];
    maxTime?: [number, number];
    timeCaption: boolean;
    interval: number;
    locale: "ru" | "es";
    dateFormat: "HH:mm";
}

const UiInputTime: FC<IProps> = ({title, dataTime, hours, minutes, minTime, maxTime, timeCaption, interval, locale, dateFormat}) => {
    const [time, setTime] = useState<Date | null>(
    typeof dataTime === 'string'
        ? new Date(+dataTime)
        : setHours(setMinutes(new Date(), minutes), hours),
    );

    return (
        <div className={style.timeSetter}>
            <span>{title}</span>
            <div>
                <DatePicker
                    selected={time}
                    onChange={(time) => setTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={interval}
                    dateFormat={dateFormat}
                    minTime={minTime && setHours(setMinutes(new Date(), minTime[1]), minTime[0])}
                    maxTime={maxTime && setHours(setMinutes(new Date(), maxTime[1]), maxTime[0])}
                    showTimeCaption={timeCaption}
                    locale={locale}
                />
            </div>
        </div>
    )
}

export { UiInputTime }
