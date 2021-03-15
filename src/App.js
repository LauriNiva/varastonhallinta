
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Items from './components/Items';



function App() {

  const [goods, setGoods] = useState([]);
  const [newItemElguide, setNewItemElguide] = useState("");
  const [newItemName, setNewItemName] = useState("");

  useEffect(() =>{
    axios
    .get("http://localhost:3001/goods")
    .then(response =>{
      setGoods(response.data);
      setNewItemElguide("");
      setNewItemName("");
    });
  }, []);

  const addItem = (e) => {
    e.preventDefault();
    const newItem = {elguide: newItemElguide, name: newItemName};
    axios
    .post("http://localhost:3001/goods", newItem)
    .then(response=>setGoods(goods.concat(response.data)));

  }

  const handleElguideChange = (e) => {
    setNewItemElguide(e.target.value);
  }

  const handleNameChange = (e) => {
    setNewItemName(e.target.value);
  }


  const goodsToShow = goods;

  console.log(goodsToShow);

  return (
    <div className="app">
      <h1>Varastonhallinta</h1>

    <h4>Lisää tuote</h4>
    <form onSubmit={addItem}>
      Guidekoodi <input value={newItemElguide} onChange={handleElguideChange}/><br/>
      Tuotekoodi <input value={newItemName} onChange={handleNameChange}/><br/>
      <button type="submit">Lisää</button>
    </form>


    <h4>Tuotteet varastossa</h4>
    <input></input>
    <Items items={goodsToShow} />



    </div>
  );
}

export default App;
