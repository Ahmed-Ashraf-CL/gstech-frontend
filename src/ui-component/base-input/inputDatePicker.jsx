import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"


const InputDatePicker = ({ label, name, value, handleChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                key={name}
                label={label}
                name={name}
                value={value}
                onChange={handleChange(name)}
            />
        </LocalizationProvider>
    )
}

export default InputDatePicker;