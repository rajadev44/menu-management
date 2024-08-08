import { MoonStarIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

const DarkModeBtn = () => {
  const [isDarkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  return (
    <button onClick={toggleTheme} className='rounded-full'>
      {isDarkMode ? (
        <MoonStarIcon className='w-4 h-4' />
      ) : (
        <SunIcon className='w-4 h-4' />
      )}
    </button>
  );
};

export default DarkModeBtn;


export const useDarkMode = () =>{
    useEffect(()=>{
        const savedMode = localStorage.getItem("darkMode");
        const isDarkMode = savedMode ? JSON.parse(savedMode) : false;
        if (isDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },[])
}