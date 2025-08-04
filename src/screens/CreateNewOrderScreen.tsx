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

interface CreateNewOrderScreenProps {
  onBack: () => void
  onSave: (orderData: OrderData) => void
}

interface OrderData {
  igmNumber: string
  itemNumber: string
  blNumber: string
  consigneeName: string
  chaName: string
  cfsProvider: string
  dpdName: string
  shippingLine: string
  eta: string
  deliveryType: string
  orderDescription: string
  containers: string
  blCopy: string
  shippingLineConfirmation: string
}

const CreateNewOrderScreen: React.FC<CreateNewOrderScreenProps> = ({
  onBack,
  onSave,
}) => {
  const [formData, setFormData] = useState<OrderData>({
    igmNumber: '',
    itemNumber: '',
    blNumber: '',
    consigneeName: '',
    chaName: '',
    cfsProvider: '',
    dpdName: '',
    shippingLine: '',
    eta: '',
    deliveryType: '',
    orderDescription: '',
    containers: '',
    blCopy: '',
    shippingLineConfirmation: '',
  })

  const [showEtaModal, setShowEtaModal] = useState(false)
  const [showDeliveryTypeModal, setShowDeliveryTypeModal] = useState(false)
  const [showCfsProviderModal, setShowCfsProviderModal] = useState(false)
  const [showDpdModal, setShowDpdModal] = useState(false)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState(new Date().getDate())

  const deliveryTypes = [
    'Same Day Delivery',
    'Next Day Delivery',
    'Standard Delivery',
    'Express Delivery',
    'Scheduled Delivery',
  ]

  const cfsProviders = [
    'Mumbai CFS Terminal',
    'JNPT CFS Services',
    'Gateway Distriparks',
    'Allcargo Logistics CFS',
    'APM Terminals Mumbai',
    'DP World JNPT',
  ]

  const dpdOptions = [
    'DPD',
    'Non-DPD',
  ]

  const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = currentYear; i <= currentYear + 5; i++) {
      years.push(i)
    }
    return years
  }

  const generateMonths = () => {
    return [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
  }

  const generateDatesForMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const dates = []
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(i)
    }
    return dates
  }

  const formatSelectedDate = () => {
    if (formData.eta) {
      return formData.eta
    }
    return ''
  }

  const handleDateSelection = (year: number, month: number, date: number) => {
    const formattedDate = `${date.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`
    handleInputChange('eta', formattedDate)
    setSelectedYear(year)
    setSelectedMonth(month)
    setSelectedDate(date)
  }

  const handleInputChange = (field: keyof OrderData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Basic validation
    if (!formData.igmNumber || !formData.itemNumber || !formData.blNumber) {
      // Could add validation alert here
      return
    }

    onSave(formData)
  }

  const isFormValid = formData.igmNumber && formData.itemNumber && formData.blNumber && formData.consigneeName

  const renderDatePickerModal = () => (
    <Modal
      visible={showEtaModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowEtaModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.datePickerModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select ETA Date</Text>
            <TouchableOpacity onPress={() => setShowEtaModal(false)}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.datePickerContainer}>
            {/* Year Selector */}
            <View style={styles.datePickerColumn}>
              <Text style={styles.datePickerLabel}>Year</Text>
              <ScrollView style={styles.datePickerScroll} showsVerticalScrollIndicator={false}>
                {generateYears().map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.datePickerOption,
                      selectedYear === year && styles.datePickerOptionSelected
                    ]}
                    onPress={() => setSelectedYear(year)}
                  >
                    <Text style={[
                      styles.datePickerOptionText,
                      selectedYear === year && styles.datePickerOptionTextSelected
                    ]}>
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Month Selector */}
            <View style={styles.datePickerColumn}>
              <Text style={styles.datePickerLabel}>Month</Text>
              <ScrollView style={styles.datePickerScroll} showsVerticalScrollIndicator={false}>
                {generateMonths().map((month, index) => (
                  <TouchableOpacity
                    key={month}
                    style={[
                      styles.datePickerOption,
                      selectedMonth === index && styles.datePickerOptionSelected
                    ]}
                    onPress={() => setSelectedMonth(index)}
                  >
                    <Text style={[
                      styles.datePickerOptionText,
                      selectedMonth === index && styles.datePickerOptionTextSelected
                    ]}>
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Date Selector */}
            <View style={styles.datePickerColumn}>
              <Text style={styles.datePickerLabel}>Date</Text>
              <ScrollView style={styles.datePickerScroll} showsVerticalScrollIndicator={false}>
                {generateDatesForMonth(selectedYear, selectedMonth).map((date) => (
                  <TouchableOpacity
                    key={date}
                    style={[
                      styles.datePickerOption,
                      selectedDate === date && styles.datePickerOptionSelected
                    ]}
                    onPress={() => setSelectedDate(date)}
                  >
                    <Text style={[
                      styles.datePickerOptionText,
                      selectedDate === date && styles.datePickerOptionTextSelected
                    ]}>
                      {date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.datePickerActions}>
            <TouchableOpacity
              style={styles.datePickerCancelButton}
              onPress={() => setShowEtaModal(false)}
            >
              <Text style={styles.datePickerCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.datePickerConfirmButton}
              onPress={() => {
                handleDateSelection(selectedYear, selectedMonth, selectedDate)
                setShowEtaModal(false)
              }}
            >
              <Text style={styles.datePickerConfirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )

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
        <Text style={styles.headerTitle}>Create New Order</Text>
        <TouchableOpacity onPress={onBack} style={styles.closeButton}>
          <Icon name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <Icon name="filetext" size={24} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Order Information</Text>
          </View>

          {/* Row 1: IGM Number & Item Number */}
          <View style={styles.formRow}>
            <View style={styles.formFieldHalf}>
              <Text style={styles.fieldLabel}>IGM Number *</Text>
              <TextInput
                style={[styles.textInput, formData.igmNumber && styles.textInputFilled]}
                placeholder="Enter IGM Number"
                value={formData.igmNumber}
                onChangeText={(value) => handleInputChange('igmNumber', value)}
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.formFieldHalf}>
              <Text style={styles.fieldLabel}>Item Number *</Text>
              <TextInput
                style={[styles.textInput, formData.itemNumber && styles.textInputFilled]}
                placeholder="Enter Item Number"
                value={formData.itemNumber}
                onChangeText={(value) => handleInputChange('itemNumber', value)}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Row 2: BL Number & Consignee Name */}
          <View style={styles.formRow}>
            <View style={styles.formFieldHalf}>
              <Text style={styles.fieldLabel}>BL Number *</Text>
              <TextInput
                style={[styles.textInput, formData.blNumber && styles.textInputFilled]}
                placeholder="Enter BL Number"
                value={formData.blNumber}
                onChangeText={(value) => handleInputChange('blNumber', value)}
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.formFieldHalf}>
              <Text style={styles.fieldLabel}>Consignee Name *</Text>
              <TextInput
                style={[styles.textInput, formData.consigneeName && styles.textInputFilled]}
                placeholder="Enter Consignee Name"
                value={formData.consigneeName}
                onChangeText={(value) => handleInputChange('consigneeName', value)}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Row 3: CHA Name & CFS Provider */}
          <View style={styles.formRow}>
            <View style={styles.formFieldHalf}>
              <Text style={styles.fieldLabel}>CHA Name</Text>
              <TextInput
                style={[styles.textInput, formData.chaName && styles.textInputFilled]}
                placeholder="Enter CHA Name"
                value={formData.chaName}
                onChangeText={(value) => handleInputChange('chaName', value)}
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.formFieldHalf}>
              <Text style={styles.fieldLabel}>CFS Provider</Text>
              <TouchableOpacity
                style={[styles.dropdown, formData.cfsProvider && styles.dropdownFilled]}
                onPress={() => setShowCfsProviderModal(true)}
              >
                <Text style={[styles.dropdownText, !formData.cfsProvider && styles.placeholderText]}>
                  {formData.cfsProvider || 'Select CFS Provider'}
                </Text>
                <Icon name="chevrondown" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Row 4: DPD/Navi-DPD & Shipping Line */}
          <View style={styles.formRow}>
            <View style={styles.formFieldHalf}>
              <Text style={styles.fieldLabel}>DPD/Non-DPD</Text>
              <TouchableOpacity
                style={[styles.dropdown, formData.dpdName && styles.dropdownFilled]}
                onPress={() => setShowDpdModal(true)}
              >
                <Text style={[styles.dropdownText, !formData.dpdName && styles.placeholderText]}>
                  {formData.dpdName || 'Select DPD Type'}
                </Text>
                <Icon name="chevrondown" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.formFieldHalf}>
              <Text style={styles.fieldLabel}>Shipping Line</Text>
              <TextInput
                style={[styles.textInput, formData.shippingLine && styles.textInputFilled]}
                placeholder="Enter Shipping Line"
                value={formData.shippingLine}
                onChangeText={(value) => handleInputChange('shippingLine', value)}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Row 5: ETA & Delivery Type */}
          <View style={styles.formRow}>
            <View style={styles.formFieldHalf}>
              <Text style={styles.fieldLabel}>ETA (Estimated Time of Arrival)</Text>
              <TouchableOpacity
                style={[styles.dropdown, formData.eta && styles.dropdownFilled]}
                onPress={() => setShowEtaModal(true)}
              >
                <Text style={[styles.dropdownText, !formData.eta && styles.placeholderText]}>
                  {formData.eta || 'Select ETA Date'}
                </Text>
                <Icon name="calendar" size={20} color="#4A90E2" />
              </TouchableOpacity>
            </View>
            <View style={styles.formFieldHalf}>
              <Text style={styles.fieldLabel}>Delivery Type</Text>
              <TouchableOpacity
                style={[styles.dropdown, formData.deliveryType && styles.dropdownFilled]}
                onPress={() => setShowDeliveryTypeModal(true)}
              >
                <Text style={[styles.dropdownText, !formData.deliveryType && styles.placeholderText]}>
                  {formData.deliveryType || 'Select Delivery Type'}
                </Text>
                <Icon name="chevrondown" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Order Description */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Order Description</Text>
            <TextInput
              style={[styles.textAreaInput, formData.orderDescription && styles.textInputFilled]}
              placeholder="Enter order description..."
              value={formData.orderDescription}
              onChangeText={(value) => handleInputChange('orderDescription', value)}
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Containers */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Containers</Text>
            <TextInput
              style={[styles.textInput, formData.containers && styles.textInputFilled]}
              placeholder="Add your Container No."
              value={formData.containers}
              onChangeText={(value) => handleInputChange('containers', value)}
              placeholderTextColor="#999"
            />
          </View>

          {/* BL Copy */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>BL Copy</Text>
            <TouchableOpacity style={styles.fileUploadButton}>
              <Icon name="upload" size={20} color="#4A90E2" />
              <Text style={styles.fileUploadText}>Choose File</Text>
              <Text style={styles.fileUploadSubtext}>No file chosen</Text>
            </TouchableOpacity>
          </View>

          {/* Shipping Line Confirmation */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Shipping Line Confirmation (Optional)</Text>
            <TouchableOpacity style={styles.fileUploadButton}>
              <Icon name="upload" size={20} color="#4A90E2" />
              <Text style={styles.fileUploadText}>Choose File</Text>
              <Text style={styles.fileUploadSubtext}>No file chosen</Text>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
            onPress={handleSave}
            activeOpacity={isFormValid ? 0.8 : 1}
            disabled={!isFormValid}
          >
            <Icon name="check" size={20} color="white" />
            <Text style={styles.saveButtonText}>Create Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modals */}
      {renderDatePickerModal()}

      {renderDropdownModal(
        showDeliveryTypeModal,
        () => setShowDeliveryTypeModal(false),
        deliveryTypes,
        (type) => handleInputChange('deliveryType', type),
        'Select Delivery Type'
      )}

      {renderDropdownModal(
        showCfsProviderModal,
        () => setShowCfsProviderModal(false),
        cfsProviders,
        (provider) => handleInputChange('cfsProvider', provider),
        'Select CFS Provider'
      )}

      {renderDropdownModal(
        showDpdModal,
        () => setShowDpdModal(false),
        dpdOptions,
        (option) => handleInputChange('dpdName', option),
        'Select DPD Type'
      )}
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
    textAlign: 'center',
  },
  closeButton: {
    padding: 8,
    marginLeft: 12,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  formField: {
    marginBottom: 20,
  },
  formFieldHalf: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  textInputFilled: {
    borderColor: '#4A90E2',
    backgroundColor: '#F0F7FF',
  },
  textAreaInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FAFAFA',
    height: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  dropdownFilled: {
    borderColor: '#4A90E2',
    backgroundColor: '#F0F7FF',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  fileUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  fileUploadText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
    marginLeft: 8,
  },
  fileUploadSubtext: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#CCC',
    elevation: 0,
    shadowOpacity: 0,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
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
    padding: 20,
    width: '90%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalOption: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  datePickerModalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '95%',
    maxHeight: '80%',
  },
  datePickerContainer: {
    flexDirection: 'row',
    height: 300,
    marginBottom: 20,
  },
  datePickerColumn: {
    flex: 1,
    marginHorizontal: 4,
  },
  datePickerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#4A90E2',
  },
  datePickerScroll: {
    flex: 1,
  },
  datePickerOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
  },
  datePickerOptionSelected: {
    backgroundColor: '#4A90E2',
  },
  datePickerOptionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  datePickerOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  datePickerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  datePickerCancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  datePickerCancelText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  datePickerConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
  },
  datePickerConfirmText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
})

export default CreateNewOrderScreen
