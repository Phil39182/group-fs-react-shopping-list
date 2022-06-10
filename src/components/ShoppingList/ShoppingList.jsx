function ShoppingList({shoppingList, deleteItem}) {
 console.log("this is the list:", shoppingList);
    return (
        <>
        <h2>Shopping List</h2>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {shoppingList.map((shoppingList) =>
                    <tr key={shoppingList.id}>
                        <td>{shoppingList.name}</td>
                        <td>{shoppingList.qty}</td>
                        <td>{shoppingList.unit}</td>
                        <td>{shoppingList.isPurchased}<button className="buyBtn">Buy</button></td>
                        <td><button onClick={() => deleteItem(shoppingList.id)} className="itemDelete">Delete</button></td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
        </>
    )
}               

export default ShoppingList;