import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {GiftedChat} from 'react-native-gifted-chat';

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

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
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
    id += 1;
    setTimeout(() => {
      const message = {
        _id: id,
        text: 'YOU SUCK',
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
    backgroundColor: '#335075',
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#335075',
  },
});
