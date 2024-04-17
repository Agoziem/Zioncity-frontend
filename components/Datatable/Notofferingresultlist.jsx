import React from 'react'

const Notofferingresultlist = ({loading,listofstudentsnotoffering,toggleOfferingStatus}) => {
  return (
    <div className='card'>
        <div className="card-header pt-4 ps-4">
            <h6>Students not offering the Subject</h6>
        </div>
        <ul className="list-group list-group-flush px-4 py-3">
        {
            loading && <li className="list-group-item">Loading Students...</li>
        }
        {listofstudentsnotoffering && listofstudentsnotoffering.length > 0 ? (
            listofstudentsnotoffering.map((result, index) => (
            <li className="list-group-item " key={result.id}>
                <input 
                    className="form-check-input me-1" 
                    type="checkbox" 
                    value="" 
                    id={result.id}
                    onChange={() => toggleOfferingStatus(result.id)}
                    checked={!result.is_offering}
                    style={{ cursor: 'pointer' }}
                />
                <label className="form-check-label ms-3" htmlFor={result.id}>{result.firstname} {result.surname}</label>
            </li>
            ))
            ) : (
                <li className="list-group-item">
                    <p>No student is not offering this subject</p>
                </li>
            )}
        </ul>
    </div>
  )
}

export default Notofferingresultlist