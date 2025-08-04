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

interface MyOrdersScreenProps {
  onBack: () => void
  onNavigate?: (screen: string) => void
  onLogout?: () => void
}

interface OrderStatus {
  id: string
  title: string
  count: number
  color: string
  backgroundColor: string
  icon: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  time: string
  createdBy: string
  cfsProvider: string
  igmNumber: string
  itemNumber: string
  blNumber: string
  containers: string
  consigneeName: string
  chaName: string
  orderDescription: string
  status: string
  reason: string
}

const MyOrdersScreen: React.FC<MyOrdersScreenProps> = ({
  onBack,
  onNavigate = () => {},
  onLogout = () => {},
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [refreshing, setRefreshing] = useState(false)

  const orderStatuses: OrderStatus[] = [
    {
      id: 'approved',
      title: 'Approved',
      count: 3,
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

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-48564370979',
      date: 'Aug 5, 2025',
      time: '8:32 AM',
      createdBy: 'customer007',
      cfsProvider: 'Mumbai CFS Terminal',
      igmNumber: '6253772635',
      itemNumber: '778264727',
      blNumber: '5516236511',
      containers: '546273286',
      consigneeName: 'Sahas',
      chaName: 'Pratik',
      orderDescription: 'Need Process quickly',
      status: 'Accepted',
      reason: '',
    },
    {
      id: '2',
      orderNumber: 'ORD-79348656545',
      date: 'Aug 5, 2025',
      time: '8:32 AM',
      createdBy: 'customer007',
      cfsProvider: 'Mumbai CFS Terminal',
      igmNumber: '12421554335',
      itemNumber: '1244535521',
      blNumber: '12235542162',
      containers: '54643571626',
      consigneeName: 'Deva',
      chaName: 'Durga',
      orderDescription: 'Look the order processs',
      status: 'Accepted',
      reason: '',
    },
    {
      id: '3',
      orderNumber: 'ORD-31097637199',
      date: 'Aug 5, 2025',
      time: '6:32 PM',
      createdBy: 'customer007',
      cfsProvider: 'Mumbai CFS Terminal',
      igmNumber: '7977',
      itemNumber: '79',
      blNumber: 'med000000',
      containers: '',
      consigneeName: 'TEXTINC',
      chaName: 'TEXT LOGISTICS',
      orderDescription: '',
      status: 'Accepted',
      reason: '',
    },
    {
      id: '4',
      orderNumber: 'ORD-47777777775',
      date: 'Jul 27, 2025',
      time: '5:18 PM',
      createdBy: 'customer007',
      cfsProvider: 'SGZ LOGISTICS',
      igmNumber: '2423424734234',
      itemNumber: '234372673',
      blNumber: '2019245674341',
      containers: '(Cwj2zksdr) (vgPha2Smdk)',
      consigneeName: 'deva',
      chaName: 'suhas',
      orderDescription: 'process the order',
      status: 'Pending',
      reason: '',
    },
  ]

  const onRefresh = () => {
    setRefreshing(true)
    // Simulate API call
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
      case 'rejected':
        return '#F44336'
      default:
        return '#2196F3'
    }
  }

  const renderStatusCard = (status: OrderStatus) => (
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

  const renderOrderCard = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      {/* Order Header with gradient-like effect */}
      <View style={styles.orderHeader}>
        <View style={styles.orderHeaderLeft}>
          <View style={styles.orderNumberContainer}>
            <Icon name="filetext" size={16} color="#4A90E2" />
            <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          </View>
          <Text style={styles.orderDate}>{item.date} • {item.time}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusBadgeText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <View style={styles.orderDetailRow}>
          <Text style={styles.orderDetailLabel}>CFS Provider:</Text>
          <Text style={styles.orderDetailValue}>{item.cfsProvider}</Text>
        </View>
        <View style={styles.orderDetailRow}>
          <Text style={styles.orderDetailLabel}>IGM Number:</Text>
          <Text style={styles.orderDetailValue}>{item.igmNumber}</Text>
        </View>
        <View style={styles.orderDetailRow}>
          <Text style={styles.orderDetailLabel}>BL Number:</Text>
          <Text style={styles.orderDetailValue}>{item.blNumber}</Text>
        </View>
        {item.containers && (
          <View style={styles.orderDetailRow}>
            <Text style={styles.orderDetailLabel}>Containers:</Text>
            <Text style={styles.orderDetailValue}>{item.containers}</Text>
          </View>
        )}
        <View style={styles.orderDetailRow}>
          <Text style={styles.orderDetailLabel}>Consignee:</Text>
          <Text style={styles.orderDetailValue}>{item.consigneeName}</Text>
        </View>
      </View>

      <View style={styles.orderActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="eye" size={16} color="#4A90E2" />
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="edit" size={16} color="#4A90E2" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="download" size={16} color="#4A90E2" />
          <Text style={styles.actionButtonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
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
            {orderStatuses.map(renderStatusCard)}
          </ScrollView>
        </View>

        {/* Orders Section */}
        <View style={styles.ordersSection}>
          <View style={styles.ordersSectionHeader}>
            <Text style={styles.ordersSectionTitle}>My Orders</Text>
            <TouchableOpacity style={styles.newOrderButton} onPress={() => onNavigate("create-new-order")}>
              <Icon name="plus" size={16} color="white" />
              <Text style={styles.newOrderButtonText}>New Order</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search across all columns..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.columnsButton}>
              <Text style={styles.columnsButtonText}>Filters</Text>
            </TouchableOpacity>
          </View>

          {/* Orders List */}
          <FlatList
            data={orders}
            renderItem={renderOrderCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
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
    padding: 16,
  },
  statusSection: {
    marginBottom: 24,
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
  ordersSection: {
    flex: 1,
  },
  ordersSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ordersSectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  newOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newOrderButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  columnsButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  columnsButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderHeaderLeft: {
    flex: 1,
  },
  orderNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginLeft: 8,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
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
  orderDetails: {
    marginBottom: 16,
  },
  orderDetailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  orderDetailLabel: {
    fontSize: 13,
    color: '#666',
    width: 100,
    fontWeight: '500',
  },
  orderDetailValue: {
    fontSize: 13,
    color: '#333',
    flex: 1,
    fontWeight: '400',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
    marginLeft: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MyOrdersScreen
