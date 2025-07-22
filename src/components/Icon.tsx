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
