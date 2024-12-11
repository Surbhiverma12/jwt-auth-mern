import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../../utils'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('')
  const [products, setProducts] = useState('')

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const navigate = useNavigate()

  const handleLogout = (e) => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token')
    handleSuccess("User Logged out.")
    setTimeout(()=> {
      navigate('/login')
    },1000)
  }

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8000/products"
      const response = await fetch(url, {
        headers: {
          'authorization' : localStorage.getItem('token')
        }
      }
      );
      const result = await response.json()
      console.log(result)
      setProducts(() => result)
      console.log(product)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(()=>{
    fetchProducts()
  },[])

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products && products.map((item, index) => (
            <ul key={index}>
              <li>
                <span>
                  {item.name} : ₹{item.price}
                </span>
              </li>
            </ul>
          ))
        }
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home