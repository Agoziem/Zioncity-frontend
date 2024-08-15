import { v4 as uuidv4 } from "uuid";
const navList = [
  {
    _id: uuidv4(),
    name: "Registration",
    icon: "bi bi-person-plus",
    link: "/newstudent/registration",
  },
  {
    _id: uuidv4(),
    name: "Admission Status",
    icon: "bi bi-person-check",
    link: "/newstudent/admission-checker",
  },
  {
    _id: uuidv4(),
    name: "CBT Section",
    icon: " bi bi-laptop",
    link: "/newstudent/CBTtest",
  },
  {
    _id: uuidv4(),
    name: "School details",
    icon: "bi bi-building",
    link: "/newstudent/school-details",
  },
];

export default navList;
