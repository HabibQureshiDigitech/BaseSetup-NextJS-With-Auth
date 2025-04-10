'use client'
import { getCookie } from 'cookies-next'


const Dashboard = () => {
  const role = getCookie('role') || 'undefined'

  return (
    <div style={{ display: 'flex' }}>
      {/* <Sidebar role={role as string} /> */}
      <div style={{ padding: 20 }}>
        <h1>Dashboard - Role: {role}</h1>
      </div>
    </div>
  )
}

export default Dashboard




// 'use client'

// import Sidebar from '@/Components/Sidebar'
// import { getCookie } from 'cookies-next'
// import { CookiesProvider } from 'react-cookie'


// const Dashboard = ({ children }:{ children: React.ReactNode }) => {
//   const role = getCookie('role') || 'undefined'
//   console.log(role)

//   return (
// <CookiesProvider>
// <div>
//   {children}
//   <h1>Dashboard </h1>
// </div>
// </CookiesProvider>
//   )
// }

// export default Dashboard






