import { Outlet } from "react-router-dom"
import { cn } from "@/utils/cn"

const Layout = ({ className, ...props }) => {
  return (
    <div 
      className={cn(
        "min-h-screen bg-background",
        className
      )}
      {...props}
    >
      <Outlet />
    </div>
  )
}

export default Layout