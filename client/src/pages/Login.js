import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Container, Box, Paper, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { auth } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showNotification } = useNotification();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await auth.login(values);
      login(response.data.user, response.data.token);
      showNotification('Login successful! Welcome back!');
      navigate('/home');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setErrors({ submit: errorMessage });
      showNotification(errorMessage, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
            Please login to continue
          </Typography>
          
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form style={{ width: '100%', marginTop: '1rem' }}>
                <TextField
                  fullWidth
                  margin="normal"
                  name="email"
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                {errors.submit && (
                  <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                    {errors.submit}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link component={RouterLink} to="/register" color="primary">
                      Register here
                    </Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
