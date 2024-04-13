"use client";
import React from 'react';
import './dashboard.css';

import Cards from '../Card/Cards';
import Reports from './Sections/ReportchartsSection/Reports';
import RecentSales from './Sections/RecentsalesSection/RecentSales';
import TopSelling from './Sections/TopsellingSection/TopSelling';
import RecentActivity from './Sections/RecentactionsSections/RecentActivity';
import BudgetReport from './Sections/BudgetSection/BudgetReport';
import WebTraffic from './Sections/WebtrafficSection/WebTraffic';
import News from './Sections/Newsection/News';

function Dashboard() {
  return (
    <section className="section dashboard">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <Cards />
            <div className="col-12">
              <Reports />
            </div>
            <div className="col-12">
              <RecentSales />
            </div>
            <div className="col-12">
              <TopSelling />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <RecentActivity />
          <BudgetReport />
          <WebTraffic />
          <News />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
