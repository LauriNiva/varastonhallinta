
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
    if (goods.find(item => item.code === newItem.code)) {
      const oldItem = goods.find(item => item.code === newItem.code);
      if (window.confirm(`Koodilla ${newItem.code} löytyi jo tuote (${oldItem.name}). Haluatko päivittää tuotteelle uudet tiedot?`)) {
        axios
        .patch(`http://localhost:3001/goods/${oldItem.id}`, newItem)
        .then(response => {
          console.log("update response data", response.data);
          setGoods(goods.map(item => item.id !== oldItem.id ? item : response.data));
          setNewItemCode("");
          setNewItemName("");
        });
      } else {
        setNewItemCode("");
        setNewItemName("");
      }

    } else {
      axios
        .post("http://localhost:3001/goods", newItem)
        .then(response => {
          setGoods(goods.concat(response.data));
          setNewItemCode("");
          setNewItemName("");
        });
    }


  }

  const deleteItem = (id) => {
    //LISÄÄ CATCH JOS POISTETTU JO
    const itemUrl = `http://localhost:3001/goods/${id}`;
    axios
      .delete(itemUrl)
      .then(response => {
        setGoods(goods.filter(item => item.id !== id))
      });
  }

  const increaseItemsInStock = (itemID) => {
    const warehouseID = warehouses.find(warehouse => warehouse.name === warehouseFilter.toLowerCase()).id;
    const itemUrl = `http://localhost:3001/warehouses/${warehouseID}`;
    const itemToUpdate = goodsInWarehouse.find(item => item.id === itemID);
    const updatedItem = { ...itemToUpdate, saldo: (itemToUpdate.saldo + 1) };

    const newItemsInWarehouse = goodsInWarehouse.map(item => item.id !== itemID ? item : updatedItem);

    axios
      .patch(itemUrl, { items: newItemsInWarehouse })
      .then(response => {
        setWarehouses(warehouses.map(warehouse => warehouse.id !== warehouseID ? warehouse : response.data));
      })

  }

  const decreaseItemsInStock = (itemID) => {
    const warehouseID = warehouses.find(warehouse => warehouse.name === warehouseFilter.toLowerCase()).id;
    const itemUrl = `http://localhost:3001/warehouses/${warehouseID}`;
    const itemToUpdate = goodsInWarehouse.find(item => item.id === itemID);
    const updatedItem = { ...itemToUpdate, saldo: (itemToUpdate.saldo - 1) };

    const newItemsInWarehouse = goodsInWarehouse.map(item => item.id !== itemID ? item : updatedItem);

    axios
      .patch(itemUrl, { items: newItemsInWarehouse })
      .then(response => {
        setWarehouses(warehouses.map(warehouse => warehouse.id !== warehouseID ? warehouse : response.data));
      })
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
    setUiMode(e.target.textContent);
  }

  console.log("-----");
  console.log("warehousefilter: ", warehouseFilter);
  console.log("filtered warehouse: ", warehouses.find(warehouse => warehouse.name.toLowerCase() === warehouseFilter.toLowerCase()));
  console.log("warehouses: ", warehouses);

  let goodsInWarehouse = [];
  if (warehouses[0]) {
    goodsInWarehouse = warehouses.find(warehouse => warehouse.name.toLowerCase() === warehouseFilter.toLowerCase()).items;
  }


  console.log("Goods in filtered warehouse: ", goodsInWarehouse);


  const goodsToShow = goods.filter(item =>
    item.name.toLowerCase().includes(itemsFilter.toLowerCase())
    || item.code.toLowerCase().includes(itemsFilter.toLowerCase())
  ).filter(item => categoryFilter.includes(parseInt(item.category)));
  console.log("Filtered goods: ", goodsToShow);


  const renderUiMode = (uiMode) => {
    if (uiMode === "Saldo") {
      return (
        <div>
          <h4>Tuotteet varastossa</h4>
          <h5>{warehouseFilter}</h5>
          <input value={itemsFilter} onChange={handleFilterChange} />
          <CategoryButtons categories={categories} clearCategoryFilter={clearCategoryFilter} handleCategoryFilter={updateCategoryFilter} />
          <Items itemsInWarehouse={goodsInWarehouse} filteredItems={goodsToShow} categories={categories} increaseStock={increaseItemsInStock} decreaseStock={decreaseItemsInStock} />
        </div>)
    } else if (uiMode === "Laskenta") {
      return <AddNewItemForm addItem={addItem} newItemCode={newItemCode} handleCodeChange={handleCodeChange}
        newItemName={newItemName} handleNameChange={handleNameChange} handleCategoryChange={handleCategoryChange}
        categories={categories} />
    } else if (uiMode === "Hallinta") {
      return <div></div>
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

      {renderUiMode(uiMode)}

    </div>
  );
}

export default App;
