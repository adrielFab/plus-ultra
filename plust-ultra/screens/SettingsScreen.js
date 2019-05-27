/**
 * Facility and location page
 */
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

  componentWillMount() {
    // var rr = await this.getEvents();
    // console.log(rr.result);
    // console.log(this.props.navigation.state.params.json)
    this.setState({
      distance: this.state.distance + 1,
      json: this.props.navigation.state.params.json,
      key: this.props.navigation.state.params.key,
    });
    this.match()
  }

  getEvents () {
    return client.events.search({'within': `${this.state.distance}km@45.4948609,-73.5780571`});
  }

  match(){
    var concordiaCoord = {latitude: 45.4954, longitude: -73.5792}
    var temp = {};
    temp['distance'] = 1000000;
    var lat;
    var name;
    var long;
    var address;
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
      } else if (key == "heritage"){
        lat = json[i]["LAT"]
        long = json[i]["LONG"]
        name = json[i]["NAME"]
        address = json[i]["ADDRESS"]
      } else if (key == "festival"){
        lat = json[i]["LAT"]
        long = json[i]["LONG"]
        name = json[i]["NAME"]
        address = json[i]["ADDRESS"]
      } else if (key == "art"){
        lat = json[i]["LAT"]
        long = json[i]["LONG"]
        name = json[i]["ARTWORK"]
        address = json[i]["ADDRESS"]
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
        temp['name'] = location['name']
      }
    }
    console.log('BRUHH' +  temp);
    this.setState({
      location: temp,
    }, () => {
    this.setState({isLoading: false})
    });
  }

  matchMore(matched){
    var concordiaCoord = {latitude: 45.4954, longitude: -73.5792}
    var temp = {};
    temp['distance'] = 1000000;
    var lat;
    var name;
    var long;
    var address;

    console.log(json.length)
    lat = ""
    long = ""
    for (var j=0; j<json.length; j++){
      if (key == "pool"){
        lat = json[j]["LAT"]
        long = json[j]["LONG"]
      } else if (key == "culture"){
        lat = json[j]["Latitude"]
        long = json[j]["Longitude"]
      } else if (key == "heritage"){
        lat = json[j]["LAT"]
        long = json[j]["LONG"]
      } else if (key == "festival"){
        lat = json[j]["LAT"]
        long = json[j]["LONG"]
      } else if (key == "art"){
        lat = json[j]["LAT"]
        lat = json[j]["LONG"]
      }

      if (lat === matched["lat"] && long === matched["long"]){
        json.splice(j, 1);
      }
    }
    console.log(json.length)

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
      } else if (key == "heritage"){
        lat = json[i]["LAT"]
        long = json[i]["LONG"]
        name = json[i]["NAME"]
        address = json[i]["ADDRESS"]
      } else if (key == "festival"){
        lat = json[i]["LAT"]
        long = json[i]["LONG"]
        name = json[i]["NAME"]
        address = json[i]["ADDRESS"]
      } else if (key == "art"){
        lat = json[i]["LAT"]
        long = json[i]["LONG"]
        name = json[i]["ARTWORK"]
        address = json[i]["ADDRESS"]
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
        temp['name'] = location['name']
      }
    }
    console.log('BRUHH' +  temp);
    this.setState({
      location: temp,
    }, () => {
    this.setState({isLoading: false})
    });
  }

 async getMore() {
    var rr = await this.getEvents();
    console.log(this.state.location)
    this.matchMore(this.state.location)
    var temp = this.state.events;
    for (let i = 0; i < rr.result.results.length; i++) {
      temp.push(rr.result.results[i]);
    }
    this.setState({
      events: temp,
      distance: this.state.distance + 1,
    });
  }

  render() {
    console.log(this.state.location);

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
          longitudeDelta: 0.0121
        }}
        showsUserLocation={true}
      >
      <MapView.Marker
         coordinate={{
           latitude: this.state.location['lat'],
           longitude: this.state.location['long']
         }}
         title={this.state.location.name}
         description={this.state.location.address}
      />
      </MapView>
      <TouchableOpacity onPress={() => this.getMore()} style={{ backgroundColor: '#586cb2', overflow: 'hidden', borderRadius: 10,  position: 'absolute', bottom: 60, left: 40 ,width: '80%', padding: 10, }}>
          <Text style={{ fontSize: 21, color: '#fff' }}>
            {this.state.location.name}
          </Text>
          <Text style={{ fontSize: 16, color: '#eee'}}>
            {this.state.location.address}
          </Text>

          <Text style={{ width: '100%',backgroundColor: '#fff', textAlign: 'center', borderRadius: 10, overflow: 'hidden', marginTop: 5, padding: 10}}>
            See more
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
