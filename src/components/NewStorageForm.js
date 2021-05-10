import { Button, TextField } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';

function NewStorageForm({submitNewStorage}) {
  return (
    <div>
      <Formik
      initialValues={{name: ''}}
        onSubmit={(data) => {
          submitNewStorage(data);
          console.log('submit Item:', data);
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
