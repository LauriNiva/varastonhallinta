const AllItems = ({ items, itemsInWarehouse, filteredItems, categories, itemButton }) => {

    let itemList;

    if (categories.length) {
        itemList = items.map(item => {

            return (
                <tr key={item.id}>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{categories.find(category => category.id === parseInt(item.category)).name}</td>
                    <td><button onClick={() => itemButton(item.id)}>-</button></td>
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