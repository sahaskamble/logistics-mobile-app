"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native"
import Icon from "../components/Icon"

interface OnboardingScreenProps {
  onComplete: () => void
  onNavigateToSignIn: () => void
}

const OnboardingScreen = ({ onComplete, onNavigateToSignIn }: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isVerifying, setIsVerifying] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    fullName: "",
    mobileNumber: "",
    companyName: "",
    email: "",
    password: "",
  })
  const [uploadingDocuments, setUploadingDocuments] = useState({
    panCard: false,
    gstCertificate: false,
    addressProof: false
  })
  const [completedDocuments, setCompletedDocuments] = useState({
    panCard: false,
    gstCertificate: false,
    addressProof: false
  })
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    companyName: "",
    email: "",
    password: "",
    otpCode: ["", "", "", "", "", ""],
    documents: {
      panCard: null,
      gstCertificate: null,
      addressProof: null
    }
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const validateMobile = (mobile: string) => {
    const mobileRegex = /^[+]?[1-9][\d\s\-()]{8,15}$/
    return mobileRegex.test(mobile.replace(/\s/g, ''))
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear errors when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const updateOTP = (index: number, value: string) => {
    const newOTP = [...formData.otpCode]
    newOTP[index] = value
    setFormData(prev => ({ ...prev, otpCode: newOTP }))

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      // Focus next input (you can implement this with refs if needed)
    }

    // Auto-continue when all 6 digits are entered
    const updatedOTP = [...newOTP]
    const isComplete = updatedOTP.every(digit => digit !== "")
    if (isComplete && currentStep === 2) {
      setIsVerifying(true)
      // Simulate verification process
      setTimeout(() => {
        setIsVerifying(false)
        nextStep()
      }, 1500) // 1.5 seconds for verification animation
    }
  }
``
  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      const newErrors = {
        fullName: "",
        mobileNumber: "",
        companyName: "",
        email: "",
        password: "",
      }

      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required"
      }

      if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = "Mobile number is required"
      } else if (!validateMobile(formData.mobileNumber)) {
        newErrors.mobileNumber = "Please enter a valid mobile number"
      }

      if (!formData.companyName.trim()) {
        newErrors.companyName = "Company name is required"
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }

      if (!formData.password.trim()) {
        newErrors.password = "Password is required"
      } else if (!validatePassword(formData.password)) {
        newErrors.password = "Password must be at least 6 characters"
      }

      setErrors(newErrors)

      // If there are errors, don't proceed
      if (Object.values(newErrors).some(error => error !== "")) {
        return
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleDocumentUpload = (documentType: 'panCard' | 'gstCertificate' | 'addressProof') => {
    // Start uploading animation
    setUploadingDocuments(prev => ({ ...prev, [documentType]: true }))

    // Simulate upload process
    setTimeout(() => {
      // Complete upload
      setUploadingDocuments(prev => ({ ...prev, [documentType]: false }))
      setCompletedDocuments(prev => ({ ...prev, [documentType]: true }))
    }, 2000) // 2 seconds upload simulation
  }

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {[1, 2, 3, 4].map((step) => (
        <View key={step} style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressStep,
              currentStep >= step ? styles.progressStepActive : styles.progressStepInactive
           ]}
          >
            {currentStep > step ? (
              <Icon name="check" size={12} color="white" />
            ) : (
              <Text style={[
                styles.progressStepText,
                currentStep >= step ? styles.progressStepTextActive : styles.progressStepTextInactive
              ]}>
                {step}
              </Text>
            )}
          </View>
          {step < 4 && (
            <View 
              style={[
                styles.progressLine,
                currentStep > step ? styles.progressLineActive : styles.progressLineInactive
              ]} 
            />
          )}
        </View>
      ))}
    </View>
  )

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}> Welcome to Link My Logistics </Text>
      <Text style={styles.stepSubtitle}>Let's get started by verifying your details.</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={[styles.textInput, errors.fullName ? styles.textInputError : null]}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={formData.fullName}
            onChangeText={(text) => updateFormData('fullName', text)}
          />
          {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <TextInput
            style={[styles.textInput, errors.mobileNumber ? styles.textInputError : null]}
            placeholder="+91 XXXXX XXXXX"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={formData.mobileNumber}
            onChangeText={(text) => updateFormData('mobileNumber', text)}
          />
          {errors.mobileNumber ? <Text style={styles.errorText}>{errors.mobileNumber}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Company Name</Text>
          <TextInput
            style={[styles.textInput, errors.companyName ? styles.textInputError : null]}
            placeholder="Enter your company name"
            placeholderTextColor="#999"
            value={formData.companyName}
            onChangeText={(text) => updateFormData('companyName', text)}
          />
          {errors.companyName ? <Text style={styles.errorText}>{errors.companyName}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={[styles.textInput, errors.email ? styles.textInputError : null]}
            placeholder="Enter your email address"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => updateFormData('email', text)}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.passwordInput, errors.password ? styles.textInputError : null]}
              placeholder="Create a password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(text) => updateFormData('password', text)}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon name={showPassword ? "eyeoff" : "eye"} size={20} color="#64748B" />
            </TouchableOpacity>
          </View>
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={nextStep}>
        <Text style={styles.primaryButtonText}>Continue</Text>
        <Icon name="arrowright" size={29} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={onNavigateToSignIn}>
        <Text style={styles.linkButtonText}>Already have an account ? &nbsp;<Text style={[styles.linkButtonText, { color: '#4A90E2' }]}>Sign In</Text></Text>
      </TouchableOpacity>
    </View>
  ) 

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Verify Your Email</Text>
      <Text style={styles.stepSubtitle}>
        {isVerifying ? "Verifying your code..." : "We've sent a code to your email. Enter it below to continue."}
      </Text>
      
      <View style={styles.otpContainer}>
        {formData.otpCode.map((digit, index) => (
          <View key={index} style={styles.otpInputContainer}>
            <TextInput
              style={[
                styles.otpInput,
                digit ? styles.otpInputFilled : null,
                isVerifying ? styles.otpInputVerifying : null
              ]}
              value={digit}
              onChangeText={(text) => updateOTP(index, text)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              editable={!isVerifying}
            />
            {digit && <View style={styles.otpInputActive} />}
            {isVerifying && <View style={styles.otpVerifyingPulse} />}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, isVerifying ? styles.primaryButtonDisabled : null]}
        onPress={nextStep}
        disabled={isVerifying}
      >
        {isVerifying ? (
          <>
            <View style={styles.loadingSpinner} />
            <Text style={styles.primaryButtonText}>Verifying...</Text>
          </>
        ) : (
          <>
            <View style={styles.buttonIcon}>
            </View>
            <Text style={styles.primaryButtonText}>Verify & Continue</Text>
             <Icon name="shieldcheck" size={27} color="white" />
          </>
        )}
        <View style={styles.buttonGlow} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Didn't receive code? &nbsp;<Text style={[styles.linkButton, { color: 'red' }]}>Re-send</Text></Text>
      </TouchableOpacity>
      
    </View>
  )

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Upload Required Documents</Text>
      <Text style={styles.stepSubtitle}>Secure document verification for your business account</Text>

      <View style={styles.documentsContainer}>
        <TouchableOpacity
          style={[
            styles.documentUpload,
            completedDocuments.panCard ? styles.documentUploadCompleted : null
          ]}
          onPress={() => handleDocumentUpload('panCard')}
          disabled={uploadingDocuments.panCard || completedDocuments.panCard}
        >
          <View style={styles.documentHeader}>
            <View style={[
              styles.uploadIconCircle,
              completedDocuments.panCard ? styles.uploadIconCircleCompleted : null
            ]}>
              {completedDocuments.panCard ? (
                <Icon name="check" size={24} color="white" />
              ) : (
                <Icon name="card" size={24} color="#4A90E2" />
              )}
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.uploadTitle}>PAN Card</Text>
              <Text style={styles.uploadSubtitle}>
                {completedDocuments.panCard
                  ? "✅ Successfully uploaded"
                  : uploadingDocuments.panCard
                    ? "Uploading..."
                    : "Identity verification document"
                }
              </Text>
            </View>
            <View style={[
              styles.uploadStatusBadge,
              completedDocuments.panCard ? styles.uploadStatusBadgeCompleted : null
            ]}>
              {completedDocuments.panCard ? (
                <Icon name="checkcircle" size={16} color="#10B981" />
              ) : uploadingDocuments.panCard ? (
                <View style={styles.uploadSpinner} />
              ) : (
                <Icon name="upload" size={16} color="#4A90E2" />
              )}
            </View>
          </View>
          <View style={styles.uploadProgress}>
            <View style={[
              styles.progressBar,
              completedDocuments.panCard ? styles.progressBarCompleted : null,
              uploadingDocuments.panCard ? styles.progressBarUploading : null
            ]} />
          </View>
          {completedDocuments.panCard && <View style={styles.completionPulse} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.documentUpload,
            completedDocuments.gstCertificate ? styles.documentUploadCompleted : null
          ]}
          onPress={() => handleDocumentUpload('gstCertificate')}
          disabled={uploadingDocuments.gstCertificate || completedDocuments.gstCertificate}
        >
          <View style={styles.documentHeader}>
            <View style={[
              styles.uploadIconCircle,
              completedDocuments.gstCertificate ? styles.uploadIconCircleCompleted : null
            ]}>
              {completedDocuments.gstCertificate ? (
                <Icon name="check" size={24} color="white" />
              ) : (
                <Icon name="filetext" size={24} color="#4A90E2" />
              )}
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.uploadTitle}>GST Certificate</Text>
              <Text style={styles.uploadSubtitle}>
                {completedDocuments.gstCertificate
                  ? "✅ Successfully uploaded"
                  : uploadingDocuments.gstCertificate
                    ? "Uploading..."
                    : "Business registration proof"
                }
              </Text>
            </View>
            <View style={[
              styles.uploadStatusBadge,
              completedDocuments.gstCertificate ? styles.uploadStatusBadgeCompleted : null
            ]}>
              {completedDocuments.gstCertificate ? (
                <Icon name="checkcircle" size={16} color="#10B981" />
              ) : uploadingDocuments.gstCertificate ? (
                <View style={styles.uploadSpinner} />
              ) : (
                <Icon name="upload" size={16} color="#4A90E2" />
              )}
            </View>
          </View>
          <View style={styles.uploadProgress}>
            <View style={[
              styles.progressBar,
              completedDocuments.gstCertificate ? styles.progressBarCompleted : null,
              uploadingDocuments.gstCertificate ? styles.progressBarUploading : null
            ]} />
          </View>
          {completedDocuments.gstCertificate && <View style={styles.completionPulse} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.documentUpload,
            completedDocuments.addressProof ? styles.documentUploadCompleted : null
          ]}
          onPress={() => handleDocumentUpload('addressProof')}
          disabled={uploadingDocuments.addressProof || completedDocuments.addressProof}
        >
          <View style={styles.documentHeader}>
            <View style={[
              styles.uploadIconCircle,
              completedDocuments.addressProof ? styles.uploadIconCircleCompleted : null
            ]}>
              {completedDocuments.addressProof ? (
                <Icon name="check" size={24} color="white" />
              ) : (
                <Icon name="home" size={24} color="#4A90E2" />
              )}  
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.uploadTitle}>Address Proof</Text>
              <Text style={styles.uploadSubtitle}>
                {completedDocuments.addressProof
                  ? "✅ Successfully uploaded"
                  : uploadingDocuments.addressProof
                    ? "Uploading..."
                    : "Business address verification"
                }
              </Text>
            </View>
            <View style={[
              styles.uploadStatusBadge,
              completedDocuments.addressProof ? styles.uploadStatusBadgeCompleted : null
            ]}>
              {completedDocuments.addressProof ? (
                <Icon name="checkcircle" size={16} color="#10B981" />
              ) : uploadingDocuments.addressProof ? (
                <View style={styles.uploadSpinner} />
              ) : (
                <Icon name="upload" size={16} color="#4A90E2" />
              )}
            </View>
          </View>
          <View style={styles.uploadProgress}>
            <View style={[
              styles.progressBar,
              completedDocuments.addressProof ? styles.progressBarCompleted : null,
              uploadingDocuments.addressProof ? styles.progressBarUploading : null
            ]} />
          </View>
          {completedDocuments.addressProof && <View style={styles.completionPulse} />}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={nextStep}>
        <View style={styles.buttonIcon}>
        </View>
        <Text style={styles.primaryButtonText}>Submit Documents</Text>
        <View style={styles.buttonGlow} />
      </TouchableOpacity>
    </View>
  )

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      {/* Success Animation Container */}
      <View style={styles.successAnimationContainer}>
        {/* Main Success Icon with Ripple Effects */}
        <View style={styles.successIconContainer}>
          <View style={styles.successRipple1} />
          <View style={styles.successRipple2} />
          <View style={styles.successRipple3} />
          <View style={styles.successIconLarge}>
            <Icon name="check" size={48} color="white" />
            <View style={styles.successGlow} />
          </View>
        </View>

        {/* Floating Success Elements */}
        <View style={styles.floatingSuccessElements}>
          <View style={[styles.floatingElement, { top: 20, left: 30 }]}>
            <Text style={styles.floatingIcon}>🎉</Text>
          </View>
          <View style={[styles.floatingElement, { top: 40, right: 20 }]}>
            <Text style={styles.floatingIcon}>✨</Text>
          </View>
          <View style={[styles.floatingElement, { top: 60, left: 50 }]}>
            <Text style={styles.floatingIcon}>🎊</Text>
          </View>
          <View style={[styles.floatingElement, { top: 30, right: 60 }]}>
            <Text style={styles.floatingIcon}>⭐</Text>
          </View>
        </View>
      </View>

      {/* Success Message */}
      <View style={styles.successMessageContainer}>
        <Text style={styles.successTitle}>🎉 Welcome Aboard!</Text>
        <Text style={styles.successSubtitle}>Your account is under-verification and ready to streamline your logistics operations</Text>
      </View>

      {/* Feature Showcase Cards */}
      <View style={styles.featureShowcase}>
        <Text style={styles.showcaseTitle}>What's Next?</Text>
        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureEmoji}>📦</Text>
            </View>
            <Text style={styles.featureTitle}>Track Shipments</Text>
            <Text style={styles.featureDescription}>Real-time tracking</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureEmoji}>📊</Text>
            </View>
            <Text style={styles.featureTitle}>Analytics</Text>
            <Text style={styles.featureDescription}>Performance insights</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureEmoji}>🤝</Text>
            </View>
            <Text style={styles.featureTitle}>Partners</Text>
            <Text style={styles.featureDescription}>Network access</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureEmoji}>⚡</Text>
            </View>
            <Text style={styles.featureTitle}>Fast Service</Text>
            <Text style={styles.featureDescription}>Quick delivery</Text>
          </View>
        </View>
      </View>

      {/* Enhanced CTA Button */}
      <TouchableOpacity style={styles.ctaButton} onPress={onComplete}>
        <View style={styles.ctaButtonContent}>
          <View style={styles.ctaIconContainer}>
            <Icon name="home" size={24} color="white" />
          </View>
          <View style={styles.ctaTextContainer}>
            <Text style={styles.ctaButtonText}>Start Your Journey</Text>
            <Text style={styles.ctaButtonSubtext}>CLICK LINK MY LOGISTICS</Text>                                                        
          </View>
          <View style={styles.ctaArrow}>
            <Icon name="arrowright" size={20} color="white" />
          </View>
        </View>
        <View style={styles.ctaButtonGlow} />
      </TouchableOpacity>

      {/* Trust Indicators */}
      <View style={styles.trustIndicators}>
        <View style={styles.trustItem}>
          <Icon name="shieldcheck" size={16} color="#10B981" />
          <Text style={styles.trustText}>Secure & Verified</Text>
        </View>
        <View style={styles.trustItem}>
          <Icon name="clock" size={16} color="#4A90E2" />
          <Text style={styles.trustText}>24/7 Support</Text>
        </View>
      </View>
    </View>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      default: return renderStep1()
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {renderProgressBar()}
        {renderCurrentStep()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContainer: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 60,
    paddingBottom: 40,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressStep: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  progressStepActive: {
    backgroundColor: "#4A90E2",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  progressStepInactive: {
    backgroundColor: "#E2E8F0",
    borderWidth: 2,
    borderColor: "#CBD5E0",
  },
  progressStepText: {
    fontSize: 14,
    fontWeight: "600",
  },
  progressStepTextActive: {
    color: "white",
  },
  progressStepTextInactive: {
    color: "#94A3B8",
  },
  progressLine: {
    width: 40,
    height: 2,
    marginHorizontal: 8,
  },
  progressLineActive: {
    backgroundColor: "#4A90E2",
  },
  progressLineInactive: {
    backgroundColor: "#E2E8F0",
  },
  stepContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 12,
  },
  stepSubtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  formContainer: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  textInputError: {
    borderColor: "#EF4444",
    borderWidth: 2,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    paddingRight: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 18,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
    marginLeft: 4,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 48,
    height: 56,
    backgroundColor: "white",
    borderRadius: 12,
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  otpInputContainer: {
    position: "relative",
  },
  otpInputFilled: {
    borderColor: "#4A90E2",
    backgroundColor: "#EBF4FF",
  },
  otpInputVerifying: {
    borderColor: "#10B981",
    backgroundColor: "#ECFDF5",
  },
  otpInputActive: {
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#4A90E2",
    borderRadius: 2,
  },
  otpVerifyingPulse: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  documentsContainer: {
    marginBottom: 32,
  },
  documentUpload: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  uploadIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EBF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  uploadIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EBF4FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  uploadStatusBadge: {
    backgroundColor: "#EBF4FF",
    borderRadius: 12,
    padding: 8,
  },
  uploadProgress: {
    height: 4,
    backgroundColor: "#F1F5F9",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    width: "0%",
    backgroundColor: "#4A90E2",
    borderRadius: 2,
  },
  progressBarCompleted: {
    width: "100%",
    backgroundColor: "#10B981",
  },
  progressBarUploading: {
    width: "70%",
    backgroundColor: "#FF9800",
  },
  documentUploadCompleted: {
    borderColor: "#10B981",
    backgroundColor: "#F0FDF4",
  },
  uploadIconCircleCompleted: {
    backgroundColor: "#10B981",
  },
  uploadStatusBadgeCompleted: {
    backgroundColor: "#ECFDF5",
  },
  uploadSpinner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(255, 152, 0, 0.3)",
    borderTopColor: "#FF9800",
  },
  completionPulse: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  // Enhanced Step 4 Success Screen Styles
  successAnimationContainer: {
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
    height: 200,
  },
  successIconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  successRipple1: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "rgba(16, 185, 129, 0.2)",
    backgroundColor: "transparent",
  },
  successRipple2: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.15)",
    backgroundColor: "transparent",
  },
  successRipple3: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.1)",
    backgroundColor: "transparent",
  },
  successIconLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    zIndex: 10,
  },
  successGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    top: -10,
    left: -10,
    zIndex: -1,
  },
  floatingSuccessElements: {
    position: "absolute",
    width: 300,
    height: 200,
    top: 0,
  },
  floatingElement: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingIcon: {
    fontSize: 20,
  },
  successMessageContainer: {
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  featureShowcase: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  showcaseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 20,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(74, 144, 226, 0.1)",
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EBF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    position: "relative",
    overflow: "hidden",
  },
  ctaButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  ctaIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  ctaTextContainer: {
    flex: 1,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 2,
  },
  ctaButtonSubtext: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  ctaArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  ctaButtonGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
  },
  trustIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 24,
  },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  trustText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  successContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 12,
  },
  successSubtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 16,
    position: "relative",
  },
  primaryButtonDisabled: {
    backgroundColor: "#94A3B8",
    shadowColor: "#94A3B8",
  },
  primaryButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginRight: 8,
  },
  linkButton: {
    padding: 12,
    alignItems: "center",
  },
  linkButtonText: {
    fontSize: 14,
    color: "#3e454cff",
    fontWeight: "500",
    marginLeft: 6,
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    borderTopColor: "white",
    marginRight: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    backgroundColor: "rgba(74, 144, 226, 0.1)",
  },
})

export default OnboardingScreen
