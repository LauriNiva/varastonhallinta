import './App.css';
import 'fontsource-roboto';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import userService from './services/users';
import storagesService from './services/storages';
import itemsService from './services/items';

import Nav from './components/Nav';
import Storages from './components/Storages'


import Paper from '@material-ui/core/Paper';





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



const App = () => {


  const [user, setUser] = useState({ name: 'none' });
  const [storages, setStorages] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(0);

  useEffect(() => {
    setSelectedStorage(0);

    if (user._id) {
      storagesService.getStorages(user._id)
        .then(storages => {
          setStorages(storages);
        });

      itemsService.getUserItems(user._id)
        .then(items => setItems(items));
    }
  }, [user]);

  const getUser = (e) => {
    userService(e.target.value)
      .then(res => {
        setUser(res);
      });
  };

  const handleStockDecreaseClick = (e) => {

    const storageId = storages[selectedStorage]._id;
    const itemIndex = e.currentTarget.id.slice(-1);
    const newStock = -1;

    storagesService.updateStorage(storageId, itemIndex, newStock)
      .then(updatedStorage => setStorages(storages.map(storage => storage._id !== storageId ? storage : updatedStorage)));
  }


  const handleStockIncreaseClick = (e) => {

    const storageId = storages[selectedStorage]._id;
    const itemIndex = e.currentTarget.id.slice(-1);
    const newStock = 1;

    storagesService.updateStorage(storageId, itemIndex, newStock)
      .then(updatedStorage => setStorages(storages.map(storage => storage._id !== storageId ? storage : updatedStorage)));
  }


  return (
    <Router>
      <div className="App">

        <Nav getUser={getUser} />
        <Paper className='body-container'>
          <Switch>
            <Route path='/' exact render={(props) => <Storages {...props} storages={storages} selectedStorage={selectedStorage} setSelectedStorage={setSelectedStorage}
              handleStockDecreaseClick={handleStockDecreaseClick} handleStockIncreaseClick={handleStockIncreaseClick} />} />
            <Route path='/hallinta' render={(props) => <Items {...props} items={items} />} />
          </Switch>
        </Paper>

      </div>
    </Router>
  );
}

export default App;
