"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import Icon from "../components/Icon"
import Sidebar from "../components/Sidebar"

interface DashboardScreenProps {
  onNavigate: (screen: string) => void
  onLogout?: () => void
}

const { width } = Dimensions.get('window')

const DashboardScreen = ({ onNavigate, onLogout }: DashboardScreenProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [showDropdown, setShowDropdown] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(false)

  const statsData = [
    {
      title: "Total Orders",
      value: "112",
      color: "#4A90E2",
      progress: 0.75,
      icon: "📦"
    },
    {
      title: "In Progress",
      value: "28",
      color: "#FF9800",
      progress: 0.45,
      icon: "⏳"
    },
    {
      title: "Approved",
      value: "76",
      color: "#4CAF50",
      progress: 0.85,
      icon: "✅"
    },
    {
      title: "Rejected",
      value: "8",
      color: "#F44336",
      progress: 0.15,
      icon: "❌"
    }
  ]

  const orderTrendsData = {
    week: [
      { label: "Mon", value: 12 },
      { label: "Tue", value: 19 },
      { label: "Wed", value: 15 },
      { label: "Thu", value: 25 },
      { label: "Fri", value: 22 },
      { label: "Sat", value: 18 },
      { label: "Sun", value: 8 }
    ],
    month: [
      { label: "Jan", value: 65 },
      { label: "Feb", value: 45 },
      { label: "Mar", value: 70 },
      { label: "Apr", value: 55 },
      { label: "May", value: 40 },
      { label: "Jun", value: 85 }
    ],
    year: [
      { label: "2019", value: 420 },
      { label: "2020", value: 380 },
      { label: "2021", value: 520 },
      { label: "2022", value: 680 },
      { label: "2023", value: 750 }
    ]
  }

  const currentData = orderTrendsData[selectedPeriod as keyof typeof orderTrendsData]

  const periodOptions = [
    { label: "Week", value: "week" },
    { label: "month", value: "month" },
    { label: "Year", value: "year" } 
  ]

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible)
  }

  const handleSidebarClose = () => {
    setSidebarVisible(false)
  }

  const handleSidebarNavigate = (screen: string) => {
    onNavigate(screen)
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  const latestRequests = [
    {
      id: "#REQ-8721",
      service: "Priority Movement",
      status: "Approved",
      statusColor: "#4CAF50"
    },
    {
      id: "#REQ-8720",
      service: "CFS Service",
      status: "In Progress",
      statusColor: "#FF9800"
    },
    {
      id: "#REQ-8719",
      service: "Container Handling",
      status: "Rejected",
      statusColor: "#F44336"
    }
  ]

  const orderList = [
    {
      id: "#ORD-3545",
      customer: "Acme Corp",
      service: "Priority Movement",
      container: "MSCU7893255",
      cfs: "Mumbai",
      date: "Jun 15, 2023",
      status: "Approved",
      statusColor: "#4CAF50"
    },
    {
      id: "#ORD-3544",
      customer: "GlobalTrade",
      service: "CFS",
      container: "TCNU4568971",
      cfs: "Chennai",
      date: "Jun 14, 2023",
      status: "In Progress",
      statusColor: "#FF9800"
    },
    {
      id: "#ORD-3543",
      customer: "ShipFast Ltd",
      service: "Container",
      container: "TCNU4568",
      cfs: "Delhi",
      date: "Jun 13, 2023",
      status: "Rejected",
      statusColor: "#F44336"
    }
  ]

  const renderChart = () => {
    const maxValue = Math.max(...currentData.map(item => item.value))
    const chartHeight = 120

    return (
      <View style={styles.chartContainer}>
        <View style={styles.simpleLineChart}>
          {/* Chart background */}
          <View style={styles.chartBackground}>
            {/* Grid lines */}
            {[0.25, 0.5, 0.75, 1].map((ratio, index) => (
              <View
                key={index}
                style={[
                  styles.gridLine,
                  { bottom: ratio * chartHeight }
                ]}
              />
            ))}
          </View>

          {/* Data points and lines */}
          <View style={styles.dataContainer}>
            {currentData.map((item, index) => {
              const pointHeight = (item.value / maxValue) * chartHeight
              const leftPosition = (index / (currentData.length - 1)) * 100

              return (
                <View key={item.label} style={styles.dataPointContainer}>
                  {/* Data point */}
                  <View
                    style={[
                      styles.dataPoint,
                      {
                        bottom: pointHeight,
                        left: `${leftPosition}%`
                      }
                    ]}
                  />

                  {/* Value label */}
                  <Text
                    style={[
                      styles.dataValue,
                      {
                        bottom: pointHeight + 15,
                        left: `${leftPosition}%`
                      }
                    ]}
                  >
                    {item.value}
                  </Text>
                </View>
              )
            })}
          </View>

          {/* X-axis labels */}
          <View style={styles.xAxisLabels}>
            {currentData.map((item) => (
              <Text key={item.label} style={styles.xAxisLabel}>
                {item.label}
              </Text>
            ))}
          </View>
        </View>
      </View>
    )
  }

  const renderServiceUsageChart = () => {
    const services = [
      { name: "Transportation", percentage: 35, color: "#4A90E2" },
      { name: "Warehouse", percentage: 25, color: "#FF9800" },
      { name: "CFS Services", percentage: 25, color: "#4CAF50" },
      { name: "3PL Services", percentage: 15, color: "#9C27B0" }
    ]

    return (
      <View style={styles.pieChartContainer}>
        <View style={styles.pieChart}>
          <View style={styles.pieChartInner}>
            <Text style={styles.pieChartText}>Service{'\n'}Usage</Text>
          </View>
        </View>
        <View style={styles.pieChartLegend}>
          {services.map((service, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: service.color }]} />
              <Text style={styles.legendText}>{service.name}</Text>
              <Text style={styles.legendPercentage}>{service.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleSidebarToggle}>
            <Icon name="menu" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.notificationButton}>
              <Icon name="bell" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.profileImage}>
              <Icon name="user" size={20} color="white" />
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {statsData.map((stat, index) => (
            <TouchableOpacity key={index} style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <Text style={styles.statIcon}>{stat.icon}</Text>
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${stat.progress * 100}%`, backgroundColor: stat.color }
                  ]} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Trends Chart */}
        <View style={styles.chartCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Order Trends</Text>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowDropdown(!showDropdown)}
              >
                <Text style={styles.dropdownText}>
                  {periodOptions.find(option => option.value === selectedPeriod)?.label}
                </Text>
                <Icon name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>

              {showDropdown && (
                <View style={styles.dropdownMenu}>
                  {periodOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.dropdownItem,
                        selectedPeriod === option.value && styles.dropdownItemActive
                      ]}
                      onPress={() => {
                        setSelectedPeriod(option.value)
                        setShowDropdown(false)
                      }}
                    >
                      <Text style={[
                        styles.dropdownItemText,
                        selectedPeriod === option.value && styles.dropdownItemTextActive
                      ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
          {renderChart()}
        </View>

        {/* Service Usage */}
        <View style={styles.chartCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Service Usage</Text>
            <Text style={styles.cardSubtitle}>Distribution</Text>
          </View>
          {renderServiceUsageChart()}
        </View>

        {/* Latest Requests */}
        <View style={styles.listCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Latest Requests</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {latestRequests.map((request, index) => (
            <TouchableOpacity key={index} style={styles.requestItem}>
              <View style={styles.requestInfo}>
                <Text style={styles.requestId}>{request.id}</Text>
                <Text style={styles.requestService}>{request.service}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: request.statusColor }]}>
                <Text style={styles.statusText}>{request.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Order List */}
        <View style={styles.listCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Order List</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {orderList.map((order, index) => (
            <TouchableOpacity key={index} style={styles.orderItem}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{order.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: order.statusColor }]}>
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>
              <Text style={styles.orderCustomer}>Customer: {order.customer}</Text>
              <Text style={styles.orderDetails}>Service: {order.service}</Text>
              <Text style={styles.orderDetails}>Container: {order.container}</Text>
              <Text style={styles.orderDetails}>CFS: {order.cfs}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
              <View style={styles.orderActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>📋</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>✏️</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("home")}>
          <Icon name="home" size={24} color="#999" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Icon name="grid" size={24} color="#4A90E2" />
          <Text style={[styles.navText, styles.activeNavText]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => onNavigate("create-order")}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("providers")}>
          <Icon name="truck" size={24} color="#999" />
          <Text style={styles.navText}>Provider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("profile")}>
          <Icon name="user" size={24} color="#999" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

        {/* Sidebar */}
      <Sidebar
        isVisible={sidebarVisible}
        onClose={handleSidebarClose}
        onNavigate={handleSidebarNavigate}
        onLogout={handleLogout}
      />
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
    paddingTop: 15,
    paddingBottom: 20,
    shadowColor: "#4A90E2",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,  
    minHeight: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    flex: 1,
    textAlign: "center",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
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
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    paddingTop: 20,
    justifyContent: "space-between",
  },
  statCard: {
    width: (width - 45) / 2,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(74, 144, 226, 0.1)",
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  statTitle: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  statIcon: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  chartCard: {
    backgroundColor: "white",
    borderRadius: 16,
    margin: 15,
    padding: 24,
    shadowColor: "#4A90E2",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(74, 144, 226, 0.08)",
  },
  listCard: {
    backgroundColor: "white",
    borderRadius: 16,
    margin: 15,
    padding: 24,
    shadowColor: "#4A90E2",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(74, 144, 226, 0.08)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  viewAllText: {
    fontSize: 12,
    color: "#4A90E2",
    fontWeight: "500",
  },
  chartContainer: {
    height: 180,
    marginTop: 10,
  },
  simpleLineChart: {
    position: "relative",
    height: 150,
    marginHorizontal: 10,
    paddingBottom: 30,
  },
  chartBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  gridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  dataContainer: {
    position: "relative",
    height: 120,
  },
  dataPointContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  dataPoint: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4A90E2",
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#4A90E2",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 2,
    marginLeft: -4,
  },
  dataValue: {
    position: "absolute",
    fontSize: 10,
    color: "#4A90E2",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: -10,
    width: 20,
  },
  xAxisLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginTop: 10,
  },
  xAxisLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  chartArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: "100%",
    paddingBottom: 30,
  },
  chartBar: {
    alignItems: "center",
    flex: 1,
  },
  chartPoint: {
    alignItems: "center",
    marginBottom: 10,
  },
  chartDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 5,
  },
  chartLine: {
    width: 30,
    height: 2,
    backgroundColor: "#E0E0E0",
  },
  chartValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  chartMonth: {
    fontSize: 10,
    color: "#666",
  },
  pieChartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pieChart: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    shadowColor: "#4A90E2",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  pieChartInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  pieChartText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  pieChartLegend: {
    flex: 1,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: "#333",
    flex: 1,
  },
  legendPercentage: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
  },
  requestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  requestInfo: {
    flex: 1,
  },
  requestId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  requestService: {
    fontSize: 12,
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  statusText: {
    fontSize: 11,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  orderItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  orderCustomer: {
    fontSize: 12,
    color: "#333",
    marginBottom: 4,
  },
  orderDetails: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    marginBottom: 8,
  },
  orderActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    marginLeft: 10,
    padding: 5,
  },
  actionButtonText: {
    fontSize: 16,
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
  dropdownContainer: {
    position: "relative",
    zIndex: 1000,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    minWidth: 80,
  },
  dropdownText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
    marginRight: 6,
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1001,
    minWidth: 100,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dropdownItemActive: {
    backgroundColor: "#F0F8FF",
  },
  dropdownItemText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  dropdownItemTextActive: {
    color: "#4A90E2",
    fontWeight: "600",
  },
})

export default DashboardScreen
