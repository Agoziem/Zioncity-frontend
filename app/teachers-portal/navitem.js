import { Children } from "react";

const navList = [
    {
      Teacher : [
        {
          _id: 1,
          name: 'Dashboard',
          icon: 'bi bi-speedometer2',
          link: '/teachers-portal',
        },
        {
          _id: 2,
          name: 'Results',
          icon: 'bi bi-journal-text',
          link: '#',
          content: [
            {
              _id: 1,
              name: 'Termly',
              icon: 'bi bi-circle',
              link: '/teachers-portal/result-computation/termly',
            },
            {
              _id: 2,
              name: 'Annual',
              icon: 'bi bi-circle',
              link: '/teachers-portal/result-computation/annual',
            },
          ]

        },
        {
          _id: 3,
          name: 'elibrary',
          icon: 'bi bi-collection',
          link: '/teachers-portal/e-library',
        },
        {
          _id: 4,
          name: 'EduGPT',
          icon: 'bi bi-robot',
          link: '/teachers-portal/EduGPT',
        },
        {
          _id: 5,
          name: 'CBT Questions',
          icon: 'bi bi-question-circle',
          link: '/teachers-portal/cbt-questions',
        },
        {
          _id: 7,
          name: 'Chat Room',
          icon: 'bi bi-wechat',
          link: '/teachers-portal/chat-room',
        },
        {
          _id: 8,
          name: 'Students',
          icon: 'bi bi-people',
          link: '/teachers-portal/students',
        },
        {
          _id: 9,
          name: 'Students-result',
          icon: 'bi bi-hdd-stack',
          link: '#',
          content: [
            {
              _id: 1,
              name: 'Termly',
              icon: 'bi bi-circle',
              link: '/teachers-portal/students-result/termly',
            },
            {
              _id: 2,
              name: 'Annual',
              icon: 'bi bi-circle',
              link: '/teachers-portal/students-result/annual',
            },
          ]
        },
        {
          _id: 10,
          name: 'Attendance',
          icon: 'bi bi-calendar2-check',
          link: '/teachers-portal/attendance',
        },
        {
          _id: 11,
          name: 'profile',
          icon: 'bi bi-person-circle',
          link: '/teachers-portal/profile',
        },
        {
          _id: 12,
          name: 'logout',
          icon: 'bi bi-box-arrow-in-right',
          link: '#',
        }
      ],
    },
    
  ];
  
  export default navList;
  