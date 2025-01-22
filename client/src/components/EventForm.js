import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box } from '@mui/material';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date().required('Date is required'),
  location: Yup.string().required('Location is required'),
});

const EventForm = ({ initialValues, onSubmit, buttonText = 'Submit' }) => {
  const defaultValues = {
    title: '',
    description: '',
    date: '',
    location: '',
    ...initialValues,
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600 }}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
            />

            <TextField
              fullWidth
              name="description"
              label="Description"
              multiline
              rows={4}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />

            <TextField
              fullWidth
              name="date"
              label="Date"
              type="datetime-local"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.date && Boolean(errors.date)}
              helperText={touched.date && errors.date}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              name="location"
              label="Location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.location && Boolean(errors.location)}
              helperText={touched.location && errors.location}
            />

            <Button type="submit" variant="contained" color="primary">
              {buttonText}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EventForm;
