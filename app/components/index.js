import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  AppRegistry
} from 'react-native';

import GiftedListView from 'react-native-gifted-listview';
import API from './../api/api';
class reactNativeHandlePaginationExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieCount: 0
    };
    this.onFetch = this.onFetch.bind(this);
  }
 
  onFetch(page = 1, callback, options) {
    let rowArray = [];
    Promise.resolve(API.getAllMovies(page))
    .then((response) => {
      this.setState({
        movieCount: response.data.movie_count
      });
      response.data.movies.map((object) => {
        rowArray.push(object);
      });
    }).then(() => {
      if (page === Math.round(this.state.movieCount / 20)) {
        callback(rowArray, {
          allLoaded: true,
        });
      } else {
        callback(rowArray);
      }
    });
    setTimeout(() => {
    }, 1000);
  }

  renderMoviesRow(rowData) {
    return (
      <TouchableHighlight
        underlayColor="#dddddd"
      >
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.thumbLeft}>
              <Image
                style={styles.thumbLeft}
                source={{ uri: rowData.large_cover_image }}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {rowData.title_long}
              </Text>
              <Text style={styles.label} numberOfLines={3}>
                {rowData.summary}
              </Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.card} >
            <GiftedListView
              rowView={this.renderMoviesRow}
              onFetch={this.onFetch}
              firstLoader={true} // display a loader for the first fetching
              pagination={true} // enable infinite scrolling using touch to load more
              refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
              withSections={false} // enable sections
              customStyles={{
                paginationView: {
                  backgroundColor: '#eee',
                },
              }}

              refreshableTintColor="blue"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  tabView: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  thumbLeft: {
    width: 60,
    height: 80,
    resizeMode: 'stretch',
    backgroundColor: 'white',
    marginRight: 10,
  },
  thumbText: {
    fontSize: 20,
    padding: 20,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#d8d8d8'
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  label: {
    color: 'black'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 4,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  }
});

AppRegistry.registerComponent('reactNativeHandlePaginationExample', () => reactNativeHandlePaginationExample);

