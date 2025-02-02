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
import { SaveEmloyeeButton } from '../../../shared/ui/buttons/saveEmployee/SaveEmloyeeButton';
// import { saveEmployeeData } from '../employeesPage.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store/store';
import { saveEmployeeData } from '../employeesPage.slice';

export interface IEmployee {
  id: number;
  fullName: string;
  profession: string;
  photo: string;
  equipment: string | null;
  supervisor: string | null;
  company: string | null;
  dateTag: string | null;
  startTime: null | string;
  endTime: null | string;
  breakTime: null | string;
  companies: { id: number; title: string }[];
  equipments: { id: number; title: string }[];
  supervisors: { id: number; fullName: string }[];
}
// 1736834400000
const CardEmployee: FC<IEmployee> = ({
  photo,
  profession,
  fullName,
  companies,
  equipments,
  supervisors,
  equipment,
  supervisor,
  company,
  dateTag,
  id,
  startTime,
  endTime,
  breakTime,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const isSavingCardEmployee = useSelector((state: RootState) =>
    state.employees.isSavingCardEmployee.includes(id),
  );
  const [startDate, setStartDate] = useState<Date | null>(
    typeof startTime === 'string'
      ? new Date(+startTime)
      : setHours(setMinutes(new Date(), 30), 8),
  );
  const [endDate, setEndDate] = useState<Date | null>(
    typeof endTime === 'string'
      ? new Date(+endTime)
      : setHours(setMinutes(new Date(), 15), 17),
  );
  const [breakDate, setBreakDate] = useState<Date | null>(
    typeof breakTime === 'string'
      ? new Date(+breakTime)
      : setHours(setMinutes(new Date(), 45), 0),
  );
  const [hideBoxTimeSetters, setРideBoxTimeSetters] = useState<boolean>(false);

  const [companyValue, setCompanyValue] = useState<string | null>(
    company ?? '',
  );
  const [inputCompanyValue, setInputCompanyValue] = useState(company ?? '');

  const [equipmentValue, setEquipmentValue] = useState<string | null>(
    equipment ?? '',
  );
  const [inputEquipmentValue, setInputEquipmentValue] = useState(
    equipment ?? '',
  );

  const [supervisorValue, setSupervisorValue] = useState<string | null>(
    supervisor ?? '',
  );
  const [inputSupervisorValue, setInputSupervisorValue] = useState(
    supervisor ?? '',
  );

  function handleFormControlLabel(
    event: React.SyntheticEvent,
    checked: boolean,
  ) {
    setРideBoxTimeSetters(checked);
  }

  const handleSaveCardEmployee = () => {
    const getDateToday = (date: Date) => {
      return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    };

    const dataEmployee = {
      dataTag: getDateToday(new Date()),
      id,
      fullName,
      profession,
      startDate: startDate && String(+startDate),
      endDate: endDate && String(+endDate),
      breakDate: breakDate && String(+breakDate),
      companyValue,
      equipmentValue,
      supervisorValue,
    };

    dispatch(saveEmployeeData(dataEmployee));
  };

  return (
    <section className={style.employee__box}>
      <div className={style.imageBox}>
        <img src={photo} alt={fullName} />
        <div className={style.profession}>{profession}</div>
      </div>
      <div className={style.mainBoxTime}>
        <h2 className={style.h2}>{fullName}</h2>
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
            value={companyValue}
            onChange={(event, newValue: string | null) => {
              setCompanyValue(newValue);
            }}
            inputValue={inputCompanyValue}
            onInputChange={(event, newInputValue) => {
              setInputCompanyValue(newInputValue);
            }}
            disablePortal
            options={companies.map((item) => item.title)}
            sx={{ width: 250 }}
            renderInput={(params) => (
              <TextField {...params} label="Место проведения работ" />
            )}
          />
        </div>
        <div className={style['options-box']}>
          <Autocomplete
            value={equipmentValue}
            onChange={(event, newValue: string | null) => {
              setEquipmentValue(newValue);
            }}
            inputValue={inputEquipmentValue}
            onInputChange={(event, newInputValue) => {
              setInputEquipmentValue(newInputValue);
            }}
            disablePortal
            options={equipments.map((item) => item.title)}
            sx={{ width: 250 }}
            renderInput={(params) => (
              <TextField {...params} label="Технологический объект" />
            )}
          />
        </div>
        <div className={style['options-box']}>
          <Autocomplete
            value={supervisorValue}
            onChange={(event, newValue: string | null) => {
              setSupervisorValue(newValue);
            }}
            inputValue={inputSupervisorValue}
            onInputChange={(event, newInputValue) => {
              setInputSupervisorValue(newInputValue);
            }}
            disablePortal
            options={supervisors.map((item) => item.fullName)}
            sx={{ width: 250 }}
            renderInput={(params) => (
              <TextField {...params} label="Руководитель проекта" />
            )}
          />
        </div>
      </div>
      <SaveEmloyeeButton
        callBack={handleSaveCardEmployee}
        isDisabled={isSavingCardEmployee}
      >
        {dateTag ? 'Обновить' : 'Сохранить'}
      </SaveEmloyeeButton>
      {isSavingCardEmployee && <div>Загрузка</div>}
    </section>
  );
};

export { CardEmployee };
