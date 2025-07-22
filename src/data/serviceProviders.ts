export interface ServiceProvider {
  id: number
  name: string
  location: string
  rating: number
  services: string[]
  description: string
  image: string
}

export const serviceProviders: ServiceProvider[] = [
  {
    id: 1,
    name: "FastTrack Logistics",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    services: ["Packing", "Storage", "Customs"],
    description:
      "Premier logistics provider with state-of-the-art facilities offering comprehensive CFS services including packing, storage, and customs clearance.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    name: "GlobeConnect CFS",
    location: "Chennai, Tamil Nadu",
    rating: 4.6,
    services: ["Storage", "Distribution", "Documentation"],
    description:
      "International CFS provider with 24/7 operations and specialized handling for sensitive cargo. Expert documentation and clearance services.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    name: "Nurpa Logistics",
    location: "Kochi, Kerala",
    rating: 4.7,
    services: ["Customs", "Packing", "Tracking"],
    description:
      "Port-based CFS with advanced security and real-time cargo tracking. Specialized in perishable goods handling with temperature-controlled storage.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    name: "SeaLink Maritime",
    location: "Kolkata, West Bengal",
    rating: 4.5,
    services: ["Storage", "Customs", "Distribution"],
    description:
      "Comprehensive maritime logistics solutions with modern warehousing facilities and efficient customs clearance processes.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    name: "CargoMaster Pro",
    location: "Pune, Maharashtra",
    rating: 4.4,
    services: ["Packing", "Documentation", "Tracking"],
    description:
      "Professional cargo handling services with advanced tracking systems and comprehensive documentation support for international shipments.",
    image: "/placeholder.svg?height=200&width=400",
  },
]
