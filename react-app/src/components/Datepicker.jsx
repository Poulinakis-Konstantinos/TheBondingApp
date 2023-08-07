import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';

const Datepicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="container my-4">
      <div className="d-flex align-items-center">
        <Button
          variant="success"
          onClick={() => setStartDate(new Date())}
          style={{ marginRight: '10px' }}
        >
          Today
        </Button>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default Datepicker;
