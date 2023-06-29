import { useEffect, useState } from "react"

function App() {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})

  const className = enable ? null : 'no-display'

  //pointer move
  useEffect(() => {
    const handleMove = (e) => {
      const {clientX, clientY} = e
      setPosition({
        x: clientX,
        y: clientY
      }) 
    }

    if(enable) {
      window.addEventListener('pointermove', handleMove)
    }
    
    //se limpia cuando desmonta
    // o cuando cambian las dependencias antes de ejecutar el efecto de nuevo
    return () => { 
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enable])

  //change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enable)

    return(() =>{
      document.body.classList.remove('no-cursor')
    })
  },[enable])

  return (
    <main>
      <div 
        className={className}
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <button onClick={() => {setEnable(!enable)}}>
        {enable ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
}

export default App
