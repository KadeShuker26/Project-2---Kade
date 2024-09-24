import React, { useState } from 'react';
import Questions from './faqs.json';

function FAQ() {
  const [enteredKeywords, setEnteredKeywords] = useState('');

  const inputChange = (event) => {
    setEnteredKeywords(event.target.value);
  };

  return (
    <>
      <div style={{ minHeight: '80vh', overflowX: 'hidden' }}>
        <h1>Frequently Asked Questions</h1>
        <div className="row">
          <div className="col-md-6 col-sm-8 col-10 ms-2">
            <input
              className="form-control my-3"
              type="text"
              name="search"
              onChange={inputChange}
              placeholder="Keywords"
              value={enteredKeywords}
            />
          </div>
        </div>

        <div>
          {Questions.filter(
            (question) =>
              question.question.toLowerCase().includes(enteredKeywords.toLowerCase()) ||
              question.answer.toLowerCase().includes(enteredKeywords.toLowerCase())
          ).map((question, index) => (
            <div className="bg-warning p-3 m-2" key={index}>
              <h4>{question.question}</h4>
              <p>{question.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FAQ;
