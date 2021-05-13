import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import NewCategoryForm from './NewCategoryForm';

function CategoryOptions({ categories, submitNewCategory }) {
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
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                -
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
