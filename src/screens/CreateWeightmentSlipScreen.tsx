"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from "react-native"
import Icon from "../components/Icon"
import Sidebar from "../components/Sidebar"

interface CreateWeightmentSlipScreenProps {
  onNavigate: (screen: string) => void
  onBack: () => void
  onLogout?: () => void
}

const CreateWeightmentSlipScreen = ({ onNavigate, onBack, onLogout = () => {} }: CreateWeightmentSlipScreenProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    requestId: "",
    orderId: "",
    customerName: "",
    serviceType: "",
    vehicleNumber: "",
    driverName: "",
    driverLicense: "",
    containerNumber: "",
    grossWeight: "",
    tareWeight: "",
    netWeight: "",
    weighingDate: new Date().toISOString().split('T')[0],
    weighingTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    operatorName: "",
    remarks: "",
    attachments: []
  })

  const serviceTypes = [
    "Container Weighing",
    "Truck Weighing", 
    "Bulk Cargo Weighing",
    "Vehicle Weighing",
    "Cargo Verification"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Auto-calculate net weight
    if (field === "grossWeight" || field === "tareWeight") {
      const gross = field === "grossWeight" ? parseFloat(value) || 0 : parseFloat(formData.grossWeight) || 0
      const tare = field === "tareWeight" ? parseFloat(value) || 0 : parseFloat(formData.tareWeight) || 0
      const net = gross - tare
      setFormData(prev => ({ ...prev, netWeight: net > 0 ? net.toFixed(2) : "" }))
    }
  }

  const handleSubmit = () => {
    console.log("Weightment slip created:", formData)
    // Handle form submission
  }

  const handleCancel = () => {
    onBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Weightment Slip</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.profileButton}>
          <Icon name="user" size={24} color="white" />
        </View>
      </View>

      {/* Search Bar with New Request Button */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Icon name="search" size={18} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search weightment slips..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.newRequestButton} onPress={() => onNavigate("create-weightment")}>
            <Icon name="plus" size={16} color="white" />
            <Text style={styles.newRequestText}>New Request</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Basic Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Basic Information</Text>
            
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Request ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Auto-generated"
                  placeholderTextColor="#999"
                  value={formData.requestId}
                  onChangeText={(value) => handleInputChange("requestId", value)}
                />
              </View>
              
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Order ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Order ID"
                  placeholderTextColor="#999"
                  value={formData.orderId}
                  onChangeText={(value) => handleInputChange("orderId", value)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Customer Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Customer Name"
                placeholderTextColor="#999"
                value={formData.customerName}
                onChangeText={(value) => handleInputChange("customerName", value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Service Type</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>
                  {formData.serviceType || "Select Service Type"}
                </Text>
                <Icon name="chevrondown" size={14} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Vehicle Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🚛 Vehicle Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Vehicle Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Vehicle Number"
                placeholderTextColor="#999"
                value={formData.vehicleNumber}
                onChangeText={(value) => handleInputChange("vehicleNumber", value)}
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Driver Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Driver Name"
                  placeholderTextColor="#999"
                  value={formData.driverName}
                  onChangeText={(value) => handleInputChange("driverName", value)}
                />
              </View>
              
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Driver License</Text>
                <TextInput
                  style={styles.input}
                  placeholder="License Number"
                  placeholderTextColor="#999"
                  value={formData.driverLicense}
                  onChangeText={(value) => handleInputChange("driverLicense", value)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Container Number (if applicable)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Container Number"
                placeholderTextColor="#999"
                value={formData.containerNumber}
                onChangeText={(value) => handleInputChange("containerNumber", value)}
              />
            </View>
          </View>

          {/* Weight Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚖️ Weight Information</Text>
            
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Gross Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={formData.grossWeight}
                  onChangeText={(value) => handleInputChange("grossWeight", value)}
                />
              </View>
              
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Tare Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={formData.tareWeight}
                  onChangeText={(value) => handleInputChange("tareWeight", value)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Net Weight (kg)</Text>
              <View style={[styles.input, styles.calculatedField]}>
                <Text style={styles.calculatedText}>
                  {formData.netWeight || "Auto-calculated"}
                </Text>
              </View>
            </View>
          </View>

          {/* Date & Time Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Date & Time</Text>
            
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Weighing Date</Text>
                <View style={styles.dateInput}>
                  <Text style={styles.dateText}>{formData.weighingDate}</Text>
                  <Icon name="calendar" size={16} color="#666" />
                </View>
              </View>
              
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Weighing Time</Text>
                <View style={styles.dateInput}>
                  <Text style={styles.dateText}>{formData.weighingTime}</Text>
                  <Icon name="clock" size={16} color="#666" />
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Operator Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Operator Name"
                placeholderTextColor="#999"
                value={formData.operatorName}
                onChangeText={(value) => handleInputChange("operatorName", value)}
              />
            </View>
          </View>

          {/* Additional Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Additional Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Remarks</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter any additional remarks or notes"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={formData.remarks}
                onChangeText={(value) => handleInputChange("remarks", value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Attachments</Text>
              <TouchableOpacity style={styles.uploadArea}>
                <View style={styles.uploadIcon}>
                  <Icon name="upload" size={24} color="#4A90E2" />
                </View>
                <Text style={styles.uploadText}>Upload Photos & Documents</Text>
                <Text style={styles.uploadSubtext}>
                  Vehicle photos, weight certificates, etc.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="check" size={16} color="white" />
          <Text style={styles.submitButtonText}>Create Weightment Slip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Icon name="close" size={16} color="#666" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate("home")}
        >
          <Icon name="home" size={20} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate("dashboard")}
        >
          <Icon name="dashboard" size={20} color="#666" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItemCenter}
          onPress={() => onNavigate("create-order")}
        >
          <View style={styles.fabInNav}>
            <Icon name="plus" size={24} color="white" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate("providers")}
        >
          <Icon name="logistics" size={20} color="#666" />
          <Text style={styles.navText}>Provider</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate("profile")}
        >
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
    backgroundColor: "#f8fafc",
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
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  dropdown: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
  calculatedField: {
    backgroundColor: "#E3F2FD",
    borderColor: "#4A90E2",
  },
  calculatedText: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "500",
  },
  dateInput: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  uploadArea: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
    paddingVertical: 24,
    alignItems: "center",
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4A90E2",
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  actionButtons: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  bottomNavigation: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  navItemCenter: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  navText: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
    fontWeight: "500",
  },
  fabInNav: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
})

export default CreateWeightmentSlipScreen
