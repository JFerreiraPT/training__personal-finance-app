import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import React from 'react'

const initialValues = {
    category: "",
    type: "",
    description: "",
    source: "",
    amount: "",
    date: "",
    note: "",
}

//define the validation logic
const transactionSchema = yup.object().shape({
    category: yup.string().required("Category is required"),
    type: yup.string().oneOf(['expense', 'revenue']),
    source: yup.string().required("Description is required"),
    amount: yup.number().required().positive(),
    date: yup.date().default(() => new Date()),
})

function NewTransaction() {
    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = (values) => {
        console.log(values);
    }

  return (
    <Box m="20px">
        <Header title="New Transaction Entry" subtitle="Expense or income entry"/>
        <Formik 
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={transactionSchema}
        >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
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
                name="firstName"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="firstName"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
                sx={{ gridColumn: "span 2" }}
              />
              </Box>
                </form>
            )}
        </Formik>
    </Box>
  )
}

export default NewTransaction