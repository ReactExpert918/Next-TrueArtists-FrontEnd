import React, { useState } from "react";
import { Controller } from "react-hook-form";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";

import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

export const TextInput = ({
  name,
  register,
  required,
  label,
  errors,
  errorMessage,
  disabled,
  multiline,
  rows,
}: any) => (
  <FormControl fullWidth error={errors} required={required}>
    <FormHelperText>
      <b>{label}</b>
    </FormHelperText>
    <TextField
      multiline={multiline ? true : false}
      rows={rows}
      id={name}
      disabled={disabled ? true : false}
      name={name}
      error={errors}
      variant="outlined"
      size="small"
      inputRef={register({
        required: required,
      })}
    />
    {errors && <FormHelperText>{`Required ! ${errorMessage}`}</FormHelperText>}
  </FormControl>
);

export const SelectInput = ({ name, disabled, control, required, label, errors, errorMessage, dropDownList }: any) => (
  <FormControl fullWidth error={errors} required={required}>
    <FormHelperText>
      <b>{label}</b>
    </FormHelperText>
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={(props) => (
        <TextField
          fullWidth
          select
          disabled={disabled ? true : false}
          error={errors}
          variant="outlined"
          size="small"
          value={props.value ?? ""}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        >
          <MenuItem value="">Select {label}...</MenuItem>
          {dropDownList.map((item: { id: number; name: string }, index: number) => (
            <MenuItem value={item.id} key={index}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
    {errors && <FormHelperText error>{`Required ! ${errorMessage}`}</FormHelperText>}
  </FormControl>
);

export const PasswordInput = ({ name, register, required, label, errors, errorMessage }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl fullWidth error={errors} required={required}>
      <FormHelperText>
        <b>{label}</b>
      </FormHelperText>
      <TextField
        id={name}
        name={name}
        error={errors}
        variant="outlined"
        size="small"
        type={showPassword ? "text" : "password"}
        inputRef={register({
          required: required,
        })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {errors && <FormHelperText>{`Required ! ${errorMessage}`}</FormHelperText>}
    </FormControl>
  );
};

export const SearchInput = ({ name, control, required, label, errors, errorMessage, searchList }: any) => (
  <FormControl fullWidth error={errors} required={required}>
    <FormHelperText>
      <b>{label}</b>
    </FormHelperText>
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      onChange={([value]: any) => value}
      render={({ onChange }) => (
        <Autocomplete
          options={searchList ?? []}
          disableClearable
          getOptionLabel={(option: any) => option.full_name}
          renderOption={(option) => (
            <Typography noWrap>
              {option.full_name} - <i>({option.role})</i>
            </Typography>
          )}
          onChange={(e, data) => onChange(data?.id)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              error={!!errors.id}
              size="small"
              placeholder="Select user"
              variant="outlined"
            />
          )}
        />
      )}
    />
    {errors && <FormHelperText>{`Required ! ${errorMessage}`}</FormHelperText>}
  </FormControl>
);

export const InfoAlert = ({
  infoAlert,
  setInfoAlert,
}: {
  infoAlert: { severity: string; message: string };
  setInfoAlert: React.Dispatch<
    React.SetStateAction<{
      severity: string;
      message: string;
    }>
  >;
}) => (
  <Grid container justify="center">
    <Grid item xs={10}>
      <Alert
        severity={
          infoAlert.severity === "error"
            ? "error"
            : infoAlert.severity === "success"
            ? "success"
            : infoAlert.severity === "info"
            ? "info"
            : "warning"
        }
        onClose={() => setInfoAlert({ severity: "info", message: "" })}
      >{`${infoAlert.message}`}</Alert>
    </Grid>
  </Grid>
);

export const DatePickerInput = ({ name, disabled, control, required, label, errors, errorMessage }: any) => {
  const [isOpen, setISOPen] = useState(false);

  return (
    <FormControl fullWidth error={errors} required={required}>
      <FormHelperText>
        <b>{label}</b>
      </FormHelperText>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={(props) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              disabled={disabled}
              variant="inline"
              inputVariant="outlined"
              size="small"
              format="MM/dd/yyyy"
              value={props?.value ? moment(props?.value) : ""}
              onChange={(date) => props.onChange(moment(date))}
              onClick={() => setISOPen(true)}
              open={isOpen}
              onClose={() => setISOPen(false)}
            />
          </MuiPickersUtilsProvider>
        )}
      />
      {errors && <FormHelperText error>{`Required ! ${errorMessage}`}</FormHelperText>}
    </FormControl>
  );
};
