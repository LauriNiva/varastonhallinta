
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Items from './components/Items';
import CategoryButtons from "./components/CategoryButtons";
import AddNewItemForm from "./components/AddNewItemForm";



function App() {

  const [goods, setGoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [itemsFilter, setItemsFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);

  const [newItemElguide, setNewItemElguide] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setnewItemCategory] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:3001/goods")
      .then(response => {
        setGoods(response.data);
      });

    axios
      .get("http://localhost:3001/categories")
      .then(response => {
        setCategories(response.data);
        setCategoryFilter(response.data.map(category => category.id))
      });
  }, []);

  const addItem = (e) => {
    e.preventDefault();
    const newItem = { elguide: newItemElguide, name: newItemName, category: newItemCategory };
    axios
      .post("http://localhost:3001/goods", newItem)
      .then(response => {
        setGoods(goods.concat(response.data));
        setNewItemElguide("");
        setNewItemName("");
      });

  }

  const deleteItem = (id) => {
    const itemUrl = `http://localhost:3001/goods/${id}`;
    axios
      .delete(itemUrl)
      .then(response => {
        setGoods(goods.filter(item => item.id !== id))
      });
  }


  const handleElguideChange = (e) => {
    setNewItemElguide(e.target.value);
  }

  const handleNameChange = (e) => {
    setNewItemName(e.target.value);
  }

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setnewItemCategory(e.target.value)
  }

  const handleFilterChange = (e) => {
    setItemsFilter(e.target.value);
  }

  const updateCategoryFilter = category => {
    setCategoryFilter([category])
  }

  const clearCategoryFilter = () => {
    setCategoryFilter(categories.map(category => category.id));
  }


  const goodsToShow = goods.filter(item =>
    item.name.toLowerCase().includes(itemsFilter.toLowerCase())
    || item.elguide.toLowerCase().includes(itemsFilter.toLowerCase())
  ).filter(item => categoryFilter.includes(item.id));


  return (
    <div className="app">
      <h1>Varastonhallinta</h1>

      <h4>Lisää tuote</h4>

      <AddNewItemForm addItem={addItem} newItemElguide={newItemElguide} handleElguideChange={handleElguideChange}
      newItemName={newItemName} handleNameChange={handleNameChange} handleCategoryChange={handleCategoryChange}
      categories={categories} />
      


      <h4>Tuotteet varastossa</h4>
      <input value={itemsFilter} onChange={handleFilterChange} />
      <CategoryButtons categories={categories} clearCategoryFilter={clearCategoryFilter} handleCategoryFilter={updateCategoryFilter} />
      <Items items={goodsToShow} deleteItem={deleteItem} categories={categories} />



    </div>
  );
}

export default App;
