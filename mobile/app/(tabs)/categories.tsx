import { View, FlatList, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { Link } from 'expo-router'
import { useCategories, useDeleteCategory } from '../../src/hooks/useCategories'

const typeLabels: Record<string, string> = {
  income: '收入',
  expense: '支出',
}

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories()
  const deleteCategory = useDeleteCategory()

  if (isLoading) return <View style={styles.container}><Text>加载中...</Text></View>

  return (
    <View style={styles.container}>
      <Link href="/categories/new" asChild>
        <Pressable style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ 新增分类</Text>
        </Pressable>
      </Link>
      <FlatList
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardName}>{item.icon ?? '📁'} {item.name}</Text>
              <Text style={[styles.cardType, item.type === 'income' ? styles.income : styles.expense]}>
                {typeLabels[item.type]}
              </Text>
            </View>
            <View style={styles.cardActions}>
              <Link href={`/categories/${item.id}/edit`} asChild>
                <Pressable style={styles.actionBtn}>
                  <Text>编辑</Text>
                </Pressable>
              </Link>
              <Pressable
                style={[styles.actionBtn, styles.deleteBtn]}
                onPress={() => {
                  Alert.alert('确认删除', `删除分类「${item.name}」？`, [
                    { text: '取消', style: 'cancel' },
                    { text: '删除', style: 'destructive', onPress: () => deleteCategory.mutate(item.id) },
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
  cardType: { fontSize: 14 },
  income: { color: '#28a745' },
  expense: { color: '#dc3545' },
  cardActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 4, borderWidth: 1, borderColor: '#ddd' },
  deleteBtn: { borderColor: '#ff4444' },
  deleteText: { color: '#ff4444' },
})
