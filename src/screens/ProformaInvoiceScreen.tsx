import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  FlatList,
  RefreshControl,
  Dimensions,
} from 'react-native'
import Icon from '../components/Icon'
import Sidebar from '../components/Sidebar'

const { width: screenWidth } = Dimensions.get('window')
const isTablet = screenWidth >= 768

interface ProformaInvoiceScreenProps {
  onBack: () => void
  onNavigate?: (screen: string) => void
  onLogout?: () => void
}

interface ProformaStatus {
  id: string
  title: string
  count: number
  color: string
  backgroundColor: string
  icon: string
}

interface ProformaRequest {
  id: string
  requestId: string
  date: string
  createdBy: string
  orderId: string
  customerRemarks: string
  reason: string
  serviceType: string
  status: string
}

const ProformaInvoiceScreen: React.FC<ProformaInvoiceScreenProps> = ({
  onBack,
  onNavigate = () => {},
  onLogout = () => {},
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('requests')

  // Status cards data
  const proformaStatuses: ProformaStatus[] = [
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
      count: 4,
      color: '#FF9800',
      backgroundColor: '#FFF3E0',
      icon: 'clock',
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      count: 0,
      color: '#2196F3',
      backgroundColor: '#E3F2FD',
      icon: 'refresh',
    },
    {
      id: 'rejected',
      title: 'Rejected',
      count: 0,
      color: '#F44336',
      backgroundColor: '#FFEBEE',
      icon: 'close',
    },
  ]

  // Sample proforma requests data
  const proformaRequests: ProformaRequest[] = [
    {
      id: '1',
      requestId: 'REQ-89934050346',
      date: 'Jul 17, 2025',
      createdBy: 'customer007',
      orderId: 'ORD-50020120311',
      customerRemarks: '',
      reason: '',
      serviceType: 'Proforma Invoice',
      status: 'Pending',
    },
    {
      id: '2',
      requestId: 'REQ-37524864637',
      date: 'Jul 17, 2025',
      createdBy: 'customer007',
      orderId: 'ORD-50020120311',
      customerRemarks: '',
      reason: '',
      serviceType: 'Proforma Invoice',
      status: 'Accepted',
    },
    {
      id: '3',
      requestId: 'REQ-84300205614',
      date: 'Jul 17, 2025',
      createdBy: 'customer007',
      orderId: 'ORD-50020120311',
      customerRemarks: '',
      reason: '',
      serviceType: 'Proforma Invoice',
      status: 'Accepted',
    },
    {
      id: '4',
      requestId: 'REQ-49934651001',
      date: 'Jul 17, 2025',
      createdBy: 'customer007',
      orderId: 'ORD-50020120311',
      customerRemarks: '',
      reason: '',
      serviceType: 'Proforma Invoice',
      status: 'Pending',
    },
    {
      id: '5',
      requestId: 'REQ-39544634437',
      date: 'Jul 17, 2025',
      createdBy: 'customer007',
      orderId: 'ORD-50020120311',
      customerRemarks: '',
      reason: '',
      serviceType: 'Proforma Invoice',
      status: 'Pending',
    },
    {
      id: '6',
      requestId: 'REQ-15452948547',
      date: 'Jul 22, 2025',
      createdBy: 'customer007',
      orderId: 'ORD-50020120311',
      customerRemarks: '',
      reason: '',
      serviceType: 'Proforma Invoice',
      status: 'Pending',
    },
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

  const filteredRequests = proformaRequests.filter(request => {
    if (!searchQuery) return true
    
    const searchLower = searchQuery.toLowerCase()
    return (
      request.requestId.toLowerCase().includes(searchLower) ||
      request.orderId.toLowerCase().includes(searchLower) ||
      request.createdBy.toLowerCase().includes(searchLower) ||
      request.status.toLowerCase().includes(searchLower)
    )
  })

  const renderStatusCard = (status: ProformaStatus) => (
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

  const renderProformaRequestItem = ({ item }: { item: ProformaRequest }) => {
    if (isTablet) {
      // Desktop/Tablet view - table format
      return (
        <View style={styles.requestRow}>
          <Text style={styles.requestId}>{item.requestId}</Text>
          <Text style={styles.requestDate}>{item.date}</Text>
          <Text style={styles.requestCreatedBy}>{item.createdBy}</Text>
          <Text style={styles.requestOrderId}>{item.orderId}</Text>
          <Text style={styles.requestRemarks}>{item.customerRemarks || '—'}</Text>
          <Text style={styles.requestReason}>{item.reason || '—'}</Text>
          <Text style={styles.requestServiceType}>{item.serviceType}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusBackgroundColor(item.status) }
          ]}>
            <Text style={[styles.statusBadgeText, { color: getStatusColor(item.status) }]}>
              {item.status}
            </Text>
          </View>
          <TouchableOpacity style={styles.actionsButton}>
            <Icon name="more" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      )
    } else {
      // Mobile view - card format
      return (
        <View style={styles.mobileRequestCard}>
          <View style={styles.mobileRequestHeader}>
            <Text style={styles.mobileRequestId}>{item.requestId}</Text>
            <View style={[
              styles.mobileStatusBadge,
              { backgroundColor: getStatusBackgroundColor(item.status) }
            ]}>
              <Text style={[styles.mobileStatusText, { color: getStatusColor(item.status) }]}>
                {item.status}
              </Text>
            </View>
          </View>

          <View style={styles.mobileRequestDetails}>
            <View style={styles.mobileDetailRow}>
              <Text style={styles.mobileDetailLabel}>Date:</Text>
              <Text style={styles.mobileDetailValue}>{item.date}</Text>
            </View>
            <View style={styles.mobileDetailRow}>
              <Text style={styles.mobileDetailLabel}>Order ID:</Text>
              <Text style={styles.mobileDetailValue}>{item.orderId}</Text>
            </View>
            <View style={styles.mobileDetailRow}>
              <Text style={styles.mobileDetailLabel}>Created By:</Text>
              <Text style={styles.mobileDetailValue}>{item.createdBy}</Text>
            </View>
            <View style={styles.mobileDetailRow}>
              <Text style={styles.mobileDetailLabel}>Service:</Text>
              <Text style={styles.mobileDetailValue}>{item.serviceType}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.mobileActionsButton}>
            <Icon name="more" size={20} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      
      {/* Header - Same as MyOrdersScreen */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Proforma Invoice</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.profileButton}>
          <Icon name="user" size={24} color="white" />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4A90E2']}
            tintColor="#4A90E2"
          />
        }
      >

        {/* Status Cards */}
        <View style={styles.statusSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusScrollView}>
            {proformaStatuses.map(renderStatusCard)}
          </ScrollView>
        </View>

        {/* List Header */}
        <View style={styles.listHeader}>
          <View style={styles.listTitleContainer}>
            <Text style={styles.listTitle}>Requests List</Text>
          </View>
          <TouchableOpacity style={styles.newRequestButton} onPress={() => onNavigate("create-proforma-request")}>
            <Icon name="plus" size={16} color="white" />
            <Text style={styles.newRequestText}>New Request</Text>
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          {isTablet ? (
            <View style={styles.searchInputContainer}>
              <TouchableOpacity style={styles.columnsButton}>
                <Text style={styles.columnsText}>Columns</Text>
                <Icon name="chevrondown" size={16} color="#666" />
              </TouchableOpacity>
              <View style={styles.searchWrapper}>
                <Icon name="search" size={18} color="#666" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Filter by request id..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#999"
                />
              </View>
              <TouchableOpacity style={styles.requestIdButton}>
                <Text style={styles.requestIdText}>Request ID</Text>
                <Icon name="chevrondown" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.mobileSearchContainer}>
              <View style={styles.searchWrapper}>
                <Icon name="search" size={18} color="#666" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#999"
                />
              </View>
              <TouchableOpacity style={styles.mobileFilterButton}>
                <Icon name="filter" size={20} color="#4A90E2" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Table Header - Only show on tablet/desktop */}
        {isTablet && (
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Request ID</Text>
            <Text style={styles.tableHeaderText}>Date</Text>
            <Text style={styles.tableHeaderText}>Created By</Text>
            <Text style={styles.tableHeaderText}>Order ID</Text>
            <Text style={styles.tableHeaderText}>Customer Remarks</Text>
            <Text style={styles.tableHeaderText}>Reason</Text>
            <Text style={styles.tableHeaderText}>Service Type</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
            <Text style={styles.tableHeaderText}>Actions</Text>
          </View>
        )}

        {/* Proforma Requests List */}
        <FlatList
          data={filteredRequests}
          keyExtractor={(item) => item.id}
          renderItem={renderProformaRequestItem}
          style={styles.requestsList}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onBack}>
          <Icon name="home" size={24} color="#999" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("dashboard")}>
          <Icon name="grid" size={24} color="#999" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => onNavigate("create-proforma-request")}>
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
        onClose={() => setSidebarVisible(false)}
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
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  notificationButton: {
    marginRight: 15,
    padding: 5,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  statusSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  statusScrollView: {
    flexDirection: 'row',
  },
  statusCard: {
    width: isTablet ? 140 : 110,
    padding: isTablet ? 20 : 14,
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
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  columnsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  columnsText: {
    fontSize: 14,
    color: '#666',
    marginRight: 6,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
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
  requestIdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  requestIdText: {
    fontSize: 14,
    color: '#666',
    marginRight: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  requestsList: {
    backgroundColor: 'white',
  },
  requestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  requestId: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  requestDate: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  requestCreatedBy: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  requestOrderId: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  requestRemarks: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  requestReason: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  requestServiceType: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statusBadge: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  actionsButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  paginationButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  paginationText: {
    fontSize: 14,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  // Mobile-specific styles
  mobileRequestCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  mobileRequestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mobileRequestId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  mobileStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mobileStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  mobileRequestDetails: {
    marginBottom: 12,
  },
  mobileDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  mobileDetailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  mobileDetailValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  mobileActionsButton: {
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  mobileSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mobileFilterButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
})

export default ProformaInvoiceScreen
