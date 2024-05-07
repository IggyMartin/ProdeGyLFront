import fondoCopaAmerica2024 from '../assets/fondo-copa-america-2024/fondo_copa_america_01.jpeg'
import GL from '../assets/logo-GyL/GL.png'

function Layout({ children, page }) {
  return (
    <div className="bg-cover bg-center h-screen" style={{backgroundImage: `url(${fondoCopaAmerica2024})`}}>
        {/* Background image with opacity */}
        <div className="absolute inset-0 bg-black opacity-80"></div>

        {/* Content */}
        <div className="h-screen relative flex flex-col justify-between text-white">
            <header className="bg-blue-950 flex justify-between items-center p-2 mb-4">
              <img className="w-24 h-24 rounded-2xl" src={GL} alt="Logo GyL" />
              <nav className='w-1/2	'>
                <ul className='flex justify-between'>       
                  <li className='text-[24px] hover:cursor-pointer hover:underline'>Fixture</li>
                  <li className='text-[24px] hover:cursor-pointer hover:decoration-solid hover:underline'>Posiciones</li>
                  <li className='text-[24px] hover:cursor-pointer hover:decoration-solid hover:underline'>Reglas</li>
                  <li className='text-[24px] hover:cursor-pointer hover:decoration-solid hover:underline'>Premios</li>
                </ul>
              </nav>
              <div>
                <img src="" alt="Profile avatar" /> {/*avatar del usuario*/}
                <span>Hola Usuario</span> {/*alias del usuario*/}
              </div>
            </header>
            <main className='flex-grow'>
              <div className='flex flex-col items-center gap-4 mb-16'>
                <h1 className='text-[28px]'>Copa America 2024</h1>
                <h2 className='text-[22px]'>{page}</h2>
              </div>
              {children}
            </main>
            <nav className="flex justify-center items-center mb-6 h-16">
              <span className='text-[24px] hover:cursor-pointer	mx-8'>Fase De Grupos</span>
              <span className='text-[24px] hover:cursor-pointer mx-8'>Cuartos de Final</span>
              <span className='text-[24px] hover:cursor-pointer mx-8'>Semifinales</span>
              <span className='text-[24px] hover:cursor-pointer mx-8'>Estancia Final</span>
            </nav>
        </div>
    </div>
  )
}

export default Layout