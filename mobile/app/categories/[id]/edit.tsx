import { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useCategories, useUpdateCategory } from '../../../src/hooks/useCategories'
import { CategoryType } from 'shared'

const types = CategoryType.options

export default function EditCategory() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: categories } = useCategories()
  const category = categories?.find((c) => c.id === Number(id))
  const [name, setName] = useState('')
  const [type, setType] = useState<string>('expense')
  const updateCategory = useUpdateCategory()

  useEffect(() => {
    if (category) {
      setName(category.name)
      setType(category.type)
    }
  }, [category])

  const handleSubmit = () => {
    if (!name.trim()) return Alert.alert('请输入分类名称')
    updateCategory.mutate(
      { id: Number(id), input: { name: name.trim(), type: type as any } },
      { onSuccess: () => router.back() },
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>名称</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>类型</Text>
      <View style={styles.typeRow}>
        {types.map((t) => (
          <Pressable key={t} style={[styles.typeBtn, type === t && (t === 'income' ? styles.incomeActive : styles.expenseActive)]} onPress={() => setType(t)}>
            <Text style={[styles.typeText, type === t && styles.typeTextActive]}>{t === 'income' ? '收入' : '支出'}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>保存</Text>
      </Pressable>
    </View>
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
  typeText: { fontSize: 14 },
  typeTextActive: { color: '#fff' },
  submitBtn: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, marginTop: 24, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
})
