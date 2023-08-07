import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';

const Datepicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="container my-4">
      <div className="d-flex align-items-center">
      <Button className="" variant="success">All Bonds</Button>
&nbsp;
      <Button className="" variant="success" onclick>Today</Button>
      &nbsp; &nbsp;
      <DatePicker className="form-control" selected={startDate} onChange={(date) => {
      setStartDate(date);
      props.getBondsByMaturityDate(date)}
    } />
      </div>
    </div>
  );

};

export default Datepicker;
