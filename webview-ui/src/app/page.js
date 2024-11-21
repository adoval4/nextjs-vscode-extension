"use client"

import Image from "next/image";
import { useEffect, useState } from "react"

// Create a useRouter hook
const useRouter = (initialPath = '/') => {
  const [route, setRoute] = useState(initialPath)
  
  const router = {
    path: route,
    push: (path) => {
      setRoute(path)
    }
  }

  return { router, route, setRoute }
}

const HomePage = ({ router }) => {
  return (
    <div>
      <h1 className="text-4xl mb-6">Home</h1>
      <div className="space-y-4">
        <button className="block bg-white text-black" onClick={() => router.push('/about')}>Go to About</button>
        <button className="block bg-white text-black" onClick={() => router.push('/task/1')}>Go to Task 1</button>
        <button className="block bg-white text-black" onClick={() => router.push('/task/2')}>Go to Task 2</button>
        <button className="block bg-white text-black" onClick={() => router.push('/task/3')}>Go to Task 3</button>
      </div>
    </div>
  )
}

const AboutPage = ({ router }) => {
  return (
    <div>
      <h1 className="text-4xl mb-6">About</h1>
      <button className="block bg-white text-black" onClick={() => router.push('/')}>Go to Home</button>
    </div>
  )
}

const TaskDetailPage = ({ router, params }) => {
  return (
    <div>
      <h1 className="text-4xl mb-6">Task Detail: {params.id}</h1>
      <button className="block bg-white text-black" onClick={() => router.push('/')}>Go to Home</button>
    </div>
  )
}

export default function Main() {

  const routes = [
    {
      regex: /^\/$/,
      component: HomePage
    },
    {
      regex: /^\/about$/,
      component: AboutPage
    },
    {
      regex: /^\/task\/(?<id>\d+)$/,
      component: TaskDetailPage
    }
  ]
  const { router, route } = useRouter()

  // Make a router based on the routes array
  const routeObj = routes.find(r => route.match(r.regex))
  if (!routeObj) {
    return (
      <div>
        <div>404 Not Found</div>
        <button className="block bg-white text-black" onClick={() => router.push('/')}>Go to Home</button>
      </div>
    )
  }
  // hey
  const params = route.match(routeObj.regex).groups

  const Component = routeObj.component
  return <Component router={router} params={params} />
}
