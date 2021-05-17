import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';


const StoragesBar = ({ storages, selectedStorage, setSelectedStorage }) => {

  const handleChange = (e, newTab) => {
    setSelectedStorage(newTab);
  };

  return (
    <div className='storagetabs'>
      <Tabs value={selectedStorage} onChange={handleChange}>
        {storages.map((storage, i) => <Tab value={i} key={storage._id} label={storage.name} />)}
      </Tabs>
    </div>
  )
};

const StorageItemsTable = ({ storage, handleStockClick }) => {


  if (storage === undefined) return <div></div>;


  return (
    <TableContainer component={Paper}>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tuotekoodi</TableCell>
            <TableCell>Tuote</TableCell>
            <TableCell align="right">Kategoria</TableCell>
            <TableCell align="right">Määrä</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {storage.items.map(row => (
            <TableRow key={row.name}>
              {/* change row.name to row.id */}
              <TableCell component="th" scope="row">
                {row.itemcode}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">
                <Button id={`decrease-${row.id}`} onClick={() => handleStockClick(row.id, -1)}>-</Button>
                <span>{row.stock}</span>
                <Button id={`increase-${row.id}`} onClick={() => handleStockClick(row.id, 1)}>+</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

const AddItemDialog = ({ itemDialogOpen, handleItemClickOpen, handleItemClose, storage, items }) => {
  


  const [selectedItems, setSelectedItems] = useState({});
  const [itemsAvailable, setItemsAvailable] = useState([]);

  

  useEffect (() =>{
    if(storage !== undefined){
    const itemIdsInStorage = storage.items.map(item => item.id);
    setItemsAvailable(items.filter(item => !itemIdsInStorage.includes(item._id)))
    }
  },[items,storage])

  

  if (storage === undefined) return <div></div>;

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleItemClickOpen}>Lisää tuote</Button>
      <Dialog open={itemDialogOpen} onClose={handleItemClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Lisää tuote</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Valittu varasto: {storage.name}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Hae lisättävä tuote tai kategoria"
            type="email"
            fullWidth
          />

          <TableContainer component={Paper}>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Varastossa</TableCell>
                  <TableCell>Tuotekoodi</TableCell>
                  <TableCell align="right">Tuote</TableCell>
                  <TableCell align="right">Kategoria</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemsAvailable.map((row) => (
                  <TableRow key={row._id} onClick={() => handleClick(row._id)} >
                    <TableCell component="th" scope="row">
                      <Checkbox id={`checkbox-${row._id}`} color="primary" />
                    </TableCell>
                    <TableCell>{row.itemcode}</TableCell>
                    <TableCell >{row.name}</TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>



        </DialogContent>
        <DialogActions>
          <Button onClick={handleItemClose} color="secondary">
            Takaisin
          </Button>
          <Button onClick={handleItemClose} color="primary">
            Lisää
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const handleClick = (id) => {
  console.log('click ', id)
}

const handleCheckboxChange = (itemId) => {
  console.log(`itemId`, itemId)
}




const Storages = ({ storages, selectedStorage, setSelectedStorage, handleStockClick, items, addItemToStorage }) => {

  const [itemDialogOpen, setItemDialogOpen] = useState(false);

  const handleItemClickOpen = () => {
    setItemDialogOpen(true);
  };

  const handleItemClose = () => {
    setItemDialogOpen(false);
  }


  return (

    <div>
      <StoragesBar storages={storages} selectedStorage={selectedStorage} setSelectedStorage={setSelectedStorage} />
      <AddItemDialog storage={storages[selectedStorage]} items={items}
        itemDialogOpen={itemDialogOpen} handleItemClose={handleItemClose} handleItemClickOpen={handleItemClickOpen} />
      <StorageItemsTable storage={storages[selectedStorage]}
        handleStockClick={handleStockClick} />
    </div>
  )
};


export default Storages;