import { TextField, Box, Stack, Button } from '@mui/material';
import { useState, useReducer } from 'react';
import {
  INITIAL_STATE,
  formReducer,
  formActions,
} from '../reducers/formReducer';

const Register = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const changeInput = (name, value) => {
    dispatch({
      type: formActions.CHANGE_INPUT,
      payload: {
        name,
        value,
      },
    });
  };

  const validateInput = (name) => {
    dispatch({
      type: formActions.VALIDATE_INPUT,
      payload: {
        name,
      },
    });
  };

  const validateForm = () => {
    if (
      state.username.hasError ||
      state.password.hasError ||
      state.passwordConfirm.hasError
    ) {
      dispatch({ type: formActions.ENABLE_FORM, payload: false });
    } else {
      dispatch({ type: formActions.ENABLE_FORM, payload: true });
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    changeInput(name, value);
    validateInput(name);
    validateForm();
  };

  const handleInputBlur = (e) => {
    const name = e.target.name;
    validateInput(name);
    validateForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.password.value !== state.passwordConfirm.value) {
      dispatch({
        type: formActions.PASSWORD_ERR,
      });
    } else {
      // Register user..
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack
        margin="50px auto"
        spacing={2}
        sx={{
          maxWidth: {
            sm: '50%',
            xs: '90%',
          },
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          value={state.username.value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={state.username.hasError && state.username.touched}
          helperText={state.username.error}
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          value={state.password.value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={state.password.hasError && state.password.touched}
          helperText={state.password.error}
          type="password"
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          name="passwordConfirm"
          value={state.passwordConfirm.value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={
            state.passwordConfirm.hasError && state.passwordConfirm.touched
          }
          helperText={state.passwordConfirm.error}
          type="password"
        />
        <Button
          variant="contained"
          type="submit"
          disabled={state.isFormDisabled}
        >
          Register
        </Button>
      </Stack>
    </Box>
  );
};
export default Register;
