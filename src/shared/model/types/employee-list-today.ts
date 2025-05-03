export type TCompany = {
    id: number;
    title: string;
};

export type TEquipment = {
    id: number;
    title: string;
};

export type TSupervisor = {
    id: number;
    fullName: string;
};

export type TProfession = {
    id: number;
    name: string;
};

export type TEmployee = {
    id: number;
    dateTag: null | string;
    fullName: string;
    startTime: null | string;
    endTime: null | string;
    breakTime: null | string;
    company: null | string;
    equipment: null | string;
    supervisor: null | string;
    profession: string;
    photo: string;
    place: string;
};

export type TDataEmployee = {
    dataTag: string;
    id: number;
    fullName: string;
    profession: string;
    startDate: string;
    endDate: string;
    breakDate: string;
    companyValue: string | null;
    equipmentValue: string | null;
    supervisorValue: string | null;
};

export type TUpdatedTodayEmployee = {
    breakTime: string;
    company: string;
    dateTag: string;
    endTime: string;
    equipment: string;
    fullName: string;
    id: number;
    place: string;
    profession: string;
    startTime: string;
    supervisor: string;
};
