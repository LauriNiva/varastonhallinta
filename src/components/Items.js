const Items = ({ items, deleteItem, categories }) => {

    console.log("cat:", categories);
    let itemList;

    if (categories[0]) {
        itemList = items.map(item =>
            <li key={item.id}>
                {item.elguide}: {item.name} - {categories[item.id].name}
                <button onClick={() => deleteItem(item.id)}>-</button>
            </li>
        );
    } else {
        itemList = items.map(item =>
            <li key={item.id}>
                {item.elguide}: {item.name} -
                <button onClick={() => deleteItem(item.id)}>-</button>
            </li>
        );
    }



    return (
        <div className="items">
            <ul>
                {itemList}
            </ul>
        </div>
    )
}

export default Items;