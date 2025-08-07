"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from "react-native"
import Icon from "../components/Icon"
import Sidebar from "../components/Sidebar"

interface PriorityMovementScreenProps {
  onNavigate: (screen: string) => void
  onBack: () => void
  onLogout?: () => void
}

interface RequestEntry {
  id: string
  orderNo: string
  jobOrder: string
  container: string
  service: string
  agent: string
  execDate: string
  receipt: string
  status: "Approved" | "Pending" | "In Progress" | "Rejected"
  remarks: string
}

const PriorityMovementScreen = ({ onNavigate, onBack, onLogout = () => {} }: PriorityMovementScreenProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("All")

  // Status cards data - matching ProformaInvoiceScreen design
  const priorityMovementStatuses = [
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

  const requestEntries: RequestEntry[] = [
    {
      id: "#EID3856",
      orderNo: "ORD-2023-7845",
      jobOrder: "JO-9823",
      container: "CONT-XY789",
      service: "Express Delivery",
      agent: "John Smith",
      execDate: "15 Jun 2023",
      receipt: "RCT-4578",
      status: "Approved",
      remarks: "Delivery completed on time, customer satisfied"
    },
    {
      id: "#EID3857",
      orderNo: "ORD-2023-7846",
      jobOrder: "JO-9824",
      container: "CONT-XY790",
      service: "Standard Shipping",
      agent: "Emma Johnson",
      execDate: "17 Jun 2023",
      receipt: "--",
      status: "Pending",
      remarks: "Awaiting customs clearance"
    },
    {
      id: "#EID3858",
      orderNo: "ORD-2023-7847",
      jobOrder: "JO-9825",
      container: "CONT-XY791",
      service: "Priority Shipping",
      agent: "Robert Chen",
      execDate: "18 Jun 2023",
      receipt: "--",
      status: "In Progress",
      remarks: "Currently in transit, ETA within 24 hours"
    },
    {
      id: "#EID3859",
      orderNo: "ORD-2023-7848",
      jobOrder: "JO-9826",
      container: "CONT-XY792",
      service: "Express Delivery",
      agent: "Sarah Wilson",
      execDate: "16 Jun 2023",
      receipt: "--",
      status: "Rejected",
      remarks: "Incorrect documentation provided, resubmission required"
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

  const filteredEntries = requestEntries.filter(entry => {
    const matchesSearch = entry.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.container.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterBy === "All" || entry.status === filterBy
    return matchesSearch && matchesFilter
  })

  const renderStatusCard = (status: any) => (
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
        <Text style={styles.headerTitle}>Priority Movement</Text>
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
          {priorityMovementStatuses.map(renderStatusCard)}
        </ScrollView>
      </View>

      {/* List Header */}
      <View style={styles.listHeader}>
        <View style={styles.listTitleContainer}>
          <Text style={styles.listTitle}>Priority Movement Requests</Text>
        </View>
        <TouchableOpacity style={styles.newRequestButton} onPress={() => onNavigate("create-priority-movement")}>
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
            placeholder="Search priority movements..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.requestsList}>
          {filteredEntries.map((entry, index) => (
              <View key={index} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <View style={styles.requestIdContainer}>
                    <Text style={styles.requestId}>Entry ID: </Text>
                    <Text style={styles.requestIdValue}>{entry.id}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(entry.status) }]}>
                    <Text style={styles.statusText}>{entry.status}</Text>
                  </View>
                  <TouchableOpacity style={styles.moreButton}>
                    <Text style={styles.moreIcon}>⋮</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.orderNumber}>Order No: {entry.orderNo}</Text>

                <View style={styles.requestDetails}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Job Order:</Text>
                      <Text style={styles.detailValue}>{entry.jobOrder}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Container:</Text>
                      <Text style={styles.detailValue}>{entry.container}</Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Service:</Text>
                      <Text style={styles.detailValue}>{entry.service}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Agent:</Text>
                      <Text style={styles.detailValue}>{entry.agent}</Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Exec. Date:</Text>
                      <Text style={styles.detailValue}>{entry.execDate}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Receipt:</Text>
                      <Text style={styles.detailValue}>{entry.receipt}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.remarksContainer}>
                  <Text style={styles.remarksLabel}>Remarks:</Text>
                  <Text style={styles.remarksText}>{entry.remarks}</Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("home")}>
          <Icon name="home" size={20} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("dashboard")}>
          <Icon name="dashboard" size={20} color="#666" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemCenter} onPress={() => onNavigate("create-order")}>
          <View style={styles.fabInNav}>
            <Icon name="plus" size={24} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("providers")}>
          <Icon name="logistics" size={20} color="#666" />
          <Text style={styles.navText}>Provider</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("profile")}>
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
  // Status Cards Section - Matching ProformaInvoiceScreen exactly
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
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBox: {
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
    paddingBottom: 8,
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
    marginBottom: 8,
  },
  requestIdContainer: {
    flexDirection: "row",
    flex: 1,
  },
  requestId: {
    fontSize: 14,
    color: "#666",
  },
  requestIdValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
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
  uploadPlaceholderText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
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
  activeNavItem: {
    // No additional styling needed for container
  },
  activeNavText: {
    color: "#4A90E2",
    fontWeight: "600",
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

export default PriorityMovementScreen
