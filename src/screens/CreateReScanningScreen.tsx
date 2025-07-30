"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from "react-native"
import Icon from "../components/Icon"

interface CreateReScanningScreenProps {
  onNavigate: (screen: string) => void
  onBack: () => void
}

const CreateReScanningScreen = ({ onNavigate, onBack }: CreateReScanningScreenProps) => {
  const [formData, setFormData] = useState({
    requestId: "",
    orderId: "",
    serviceType: "",
    packageDetails: "",
    issueDescription: "",
    customerRemarks: "",
    urgencyLevel: "",
    contactPerson: "",
    contactNumber: "",
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: "09:00",
    attachments: []
  })

  const serviceTypes = [
    "Express Delivery",
    "Standard Delivery", 
    "Priority Shipping",
    "Bulk Cargo",
    "Container Handling"
  ]

  const urgencyLevels = [
    "Low",
    "Medium",
    "High",
    "Critical"
  ]

  const issueTypes = [
    "Package Damage",
    "Wrong Item Shipped",
    "Missing Items",
    "Quality Issues",
    "Quantity Mismatch",
    "Documentation Error",
    "Other"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log("Re-scanning request created:", formData)
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
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Icon name="arrowright" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Re-Scanning Request</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="bell" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.profileImage}>
            <Icon name="user" size={16} color="white" />
          </View>
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
                  style={[styles.input, styles.disabledInput]}
                  placeholder="Auto-generated"
                  placeholderTextColor="#999"
                  value={formData.requestId}
                  editable={false}
                />
              </View>
              
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Order ID *</Text>
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
              <Text style={styles.label}>Service Type *</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>
                  {formData.serviceType || "Select Service Type"}
                </Text>
                <Icon name="chevrondown" size={14} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Package Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter package details (weight, dimensions, etc.)"
                placeholderTextColor="#999"
                value={formData.packageDetails}
                onChangeText={(value) => handleInputChange("packageDetails", value)}
              />
            </View>
          </View>

          {/* Issue Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚠️ Issue Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Issue Description *</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>
                  {formData.issueDescription || "Select Issue Type"}
                </Text>
                <Icon name="chevrondown" size={14} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Customer Remarks *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe the issue in detail..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={formData.customerRemarks}
                onChangeText={(value) => handleInputChange("customerRemarks", value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Urgency Level</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>
                  {formData.urgencyLevel || "Select Urgency Level"}
                </Text>
                <Icon name="chevrondown" size={14} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Contact Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📞 Contact Information</Text>
            
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Contact Person</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter contact name"
                  placeholderTextColor="#999"
                  value={formData.contactPerson}
                  onChangeText={(value) => handleInputChange("contactPerson", value)}
                />
              </View>
              
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Contact Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter phone number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  value={formData.contactNumber}
                  onChangeText={(value) => handleInputChange("contactNumber", value)}
                />
              </View>
            </View>
          </View>

          {/* Scheduling Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Preferred Schedule</Text>
            
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Preferred Date</Text>
                <View style={styles.dateInput}>
                  <Text style={styles.dateText}>{formData.preferredDate}</Text>
                  <Icon name="calendar" size={16} color="#666" />
                </View>
              </View>
              
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Preferred Time</Text>
                <View style={styles.dateInput}>
                  <Text style={styles.dateText}>{formData.preferredTime}</Text>
                  <Icon name="clock" size={16} color="#666" />
                </View>
              </View>
            </View>
          </View>

          {/* Attachments Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📎 Attachments</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Upload Supporting Documents</Text>
              <TouchableOpacity style={styles.uploadArea}>
                <View style={styles.uploadIcon}>
                  <Icon name="upload" size={24} color="#4A90E2" />
                </View>
                <Text style={styles.uploadText}>Upload Photos & Documents</Text>
                <Text style={styles.uploadSubtext}>
                  Photos of damaged items, invoices, receipts, etc.
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.uploadTips}>
              <Text style={styles.tipsTitle}>💡 Tips for better processing:</Text>
              <Text style={styles.tipText}>• Take clear photos of the issue</Text>
              <Text style={styles.tipText}>• Include original packaging if damaged</Text>
              <Text style={styles.tipText}>• Attach relevant invoices or receipts</Text>
              <Text style={styles.tipText}>• Provide multiple angles if needed</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="check" size={16} color="white" />
          <Text style={styles.submitButtonText}>Submit Request</Text>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 16,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 70,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "180deg" }],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    flex: 1,
    textAlign: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
    marginRight: 12,
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
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#999",
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
  uploadTips: {
    backgroundColor: "#E8F5E8",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  tipsTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2E7D32",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 11,
    color: "#2E7D32",
    marginBottom: 2,
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

export default CreateReScanningScreen
