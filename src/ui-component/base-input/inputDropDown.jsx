import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const InputDropdown = ({ key, name, label, value, handleChange, options }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id={key}>{label}</InputLabel>
            <Select
                labelId={key}
                name={name}
                id="select"
                value={value}
                label={label}
                onChange={handleChange}
            >
                {options.map((option) => 
                    <MenuItem value={option.option} key={option.id}>{option.option}</MenuItem>
                )}

            </Select>
        </FormControl>
    )
}


export default InputDropdown