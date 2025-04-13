import { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";

interface Props {
    value: string | null;
    label: string;
    data: string[]
    onChange: (data: string | null) => void
}

const FilterEmployees: FC<Props> = ({value, data, onChange, label}) => {

    return (
        <>
            <div>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        onChange(newValue)
                    }}
                    disablePortal
                    options={data}
                    sx={{ width: 250 }}
                    renderInput={(params) => (
                        <TextField {...params} label={label} />
                    )}
                />
            </div>
        </>
    )
}

export { FilterEmployees }