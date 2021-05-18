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
import categoriesService from './services/categories';






const App = () => {


  const [user, setUser] = useState({ name: 'none' });
  const [storages, setStorages] = useState([]);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
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

      categoriesService.getCategories(user._id)
        .then(categories => setCategories(categories));
    }
  }, [user]);

  const getUser = (e) => {
    usersService.getUser(e.target.value)
      .then(res => {
        setUser(res);
      });
  };

  const handleStockClick = (itemId, change) => {
    console.log('stockclick: ', itemId, change)

    storagesService.updateStorageStock(storages[selectedStorage]._id, itemId, change)
      .then(updatedStorage => setStorages(storages.map(storage => storage._id !== storages[selectedStorage]._id ? storage : updatedStorage)));
  };



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
      .then(() => {
        setStorages(storages.filter(storage => storage._id !== storageId));
        setSelectedStorage(0);
      });
  }

  const submitNewCategory = (newCategory) => {
    categoriesService.createNewCategory(newCategory)
      .then(savedCategory => {
        setCategories(categories.concat(savedCategory));
        usersService.addUserCategory(user._id, savedCategory);
      });
  };

  const deleteCategory = (categoryId) => {
    categoriesService.deleteCategory(categoryId)
      .then(usersService.deleteUserCategory(user._id, categoryId))
      .then(() => setCategories(categories.filter(category => category._id !== categoryId)));
  };

  const linkItemsToStorage = (listOfItemIds) => {
    const storageId = storages[selectedStorage]._id;
    const arrayOfItemsToAdd = items.filter(item => listOfItemIds.includes(item._id))
    arrayOfItemsToAdd.forEach(item => item.stock = 0);
    storagesService.addItemsToStorage(storageId, arrayOfItemsToAdd)
      .then(updatedStorage => setStorages(storages.map(storage => storage._id !== storages[selectedStorage]._id ? storage : updatedStorage)));
  };

  const removeItemFromStorage = (itemId) => {
    const storageId = storages[selectedStorage]._id;
    storagesService.deleteItemFromStorage(storageId, itemId)
      .then(() => {
        const updatedStorage = {...storages[selectedStorage]};
        updatedStorage.items = updatedStorage.items.filter(item => item._id !== itemId);
        setStorages(storages.map(storage => storage._id !== storages[selectedStorage]._id ? storage : updatedStorage));
      });
  };


  return (
    <Router>
      <div className="App">

        <Nav getUser={getUser} />
        <Paper className='body-container'>
          {user.storages ?
            <Switch>
              <Route path='/' exact>
                <Storages storages={storages} selectedStorage={selectedStorage} setSelectedStorage={setSelectedStorage}
                  handleStockClick={handleStockClick} items={items} linkItemsToStorage={linkItemsToStorage}
                  removeItemFromStorage={removeItemFromStorage} />
              </Route>
              <Route path='/hallinta'>
                <Options items={items} submitNewItem={submitNewItem} deleteItem={deleteItem}
                  storages={storages} submitNewStorage={submitNewStorage} deleteStorage={deleteStorage}
                  categories={categories} submitNewCategory={submitNewCategory} deleteCategory={deleteCategory} />
              </Route>
            </Switch>
            : <div>Choose a user</div>
          }
        </Paper>

      </div>
    </Router>
  );
}

export default App;
