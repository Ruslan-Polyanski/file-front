import { FC, useState } from 'react';
import style from './CardEmployee.module.css';
import DatePicker from 'react-datepicker';
import { setHours } from 'date-fns/setHours';
import { setMinutes } from 'date-fns/setMinutes';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
console.log(<DatePicker />);
const mickFactories = [
  'Минский моторный завод',
  'Минский тракторный завод',
  'Минский автомобильный завод',
  'Борисовский завод агрегатов',
  'Гомсельмаш',
  'Амкодор-Унимод',
];

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
      <div className={style.mainBoxTime}>
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
      <div className={style['autocomplete-box']}>
        <div className={style['options-box']}>
          <Autocomplete
            disablePortal
            options={mickFactories}
            sx={{ width: 250 }}
            renderInput={(params) => (
              <TextField {...params} label="Место проведения работ" />
            )}
          />
        </div>
        <div className={style['options-box']}>
          <Autocomplete
            disablePortal
            options={[
              'ИФДС5190',
              'ИФДС5297',
              'ИФДС5493',
              'ИФДС5518',
              'ИФДС5519',
            ]}
            sx={{ width: 250 }}
            renderInput={(params) => (
              <TextField {...params} label="Технологический объект" />
            )}
          />
        </div>
        <div className={style['options-box']}>
          <Autocomplete
            disablePortal
            options={[
              'Игорь Петров Петрович',
              'Кузнецов Пертов Петрович',
              'Демко Игорь Михайлович',
              'Сашко Олег Никифорович',
              'Осулин Виктор Иванович',
            ]}
            sx={{ width: 250 }}
            renderInput={(params) => (
              <TextField {...params} label="Руководитель проекта" />
            )}
          />
        </div>
      </div>
    </section>
  );
};

export { CardEmployee };
