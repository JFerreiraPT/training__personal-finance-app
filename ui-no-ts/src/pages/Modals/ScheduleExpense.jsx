import React from "react";
import { Form } from "react-router-dom";
import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";

import Modal from "./RequestResponse";

const initialValues = {
  description: "",
  amount: "",
};

const validationSchema = yup.object().shape({
  description: yup.string().required(),
  amount: yup.number().required().positive(),
});

function ScheduleExpense(props) {
  const handleFormSubmit = (values) => {
    props.submitExpense({...values, date: props.date})
  };

  const form = (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Form method="POST" onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: "span 4", },
              "& > input": { color: "black !important"}
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={!!touched.description && !!errors.description}
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 2", border: "2px solid lightgray", color: "black !important" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="amount"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.amount}
              name="amount"
              error={!!touched.amount && !!errors.amount}
              helperText={touched.amount && errors.amount}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              sx={{ gridColumn: "span 2", border: "2px solid lightgray", color: "black" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Schedule expense
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );

  const modalText = (
    <Box
      sx={{
        color: "black",
      }}
    >
      <h1>{"Success!"}</h1>
      <p>{"Transaction submitted"}</p>
    </Box>
  );

  return (
    <Modal onClick={props.closeModal}>
      {modalText}
      {form}
    </Modal>
  );
}

export default ScheduleExpense;
