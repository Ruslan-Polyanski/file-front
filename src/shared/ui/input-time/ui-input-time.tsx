import { FC } from 'react';
import DatePicker from 'react-datepicker';
import { setHours } from 'date-fns/setHours';
import { setMinutes } from 'date-fns/setMinutes';
import style from './ui-input-time.module.css';

interface IProps {
    title: string;
    minTime?: [number, number];
    maxTime?: [number, number];
    timeCaption: boolean;
    interval: number;
    locale: 'ru' | 'es';
    dateFormat: 'HH:mm';
    selected: any;
    onChange: any;
}

const UiInputTime: FC<IProps> = ({
    title,
    minTime,
    maxTime,
    timeCaption,
    interval,
    locale,
    dateFormat,
    selected,
    onChange,
}) => {
    return (
        <div className={style.timeSetter}>
            <span>{title}</span>
            <div>
                <DatePicker
                    selected={selected}
                    onChange={onChange}
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
    );
};

export { UiInputTime };
