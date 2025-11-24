import './App.css'
import CinemaHallBooking from './components/CinemaHallBooking'

function App() {

  return (
    <>
      <CinemaHallBooking bookedSeats={["A1", "A8", "B3", "C12", "F5", "G2"]}/>
    </>
  )
}

export default App
