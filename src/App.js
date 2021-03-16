
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Items from './components/Items';
import CategoryButtons from "./components/CategoryButtons";
import AddNewItemForm from "./components/AddNewItemForm";



function App() {

  const [goods, setGoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const [itemsFilter, setItemsFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const warehouseFilter = "Pannari"; //testivaihe - tämä pitää muuttaa napeilla toimivaksi

  const [newItemCode, setNewItemCode] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setnewItemCategory] = useState("");

  const [uiMode, setUiMode] = useState("Saldo");


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

    axios
      .get("http://localhost:3001/warehouses")
      .then(response => {
        setWarehouses(response.data);
      })
  }, []);

  const addItem = (e) => {
    e.preventDefault();
    const newItem = { code: newItemCode, name: newItemName, category: newItemCategory };
    axios
      .post("http://localhost:3001/goods", newItem)
      .then(response => {
        setGoods(goods.concat(response.data));
        setNewItemCode("");
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


  const handleCodeChange = (e) => {
    setNewItemCode(e.target.value);
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

  const changeUi = (e) => {
    //console.log(e.target.textContent);
    setUiMode(e.target.textContent);
  }

  //console.log("warehousefilter: ", warehouseFilter);
  //console.log("filtered warehouse: ", warehouses.find(warehouse => warehouse.name === warehouseFilter));

  let goodsInWarehouse = [];
  if (warehouses.lenght) {
    goodsInWarehouse = warehouses.find(warehouse => warehouse.name.toLowerCase() === warehouseFilter.toLocaleLowerCase()).items;
  }


  //console.log("Goods in filtered warehouse: ", goodsInWarehouse);




  const goodsToShow = goods.filter(item =>
    item.name.toLowerCase().includes(itemsFilter.toLowerCase())
    || item.code.toLowerCase().includes(itemsFilter.toLowerCase())
  ).filter(item => categoryFilter.includes(parseInt(item.category)));
  //console.log("Filtered goods: ", goodsToShow);

  console.log(uiMode);


  const RenderUiMode = ({ uiMode }) => {
    if (uiMode === "Saldo") {
      return(`
        <h4>Tuotteet varastossa</h4>

      <input value={itemsFilter} onChange={handleFilterChange} />
      <CategoryButtons categories={categories} clearCategoryFilter={clearCategoryFilter} handleCategoryFilter={updateCategoryFilter} />
      <Items items={goodsInWarehouse} filteredItems={goodsToShow} deleteItem={deleteItem} categories={categories} />
`
      )
    } else if (uiMode === "Laskenta") {
      return<AddNewItemForm addItem={addItem} newItemCode={newItemCode} handleCodeChange={handleCodeChange}
        newItemName={newItemName} handleNameChange={handleNameChange} handleCategoryChange={handleCategoryChange}
        categories={categories} />
    } else if (uiMode === "Hallinta") {
      return<div></div>
    } else {
      return <></>
    }
  }


  return (
    <div className="app">
      <h1>Varastonhallinta</h1>
      <div className="ui-buttons">
        <button id="btn-saldo" onClick={changeUi}>Saldo</button><button id="btn-laskenta" onClick={changeUi}>Laskenta</button><button id="btn-hallinta" onClick={changeUi}>Hallinta</button>
      </div>


      <RenderUiMode uiMode={uiMode} />







      



    </div>
  );
}

export default App;
