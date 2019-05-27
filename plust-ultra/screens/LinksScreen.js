/**
 * Main Screen and Page
 */
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import IsTyping from '../components/IsTyping';

let id = 0;
var defaultText = 1;
var photoAvatar = require('../images/ConUBot.png');

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Convo',
    headerStyle: {
      backgroundColor: '#335075'
    },
    //title color
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typingText: null
    };
    this.renderFooter = this.renderFooter.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hey there developer!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: photoAvatar
          }
        }
      ]
    });
  }

  isTyping() {
    this.setState({
      typingText: 'Binky Is Typing'
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    this.isTyping();
    this.decideWhatToDo(messages[0].text);
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return <IsTyping circleColor="#3c5396" />;
    }
    return null;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  async decideWhatToDo(text) {
    if (text.toLowerCase().includes('basket')) {
      setTimeout(() => {
        const message = {
          _id: id,
          text: 'Looks like some are hosting some events',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: photoAvatar
          }
        };
        id += 1;
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, [message])
        }));
        setTimeout(() => {
          const message = {
            _id: id,
            text: 'Here are some of the closest events near you',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: photoAvatar
            }
          };
          id += 1;
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [message]),
            typingText: null
          }));
          setTimeout(() => {
            id += 1;
            this.props.navigation.navigate('People');
          }, 5000);
        }, 4000);
      }, 4000);
      return;
    }
    id += 1;
    keyword = '';
    heritage_index = ['heritage', 'history'];
    cultural_index = [
      'culture',
      'museum',
      'theatre',
      'cinema',
      'show room',
      'performance',
      'exhibition'
    ];
    event_index = ['event'];
    pool_index = ['pool', 'swim', 'swimming', 'water'];
    school_index = ['school', 'study'];
    library_index = ['library'];
    indexes = [
      heritage_index,
      cultural_index,
      event_index,
      pool_index,
      school_index,
      library_index
    ];

    for (var j in indexes) {
      index = indexes[j];
      key = index[0];
      for (var i = 0; i < index.length; i++) {
        keyword = index[i];
        if (text.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
          this.analyze(text, key);
          return;
        }
      }

      if (j == indexes.length - 1) {
        console.log('i ' + i + 'indexes.length ' + indexes.length);
        this.responseSpecify();
      }
    }
  }

  responseSpecify() {
    var bob = [
      'What are you looking for today?',
      'Let us serve you to our fullest potential, can you share what you need?',
      'So how can we help you?'
    ];
    var msg = bob[this.getRandomInt(3)];
    id += 1;
    setTimeout(() => {
      const message = {
        _id: id,
        text: msg,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: photoAvatar
        }
      };
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [message]),
        typingText: null
      }));
      id += 1;
    }, 1000);
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#335075'
          }
        }}
      />
    );
  }

  analyze(text, key) {
    id += 1;
    setTimeout(() => {
      const message = {
        _id: id,
        text: `Looking for the nearest ${key}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: photoAvatar
        }
      };
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [message])
      }));
      json = this.parseJson(key);
      id += 3;
      setTimeout(() => {
        const message = {
          _id: id,
          text: `Here is a ${key} we found`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: photoAvatar
          }
        };
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, [message]),
          typingText: null
        }));
        id += 1;
        setTimeout(() => {
          id += 1;
          this.props.navigation.navigate('Settings', { json: json, key: key });
        }, 3000);
      }, 4000);
    }, 3000);
  }

  parseJson(key) {
    switch (key) {
      case 'pool':
        return require('../datasets/pool.json');
      case 'school':
        return require('../datasets/school.json');
      case 'monuments':
        return require('../datasets/monuments.json');
      case 'culture':
        return require('../datasets/culturalplaces.json');
      case 'heritage':
        return require('../datasets/heritage_sites.json');
      default:
        return;
    }
  }

  loadData() {}

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
          renderFooter={this.renderFooter}
          renderBubble={this.renderBubble}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#335075'
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerText: {
    fontSize: 14,
    color: '#335075'
  }
});
