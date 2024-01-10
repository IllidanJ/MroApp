import {useRoute} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {CATEGORIES, MEALS} from '../data/dummy-data';
import {useEffect, useLayoutEffect} from 'react';
import MealList from '../components/MealList/MealList';

const MealsOverviewScreen = ({route, navigation}) => {
  //const route = useRoute();
  //const params = route.params;
  const params = route.params || {};

  const displayedMeals = MEALS.filter(item => {
    return item.categoryIds.indexOf(params.id) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      category => category.id === params.id,
    )?.title;
    console.log(categoryTitle);
    if (categoryTitle) {
      navigation.setOptions({
        title: categoryTitle,
      });
    }
  }, [params.id, navigation]);

  return <MealList items={displayedMeals} />;
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
