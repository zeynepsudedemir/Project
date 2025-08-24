import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '@/api/auth'

export const Route = createFileRoute('/_private')({
  
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to:'/login',
        search:{
          redirect:location.pathname 
        }
      })
    }
  },
})