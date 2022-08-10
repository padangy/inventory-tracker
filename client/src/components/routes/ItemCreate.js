import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from '../shared/Layout'
import ItemForm from '../shared/ItemForm'

function ItemCreate() {
  const navigate = useNavigate()
  const [item, setItem] = useState({
    title: '',
    link: ''
  })

  const [createdItem, setCreatedItem] = useState(null) 

  const handleChange = (event) => { //Study this to make changes to app
    const updatedField = { [event.target.name]: event.target.value } //Current state, switch (step 1) it with editedItem. After that, update (step 2) it, then save (step 3) it to make it official.
    const createdItem = Object.assign(item, updatedField) //take in object to get rid of, and replace it with another object
    setItem(createdItem)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    axios({
      url: `http://localhost:3000/api/items`,
      method: 'POST',
      data: item
    }).then(res => setCreatedItem(res.data.item)).catch(console.error) //if the entry is created in the database, save the response data
  }

  useEffect(() => {
    if(createdItem) {
      return navigate('/items')
    }
  }, [createdItem, navigate]) // once the response data is saved, we have to inform the user or reroute the user...in this case we reroute the user to /items

  return (
    <Layout>
      <ItemForm
      item={item}
      handleChange={(e) => handleChange(e)}
      handleSubmit={(e) => handleSubmit(e)}
      cancelPath='/'
      />
    </Layout>
  )
}

export default ItemCreate