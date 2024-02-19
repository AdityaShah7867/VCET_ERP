import React from 'react';
import Card from '../../Components/Card/Card';

const getGreeting = () => {
  const currentTime = new Date().getHours();
  let greeting;

  if (currentTime >= 5 && currentTime < 12) {
    greeting = 'Good Morning';
  } else if (currentTime >= 12 && currentTime < 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return greeting;
};

const year = [
  {
    year: 1,
    branch: "IT"
  },
  {
    year: 2,
    branch: "IT"
  },
  {
    year: 3,
    branch: "IT"
  },
  {
    year: 4,
    branch: "IT"
  }

]

const TeacherHome = () => {
  const greeting = getGreeting();

  return (
    <div className=" flex flex-col  bg-white p-8">
      <div className="text-3xl font-bold mb-4">{greeting} : Aditya Shah</div>

      <div className="flex flex-wrap m-8 gap-4 p-4">
        {year.map((year) => (

          <Card key={year}
            year={year.year} branch={year.branch}
          />

        ))}
      </div>
    </div>
  );
};

export default TeacherHome;
