import { FC, useState } from 'react';
import style from './CardEmployee.module.css';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';

registerLocale('ru', ru);

interface IEmployee {
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
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const altText = `${firstName} ${lastName} ${surname}`;
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
          <h3>Рабочее время</h3>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export { CardEmployee };
