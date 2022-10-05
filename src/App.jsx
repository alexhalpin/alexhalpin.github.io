import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div id="Banner">alexhalp.in</div>
      <div id="Links">
        <a id="github" href="https://github.com/alexhalpin" className="Link">
          github
        </a>
        <a id="linkedin" href="https://www.linkedin.com/in/alexhalpin/"  className="Link">
          linkedin
        </a>
        <a id="email" href="mailto:alexhalpin0@gmail.com?subject=Nice Website!" className="Link">
          email
        </a>
      </div>
    </div>
  )
}

export default App
