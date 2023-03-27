import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";

import React, { useState } from "react";
import { Form } from "react-router-dom";
import Modal from "../Modals/RequestResponse";

import useFetch from "../../hooks/use-fetch";

const TRANSACTIONS_URL = "http://localhost:8000/api/transactions";

const initialValues = {
  category: "",
  type: "",
  description: "",
  source: "",
  amount: "",
  date: "",
  note: "",
};

//define the validation logic
const transactionSchema = yup.object().shape({
  category: yup.string().required("Category is required"),
  type: yup.string().required().oneOf(["expense", "revenue"]),
  source: yup.string().required("source is required"),
  amount: yup.number().required().positive(),
  date: yup.date().default(() => new Date()),
  description: yup.string().required("Description is required"),
});

function NewTransaction() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { isLoading, error, post } = useFetch();

  const [modalIsShowing, setModalIsShowing] = useState(false);

  const showModalHandler = () => {
    setModalIsShowing(true);
  };

  const hideModalHandler = () => {
    setModalIsShowing(false);
  };

  const continueHandler = (
  ) => {
    setModalIsShowing(false)
    navigate("/transactions")
  };

  const modalText = (
    <Box sx={{
      color: "black"
    }}>
      <h1>
        {error ? 'Error!' : 'Success!'}
      </h1>
      <p>
        {error ? error : 'Transaction submitted'}
      </p>
    </Box>
  );

  const modalActions = (
    <Box display="flex" justifyContent="end" mt="20px">
      <Button
        sx={{
          mr: "12px",
        }}
        type="submit"
        color="error"
        variant="contained"
        onClick={hideModalHandler}
      >
        Cancel
      </Button>
      {!error && (
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={continueHandler}
        >
          Continue
        </Button>
      )}
    </Box>
  );

  const dataHandler = () => {
    setModalIsShowing(true);
  };

  const handleFormSubmit = (values) => {
    post(
      {
        url: TRANSACTIONS_URL,
        body: values,
        headers: { "Content-Type": "application/json" },
      },
      dataHandler, dataHandler
    );
  };

  return (
    <>
      {modalIsShowing && (
        <Modal>
          {modalText}
          {modalActions}
        </Modal>
      )}
      <Box m="20px">
        <Header
          title="New Transaction Entry"
          subtitle="Expense or income entry"
        />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={transactionSchema}
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
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  name="category"
                  error={!!touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                  sx={{ gridColumn: "span 2" }}
                />

                {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="type"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
                sx={{ gridColumn: "span 2" }}
              /> */}
                <Select
                  fullWidth
                  variant="filled"
                  label="type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.type}
                  name="type"
                  error={!!touched.type && !!errors.type}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                  <MenuItem value="revenue">Revenue</MenuItem>
                </Select>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="description"
                  multiline
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.descriptions}
                  name="description"
                  rows={2}
                  error={!!touched.type && !!errors.description}
                  helperText={touched.type && errors.type}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="source"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.source}
                  name="source"
                  error={!!touched.source && !!errors.source}
                  helperText={touched.source && errors.source}
                  sx={{ gridColumn: "span 2" }}
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
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.date}
                  name="date"
                  error={!!touched.date && !!errors.date}
                  helperText={touched.date && errors.date}
                  sx={{ gridColumn: "span 1" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="notes"
                  multiline
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.note}
                  name="note"
                  rows={2}
                  error={!!touched.note && !!errors.note}
                  helperText={touched.note && errors.note}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  disabled={isLoading}
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Create transactions
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default NewTransaction;
