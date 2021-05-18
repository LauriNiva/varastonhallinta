import { Button, TextField, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';

function NewCategoryForm({submitNewCategory}) {
  return (
    <div className='add-new-form'>
      <Typography variant='h6'>Lisää uusi kategoria</Typography>
      <Formik
      initialValues={{name: ''}}
        onSubmit={(data) => {
          submitNewCategory(data);
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

export default NewCategoryForm;
