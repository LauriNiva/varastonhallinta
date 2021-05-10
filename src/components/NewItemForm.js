import { Button, TextField } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';

const NewItemForm = ({submitNewItem}) => {


  return (
    <div>
      <Formik
        initialValues={{ itemcode: '', name: '', category: '' }}
        onSubmit={(data) => {
          submitNewItem(data);
          console.log('submit Item:', data);
        }}>
        {() => (
          <Form>
            
            <Field name='itemcode' placeholder='Tuotekoodi' type='input' as={TextField}></Field>
            <Field name='name' placeholder='Tuote' type='input' as={TextField}></Field>
            <Field name='category' placeholder='Kategoria' type='input' as={TextField}></Field>
            <Button type='submit' variant='contained' color='primary'>Lisää</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewItemForm;