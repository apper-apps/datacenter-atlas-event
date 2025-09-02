import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import MapView from "@/components/pages/MapView"
import DatacenterDetails from "@/components/pages/DatacenterDetails"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background font-inter">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MapView />} />
            <Route path="/datacenter/:id" element={<DatacenterDetails />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          className="z-[9999]"
          toastClassName="text-sm"
          bodyClassName="text-sm"
        />
      </div>
    </BrowserRouter>
  )
}

export default App