import Entry from '@/components/Entry';
import Api, { APIResponse, ScreenType } from '@/service/Api';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

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

  if(loaded && data){
    return (
      <>
        <FlatList
          data={data?.interesting}
          ListHeaderComponent={ListHeader('Interesting')}
          stickyHeaderIndices={[0]}
          renderItem={({ item }) => (
            <Entry entry={item} type={type} />
          )}
        />
        <FlatList
          data={data?.gainersAndLoosers}
          ListHeaderComponent={ListHeader('All Stocks')}
          stickyHeaderIndices={[0]}
          renderItem={({ item }) => (
            <Entry entry={item} type={type} />
          )}
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
