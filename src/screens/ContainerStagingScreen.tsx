import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import Icon from '../components/Icon'
import Sidebar from '../components/Sidebar'

const { width: screenWidth } = Dimensions.get('window')

interface ContainerStagingScreenProps {
  onBack: () => void
  onNavigate: (screen: string) => void
  onLogout?: () => void
}

interface ContainerStagingStatus {
  id: string
  title: string
  count: number
  color: string
  backgroundColor: string
  icon: string
}

interface StagingRequest {
  id: string
  date: string
  time: string
  createdBy: string
  orderId: string
  remarks: string
  reason: string
  serviceType: string
  status: 'Approved' | 'Pending' | 'In Progress' | 'Rejected'
}

const ContainerStagingScreen = ({ onBack, onNavigate, onLogout = () => {} }: ContainerStagingScreenProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Status cards data
  const stagingStatuses: ContainerStagingStatus[] = [
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
    }
  ]

  // Sample staging requests data
  const stagingRequests: StagingRequest[] = [
    {
      id: 'REQ-52529864385',
      date: 'Aug 5, 2025',
      time: '2:52 PM',
      createdBy: 'customer007',
      orderId: 'ORD-89227693822',
      remarks: 'Need Copy',
      reason: '—',
      serviceType: 'Container Staging',
      status: 'In Progress'
    },
    {
      id: 'REQ-63819275364',
      date: 'Aug 4, 2025',
      time: '10:15 AM',
      createdBy: 'customer012',
      orderId: 'ORD-73619485203',
      remarks: 'Urgent request',
      reason: 'Documentation Incomplete',
      serviceType: 'Container Staging',
      status: 'Approved'
    },
    
    {
      id: 'REQ-74930182563',
      date: 'Aug 3, 2025',
      time: '1:30 PM',
      createdBy: 'customer009',
      orderId: 'ORD-98765432109',
      remarks: 'Urgently needed',
      reason: 'Incorrect information provided',
      serviceType: 'Container Staging',
      status: 'Rejected'
    },
    {
      id: 'REQ-85012345678',  
      date: 'Aug 2, 2025',
      time: '9:45 AM',
      createdBy: 'customer011', 
      orderId: 'ORD-12345678901',
      remarks: 'Urgent request',  
      reason: 'Documentation Incomplete',
      serviceType: 'Container Staging',
      status: 'Pending'
    },
    {
      id: 'REQ-96785432109',  
      date: 'Aug 1, 2025',
      time: '11:00 AM',
      createdBy: 'customer010', 
      orderId: 'ORD-12345678901',
      remarks: 'Urgent request',  
      reason: 'Documentation Incomplete',
      serviceType: 'Container Staging',
      status: 'In Progress'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return '#4CAF50'
      case 'Pending': return '#FF9800'
      case 'In Progress': return '#2196F3'
      case 'Rejected': return '#F44336'
      default: return '#666'
    }
  }

  const getStatusBackgroundColor = (status: string) => {
    switch (status) {
      case 'Approved': return '#E8F5E8'
      case 'Pending': return '#FFF3E0'
      case 'In Progress': return '#E3F2FD'
      case 'Rejected': return '#FFEBEE'
      default: return '#F5F5F5'
    }
  }


  const filteredRequests = stagingRequests.filter(request =>
    request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderStatusCard = (status: ContainerStagingStatus) => (
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
        <Text style={styles.headerTitle}>Container Staging</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.profileButton}>
          <Icon name="user" size={24} color="white" />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Cards */}
        <View style={styles.statusSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusScrollView}>
            {stagingStatuses.map(renderStatusCard)}
          </ScrollView>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <Icon name="search" size={18} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search across all columns..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
              />
            </View>
            <TouchableOpacity style={styles.newRequestButton} onPress={() => onNavigate("create-container-staging")}>
              <Icon name="plus" size={16} color="white" />
              <Text style={styles.newRequestText}>New Request</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Requests List */}
        <View style={styles.requestsList}>
          {filteredRequests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <Text style={styles.requestId}>#{request.id}</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <Icon name="more" size={16} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={styles.requestDetails}>
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Icon name="calendar" size={14} color="#666" />
                    <View style={styles.detailContent}>
                      <Text style={styles.detailLabel}>Date</Text>
                      <Text style={styles.detailValue}>{request.date}</Text>
                    </View>
                  </View>
                  <View style={styles.detailItem}>
                    <Icon name="clock" size={14} color="#666" />
                    <View style={styles.detailContent}>
                      <Text style={styles.detailLabel}>Time</Text>
                      <Text style={styles.detailValue}>{request.time}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Icon name="user" size={14} color="#666" />
                    <View style={styles.detailContent}>
                      <Text style={styles.detailLabel}>Created By</Text>
                      <Text style={styles.detailValue}>{request.createdBy}</Text>
                    </View>
                  </View>
                  <View style={styles.detailItem}>
                    <Icon name="package" size={14} color="#666" />
                    <View style={styles.detailContent}>
                      <Text style={styles.detailLabel}>Order ID</Text>
                      <Text style={styles.detailValue}>{request.orderId}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Icon name="message" size={14} color="#666" />
                    <View style={styles.detailContent}>
                      <Text style={styles.detailLabel}>Remarks</Text>
                      <Text style={styles.detailValue}>{request.remarks}</Text>
                    </View>
                  </View>
                  <View style={styles.detailItem}>
                    <Icon name="info" size={14} color="#666" />
                    <View style={styles.detailContent}>
                      <Text style={styles.detailLabel}>Reason</Text>
                      <Text style={styles.detailValue}>{request.reason}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Icon name="refresh" size={14} color="#666" />
                    <View style={styles.detailContent}>
                      <Text style={styles.detailLabel}>Service Type</Text>
                      <Text style={styles.detailValue}>{request.serviceType}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Status Badge */}
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusBackgroundColor(request.status) }
                ]}>
                  <Text style={[styles.statusText, { color: getStatusColor(request.status) }]}>
                    {request.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {filteredRequests.length === 0 && (
            <View style={styles.emptyState}>
              <Icon name="search" size={48} color="#ccc" />
              <Text style={styles.emptyStateTitle}>No requests found</Text>
              <Text style={styles.emptyStateText}>
                {searchQuery ? "Try adjusting your search terms" : "No container staging requests available"}
              </Text>
            </View>
          )}
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
    backgroundColor: '#f8fafc',
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
  content: {
    flex: 1,
  },
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
  searchSection: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
  requestsList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  requestCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  requestId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  moreButton: {
    padding: 4,
  },
  requestDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 16,
  },
  detailContent: {
    marginLeft: 8,
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
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
  navItemCenter: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
  fabInNav: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
})

export default ContainerStagingScreen
