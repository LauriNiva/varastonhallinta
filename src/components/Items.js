const Items = ({items}) => {
    return(
      <div className="items">
        <ul>
          {items.map(item => <li key={item.id}>{item.elguide}:{item.name}</li>)}
        </ul>
      </div>
    )
  }

  export default Items;