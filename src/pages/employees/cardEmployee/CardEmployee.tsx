import { FC, useState } from 'react';
import style from './CardEmployee.module.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { SaveEmloyeeButton } from '../../../shared/ui/buttons/saveEmployee/SaveEmloyeeButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store/store';
import { saveEmployeeData } from '../employeesPage.slice';
import { UiInputTime } from '../ui/ui-input-time';

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
      // startDate: startDate && String(+startDate),
      // endDate: endDate && String(+endDate),
      // breakDate: breakDate && String(+breakDate),
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
              <UiInputTime 
                  title={'Начало'} 
                  dataTime={startTime}
                  dateFormat="HH:mm"
                  hours={8}
                  minutes={30}
                  interval={15}
                  timeCaption={false}
                  locale="ru"
              />
              <UiInputTime 
                  title={'Конец'} 
                  dataTime={endTime}
                  dateFormat="HH:mm"
                  hours={17}
                  minutes={15}
                  interval={15}
                  timeCaption={false}
                  locale="ru"
              />
              <UiInputTime 
                  title={'Перерыв'} 
                  dataTime={breakTime}
                  dateFormat="HH:mm"
                  hours={0}
                  minutes={45}
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
        <div>
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
        <div>
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
