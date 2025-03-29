import { FC, useState } from 'react';
import style from './CardEmployee.module.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { SaveEmloyeeButton } from '../../../shared/ui/buttons/saveEmployee/SaveEmloyeeButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store/store';
import { TEmployee, saveEmployeeData } from '../employeesPage.slice';
import { UiInputTime } from '../ui/ui-input-time';
import { setHours, setMinutes } from 'date-fns';
import { Autocomplete, TextField } from '@mui/material';
import { UiSquare } from '../../../shared/ui/square/UiSquare';
import { getDateDDMMYYYY } from '../../../shared/utils/getDate-DDMMYYYY';

export interface ICardEmployee {
  companies: { id: number; title: string }[];
  equipments: { id: number; title: string }[];
  supervisors: { id: number; fullName: string }[];
  employee: TEmployee;
}

const CardEmployee: FC<ICardEmployee> = ({
  companies,
  equipments,
  supervisors,
  employee,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const {photo, profession, fullName, equipment, supervisor, company, dateTag, id, startTime, endTime, breakTime} = employee;
  
  const isSavingCardEmployee = useSelector((state: RootState) => state.employees.isSavingCardEmployee.includes(id));
  const [hideBoxTimeSetters, setРideBoxTimeSetters] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<Date>(() => {
    if(typeof startTime === 'string') return new Date(+startTime)
      return setHours(setMinutes(new Date(), 30), 8)
  });

  const [endDate, setEndDate] = useState<Date>(() => {
    if(typeof endTime === 'string') return new Date(+endTime)
      return setHours(setMinutes(new Date(), 15), 17)
  });

  const [breakDate, setBreakDate] = useState<Date>(() => {
    if(typeof breakTime === 'string') return new Date(+breakTime)
      return setHours(setMinutes(new Date(), 45), 0)
  });                    

  const [companyValue, setCompanyValue] = useState<string | null>(company ?? '');
  const [equipmentValue, setEquipmentValue] = useState<string | null>(equipment ?? '');
  const [supervisorValue, setSupervisorValue] = useState<string | null>(supervisor ?? '');

  function handleFormControlLabel(event: React.SyntheticEvent, checked: boolean) {
    setРideBoxTimeSetters(checked);
  }

  const handleSaveCardEmployee = () => {

    const dataEmployee = {
      dataTag: getDateDDMMYYYY(new Date()),
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

    dispatch(saveEmployeeData(dataEmployee))
  };

  return (
    <section className={style.employee__box}>
      <div className={style.imageBox}>
        <img src={photo} alt={fullName} />
        <div className={style.profession}>{profession}</div>
        <div className={style.square__padding}>
          <UiSquare status={dateTag ? 'green' : 'red'} />
        </div>
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
              <UiInputTime 
                  selected={startDate}
                  onChange={(date: any) => setStartDate(date)}
                  title={'Начало'} 
                  dateFormat="HH:mm"
                  interval={15}
                  timeCaption={false}
                  locale="ru"
              />
              <UiInputTime 
                  selected={endDate}
                  onChange={(date: any) => setEndDate(date)}
                  title={'Конец'} 
                  dateFormat="HH:mm"
                  interval={15}
                  timeCaption={false}
                  locale="ru"
              />
              <UiInputTime 
                  selected={breakDate}
                  onChange={(date: any) => setBreakDate(date)}
                  title={'Перерыв'} 
                  dateFormat="HH:mm"
                  interval={15}
                  minTime={[0, 0]}
                  maxTime={[4, 0]}
                  timeCaption={false}
                  locale="ru"
              />
            </div>
          )}
        </div>
      </div>
      <div className={style['autocomplete-box']}>
        <div>
          <Autocomplete
            value={companyValue}
            onChange={(event, newValue: string | null) => {
              setCompanyValue(newValue);
            }}
            disablePortal
            options={companies.map((item) => item.title)}
            sx={{ width: 250 }}
            renderInput={(params) => (
              <TextField {...params} label="Место проведения работ" />
            )}
          />
        </div>
        <div>
          <Autocomplete
            value={equipmentValue}
            onChange={(event, newValue: string | null) => {
              setEquipmentValue(newValue);
            }}
            disablePortal
            options={equipments.map((item) => item.title)}
            sx={{ width: 250 }}
            renderInput={(params) => (
              <TextField {...params} label="Технологический объект" />
            )}
          />
        </div>
        <div>
          <Autocomplete
            value={supervisorValue}
            onChange={(event, newValue: string | null) => {
              setSupervisorValue(newValue);
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
      <div>
        <SaveEmloyeeButton callBack={handleSaveCardEmployee} isDisabled={isSavingCardEmployee}>
          {isSavingCardEmployee ? '...загрузка' : dateTag ? 'Обновить' : 'Сохранить'}
        </SaveEmloyeeButton>
      </div>
    </section>
  );
};

export { CardEmployee };
