import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapView } from "expo";
import Client from 'predicthq';

let client = new Client({access_token: "jiK4GKwAlDUq2MG5D9xqv2d1n6PKJd"});

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Search Results',
  };

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoading: true,
      nextUrl: null,
      distance: 1
    };
  }

  getEvents () {
    return client.events.search({'within': `${this.state.distance}km@45.4948609,-73.5780571`});
  }

 async getMore() {
    var rr = await this.getEvents();
    console.log(rr.result);
    var temp = this.state.events;
    for (let i = 0; i < rr.result.results.length; i++) {
      temp.push(rr.result.results[i]);
    }
    this.setState({
      events: temp,
      distance: this.state.distance + 1,
    });
  }

  async componentWillMount() {
    var rr = await this.getEvents();
    console.log(rr.result);
    this.setState({
      events: rr.result.results,
      isLoading: false,
      distance: this.state.distance + 1,
    });
  }

  render() {
    return (
      <View style={{ flex: 1}}>
      <MapView
        style={{
          flex: 1,
          height: 100,
        }}
        initialRegion={{
          latitude: 45.4948609,
          longitude: -73.5780571,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
      { this.state.isLoading ? null :
        this.state.events.map((event, index) => {
          const coords = {
              latitude: event.location[1],
              longitude: event.location[0],
          };
     
     
          return (
              <MapView.Marker
                 key={index}
                 coordinate={coords}
                 title={event.title}
                 description={event.description}
              />
          );
        })
     }
      </MapView>
      <TouchableOpacity onPress={() => this.getMore()} style={{ position: 'absolute', bottom: 60, left: 40 ,width: '80%', }}>
          <Text style={{ fontSize: 16,backgroundColor: '#586cb2', overflow: 'hidden', borderRadius: 10, color: '#fff', textAlign: 'center',
        paddingVertical: 10}}>
            See more
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
