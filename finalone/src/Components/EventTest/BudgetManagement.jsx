import React, { useState } from 'react';

const BudgetManagement = () => {
  const [totalBudget, setTotalBudget] = useState(1000);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [spending, setSpending] = useState(0);
  const [eventName, setEventName] = useState('');
  const [eventBudget, setEventBudget] = useState(0);
  const [eventCard, setEventCard] = useState(null);

  const handleSetBudget = (e) => {
    setTotalBudget(parseFloat(e.target.value));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, { name: newCategory, amount: 0 }]);
      setNewCategory('');
    }
  };

  const handleCategoryChange = (e, index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].amount = parseFloat(e.target.value);
    setCategories(updatedCategories);
  };

  const handleSpendingChange = (e) => {
    setSpending(parseFloat(e.target.value));
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventBudgetChange = (e) => {
    setEventBudget(parseFloat(e.target.value));
  };

  const handleSubmit = () => {
    // Create an event card when submitted
    const eventCardData = {
      eventName,
      eventBudget,
      categories: categories.map((category) => ({
        name: category.name,
        amount: category.amount,
      })),
      spending,
    };
    setEventCard(eventCardData);
  };

  const getCategoryTotal = () => {
    return categories.reduce((total, category) => total + category.amount, 0);
  };

  const isOverBudget = spending > totalBudget;
  const isNearBudget = spending >= 0.8 * totalBudget;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Budget Management</h2>
      <div className="mb-4">
        <label className="block">Total Budget:</label>
        <input
          type="number"
          value={totalBudget}
          onChange={handleSetBudget}
          className="border px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Categories:</label>
        <div className="flex">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
            className="border px-4 py-2 flex-grow mr-2"
          />
          <button onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2">
            Add Category
          </button>
        </div>
      </div>
      {categories.map((category, index) => (
        <div key={index} className="mb-2">
          <label className="block">{category.name} Budget:</label>
          <input
            type="number"
            value={category.amount}
            onChange={(e) => handleCategoryChange(e, index)}
            className="border px-4 py-2 w-full"
          />
        </div>
      ))}
      <div className="mb-4">
        <label className="block">Event Name:</label>
        <input
          type="text"
          value={eventName}
          onChange={handleEventNameChange}
          className="border px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Event Budget:</label>
        <input
          type="number"
          value={eventBudget}
          onChange={handleEventBudgetChange}
          className="border px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Spending:</label>
        <input
          type="number"
          value={spending}
          onChange={handleSpendingChange}
          className={`border px-4 py-2 w-full ${isOverBudget ? 'border-red-500' : ''}`}
        />
        {isNearBudget && !isOverBudget && (
          <p className="text-yellow-500">You are approaching your budget limit.</p>
        )}
        {isOverBudget && (
          <p className="text-red-500">You have exceeded your budget!</p>
        )}
      </div>
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2">
        Submit
      </button>
      {eventCard && (
        <div className="mt-4 border p-4">
          <h3 className="text-lg font-semibold">{eventCard.eventName}</h3>
          <p>Event Budget: {eventCard.eventBudget}</p>
          <p>Total Spending: {eventCard.spending}</p>
          <h4 className="mt-2">Category Budgets:</h4>
          <ul>
            {eventCard.categories.map((category, index) => (
              <li key={index}>
                {category.name}: {category.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BudgetManagement;
