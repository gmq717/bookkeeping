import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: '首页' }} />
      <Tabs.Screen name="accounts" options={{ title: '账户' }} />
      <Tabs.Screen name="categories" options={{ title: '分类' }} />
      <Tabs.Screen name="transactions" options={{ title: '流水' }} />
    </Tabs>
  )
}
