import React, {useState, useEffect} from 'react'
import {User} from '../types/User'
import Refresh from './Refresh'

const UserInfo: React.FC<object>= () => {
    const [user, setUser] = useState<User[]>([])

    useEffect(() => {
        const fetchUser = () => {
            const userData = localStorage.getItem('user')
            if(userData){
                const parsedData: User[] = JSON.parse(userData);
                setUser(parsedData)
            }
        }
        fetchUser();
    },[])

    if(!user){
        return null
    }
  return (
    <div className="d-flex justify-content-center flex-column align-items-center mx-auto vh-100 text-center">
        {user.map((u, index) => (
            <div key={index}>
                <img src={u.picture.medium} className="rounded-circle img-thumbnail"/>
                <h3>{u.name.first} {u.name.last}</h3>
                <p>{u.email}</p>
            </div>
        ))}
        <Refresh/>
    </div>
  )
}

export default UserInfo