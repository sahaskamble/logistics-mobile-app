import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  RefreshControl,
} from 'react-native'
import Icon from '../components/Icon'
import Sidebar from '../components/Sidebar'

interface TrackTraceScreenProps {
  onBack: () => void
  onNavigate?: (screen: string) => void
  onLogout?: () => void
}

interface ShipmentProgress {
  id: string
  status: string
  date: string
  description: string
  isCompleted: boolean
  hasDownload?: boolean
}

const TrackTraceScreen: React.FC<TrackTraceScreenProps> = ({
  onBack,
  onNavigate = () => {},
  onLogout = () => {},
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [isTracked, setIsTracked] = useState(false)
  const [showError, setShowError] = useState(false)

  // Sample tracking data
  const orderDetails = {
    orderId: 'ORD-25990667075',
    blNo: 'MSCU1K123456',
    igmNo: '2025/IGM001',
    itemNo: '1234567/2025',
    cfsProvider: 'Mumbai CFS Terminal',
    customer: 'Merchant',
    chaName: 'Merchant',
    movementStatus: 'Gate Out'
  }

  const shipmentProgress: ShipmentProgress[] = [
    {
      id: '1',
      status: 'CFS IN',
      date: 'Jan 10, 2024',
      description: 'Unloaded from Vessel',
      isCompleted: true,
      hasDownload: true
    },
    {
      id: '2',
      status: 'CFS OUT',
      date: 'Jan 23, 2024',
      description: 'Moved to Transport Yard',
      isCompleted: true,
      hasDownload: true
    }
  ]

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const handleTrackStatus = () => {
    if (!orderNumber.trim()) {
      setShowError(true)
      setIsTracked(false)
      setTimeout(() => setShowError(false), 3000) // Hide error after 3 seconds
      return
    }

    setShowError(false)
    setIsTracked(true)
    console.log('Tracking status for order:', orderNumber)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      
      {/* Header - Same as MyOrdersScreen */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track & Trace</Text>
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
        {/* Order Tracking Section */}
        <View style={styles.trackingSection}>
          <View style={styles.sectionHeader}>
            <Icon name="filetext" size={20} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Order Tracking</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, showError && styles.inputError]}>
              <Text style={styles.inputPrefix}>#</Text>
              <TextInput
                style={styles.input}
                placeholder="Order ID (e.g., ORD-25990667075)"
                value={orderNumber}
                onChangeText={(text) => {
                  setOrderNumber(text)
                  if (showError) setShowError(false)
                }}
                placeholderTextColor="#999"
              />
            </View>
            {showError && (
              <Text style={styles.errorText}>Please enter an Order ID to track</Text>
            )}
          </View>

          <TouchableOpacity style={styles.trackButton} onPress={handleTrackStatus}>
            <Icon name="map-pin" size={16} color="white" />
            <Text style={styles.trackButtonText}>Track Status</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Content Based on Tracking Status */}
        {!isTracked ? (
          <View style={styles.emptyStateSection}>
            <View style={styles.emptyStateCard}>
              <Icon name="search" size={48} color="#E0E0E0" />
              <Text style={styles.emptyStateTitle}>Enter Order ID to Track</Text>
              <Text style={styles.emptyStateDescription}>
                Please enter a valid Order ID and press "Track Status" to view shipment progress and order details.
              </Text>
            </View>
          </View>
        ) : (
          <>
            {/* Order Details Section */}
            <View style={styles.detailsSection}>
              <View style={styles.sectionHeader}>
                <Icon name="filetext" size={20} color="#4A90E2" />
                <Text style={styles.sectionTitle}>Order Details</Text>
              </View>

              <View style={styles.detailsCard}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Order ID:</Text>
                  <Text style={styles.detailValue}>{orderDetails.orderId}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>BL No:</Text>
                  <Text style={styles.detailValue}>{orderDetails.blNo}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>IGM No:</Text>
                  <Text style={styles.detailValue}>{orderDetails.igmNo}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Item No:</Text>
                  <Text style={styles.detailValue}>{orderDetails.itemNo}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>CFS Facility:</Text>
                  <Text style={styles.detailValue}>{orderDetails.cfsProvider}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Customer:</Text>
                  <Text style={styles.detailValue}>{orderDetails.customer}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>CHA Name:</Text>
                  <Text style={styles.detailValue}>{orderDetails.chaName}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Movement Status:</Text>
                  <View style={styles.statusBadge}>
                    <Icon name="check" size={12} color="#4CAF50" />
                    <Text style={styles.statusText}>{orderDetails.movementStatus}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Shipment Progress Section */}
            <View style={styles.progressSection}>
              <View style={styles.sectionHeader}>
                <Icon name="truck" size={20} color="#4A90E2" />
                <Text style={styles.sectionTitle}>Shipment Progress</Text>
              </View>

              <View style={styles.progressCard}>
                {shipmentProgress.map((progress, index) => (
                  <View key={progress.id} style={styles.progressItem}>
                    <View style={styles.progressLeft}>
                      <View style={[
                        styles.progressDot,
                        { backgroundColor: progress.isCompleted ? '#4A90E2' : '#E0E0E0' }
                      ]}>
                        <Text style={styles.progressNumber}>{index + 1}</Text>
                      </View>
                      {index < shipmentProgress.length - 1 && (
                        <View style={[
                          styles.progressLine,
                          { backgroundColor: progress.isCompleted ? '#4A90E2' : '#E0E0E0' }
                        ]} />
                      )}
                    </View>

                    <View style={styles.progressContent}>
                      <View style={styles.progressHeader}>
                        <Text style={styles.progressStatus}>{progress.status}</Text>
                        <Text style={styles.progressDate}>{progress.date}</Text>
                      </View>
                      <Text style={styles.progressDescription}>{progress.description}</Text>
                      {progress.hasDownload && (
                        <TouchableOpacity style={styles.downloadButton}>
                          <Icon name="download" size={14} color="#4A90E2" />
                          <Text style={styles.downloadText}>Download Zip</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
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
  trackingSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputError: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 4,
    marginLeft: 4,
  },
  inputPrefix: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    elevation: 2,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  emptyStateSection: {
    marginBottom: 16,
  },
  emptyStateCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  progressLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  progressLine: {
    width: 2,
    height: 40,
    marginTop: 4,
  },
  progressContent: {
    flex: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  progressDate: {
    fontSize: 12,
    color: '#666',
  },
  progressDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 6,
  },
  downloadText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A90E2',
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

export default TrackTraceScreen
