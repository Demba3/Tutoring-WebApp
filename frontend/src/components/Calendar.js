import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import StaticDateTimePicker from '@material-ui/lab/StaticDateTimePicker';
import '../index.css'

// import DateTimePicker from "@material-ui/lab/DateTimePicker";
// import DateFNSUtils from "@material-ui/lab/AdapterDateFns";
// import LocalizationProvider from "@material-ui/lab/LocalizationProvider";


const Calendar = () => {
    const [value, setValue] = useState(new Date());
    return (
      <div className="date-container">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDateTimePicker
          displayStaticWrapperAs="desktop"
          openTo="year"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      </div>
      
    );
}

export default Calendar
