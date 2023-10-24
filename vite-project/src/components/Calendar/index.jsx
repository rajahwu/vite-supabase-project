const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DayName = ({ dayname }) => (
    <div
        className={`flex items-center justify-center h-5 px-3 ${dayname === "Sun"
            ? "text-red-500 border border-red-500"
            : "text-green-500 border border-green-500"
            } rounded-sm shadow-md w-14`}
    >
        {dayname}
    </div>
);

const NumberedDay = ({ day, isWeekend, inMonth = true }) => (
    <span
        className={`flex items-center justify-center px-1 border cursor-pointer w-14 ${!inMonth ? "text-slate-600 border-slate-600" :
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

const generateCalendarDays = (currentYear, currentMonth) => {
    const currentDate = new Date(currentYear, currentMonth, 1);
    const firstDayOfMonth = currentDate.getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const weeks = [];
    let week = [];
    const totalSquares = 35;

    for (let i = 1; i <= totalSquares; i++) {
        const isWeekend = [0, 6].includes((firstDayOfMonth + i - 1) % 7);
        let day;
        if (i <= firstDayOfMonth) {
            const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
            day = daysInPreviousMonth - firstDayOfMonth + i;
            week.push(<NumberedDay key={i} day={day} isWeekend={isWeekend} inMonth={false} />);
        } else if (i > daysInMonth + firstDayOfMonth) {
            day = i - (daysInMonth + firstDayOfMonth);
            week.push(<NumberedDay key={i} day={day} isWeekend={isWeekend} inMonth={false} />);
        } else {
            day = i - firstDayOfMonth;
            week.push(<NumberedDay key={i} day={day} isWeekend={isWeekend} />);
        }

        if (week.length === 7) {
            weeks.push(<Week key={weeks.length}>{week}</Week>);
            week = [];
        }
    }
    return weeks;
};


const Calendar = ({ currentDate = new Date() }) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const calendarDays = generateCalendarDays(currentYear, currentMonth)

    return (
        <div className="flex flex-col w-full max-w-lg p-6 mx-auto bg-white shadow-xl rounded-2xl">
            <div className="flex justify-between">
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

            <div className="calendar-grid">{calendarDays}</div>
        </div>
    );
};

export default Calendar