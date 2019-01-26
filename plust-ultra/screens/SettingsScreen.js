import React from 'react';
import { Text, View } from 'react-native';
import { MapView } from "expo";
import Client from 'predicthq';

let client = new Client({access_token: "jiK4GKwAlDUq2MG5D9xqv2d1n6PKJd"});

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
  };

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoading: true,
      nextUrl: null,
    };
  }

  getEvents () {
    return client.events.search({'within': '1km@45.4948609,-73.5780571'});
  }

  async componentWillMount() {
    var rr = await this.getEvents();
    console.log(rr.result);
    this.setState({
      events: rr.result.results,
      isLoading: false,
      nextUrl: rr.result.next,
    });
  }

  render() {
    return (
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
                 description={"ashdjkashjdhkajsdhkj"}
              />
          );
        })
     }
           <View style={{
        position: 'absolute',
        bottom: 0, right: 0
      }}>
        <Text>
          Fetch more data
        </Text>
      </View>
      </MapView>
    );
  }
}
