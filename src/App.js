import { useEffect, useState } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";
import { useMemo } from "react";

// Function to format a date object into a specific string format

function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function App() {
  const [allowSound, setAllowSound] = useState(true);
  const [time, setTime] = useState(formatTime(new Date()));

  // Dervies whether it's AM or PM from the time 
  const partOfDay = time.slice(-2);

    // A list of workouts with a conditional for the number of exercises based on partOfDay (AM/PM)

  const workouts = useMemo(()=> {
    return [
    {
      name: "Full-body workout",
      numExercises: partOfDay === "AM" ? 9 : 8,
    },
    {
      name: "Arms + Legs",
      numExercises: 6,
    },
    {
      name: "Arms only",
      numExercises: 3,
    },
    {
      name: "Legs only",
      numExercises: 4,
    },
    {
      name: "Core only",
      numExercises: partOfDay === "AM" ? 5 : 4,
    },
    ];
  }, [partOfDay])

    // Function to format a date object into a specific string format



  // useEffect hook to update the time state every second

  useEffect(function () {
    const id = setInterval(function () {  // setInterval runs the provided function every 1000ms (1 second)
      setTime(formatTime(new Date()));      // Updates the time state every second with the new time
    }, 1000);

    return () => clearInterval(id);  // Cleanup function to clear the interval when the component is unmounted
  }, []); // Empty dependency array means the effect runs once when the component mounts


  // The rendered component
  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}
// Exports the App component to be used in other parts of the application
export default App;
