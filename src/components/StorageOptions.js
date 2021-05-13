import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import NewStorageForm from './NewStorageForm';

function StorageOptions({storages, submitNewStorage, deleteStorage}) {
  return (
    <div>
      <NewStorageForm submitNewStorage={submitNewStorage}/>

      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Varasto</TableCell>
            <TableCell align="right">Poista</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {storages.map(row => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <Button color="secondary" variant="contained" className='btn-delete-item' id={`del-${row._id}`} onClick={() => deleteStorage(row._id)}>-</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
    </div>
  )
};

export default StorageOptions;
