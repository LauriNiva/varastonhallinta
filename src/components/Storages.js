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

const StorageItemsTable = ({ storage, handleStockClick, removeItemFromStorage }) => {

  const [deleteItems, setDeleteItems] = useState(false);

  const handleDeleteToggleClick = () => {
    setDeleteItems(!deleteItems);
  }


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
            <TableCell><Button variant={deleteItems ? 'contained' : 'outlined'} color='secondary' onClick={handleDeleteToggleClick}>Poista</Button></TableCell>
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
                <Button id={`decrease-${row._id}`} onClick={() => handleStockClick(row._id, -1)}>-</Button>
                <span>{row.stock}</span>
                <Button id={`increase-${row._id}`} onClick={() => handleStockClick(row._id, 1)}>+</Button>
              </TableCell>
              <TableCell>
                <Button variant='contained' color='secondary' disabled={!deleteItems} onClick={()=>removeItemFromStorage(row)}>-</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

const AddItemsDialog = ({ storage, items, linkItemsToStorage, }) => {

  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [itemsAvailable, setItemsAvailable] = useState([]);
  
  
  

  useEffect(() => {
    if (storage !== undefined) {
      const itemIdsInStorage = storage.items.map(item => item._id);
      setItemsAvailable(items.filter(item => !itemIdsInStorage.includes(item._id)));
    }
  }, [itemDialogOpen, items, storage]);

  useEffect(() => {
    const sItems = {};
    itemsAvailable.forEach(item => sItems[item._id] = false )
    setSelectedItems(sItems);
  }, [itemsAvailable]);

  const handleItemClickOpen = () => {
    setItemDialogOpen(true);
  };

  const handleItemClose = () => {
    setItemDialogOpen(false);
  }

  const handleClick = (id) => {
    const currentCheckedItems = {...selectedItems};
    currentCheckedItems[id] = !currentCheckedItems[id];
    setSelectedItems(currentCheckedItems);

  }

  const handleAddClick = () => {
    handleItemClose();
    const itemsToAdd = [];
    for (let id in selectedItems) {
      if (selectedItems[id])itemsToAdd.push(id);
    };
    linkItemsToStorage(itemsToAdd);
  }
  
  
  
  


  if (storage === undefined) return <div></div>;

  return (
    <div>
      <div className='storages-top-buttons-container'>
        <Button variant='contained' color='primary' onClick={handleItemClickOpen}>Lisää tuote</Button>
        
      </div>
      
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
            type="email"//??
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
                  <TableRow key={row._id} onClick={() => handleClick(row._id,selectedItems)} >
                    <TableCell component="th" scope="row">
                      <Checkbox id={`checkbox-${row._id}`} checked={selectedItems[row._id]} color="primary" />
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
          <Button onClick={handleAddClick} color="primary">
            Lisää
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}



const Storages = ({ storages, selectedStorage, setSelectedStorage, handleStockClick, items, linkItemsToStorage, removeItemFromStorage }) => {
  

  return (

    <div>
      <StoragesBar storages={storages} selectedStorage={selectedStorage} setSelectedStorage={setSelectedStorage} />
      <AddItemsDialog storage={storages[selectedStorage]} items={items} linkItemsToStorage={linkItemsToStorage} />
      <StorageItemsTable storage={storages[selectedStorage]} handleStockClick={handleStockClick} removeItemFromStorage={removeItemFromStorage} />
    </div>
  )
};


export default Storages;