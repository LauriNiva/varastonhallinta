
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Items from './components/Items';



function App() {

  const [goods, setGoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [itemsFilter, setItemsFilter] = useState("");

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
    .then(response =>{
      setCategories(response.data);
    });
  }, []);


  const addItem = (e) => {
    e.preventDefault();
    const newItem = { elguide: newItemElguide, name: newItemName, category: newItemCategory };
    axios
      .post("http://localhost:3001/goods", newItem)
      .then(response => {
        setGoods(goods.concat(response.data))
        setNewItemElguide("");
        setNewItemName("")
      });

  }

  const deleteItem = (id) => {

    const itemUrl = `http://localhost:3001/goods/${id}`;

    axios
      .delete(itemUrl)
      .then(response => {
        console.log("beep");
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


  const goodsToShow = goods.filter(item =>
    item.name.toLowerCase().includes(itemsFilter.toLowerCase())
    || item.elguide.toLowerCase().includes(itemsFilter.toLowerCase())
  );

  //console.log(goodsToShow);

  return (
    <div className="app">
      <h1>Varastonhallinta</h1>

      <h4>Lisää tuote</h4>
      <form onSubmit={addItem}>
        Guidekoodi <input value={newItemElguide} onChange={handleElguideChange} /><br />
        Tuotekoodi <input value={newItemName} onChange={handleNameChange} /><br />
        Kategoria
        <input type="radio" name="category" id="0" value="0" onClick={handleCategoryChange}/> <label htmlFor="0">APK</label>
        <input type="radio" name="category" id="1" value="1" onClick={handleCategoryChange}/> <label htmlFor="1">PPK</label>
        <input type="radio" name="category" id="2" value="2" onClick={handleCategoryChange}/> <label htmlFor="2">Kaappi</label>
        <input type="radio" name="category" id="3" value="3" onClick={handleCategoryChange}/> <label htmlFor="3">Arkku</label>
        <input type="radio" name="category" id="4" value="4" onClick={handleCategoryChange}/> <label htmlFor="4">Muu</label>
        <br/>
        <button type="submit">Lisää</button>
      </form>


      <h4>Tuotteet varastossa</h4>
      <input value={itemsFilter} onChange={handleFilterChange} />
      <Items items={goodsToShow} deleteItem={deleteItem} />



    </div>
  );
}

export default App;
