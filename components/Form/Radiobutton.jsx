import React from 'react'

// note selected is the value of the selected radio button
// onChange is the function that will be called when a radio button is clicked

export const Radiobutton = ({ onChange , selected , children }) => {
    const RadioOptions = React.Children.map(children, (child) => {
        return React.cloneElement(child, {
            onChange,
            checked : child.props.value === selected,
        })
    })
  return (
    <div className="RadioGroup">
        {RadioOptions}
    </div>
  )
}

export const RadioOption = ({ onChange, checked, value, children }) => {
    return (
        <div className="RadioOption">
            <input
            id={value}
            type="radio" 
            name={value}
            value={value} 
            checked={checked} 
            onChange={(e) => onChange(e.target.value)} 
            />
            <label htmlFor={value}>{children}</label>
        </div>
    )
}


// Usage Example
// import { Radiobutton, RadioOption } from './Radiobutton';

// const MyComponent = () => {
//     const [selected, setSelected] = useState('option1');
//    const handleChange = (value) => {
//         setSelected(value);
//    };
//     return (
//         <div>
//            <Radiobutton onChange={handleChange} selected={selected}>
//               <RadioOption value="option1">Option 1</RadioOption>
    //              <RadioOption value="option2">Option 2</RadioOption>
    //              <RadioOption value="option3">Option 3</RadioOption>
//            </Radiobutton>
//        </div>
//   );


