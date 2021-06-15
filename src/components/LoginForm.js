import { Button, TextField, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';

const LoginForm = ({loginUser}) => {
  return (
    <div className='login-form'>
      <Typography variant='h6'>Kirjaudu sisään</Typography>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(data, actions) => {
          loginUser(data);
          actions.resetForm();
        }}>
        {() => (
          <Form> 
            <Field name='username'  type='input' label='Käyttäjätunnus' as={TextField}></Field>
            <Field name='password' label='Salasana' type='password' as={TextField}></Field>
            
            <Button type='submit' variant='contained' color='primary'>Login</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm;
