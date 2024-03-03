import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

const MovieDetailScreen = ({route}) => {
  // const {movie} = route.params;

  // get data from redux
  const movie = useSelector(state => state.selectedMovie);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
          }}
          style={styles.poster}
          resizeMode="contain"
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Title: {movie?.title}</Text>
          <Text style={styles.rating}>
            Rating: {parseInt(movie?.vote_average)}
          </Text>
          <Text style={styles.overview}>Overview: {movie?.overview}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: width * 1.5,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    fontSize: width * 0.03,
    marginBottom: 10,
  },
  overview: {
    fontSize: width * 0.04,
  },
});
