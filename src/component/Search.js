import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        TextField: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                },
            },
        },
    }
});

function Search({city, updateCity}){
    const [newCity, setNewCity] = useState('');

    const sumbitHandler = () => {
        // prevents us from entering in an empty search bar
        if (!newCity) {
            return;
        }
        console.log("submitting new city: ", newCity);
        console.log("going to update old city: ", city)
        updateCity(newCity.toLowerCase());
        setNewCity('');
    }

    return (
        <div style={{margin: '2vh'}}>
            <ThemeProvider theme={theme}>
                <TextField
                    id='standard-basic'
                    variant='outlined'
                    value={newCity}
                    fullWidth
                    defaultValue={city}
                    placeholder='Search'
                    onChange={(e) => setNewCity(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={sumbitHandler}>
                                    <SearchIcon ></SearchIcon>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </ThemeProvider>
        </div>
    );
}

export default (Search);