/* import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { getWorkspaces } from '../../services/workspaceService'
import { Link } from 'react-router'


const HomeScreen = () => {

  const { sendRequest, response, loading, error } = useFetch()

  useEffect(
    ()=> {
      sendRequest(
        () => getWorkspaces()
      )
    },
    []
  )

  console.log(response, loading, error)
  return (
    <div>
      <h1>Lista de espacios de trabajo</h1>
      {
        loading
        ? <span>Cargando...</span>
        : <div>
          {
          response 
          && 
          response.data.workspaces.map(
            (workspace) => {
              return (
                <div>
                  <h2>{workspace.workspace_name}</h2>
                  <Link to={'/workspace/' + workspace.workspace_id}>Abrir workspace</Link>
                </div>
              )
            }
          )
          }
        </div>
      }
    </div>
  )
}

export default HomeScreen */

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