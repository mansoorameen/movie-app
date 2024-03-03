import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {saveMovieDetails} from '../redux/action';
import {useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

const MovieListScreen = ({navigation}) => {
  // state for movies list
  const [movies, setMovies] = useState([]);
  // state for sorted movies list
  const [sortedMovies, setSortedMovies] = useState([]);
  // state for loading status for movies data
  const [isLoading, setIsLoading] = useState(false);
  // state to hold the current value of the search input
  const [searchQuery, setSearchQuery] = useState('');
  // state for current page
  const [page, setPage] = useState(1);
  // state for searching or not
  const [isSearching, setIsSearching] = useState(false);
  // state for sort enabling
  const [isSortEnabled, setIsSortEnabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let timeoutId;

    // if searching
    if (isSearching) {
      // using debounce method to call search api
      // timer expires when user stops typing fot 500ms
      // avoids unnecessary multiple calls for each entry
      timeoutId = setTimeout(() => {
        if (searchQuery.trim() !== '') {
          searchMovies();
          setIsSearching(false);
        } else {
          // if search query is empty, fetch movies instead
          fetchMovies();
          setIsSearching(false);
        }
      }, 500);
    } else {
      // else if page changed
      fetchMovies();
    }

    return () => clearTimeout(timeoutId);
  }, [searchQuery, page]);

  // to sort movies alphabetically
  useEffect(() => {
    if (isSortEnabled) {
      sortMoviesAZ();
    } else fetchMovies();
  }, [isSortEnabled]);

  // function to fetch movie data
  const fetchMovies = async () => {
    // start loading indicator
    setIsLoading(true);
    try {
      // wait for the api call to return response
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`,
      );
      const data = await response.json();
      console.log('movies', data);
      setMovies(data?.results || []);
      setIsLoading(false);
    } catch (error) {
      // if api failed, show error message
      setIsLoading(false);
      Alert.alert('Oops some error occured. Please try again');
    }
  };

  // function to serach movies
  const searchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${searchQuery}`,
      );
      const data = await response.json();
      setMovies(data?.results || []);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Oops some error occured. Please try again');
      setIsLoading(false);
    }
  };

  const sortMoviesAZ = () => {
    const sortedMovies = [...movies].sort((a, b) => {
      // convert titles to lowercase for case-insensitive sorting
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      // compare titles alphabetically
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
    setMovies(sortedMovies);
  };

  // navigate to MovieDetails page onpress
  const handleMoviePress = movie => {
    // saving movie details data in redux
    dispatch(saveMovieDetails(movie));
    navigation.navigate('MovieDetailScreen');

    // movie details can also be passed via navigation
    // navigation.navigate('MovieDetailScreen', {movie});
  };

  // movie item
  const renderMovieItem = ({item}) => (
    <TouchableOpacity onPress={() => handleMoviePress(item)}>
      <View style={styles.movieItem}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500/${item?.poster_path}`}}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.movieDetails}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.rating}>
            Rating: {parseInt(item?.vote_average)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPagination = () => (
    <View style={styles.pagination}>
      <TouchableOpacity
        onPress={() => setPage(page - 1)}
        disabled={page == 1}
        style={[
          styles.reloadBtn,
          {height: 30, padding: 0, paddingHorizontal: 5},
        ]}>
        <Text style={{color: '#fff'}}>Previous</Text>
      </TouchableOpacity>
      <Text>{page}</Text>
      <TouchableOpacity
        style={[
          styles.reloadBtn,
          {height: 30, padding: 0, paddingHorizontal: 5},
        ]}
        onPress={() => setPage(page + 1)}>
        <Text style={{color: '#fff'}}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TextInput
            style={[styles.searchInput, {flex: 1}]}
            placeholder="Search movies by typing..."
            value={searchQuery}
            onChangeText={e => {
              setIsSearching(true);
              setSearchQuery(e);
            }}
          />
          <TouchableOpacity
            style={styles.reloadBtn}
            onPress={() => fetchMovies()}>
            <Text style={{color: '#fff'}}>Reload</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={[
              styles.reloadBtn,
              {backgroundColor: isSortEnabled ? 'green' : 'gray'},
            ]}
            onPress={() => {
              setIsSortEnabled(!isSortEnabled);
            }}>
            <Text style={{color: '#fff'}}>Sort A-Z</Text>
          </TouchableOpacity>
        </View>

        {/*  show loading indicator if data is fetching */}
        {isLoading ? (
          <ActivityIndicator
            size={'large'}
            style={{justifyContent: 'center', alignItems: 'center'}}
          />
        ) : (
          <>
            <FlatList
              data={movies}
              renderItem={renderMovieItem}
              keyExtractor={item => item?.id?.toString()}
              contentContainerStyle={styles.list}
              ListFooterComponent={renderPagination}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MovieListScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    flex: 1,
  },
  list: {
    paddingBottom: 20,
    marginBottom: 20,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  poster: {
    width: width * 0.3,
    height: height * 0.2,
    borderRadius: 10,
  },
  movieDetails: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: width * 0.03,
    marginTop: 5,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  reloadBtn: {
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    backgroundColor: 'green',
    padding: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
