import { View, FlatList, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { Link } from 'expo-router'
import { useAccounts, useDeleteAccount } from '../../src/hooks/useAccounts'

const typeLabels: Record<string, string> = {
  cash: '现金',
  bank: '银行卡',
  credit: '信用卡',
  investment: '投资',
}

export default function AccountsPage() {
  const { data: accounts, isLoading } = useAccounts()
  const deleteAccount = useDeleteAccount()

  if (isLoading) return <View style={styles.container}><Text>加载中...</Text></View>

  return (
    <View style={styles.container}>
      <Link href="/accounts/new" asChild>
        <Pressable style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ 新增账户</Text>
        </Pressable>
      </Link>
      <FlatList
        data={accounts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardType}>{typeLabels[item.type]}</Text>
            </View>
            <Text style={styles.cardBalance}>
              {(item.balance / 100).toFixed(2)}
            </Text>
            <View style={styles.cardActions}>
              <Link href={`/accounts/${item.id}/edit`} asChild>
                <Pressable style={styles.actionBtn}>
                  <Text>编辑</Text>
                </Pressable>
              </Link>
              <Pressable
                style={[styles.actionBtn, styles.deleteBtn]}
                onPress={() => {
                  Alert.alert('确认删除', `删除账户「${item.name}」？`, [
                    { text: '取消', style: 'cancel' },
                    { text: '删除', style: 'destructive', onPress: () => deleteAccount.mutate(item.id) },
                  ])
                }}
              >
                <Text style={styles.deleteText}>删除</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  addBtn: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, marginBottom: 16, alignItems: 'center' },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cardName: { fontSize: 16, fontWeight: '600' },
  cardType: { color: '#666' },
  cardBalance: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  cardActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 4, borderWidth: 1, borderColor: '#ddd' },
  deleteBtn: { borderColor: '#ff4444' },
  deleteText: { color: '#ff4444' },
})
