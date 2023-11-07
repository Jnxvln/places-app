"use client";
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function Navbar () {

  const pathname = usePathname()

  // Predefined styles
  const defaultLinkStyle = `px-4 py-2 hover:bg-slate-200 transition-colors duration-200 ease-in-out`
  const activeLinkStyle = `bg-slate-300 text-slate-600 font-bold`

  return (
    <nav className="flex">
      {/* BRAND */}
      <div className="mr-4 p-2 font-bold hover:text-sky-800 transition-colors duration-200 ease-in-out">
        <Link href="/">BRAND</Link>
      </div>

      {/* NAVIGATION */}
      <div className="flex">
        <Link href="/" className={`${defaultLinkStyle} ${pathname === '/' && `${activeLinkStyle}`}`}>Home</Link>
        <Link href="/sandbox" className={`${defaultLinkStyle} ${pathname === '/sandbox' && `${activeLinkStyle}`}`}>Sandbox</Link>
      </div>
    </nav>
  )
}