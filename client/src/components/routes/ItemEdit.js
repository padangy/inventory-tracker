import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Layout from '../shared/Layout'
import ItemForm from '../shared/ItemForm'

function ItemEdit() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [item, setItem] = useState({
    title: '',
    link: ''
  })

  const[updated, setUpdated] = useState(false) //need to keep track if it has been updated or not

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios(`http://localhost:3000/api/items/${id}`)
        setItem(response.data)
      }
      catch(error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleChange = (event) => { //Study this to make changes to app
    const updatedField = { [event.target.name]: event.target.value } //Current state, switch (step 1) it with editedItem. After that, update (step 2) it, then save (step 3) it to make it official.
    const editedItem = Object.assign(item, updatedField) //take in object to get rid of, and replace it with another object
    setItem(editedItem)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    axios({
      url: `http://localhost:3000/api/items/${id}`,
      method: 'PUT',
      data: item //send to backend, current state that you updated
    }).then(() => setUpdated(true)).catch(console.error)
  }

  useEffect(() => {
    if (updated) {
      navigate(`/items/${id}`)
    }
  }) //no dependenceies because we are just changing the page, by the next change, it's already done

  return (
    <Layout>
      <ItemForm 
        item={item}
        handleChange={(e) => handleChange(e)}
        handleSubmit={(e) => handleSubmit(e)}
        cancelPath={`/items/${id}`}
      />
    </Layout>
  )
}

export default ItemEdit