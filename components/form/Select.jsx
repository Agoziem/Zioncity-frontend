"use client"
import React,{useState} from 'react';
import { FaAngleDown } from 'react-icons/fa';

const Select = () => {
    const [selectedOption, setSelectedOption] = useState('Option1');

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    }; 

  return (
    <div className="relative">
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="block appearance-none w-full bg-white border border-gray-300 text-sm text-gray-700 py-2 px-6 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
      >
        <option value="Option1">Option 1</option>
        <option value='Option2'>Option 2</option>
        <option value='Option3'>Option 3</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <FaAngleDown className='text-gray-500' />
      </div>
    </div>
  );
};

export default Select;