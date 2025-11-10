import Navbar from '@/components/navbar'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
