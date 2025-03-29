import { FC, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

interface Props {
    data: {id: number; name: string}[];
    onChange: (data: Record<string, unknown>) => void
}

const FilterEmployees: FC<Props> = ({data, onChange}) => {

    const [value, setValue] = useState<string | null>('')

    return (
        <>
            <div>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue: string | null) => {
                        setValue(newValue)
                        onChange({profession: newValue})
                    }}
                    disablePortal
                    options={data.map((item) => item.name)}
                    sx={{ width: 250 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Профессия" />
                    )}
                />
            </div>
        </>
    )
}

export { FilterEmployees }