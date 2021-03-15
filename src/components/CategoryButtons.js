const CategoryButtons = ({ categories, clearCategoryFilter, handleCategoryFilter }) => {
  return (
    <div className="category-buttons">
      <button onClick={()=>clearCategoryFilter()}>Kaikki</button>
      {categories.map(category =>
        <button key={category.id} onClick={()=>handleCategoryFilter(category.id)}>{category.name}</button>
      )}

    </div>
  )
}

export default CategoryButtons;