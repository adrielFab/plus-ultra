import React from 'react';
import { TextInput,Modal, Image, Text, View, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
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
      events: [
          {
            title: "Pickup basketball",
            description: "Looking for some 5v5",
            latitude: 45.496326, 
            longitude: -73.580506,
            image: 'https://img.freepik.com/free-photo/portrait-blonde-young-woman-looking-camera-against-gray-background_23-2148029484.jpg',
          },
          {
            title: "Volleyball Match",
            description: "Looking for a couple of players to play a friendly match",
            latitude: 45.504149, 
            longitude: -73.575892,
            image: 'https://image.freepik.com/free-photo/closeup-portrait-smiling-handsome-asian-man_1262-3728.jpg',
          },
          {
            title: "Spikeball tournament",
            description: "Looking for a partner to have fun",
            latitude: 45.497261, 
            longitude: -73.584669,
            image: 'https://image.freepik.com/free-photo/worldface-ugandan-man-white-background_53876-30388.jpg',
          },
          {
            title: "Trivia night",
            description: "Looking for some people to join our trivia nights",
            latitude: 45.496326, 
            longitude: -73.590506,
            image: 'https://image.freepik.com/free-photo/woman-doing-close-up-photoshoot-studio_53876-14476.jpg',
          },
          {
            title: "Basketball",
            description: "Someone to shoot around with",
            latitude: 45.491261, 
            longitude: -73.584669,
            image: 'https://image.freepik.com/free-photo/young-asian-girl-portrait-isolated_53876-30590.jpg',
          },
          {
            title: "Pickup basketball",
            description: "Looking for some 5v5",
            latitude: 48.496326, 
            longitude: -73.580506,
            image: 'https://img.freepik.com/free-photo/portrait-blonde-young-woman-looking-camera-against-gray-background_23-2148029484.jpg',
          },
          {
            title: "Basketball rivalry",
            description: "1v1 Come at me",
            latitude: 45.4951984,
            longitude: -73.5734846,
            image: 'https://image.freepik.com/free-photo/worldface-ugandan-man-white-background_53876-30388.jpg',
          },
          {
            title: "Basketball",
            description: "Just shooting around",
            latitude: 45.501447, 
            longitude: -73.570929,
            image: 'https://image.freepik.com/free-photo/smiling-attractive-young-man-looking-camera-winking-friendly-indian-guy_1262-14382.jpg',
          },
          {
            title: "Pool Tournament",
            description: "Friendly match",
            latitude: 45.490394, 
            longitude: -73.580699,
            image: 'https://image.freepik.com/free-photo/smiling-attractive-young-man-looking-camera-winking-friendly-indian-guy_1262-14382.jpg',
          },
          {
            title: "Exhibition basketball",
            description: "For the fun of it :D",
            latitude: 45.497195, 
            longitude: -73.570495,
            image: 'https://image.freepik.com/free-photo/closeup-portrait-smiling-handsome-asian-man_1262-3728.jpg',
          },
      ],
      isLoading: false,
      nextUrl: null,
      distance: 1,
      eventSelected: null,
      modalVisible: false,
      newtitle: null,
      newdescription: null,
    };
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  getEvents () {
    return client.events.search({'within': `${this.state.distance}km@45.4948609,-73.5780571`});
  }

 async getMore() {
  Alert.alert(
    'You join the event',
    'You will be receiving information about the event shortly',
    [
      {
        text: 'OK',
      },
    ],
    {
      cancelable: false,
    },
  );  }

  async componentWillMount() {
    // var rr = await this.getEvents();
    // console.log(rr.result);
    // this.setState({
    //   events: rr.result.results,
    //   isLoading: false,
    //   distance: this.state.distance + 1,
    // });
  }

  mapClick(event) {
    console.log(event);
    this.setModalVisible(true);
    
  }

  markerClick(event) {
    console.log(event);
    this.setState({
      eventSelected: event
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
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0221
        }}
        showsUserLocation={true}
        onPress={(b) => this.mapClick(b.nativeEvent) }
      >
      { this.state.isLoading ? null :
        this.state.events.map((event, index) => {
          const coords = {
              latitude: event.latitude,
              longitude: event.longitude,
          };
          if (!event.title.toLowerCase().includes('basket')) {
              return;
          }
     
     
          return (
              <MapView.Marker
                 key={index}
                 coordinate={coords}
                 title={event.title}
                 description={event.description}
                 onPress={(e) => { e.stopPropagation(); this.markerClick(event)}}
              >
                    <Image
                      source={{ uri: event.image }}
                      style={{ width: 40, height: 40, borderRadius: 20}}
                    ></Image>
              </MapView.Marker>
          );
        })
     }
      </MapView>
              {
                this.state.eventSelected === null ? null :
                (
                  <TouchableOpacity onPress={() => this.getMore()} style={{ color: '#fff', backgroundColor: '#586cb2', overflow: 'hidden', borderRadius: 10, position: 'absolute', bottom: 60, left: 40 ,width: '80%', padding: 10 }}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View>
                      <Text style={{ fontSize: 22, color: '#fff', width: '80%'}}>
                      {this.state.eventSelected.title}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#eee'}}>
                      {this.state.eventSelected.description}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#eee'}}>
                      Time: 4pm
                    </Text>

                      </View>
                      <View>
                        <Image
                        source={{ uri: this.state.eventSelected.image }}
                        style={{ width: 40, height: 40, borderRadius: 20}}
                      ></Image>
                      </View>
                    </View>
                    <Text style={{ width: '100%',backgroundColor: '#fff', textAlign: 'center', borderRadius: 10, overflow: 'hidden', marginTop: 5, padding: 10}}>
                      Join Event
                    </Text>

                  </TouchableOpacity>

                )
              }
      </View>
    );
  }
}
