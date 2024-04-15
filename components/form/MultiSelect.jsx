"use client"
import React, { useState } from 'react';

export const MultiSelectinput = ({selectedOptions,setSelectedOptions,setIsOpen,isOpen}) => {
    return (
        <div className="my-4 w-[300px] py-2 px-4 bg-gray-200 border border-gray-300 rounded-md cursor-pointer">
            {selectedOptions.length !== 0 && (
                selectedOptions.map((option, index) => (
                    <div key={index} className="bg-blue-600 text-white px-2 py-1 rounded-md mx-1">
                        {option}
                        <span className="mx-1" onClick={() => setSelectedOptions(selectedOptions.filter((item) => item !== option))}>x</span>
                    </div>
                ))
            )}
            <span onClick={() => setIsOpen(!isOpen)}>Select Fruit</span>
        </div>
    )
}

export const MultiSelectmenu = ({items,selectedOptions,setSelectedOptions}) => {
    const handleChange = (event, item) => {
        if (event.target.checked) {
            setSelectedOptions([...selectedOptions, item]);
        } else {
            setSelectedOptions(selectedOptions.filter((i) => i !== item));
        }
    }
    return (
        <div className="px-8 py-5">
            <ul>
                {items.map((item, index) => (
                <li key={index}>
                    <input
                        type="checkbox"
                        onChange={(event) => handleChange(event, item)}
                        className='mr-3 cursor-pointer'
                        checked={selectedOptions.includes(item)}
                    />
                    {item}
                </li>
                ))}
            </ul>
        </div>
    )
}




export const MultiSelectDropdown = () => {
    const options = [
        "Orange",
        "Mango",
        "Banana",
        "Apple",
        "Grapes"
    ]
    const [items, setItems] = useState(options)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen,setIsOpen] = useState(false)

  return (
    <div className='my-4'>
        <MultiSelectinput
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
         />

        {isOpen && <MultiSelectmenu
            items={items}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            // isOpen = {isOpen}
            // setIsOpen={setIsOpen}
        />}
    </div>
  );
};
