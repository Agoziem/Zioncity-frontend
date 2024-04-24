"use client";
import React, { useContext, useEffect, useRef, useState } from 'react'
import PageTitle from '@/components/PageTitle/PageTitle'
import { SchoolContext } from '@/data/Schoolcontextdata';
import { TeacherContext } from '@/data/Teachercontextdata';
import { TiArrowForward } from "react-icons/ti";
import useLocalStorage from '@/hooks/useLocalStorage';
import { FaCheck, FaTimes } from "react-icons/fa";
import "@/components/Modal/modal.css"
import "@/components/Datatable/Datatable.css";
import Datatable from '@/components/Datatable/Datatable';
import ResultDatatableitems from '@/components/Datatable/Resulttableitems';
import Resultcredentials  from '@/components/form/Resultcredentials';
import Notofferingresultlist from '@/components/Datatable/Notofferingresultlist';
import calculateStudentResults from '@/utils/studentResulthandler';




const Page = () => {
  const [selectedClassName, setSelectedClassName] = useState(null);
  const { schoolData } = useContext(SchoolContext)
  const { teacherData } = useContext(TeacherContext)
  const [terms, setTerms] = useState([])
  
  const [result, setResults] = useState([])
  const [studentsnotoffering, setStudentsNotOffering] = useState([])
  const [studentsoffering, setStudentsOffering] = useState([])
  const [computedResults, setComputedResults] = useState([])
  
  const [resultcredential, setResultscredential] = useState({
  term_id: '', 
  session_id: '', 
  class_id: '', 
  school_id: '', 
  subject_id: ''
})

  const [loadingterms, setLoadingterms] = useState(false)
  const [loadingresults, setLoadingResults] = useState(false)
  const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL

// get the stored credentials from the local storage
const [storedCredentialValue, setValue] = useLocalStorage('resultcredential', resultcredential)

// set the credentials to the Stored credentials on pageload
useEffect(() => {
  setResultscredential(storedCredentialValue)
},[])


  let schoolsessions = []
  let schoolID ;
  let teachersclasses = []
  let teachersubjects = []
  let schoolterms = []

  // set the needed data when they are available
  if (schoolData && teacherData && Object.keys(schoolData).length && Object.keys(teacherData).length){
      schoolsessions = schoolData.sessions || []
      schoolID = schoolData.id || ''
      teachersclasses = teacherData.classes_taught || []
      teachersubjects = teacherData.subjects_taught || []
      schoolterms = terms || []
    }

  // update the credentials when the school_id is available or changes
  useEffect(() => {
    if(schoolID) setResultscredential((prevCredential) => ({...prevCredential, school_id: schoolID}))
  },[schoolID])


    // store the credentials to the local storage & fetch the results
    const handleSubmit = (e) => {
      e.preventDefault();
      setValue(resultcredential)
      fetchResults();
    }
  
  // Fetch the Results when the details is available on page load & when the id changes
  useEffect(() => {
    if (
      resultcredential.school_id &&
      resultcredential.class_id &&
      resultcredential.term_id &&
      resultcredential.session_id &&
      resultcredential.subject_id
    ) {
      fetchResults();
    }
  }, [resultcredential.school_id]);


    
  // Fetch the terms for the school
    useEffect(() => {
      const fetchTerm = async () => {
          setLoadingterms(true);
          try {
            const response = await fetch(`${DJANGO_URL}/adminsapi/terms/`);
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

  // fetch the Results of the Students in a class for a particular Subject in a Class
  const fetchResults = async () => {
    setLoadingResults(true);
    try {
      const response = await fetch(`${DJANGO_URL}/resultapi/getResults/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultcredential),
      });
      const jsonData = await response.json();
      setResults(jsonData);
      const offeringStudents = jsonData.filter(item => item.is_offering);
      const notOfferingStudents = jsonData.filter(item => !item.is_offering);
      setStudentsOffering(offeringStudents);
      setStudentsNotOffering(notOfferingStudents);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingResults(false);
    }
  };
  

  // Toggle the offering status of a Student for the Subject
  const toggleOfferingStatus = async (itemId) => {
    const itemToUpdate = result.find(item => item.id === itemId);
    const newStatus = !itemToUpdate.is_offering;
    try {
        const response = await fetch(`${DJANGO_URL}/resultapi/updateResult/${itemId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ is_offering: newStatus }),
        });

        if (response.ok) {
            // Update the main result list
            const updatedResult = result.map(item => {
                if (item.id === itemId) {
                    return { ...item, is_offering: newStatus };
                }
                return item;
            });
            setResults(updatedResult);

            // Update studentsOffering and studentsNotOffering lists based on the updated result
            const offeringStudents = updatedResult.filter(item => item.is_offering);
            const notOfferingStudents = updatedResult.filter(item => !item.is_offering);
            setStudentsOffering(offeringStudents);
            setStudentsNotOffering(notOfferingStudents);
        } else {
            console.error('Failed to update result in the backend');
        }
    } catch (error) {
        console.error('Error updating result:', error);
    }
};



  // 2) Compute the results by the passing it through the Student Result Computation Algorithm
  useEffect(() => {
    if (studentsoffering.length > 0) {
      const computedResults = calculateStudentResults(studentsoffering);
      setComputedResults(computedResults);
    }
  }, [studentsoffering])

  // 3) Publish the results to the students
  const handlePublishResults = async () => {
    try {
      const response = await fetch(`${DJANGO_URL}/resultapi/postResults/`, {
        method: 'PUT',
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
                <h3>{selectedClassName} Students Result </h3>
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
              items={computedResults} 
              setItems={setStudentsOffering} 
              >
                <ResultDatatableitems
                loading={loadingresults}
                toggleOfferingStatus={toggleOfferingStatus}
              /> 
              </Datatable>
      </div>
      <div className='row'>
        <div className='mt-3 me-4 col-md'>
          <Resultcredentials
              handleSubmit={handleSubmit}
              loadingresults={loadingresults}
              resultcredential={resultcredential}
              setResultscredential={setResultscredential}
              schoolsessions={schoolsessions}
              teachersclasses={teachersclasses}
              teachersubjects={teachersubjects}
              schoolterms={schoolterms}
            />
        </div>
        <div className='mt-3 col-md'>
          <Notofferingresultlist
            loading={loadingresults}
            listofstudentsnotoffering={studentsnotoffering}
            toggleOfferingStatus={toggleOfferingStatus}
          />
        </div>
      </div>
    </>

  )
}

export default Page
