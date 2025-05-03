import { FC } from 'react';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';

const UiLoader: FC = () => {
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant='determinate'
                sx={(theme) => ({
                    color: theme.palette.grey[200],
                    ...theme.applyStyles('dark', {
                        color: theme.palette.grey[800],
                    }),
                })}
                size={40}
                thickness={4}
                value={100}
            />
            <CircularProgress
                variant='indeterminate'
                disableShrink
                sx={(theme) => ({
                    color: '#1a90ff',
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                    ...theme.applyStyles('dark', {
                        color: '#308fe8',
                    }),
                })}
                size={40}
                thickness={4}
            />
        </Box>
    );
};

export { UiLoader };
