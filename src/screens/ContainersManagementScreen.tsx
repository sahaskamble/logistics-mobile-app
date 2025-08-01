import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native'
import Icon from '../components/Icon'
import Sidebar from '../components/Sidebar'

const { width: screenWidth } = Dimensions.get('window')

interface Container {
  id: string
  containerNo: string
  size: string
  cargoType: string
  status: 'Good' | 'Loaded' | 'Broken' | 'Busy'
}

interface ContainersManagementScreenProps {
  onBack: () => void
  onNavigate?: (screen: string) => void
  onLogout?: () => void
  onCreateContainer?: () => void
  additionalContainers?: Container[]
}

const ContainersManagementScreen: React.FC<ContainersManagementScreenProps> = ({
  onBack,
  onNavigate = () => {},
  onLogout = () => {},
  onCreateContainer = () => {},
  additionalContainers = [],
}) => {
  const [searchText, setSearchText] = useState('')
  const [sidebarVisible, setSidebarVisible] = useState(false)

  const defaultContainers: Container[] = [
    {
      id: 'CON-93590729951',
      containerNo: 'TEMU6847739',
      size: '20 ft',
      cargoType: 'OT',
      status: 'Good',
    },
    {
      id: 'CON-92964017216',
      containerNo: 'TCLU774086',
      size: '20 ft',
      cargoType: 'GENERAL',
      status: 'Loaded',
    },
    {
      id: 'CON-90306514059',
      containerNo: 'LMN4455667',
      size: '25 ft',
      cargoType: 'Dry',
      status: 'Broken',
    },
    {
      id: 'CON-88713685065',
      containerNo: 'ABC1234567',
      size: '20 ft',
      cargoType: 'Dry',
      status: 'Busy',
    },
  ]

  // Combine default containers with additional containers
  const containers = [...defaultContainers, ...additionalContainers]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good':
        return '#4CAF50'
      case 'Loaded':
        return '#2196F3'
      case 'Broken':
        return '#FF9800'
      case 'Busy':
        return '#9C27B0'
      default:
        return '#757575'
    }
  }

  const getStatusBackgroundColor = (status: string) => {
    switch (status) {
      case 'Good':
        return '#E8F5E8'
      case 'Loaded':
        return '#E3F2FD'
      case 'Broken':
        return '#FFF3E0'
      case 'Busy':
        return '#F3E5F5'
      default:
        return '#F5F5F5'
    }
  }

  const filteredContainers = containers.filter(container =>
    container.id.toLowerCase().includes(searchText.toLowerCase()) ||
    container.containerNo.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Containers Management</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.profileButton}>
          <Icon name="user" size={24} color="white" />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add Container Button */}
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={onCreateContainer}
        >
          <Icon name="plus" size={20} color="white" />
          <Text style={styles.addButtonText}>Add Container</Text>
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Filter by container ID..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Container List */}
        <View style={styles.containerList}>
          {filteredContainers.map((container) => (
            <TouchableOpacity
              key={container.id}
              style={styles.containerCard}
              activeOpacity={0.95}
            >
              <View style={styles.containerHeader}>
                <View style={styles.containerInfo}>
                  <Text style={styles.containerIdLabel}>Container ID: </Text>
                  <Text style={styles.containerIdValue}>{container.id}</Text>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <Icon name="more-vertical" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.containerDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Container No.: </Text>
                  <Text style={styles.detailValue}>{container.containerNo}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <View style={styles.leftDetail}>
                    <Text style={styles.detailLabel}>Size: </Text>
                    <Text style={styles.detailValue}>{container.size}</Text>
                  </View>
                  <View style={styles.rightDetail}>
                    <Text style={styles.detailLabel}>Cargo Type: </Text>
                    <Text style={styles.detailValue}>{container.cargoType}</Text>
                  </View>
                </View>
                
                <View style={styles.statusRow}>
                  <Text style={styles.detailLabel}>Status: </Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusBackgroundColor(container.status) }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(container.status) }
                    ]}>
                      {container.status}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onBack}>
          <Icon name="home" size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="grid" size={24} color="#666" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCenter}>
          <Icon name="plus" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="truck" size={24} color="#666" />
          <Text style={styles.navText}>Provider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="user" size={24} color="#666" />
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  filterButton: {
    padding: 8,
  },
  containerList: {
    gap: 16,
  },
  containerCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  containerInfo: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerIdLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  containerIdValue: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  moreButton: {
    padding: 4,
  },
  containerDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftDetail: {
    flexDirection: 'row',
    flex: 1,
  },
  rightDetail: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
})

export default ContainersManagementScreen
