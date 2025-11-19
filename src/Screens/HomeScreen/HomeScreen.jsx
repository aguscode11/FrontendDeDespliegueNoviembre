import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Dashboard from '../../Components/Dashboard'

const HomeScreen = () => {
  const { user } = useContext(AuthContext)
  
  return (
    <div className="home-screen">
      <Dashboard />
    </div>
  )
}

export default HomeScreen