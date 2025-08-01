import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native'
import Icon from '../components/Icon'
import Sidebar from '../components/Sidebar'

const { width: screenWidth } = Dimensions.get('window')

interface CreateOrderScreenProps {
  onBack: () => void
  onNavigate?: (screen: string) => void
  onLogout?: () => void
}

interface ServiceOption {
  id: string
  title: string
  icon: string
  color: string
  backgroundColor: string
  description: string
}

const CreateOrderScreen: React.FC<CreateOrderScreenProps> = ({
  onBack,
  onNavigate = () => {},
  onLogout = () => {},
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)

  const serviceCategories = [
    {
      id: 'cfs',
      title: 'CFS',
      icon: 'container',
      color: '#4A90E2',
      backgroundColor: '#E3F2FD',
      description: 'Container Freight Station Services',
      actions: [
        {
          id: 'create-container-handling',
          title: 'Create Container Handling Order',
          icon: 'truck',
          description: 'Handle container operations efficiently',
        }
      ]
    },
    {
      id: 'transport',
      title: 'Transport',
      icon: 'truck',
      color: '#2E7D32',
      backgroundColor: '#E8F5E8',
      description: 'Transportation and Logistics',
      actions: [
        {
          id: 'create-fleet-order',
          title: 'Create Fleet Order',
          icon: 'truck',
          description: 'Manage your fleet operations',
        }
      ]
    },
    {
      id: 'warehouse',
      title: 'Warehouse',
      icon: 'warehouse',
      color: '#F57C00',
      backgroundColor: '#FFF3E0',
      description: 'Warehouse Management Services',
      actions: [
        {
          id: 'create-bonded-order',
          title: 'Create bonded order',
          icon: 'filetext',
          description: 'Bonded warehouse operations',
        }
      ]
    },
    {
      id: '3pl',
      title: '3PL',
      icon: 'handshake',
      color: '#7B1FA2',
      backgroundColor: '#F3E5F5',
      description: 'Third Party Logistics',
      actions: [
        {
          id: 'create-order-link',
          title: 'Create Order Link Logistics Partner',
          icon: 'link',
          description: 'Connect with logistics partners',
        }
      ]
    },
  ]

  const handleServicePress = (serviceId: string) => {
    // Handle navigation to specific service screens
    console.log('Service pressed:', serviceId)
    // You can add navigation logic here based on serviceId
  }

  const renderServiceCategoryCard = (category: any, index: number) => {
    return (
      <View key={category.id} style={[styles.categoryCard, { backgroundColor: category.backgroundColor }]}>
        {/* Category Header */}
        <View style={styles.categoryHeader}>
          <View style={[styles.categoryIconLarge, { backgroundColor: 'rgba(255, 255, 255, 0.95)' }]}>
            <Icon name={category.icon} size={32} color={category.color} />
          </View>
          <View style={styles.categoryHeaderText}>
            <Text style={[styles.categoryTitle, { color: category.color }]}>{category.title}</Text>
            <Text style={styles.categoryDescription}>{category.description}</Text>
          </View>
          {/* Category Badge */}
          <View style={[styles.categoryBadge, { backgroundColor: category.color }]}>
            <Text style={styles.categoryBadgeText}>{category.actions.length}</Text>
          </View>
        </View>

        {/* Category Actions */}
        <View style={styles.categoryActions}>
          {category.actions.map((action: any, actionIndex: number) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionItem, {
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderLeftWidth: 3,
                borderLeftColor: category.color,
              }]}
              onPress={() => handleServicePress(action.id)}
              activeOpacity={0.7}
            >
              <View style={styles.actionItemContent}>
                <View style={[styles.actionItemIcon, { backgroundColor: `${category.color}20` }]}>
                  <Icon name={action.icon} size={18} color={category.color} />
                </View>
                <View style={styles.actionItemText}>
                  <Text style={[styles.actionItemTitle, { color: category.color }]}>
                    {action.title}
                  </Text>
                  <Text style={styles.actionItemDescription}>
                    {action.description}
                  </Text>
                </View>
                <View style={styles.actionItemArrow}>
                  <Icon name="chevronright" size={18} color={category.color} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Category Footer */}
        <View style={styles.categoryFooter}>
          <Text style={[styles.categoryFooterText, { color: category.color }]}>
            Tap to create new orders
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Order</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.profileButton}>
          <Icon name="user" size={24} color="white" />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>What would you like to create?</Text>
          <Text style={styles.welcomeSubtitle}>Choose from our comprehensive logistics services</Text>
        </View>

        <View style={styles.servicesContainer}>
          {serviceCategories.map((category, index) => renderServiceCategoryCard(category, index))}
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
    padding: 20,
    paddingBottom: 100, // Extra space for bottom nav
  },
  welcomeSection: {
    marginBottom: 30,
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  servicesContainer: {
    gap: 24,
    paddingBottom: 20,
  },
  categoryCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIconLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryHeaderText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  categoryActions: {
    gap: 12,
  },
  actionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  actionItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionItemText: {
    flex: 1,
  },
  actionItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  actionItemDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  actionItemArrow: {
    marginLeft: 8,
  },
  categoryBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  categoryBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  categoryFooter: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
  },
  categoryFooterText: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.8,
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

export default CreateOrderScreen
