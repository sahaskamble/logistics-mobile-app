"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native"
import Icon from "../components/Icon"

interface PriorityMovementScreenProps {
  onNavigate: (screen: string) => void
  onBack: () => void
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

const PriorityMovementScreen = ({ onNavigate, onBack }: PriorityMovementScreenProps) => {
  const [activeTab, setActiveTab] = useState<"Requests" | "Uploads">("Requests")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("All")

  const statsData = [
    { label: "Approved", count: 24, color: "#4CAF50", icon: "✓" },
    { label: "Pending", count: 13, color: "#FF9800", icon: "⏳" },
    { label: "In Progress", count: 8, color: "#2196F3", icon: "🔄" }
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Icon name="arrowright" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Priority Movement</Text>
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

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="search" size={16} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search entries..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Filter Row */}
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Filter by:</Text>
        <View style={styles.filterOptions}>
          {["All", "Approved", "Pending", "In Progress", "Rejected"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.filterOption, filterBy === option && styles.activeFilterOption]}
              onPress={() => setFilterBy(option)}
            >
              <Text style={[styles.filterOptionText, filterBy === option && styles.activeFilterOptionText]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultsCount}>{filteredEntries.length} results</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "Requests" && (
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
        )}

        {activeTab === "Uploads" && (
          <View style={styles.uploadsContainer}>
            <View style={styles.uploadPlaceholder}>
              <Icon name="upload" size={48} color="#ccc" />
              <Text style={styles.uploadPlaceholderText}>Upload documents and files</Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>Choose Files</Text>
              </TouchableOpacity>
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

        <TouchableOpacity style={styles.navItemCenter}>
          <View style={styles.fabInNav}>
            <Icon name="plus" size={24} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, styles.activeNavItem]}
        >
          <Icon name="logistics" size={20} color="#4A90E2" />
          <Text style={[styles.navText, styles.activeNavText]}>Provider</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate("profile")}
        >
          <Icon name="user" size={20} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingTop: 50,
    paddingBottom: 16,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
