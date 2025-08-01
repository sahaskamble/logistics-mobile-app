import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Modal,
  FlatList,
} from 'react-native'
import Icon from '../components/Icon'

interface CreateContainerScreenProps {
  onBack: () => void
  onSave: (containerData: ContainerData) => void
}

interface ContainerData {
  containerNo: string
  size: string
  cargoType: string
  status: string
  createdDate: string
  additionalDetails?: string
}

const CreateContainerScreen: React.FC<CreateContainerScreenProps> = ({
  onBack,
  onSave,
}) => {
  const [containerNo, setContainerNo] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedCargoType, setSelectedCargoType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [createdDate, setCreatedDate] = useState('31/07/2025')
  const [additionalDetails, setAdditionalDetails] = useState('')
  const [showDetailsInput, setShowDetailsInput] = useState(false)
  
  // Modal states
  const [showSizeModal, setShowSizeModal] = useState(false)
  const [showCargoModal, setShowCargoModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedDay, setSelectedDay] = useState(new Date().getDate())

  const containerSizes = [
    '20 ft',
    '40 ft',
  ]

  const cargoTypes = [
    'Dry',
    'Liquid',
    'Refrigerated',
    'Hazardous',
    'General',
    'OT (Open Top)',
    'Flat Rack',
  ]

  const statusOptions = [
    'Good',
    'Loaded',
    'Broken',
    'Busy',
    'Available',
    'In Transit',
    'Maintenance',
  ]

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i)
    }
    return years
  }

  const generateDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const years = generateYears()
  const daysInSelectedMonth = generateDaysInMonth(selectedYear, selectedMonth)

  const handleDateSelection = (year: number, month: number, day: number) => {
    setSelectedYear(year)
    setSelectedMonth(month)
    setSelectedDay(day)

    const date = new Date(year, month, day)
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    setCreatedDate(formattedDate)
    setShowDatePicker(false)
  }

  const handleSave = () => {
    if (!containerNo || !selectedSize || !selectedCargoType || !selectedStatus) {
      // Could add validation alert here
      return
    }

    const containerData: ContainerData = {
      containerNo,
      size: selectedSize,
      cargoType: selectedCargoType,
      status: selectedStatus,
      createdDate,
      additionalDetails: showDetailsInput ? additionalDetails : undefined,
    }

    onSave(containerData)
  }

  const isFormValid = containerNo && selectedSize && selectedCargoType && selectedStatus

  const renderDropdownModal = (
    visible: boolean,
    onClose: () => void,
    options: string[],
    onSelect: (option: string) => void,
    title: string
  ) => (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  onSelect(item)
                  onClose()
                }}
              >
                <Text style={styles.modalOptionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Container</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.profileButton}>
          <Icon name="user" size={24} color="white" />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Container No */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Container No. *</Text>
          <TextInput
            style={[
              styles.textInput,
              containerNo && styles.textInputFilled
            ]}
            placeholder="Enter a container number"
            value={containerNo}
            onChangeText={setContainerNo}
            placeholderTextColor="#999"
          />
        </View>

        {/* Container Size */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Container Size *</Text>
          <TouchableOpacity
            style={[
              styles.dropdown,
              selectedSize && styles.dropdownFilled
            ]}
            onPress={() => setShowSizeModal(true)}
          >
            <Text style={[
              styles.dropdownText,
              !selectedSize && styles.placeholderText
            ]}>
              {selectedSize || 'eg. 20 ft, 40 ft'}
            </Text>
            <Icon name="chevrondown" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Cargo Type */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Cargo Type *</Text>
          <TouchableOpacity
            style={[
              styles.dropdown,
              selectedCargoType && styles.dropdownFilled
            ]}
            onPress={() => setShowCargoModal(true)}
          >
            <Text style={[
              styles.dropdownText,
              !selectedCargoType && styles.placeholderText
            ]}>
              {selectedCargoType || 'eg. Dry, Liquid, etc.'}
            </Text>
            <Icon name="chevrondown" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Status */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Status *</Text>
          <TouchableOpacity
            style={[
              styles.dropdown,
              selectedStatus && styles.dropdownFilled
            ]}
            onPress={() => setShowStatusModal(true)}
          >
            <Text style={[
              styles.dropdownText,
              !selectedStatus && styles.placeholderText
            ]}>
              {selectedStatus || 'Select status'}
            </Text>
            <Icon name="chevrondown" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Created Date */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Created Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{createdDate}</Text>
            <Icon name="calendar" size={20} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {/* Add more details */}
        <TouchableOpacity
          style={styles.addDetailsButton}
          onPress={() => setShowDetailsInput(!showDetailsInput)}
        >
          <Icon name="plus" size={16} color="#4A90E2" />
          <Text style={styles.addDetailsText}>Add more details</Text>
        </TouchableOpacity>

        {/* Additional Details Input */}
        {showDetailsInput && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Additional Details</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              placeholder="Enter additional details..."
              value={additionalDetails}
              onChangeText={setAdditionalDetails}
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            !isFormValid && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          activeOpacity={isFormValid ? 0.8 : 1}
          disabled={!isFormValid}
        >
          <Icon name="container" size={25} color="white" />
          <Text style={styles.saveButtonText}>Add Container</Text>
        </TouchableOpacity>
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

      {/* Modals */}
      {renderDropdownModal(
        showSizeModal,
        () => setShowSizeModal(false),
        containerSizes,
        setSelectedSize,
        'Select Container Size'
      )}

      {renderDropdownModal(
        showCargoModal,
        () => setShowCargoModal(false),
        cargoTypes,
        setSelectedCargoType,
        'Select Cargo Type'
      )}

      {renderDropdownModal(
        showStatusModal,
        () => setShowStatusModal(false),
        statusOptions,
        setSelectedStatus,
        'Select Status'
      )}

      {/* Custom Calendar Modal */}
      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarModalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.todayButton}
                onPress={() => {
                  const today = new Date()
                  setSelectedYear(today.getFullYear())
                  setSelectedMonth(today.getMonth())
                  setSelectedDay(today.getDate())
                }}
              >
                <Text style={styles.todayButtonText}>Today</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Year Selection */}
            <View style={styles.calendarSection}>
              <Text style={styles.calendarSectionTitle}>Year</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendarScrollView}>
                {years.map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.calendarItem,
                      selectedYear === year && styles.calendarItemSelected
                    ]}
                    onPress={() => setSelectedYear(year)}
                  >
                    <Text style={[
                      styles.calendarItemText,
                      selectedYear === year && styles.calendarItemTextSelected
                    ]}>
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Month Selection */}
            <View style={styles.calendarSection}>
              <Text style={styles.calendarSectionTitle}>Month</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendarScrollView}>
                {months.map((month, index) => (
                  <TouchableOpacity
                    key={month}
                    style={[
                      styles.calendarItem,
                      selectedMonth === index && styles.calendarItemSelected
                    ]}
                    onPress={() => setSelectedMonth(index)}
                  >
                    <Text style={[
                      styles.calendarItemText,
                      selectedMonth === index && styles.calendarItemTextSelected
                    ]}>
                      {month.substring(0, 3)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Day Selection */}
            <View style={styles.calendarSection}>
              <Text style={styles.calendarSectionTitle}>Day</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendarScrollView}>
                {daysInSelectedMonth.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.calendarItem,
                      selectedDay === day && styles.calendarItemSelected
                    ]}
                    onPress={() => setSelectedDay(day)}
                  >
                    <Text style={[
                      styles.calendarItemText,
                      selectedDay === day && styles.calendarItemTextSelected
                    ]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Selected Date Preview */}
            <View style={styles.selectedDatePreview}>
              <Text style={styles.selectedDateText}>
                Selected: {selectedDay} {months[selectedMonth]} {selectedYear}
              </Text>
            </View>

            {/* Confirm Button */}
            <TouchableOpacity
              style={styles.calendarConfirmButton}
              onPress={() => handleDateSelection(selectedYear, selectedMonth, selectedDay)}
            >
              <Icon name="check" size={20} color="white" />
              <Text style={styles.calendarConfirmText}>Confirm Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  backButton: {
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
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  textInputFilled: {
    borderColor: '#4A90E2',
    borderWidth: 2,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  dropdownFilled: {
    borderColor: '#4A90E2',
    borderWidth: 2,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  addDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  addDetailsText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
    marginLeft: 8,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 40,
    elevation: 4,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
    elevation: 1,
    shadowColor: '#CCCCCC',
    shadowOpacity: 0.1,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '85%',
    maxHeight: '70%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  todayButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  todayButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  modalOption: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  calendarModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  calendarSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  calendarSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  calendarScrollView: {
    flexDirection: 'row',
  },
  calendarItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    minWidth: 50,
    alignItems: 'center',
  },
  calendarItemSelected: {
    backgroundColor: '#4A90E2',
  },
  calendarItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  calendarItemTextSelected: {
    color: 'white',
  },
  selectedDatePreview: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  selectedDateText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
    textAlign: 'center',
  },
  calendarConfirmButton: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 20, 
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarConfirmText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
})

export default CreateContainerScreen
