"use client";
import React from 'react'

const Resultcredentials = ({handleSubmit,
    loadingresults,
    resultcredential,
    setResultscredential,
    schoolsessions,
    teachersclasses,
    teachersubjects,
    schoolterms}) => {
  return (
    <div className='card px-4 py-5'>
        <form className="row g-3" onSubmit={handleSubmit}>
            {/* term */}
            <div className="col-md-6">
            <label htmlFor="termselect" className="form-label">Term</label>
                <select id="termselect" className="form-select" value={resultcredential.term_id}
                    onChange={(e) => setResultscredential({ ...resultcredential, term_id: e.target.value })} >
                        {
                            schoolterms.length === 0 ? <option value="">No Term Found</option> : <option value="">Select Term</option>
                        }
                       { schoolterms.map((term) => (
                            <option key={term.id} value={term.id}>{term.term}</option>
                        ))
                    }
                </select>
            </div>
            {/* session */}
            <div className="col-md-6">
                <label htmlFor="sessionselect" className="form-label">Academic Session</label>
                <select id="sessionselect" className="form-select" value={resultcredential.session_id}
                    onChange={(e) => setResultscredential({ ...resultcredential, session_id: e.target.value })} >

                        {
                            schoolsessions.length === 0 ? <option value="">No Session Found</option> : <option value="">Select Session</option>
                        }
                       { schoolsessions.map((session) => (
                            <option key={session.id} value={session.id}>{session.session}</option>
                        ))
                    }
                </select>
            </div>

            {/* class */}
            <div className="col-md-6">
                <label htmlFor="classSelect" className="form-label">Class</label>
                <select id="classSelect" className="form-select" value={resultcredential.class_id}
                    onChange={(e) => setResultscredential({ ...resultcredential, class_id: e.target.value })} >
                        {
                            teachersclasses.length === 0 ? <option value="">No Class Found</option> : <option value="">Select Class</option>
                        }
                       { teachersclasses.map((class_) => (
                            <option key={class_.id} value={class_.id}>{class_.name}</option>
                        ))
                    }
                </select>
            </div>

            {/* subject */}

            <div className="col-md-6">
                <label htmlFor="SubjectSelect" className="form-label">Subject</label>
                <select id="SubjectSelect" className="form-select" value={resultcredential.subject_id}
                    onChange={(e) => setResultscredential({ ...resultcredential, subject_id: e.target.value })} >

                        {
                            teachersubjects.length === 0 ? <option value="">No Subject Found</option> : <option value="">Select Subject</option>
                        }
                       { teachersubjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))
                    }
                </select>
            </div>


            <div className="col-12 mt-4 d-flex align-items-center  ">
                <button type="submit" className="btn btn-primary" disabled={loadingresults}>
                    {loadingresults ? 'Loading Results...' : 'Get Results'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default Resultcredentials