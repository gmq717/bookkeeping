import { useState } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import { router } from 'expo-router'
import { useCreateAccount } from '../../src/hooks/useAccounts'
import { AccountType } from 'shared'

const types = AccountType.options

export default function NewAccount() {
  const [name, setName] = useState('')
  const [type, setType] = useState<string>('cash')
  const createAccount = useCreateAccount()

  const handleSubmit = async () => {
    if (!name.trim()) return Alert.alert('请输入账户名称')
    createAccount.mutate(
      { name: name.trim(), type: type as any, balance: 0 },
      { onSuccess: () => router.back() },
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>名称</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="账户名称" />
      <Text style={styles.label}>类型</Text>
      <View style={styles.typeRow}>
        {types.map((t) => (
          <Pressable key={t} style={[styles.typeBtn, type === t && styles.typeActive]} onPress={() => setType(t)}>
            <Text style={[styles.typeText, type === t && styles.typeTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>创建</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  typeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  typeBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  typeActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  typeText: { fontSize: 14 },
  typeTextActive: { color: '#fff' },
  submitBtn: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, marginTop: 24, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
})
