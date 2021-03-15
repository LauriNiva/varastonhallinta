const Items = ({ items, deleteItem, categories }) => {

    let itemList;
    console.log(categories);
    console.log(items);
    if (categories[0]) {
        itemList = items.map(item =>
            <li key={item.id}>
                {item.elguide}: {item.name} - {categories.find(category => category.id === parseInt(item.category)).name}
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