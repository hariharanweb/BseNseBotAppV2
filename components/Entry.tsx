import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { MaterialIcons } from '@expo/vector-icons';
import React, { Linking, StyleSheet, Text, View } from 'react-native';
import { GainersAndLooser, ScreenType } from '../service/Api';

const Entry = ({ entry, type }: { entry: GainersAndLooser; type: ScreenType }) => {
  const colorScheme = useColorScheme();
  const positiveNegative = type === ScreenType.LOOSERS ? '' : '+';
  const valueStyle =
    type === ScreenType.LOOSERS ? styles.negativeValue : styles.positiveValue;
  const textColor = colorScheme ? Colors[colorScheme].text : Colors.dark.text
  return (
    <View style={styles.entryContainer}>
      <View style={styles.entryDetails}>
        <Text style={[styles.scripName, { color: textColor }]}>{entry.scripname}</Text>
        <Text style={[styles.scripLongName, { color: textColor }]}>{entry.LONG_NAME}</Text>
      </View>
      <View style={styles.newsContainer}>
        <MaterialIcons
          name="insert-chart-outlined"
          color={textColor}
          size={32}
          style={styles.iconStyle}
          onPress={() =>
            Linking.openURL(
              `https://www.google.com/finance/quote/${entry.scripname}:NSE`,
            )
          }
        />
      </View>
      <View style={styles.entryValue}>
        <Text style={[styles.value, {color:textColor}]}>{entry.ltradert}</Text>
        <Text
          style={
            valueStyle
          }>{`(${positiveNegative}${entry.change_percent})`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderBlockColor: 'grey',
    borderBottomWidth: 1,
    marginHorizontal: 4,
  },
  entryDetails: {
    flex: 4,
    flexDirection: 'column',
  },
  newsContainer: {
    flex: 1,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    marginRight: 0,
  },
  entryValue: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  scripName: {
    fontSize: 12,
    paddingBottom: 8,
    fontWeight: '700',
  },
  scripLongName: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    paddingBottom: 8,
    fontWeight: '400',
  },
  positiveValue: {
    color: 'green',
    fontSize: 12,
  },
  negativeValue: {
    color: 'red',
    fontSize: 12,
  },
});

export default Entry;
