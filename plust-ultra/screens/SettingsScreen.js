import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapView } from "expo";
import Client from 'predicthq';
import geolib from 'geolib';

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
      distance: 1,
      key: null,
      location: null,
    };
  }

  getEvents () {
    return client.events.search({'within': `${this.state.distance}km@45.4948609,-73.5780571`});
  }

  match(){
    var concordiaCoord = {latitude: 45.4954, longitude: -73.5792}
    var temp = {};
    temp['distance'] = 10000;
    for (var i=0; i<json.length; i++){
      if (key == "pool"){
        lat = json[i]["LAT"]
        name = json[i]["NOM"]
        long = json[i]["LONG"]
        address = json[i]["ADRESSE"]
      } else if (key == "culture"){
        lat = json[i]["Latitude"]
        name = json[i]["Name of the municipal cultural Place"]
        long = json[i]["Longitude"]
        address = json[i]["Address"]
      }

      var distance = geolib.getDistance(
        concordiaCoord,
        {latitude: lat, longitude: long}
      );

      location = {}
      location['distance'] = distance

      if (temp['distance'] > location['distance']){
        location['lat'] = lat
        location['name'] = name
        location['long'] = long
        location['address'] = address
        temp['lat']  = location['lat'] 
        temp['long'] = location['long']
        temp['address'] = location['address']
        temp['distance'] = location['distance']
      }
    }
    
    // temp['distance'] = temp['distance']/1000
    console.log('temp')
    console.log(temp)
    return temp
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

  componentWillMount() {
    // var rr = await this.getEvents();
    // console.log(rr.result);
    // console.log(this.props.navigation.state.params.json)
    this.setState({
      distance: this.state.distance + 1,
      json: this.props.navigation.state.params.json,
      key: this.props.navigation.state.params.key,
    });
    var location = this.match()
    console.log("location: test "+location)
    this.setState({
      location: location,
    }, () => {
    console.log("location "+this.state.location);
    this.setState({isLoading: false,})
    })
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
      <MapView.Marker
         coordinate={{
           latitude: this.state.location['lat'],
           longitude: this.state.location['long']
         }}
         title={this.state.location['name']}
         description={this.state.location['description']}
      />
      { 
        this.state.isLoading ? null :
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
