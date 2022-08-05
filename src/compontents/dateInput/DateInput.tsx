import  {useState, FC, memo} from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import styles from './dateInput.module.scss'

interface IDataInputProps {
    onChangeDateValue: (data: string) => void,
    dateProp: string
}



const DateInput :FC<IDataInputProps> = memo(({onChangeDateValue,dateProp}) => {
        const date =  dateProp && new Date(dateProp).getTime();

        const [startDate, setStartDate] = useState<Date>();

        const onChangeDate = (date: Date ) => {
            if(date){
                setStartDate(date);
                onChangeDateValue(date?.toISOString().slice(0,10).replace( /\//g, "/" ))
            }

        };
        return (
            <>
                <DatePicker
                    className={styles.root}
                    selected={startDate}
                    onChange={onChangeDate}
                />
            </>

        );


    })
;

export default DateInput;