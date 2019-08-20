import React from 'react'
import { Link } from 'react-router-dom'

const formateDate = date => {
  // console.log(typeof date)
  const newDate = new Date(parseInt(date)).toLocaleDateString('en-US')
  // console.log(newDate)
  const newTime = new Date(parseInt(date)).toLocaleTimeString('en-US')
  return `${newDate} at ${newTime}`

}

const UserInfo = ({ session: { getCurrentUser: currentUser } }) => (
  <div>
    <h3>User Info</h3>
    <p>Username: {currentUser.username}</p>
    <p>Email: {currentUser.email}</p>
    <p>Join date: {formateDate(currentUser.joinDate)}</p>
    <ul>
      <h3>{currentUser.username}'s Favourites</h3>
      {currentUser.favorites.map(item => (
        <li key={item.id}>
          <Link to={`/recipe/${item.id}`}>
            <p>{item.name}</p>
          </Link>
        </li>
      ))}
      {!currentUser.favorites.length && <p>You have no favourites currently. Go add some!</p>}
    </ul>
  </div>
)

export default UserInfo
