import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react'


const NewUserDialog = ({ submitNewUser }) => {

  const [newUserDialogOpen, setNewUserDialogOpem] = useState(false);

  const handleItemClickOpen = () => {
    setNewUserDialogOpem(true);
  };

  const handleItemClose = () => {
    setNewUserDialogOpem(false);
  };

  const handleAddClick = (data) => {
    handleItemClose();
    submitNewUser(data);
  };

  return (
    <div>
      <div>
        <Button variant='contained' color='primary' onClick={handleItemClickOpen}>Rekisteröidy</Button>
      </div>

      <Dialog open={newUserDialogOpen} onClose={handleItemClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Rekisteröi käyttäjä</DialogTitle>
        <DialogContent>
        <Formik
        initialValues={{ username: '', name:'', password: '' }}
        onSubmit={(data, actions) => {
          handleAddClick(data);
          actions.resetForm();
        }}>
        {() => (
          <Form> 
            <Field name='username' label='Käyttäjätunnus' type='input' as={TextField}></Field>
            <Field name='name' label='Nimi' type='input' as={TextField}></Field>
            <Field name='password' label='Salasana' type='password' as={TextField}></Field>
            
            <Button type='submit' variant='contained' color='primary'>Rekisteröi</Button>
          </Form>
        )}
      </Formik>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleItemClose} color="secondary">
            Takaisin
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewUserDialog
