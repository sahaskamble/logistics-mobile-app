import type React from "react"
import { View, Text, StyleSheet } from "react-native"

interface IconProps {
  name: string
  size: number
  color: string
}

const Icon: React.FC<IconProps> = ({ name, size, color }) => {
  const getIconSymbol = (iconName: string) => {
    const icons: { [key: string]: string } = {
      menu: "☰",
      bell: "🔔",
      user: "👤",
      search: "🔍",
      filter: "⚙️",
      sort: "↕️",
      home: "🏠",
      grid: "⊞",
      plus: "+",
      truck: "🚛",
      star: "★",
      "map-pin": "📍",
      filetext: "📄",
      card:"💳",
      upload: "⬆️",
      check: "✓",
      checkcircle: "✔️",
      arrowright: "→",
      shieldcheck:"🛡️",
      securityverification: "🛡️",
      clock:"⏰",
      log:"📜",
      logout:"🚪",
      track:"📦",
      logistics:"🚚",
      eye:"👁️",
      eyeoff  :"🙈",
      google:"🌐",
      dashboard:"📊",
      cfs:"🏭",
      transport:"🚛",
      warehouse:"🏪",
      "3pl":"📦",
      customs:"🛃",
      container:"📦",
      notifications:"🔔",
      support:"🆘",
      chevrondown:"▼",
      chevronup:"▲",
      close:"✕",
      calendar:"📅",
      chat:"💬",
      handshake:"🤝",
      "arrow-left":"←",
      bookmark:"🔖",
      mail:"✉️",
      phone:"📞",
      globe:"🌐",
      edit:"✏️",
      download:"⬇️",
      refresh:"🔄",
      lock:"🔒",
      more:"⋯",
      info:"ℹ️",
      building:"🏢",
  
    }
    return icons[iconName] || "?"
  }

  return (
    <View style={[styles.icon, { width: size, height: size }]}>
      <Text style={[styles.iconText, { fontSize: size * 0.8, color }]}>{getIconSymbol(name)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    textAlign: "center",
  },
})

export default Icon
