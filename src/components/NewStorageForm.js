import { Button, TextField, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';

function NewStorageForm({submitNewStorage}) {
  return (
    <div className='add-new-form'>
      <Typography variant='h6'>Lisää uusi varasto</Typography>
      <Formik
      initialValues={{name: ''}}
        onSubmit={(data) => {
          submitNewStorage(data);
        }}>
        {() => (
          <Form>
            <Field name='name' placeholder='Nimi' type='input' as={TextField}></Field>
            <Button type='submit' variant='contained' color='primary'>Lisää</Button>
          </Form>
        )}
      </Formik>
      
    </div>
  )
};

export default NewStorageForm;
