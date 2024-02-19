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

const TeacherHome = () => {
  const greeting = getGreeting();

  return (
    <div className=" flex flex-col  bg-white p-8">
      <div className="text-3xl font-bold mb-4">{greeting} : Aditya Shah</div>

      <div className="flex flex-wrap m-8 gap-4 p-4">
        {[1, 2, 3, 4].map((year) => (

            <Card key={year}/>
        //   <div key={year} className="bg-blue-300 p-4 m-4 rounded-md">
        //     {`${year} Year`}
        //   </div>


        ))}
      </div>
    </div>
  );
};

export default TeacherHome;
