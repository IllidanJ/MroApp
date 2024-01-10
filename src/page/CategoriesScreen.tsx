import {FlatList, SafeAreaView} from 'react-native';
import {CATEGORIES} from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = ({navigation}) => {
  function onPressHandler(id) {
    navigation.navigate('MealsOverview', {
      id: id,
    });
  }

  function renderItem(itemDate) {
    return (
      <CategoryGridTile
        id={itemDate.item.id}
        title={itemDate.item.title}
        color={itemDate.item.color}
        onPress={() => onPressHandler(itemDate.item.id)}
      />
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;
