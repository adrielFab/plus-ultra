import React from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {GiftedChat} from 'react-native-gifted-chat';
import { create} from 'apisauce';
import Client from 'predicthq';

let client = new Client({access_token: "jiK4GKwAlDUq2MG5D9xqv2d1n6PKJd"});

let id = 1;
export default class LinksScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typingText: null,
    }
    this.renderFooter = this.renderFooter.bind(this);
  }

  getEvents () {
    return client.events.search({'within': '10km@45.4948609,-73.5780571'})
      
  }

  async componentWillMount() {
    var p =  await this.getEvents();
    console.log(p);
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hey there Buddy, what are your looking for?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  isTyping() {
    this.setState({
      typingText: 'Binky Is Typing'
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    this.isTyping();
    this.decideWhatToDo(messages[0].text);
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  async decideWhatToDo(text) {
    var aa = "jumbo";
    id += 1;

    if (text.includes('event')) {
      aa = "Here are some events currently in your area...";
      var res = await this.getEvents();
      console.log(res);
      setTimeout(() => {
        const message = {
          _id: id,
          text: aa,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        };
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, [message]),
          typingText: null
        }))
      }, 1000);
      this.getEvents();
    } else {
      setTimeout(() => {
        const message = {
          _id: id,
          text: aa,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        };
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, [message]),
          typingText: null
        }))
      }, 1000);
    }
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        renderFooter={this.renderFooter}
      />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
