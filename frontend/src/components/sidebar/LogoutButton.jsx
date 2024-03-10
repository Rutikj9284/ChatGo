import React from 'react'
import { TbLogout2 } from "react-icons/tb";
import { userLogout } from '../../hooks/userLogout';
const LogoutButton = () => {
  const {loading, logout} = userLogout();
  return (
    <div className='mt-auto'>
        {!loading ? (
          <TbLogout2  className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
        ):(
          <span className='loading loading-spinner'></span>
        )}
    </div>
  )
}

export default LogoutButton