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
    id += 1;
    keyword = "";
    heritage_index = ["heritage", "history"];
    cultural_index = ["culture", "museum", "theatre", "cinema", "show room", "performance", "exhibition"];
    event_index = ["event"];
    pool_index = ["pool"];
    school_index = ["school", "study"];
    library_index = ["library"];
    indexes = [heritage_index, cultural_index, event_index, pool_index, school_index, library_index]

    for (var j in indexes){
      index = indexes[j]
      key = index[0]
      console.log("-----")
      for (var i=0; i<index.length; i++){
        keyword = index[i]
        if (text.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
          this.analyze(text, key)
          return;
        }
      }

      if (j==indexes.length-1){
        console.log("i "+i+"indexes.length "+indexes.length)
        this.responseSpecify()
      }
    }
  }

responseSpecify(){
  var msg = "Could you please specify what activity you are looking for?";
  setTimeout(() => {
    const message = {
      _id: id,
      text: msg,
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

analyze(text, key){
  aa = "Here are some events from the "+key+" category...";
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
    }));

    setTimeout(() => {
      this.props.navigation.navigate('Settings');
    }, 3000)
  }, 1000);
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
