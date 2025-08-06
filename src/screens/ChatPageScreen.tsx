"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import Icon from "../components/Icon"
import Sidebar from "../components/Sidebar"

interface ChatPageScreenProps {
  onNavigate: (screen: string) => void
  onBack: () => void
  onLogout?: () => void
}

interface ChatSession {
  id: string
  title: string
  status: "Open" | "Closed"
  lastUpdated: string
}

const ChatPageScreen = ({ onNavigate, onBack, onLogout = () => {} }: ChatPageScreenProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "EIR copy pending",
      status: "Open",
      lastUpdated: "2 hours ago"
    },
    {
      id: "2", 
      title: "Order Make Urgently Process",
      status: "Closed",
      lastUpdated: "Yesterday"
    },
    {
      id: "3",
      title: "Customs Documentation",
      status: "Closed", 
      lastUpdated: "3 days ago"
    }
  ])

  const quickHelpItems = [
    "Track your shipment with tracking ID",
    "View delivery time estimates", 
    "Update delivery address",
  ]

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat Page</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.profileButton}>
          <Icon name="user" size={24} color="white" />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.startChatButton}>
            <Icon name="chat" size={20} color="white" />
            <Text style={styles.startChatText}>Start Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createTicketButton}>
            <Icon name="filetext" size={20} color="white" />
            <Text style={styles.createTicketText}>Create Ticket</Text>
          </TouchableOpacity>
        </View>

        {/* Chat Sessions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Chat Sessions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {chatSessions.map((session) => (
            <TouchableOpacity key={session.id} style={styles.chatSessionItem}>
              <View style={styles.sessionContent}>
                <Text style={styles.sessionTitle}>{session.title}</Text>
                <Text style={styles.sessionLastUpdated}>Last updated: {session.lastUpdated}</Text>
              </View>
              <View style={styles.sessionRight}>
                <View style={[
                  styles.statusBadge,
                  session.status === "Open" ? styles.openStatus : styles.closedStatus
                ]}>
                  <Text style={[
                    styles.statusText,
                    session.status === "Open" ? styles.openStatusText : styles.closedStatusText
                  ]}>
                    {session.status}
                  </Text>
                </View>
                <Icon name="arrowright" size={16} color="#999" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Help */}
        <View style={styles.section}>
          <View style={styles.quickHelpHeader}>
            <Icon name="support" size={20} color="#4A90E2" />
            <Text style={styles.quickHelpTitle}>Quick Help</Text>
          </View>
          
          {quickHelpItems.map((item, index) => (
            <View key={index} style={styles.quickHelpItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.quickHelpText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Contact Us */}
        <View style={styles.section}>
          <View style={styles.contactHeader}>
            <Icon name="support" size={20} color="#4A90E2" />
            <Text style={styles.contactTitle}>Contact Us</Text>
          </View>

          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              <Icon name="phone" size={20} color="#4A90E2" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone Support</Text>
              <Text style={styles.contactValue}>+1 (800) 123-4567</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              <Icon name="mail" size={20} color="#4A90E2" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@logisticspro.com</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              <Icon name="chat" size={20} color="#4A90E2" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>WhatsApp</Text>
              <Text style={styles.contactValue}>+1 (800) 987-6543</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              <Icon name="clock" size={20} color="#4A90E2" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Business Hours</Text>
              <Text style={styles.contactValue}>Mon-Fri: 8AM - 8PM EST</Text>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("home")}>
          <Icon name="home" size={24} color="#999" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("dashboard")}>
          <Icon name="grid" size={24} color="#999" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
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
    backgroundColor: "#f5f5f5",
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
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },
  startChatButton: {
    flex: 1,
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 25,
    gap: 8,
  },
  startChatText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  createTicketButton: {
    flex: 1,
    backgroundColor: "#666",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 25,
    gap: 8,
  },
  createTicketText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllText: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "500",
  },
  chatSessionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sessionContent: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  sessionLastUpdated: {
    fontSize: 12,
    color: "#999",
  },
  sessionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  openStatus: {
    backgroundColor: "#E8F5E8",
  },
  closedStatus: {
    backgroundColor: "#F5F5F5",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  openStatusText: {
    color: "#4CAF50",
  },
  closedStatusText: {
    color: "#999",
  },
  quickHelpHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  quickHelpTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quickHelpItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4A90E2",
  },
  quickHelpText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  contactHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  bottomSpacing: {
    height: 20,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ChatPageScreen
