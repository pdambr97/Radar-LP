import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header, Footer } from './Navigation'

export default function Layout() {
  const location = useLocation()

  // Handle hash scrolling on page transitions (e.g. /#cadastro)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.pathname, location.hash])

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF7] text-[#17221C] antialiased selection:bg-[#DDF36A] selection:text-[#17221C]">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
