import { useAppDispatch } from '@/app/store';
import { useSelector } from 'react-redux';
import {
    selectorEquipments,
    selectorFilters,
    selectorPlaces,
    selectorProfessions,
    selectorSearchData,
} from './selectors';
import { ChangeEvent, useEffect, useState } from 'react';
import { setFilters, setSearchData } from './employees-today.slice';
import { useDebounce } from '@/shared/lib/hooks/use-debounce';

export const useFilterEmployees = () => {
    const dispatch = useAppDispatch();

    const places = useSelector(selectorPlaces);
    const filters = useSelector(selectorFilters);
    const equipments = useSelector(selectorEquipments);
    const professions = useSelector(selectorProfessions);
    const searchData = useSelector(selectorSearchData);

    const [valueSearchInput, setValueSearchInput] = useState('');

    const debouncedValueSearchInput = useDebounce(valueSearchInput, 500);

    useEffect(() => {
        if (searchData !== debouncedValueSearchInput) dispatch(setSearchData(valueSearchInput));
    }, [debouncedValueSearchInput]);

    const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValueSearchInput(event.target.value);
    };

    const handleChangeSelectFilters = (data: Record<string, unknown>) => {
        dispatch(setFilters(data));
    };

    const handleClickResetFilters = () => {
        if (Object.keys(filters).length) dispatch(setFilters({}));
        setValueSearchInput('');
        dispatch(setSearchData(''));
    };

    return {
        valueSearchInput,
        filters,
        equipments,
        places,
        professions,
        handleChangeSearchInput,
        handleChangeSelectFilters,
        handleClickResetFilters,
    };
};
