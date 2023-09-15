
import './styles/main.css'
import logoImg from './assets/logo-nlw-esports.png'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react'
import { Input } from './components/Form/input'

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  }
} 

const URL = 'http://localhost:3333/games'

const requestData = () => fetch(URL).then(response => response.json());

function App() {  

  const [games, setGames] = useState<Game[]>([]); 

  useEffect(() => {
    requestData().then(data => 
      setGames(data[0]))
  }, [])

    return (
      <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'> 
        <img src={logoImg} alt='' />

        <h1 className='text-6xl text-white font-black'>Your <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> is here.</h1>
      
        <div className='grid grid-cols-6 gap-6 mt-6'>
          {games.map(game => {
            return(
            <GameBanner 
              key={game.id} 
              title={game.title} 
              bannerUrl={game.bannerUrl} 
              adsCount={game._count.ads}
            />)
          })}
        
        </div> 
        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />
        </Dialog.Root>
      </div>
    )
}

export default App
 