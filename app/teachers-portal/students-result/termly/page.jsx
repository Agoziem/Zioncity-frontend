"use client";
import React, { useContext, useEffect, useRef, useState } from 'react'
import PageTitle from '@/components/PageTitle/PageTitle'
import { SchoolContext } from '@/data/Schoolcontextdata';
import { TeacherContext } from '@/data/Teachercontextdata';
import { TiArrowForward } from "react-icons/ti";
import { FaCheck,FaTimes } from "react-icons/fa";
import "@/components/Datatable/Datatable.css";
import Datatable from '@/components/Datatable/Datatable';
import ClassResultDatatableitems from '@/components/Datatable/ClassResultTableitems';
import ClassResultcredentials from '@/components/form/ClassResultcredentials';

import useLocalStorage from '@/hooks/useLocalStorage';
import classResulthandler from '@/utils/classResulthandler';
import SubjectResultPublishedlist from '@/components/Datatable/SubjectResultPublishedlist';



const Page = () => {
  const { schoolData } = useContext(SchoolContext)
  const { teacherData } = useContext(TeacherContext)
  const [terms, setTerms] = useState([])
  const [result, setResults] = useState([])
  const [computedResults, setComputedResults] = useState([])
  
  const [classresultcredential, setClassResultscredential] = useState({
    term_id: '', 
    session_id: '', 
    class_id: '', 
    school_id: ''
  })

  const [loadingterms, setLoadingterms] = useState(false)
  const [loadingresults, setLoadingResults] = useState(false)
  

  // Fetch the terms for the school
  useEffect(() => {
    const fetchTerm = async () => {
        setLoadingterms(true);
        try {
          const response = await fetch(`http://127.0.0.1:8000/adminsapi/terms/`);
          const termData = await response.json();
          setTerms(termData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoadingterms(false);
        }
    };

    fetchTerm();
  }, []);


  // update the Credentials with what is in the Local Storage
  const [storedClassCredentialValue, setClassCredentialValue] = useLocalStorage('classresultcredential', classresultcredential) 
  useEffect(() => {
    setClassResultscredential(storedClassCredentialValue)
  },[])

  // set the needed data when they are available
  let schoolsessions = []
  let schoolID ;
  let classID;
  let className;
  let schoolterms = []

  if (schoolData && teacherData && Object.keys(schoolData).length && Object.keys(teacherData).length){
      schoolsessions = schoolData.sessions || []
      schoolID = schoolData.id || ''
      classID = teacherData.classFormed.id || ''
      className = teacherData.classFormed.name || ''
      schoolterms = terms || []
    }

  // update the result credentials when the school_id & class_id is available or changes
  useEffect(() => {
    if (schoolID && classID) {
      setClassResultscredential(prevCredential => ({
        ...prevCredential, 
        school_id: schoolID, 
        class_id: classID
      }));
    }
  }, [schoolID, classID]);


    // Fetch the Results when the school_id is available on page load & 
    // when the id changes by submitting the credential form
    useEffect(() => {
      if (classresultcredential.school_id && 
          classresultcredential.class_id &&
          classresultcredential.term_id &&
          classresultcredential.session_id) {
        fetchResults();
    } 
    }, [classresultcredential.school_id, classresultcredential.class_id]);

    
    // store the credentials to the local storage & fetch the results when the form is submitted
    const handleSubmit = (e) => {
      e.preventDefault();
      setClassCredentialValue(classresultcredential)
      fetchResults();
  }


  // fetch the Results of the Students in a class for a particular Subject in a Class
  const fetchResults = async () => {
    setLoadingResults(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/resultapi/getResultSummaries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classresultcredential),
      });
      const jsonData = await response.json();
      setResults(jsonData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingResults(false);
    }
  };
  

  // Compute the results by the passing it through the Student Result Computation Algorithm
  useEffect(() => {
    if (result.length > 0) {
      const computedResults = classResulthandler(result);
      setComputedResults(computedResults);
    }
  }, [result])

  // 3) Publish the results to the students
  const handlePublishResults = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/resultapi/postResultSummaries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(computedResults),
      });

      if (response.ok) {
        alert('Results published successfully');
      }

    } catch (error) {
      console.error('Error publishing results:', error);
    }
  }
  
  
  return (
    <>
      <PageTitle pathname={'Termly Result'} />
        <div className='row mt-4 justify-content-between'>
            <div className='col-5'>
                <h3>{className} Class Result </h3>
                <p>Compute the results of the students in this class</p>
                <>
                {computedResults[0] && computedResults[0].published 
                ? 
                  <div className='published-successful-indicator'>
                    <FaCheck className={'me-2'} />
                      Published 
                  </div>
                  :
                  <div className='published-unsuccessful-indicator'>
                    <FaTimes className={'me-2'} />
                      Not Published
                  </div> 
                  }
                </>
            </div>
            <div className='col-5 d-flex flex-column align-items-end justify-content-center'>
              <button style={{ fontWeight:500 }} 
                className="btn btn-accent-primary w-50 w-md-25 mb-3"
                onClick={handlePublishResults}
              ><TiArrowForward className='me-2 mb-1' /> Publish Results </button>
            </div>
        </div>

      <div className='mt-3'>
           <Datatable 
              items={computedResults} //input the computed results here
              setItems={setResults} 
              >
                <ClassResultDatatableitems
                  loading={loadingresults}
              /> 
              </Datatable>
      </div>
      <div className='row'>
        <div className='mt-3 me-4 col-md'>
          <ClassResultcredentials 
            handleSubmit={handleSubmit}
            loadingterms={loadingterms}
            schoolterms={schoolterms}
            schoolsessions={schoolsessions}
            setClassResultscredential={setClassResultscredential}
            classresultcredential={classresultcredential}
          />
        </div>
        <div className='mt-3 col-md'>
          <SubjectResultPublishedlist
            listofSubjectResultPublished={result[0]}
          />
        </div>
      </div>
    </>

  )
}

export default Page
