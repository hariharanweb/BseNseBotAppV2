import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import Api, { APIResponse, ScreenType } from '../service/Api';
import Entry from './Entry';

const ListHeader = (header: string) => () =>
(
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{header}</Text>
  </View>
);

const GainersLoosers = ({
  type = ScreenType.LOOSERS
}: {
  type: ScreenType;
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<APIResponse>();

  useEffect(() => {
    (async () => {
      if (!loaded) {
        const jsonData = await Api.get(type);
        setData(jsonData);
        setLoaded(true);
      }
    })();
  }, [loaded, type]);

  const onRefresh = async () => {
    setRefreshing(true);
    const jsonData = await Api.get(type);
    setData(jsonData);
    setRefreshing(false);
  };

  if (loaded && data) {
    return (
      <>
        <FlatList
          data={data?.interesting}
          ListHeaderComponent={ListHeader('Interesting')}
          stickyHeaderIndices={[0]}
          renderItem={({ item }) => (
            <Entry entry={item} type={type} />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        <FlatList
          data={data?.gainersAndLoosers}
          ListHeaderComponent={ListHeader('All Stocks')}
          stickyHeaderIndices={[0]}
          renderItem={({ item }) => (
            <Entry entry={item} type={type} />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </>
    );
  } else {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" />
      </View>
    )
  }


};
const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  headerText: {
    fontSize: 20,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  }
});

export default GainersLoosers;
