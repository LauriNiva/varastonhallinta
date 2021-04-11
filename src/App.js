import './App.css';
import 'fontsource-roboto';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import userService from './services/users';
import storagesService from './services/storages';
import itemsService from './services/items';

import Nav from './components/Nav';
import Storages from './components/Storages';
import Items from './components/Items';

import Paper from '@material-ui/core/Paper';





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

  const handleStockClick = (e, newStock) => {
    const storageId = storages[selectedStorage]._id;
    const itemIndex = e.currentTarget.id.slice(-1);

    storagesService.updateStorage(storageId, itemIndex, newStock)
      .then(updatedStorage => setStorages(storages.map(storage => storage._id !== storageId ? storage : updatedStorage)));
  };

  const handleStockDecreaseClick = (e) => {
    const currentStock = e.currentTarget.nextElementSibling.textContent;
    if(currentStock > 0) handleStockClick(e, -1);  
  }

  const handleStockIncreaseClick = (e) => {
    handleStockClick(e, 1);
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
