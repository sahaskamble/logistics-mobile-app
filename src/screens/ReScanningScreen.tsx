"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from "react-native"
import Icon from "../components/Icon"

interface ReScanningScreenProps {
  onNavigate: (screen: string) => void
  onBack: () => void
}

interface ScanningRequest {
  id: string
  orderId: string
  serviceType: string
  customerRemarks: string
  date: string
  status: "Approved" | "Pending" | "In Progress" | "Rejected"
  reason?: string
}

const ReScanningScreen = ({ onNavigate, onBack }: ReScanningScreenProps) => {
  const [activeTab, setActiveTab] = useState<"Requests" | "Uploads">("Requests")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("All")

  const statsData = [
    { label: "Approved", count: 24, color: "#4CAF50", icon: "✓" },
    { label: "Pending", count: 13, color: "#FF9800", icon: "⏳" },
    { label: "In Progress", count: 8, color: "#2196F3", icon: "🔄" }
  ]

  const scanningRequests: ScanningRequest[] = [
    {
      id: "#RS-2305",
      orderId: "#ORD-9876",
      serviceType: "Express Delivery",
      customerRemarks: "Package was damaged upon arrival, requesting re-scan.",
      date: "May 12, 2023 • 10:45 AM",
      status: "Approved"
    },
    {
      id: "#RS-2304",
      orderId: "#ORD-7654",
      serviceType: "Standard Delivery",
      customerRemarks: "Wrong item shipped, need verification scan.",
      date: "May 11, 2023 • 02:30 PM",
      status: "Pending"
    },
    {
      id: "#RS-2302",
      orderId: "#ORD-3210",
      serviceType: "Standard Delivery",
      customerRemarks: "Need to verify package contents before accepting.",
      date: "May 9, 2023 • 11:20 AM",
      status: "Rejected",
      reason: "Package contents verified, no re-scan needed"
    },
    {
      id: "#RS-2303",
      orderId: "#ORD-5432",
      serviceType: "Priority Shipping",
      customerRemarks: "Item count doesn't match invoice, please verify.",
      date: "May 10, 2023 • 09:15 AM",
      status: "In Progress"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "#4CAF50"
      case "Pending": return "#FF9800"
      case "In Progress": return "#2196F3"
      case "Rejected": return "#F44336"
      default: return "#666"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return "✓"
      case "Pending": return "⏳"
      case "In Progress": return "🔄"
      case "Rejected": return "✕"
      default: return "●"
    }
  }

  const filteredRequests = scanningRequests.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterBy === "All" || request.status === filterBy
    return matchesSearch && matchesFilter
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Icon name="arrowright" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Re-Scanning</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="bell" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.profileImage}>
            <Icon name="user" size={16} color="white" />
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Requests" && styles.activeTab]}
          onPress={() => setActiveTab("Requests")}
        >
          <Text style={[styles.tabText, activeTab === "Requests" && styles.activeTabText]}>
            Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Uploads" && styles.activeTab]}
          onPress={() => setActiveTab("Uploads")}
        >
          <Text style={[styles.tabText, activeTab === "Uploads" && styles.activeTabText]}>
            Uploads
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {statsData.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statIcon}>{stat.icon}</Text>
            </View>
            <Text style={[styles.statCount, { color: stat.color }]}>{stat.count}</Text>
          </View>
        ))}
      </View>

      {/* New Request Button */}
      <View style={styles.newRequestContainer}>
        <TouchableOpacity 
          style={styles.newRequestButton}
          onPress={() => onNavigate("create-rescanning")}
        >
          <Icon name="plus" size={16} color="white" />
          <Text style={styles.newRequestText}>New Request</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="search" size={16} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search request ID"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "Requests" && (
          <View style={styles.requestsList}>
            {filteredRequests.map((request, index) => (
              <View key={index} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <View style={styles.requestIdContainer}>
                    <Text style={styles.requestId}>Request ID</Text>
                    <Text style={styles.requestIdValue}>{request.id}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}>
                      <Text style={styles.statusText}>{request.status}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.orderInfo}>
                  <Text style={styles.orderLabel}>Order ID</Text>
                  <Text style={styles.orderValue}>{request.orderId}</Text>
                </View>

                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceLabel}>Service Type</Text>
                  <Text style={styles.serviceValue}>{request.serviceType}</Text>
                </View>

                <View style={styles.remarksContainer}>
                  <Text style={styles.remarksLabel}>Customer Remarks</Text>
                  <Text style={styles.remarksText}>{request.customerRemarks}</Text>
                </View>

                {request.status === "Rejected" && request.reason && (
                  <View style={styles.reasonContainer}>
                    <Text style={styles.reasonLabel}>Reason:</Text>
                    <Text style={styles.reasonText}>{request.reason}</Text>
                  </View>
                )}

                <View style={styles.requestFooter}>
                  <Text style={styles.dateText}>{request.date}</Text>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>View Details</Text>
                    <Icon name="arrowright" size={12} color="#4A90E2" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === "Uploads" && (
          <View style={styles.uploadsContainer}>
            <View style={styles.uploadPlaceholder}>
              <View style={styles.uploadIcon}>
                <Icon name="upload" size={48} color="#4A90E2" />
              </View>
              <Text style={styles.uploadPlaceholderTitle}>Upload Scanning Documents</Text>
              <Text style={styles.uploadPlaceholderText}>
                Upload photos, scan reports, and related documents for re-scanning requests
              </Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Icon name="plus" size={16} color="white" />
                <Text style={styles.uploadButtonText}>Choose Files</Text>
              </TouchableOpacity>
              <Text style={styles.uploadFormats}>Supported: PDF, JPG, PNG (Max 10MB)</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate("home")}
        >
          <Icon name="home" size={20} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate("dashboard")}
        >
          <Icon name="dashboard" size={20} color="#666" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItemCenter}
          onPress={() => onNavigate("create-order")}
        >
          <View style={styles.fabInNav}>
            <Icon name="plus" size={24} color="white" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate("providers")}
        >
          <Icon name="logistics" size={20} color="#666" />
          <Text style={styles.navText}>Provider</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate("profile")}
        >
          <Icon name="user" size={20} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 16,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 70,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "180deg" }],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    flex: 1,
    textAlign: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
    marginRight: 12,
  },
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#4A90E2",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: "white",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  statIcon: {
    fontSize: 16,
  },
  statCount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  newRequestContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  newRequestButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  newRequestText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  filterButton: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  requestsList: {
    paddingHorizontal: 16,
  },
  requestCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requestHeader: {
    marginBottom: 12,
  },
  requestIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  requestId: {
    fontSize: 12,
    color: "#666",
    marginRight: 8,
  },
  requestIdValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
  orderInfo: {
    flexDirection: "row",
    marginBottom: 8,
  },
  orderLabel: {
    fontSize: 12,
    color: "#666",
    width: 80,
  },
  orderValue: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  serviceInfo: {
    flexDirection: "row",
    marginBottom: 12,
  },
  serviceLabel: {
    fontSize: 12,
    color: "#666",
    width: 80,
  },
  serviceValue: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  remarksContainer: {
    marginBottom: 12,
  },
  remarksLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  remarksText: {
    fontSize: 12,
    color: "#333",
    lineHeight: 16,
  },
  reasonContainer: {
    backgroundColor: "#FFEBEE",
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  reasonLabel: {
    fontSize: 11,
    color: "#F44336",
    fontWeight: "500",
    marginBottom: 2,
  },
  reasonText: {
    fontSize: 11,
    color: "#F44336",
    lineHeight: 14,
  },
  requestFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  dateText: {
    fontSize: 11,
    color: "#999",
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsButtonText: {
    fontSize: 12,
    color: "#4A90E2",
    fontWeight: "500",
    marginRight: 4,
  },
  uploadsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  uploadPlaceholder: {
    alignItems: "center",
    padding: 32,
  },
  uploadIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  uploadPlaceholderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  uploadPlaceholderText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  uploadButton: {
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  uploadFormats: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  bottomNavigation: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  navItemCenter: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  navText: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
    fontWeight: "500",
  },
  fabInNav: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
})

export default ReScanningScreen
