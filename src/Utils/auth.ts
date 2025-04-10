export const USERS = [
    { email: 'user123@gmail.com', password: 'user123', role: 'user' },
    { email: 'admin123@gmail.com', password: 'admin123', role: 'admin' },
    { email: 'vendor123@gmail.com', password: 'vendor123', role: 'vendor' },
  ]
  
  export function authenticate(email: string, password: string) {
    return USERS.find(user => user.email === email && user.password === password)
  }