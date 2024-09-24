import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const FormCourtesyPhone = forwardRef(({ customerType, setBond, setCourtesyPhoneItems }, ref) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState('none');

  const itemTypes = {
    iphone: { name: 'iPhone', cost: 275 },
    other: { name: 'Other Phone', cost: 100 },
    charger: { name: 'Charger', cost: 30 },
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (selectedItemType === 'none') return;
    const item = itemTypes[selectedItemType];

    // Prevent adding duplicates
    if (selectedItems.some(i => i.name === item.name)) {
      alert('This item is already added.');
      return;
    }

    setSelectedItems([...selectedItems, item]);
  };

  const handleRemoveItem = (name) => {
    setSelectedItems(selectedItems.filter(item => item.name !== name));
  };

  // Reset function to clear selected items
  useImperativeHandle(ref, () => ({
    resetItems() {
      setSelectedItems([]);
      setSelectedItemType('none');
      setBond(0);
    }
  }));

  // Update bond and courtesy phone items when the selection changes
  useEffect(() => {
    if (customerType === 'business') {
      setBond(0); // No bond for business customers
    } else {
      const bondTotal = selectedItems.reduce((acc, item) => acc + item.cost, 0);
      setBond(bondTotal);
    }
    setCourtesyPhoneItems(selectedItems);
  }, [selectedItems, customerType, setBond, setCourtesyPhoneItems]);

  return (
    <>
      <h2>Courtesy Phone</h2>
      
      {/* Item selection */}
      <div className="row mt-3">
        <label className="col-12 col-md-4">Item Type: </label>
        <div className="col-12 col-md-6">
          <select 
            className="form-select" 
            value={selectedItemType} 
            onChange={(e) => setSelectedItemType(e.target.value)}
          >
            <option value="none">None</option>
            <option value="iphone">iPhone</option>
            <option value="other">Other phones</option>
            <option value="charger">Charger</option>
          </select>
        </div>
        <div className="col-12 col-md-2">
          <button 
            className="btn btn-light w-100 mt-2 mt-md-0"
            onClick={handleAddItem}
          >
            Add
          </button>
        </div>
      </div>

      {/* Displaying added items */}
      <div className="mt-4 bg-white">
        <table className="table table-bordered" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '50%' }}>Item</th>
              <th style={{ width: '30%' }}>Cost</th>
              <th style={{ width: '20%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.length > 0 ? (
              selectedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.cost.toFixed(2)}</td>
                  <td>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveItem(item.name)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No items selected yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
});

export default FormCourtesyPhone;
