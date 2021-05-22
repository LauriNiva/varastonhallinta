import { Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { Link, Route, useHistory, useRouteMatch } from 'react-router-dom';
import StorageOptions from './StorageOptions';
import ItemOptions from './ItemOptions';
import CategoryOptions from './CategoryOptions';



const OptionsBar = () => {

  const { url } = useRouteMatch();
  const { location } = useHistory();


  return (
    <div className='optionstab'>
      <Tabs value={location.pathname}>
        <Tab label='Tuotteet' value='/hallinta/tuotteet' to={`${url}/tuotteet`} component={Link} />
        <Tab label='Varastot' value='/hallinta/varastot' to={`${url}/varastot`} component={Link} />
        <Tab label='Kategoriat' value='/hallinta/kategoriat' to={`${url}/kategoriat`} component={Link} />
      </Tabs>
    </div>
  )
};


const Options = ({ items, submitNewItem, deleteItem, storages, submitNewStorage, deleteStorage, categories, submitNewCategory, deleteCategory}) => {

  const { path } = useRouteMatch();


  return (
    <div>
      <OptionsBar />
      
          <Route path={`${path}/tuotteet`}>
            <ItemOptions items={items} submitNewItem={submitNewItem} deleteItem={deleteItem} categories={categories} />
          </Route>
          <Route path={`${path}/varastot`}>
            <StorageOptions storages={storages} submitNewStorage={submitNewStorage} deleteStorage={deleteStorage} />
          </Route>
          <Route path={`${path}/kategoriat`}>
            <CategoryOptions categories={categories} submitNewCategory={submitNewCategory} deleteCategory={deleteCategory}/>
          </Route>
        


    </div>
  )
}

export default Options;