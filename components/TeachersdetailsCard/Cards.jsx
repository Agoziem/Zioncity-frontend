"use client";
import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import { TeacherContext } from '@/data/Teachercontextdata';

function Cards() {
  const { teacherData } = useContext(TeacherContext)
  const [cardData, setcardData ] = useState({});

  console.log(cardData)

  useEffect(() => {
    setcardData(teacherData)
  }, [teacherData]);


  return (
    <>
    { cardData && Object.keys(cardData).length > 0 && (
      <>
        <Card cardtitle='classes taught' cardbody={cardData.classes_taught.length} icon={'bi bi-mortarboard'} />
        <Card cardtitle='Subjects taught' cardbody={cardData.subjects_taught.length} icon={'bi bi-journal-bookmark-fill'} />
        {cardData.is_formteacher && (
          <Card cardtitle='Class' cardbody={cardData.classFormed.name} icon={'bi bi-people'} />
        )}
      </>
    )}
    </>
    )
    
}

export default Cards;
