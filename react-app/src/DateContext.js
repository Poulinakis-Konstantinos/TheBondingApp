// DateContext.js 
import React, { createContext, useState, useEffect } from "react";


export const DateContext = createContext(null);


export function DateProvider({ children }) { 
const [selectedDate, setSelectedDate] = useState(new Date());


useEffect(() => { 
const storedDate = localStorage.getItem("storedDate"); 
if (storedDate) { setSelectedDate(new Date(JSON.parse(storedDate))); } }, []);


useEffect(() => { 
  if (selectedDate) { localStorage.setItem("storedDate", JSON.stringify(selectedDate)); } }, [selectedDate]);


 return ( 
  <DateContext.Provider value={{ selectedDate, setSelectedDate }}> {children} </DateContext.Provider> ); }

export default DateContext;
