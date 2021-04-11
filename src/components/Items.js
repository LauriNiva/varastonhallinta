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


const Items = ({ items }) => {

  const createData = (code, name, category, stock) => {
    return { code, name, category, stock };
  };

  const rows = items.map(item => createData(item.itemcode, item.name, item.category, item.stock));


  return (
    <div>
      {items.map(item => <div>{item.name}</div>)}
    </div>
  )
};

export default Items;