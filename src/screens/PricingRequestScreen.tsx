
import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Modal,
  FlatList,
  RefreshControl,
  Image,
  Animated,
} from 'react-native'
import Icon from '../components/Icon'
import Sidebar from '../components/Sidebar'

interface PricingRequestScreenProps {
  onBack: () => void
  onNavigate?: (screen: string) => void
  onLogout?: () => void
}

interface PricingRequestStatus {
  id: string
  title: string
  count: number
  color: string
  backgroundColor: string
  icon: string
}

interface PricingRequest {
  id: string
  customerName: string
  cfsProvider: string
  preferableRate: string
  containerType: string
  dpdType: string
  containersPerMonth: number
  status: 'Accepted' | 'Pending' | 'In Progress' | 'Rejected'
  date: string
  time: string
  reason?: string
}

const PricingRequestScreen: React.FC<PricingRequestScreenProps> = ({
  onBack,
  onNavigate = () => {},
  onLogout = () => {},
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('All Columns')

  // Animation values
  const contentOpacity = useRef(new Animated.Value(1)).current
  const contentScale = useRef(new Animated.Value(1)).current
  const overlayOpacity = useRef(new Animated.Value(0)).current

  // Animate content when sidebar opens/closes
  useEffect(() => {
    if (sidebarVisible) {
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 0.4,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contentScale, {
          toValue: 0.95,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(contentScale, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [sidebarVisible, contentOpacity, contentScale, overlayOpacity])

  // Close filter modal when sidebar opens
  const handleSidebarOpen = () => {
    setShowFilterModal(false)
    setSidebarVisible(true)
  }

  // Close sidebar and re-enable interactions
  const handleSidebarClose = () => {
    setSidebarVisible(false)
  }

  // Status cards - same as MyOrdersScreen
  const pricingRequestStatuses: PricingRequestStatus[] = [
    {
      id: 'approved',
      title: 'Approved',
      count: 2,
      color: '#4CAF50',
      backgroundColor: '#E8F5E8',
      icon: 'check',
    },
    {
      id: 'pending',
      title: 'Pending',
      count: 1,
      color: '#FF9800',
      backgroundColor: '#FFF3E0',
      icon: 'clock',
    },
    {
      id: 'progress',
      title: 'In Progress',
      count: 1,
      color: '#2196F3',
      backgroundColor: '#E3F2FD',
      icon: 'refresh',
    },
    {
      id: 'rejected',
      title: 'Rejected',
      count: 1,
      color: '#F44336',
      backgroundColor: '#FFEBEE',
      icon: 'close',
    },
  ]

  // Sample pricing request data
  const [pricingRequests] = useState<PricingRequest[]>([
    {
      id: '1',
      customerName: 'customer007',
      cfsProvider: 'Mumbai CFS Terminal',
      preferableRate: 'Rs. 5,000',
      containerType: 'ODC/FR/OT',
      dpdType: 'DPD',
      containersPerMonth: 30,
      status: 'Accepted',
      date: 'Aug 4, 2025',
      time: '9:48 AM',
    },
    {
      id: '2',
      customerName: 'shipper123',
      cfsProvider: 'Chennai Port Authority',
      preferableRate: 'Rs. 4,500',
      containerType: '20ft Standard',
      dpdType: 'Non-DPD',
      containersPerMonth: 15,
      status: 'Pending',
      date: 'Aug 3, 2025',
      time: '2:30 PM',
    },
    {
      id: '3',
      customerName: 'logisticspro',
      cfsProvider: 'Delhi ICD',
      preferableRate: 'Rs. 6,200',
      containerType: '40ft High Cube',
      dpdType: 'DPD',
      containersPerMonth: 8,
      status: 'Rejected',
      date: 'Aug 2, 2025',
      time: '11:15 AM',
      reason: 'Rate too high for the current market conditions',
    },
    {
      id: '4',
      customerName: 'exporterABC',
      cfsProvider: 'Kolkata Port Trust',
      preferableRate: 'Rs. 5,500',
      containerType: '20ft Standard',
      dpdType: 'DPD',
      containersPerMonth: 25,
      status: 'In Progress',
      date: 'Aug 4, 2025',
      time: '1:20 PM',
    },
    {
      id: '5',
      customerName: 'tradelink99',
      cfsProvider: 'JNPT Terminal',
      preferableRate: 'Rs. 4,800',
      containerType: '40ft Standard',
      dpdType: 'Non-DPD',
      containersPerMonth: 20,
      status: 'Accepted',
      date: 'Aug 1, 2025',
      time: '10:30 AM',
    },
  ])

  const filterOptions = [
    'All Columns',
    'Customer Name',
    'CFS Provider',
    'Container Type',
    'Status',
    'Date',
  ]

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return '#4CAF50'
      case 'pending':
        return '#FF9800'
      case 'in progress':
        return '#2196F3'
      case 'rejected':
        return '#F44336'
      default:
        return '#999'
    }
  }

  const getStatusBackgroundColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return '#E8F5E8'
      case 'pending':
        return '#FFF3E0'
      case 'in progress':
        return '#E3F2FD'
      case 'rejected':
        return '#FFEBEE'
      default:
        return '#F5F5F5'
    }
  }

  // Update counts based on actual data
  const approvedCount = pricingRequests.filter(req => req.status === 'Accepted').length
  const pendingCount = pricingRequests.filter(req => req.status === 'Pending').length
  const inProgressCount = pricingRequests.filter(req => req.status === 'In Progress').length
  const rejectedCount = pricingRequests.filter(req => req.status === 'Rejected').length

  // Update status counts
  pricingRequestStatuses[0].count = approvedCount
  pricingRequestStatuses[1].count = pendingCount
  pricingRequestStatuses[2].count = inProgressCount
  pricingRequestStatuses[3].count = rejectedCount

  const filteredRequests = pricingRequests.filter(request => {
    if (!searchQuery) return true
    
    const searchLower = searchQuery.toLowerCase()
    return (
      request.customerName.toLowerCase().includes(searchLower) ||
      request.cfsProvider.toLowerCase().includes(searchLower) ||
      request.containerType.toLowerCase().includes(searchLower) ||
      request.status.toLowerCase().includes(searchLower)
    )
  })

  const renderStatusCard = (status: PricingRequestStatus) => (
    <TouchableOpacity
      key={status.id}
      style={[styles.statusCard, { backgroundColor: status.backgroundColor }]}
      activeOpacity={0.7}
    >
      <View style={[styles.statusIcon, { backgroundColor: status.color }]}>
        <Icon name={status.icon} size={20} color="white" />
      </View>
      <Text style={[styles.statusTitle, { color: status.color }]}>{status.title}</Text>
      <Text style={styles.statusCount}>{status.count}</Text>
    </TouchableOpacity>
  )

  const renderPricingRequestItem = ({ item }: { item: PricingRequest }) => (
    <View style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View style={styles.customerInfo}>
          <View style={styles.customerIconContainer}>
            <Icon name="user" size={14} color="#4A90E2" />
          </View>
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <View style={styles.requestHeaderRight}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusBadgeText}>{item.status}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Icon name="more" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.providerInfo}>
        <View style={styles.providerIconContainer}>
          <Icon name="cfs" size={14} color="#4A90E2" />
        </View>
        <Text style={styles.providerText}>{item.cfsProvider}</Text>
      </View>

      <View style={styles.requestDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Preferable Rate</Text>
            <Text style={styles.detailValue}>{item.preferableRate}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>DPD / Non-DPD</Text>
            <Text style={styles.detailValue}>{item.dpdType}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Container Type</Text>
            <Text style={styles.detailValue}>{item.containerType}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Containers Per Month</Text>
            <Text style={styles.detailValue}>{item.containersPerMonth}</Text>
          </View>
        </View>

        {item.reason && (
          <View style={styles.reasonContainer}>
            <View style={styles.reasonHeader}>
              <Icon name="info" size={14} color="#E65100" />
              <Text style={styles.reasonLabel}>Reason</Text>
            </View>
            <Text style={styles.reasonText}>{item.reason}</Text>
          </View>
        )}
      </View>

      <View style={styles.requestFooter}>
        <View style={styles.dateTimeContainer}>
          <Icon name="calendar" size={12} color="#999" />
          <Text style={styles.dateTime}>{item.date}</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <Icon name="clock" size={12} color="#999" />
          <Text style={styles.dateTime}>{item.time}</Text>
        </View>
      </View>
    </View>
  )

  const renderFilterModal = () => (
    <Modal
      visible={showFilterModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        />
        <View style={styles.filterModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filterOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  selectedFilter === item && styles.filterOptionSelected
                ]}
                onPress={() => {
                  setSelectedFilter(item)
                  setShowFilterModal(false)
                }}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedFilter === item && styles.filterOptionTextSelected
                ]}>
                  {item}
                </Text>
                {selectedFilter === item && (
                  <Icon name="check" size={16} color="#4A90E2" />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      {/* Content Container with Animated Blur Effect */}
      <Animated.View
        style={[
          styles.contentWrapper,
          {
            opacity: contentOpacity,
            transform: [{ scale: contentScale }],
            pointerEvents: sidebarVisible ? 'none' : 'auto'
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSidebarOpen} style={styles.menuButton}>
            <Icon name="menu" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pricing Request</Text>
          <TouchableOpacity
            style={styles.notificationButton}
            disabled={sidebarVisible}
          >
            <Icon name="notifications" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.profileButton}>
            <Icon name="user" size={24} color="white" />
          </View>
        </View>

        {/* Main Content Container */}
        <View style={styles.mainContent}>
          {/* Status Cards - Same as MyOrdersScreen */}
          <View style={styles.statusSection}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.statusScrollView}
              scrollEnabled={!sidebarVisible}
            >
              {pricingRequestStatuses.map(renderStatusCard)}
            </ScrollView>
          </View>

          {/* Search and Filter Section */}
          <View style={styles.searchAndFilterSection}>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Icon name="search" size={18} color="#666" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by customer name, CFS provider..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#999"
                  editable={!sidebarVisible}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setSearchQuery('')}
                    style={styles.clearButton}
                    disabled={sidebarVisible}
                  >
                    <Icon name="close" size={16} color="#999" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={styles.filterDropdown}
                onPress={() => !sidebarVisible && setShowFilterModal(true)}
                disabled={sidebarVisible}
              >
                <Text style={styles.filterDropdownText}>{selectedFilter}</Text>
                <Icon name="chevrondown" size={14} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, sidebarVisible && styles.filterButtonDisabled]}
                disabled={sidebarVisible}
              >
                <Icon name="building" size={16} color="white" />
                <Text style={styles.filterButtonText}>Provider</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Pricing Requests List */}
          <FlatList
            data={filteredRequests}
            keyExtractor={(item) => item.id}
            renderItem={renderPricingRequestItem}
            style={styles.requestsList}
            showsVerticalScrollIndicator={false}
            scrollEnabled={!sidebarVisible}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#4A90E2']}
                tintColor="#4A90E2"
                enabled={!sidebarVisible}
              />
            }
            contentContainerStyle={styles.requestsListContent}
          />
        </View>
      </Animated.View>

      {/* Animated Sidebar Overlay - Only visible when sidebar is open */}
      <Animated.View
        style={[
          styles.sidebarOverlay,
          {
            opacity: overlayOpacity,
            pointerEvents: sidebarVisible ? 'auto' : 'none'
          }
        ]}
      />

      {/* Bottom Navigation - Hidden when sidebar is open */}
      {!sidebarVisible && (
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={onBack}>
            <Icon name="home" size={24} color="#999" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("dashboard")}>
            <Icon name="grid" size={24} color="#999" />
            <Text style={styles.navText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={() => onNavigate("create-pricing-request")}>
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
      )}

      {/* Modals */}
      {renderFilterModal()}

      {/* Sidebar */}
      <Sidebar
        isVisible={sidebarVisible}
        onClose={handleSidebarClose}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
  },
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 999, // Just below sidebar but above content
  },
  mainContent: {
    flex: 1,
  },
  statusSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 8,
  },
  statusScrollView: {
    flexDirection: 'row',
  },
  statusCard: {
    width: 120,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  searchAndFilterSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    marginRight: 8,
  },
  clearButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterDropdownText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
    elevation: 2,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  filterButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  requestsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  requestsListContent: {
    paddingBottom: 100,
    paddingTop: 8,
  },
  requestCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  customerIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  requestHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  moreButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  providerIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  providerText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  requestDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
  },
  reasonContainer: {
    marginTop: 12,
    padding: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  reasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reasonLabel: {
    fontSize: 12,
    color: '#E65100',
    fontWeight: '600',
    marginLeft: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  reasonText: {
    fontSize: 14,
    color: '#E65100',
    lineHeight: 20,
    fontWeight: '500',
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateTime: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#4A90E2',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 2000, // Higher than sidebar
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  filterModalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '60%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 2001,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterOptionSelected: {
    backgroundColor: '#F0F7FF',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#333',
  },
  filterOptionTextSelected: {
    color: '#4A90E2',
    fontWeight: '600',
  },
})

export default PricingRequestScreen
