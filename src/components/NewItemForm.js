import { Button, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';

const NewItemForm = ({submitNewItem, categories}) => {

  return (
    <div className='add-new-form'>
      <Typography variant='h6'>Lisää uusi tuote</Typography>
      <Formik
        initialValues={{ itemcode: '', name: '', category: '' }}
        onSubmit={(data) => {
          submitNewItem(data);
        }}>
        {() => (
          <Form> 
            <Field name='itemcode'  type='input' label='Tuotekoodi' as={TextField}></Field>
            <Field name='name' label='Tuote' type='input' as={TextField}></Field>
            <Field name='category' label='Kategoria' type='select' as={Select}>
              {categories.map(category => <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem> )}
            </Field>
            <Button type='submit' variant='contained' color='primary'>Lisää</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewItemForm;