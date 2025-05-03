import { UiInput } from '@/shared/ui/input/ui-input';
import { UiSelect } from '@/shared/ui/select/ui-select';
import { UiButton } from '@/shared/ui/button/ui-button';
import { FC } from 'react';
import { useFilterEmployees } from '../../model/use-filter-employees';

export const FilterEmployees: FC = () => {
    const {
        valueSearchInput,
        filters,
        equipments,
        places,
        professions,
        handleChangeSearchInput,
        handleChangeSelectFilters,
        handleClickResetFilters,
    } = useFilterEmployees();

    return (
        <>
            <UiInput
                label={'Поиск по ФИО'}
                value={valueSearchInput}
                onChange={handleChangeSearchInput}
                variant={'outlined'}
            />
            <UiSelect
                value={filters.profession === undefined ? null : filters.profession}
                data={professions.map((item) => item.name)}
                onChange={(newValue) => handleChangeSelectFilters({ profession: newValue })}
                label={'Профессия'}
            />
            <UiSelect
                value={filters.place === undefined ? null : filters.place}
                data={places}
                onChange={(newValue) => handleChangeSelectFilters({ place: newValue })}
                label={'Место нахождения'}
            />
            <UiSelect
                value={filters.equipment === undefined ? null : filters.equipment}
                data={equipments.map((item) => item.title)}
                onChange={(newValue) => handleChangeSelectFilters({ equipment: newValue })}
                label={'Технологический объект'}
            />
            <UiButton onClick={handleClickResetFilters} color={'blue'}>
                Сбросить фильтр
            </UiButton>
        </>
    );
};
