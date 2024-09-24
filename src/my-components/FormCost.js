import React, { useEffect, useState } from 'react';

function FormCost({ bond = 0, warranty }) {
  const [serviceFee, setServiceFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalWithGst, setTotalWithGst] = useState(0);

  useEffect(() => {
    // Calculate service fee: $85 if not under warranty, otherwise $0
    const fee = warranty === false ? 85 : 0;
    setServiceFee(fee);

    // Calculate total cost (bond + service fee)
    const totalCost = bond + fee;
    setTotal(totalCost);

    // Calculate GST (15%)
    const gstAmount = totalCost * 0.15;
    setGst(gstAmount);

    // Calculate total including GST
    setTotalWithGst(totalCost + gstAmount);
  }, [bond, warranty]);

  return (
    <>
      <div className="row mt-2">
        <label className="col-12 col-md-12 col-lg-4 ps-4"><h2>Cost</h2></label>
        <div className="col-12 col-md-12 col-lg-7"></div>
      </div>

      <div className="row mt-2">
        <label className="col-12 col-md-12 col-lg-4 ps-4">Bond</label>
        <input 
          className="col-11 col-sm-10 col-md-12 col-lg-7 mx-auto mx-sm-2 mx-md-3" 
          type="text" 
          value={`$${(bond || 0).toFixed(2)}`} 
          readOnly 
        />
      </div>
      
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4 ps-4">Service Fee</label>
        <input 
          className="col-11 col-sm-10 col-md-12 col-lg-7 mx-auto mx-sm-2 mx-md-3" 
          type="text" 
          value={`$${serviceFee.toFixed(2)}`} 
          readOnly 
        />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4 ps-4">Total</label>
        <input 
          className="col-11 col-sm-10 col-md-12 col-lg-7 mx-auto mx-sm-2 mx-md-3" 
          type="text" 
          value={`$${total.toFixed(2)}`} 
          readOnly 
        />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4 ps-4">GST</label>
        <input 
          className="col-11 col-sm-10 col-md-12 col-lg-7 mx-auto mx-sm-2 mx-md-3" 
          type="text" 
          value={`$${gst.toFixed(2)}`} 
          readOnly 
        />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4 ps-4">Total (+GST)</label>
        <input 
          className="col-11 col-sm-10 col-md-12 col-lg-7 mx-auto mx-sm-2 mx-md-3" 
          type="text" 
          value={`$${totalWithGst.toFixed(2)}`} 
          readOnly 
        />
      </div>
    </>
  );
}

export default FormCost;
