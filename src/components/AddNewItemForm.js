import React from 'react';

const AddNewItemForm = ({ addItem, newItemElguide, handleElguideChange, newItemName, handleNameChange, handleCategoryChange, categories }) => {

    const radiobuttons = categories.map(category =>
        <React.Fragment key={category.id}>
            <input type="radio" name="category" id={category.id} value={category.id} onClick={handleCategoryChange} />
            <label htmlFor={category.id}>{category.name}</label>
        </React.Fragment>
    )

    return (
        <div className="new-item-form">
            <form onSubmit={addItem}>
                Guidekoodi <input value={newItemElguide} onChange={handleElguideChange} /><br />
                Tuotekoodi <input value={newItemName} onChange={handleNameChange} /><br />
                Kategoria {radiobuttons}
                <br />
                <button type="submit">Lisää</button>
            </form>
        </div>
    )
}

export default AddNewItemForm;