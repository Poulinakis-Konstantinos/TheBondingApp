import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-2 mt-auto">
      <div className="container text-center">
        <p className="mb-0" style={{ fontSize: '12px' }}>
          Deutsche Bank &copy; {new Date().getFullYear()}
        </p>
        <p className="mt-1" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
          This app was developed by "our names" for the 2023 coding challenge
        </p>
      </div>
    </footer>
  );
};




export default Footer;
