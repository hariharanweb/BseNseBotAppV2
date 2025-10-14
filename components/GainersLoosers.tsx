import Entry from '@/components/Entry';
import Api, { APIResponse, ScreenType } from '@/service/Api';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const ListHeader = (header: string) => () =>
  (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{header}</Text>
    </View>
  );

const GainersLoosers = ({
  type = ScreenType.LOOSERS,
  allStocks,
}: {
  type: ScreenType;
  allStocks: boolean;
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

  const dataToDisplay = allStocks ? data?.gainersAndLoosers : data?.interesting;
  const headerText = allStocks ? 'All Stocks' : 'Interesting';
  return (
    loaded &&
    dataToDisplay && (
      <>
        <FlatList
          data={dataToDisplay}
          ListHeaderComponent={ListHeader(headerText)}
          stickyHeaderIndices={[0]}
          renderItem={({item}) => (
            <>
              <Entry entry={item} type={type} />
            </>
          )}
        />
      </>
    )
  );
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
});

export default GainersLoosers;
