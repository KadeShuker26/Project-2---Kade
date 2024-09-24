import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const FormCustomerDetail = forwardRef(({ setCustomerDetails, setCustomerType }, ref) => {
  const [customerTitle, setCustomerTitle] = useState('Mr');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [suburb, setSuburb] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [customerTypeValue, setCustomerTypeValue] = useState('consumer'); // To manage internal state of customer type

  useEffect(() => {
    setCustomerDetails({
      title: customerTitle,
      firstName,
      lastName,
      street,
      suburb,
      city,
      postcode,
      phoneNumber,
      email,
    });
    setCustomerType(customerTypeValue); // Update parent component with the current customer type
  }, [customerTitle, firstName, lastName, street, suburb, city, postcode, phoneNumber, email, customerTypeValue, setCustomerDetails, setCustomerType]);

  useImperativeHandle(ref, () => ({
    resetCustomerDetails() {
      setCustomerTitle('Mr');
      setFirstName('');
      setLastName('');
      setStreet('');
      setSuburb('');
      setCity('');
      setPostcode('');
      setPhoneNumber('');
      setEmail('');
      setCustomerTypeValue('consumer'); // Reset customer type to 'consumer'
    }
  }));

  const handleCustomerTypeChange = (e) => {
    setCustomerTypeValue(e.target.value);
  };

  return (
    <>
      <h2>Customer Details</h2>

      {/* Customer type */}
      <div className="row">
        <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4">
          <legend className="col-11 float-none w-auto">Customer type *</legend>
          <div>
            <label className="col-12 col-md-12 col-lg-4">Consumer</label>
            <input
              type="radio"
              id="customerType"
              name="customer-type"
              value="consumer"
              checked={customerTypeValue === 'consumer'}
              onChange={handleCustomerTypeChange}
            />
          </div>
          <div>
            <label className="col-12 col-md-12 col-lg-4">Business</label>
            <input
              type="radio"
              id="businessType"
              name="customer-type"
              value="business"
              checked={customerTypeValue === 'business'}
              onChange={handleCustomerTypeChange}
            />
          </div>
        </fieldset>
      </div>

      {/* Title */}
      <div className="row mt-2">
        <label className="col-12 col-md-12 col-lg-4">Title *</label>
        <select className="col-12 col-md-12 col-lg-7" value={customerTitle} onChange={(e) => setCustomerTitle(e.target.value)}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Ms">Ms</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>
      </div>

      {/* First Name */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">First Name *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="fname"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      {/* Last Name */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Last Name *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="lname"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* Street */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Street *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="street"
          required
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>

      {/* Suburb */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Suburb</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="suburb"
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
        />
      </div>

      {/* City */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">City *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="city"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* Postcode */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Postcode</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          id="postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
      </div>

      {/* Phone Number */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Phone Number *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="tel"
          id="phoneNumber"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Email *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </>
  );
});

export default FormCustomerDetail;
