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
} from 'react-native'
import Icon from '../components/Icon'
import Sidebar from '../components/Sidebar'

interface EIRCopyRequestScreenProps {
  onBack: () => void
  onNavigate?: (screen: string) => void
  onLogout?: () => void
}

interface EIRStatus {
  id: string
  title: string
  count: number
  color: string
  backgroundColor: string
  icon: string
}

interface EIRRequest {
  id: string
  requestNumber: string
  date: string
  time: string
  createdBy: string
  orderId: string
  remarks: string
  reason: string
  serviceType: string
  uploadedFiles: string
  status: string
}

const EIRCopyRequestScreen: React.FC<EIRCopyRequestScreenProps> = ({
  onBack,
  onNavigate = () => {},
  onLogout = () => {},
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Status cards data
  const eirStatuses: EIRStatus[] = [
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
      count: 3,
      color: '#F44336',
      backgroundColor: '#FFEBEE',
      icon: 'close',
    },
  ]

  // Sample EIR requests data
  const eirRequests: EIRRequest[] = [
    {
      id: '1',
      requestNumber: 'REQ-52529864385',
      date: 'Aug 5, 2025',
      time: '2:52 PM',
      createdBy: 'customer007',
      orderId: 'ORD-89227693822',
      remarks: 'Need Copy',
      reason: '—',
      serviceType: 'EIR Copy',
      uploadedFiles: 'No files uploaded',
      status: 'In Progress',
    },
    {
      id: '2',
      requestNumber: 'REQ-63819275364',
      date: 'Aug 4, 2025',
      time: '10:15 AM',
      createdBy: 'customer012',
      orderId: 'ORD-73619485203',
      remarks: 'Urgent request',
      reason: 'Documentation',
      serviceType: 'EIR Copy',
      uploadedFiles: '2 files uploaded',
      status: 'Approved',
    },
    {
      id: '3',
      requestNumber: 'REQ-41829374651',
      date: 'Aug 3, 2025',
      time: '3:45 PM',
      createdBy: 'customer015',
      orderId: 'ORD-84729163058',
      remarks: 'Document verification failed',
      reason: 'Invalid documents',
      serviceType: 'EIR Copy',
      uploadedFiles: '1 file uploaded',
      status: 'Rejected',
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
      case 'approved':
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
      case 'approved':
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

  const filteredRequests = eirRequests.filter(request => {
    if (!searchQuery) return true
    
    const searchLower = searchQuery.toLowerCase()
    return (
      request.requestNumber.toLowerCase().includes(searchLower) ||
      request.orderId.toLowerCase().includes(searchLower) ||
      request.createdBy.toLowerCase().includes(searchLower) ||
      request.status.toLowerCase().includes(searchLower)
    )
  })

  const renderStatusCard = (status: EIRStatus) => (
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

  const renderEIRRequestItem = ({ item }: { item: EIRRequest }) => (
    <View style={styles.requestCard}>
      {/* Request Header */}
      <View style={styles.requestHeader}>
        <View style={styles.requestHeaderLeft}>
          <Text style={styles.requestNumber}>#{item.requestNumber}</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Icon name="more" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Request Details */}
      <View style={styles.requestDetails}>
        <View style={styles.detailRow}>
          <Icon name="calendar" size={14} color="#666" />
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>{item.date}</Text>
          <Icon name="clock" size={14} color="#666" />
          <Text style={styles.detailLabel}>Time</Text>
          <Text style={styles.detailValue}>{item.time}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="user" size={14} color="#666" />
          <Text style={styles.detailLabel}>Created By</Text>
          <Text style={styles.detailValue}>{item.createdBy}</Text>
          <Icon name="filetext" size={14} color="#666" />
          <Text style={styles.detailLabel}>Order ID</Text>
          <Text style={styles.detailValue}>{item.orderId}</Text>
        </View>
        
        <View style={styles.detailRowSingle}>
          <Icon name="chat" size={14} color="#666" />
          <Text style={styles.detailLabel}>Remarks</Text>
          <Text style={styles.detailValue}>{item.remarks}</Text>
        </View>
        
        <View style={styles.detailRowSingle}>
          <Icon name="info" size={14} color="#666" />
          <Text style={styles.detailLabel}>Reason</Text>
          <Text style={styles.detailValue}>{item.reason}</Text>
        </View>
        
        <View style={styles.detailRowSingle}>
          <Icon name="refresh" size={14} color="#666" />
          <Text style={styles.detailLabel}>Service Type</Text>
          <Text style={styles.detailValue}>{item.serviceType}</Text>
        </View>
        
        <View style={styles.detailRowSingle}>
          <Icon name="upload" size={14} color="#666" />
          <Text style={styles.detailLabel}>Uploaded Files</Text>
          <Text style={[styles.detailValue, { 
            color: item.uploadedFiles === 'No files uploaded' ? '#999' : '#333' 
          }]}>
            {item.uploadedFiles}
          </Text>
        </View>
      </View>

      {/* Status */}
      <View style={styles.statusRow}>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: getStatusBackgroundColor(item.status) }
        ]}>
          <Icon 
            name={item.status === 'Approved' ? 'check' : item.status === 'Pending' ? 'clock' : 'refresh'} 
            size={12} 
            color={getStatusColor(item.status)} 
          />
          <Text style={[styles.statusBadgeText, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      
      {/* Header - Same as MyOrdersScreen */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EIR COPY</Text>
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
            {eirStatuses.map(renderStatusCard)}
          </ScrollView>
        </View>

        {/* EIR Copy List Section */}
        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <View style={styles.listTitleContainer}>
              <Icon name="filetext" size={20} color="#4A90E2" />
              <Text style={styles.listTitle}>EIR Copy List</Text>
            </View>
            <TouchableOpacity style={styles.newRequestButton} onPress={() => onNavigate("create-eir-request")}>
              <Icon name="plus" size={16} color="white" />
              <Text style={styles.newRequestText}>New Request</Text>
            </TouchableOpacity>
          </View>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Icon name="search" size={18} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search across all columns..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                  <Icon name="close" size={16} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* EIR Requests List */}
          <FlatList
            data={filteredRequests}
            keyExtractor={(item) => item.id}
            renderItem={renderEIRRequestItem}
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
        <TouchableOpacity style={styles.addButton} onPress={() => onNavigate("create-eir-request")}>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
  },
  statusSection: {
    marginBottom: 24,
  },
  statusScrollView: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 6,
    minWidth: 110,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
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
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    textAlign: 'center',
    fontWeight: '500',
  },
  statusCount: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 32,
  },
  listSection: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#E3F2FD',
    padding: 18,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  listTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
    marginLeft: 8,
  },
  newRequestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
    elevation: 2,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  newRequestText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  searchContainer: {
    marginBottom: 20,
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
  requestsList: {
    flex: 1,
  },
  requestCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  requestHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  requestNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  moreButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  requestDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  detailRowSingle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginLeft: 6,
    marginRight: 8,
  },
  detailValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    marginRight: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  paginationButton: {
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
    gap: 8,
  },
  paginationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    elevation: 6,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
})

export default EIRCopyRequestScreen
