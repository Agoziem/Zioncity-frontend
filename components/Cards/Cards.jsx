"use client";
import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";

function Cards({schoolData, data }) {
  return (
    <>
      {data && Object.keys(data).length > 0 && (
        <>
          <Card
            cardtitle="classes taught"
            cardbody={data.classes_taught.length}
            icon={"bi bi-mortarboard"}
          />
          <Card
            cardtitle="Subjects taught"
            cardbody={data.subjects_taught.length}
            icon={"bi bi-journal-bookmark-fill"}
          />
          {data.is_formteacher && (
            <Card
              cardtitle="Class"
              cardbody={data.classFormed.name}
              icon={"bi bi-people"}
            />
          )}
        </>
      )}
    </>
  );
}

export default Cards;
