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

import LoginForm from './components/LoginForm';
import loginService from './services/login';
import NewUserDialog from './components/NewUserDialog';



const App = () => {

  const [user, setUser] = useState(null);
  const [storages, setStorages] = useState([]);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(0);

  useEffect( () => {
    setSelectedStorage(0);

    if (user) {
      storagesService.getStorages(user.id)
        .then(storages => setStorages(storages))
        .catch(error => {
          if(error.response.status === 401)logoutUser();
        });

      itemsService.getUserItems(user.id)
        .then(items => setItems(items))
        .catch(error => {
          if(error.response.status === 401)logoutUser();
        });;

      categoriesService.getCategories(user.id)
        .then(categories => setCategories(categories))
        .catch(error => {
          if(error.response.status === 401)logoutUser();
        });;
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedVarastonhallintaUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      itemsService.setToken(user.token);
      storagesService.setToken(user.token);
      categoriesService.setToken(user.token);
      setUser(user)
    }
  }, [])

  const loginUser = async (data) => {
    try {
      const user = await loginService.login(data);
      setUser(user);
      itemsService.setToken(user.token);
      storagesService.setToken(user.token);
      categoriesService.setToken(user.token);
      window.localStorage.setItem(
        'loggedVarastonhallintaUser', JSON.stringify(user)
      )
    } catch (e) {
      console.log('login error')
    }
  };

  const logoutUser = () => {
    window.localStorage.removeItem('loggedVarastonhallintaUser');
    setUser(null);
  };

  const submitNewUser = (data) => {
    usersService.createUser(data);
  };
  

  const handleStockClick = (itemId, change) => {
    storagesService.updateStorageStock(storages[selectedStorage]._id, itemId, change)
      .then(updatedStorage => setStorages(storages.map(storage => storage._id !== storages[selectedStorage]._id ? storage : updatedStorage)));
  };

  const submitNewItem = (newItem) => {
    newItem["userid"] = user.id; // POISTA T??M?? KUN TOKEN K??YT??SS??
    itemsService.createNewItem(newItem)
      .then(savedItem => {
        setItems(items.concat(savedItem));
      })
  };

  const deleteItem = (itemToDelete) => {
    if (window.confirm(`Poista tuote ${itemToDelete.name}?`)) {
      itemsService.deleteItem(itemToDelete._id)
        .then(usersService.deleteUserItem(user.id, itemToDelete._id))
        .then(setItems(items.filter(item => item._id !== itemToDelete._id)));
    }
  };

  const submitNewStorage = (newStorage) => {
    storagesService.createNewStorage(newStorage)
      .then(savedStorage => {
        setStorages(storages.concat(savedStorage));
        usersService.addUserStorage(user.id, savedStorage);
      });
  };

  const deleteStorage = (storageToDelete) => {
    if (window.confirm(`Poista varasto ${storageToDelete.name} ?`)) {
      storagesService.deleteStorage(storageToDelete._id)
        .then(usersService.deleteUserStorage(user.id, storageToDelete._id))
        .then(() => {
          setStorages(storages.filter(storage => storage._id !== storageToDelete._id));
          setSelectedStorage(0);
        });
    }
  };

  const submitNewCategory = (newCategory) => {
    categoriesService.createNewCategory(newCategory)
      .then(savedCategory => {
        setCategories(categories.concat(savedCategory));
        usersService.addUserCategory(user.id, savedCategory);
      });
  };

  const deleteCategory = (categoryToDelete) => {
    if (window.confirm(`Poista kategoria ${categoryToDelete.name} ?`)) {
      categoriesService.deleteCategory(categoryToDelete._id)
        .then(usersService.deleteUserCategory(user.id, categoryToDelete._id))
        .then(() => setCategories(categories.filter(category => category._id !== categoryToDelete._id)));
    }
  };

  const linkItemsToStorage = (listOfItemIds) => {
    const storageId = storages[selectedStorage]._id;
    const arrayOfItemsToAdd = items.filter(item => listOfItemIds.includes(item._id))
    arrayOfItemsToAdd.forEach(item => item.stock = 0);
    storagesService.addItemsToStorage(storageId, arrayOfItemsToAdd)
      .then(updatedStorage => setStorages(storages.map(storage => storage._id !== storages[selectedStorage]._id ? storage : updatedStorage)));
  };

  const removeItemFromStorage = (itemToRemove) => {
    if (window.confirm(`Poistetaanko ${itemToRemove.name} varastosta ${storages[selectedStorage].name}?`)) {
      const storageId = storages[selectedStorage]._id;
      storagesService.deleteItemFromStorage(storageId, itemToRemove._id)
        .then(() => {
          const updatedStorage = { ...storages[selectedStorage] };
          updatedStorage.items = updatedStorage.items.filter(item => item._id !== itemToRemove._id);
          setStorages(storages.map(storage => storage._id !== storages[selectedStorage]._id ? storage : updatedStorage));
        });
    }
  };


  return (
    <Router>
      <div className="App">

        <Nav user={user} logoutUser={logoutUser} />

        <Paper className='body-container'>

          {user
            ? <Switch>
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
            : <div>
              <LoginForm loginUser={loginUser} />
              <NewUserDialog submitNewUser={submitNewUser}/>
            </div>
          }
        </Paper>

      </div>
    </Router>
  );
}

export default App;
