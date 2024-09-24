import React from 'react';
import { useLocation } from 'react-router-dom';

function Invoice() {
  const location = useLocation();
  const formData = location.state && location.state.formData ? location.state.formData : null;

  if (!formData) {
    return <h2>No invoice data available. Please go back and submit the form.</h2>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #ccc', maxWidth: '900px', margin: '0 auto' }}>
      {/* Combined Header for Repair Booking and Amount Due */}
      <div className="row mb-4" style={{ backgroundColor: '#ccc', padding: '20px', display: 'flex', alignItems: 'center' }}>
        <div className="col-12 col-md-8">
          <h1 style={{ margin: 0 }}>Repair Booking</h1>
        </div>
        <div className="col-12 col-md-4 text-md-right mt-3 mt-md-0">
          <h2 style={{ margin: 0 }}>
            Amount Due <br /> ${formData.totalWithGst.toFixed(2)}
          </h2>
        </div>
      </div>

      {/* Customer and Repair Job Details */}
      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <h3 style={{ fontWeight: 'bold' }}>Customer</h3>
          <p>
            {formData.customerTitle} {formData.customerFirstName} {formData.customerLastName} <br />
            {formData.customerStreet} <br />
            {formData.customerSuburb ? `${formData.customerSuburb}, ` : ''}{formData.customerCity}, {formData.customerPostcode} <br />
            {formData.customerPhone} <br />
            {formData.customerEmail}
          </p>
        </div>
        <div className="col-12 col-md-6 text-md-right mt-3 mt-md-0">
          <h3 style={{ fontWeight: 'bold' }}>Repair Job</h3>
          <p>
            Job Number: {formData.jobNumber} <br />
            Invoice Date: {formData.invoiceDate} <br />
            Payment Due: {formData.repairDate}
          </p>
        </div>
      </div>

      <hr />

      {/* Repair Details */}
      <h3 style={{ fontWeight: 'bold' }}>Repair Details</h3>
      <div className="row mb-4">
        <div className="col-12">
          <p><strong>Purchase Date:</strong> {formData.purchaseDate}</p>
          <p><strong>Repair Date:</strong> {formData.repairDate}</p>
          <p><strong>Under Warranty:</strong> {formData.warranty ? 'Yes ✓' : 'No ✕'}</p>
          <p><strong>IMEI Number:</strong> {formData.imei}</p>
          <p><strong>Device Make:</strong> {formData.make}</p>
          <p><strong>Model Number:</strong> {formData.modelNumber ? formData.modelNumber : 'N/A'}</p>
          <p><strong>Fault Category:</strong> {formData.faultCategory}</p>
          <p><strong>Description:</strong> {formData.description}</p>
        </div>
      </div>

      <hr />

      {/* Courtesy Loan Device Details */}
      <h3 style={{ fontWeight: 'bold' }}>Courtesy Loan Device Details</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Item</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {formData.courtesyPhoneItems && formData.courtesyPhoneItems.length > 0 ? (
            formData.courtesyPhoneItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.cost.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">No courtesy phone items selected.</td>
            </tr>
          )}
        </tbody>
      </table>

      <hr />

      {/* Totals Section */}
      <div className="row mb-4">
        <div className="col-12 col-md-6 offset-md-6 text-left text-md-right">
          <h3 style={{ fontWeight: 'bold' }}>Totals</h3>
          <p><strong>Bond:</strong> ${formData.bond.toFixed(2)}</p>
          <p><strong>Service Fee:</strong> ${formData.serviceFee.toFixed(2)}</p>
          <p><strong>Total:</strong> ${formData.total.toFixed(2)}</p>
          <p><strong>GST:</strong> ${formData.gst.toFixed(2)}</p>
          <p><strong>Total (+GST):</strong> ${formData.totalWithGst.toFixed(2)}</p>
        </div>
      </div>

      <hr />

      {/* Footer Contact Info */}
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-md-6">
          <h5 style={{ fontWeight: 'bold' }}>Phone Fix Services</h5>
          <p>42 Fixed It Drive</p>
        </div>
        <div className="col-12 col-md-6 text-right mt-3 mt-md-0" style={{ marginLeft: 'auto' }}>
          <h5 style={{ fontWeight: 'bold' }}>Contact Us</h5>
          <p>Phone: 06876543</p>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
