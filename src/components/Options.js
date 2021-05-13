import { Tab, Tabs, Toolbar } from '@material-ui/core';
import React from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import StorageOptions from './StorageOptions';
import ItemOptions from './ItemOptions';
import CategoryOptions from './CategoryOptions';



const OptionsBar = () => {

  const { url } = useRouteMatch();


  return (
    <div className='optionstab'>

      <Toolbar>
        <Link to={`${url}/tuotteet`}>Tuotteet</Link>
        <Link to={`${url}/varastot`}>Varastot</Link>
        <Link to={`${url}/kategoriat`}>Kategoriat</Link>
      </Toolbar>

      {/* <Tabs >
      <Tab label='Tuotteet' />
        <Link to={`${url}/tuotteet`}><Tab label='Tuotteet' /></Link>
        <Link to={`${url}/varastot`}><Tab label='Varastot' /></Link>
        <Link to={`${url}/kategoriat`}><Tab label='Kategoriat' /></Link> 
      </Tabs> */}
    </div>
  )
};


const Options = ({ items, submitNewItem, deleteItem, storages, submitNewStorage, deleteStorage, categories, submitNewCategory}) => {

  const { path } = useRouteMatch();


  return (
    <div>
      <OptionsBar />
      
          <Route path={`${path}/tuotteet`}>
            <ItemOptions items={items} submitNewItem={submitNewItem} deleteItem={deleteItem} />
          </Route>
          <Route path={`${path}/varastot`}>
            <StorageOptions storages={storages} submitNewStorage={submitNewStorage} deleteStorage={deleteStorage} />
          </Route>
          <Route path={`${path}/kategoriat`}>
            <CategoryOptions categories={categories} submitNewCategory={submitNewCategory} />
          </Route>
        


    </div>
  )
}

export default Options;