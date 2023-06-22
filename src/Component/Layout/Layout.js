import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'

const Layout = ({
  title = "Area PhoneBook",
  children,
  className,
}) => {
 
  return (
    <>
    <Sidebar/>
    <div className={className}>{children}</div>
    </>
  )
}

export default Layout