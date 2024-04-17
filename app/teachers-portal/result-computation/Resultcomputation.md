# Result Computation Page

This React component manages the computation and publishing of students' results.

## Context and Hooks

- **SchoolContext:** Used to retrieve school data.
- **TeacherContext:** Used to retrieve teacher data.
- **useState:** Manages local state variables.
- **useEffect:** Handles side effects such as data fetching and state updates.
- **useLocalStorage:** Manages local storage data.

## State Variables

- **selectedClassName:** Stores the name of the selected class.
- **terms:** Stores an array of terms.
- **result:** Stores an array of results fetched from the backend.
- **studentsnotoffering:** Stores an array of students not offering the subject.
- **studentsoffering:** Stores an array of students offering the subject.
- **computedResults:** Stores computed results.
- **resultcredential:** Stores credentials for fetching results.
- **loadingterms:** Tracks loading state while fetching terms.
- **loadingresults:** Tracks loading state while fetching results.

## Workflow Overview

1. **Fetch Terms:** Fetches terms for the school from the backend API when the component mounts.
2. **Update Class Result Credentials:** Updates class result credentials when school ID is available.
3. **Fetch Results:** Fetches results when all required credentials are available.
4. **Compute Results:** Computes results based on fetched data using a custom result computation algorithm.
5. **Toggle Offering Status:** Toggles the offering status of a student for a subject.
6. **Handle Submit:** Handles form submission, stores credentials in local storage, and fetches results.
7. **Publish Results:** Publishes computed results to students.

## Components

- **ResultCredentials:** Renders a form to input result credentials.
- **NotOfferingResultList:** Renders a list of students not offering the subject.
- **ResultDatatableItems:** Renders datatable items for displaying computed results.

## External Dependencies

- **react-icons/ti:** Provides icons for UI elements.

## API Endpoints

- **GET /adminsapi/terms/:** Fetches terms for the school.
- **POST /resultapi/getResults/:** Fetches results based on provided credentials.
- **PUT /resultapi/updateResult/:id/:** Updates the offering status of a student.
- **PUT /resultapi/postResults/:** Publishes computed results to students.

This component integrates with backend APIs to fetch, compute, and publish student results, providing an interactive interface for managing result computation tasks.
