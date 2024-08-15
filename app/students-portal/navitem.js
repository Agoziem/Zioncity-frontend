import { v4 as uuidv4 } from "uuid";
const navList = [
  {
    Teacher: [
      {
        _id: uuidv4(),
        name: "Dashboard",
        icon: "bi bi-speedometer2",
        link: "/students-portal",
      },
      {
        _id: uuidv4(),
        name: "Results",
        icon: "bi bi-journal-text",
        link: "/students-portal/result",
      },
      {
        _id: uuidv4(),
        name: "Payments",
        icon: "bi bi-credit-card",
        link: "/students-portal/payments",
      },
      {
        _id: uuidv4(),
        name: "e-learning",
        icon: "bi bi-mortarboard",
        link: "/students-portal/e-learning",
      },
      {
        _id: uuidv4(),
        name: "e-library",
        icon: "bi bi-book",
        link: "/students-portal/e-library",
      },
      {
        _id: uuidv4(),
        name: "CBT Portal",
        icon: "bi bi-laptop",
        link: "/students-portal/cbt-portal",
      },
      {
        _id: uuidv4(),
        name: "Study Schedule",
        icon: "bi bi-calendar",
        link: "/students-portal/study-schedule",
      },
      {
        _id: uuidv4(),
        name: "Performance Analysis",
        icon: "bi bi-graph-up",
        link: "/students-portal/performance-analysis",
      },
      {
        _id: uuidv4(),
        name: "Messaging Section",
        icon: "bi bi-chat-left-text",
        link: "/students-portal/messages",
      },
      {
        _id: uuidv4(),
        name: "Profile",
        icon: "bi bi-person-circle",
        link: "/students-portal/profile",
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
