import { FC, useState } from "react"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const UiInputData: FC<{data: any}> = ({data}) => {
      const [value, setValue] = useState<string | null>(
        data ?? '',
      );
      
      const [inputCompanyValue, setInputCompanyValue] = useState(data ?? '');

    return (
         <div>
           <Autocomplete
             value={value}
             onChange={(event, newValue: string | null) => {
                setValue(newValue);
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
    )
}

export { UiInputData }