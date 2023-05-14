//변수 선언
let today = new Date();
today.setHours(0, 0, 0, 0);
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let goalDate;

const calculateDday = () => {
  goalDate = new Date(document.getElementById("goalDate").value);
  displayCalendar();
};

const calculateDayDiff = (curDate, goalDate) => {
  return Math.ceil(
    (goalDate.getTime() - curDate.getTime()) / (1000 * 60 * 60 * 24) - 1
  );
};

const displayYearMonth = () => {
  const yearMonth = document.querySelector("#year-month");
  yearMonth.innerHTML = "";
  yearMonth.appendChild(
    document.createTextNode(`${currentYear}년 ${currentMonth + 1}월`)
  );
};

// f : displayCalendar
const displayCalendar = () => {
  const numDays = new Date(currentYear, currentMonth + 1, 0).getDate(); // 이번 달의 마지막 날짜 구하기
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 이번달의 첫째날과 마지막날의 요일 구하기
  const lastDay = new Date(currentYear, currentMonth, numDays).getDay();
  const tableBody = document.querySelector("#calendar tbody"); //#calendar의 tbody 태그 선택
  tableBody.innerHTML = "";
  //6주(행)을 돌면서 7일을 만든다.
  for (let loopWeekIndex = 0; loopWeekIndex < 6; loopWeekIndex++) {
    const row = document.createElement("tr"); //row(일주일 행) 하나를 만든다.
    //행안에서 7일을 돈다.
    for (let loopDayIndex = 0; loopDayIndex < 7; loopDayIndex++) {
      let cell = document.createElement("td"); //날짜 element만든다.
      const day = loopWeekIndex * 7 + (loopDayIndex + 1) - firstDay; // 날짜를 미리 구해두고 filter 조건들을 통과시킨다.
      let cellText = document.createTextNode("");
      // 필터1 : 첫번째 셀에 0일은 반드시 빈칸
      if (loopWeekIndex === 0 && loopDayIndex < firstDay) {
        cell.appendChild(cellText);
      } else if (
        //필터2 : 마지막 날짜 이후 채우기
        (loopWeekIndex === 5 && loopDayIndex > lastDay) ||
        day > numDays
      ) {
        break;
      } else {
        // 기본적으로 도는 루프
        // today class 삽입 로직
        if (
          day === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear()
        ) {
          cell.classList.add("today");
        }
        cellText = document.createTextNode(day);
        let tempDate = new Date(currentYear, currentMonth, day);
        cell.appendChild(cellText);
        // d-day 삽입 로직
        if (
          goalDate !== undefined &&
          goalDate !== null &&
          tempDate >= today &&
          tempDate < goalDate
        ) {
          if (
            day === goalDate.getDate() &&
            currentMonth === goalDate.getMonth() &&
            currentYear === goalDate.getFullYear()
          ) {
            cell.classList.add("dDay");
          }
          cell.appendChild(document.createElement("br"));
          cell.appendChild(
            document.createTextNode(
              "(-" + calculateDayDiff(tempDate, goalDate) + ")"
            )
          );
        }
      }
      row.appendChild(cell);
    }
    tableBody.appendChild(row); // 한주를 돌면서 day들을 붙여 줬으니 tableBody에 row를 붙여준다.
  }
};

const displayAll = () => {
  displayYearMonth();
  displayCalendar();
};

const prevMonth = () => {
  //필터 : 해넘이
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--; //principle
  }
  displayAll();
};

const nextMonth = () => {
  //필터 : 해넘이
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++; //principle
  }
  displayAll();
};

const showCurrentMonth = () => {
  today = new Date();
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  displayAll();
};

displayAll();
