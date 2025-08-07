"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from "react-native"
import Icon from "../components/Icon"
import Sidebar from "../components/Sidebar"

interface WeightmentSlipScreenProps {
  onNavigate: (screen: string) => void
  onBack: () => void
  onLogout?: () => void
}

interface WeightmentRequest {
  id: string
  orderId: string
  customer: string
  serviceType: string
  remarks: string
  date: string
  status: "Approved" | "Pending" | "In Progress" | "Rejected"
  reason?: string
}

interface WeightmentStatus {
  id: string
  title: string
  count: number
  color: string
  backgroundColor: string
  icon: string
}

const WeightmentSlipScreen = ({ onNavigate, onBack, onLogout = () => {} }: WeightmentSlipScreenProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("Requests")

  // Status cards data - matching ProformaInvoiceScreen design
  const weightmentStatuses = [
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

  const weightmentRequests: WeightmentRequest[] = [
    {
      id: "REQ-00128",
      orderId: "ORD-9245",
      customer: "Acme Corporation",
      serviceType: "Container Weighing",
      remarks: "Urgent shipment for export",
      date: "24 Jun 2023",
      status: "Approved"
    },
    {
      id: "REQ-00127",
      orderId: "ORD-9244",
      customer: "Global Logistics Ltd",
      serviceType: "Truck Weighing",
      remarks: "Regular delivery schedule",
      date: "23 Jun 2023",
      status: "Pending"
    },
    {
      id: "REQ-00126",
      orderId: "ORD-9240",
      customer: "East Coast Shipping",
      serviceType: "Bulk Cargo Weighing",
      remarks: "Requires special handling",
      date: "22 Jun 2023",
      status: "In Progress"
    },
    {
      id: "REQ-00125",
      orderId: "ORD-9238",
      customer: "Pacific Freight Inc",
      serviceType: "Container Weighing",
      remarks: "Incomplete documentation",
      date: "21 Jun 2023",
      status: "Rejected",
      reason: "Incomplete documentation"
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

  const filteredRequests = weightmentRequests.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.customer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const renderStatusCard = (status: WeightmentStatus) => (
    <TouchableOpacity
      key={status.id}
      style={[styles.statusCard, { backgroundColor: status.backgroundColor }]}
      activeOpacity={0.7}
    >
      <View style={[styles.statusCardIcon, { backgroundColor: status.color }]}>
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
        <Text style={styles.headerTitle}>Weightment Slip</Text>
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
          {weightmentStatuses.map(renderStatusCard)}
        </ScrollView>
      </View>

      {/* Search Bar with New Request Button */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Icon name="search" size={18} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search weightment slips..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.newRequestButton} onPress={() => onNavigate("create-weightment")}>
            <Icon name="plus" size={16} color="white" />
            <Text style={styles.newRequestText}>New Request</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "Requests" && (
          <View style={styles.requestsList}>
            {filteredRequests.map((request) => (
              <View key={request.id} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <View style={styles.requestIdContainer}>
                    <Text style={styles.requestId}>{request.id}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}>
                      <Text style={styles.statusIcon}>{getStatusIcon(request.status)}</Text>
                      <Text style={styles.statusText}>{request.status}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.moreButton}>
                    <Text style={styles.moreIcon}>⋯</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.orderNumber}>Order: {request.orderId}</Text>

                <View style={styles.requestDetails}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Customer</Text>
                      <Text style={styles.detailValue}>{request.customer}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Service Type</Text>
                      <Text style={styles.detailValue}>{request.serviceType}</Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Date</Text>
                      <Text style={styles.detailValue}>{request.date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Status</Text>
                      <Text style={[styles.detailValue, { color: getStatusColor(request.status) }]}>
                        {request.status}
                      </Text>
                    </View>
                  </View>
                </View>

                {request.remarks && (
                  <View style={styles.remarksContainer}>
                    <Text style={styles.remarksLabel}>Remarks</Text>
                    <Text style={[styles.remarksText, request.status === "Rejected" && styles.rejectedText]}>
                      {request.status === "Rejected" && request.reason ? request.reason : request.remarks}
                    </Text>
                  </View>
                )}
              </View>
            ))}

            {filteredRequests.length === 0 && (
              <View style={styles.emptyState}>
                <Icon name="search" size={48} color="#ccc" />
                <Text style={styles.emptyStateTitle}>No requests found</Text>
                <Text style={styles.emptyStateText}>
                  {searchQuery ? "Try adjusting your search terms" : "No weightment requests available"}
                </Text>
              </View>
            )}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'left',
  },
  notificationButton: {
    padding: 8,
    marginRight: 12,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
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


  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    flexWrap: "wrap",
  },
  filterLabel: {
    fontSize: 12,
    color: "#666",
    marginRight: 8,
  },
  filterOptions: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  filterOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  activeFilterOption: {
    backgroundColor: "#E3F2FD",
  },
  filterOptionText: {
    fontSize: 11,
    color: "#666",
  },
  activeFilterOptionText: {
    color: "#4A90E2",
    fontWeight: "500",
  },
  resultsCount: {
    fontSize: 11,
    color: "#999",
    marginLeft: "auto",
  },
  content: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 80, // Space for FAB
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  requestIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  requestId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusIcon: {
    fontSize: 10,
    color: "white",
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
  moreButton: {
    padding: 4,
  },
  moreIcon: {
    fontSize: 16,
    color: "#666",
  },
  orderNumber: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },
  requestDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: "#666",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  remarksContainer: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  remarksLabel: {
    fontSize: 11,
    color: "#666",
    marginBottom: 4,
  },
  remarksText: {
    fontSize: 12,
    color: "#333",
    lineHeight: 16,
  },
  rejectedText: {
    color: "#F44336",
    fontWeight: "500",
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
  fab: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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

  // Tab styles
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#4A90E2",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: "#4A90E2",
    fontWeight: "600",
  },

  // Empty state styles
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },

  // Status cards styles - matching ProformaInvoiceScreen
  statusSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  statusScrollView: {
    flexGrow: 0,
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
  statusCardIcon: {
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
})

export default WeightmentSlipScreen
