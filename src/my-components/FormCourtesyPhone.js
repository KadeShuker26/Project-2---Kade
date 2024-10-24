import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const FormCourtesyPhone = forwardRef(({ customerType, setBond, setCourtesyPhoneItems }, ref) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState('none');
  const [selectedChargerType, setSelectedChargerType] = useState('none');

  const itemTypes = {
    iphone10: { name: 'iPhone 10', cost: 275 },
    iphone14: { name: 'iPhone 14', cost: 300 },
    iphone16: { name: 'iPhone 16', cost: 500 },
    samsungGalaxy: { name: 'Samsung Galaxy', cost: 200 },
    nokia: { name: 'Nokia', cost: 150 },
    xiaomi: { name: 'Xiaomi', cost: 100 },
    iphoneCharger: { name: 'iPhone Charger', cost: 45 },
    samsungCharger: { name: 'Samsung Charger', cost: 30 },
    nokiaCharger: { name: 'Nokia Charger', cost: 25 },
    xiaomiCharger: { name: 'Xiaomi Charger', cost: 25 },
  };

  const handleAddItem = (type, selectedType) => {
    if (selectedType === 'none') return;

    const item = itemTypes[selectedType];

    // Prevent adding duplicates
    if (selectedItems.some(i => i.name === item.name)) {
      alert('This item is already added.');
      return;
    }

    setSelectedItems([...selectedItems, item]);

    // Reset the selection
    if (type === 'phone') {
      setSelectedItemType('none');
    } else {
      setSelectedChargerType('none');
    }
  };

  const handleRemoveItem = (name) => {
    setSelectedItems(selectedItems.filter(item => item.name !== name));
  };

  // Reset function to clear selected items
  useImperativeHandle(ref, () => ({
    resetItems() {
      setSelectedItems([]);
      setSelectedItemType('none');
      setSelectedChargerType('none');
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
      
      {/* Title and input for phone selection */}
      <h4>Choose a phone:</h4>
      <div className="row align-items-center mb-2">
        <label className="col-12 col-md-4">Item Type:</label>
        <div className="col-12 col-md-8">
          <select 
            className="form-select form-select-sm" 
            value={selectedItemType} 
            onChange={(e) => {
              setSelectedItemType(e.target.value);
              handleAddItem('phone', e.target.value);
            }}
          >
            <option value="none">None</option>
            <option value="iphone10">iPhone 10</option>
            <option value="iphone14">iPhone 14</option>
            <option value="iphone16">iPhone 16</option>
            <option value="samsungGalaxy">Samsung Galaxy</option>
            <option value="nokia">Nokia</option>
            <option value="xiaomi">Xiaomi</option>
          </select>
        </div>
      </div>

      {/* Title and input for charger selection */}
      <h4>Choose a charger:</h4>
      <div className="row align-items-center mb-2">
        <label className="col-12 col-md-4">Item Type:</label>
        <div className="col-12 col-md-8">
          <select 
            className="form-select form-select-sm" 
            value={selectedChargerType} 
            onChange={(e) => {
              setSelectedChargerType(e.target.value);
              handleAddItem('charger', e.target.value);
            }}
          >
            <option value="none">None</option>
            <option value="iphoneCharger">iPhone Charger</option>
            <option value="samsungCharger">Samsung Charger</option>
            <option value="nokiaCharger">Nokia Charger</option>
            <option value="xiaomiCharger">Xiaomi Charger</option>
          </select>
        </div>
      </div>

      {/* Displaying added items */}
      <div className="mt-3 bg-white">
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
