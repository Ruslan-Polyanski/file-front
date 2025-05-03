import { FC, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import style from './card-employee.module.css';

interface IProps {
    photo: ReactNode;
    indicator: ReactNode;
    timeBox: ReactNode;
    selectBox: ReactNode;
    saveButton: ReactNode;
    error: ReactNode;
    profession: ReactNode;
    fullName: ReactNode;
}

export const CardEmployeeLayout: FC<IProps> = ({
    photo,
    indicator,
    timeBox,
    selectBox,
    saveButton,
    error,
    profession,
    fullName,
}) => {
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    });

    return (
        <section ref={ref} className={style.section}>
            {!inView ? null : (
                <div className={style.employee__box}>
                    <div className={style.imageBox}>
                        {photo}
                        <div className={style.profession}>{profession}</div>
                        <div className={style.square__padding}>{indicator}</div>
                    </div>
                    <div className={style.mainBoxTime}>
                        <h2 className={style.h2}>{fullName}</h2>
                        <div className={style.timeBox}>
                            <div className={style.changeStatus}>
                                <h3>Рабочее время</h3>
                            </div>
                            <div className={style.boxTimeSetters}>{timeBox}</div>
                        </div>
                    </div>
                    <div className={style['autocomplete-box']}>{selectBox}</div>
                    <div>
                        {saveButton}
                        {error}
                    </div>
                </div>
            )}
        </section>
    );
};
