import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const InputText = ({key,name,label,value,handleChange, disabled, type}) => {
    return (
        <FormControl fullWidth>
          <TextField  key={key} id={key}  value={value} name={name} label={label} variant="outlined" onChange={handleChange} disabled={disabled} type={type}/>
        </FormControl >
    )
}

export default InputText