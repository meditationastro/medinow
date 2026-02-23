"use client"

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export function Map({ className = "" }: { className?: string }) {
  useEffect(() => {
    // Create map only on client side
    const map = L.map('map').setView([27.715388921678755, 85.29059125564561], 15) // Kathmandu coordinates

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    // Custom marker icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="w-6 h-6 bg-primary-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-bounce">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    })

    // Add marker for Kathmandu
    const marker = L.marker([27.715388921678755, 85.29059125564561], { icon: customIcon }).addTo(map)
    marker.bindPopup('<strong>Sacred Himalayan Wisdom Center</strong><br>Kathmandu, Nepal')

    // Cleanup on unmount
    return () => {
      map.remove()
    }
  }, [])

  return (
    <>
      <div id="map" className={`h-[300px] w-full ${className}`} />
      <style jsx global>{`
        .leaflet-container {
          background: #f3f4f6;
        }
        .custom-marker {
          background: transparent;
          border: none;
        }
      `}</style>
    </>
  )
} 