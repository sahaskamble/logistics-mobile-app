"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from "react-native"
import Icon from "../components/Icon"
import Sidebar from "../components/Sidebar"

interface ReScanningScreenProps {
  onNavigate: (screen: string) => void
  onBack: () => void
  onLogout?: () => void
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

interface ReScanningStatus {
  id: string
  title: string
  count: number
  color: string
  backgroundColor: string
  icon: string
}

const ReScanningScreen = ({ onNavigate, onBack, onLogout = () => {} }: ReScanningScreenProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("All")
  const [activeTab, setActiveTab] = useState("Requests")

  // Status cards data - matching Container Staging design
  const reScanningStatuses: ReScanningStatus[] = [
    {
      id: 'approved',
      title: 'Approved',
      count: 24,
      color: '#4CAF50',
      backgroundColor: '#E8F5E8',
      icon: 'check',
    },
    {
      id: 'pending',
      title: 'Pending',
      count: 13,
      color: '#FF9800',
      backgroundColor: '#FFF3E0',
      icon: 'clock',
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      count: 8,
      color: '#2196F3',
      backgroundColor: '#E3F2FD',
      icon: 'refresh',
    },
    {
      id: 'rejected',
      title: 'Rejected',
      count: 2,
      color: '#F44336',
      backgroundColor: '#FFEBEE',
      icon: 'close',
    },
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

  const renderStatusCard = (status: ReScanningStatus) => (
    <TouchableOpacity
      key={status.id}
      style={[styles.statusCard, { backgroundColor: status.backgroundColor }]}
      activeOpacity={0.7}
    >
      <View style={[styles.statusIcon, { backgroundColor: status.color }]}>
        <Icon name={status.icon} size={20} color="white" />
      </View>
      <Text style={styles.statusTitle}>{status.title}</Text>
      <Text style={[styles.statusCount, { color: status.color }]}>{status.count}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Re-Scanning</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.profileButton}>
          <Icon name="user" size={24} color="white" />
        </View>
      </View>

      {/* Status Cards */}
      <View style={styles.statusSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusScrollView}>
          {reScanningStatuses.map(renderStatusCard)}
        </ScrollView>
      </View>

      {/* List Header */}
      <View style={styles.listHeader}>
        <View style={styles.listTitleContainer}>
          <Text style={styles.listTitle}>Re-Scanning Requests</Text>
        </View>
        <TouchableOpacity style={styles.newRequestButton} onPress={() => onNavigate("create-rescanning")}>
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
            placeholder="Search re-scanning requests..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
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

      {/* Sidebar */}
      <Sidebar
        isVisible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  menuButton: {
    padding: 8,
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
    padding: 8,
    marginLeft: "auto",
    marginRight: 12,
  },
  profileButton: {
    padding: 8,
  },
  // Status Cards Section - Matching Container Staging design
  statusSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statusScrollView: {
    flexDirection: 'row',
  },
  statusCard: {
    width: 110,
    padding: 14,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  statusCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // List Header Section
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
  },
  listTitleContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  newRequestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  newRequestText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
  // Tab Navigation Styles
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  activeTabButton: {
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
