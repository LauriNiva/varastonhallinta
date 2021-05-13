import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import NewCategoryForm from './NewCategoryForm';

function CategoryOptions({ categories, submitNewCategory, deleteCategory }) {
  return (
    <div>
      <NewCategoryForm submitNewCategory={submitNewCategory} />

      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Kategoria</TableCell>
            <TableCell align="right">Poista</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map(row => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
              <Button color="secondary" variant="contained" className='btn-delete-item' id={`del-${row._id}`} onClick={() => deleteCategory(row._id)}>-</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default CategoryOptions;
