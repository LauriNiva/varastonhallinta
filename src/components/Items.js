const Items = ({ items, filteredItems, deleteItem, categories }) => {

    let itemList;
    //console.log("filteredItems: ", filteredItems);
    //console.log("items: ", items);
    //console.log("categories: ", categories);

    if (items.length && filteredItems.length && categories.length) {
        itemList = items.map(item => {

            const iItem = filteredItems.find(filteredItem => filteredItem.id === item.itemid);

            if(!iItem)return;

            return (
                <tr key={iItem.id}>
                    <td>{iItem.code}</td>
                    <td>{iItem.name}</td>
                    <td><button>-</button>{item.saldo}<button>+</button></td>
                    <td>{categories.find(category => category.id === parseInt(iItem.category)).name}</td>
                    {/* <td><button onClick={() => deleteItem(item.id)}>-</button></td> */}
                </tr>
            )
        }
        );
    } else {
        itemList = <tr></tr>
    }



    return (
        <div className="items" >
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Elguide</th>
                        <th>Tuote</th>
                        <th>Saldo</th>
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