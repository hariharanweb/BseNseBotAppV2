import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const percentageChanges = [5, 4, 3, 2, 1.5, 1, 0.5, 0, -0.5, -1, -1.5, -2, -3, -4, -5];

const getBackgroundColor = (percentage: number) => {
  if (percentage === 0) return '#E0E0E0';

  if (percentage > 0) {
    // Positive - shades of green (lighter to darker as percentage increases)
    const intensity = Math.min(Math.abs(percentage) / 5, 1); // Normalize to 0-1
    const r = Math.floor(200 - (intensity * 200)); // 200 to 0
    const g = Math.floor(255 - (intensity * 127)); // 255 to 128
    const b = Math.floor(200 - (intensity * 200)); // 200 to 0
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Negative - shades of red (lighter to darker as percentage decreases)
    const intensity = Math.min(Math.abs(percentage) / 5, 1); // Normalize to 0-1
    const r = Math.floor(255 - (intensity * 55)); // 255 to 200
    const g = Math.floor(200 - (intensity * 200)); // 200 to 0
    const b = Math.floor(200 - (intensity * 200)); // 200 to 0
    return `rgb(${r}, ${g}, ${b})`;
  }
};

export default function Calc() {
  const [stockPrice, setStockPrice] = useState('');
  const colorScheme = useColorScheme();

  const price = parseFloat(stockPrice) || 0;
  const tax = price * 0.001; // 0.1% tax
  const priceWithTax = price + tax;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Stock Price</Text>
        <TextInput
          style={[styles.input, {
            color: Colors[colorScheme ?? 'light'].text,
            borderColor: Colors[colorScheme ?? 'light'].icon
          }]}
          value={stockPrice}
          onChangeText={setStockPrice}
          placeholder="Enter stock price"
          placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.resultContainer}>
        <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Price with tax</Text>
        <Text style={[styles.resultText, { color: Colors[colorScheme ?? 'light'].text }]}>
          {priceWithTax.toFixed(2)}
        </Text>
      </View>

      <FlatList
        data={percentageChanges}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => {
          const calculatedValue = priceWithTax * (1 + item / 100);
          const backgroundColor = getBackgroundColor(item);
          const sign = item > 0 ? '+' : '';
          const textColor = Math.abs(item) >= 4 ? '#FFFFFF' : '#000000';

          return (
            <View style={[styles.listItem, { backgroundColor }]}>
              <Text style={[styles.percentageText, { color: textColor }]}>{sign}{item}%</Text>
              <Text style={[styles.valueText, { color: textColor }]}>{calculatedValue.toFixed(2)}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  resultContainer: {
    marginBottom: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
    borderRadius: 8,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  valueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
