"use client";
import React from 'react'

const ResultForm = ({studentresult,setStudentResult,submitting,handleSubmit}) => {
  return (
    <div className='w-50'>
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className="col-md mx-3 form-group">
            <label htmlFor="FirstTest">First Test</label>
            <input type="text" className="form-control" id="FirstTest" name="FirstTest" value={studentresult.FirstTest} onChange={(e) => setStudentResult({...studentresult, FirstTest: e.target.value})} />
          </div>
          <div className=" col-md mx-3 form-group">
            <label htmlFor="FirstAss">First Assignment</label>
            <input type="text" className="form-control" id="FirstAss" name="FirstAss" value={studentresult.FirstAss} onChange={(e) => setStudentResult({...studentresult, FirstAss: e.target.value})} />
          </div>
        </div>

        <div className='row mb-3'>
          <div className="col-md  mx-3 form-group">
            <label htmlFor="MidTermTest">Mid Term Test</label>
            <input type="text" className="form-control" id="MidTermTest" name="MidTermTest" value={studentresult.MidTermTest} onChange={(e) => setStudentResult({...studentresult, MidTermTest: e.target.value})} />
          </div>
          <div className="col-md mx-3 form-group">
            <label htmlFor="Project">Project</label>
            <input type="text" className="form-control" id="Project" name="Project" value={studentresult.Project} onChange={(e) => setStudentResult({...studentresult, Project: e.target.value})} />
          </div>
        </div>
        
        <div className='row mb-3'>
          <div className="col-md mx-3 form-group">
            <label htmlFor="SecondAss">Second Assignment</label>
            <input type="text" className="form-control" id="SecondAss" name="SecondAss" value={studentresult.SecondAss} onChange={(e) => setStudentResult({...studentresult, SecondAss: e.target.value})} />
          </div>
          <div className="col-md mx-3 form-group">
            <label htmlFor="SecondTest">Second Test</label>
            <input type="text" className="form-control" id="SecondTest" name="SecondTest" value={studentresult.SecondTest} onChange={(e) => setStudentResult({...studentresult, SecondTest: e.target.value})} />
          </div>
        </div>
        
        <div className='row mb-3 align-items-center'>
            <div className="col-md mx-3 form-group">
              <label htmlFor="Exam">Exam</label>
              <input type="text" className="form-control" id="Exam" name="Exam" value={studentresult.Exam} onChange={(e) => setStudentResult({...studentresult, Exam: e.target.value})} /> 
            </div>
            <div className='col-md mx-3'>
              <button type="submit" className="btn btn-primary mt-4" disabled={submitting}>
                {submitting ? 'Submitting Result...' : 'Submit Result'}
              </button>
            </div>
        </div>
        
      </form>
    </div>
  )
}

export default ResultForm