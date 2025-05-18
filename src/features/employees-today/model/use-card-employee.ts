import { useAppDispatch } from '@/app/store';
import { getDateDDMMYYYY } from '@/shared/lib/utils/get-date-DDMMYYYY';
import { validateEmptyArea, validateForm } from '@/shared/lib/utils/validate-form';
import { TEmployee } from '@/shared/model/types/employee-list-today';
import { setHours } from 'date-fns/setHours';
import { setMinutes } from 'date-fns/setMinutes';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { saveEmployeeData } from './employees-today.slice';
import { selectorCompanies, selectorEquipments, selectorSavingIdCardEmployees, selectorSupervisors } from './selectors';

export const useCardEmployee = (employee: TEmployee) => {
    const { profession, fullName, equipment, supervisor, company, id, startTime, endTime, breakTime } = employee;

    const dispatch = useAppDispatch();

    const isSavingCardEmployee = useSelector(selectorSavingIdCardEmployees(id));
    const companies = useSelector(selectorCompanies);
    const equipments = useSelector(selectorEquipments);
    const supervisors = useSelector(selectorSupervisors);

    const [companyValue, setCompanyValue] = useState<string | null>(company ?? '');
    const [equipmentValue, setEquipmentValue] = useState<string | null>(equipment ?? '');
    const [supervisorValue, setSupervisorValue] = useState<string | null>(supervisor ?? '');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [startDate, setStartDate] = useState<Date>(() => {
        if (typeof startTime === 'string') return new Date(+startTime);
        return setHours(setMinutes(new Date(), 30), 8);
    });

    const [endDate, setEndDate] = useState<Date>(() => {
        if (typeof endTime === 'string') return new Date(+endTime);
        return setHours(setMinutes(new Date(), 15), 17);
    });

    const [breakDate, setBreakDate] = useState<Date>(() => {
        if (typeof breakTime === 'string') return new Date(+breakTime);
        return setHours(setMinutes(new Date(), 45), 0);
    });

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

        const resultValidation = validateForm(dataEmployee, [validateEmptyArea]);

        const { result, message } = resultValidation;

        if (!result) {
            setErrorMessage(message);
            return;
        }

        dispatch(saveEmployeeData(dataEmployee));
        setErrorMessage(null);
    };

    return {
        companies,
        equipments,
        supervisors,
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
    };
};
