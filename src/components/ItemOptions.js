
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import NewItemForm from './NewItemForm';


const ItemOptions = ({ items, submitNewItem, deleteItem }) => {


  return (
    <div>
    <NewItemForm submitNewItem={submitNewItem} />
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tuotekoodi</TableCell>
            <TableCell>Tuote</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Poista</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(row => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.itemcode}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">
                <Button color="secondary" variant="contained" className='btn-delete-item' id={`del-${row._id}`} onClick={()=>deleteItem(row._id)}>-</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
};

export default ItemOptions;