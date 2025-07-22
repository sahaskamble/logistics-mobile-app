import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import Icon from "./Icon"

interface ServiceProvider {
  id: number
  name: string
  location: string
  rating: number
  services: string[]
  description: string
  image: string
}

interface ServiceProviderCardProps {
  provider: ServiceProvider
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({ provider }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: provider.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{provider.name}</Text>
          <View style={styles.rating}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{provider.rating}</Text>
          </View>
        </View>

        <View style={styles.location}>
          <Icon name="map-pin" size={16} color="#666" />
          <Text style={styles.locationText}>{provider.location}</Text>
        </View>

        <View style={styles.services}>
          {provider.services.map((service, index) => (
            <View key={index} style={styles.serviceTag}>
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.description}>{provider.description}</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.requestButton}>
            <Text style={styles.requestButtonText}>Request Price</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  services: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  serviceTag: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  serviceText: {
    fontSize: 12,
    color: "#4A90E2",
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  requestButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: "center",
  },
  requestButtonText: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "600",
  },
  detailsButton: {
    flex: 1,
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
})

export default ServiceProviderCard
