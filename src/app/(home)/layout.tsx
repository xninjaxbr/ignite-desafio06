import SideBar from '../../components/sideBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-sideBar ">
      <SideBar />

      {children}
    </div>
  )
}
