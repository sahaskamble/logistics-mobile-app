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

interface ChequeAcceptanceScreenProps {
  onBack: () => void
  onNavigate?: (screen: string) => void
  onLogout?: () => void
}

interface ChequeStatus {
  id: string
  title: string
  count: number
  color: string
  backgroundColor: string
  icon: string
}

interface ChequeRequest {
  id: string
  requestNumber: string
  date: string
  time: string
  createdBy: string
  orderId: string
  customerRemarks: string
  reason: string
  serviceType: string
  uploadedFiles: string
  status: string
}

const ChequeAcceptanceScreen: React.FC<ChequeAcceptanceScreenProps> = ({
  onBack,
  onNavigate = () => {},
  onLogout = () => {},
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Status cards data
  const chequeStatuses: ChequeStatus[] = [
    {
      id: 'customer-request',
      title: 'Customer Request',
      count: 0,
      color: '#4CAF50',
      backgroundColor: '#E8F5E8',
      icon: 'check',
    },
    {
      id: 'LML-approval',
      title: 'LML Approval',
      count: 0,
      color: '#4CAF50',
      backgroundColor: '#E8F5E8',
      icon: 'check',
    },
    {
      id: 'cfs-final-approval',
      title: 'CFS Final Approval',
      count: 0,
      color: '#4CAF50',
      backgroundColor: '#E8F5E8',
      icon: 'check',
    },
    {
      id: 'document-upload',
      title: 'Document Upload',
      count: 0,
      color: '#999',
      backgroundColor: '#E8F5E8',
      icon: 'upload',
    },
  ]

  // Status overview cards
  const overviewStatuses: ChequeStatus[] = [
    {
      id: 'approved',
      title: 'Approved',
      count: 1,
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
      id: 'in-progress',
      title: 'In Progress',
      count: 1,
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

  // Sample cheque requests data
  const chequeRequests: ChequeRequest[] = [
    {
      id: '1',
      requestNumber: 'REQ-52110730625',
      date: 'Aug 5, 2025',
      time: '9:33 AM',
      createdBy: 'customer007',
      orderId: 'ORD-94551939993',
      customerRemarks: 'N',
      reason: '—',
      serviceType: 'Cheque Acceptance',
      uploadedFiles: '1 file uploaded: screenshot_2025_06_04_at_10_54...',
      status: 'Activated',
    },
    {
      id: '2',
      requestNumber: 'REQ-52110730626',
      date: 'Aug 5, 2025',
      time: '10:21 AM',
      createdBy: 'customer008',
      orderId: 'ORD-94551939994',
      customerRemarks: 'Please process ASAP',
      reason: 'Urgent payment',
      serviceType: 'Cheque Acceptance',
      uploadedFiles: '2 files uploaded: Invoice_2025_06_04.pdf, cheque_image.jpg',
      status: 'Pending',
    },
    {
      id: '3',
      requestNumber: 'REQ-52110730627',
      date: 'Aug 4, 2025',
      time: '3:45 PM',
      createdBy: 'customer009',
      orderId: 'ORD-94551939995',
      customerRemarks: 'Standard processing',
      reason: 'Monthly payment',
      serviceType: 'Cheque Acceptance',
      uploadedFiles: '1 file uploaded: cheque_scan_accepted.pdf',
      status: 'In Progress',
    },
    {
      id: '4',
      requestNumber: 'REQ-52110730628',
      date: 'Aug 3, 2025',
      time: '2:15 PM',
      createdBy: 'customer010',
      orderId: 'ORD-94551939996',
      customerRemarks: 'Invalid cheque details',
      reason: 'Incorrect amount',
      serviceType: 'Cheque Acceptance',
      uploadedFiles: '1 file uploaded: invalid_cheque.pdf',
      status: 'Rejected',
    },
    {
      id: '5',
      requestNumber: 'REQ-52110730629',
      date: 'Aug 2, 2025',
      time: '11:30 AM',
      createdBy: 'customer011',
      orderId: 'ORD-94551939997',
      customerRemarks: 'Signature mismatch',
      reason: 'Authentication failed',
      serviceType: 'Cheque Acceptance',
      uploadedFiles: '2 files uploaded: cheque_front.jpg, cheque_back.jpg',
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
      case 'activated':
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
      case 'activated':
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

  const filteredRequests = chequeRequests.filter(request => {
    if (!searchQuery) return true
    
    const searchLower = searchQuery.toLowerCase()
    return (
      request.requestNumber.toLowerCase().includes(searchLower) ||
      request.orderId.toLowerCase().includes(searchLower) ||
      request.createdBy.toLowerCase().includes(searchLower) ||
      request.status.toLowerCase().includes(searchLower)
    )
  })

  const renderProcessCard = (status: ChequeStatus) => (
    <View key={status.id} style={[styles.processCard, { backgroundColor: status.backgroundColor }]}>
      <View style={[styles.processIcon, { backgroundColor: status.color }]}>
        <Icon name={status.icon} size={16} color="white" />
      </View>
      <Text style={styles.processTitle}>{status.title}</Text>
    </View>
  )

  const renderStatusCard = (status: ChequeStatus) => (
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

  const renderChequeRequestItem = ({ item }: { item: ChequeRequest }) => (
    <View style={styles.requestCard}>
      {/* Request Header */}
      <View style={styles.requestHeader}>
        <View style={styles.requestHeaderLeft}>
          <Text style={styles.requestNumber}>#{item.requestNumber}</Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: getStatusBackgroundColor(item.status) }
          ]}>
            <Icon 
              name={item.status === 'Activated' ? 'check' : item.status === 'Pending' ? 'clock' : 'refresh'} 
              size={12} 
              color={getStatusColor(item.status)} 
            />
            <Text style={[styles.statusBadgeText, { color: getStatusColor(item.status) }]}>
              {item.status}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Request Details */}
      <View style={styles.requestDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Created By:</Text>
          <Text style={styles.detailValue}>{item.createdBy}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order ID:</Text>
          <Text style={styles.detailValue}>{item.orderId}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Customer Remarks:</Text>
          <Text style={styles.detailValue}>{item.customerRemarks}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Reason:</Text>
          <Text style={styles.detailValue}>{item.reason}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Service Type:</Text>
          <Text style={styles.detailValue}>{item.serviceType}</Text>
        </View>
        
        <View style={styles.detailRowFile}>
          <Icon name="upload" size={14} color="#666" />
          <Text style={styles.detailLabel}>{item.uploadedFiles.includes('1 file') ? '1 file uploaded:' : '2 files uploaded:'}</Text>
        </View>
        <Text style={styles.fileDetails}>
          {item.uploadedFiles.replace(/^\d+ files? uploaded:\s*/, '')}
        </Text>
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
        <Text style={styles.headerTitle}>Cheque Acceptance</Text>
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
    
        {/* Status Overview */}
        <View style={styles.statusSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusScrollView}>
            {overviewStatuses.map(renderStatusCard)}
          </ScrollView>
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
          <TouchableOpacity style={styles.columnsButton}>
            <Text style={styles.columnsText}>Columns</Text>
            <Icon name="chevrondown" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Cheque Requests List */}
        <FlatList
          data={filteredRequests}
          keyExtractor={(item) => item.id}
          renderItem={renderChequeRequestItem}
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
        <TouchableOpacity style={styles.addButton} onPress={() => onNavigate("create-cheque-request")}>
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
  approvalSection: {
    backgroundColor: '#E8F5E8',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  approvalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 8,
  },
  approvalSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  processContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  processCard: {
    flex: 1,
    minWidth: 70,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  processIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  processTitle: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 14,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 3,
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
  columnsButton: {
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
  columnsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
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
    gap: 12,
  },
  requestNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
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
  moreButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  requestDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailRowFile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginRight: 8,
    minWidth: 120,
    marginLeft: 6,
  },
  detailValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  fileDetails: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    marginLeft: 26,
    marginTop: 2,
    fontStyle: 'italic',
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

export default ChequeAcceptanceScreen
