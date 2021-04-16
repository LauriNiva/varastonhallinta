
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import NewItemForm from './NewItemForm';


const Items = ({ items, submitNewItem }) => {

  console.log('Items: ', submitNewItem);

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
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.itemcode}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">
                <Button className='btn-delete-item' id={`delete-${row.itemcode}`} onClick={() => alert("del")}>-</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
};

export default Items;