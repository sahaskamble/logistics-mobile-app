"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import Icon from "../components/Icon"
import { ServiceProvider } from "../data/serviceProviders"

interface ServiceProviderDetailsScreenProps {
  provider: ServiceProvider
  onNavigate: (screen: string) => void
  onBack: () => void
}

const ServiceProviderDetailsScreen = ({ provider, onNavigate, onBack }: ServiceProviderDetailsScreenProps) => {
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="star" size={16} color="#FFD700" />)
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="star" size={16} color="#FFD700" />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star" size={16} color="#E0E0E0" />)
    }

    return stars
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={35} color="white"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>View Details</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="bell" size={24} color="white"/>
          </TouchableOpacity>
          <View style={styles.profileImage}>
            <Icon name="user" size={20} color="white" />
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: provider.image }} style={styles.mainImage}/>
          <View style={styles.imageOverlay}>
            <Text style={styles.imageCounter}>1/3</Text>
          </View>
        </View>

        {/* Provider Info */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <TouchableOpacity style={styles.bookmarkButton}>
              <Icon name="bookmark" size={24} color="#4A90E2" />
            </TouchableOpacity>
          </View>

          <View style={styles.locationRow}>
            <Icon name="map-pin" size={16} color="#666" />
            <Text style={styles.locationText}>{provider.location}</Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingNumber}>{provider.rating}</Text>
            <View style={styles.starsContainer}>
              {renderStars(provider.rating)}
            </View>
            <Text style={styles.reviewsText}>({provider.reviews} reviews)</Text>
          </View>

          {/* Service Tags */}
          <View style={styles.servicesContainer}>
            {provider.services.map((service, index) => (
              <View key={index} style={styles.serviceTag}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{provider.description}</Text>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          {provider.email && (
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Icon name="mail" size={20} color="#4A90E2" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{provider.email}</Text>
              </View>
            </View>
          )}

          {provider.phone && (
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Icon name="phone" size={20} color="#4A90E2" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{provider.phone}</Text>
              </View>
            </View>
          )}

          {provider.website && (
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Icon name="globe" size={20} color="#4A90E2" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Website</Text>
                <Text style={styles.contactValue}>{provider.website}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Facility Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facility Details</Text>
          
          <View style={styles.facilityGrid}>
            <View style={styles.facilityItem}>
              <Text style={styles.facilityLabel}>Area Size</Text>
              <Text style={styles.facilityValue}>{provider.areaSize || "N/A"}</Text>
            </View>
            <View style={styles.facilityItem}>
              <Text style={styles.facilityLabel}>Capacity</Text>
              <Text style={styles.facilityValue}>{provider.capacity || "N/A"}</Text>
            </View>
            <View style={styles.facilityItem}>
              <Text style={styles.facilityLabel}>Operating Hours</Text>
              <Text style={styles.facilityValue}>{provider.operatingHours || "N/A"}</Text>
            </View>
            <View style={styles.facilityItem}>
              <Text style={styles.facilityLabel}>Security</Text>
              <Text style={styles.facilityValue}>{provider.security || "N/A"}</Text>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("home")}>
          <Icon name="home" size={24} color="#999" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("dashboard")}>
          <Icon name="grid" size={24} color="#999" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Icon name="truck" size={24} color="#4A90E2" />
          <Text style={[styles.navText, styles.activeNavText]}>Provider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("profile")}>
          <Icon name="user" size={24} color="#999" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 15,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: 250,
  },
  imageOverlay: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  imageCounter: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  infoSection: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  providerName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  bookmarkButton: {
    padding: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  reviewsText: {
    fontSize: 14,
    color: "#666",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  serviceTag: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 12,
    color: "#4A90E2",
    fontWeight: "500",
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  facilityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  facilityItem: {
    width: "48%",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  facilityLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  facilityValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 20,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navItem: {
    alignItems: "center",
  },
  activeNavItem: {
    // Active state styling
  },
  navText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  activeNavText: {
    color: "#4A90E2",
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ServiceProviderDetailsScreen
