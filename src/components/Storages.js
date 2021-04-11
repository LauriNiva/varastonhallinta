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

const StorageItemsTable = ({ storage, handleStockDecreaseClick, handleStockIncreaseClick }) => {


  if (storage === undefined) return <div></div>;

  const createData = (code, name, category, stock) => {
    return { code, name, category, stock };
  };

  const rows = storage.items.map(item => createData(item.itemcode, item.name, item.category, item.stock));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tuotekoodi</TableCell>
            <TableCell>Tuote</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Määrä</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.code}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">
                <Button id={`decrease-${i}`} onClick={handleStockDecreaseClick}>-</Button>
                <span>{row.stock}</span>
                <Button id={`increase-${i}`} onClick={handleStockIncreaseClick}>+</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

const Storages = ({ storages, selectedStorage, setSelectedStorage, handleStockDecreaseClick, handleStockIncreaseClick }) => {


  return (
    <div>
      <StoragesBar storages={storages} selectedStorage={selectedStorage} setSelectedStorage={setSelectedStorage} />
      <StorageItemsTable storage={storages[selectedStorage]} handleStockDecreaseClick={handleStockDecreaseClick} handleStockIncreaseClick={handleStockIncreaseClick} />
    </div>
  )
};


export default Storages;