// import React, { useState } from "react";
// import "./App.css";

// const App = () => {
//   const [day, setDay] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
//   const [errorMessage, setErrorMessage] = useState("");

//   const validateInputs = () => {
//     const today = new Date();
//     const enteredDate = new Date(`${year}-${month}-${day}`);
//     let error = "";

//     if (!day) error = "Day is required.";
//     else if (day < 1 || day > 31) error = "Must be a valid day.";

//     if (!error && !month) error = "Month is required.";
//     else if (!error && (month < 1 || month > 12)) error = "Must be a valid month.";

//     if (!error && !year) error = "Year is required.";
//     else if (!error && new Date(`${year}-01-01`) > today) error = "Year must be in the past.";

//     if (
//       !error &&
//       (enteredDate.toString() === "Invalid Date" || enteredDate > today)
//     ) {
//       error = "Must be a valid date.";
//     }

//     setErrorMessage(error);
//     return error === "";
//   };

//   const calculateAge = () => {
//     if (!validateInputs()) return;

//     const today = new Date();
//     let birthDate = new Date(`${year}-${month}-${day}`);

//     let years = today.getFullYear() - birthDate.getFullYear();
//     let months = today.getMonth() - birthDate.getMonth();
//     let days = today.getDate() - birthDate.getDate();

//     if (days < 0) {
//       months -= 1;
//       days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
//     }

//     if (months < 0) {
//       years -= 1;
//       months += 12;
//     }

//     setAge({ years, months, days });
//   };

//   return (
//     <div>
//       <div className="content">
//         <div className="input">
//           <input
//             type="number"
//             id="dayIn"
//             value={day}
//             onChange={(e) => setDay(e.target.value)}
//             placeholder="DD"
//             aria-label="Day Input"
//           />
//           <input
//             type="number"
//             id="monthIn"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//             placeholder="MM"
//             aria-label="Month Input"
//           />
//           <input
//             type="number"
//             id="yearIn"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             placeholder="YYYY"
//             aria-label="Year Input"
//           />
//         </div>

//         {errorMessage && <p className="error" id="errorDisplay">{errorMessage}</p>}

//         <div className="button">
//           <button id="calculateBtn" onClick={calculateAge}>
//             Calculate
//           </button>
//         </div>

//         <div>
//           <div className="output">
//             <p id="yearOut">{age.years}</p>
//             <p style={{ color: "black" }}>years</p>
//           </div>
//           <div className="output">
//             <p id="monthOut">{age.months}</p>
//             <p style={{ color: "black" }}>months</p>
//           </div>
//           <div className="output">
//             <p id="dayOut">{age.days}</p>
//             <p style={{ color: "black" }}>days</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });

  const validateInputs = () => {
    const today = new Date();
    let errorObj = {};

    if (!day) errorObj.day = "This field is required";
    else if (day < 1 || day > 31) errorObj.day = "Must be a valid day";

    if (!month) errorObj.month = "This field is required";
    else if (month < 1 || month > 12) errorObj.month = "Must be a valid month";

    if (!year) errorObj.year = "This field is required";
    else if (new Date(`${year}-01-01`) > today) errorObj.year = "Must be in past";

    const enteredDate = new Date(`${year}-${month}-${day}`);
    if (
      !errorObj.day &&
      !errorObj.month &&
      !errorObj.year &&
      (enteredDate.toString() === "Invalid Date" || enteredDate > today)
    ) {
      errorObj.day = "Must be a valid date";
    }

    setErrors(errorObj);
    return Object.keys(errorObj).length === 0;
  };

  const calculateAge = () => {
    if (!validateInputs()) return;

    const today = new Date();
    let birthDate = new Date(`${year}-${month}-${day}`);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div>
      <div className="content">
        <div className="input">
          <div>
            <input
              type="number"
              id="dayIn"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="DD"
              aria-label="Day Input"
            />
            {errors.day && <p className="error">{errors.day}</p>}
          </div>
          <div>
            <input
              type="number"
              id="monthIn"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="MM"
              aria-label="Month Input"
            />
            {errors.month && <p className="error">{errors.month}</p>}
          </div>
          <div>
            <input
              type="number"
              id="yearIn"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="YYYY"
              aria-label="Year Input"
            />
            {errors.year && <p className="error">{errors.year}</p>}
          </div>
        </div>

        <div className="button">
          <button id="calculateBtn" onClick={calculateAge}>
            Calculate
          </button>
        </div>

        <div>
          <div className="output">
            <p id="yearOut">{age.years}</p>
            <p style={{ color: "black" }}>years</p>
          </div>
          <div className="output">
            <p id="monthOut">{age.months}</p>
            <p style={{ color: "black" }}>months</p>
          </div>
          <div className="output">
            <p id="dayOut">{age.days}</p>
            <p style={{ color: "black" }}>days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
