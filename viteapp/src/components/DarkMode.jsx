import {useState, useEffect} from 'preact/hooks'

import {CtaButton} from "./GlobalStyles"
function DarkMode() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", String(!darkMode));
  }

  useEffect(() => {
    localStorage.getItem('darkMode') === 'true' ? setDarkMode(true) : setDarkMode(false);
  },[darkMode])

  return (
    <CtaButton onClick={toggleDarkMode}>mode</CtaButton>
  )
}

export default DarkMode