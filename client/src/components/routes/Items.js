import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Items() {
  const [items, setItems] = useState([]) //to hold API data

  const fetchData = async () => {
    try {
      const response = await axios('http://localhost:3000/api/items')
      console.log(response) //go to console to see object and what to grab from the object array
      setItems(response.data.items)
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  //map over all of the items...(eat steak)
  const itemsData = items.map((item) => {
    return  <li key={item._id}>
            <NavLink to={`/items/${item._id}`}>{item.title}</NavLink>
            </li>
  })

  return (
    <div>
      <h4>Items</h4>
      <ul>
        {itemsData}
      </ul>
    </div>
  )
}

export default Items