import { v4 as uuidv4 } from "uuid";
const navList = [
  {
    Teacher: [
      {
        _id: uuidv4(),
        name: "Dashboard",
        icon: "bi bi-speedometer2",
        link: "/admin-portal",
      },
      {
        _id: uuidv4(),
        name: "students",
        icon: "bi bi-people-fill",
        link: "/admin-portal/students",
      },
      {
        _id: uuidv4(),
        name: "teachers",
        icon: "bi bi-people",
        link: "/admin-portal/teachers",
      },
      {
        _id: uuidv4(),
        name: "Results",
        icon: "bi bi-journal-text",
        link: "/admin-portal/results",
      },
      {
        _id: uuidv4(),
        name: "Payments",
        icon: "bi bi-credit-card",
        link: "/admin-portal/payments",
      },
      {
        _id: uuidv4(),
        name: "e-library",
        icon: "bi bi-book",
        link: "/admin-portal/e-library",
      },
      {
        _id: uuidv4(),
        name: "Attendance",
        icon: "bi bi-calendar2-check",
        link: "/admin-portal/attendance",
      },
      {
        _id: uuidv4(),
        name: "Admissions",
        icon: "bi bi-door-open-fill",
        link: "/admin-portal/admissions",
      },
      {
        _id: uuidv4(),
        name: "CBT Questions",
        icon: "bi bi-laptop",
        link: "/admin-portal/cbt-questions",
      },
      {
        _id: uuidv4(),
        name: "Analytics",
        icon: "bi bi-graph-up",
        link: "/admin-portal/analytics",
      },
      {
        _id: uuidv4(),
        name: "School Schedules",
        icon: "bi bi-calendar2-week",
        link: "/admin-portal/school-schedules",
      },
      {
        _id: uuidv4(),
        name: "messages",
        icon: "bi bi-chat-left-text",
        link: "/admin-portal/messages",
      },
      {
        _id: uuidv4(),
        name: "Chat Room",
        icon: "bi bi-wechat",
        link: "/admin-portal/chat-room",
      },
      {
        _id: uuidv4(),
        name: "Profile",
        icon: "bi bi-person-circle",
        link: "/admin-portal/profile",
      },
      {
        _id: uuidv4(),
        name: "logout",
        icon: "bi bi-box-arrow-in-right",
        link: "#",
      },
    ],
  },
];

export default navList;
