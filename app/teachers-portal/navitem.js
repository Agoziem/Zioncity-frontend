import { v4 as uuidv4 } from 'uuid';
const navList = [
    {
      Teacher : [
        {
          _id: uuidv4(),
          name: 'Dashboard',
          icon: 'bi bi-speedometer2',
          link: '/teachers-portal',
        },
        {
          _id: uuidv4(),
          name: 'Results',
          icon: 'bi bi-journal-text',
          link: '#',
          content: [
            {
              _id: uuidv4(),
              name: 'Termly',
              icon: 'bi bi-circle',
              link: '/teachers-portal/result-computation/termly',
            },
            {
              _id: uuidv4(),
              name: 'Annual',
              icon: 'bi bi-circle',
              link: '/teachers-portal/result-computation/annual',
            },
          ]

        },
        {
          _id: uuidv4(),
          name: 'elibrary',
          icon: 'bi bi-collection',
          link: '/teachers-portal/e-library',
        },
        {
          _id: uuidv4(),
          name: 'EduGPT',
          icon: 'bi bi-robot',
          link: '/teachers-portal/EduGPT',
        },
        {
          _id: uuidv4(),
          name: 'Chat Room',
          icon: 'bi bi-wechat',
          link: '/teachers-portal/chat-room',
        },
        {
          _id: uuidv4(),
          name: 'Students',
          icon: 'bi bi-people',
          link: '/teachers-portal/students',
        },
        {
          _id: uuidv4(),
          name: 'Students-result',
          icon: 'bi bi-hdd-stack',
          link: '#',
          content: [
            {
              _id: uuidv4(),
              name: 'Termly',
              icon: 'bi bi-circle',
              link: '/teachers-portal/students-result/termly',
            },
            {
              _id: uuidv4(),
              name: 'Annual',
              icon: 'bi bi-circle',
              link: '/teachers-portal/students-result/annual',
            },
          ]
        },
        {
          _id:  uuidv4(),
          name: 'Attendance',
          icon: 'bi bi-calendar2-check',
          link: '/teachers-portal/attendance',
        },
        {
          _id:  uuidv4(),
          name: 'Messages',
          icon: 'bi bi-calendar2-check',
          link: '/teachers-portal/attendance',
        },
        {
          _id:  uuidv4(),
          name: 'profile',
          icon: 'bi bi-person-circle',
          link: '/teachers-portal/profile',
        },
        {
          _id:  uuidv4(),
          name: 'logout',
          icon: 'bi bi-box-arrow-in-right',
          link: '#',
        }
      ],
    },
    
  ];
  
  export default navList;
  