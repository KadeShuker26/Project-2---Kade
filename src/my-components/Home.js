import React, { useState, useRef } from 'react';
import FormCustomerDetail from './FormCustomerDetail';
import FormRepairDetail from './FormRepairDetail';
import FormCourtesyPhone from './FormCourtesyPhone';
import FormCost from './FormCost';
import FormButtons from './FormButtons';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const courtesyPhoneRef = useRef(); // Reference for FormCourtesyPhone
  const customerDetailsRef = useRef(); // Reference for FormCustomerDetail
  const repairDetailsRef = useRef(); // Reference for FormRepairDetail

  // State to manage bond, warranty, customer type, and form errors
  const [bond, setBond] = useState(0); // Manage bond based on courtesy phone selection
  const [warranty, setWarranty] = useState(false); // Manage warranty state from FormRepairDetail
  const [customerType, setCustomerType] = useState('consumer'); // Manage customer type
  const [customerDetails, setCustomerDetails] = useState({}); // Manage customer details
  const [repairDetails, setRepairDetails] = useState({}); // Manage repair details
  const [courtesyPhoneItems, setCourtesyPhoneItems] = useState([]); // Manage courtesy phone items
  const [errors, setErrors] = useState({}); // Store form validation errors

  // Function to generate a unique job number
  const generateJobNumber = () => {
    let jobNumber = localStorage.getItem('jobNumber');
    jobNumber = jobNumber ? parseInt(jobNumber) + 1 : 1;
    localStorage.setItem('jobNumber', jobNumber);
    return jobNumber;
  };

  // Reset handler to clear all form state
  const handleReset = () => {
    setCustomerDetails({});
    setRepairDetails({});
    setCourtesyPhoneItems([]);
    setBond(0);
    setWarranty(false);
    setCustomerType('consumer');
    setErrors({});
    
    // Call reset methods for all sections via ref
    if (courtesyPhoneRef.current) {
      courtesyPhoneRef.current.resetItems(); // Clear courtesy phone items
    }
    if (customerDetailsRef.current) {
      customerDetailsRef.current.resetCustomerDetails(); // Clear customer details
    }
    if (repairDetailsRef.current) {
      repairDetailsRef.current.resetRepairDetails(); // Clear repair details
    }
  };

  // Format Date and Time
  const formatDateTime = (date, includeTime = false) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-GB');
    let formattedTime = '';

    if (includeTime) {
      let hours = dateObj.getHours();
      const minutes = dateObj.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      formattedTime = `${hours}:${minutes} ${ampm}`;
    }

    return includeTime ? `${formattedDate} ${formattedTime}` : formattedDate;
  };

  // Validate the form fields
  const validateForm = () => {
    const formErrors = {};
    if (!customerDetails.firstName || !customerDetails.lastName || !customerDetails.street || !customerDetails.city || !customerDetails.phoneNumber || !customerDetails.email) {
      formErrors.customer = "Customer details are incomplete!";
    }
    if (!repairDetails.purchaseDate || !repairDetails.repairDate || !repairDetails.imei || !repairDetails.faultCategory || !repairDetails.description) {
      formErrors.repair = "Repair details are incomplete!";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault(); // prevent browser from sending data to server

    if (validateForm()) {
      // Gather all form data to pass to the invoice
      const formData = {
        jobNumber: generateJobNumber(),
        invoiceDate: formatDateTime(new Date(), true),
        bond,
        warranty,
        customerType,
        // Collecting Customer Details
        customerTitle: customerDetails.title,
        customerFirstName: customerDetails.firstName,
        customerLastName: customerDetails.lastName,
        customerStreet: customerDetails.street,
        customerSuburb: customerDetails.suburb,
        customerCity: customerDetails.city,
        customerPostcode: customerDetails.postcode,
        customerPhone: customerDetails.phoneNumber,
        customerEmail: customerDetails.email,
        // Collecting Repair Details
        purchaseDate: repairDetails.purchaseDate,
        repairDate: repairDetails.repairDate,
        imei: repairDetails.imei,
        make: repairDetails.make,
        modelNumber: repairDetails.modelNumber,
        faultCategory: repairDetails.faultCategory,
        description: repairDetails.description,
        // Collecting Courtesy Phone Items
        courtesyPhoneItems, // Courtesy Phone Items from state
        // Collecting Cost Data
        serviceFee: (warranty ? 0 : 85), // Calculating service fee here for simplicity
        total: bond + (warranty ? 0 : 85),
        gst: (bond + (warranty ? 0 : 85)) * 0.15,
        totalWithGst: (bond + (warranty ? 0 : 85)) * 1.15
      };

      // Navigate to the Invoice component and pass form data
      navigate('/invoice', { state: { formData } });
    } else {
      alert('Please correct the errors in the form.');
    }
  };

  return (
    <div className="container-fluid" style={{ overflowX: 'hidden' }}>
      <form className="row" style={{ minHeight: '60vh' }} onSubmit={onSubmit}>
        {/* Customer Details */}
        <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#FCF3CF' }}>
          <FormCustomerDetail ref={customerDetailsRef} setCustomerDetails={setCustomerDetails} setCustomerType={setCustomerType} />
          {errors.customer && <p className="text-danger">{errors.customer}</p>}
        </div>

        {/* Repair Details */}
        <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#D5F5E3' }}>
          <FormRepairDetail ref={repairDetailsRef} setRepairDetails={setRepairDetails} setWarranty={setWarranty} />
          {errors.repair && <p className="text-danger">{errors.repair}</p>}
        </div>

        {/* Courtesy Phone & Cost */}
        <div className="col-12 col-lg-4 p-0 m-0">
          <div className="row">
            {/* Courtesy Phone */}
            <div className="col-12 p-4" style={{ minHeight: '30vh', backgroundColor: '#2874A6' }}>
              <FormCourtesyPhone ref={courtesyPhoneRef} customerType={customerType} setBond={setBond} setCourtesyPhoneItems={setCourtesyPhoneItems} />
            </div>

            {/* Cost */}
            <div className="col-12 p-4" style={{ minHeight: '20vh', backgroundColor: '#EDBB99' }}>
              <FormCost bond={bond} warranty={warranty} />
            </div>
          </div>
        </div>

        {/* Button Area */}
        <div className="col-12 p-4 text-center" style={{ minHeight: '10vh', backgroundColor: '#EDBB99' }}>
          <FormButtons handleReset={handleReset} />
        </div>
      </form>
    </div>
  );
}

export default Home;
