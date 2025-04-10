const Sidebar = ({ role }: { role: string }) => {
    const menu = {
      admin: ['Dashboard', 'Users', 'Settings', 'Reports', 'Analytics', 'Billing', 'Logs', 'Support', 'Integrations', 'Profile'],
      vendor: ['Dashboard', 'Orders', 'Profile', 'Support', 'Reports'],
      user: [],
    }
  
    const items = menu[role as keyof typeof menu] || []
  
    return (
      <div style={{ width: 200, background: '#f0f2f5', padding: 20 }}>
        <h3>Sidebar</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }
  
  export default Sidebar
  