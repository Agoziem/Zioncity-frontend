"use client";
import React from 'react';
import './dashboard.css';
import Cards from '../Cards/Cards';
import RecentActivity from './Sections/RecentactionsSections/RecentActivity';

function TeachersDashboard({ schoolData, teacherData}) {
  return (
    <section className="section dashboard">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <Cards schoolData={schoolData} data={teacherData} />
            <div className="col-12">
              {/* the other Links */}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <RecentActivity />
        </div>
      </div>
    </section>
  );
}

export default TeachersDashboard;
