import { ChangeEvent, FC } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface IProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    variant: 'outlined' | 'filled' | 'standard';
}

export const UiInput: FC<IProps> = ({ value, onChange, label, variant }) => {
    return (
        <Box
            component='form'
            sx={{
                '& > :not(style)': { width: '27.8ch' },
            }}
        >
            <TextField value={value} onChange={onChange} label={label} variant={variant} />
        </Box>
    );
};
