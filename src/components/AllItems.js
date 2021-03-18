const AllItems = ({ itemsInWarehouse, filteredItems, categories, deleteItem }) => {

    let itemList;

    if (itemsInWarehouse.length && filteredItems.length && categories.length) {
        itemList = itemsInWarehouse.map(item => {

            const iItem = filteredItems.find(filteredItem => filteredItem.id === item.itemid);

            if (!iItem) return;

            return (
                <tr key={iItem.id}>
                    <td>{iItem.code}</td>
                    <td>{iItem.name}</td>
                    <td>{categories.find(category => category.id === parseInt(iItem.category)).name}</td>
                    <td><button onClick={() => deleteItem(item.id)}>-</button></td>
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
                        <th>Kategoria</th>
                        <th>Poista</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList}
                </tbody>
            </table>
        </div>
    )
}

export default AllItems;