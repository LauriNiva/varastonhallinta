const Items = ({ items, deleteItem, categories }) => {

    let itemList;
    console.log("categories: ",categories);
    console.log("items: ", items);

    if (categories[0]) {
        itemList = items.map(item =>
            <tr key={item.id}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{categories.find(category => category.id === parseInt(item.category)).name}</td>
                <td><button onClick={() => deleteItem(item.id)}>-</button></td>
            </tr>
        );
    } else {
        itemList = items.map(item =>
            <li key={item.id}>
                {item.code}: {item.name} -
                <button onClick={() => deleteItem(item.id)}>-</button>
            </li>
        );
    }



    return (
        <div className="items" >
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Elguide</th>
                        <th>Tuote</th>
                        <th>Kategoria</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList}
                </tbody>
            </table>
        </div>
    )
}

export default Items;