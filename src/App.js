import './App.css';
import 'fontsource-roboto';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import usersService from './services/users';
import storagesService from './services/storages';
import itemsService from './services/items';

import Nav from './components/Nav';
import Storages from './components/Storages';

import Paper from '@material-ui/core/Paper';
import Options from './components/Options';






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
    usersService.getUser(e.target.value)
      .then(res => {
        setUser(res);
      });
  };

  const handleStockClick = (e, newStock) => {
    const storageId = storages[selectedStorage]._id;
    const itemIndex = e.currentTarget.id.slice(-1);

    storagesService.updateStorageStock(storageId, itemIndex, newStock)
      .then(updatedStorage => setStorages(storages.map(storage => storage._id !== storageId ? storage : updatedStorage)));
  };

  const handleStockDecreaseClick = (e) => {
    const currentStock = e.currentTarget.nextElementSibling.textContent;
    if (currentStock > 0) handleStockClick(e, -1);
  }

  const handleStockIncreaseClick = (e) => {
    handleStockClick(e, 1);
  }

  const submitNewItem = (newItem) => {
    itemsService.createNewItem(newItem)
      .then(savedItem => {
        setItems(items.concat(savedItem));
        usersService.addUserItem(user._id, savedItem);
      })
  }

  const deleteItem = (itemId) => {
    itemsService.deleteItem(itemId)
      .then(usersService.deleteUserItem(user._id, itemId))
      .then(setItems(items.filter(item => item._id !== itemId)));
  }

  const submitNewStorage = (newStorage) => {
    storagesService.createNewStorage(newStorage)
    .then(savedStorage => {
      setStorages(storages.concat(savedStorage));
      usersService.addUserStorage(user._id, savedStorage);
    });
  };

  const deleteStorage = (storageId) => {
    storagesService.deleteStorage(storageId)
    .then(usersService.deleteUserStorage(user._id, storageId))
    .then(()=>{
      setStorages(storages.filter(storage => storage._id !== storageId));
      setSelectedStorage(0);
    });
  }
  
  


  return (
    <Router>
      <div className="App">

        <Nav getUser={getUser} />
        <Paper className='body-container'>

          <Switch>
            <Route path='/' exact>
              <Storages storages={storages} selectedStorage={selectedStorage} setSelectedStorage={setSelectedStorage}
                handleStockDecreaseClick={handleStockDecreaseClick} handleStockIncreaseClick={handleStockIncreaseClick} />
            </Route>
            <Route path='/hallinta'>
              <Options items={items} submitNewItem={submitNewItem} deleteItem={deleteItem} 
              storages={storages} submitNewStorage={submitNewStorage} deleteStorage={deleteStorage}/>
            </Route>
          </Switch>
        </Paper>

      </div>
    </Router>
  );
}

export default App;
