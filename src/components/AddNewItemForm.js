import React from 'react';

const AddNewItemForm = ({ addItem, newItemCode, handleCodeChange, newItemName, handleNameChange, handleCategoryChange, categories }) => {

    const radiobuttons = categories.map(category =>
        <React.Fragment key={category.id}>
            <input type="radio" name="category" id={category.id} value={category.id} onClick={handleCategoryChange} />
            <label htmlFor={category.id}>{category.name}</label>
        </React.Fragment>
    )

    return (
        <div className="new-item-form">
            <h4>Lisää tuote</h4>
            <form onSubmit={addItem}>
                Guidekoodi <input value={newItemCode} onChange={handleCodeChange} /><br />
                Tuotekoodi <input value={newItemName} onChange={handleNameChange} /><br />
                Kategoria {radiobuttons}
                <br />
                <button type="submit">Lisää</button>
            </form>
        </div>
    )
}

export default AddNewItemForm;