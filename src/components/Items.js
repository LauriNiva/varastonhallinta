const Items = ({items, deleteItem}) => {
    return(
      <div className="items">
        <ul>
          {items.map(item => <li key={item.id}>{item.elguide}:{item.name}<button onClick={()=>deleteItem(item.id)}>-</button></li>)}
        </ul>
      </div>
    )
  }

  export default Items;