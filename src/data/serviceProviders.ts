export interface ServiceProvider {
  id: number
  name: string
  location: string
  rating: number
  reviews: number
  services: string[]
  description: string
  image: string
  email?: string
  phone?: string
  website?: string
  areaSize?: string
  capacity?: string
  operatingHours?: string
  security?: string
}

export const serviceProviders: ServiceProvider[] = [
  {
    id: 1,
    name: "FastTrack Logistics",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    reviews: 128,
    services: ["Packing", "Storage", "Customs", "Palletizing", "Inspection"],
    description:
      "Global Freight Solutions is a premier container freight station provider with over 15 years of experience. We offer comprehensive logistics solutions including packing, storage, customs clearance, and distribution services. Our state-of-the-art facilities ensure your cargo is handled with care and efficiency.",
    image: "/placeholder.svg?height=200&width=400",
    email: "contact@fasttrack.com",
    phone: "+91 21 5836 9921",
    website: "www.fasttracklogistics.com",
    areaSize: "45,000 sq.m",
    capacity: "5,000 TEU",
    operatingHours: "24/7",
    security: "CCTV & Guards",
  },
  {
    id: 2,
    name: "GlobeConnect CFS",
    location: "Chennai, Tamil Nadu",
    rating: 4.6,
    reviews: 95,
    services: ["Storage", "Distribution", "Documentation"],
    description:
      "International CFS provider with 24/7 operations and specialized handling for sensitive cargo. Expert documentation and clearance services.",
    image: "/placeholder.svg?height=200&width=400",
    email: "info@globeconnect.com",
    phone: "+91 44 2345 6789",
    website: "www.globeconnectcfs.com",
    areaSize: "35,000 sq.m",
    capacity: "3,500 TEU",
    operatingHours: "24/7",
    security: "CCTV & Guards",
  },
  {
    id: 3,
    name: "Nurpa Logistics",
    location: "Kochi, Kerala",
    rating: 4.7,
    reviews: 112,
    services: ["Customs", "Packing", "Tracking"],
    description:
      "Port-based CFS with advanced security and real-time cargo tracking. Specialized in perishable goods handling with temperature-controlled storage.",
    image: "/placeholder.svg?height=200&width=400",
    email: "contact@nurpa.com",
    phone: "+91 484 123 4567",
    website: "www.nurpalogistics.com",
    areaSize: "28,000 sq.m",
    capacity: "2,800 TEU",
    operatingHours: "24/7",
    security: "CCTV & Guards",
  },
  {
    id: 4,
    name: "SeaLink Maritime",
    location: "Kolkata, West Bengal",
    rating: 4.5,
    reviews: 87,
    services: ["Storage", "Customs", "Distribution"],
    description:
      "Comprehensive maritime logistics solutions with modern warehousing facilities and efficient customs clearance processes.",
    image: "/placeholder.svg?height=200&width=400",
    email: "info@sealink.com",
    phone: "+91 33 9876 5432",
    website: "www.sealinkmaritime.com",
    areaSize: "40,000 sq.m",
    capacity: "4,200 TEU",
    operatingHours: "24/7",
    security: "CCTV & Guards",
  },
  {
    id: 5,
    name: "CargoMaster Pro",
    location: "Pune, Maharashtra",
    rating: 4.4,
    reviews: 76,
    services: ["Packing", "Documentation", "Tracking"],
    description:
      "Professional cargo handling services with advanced tracking systems and comprehensive documentation support for international shipments.",
    image: "/placeholder.svg?height=200&width=400",
    email: "support@cargomaster.com",
    phone: "+91 20 1234 5678",
    website: "www.cargomasterpro.com",
    areaSize: "25,000 sq.m",
    capacity: "2,500 TEU",
    operatingHours: "24/7",
    security: "CCTV & Guards",
  },
]
