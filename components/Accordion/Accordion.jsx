"use client";
import React, { useState } from 'react';

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleAccordion}>Click to toggle accordion</div>
      {isOpen && <div>Accordion content</div>}
    </div>
  );
};

export default Accordion;