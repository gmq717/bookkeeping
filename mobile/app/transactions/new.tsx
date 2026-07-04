import { useState } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView } from 'react-native'
import { router } from 'expo-router'
import dayjs from 'dayjs'
import { useCreateTransaction } from '../../src/hooks/useTransactions'
import { useAccounts } from '../../src/hooks/useAccounts'
import { useCategories } from '../../src/hooks/useCategories'
import { TransactionType } from 'shared'

const types = TransactionType.options
const typeLabels: Record<string, string> = { income: '收入', expense: '支出', transfer: '转账' }

export default function NewTransaction() {
  const { data: accounts } = useAccounts()
  const { data: categories } = useCategories()

  const [accountId, setAccountId] = useState<number | null>(null)
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<string>('expense')
  const [note, setNote] = useState('')
  const createTx = useCreateTransaction()

  const handleSubmit = () => {
    if (!accountId) return Alert.alert('请选择账户')
    if (!categoryId) return Alert.alert('请选择分类')
    if (!amount || isNaN(Number(amount))) return Alert.alert('请输入有效金额')
    const amountInCents = Math.round(parseFloat(amount) * 100)
    createTx.mutate(
      {
        accountId,
        categoryId,
        amount: amountInCents,
        type: type as any,
        note: note.trim() || undefined,
        happenedAt: new Date().toISOString(),
      },
      { onSuccess: () => router.back() },
    )
  }

  const filteredCategories = categories?.filter((c) => c.type === type) ?? []

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>类型</Text>
      <View style={styles.typeRow}>
        {types.map((t) => (
          <Pressable key={t} style={[styles.typeBtn, type === t && (t === 'income' ? styles.incomeActive : t === 'expense' ? styles.expenseActive : styles.transferActive)]} onPress={() => { setType(t); setCategoryId(null) }}>
            <Text style={[styles.typeText, type === t && styles.typeTextActive]}>{typeLabels[t]}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>金额</Text>
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder="0.00" keyboardType="decimal-pad" />

      <Text style={styles.label}>账户</Text>
      <View style={styles.optionRow}>
        {accounts?.map((a) => (
          <Pressable key={a.id} style={[styles.optionBtn, accountId === a.id && styles.optionActive]} onPress={() => setAccountId(a.id)}>
            <Text style={[styles.optionText, accountId === a.id && styles.optionTextActive]}>{a.name}</Text>
          </Pressable>
        ))}
      </View>

      {type !== 'transfer' && (
        <>
          <Text style={styles.label}>分类</Text>
          <View style={styles.optionRow}>
            {filteredCategories.map((c) => (
              <Pressable key={c.id} style={[styles.optionBtn, categoryId === c.id && styles.optionActive]} onPress={() => setCategoryId(c.id)}>
                <Text style={[styles.optionText, categoryId === c.id && styles.optionTextActive]}>{c.name}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}

      <Text style={styles.label}>备注</Text>
      <TextInput style={styles.input} value={note} onChangeText={setNote} placeholder="可选" />

      <Pressable style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>保存</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  typeRow: { flexDirection: 'row', gap: 8 },
  typeBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  incomeActive: { backgroundColor: '#28a745', borderColor: '#28a745' },
  expenseActive: { backgroundColor: '#dc3545', borderColor: '#dc3545' },
  transferActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  typeText: { fontSize: 14 },
  typeTextActive: { color: '#fff' },
  optionRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  optionBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  optionActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  optionText: { fontSize: 14 },
  optionTextActive: { color: '#fff' },
  submitBtn: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, marginTop: 24, marginBottom: 40, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
})
