import { FC, useState } from 'react';
import style from './CardEmployee.module.css';
import DatePicker from 'react-datepicker';
import { setHours } from 'date-fns/setHours';
import { setMinutes } from 'date-fns/setMinutes';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export interface IEmployee {
  firstName: string;
  lastName: string;
  surname: string;
  profession: string;
  photo: string;
}

const CardEmployee: FC<IEmployee> = ({
  photo,
  profession,
  firstName,
  lastName,
  surname,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 8),
  );
  const [endDate, setEndDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 15), 17),
  );
  const [breakDate, setBreakDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 45), 0),
  );
  const [hideBoxTimeSetters, setРideBoxTimeSetters] = useState<boolean>(false);

  const altText = `${firstName} ${lastName} ${surname}`;

  function handleFormControlLabel(
    event: React.SyntheticEvent,
    checked: boolean,
  ) {
    setРideBoxTimeSetters(checked);
  }

  return (
    <section className={style.employee__box}>
      <div className={style.imageBox}>
        <img src={photo} alt={altText} />
        <div className={style.profession}>{profession}</div>
      </div>
      <div>
        <h2 className={style.h2}>
          {firstName} {lastName} {surname}
        </h2>
        <div className={style.timeBox}>
          <div className={style.changeStatus}>
            <h3>Рабочее время</h3>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                onChange={handleFormControlLabel}
                label={<span style={{ fontSize: '16px' }}>{'Прогул'}</span>}
              />
            </FormGroup>
          </div>
          {hideBoxTimeSetters ? null : (
            <div className={style.boxTimeSetters}>
              <div className={style.timeSetter}>
                <span>Начало</span>
                <div>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="HH:mm"
                    showTimeCaption={false}
                    locale="ru"
                  />
                </div>
              </div>
              <div className={style.timeSetter}>
                <span>Конец</span>
                <div>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="HH:mm"
                    showTimeCaption={false}
                    locale="ru"
                  />
                </div>
              </div>
              <div className={style.timeSetter}>
                <span>Перерыв</span>
                <div>
                  <DatePicker
                    selected={breakDate}
                    onChange={(date) => setBreakDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="HH:mm"
                    minTime={setHours(setMinutes(new Date(), 0), 0)}
                    maxTime={setHours(setMinutes(new Date(), 0), 4)}
                    showTimeCaption={false}
                    locale="ru"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { CardEmployee };
