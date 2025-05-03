import { FC, memo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { TCompany, TEmployee, TEquipment, TSupervisor } from '@/shared/model/types/employee-list-today';
import { UiSquare } from '@/shared/ui/square/ui-square';
import { UiInputTime } from '@/shared/ui/input-time/ui-input-time';
import { UiButton } from '@/shared/ui/button/ui-button';
import { UiError } from '@/shared/ui/error/ui-error';
import { useCardEmployee } from '../../model/use-card-employee';
import { CardEmployeeLayout } from './card-employee-layout';

interface ICardEmployee {
    companies: TCompany[];
    equipments: TEquipment[];
    supervisors: TSupervisor[];
    employee: TEmployee;
}

const CardEmployee: FC<ICardEmployee> = ({ companies, equipments, supervisors, employee }) => {
    const { photo, profession, fullName, dateTag } = employee;

    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        breakDate,
        setBreakDate,
        companyValue,
        setCompanyValue,
        equipmentValue,
        setEquipmentValue,
        supervisorValue,
        setSupervisorValue,
        errorMessage,
        isSavingCardEmployee,
        handleSaveCardEmployee,
    } = useCardEmployee(employee);

    return (
        <CardEmployeeLayout
            photo={<img loading='lazy' width='150' height='150' src={photo} alt={fullName} />}
            profession={profession}
            indicator={<UiSquare color={dateTag ? 'green' : 'red'} />}
            fullName={fullName}
            timeBox={
                <>
                    <UiInputTime
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        title={'Начало'}
                        dateFormat='HH:mm'
                        interval={15}
                        timeCaption={false}
                        locale='ru'
                    />
                    <UiInputTime
                        selected={endDate}
                        onChange={(date: Date) => setEndDate(date)}
                        title={'Конец'}
                        dateFormat='HH:mm'
                        interval={15}
                        timeCaption={false}
                        locale='ru'
                    />
                    <UiInputTime
                        selected={breakDate}
                        onChange={(date: Date) => setBreakDate(date)}
                        title={'Перерыв'}
                        dateFormat='HH:mm'
                        interval={15}
                        minTime={[0, 0]}
                        maxTime={[4, 0]}
                        timeCaption={false}
                        locale='ru'
                    />
                </>
            }
            selectBox={
                <>
                    {' '}
                    <Autocomplete
                        value={companyValue}
                        onChange={(event, newValue: string | null) => {
                            setCompanyValue(newValue);
                        }}
                        disablePortal
                        options={companies.map((item) => item.title)}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} label='Место проведения работ' />}
                    />
                    <Autocomplete
                        value={equipmentValue}
                        onChange={(event, newValue: string | null) => {
                            setEquipmentValue(newValue);
                        }}
                        disablePortal
                        options={equipments.map((item) => item.title)}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} label='Технологический объект' />}
                    />
                    <Autocomplete
                        value={supervisorValue}
                        onChange={(event, newValue: string | null) => {
                            setSupervisorValue(newValue);
                        }}
                        disablePortal
                        options={supervisors.map((item) => item.fullName)}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} label='Руководитель проекта' />}
                    />
                </>
            }
            saveButton={
                <UiButton onClick={handleSaveCardEmployee} disabled={isSavingCardEmployee} color={'blue'}>
                    {isSavingCardEmployee ? '...загрузка' : dateTag ? 'Изменить' : 'Сохранить'}
                </UiButton>
            }
            error={errorMessage && <UiError message={errorMessage} />}
        />
    );
};

export default memo(CardEmployee);
