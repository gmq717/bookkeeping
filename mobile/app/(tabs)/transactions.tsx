import { View, FlatList, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { Link } from 'expo-router'
import dayjs from 'dayjs'
import { useTransactions, useDeleteTransaction } from '../../src/hooks/useTransactions'

const typeLabels: Record<string, string> = {
  income: '收入',
  expense: '支出',
  transfer: '转账',
}

export default function TransactionsPage() {
  const { data: transactions, isLoading } = useTransactions()
  const deleteTx = useDeleteTransaction()

  if (isLoading) return <View style={styles.container}><Text>加载中...</Text></View>

  return (
    <View style={styles.container}>
      <Link href="/transactions/new" asChild>
        <Pressable style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ 记账</Text>
        </Pressable>
      </Link>
      <FlatList
        data={transactions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardType}>{typeLabels[item.type]}</Text>
              <Text style={styles.cardDate}>{dayjs(item.happenedAt).format('MM-DD HH:mm')}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardCategory}>{item.category?.name ?? '-'}</Text>
              <Text style={[styles.cardAmount, item.type === 'income' ? styles.income : styles.expense]}>
                {(item.amount / 100).toFixed(2)}
              </Text>
            </View>
            {item.note && <Text style={styles.cardNote}>{item.note}</Text>}
            <Text style={styles.cardAccount}>{item.account?.name}</Text>
            <View style={styles.cardActions}>
              <Link href={`/transactions/${item.id}/edit`} asChild>
                <Pressable style={styles.actionBtn}>
                  <Text>编辑</Text>
                </Pressable>
              </Link>
              <Pressable
                style={[styles.actionBtn, styles.deleteBtn]}
                onPress={() => {
                  Alert.alert('确认删除', '删除这笔交易？', [
                    { text: '取消', style: 'cancel' },
                    { text: '删除', style: 'destructive', onPress: () => deleteTx.mutate(item.id) },
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
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  cardType: { fontSize: 14, color: '#666' },
  cardDate: { fontSize: 12, color: '#999' },
  cardBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardCategory: { fontSize: 16, fontWeight: '600' },
  cardAmount: { fontSize: 20, fontWeight: 'bold' },
  income: { color: '#28a745' },
  expense: { color: '#dc3545' },
  cardNote: { fontSize: 14, color: '#666', marginBottom: 4 },
  cardAccount: { fontSize: 12, color: '#999', marginBottom: 8 },
  cardActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 4, borderWidth: 1, borderColor: '#ddd' },
  deleteBtn: { borderColor: '#ff4444' },
  deleteText: { color: '#ff4444' },
})
