import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const MySelect = ({ name, setter, values, curr, id }) => {
  console.log(values);
  return (
    <div className="mx-2">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{name}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={curr ? curr : ""}
            size="small"
            label="Age"
            onChange={(e) => {
              setter(e.target.value, id);
            }}
          >
            {values?.map((val, index) => {
              return (
                <MenuItem key={index} value={`${val}`}>
                  {typeof val === "number" ? val : val.toUpperCase()}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default MySelect;
