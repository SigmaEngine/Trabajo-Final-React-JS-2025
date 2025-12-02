import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

export default function Layout() {
  return (
    <div>
      <Navbar />

      <main style={{ padding: 16 }}>
        <Outlet />
      </main>

      <footer 
        style={{
          textAlign: 'center',
          borderTop: '1px solid #ddd',
          padding: 20,
          background: "#f8f8f8"
        }}
      >
        <p style={{ margin: 0, fontWeight: 500 }}>
          © Automovilismo del bueno
        </p>

        {/* Redes sociales */}
        <div 
          style={{
            marginTop: 10,
            display: "flex",
            gap: 20,
            justifyContent: "center"
          }}
        >
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook size={22} color="#1877F2" />
          </a>

          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram size={22} color="#C13584" />
          </a>

          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter size={22} color="#1DA1F2" />
          </a>

          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube size={22} color="#FF0000" />
          </a>
        </div>
      </footer>
    </div>
  )
}
