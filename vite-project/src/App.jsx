import React from "react";
import "./App.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DayName = ({ dayname }) => (
  <div
    className={`flex items-center justify-center h-5 px-3 ${
      dayname === "Sun"
        ? "text-red-500 border border-red-500"
        : "text-green-500 border border-green-500"
    } rounded-sm shadow-md w-14`}
  >
    {dayname}
  </div>
);

const NumberedDay = ({ day, isWeekend, inMonth=true }) => (
  <span
    className={`flex items-center justify-center px-1 border cursor-pointer w-14 ${
      !inMonth ? "text-slate-600 border-slate-600":
      isWeekend
        ? "text-red-500 border-red-500"
        : "border-green-500 hover:border-green-500 hover:text-green-500"
    }`}
  >
    {day < 10 ? `0${day}` : day}
  </span>
);

const Week = ({ children }) => (
  <div className="flex justify-between pb-2 text-sm font-medium">
    {children}
  </div>
);

const Calendar = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const weeks = [];
  let week = [];

  // Calculate the total number of squares needed to display 35 days
  const totalSquares = 35;

  // Fill the grid with 35 squares
  for (let i = 1; i <= totalSquares; i++) {
    const isWeekend = [0, 6].includes((firstDayOfMonth + i - 1) % 7);
    let day;
    if (i <= firstDayOfMonth) {
      // Add numbers from the previous month
      const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
      day = daysInPreviousMonth - firstDayOfMonth + i;
      week.push(<NumberedDay key={i} day={day} isWeekend={isWeekend} inMonth={false}/>);
    } else if (i > daysInMonth + firstDayOfMonth) {
      // Add numbers from the next month
      day = i - (daysInMonth + firstDayOfMonth);
      week.push(<NumberedDay key={i} day={day} isWeekend={isWeekend} inMonth={false} />);
    } else {
      // Add numbers from the current month
      day = i - firstDayOfMonth;
      week.push(<NumberedDay key={i} day={day} isWeekend={isWeekend} />);
    }

    if (week.length === 7) {
      // If we have 7 squares in the week, add it to weeks and reset the week array
      weeks.push(<Week key={weeks.length}>{week}</Week>);
      week = [];
    }
  }

  return (
    <div className="calendar">
      <div className="header">
        <div className="-rotate-90 cursor-pointer">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.001 6L6.00098 1L1.00098 6"
              stroke="black"
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-sm font-semibold text-gray-600 uppercase">
          {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(currentDate)}
        </span>
        <div className="rotate-90 cursor-pointer">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.001 6L6.00098 1L1.00098 6"
              stroke="black"
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-between pt-4 pb-2 text-xs font-medium uppercase border-t">
        {days.map((day, index) => (
          <DayName key={index} dayname={day} />
        ))}
      </div>

      <div className="calendar-grid">{weeks}</div>
    </div>
  );
};

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen from-red-100 via-red-300 to-red-500 bg-gradient-to-br">
      <div className="flex flex-col w-full max-w-lg p-6 mx-auto bg-white shadow-xl rounded-2xl">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
