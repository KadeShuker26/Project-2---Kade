import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const FormRepairDetail = forwardRef(({ setRepairDetails, setWarranty }, ref) => {
  const [purchaseDate, setPurchaseDate] = useState('');
  const [repairDate, setRepairDate] = useState('');
  const [isWarrantyEnabled, setIsWarrantyEnabled] = useState(true);
  const [underWarranty, setUnderWarranty] = useState(false);
  const [imei, setImei] = useState('');
  const [make, setMake] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [faultCategory, setFaultCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setRepairDetails({
      purchaseDate,
      repairDate,
      imei,
      make,
      modelNumber,
      faultCategory,
      description,
    });
    setWarranty(underWarranty);
  }, [purchaseDate, repairDate, imei, make, modelNumber, faultCategory, description, underWarranty, setRepairDetails, setWarranty]);

  useImperativeHandle(ref, () => ({
    resetRepairDetails() {
      setPurchaseDate('');
      setRepairDate('');
      setImei('');
      setMake('');
      setModelNumber('');
      setFaultCategory('');
      setDescription('');
      setUnderWarranty(false);
    }
  }));

  const getToday = () => new Date().toISOString().split('T')[0];

  const handlePurchaseDateChange = (e) => {
    const value = e.target.value;
    setPurchaseDate(value);

    const monthsDiff = (new Date() - new Date(value)) / (1000 * 60 * 60 * 24 * 30);
    setIsWarrantyEnabled(monthsDiff <= 24);

    if (new Date(repairDate) <= new Date(value)) {
      setRepairDate('');
    }

    if (monthsDiff > 24) {
      setUnderWarranty(false);
    }
  };

  const handleRepairDateChange = (e) => {
    const value = e.target.value;
    setRepairDate(value);

    if (purchaseDate) {
      const monthsDiff = (new Date(value) - new Date(purchaseDate)) / (1000 * 60 * 60 * 24 * 30);
      if (monthsDiff > 24) {
        setUnderWarranty(false);
        setIsWarrantyEnabled(false);
      }
    }
  };

  const handleWarrantyChange = (e) => {
    setUnderWarranty(e.target.checked);
  };

  const handleImeiChange = (e) => {
    const value = e.target.value;
    e.target.setCustomValidity(''); // Clear previous custom validity message
    if (!/^\d{15}$/.test(value)) {
      e.target.setCustomValidity('IMEI number must only be numbers with a length of 15.');
    }
    setImei(value);
  };

  return (
    <>
      <h2>Repair Details</h2>

      {/* Purchase Date */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Purchase Date *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="date"
          id="purchaseDate"
          required
          value={purchaseDate}
          onChange={handlePurchaseDateChange}
          max={getToday()}
        />
      </div>

      {/* Repair Date */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Repair Date *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="date"
          id="repairDate"
          required
          value={repairDate}
          onChange={handleRepairDateChange}
          min={getToday()}
          disabled={!purchaseDate}
        />
      </div>

      {/* Warranty */}
      <div className="row mt-1">
        <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
          <legend className="col-11 float-none w-auto">Under Warranty</legend>
          <div>
            <label className="col-12 col-md-12 col-lg-4">Warranty</label>
            <input
              type="checkbox"
              id="warranty"
              disabled={!isWarrantyEnabled}
              checked={underWarranty}
              onChange={handleWarrantyChange}
            />
          </div>
        </fieldset>
      </div>

      {/* IMEI */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">IMEI Number *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="imei"
          required
          value={imei}
          onChange={handleImeiChange}
          pattern="\d{15}"
          placeholder="Enter 15-digit IMEI number"
        />
      </div>

      {/* Make */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Make *</label>
        <select
          className="col-12 col-md-12 col-lg-7"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        >
          <option value="">Select Make</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Google">Google</option>
          <option value="Huawei">Huawei</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Model Number */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Model Number</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="modelNumber"
          value={modelNumber}
          onChange={(e) => setModelNumber(e.target.value)}
        />
      </div>

      {/* Fault Category */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Fault Category *</label>
        <select
          className="col-12 col-md-12 col-lg-7"
          value={faultCategory}
          onChange={(e) => setFaultCategory(e.target.value)}
          required
        >
          <option value="">Select Fault Category</option>
          <option value="Battery">Battery</option>
          <option value="Charging">Charging</option>
          <option value="Screen">Screen</option>
          <option value="SD-storage">SD-storage</option>
          <option value="Software">Software</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Description */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Description *</label>
        <textarea
          className="col-12 col-md-12 col-lg-7"
          id="description"
          rows="4"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
    </>
  );
});

export default FormRepairDetail;
