import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View } from 'react-native';

class IsTyping extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0.1);
    this.animatedValue2 = new Animated.Value(0.1);
    this.animatedValue3 = new Animated.Value(0.1);
  }

  componentDidMount() {
    this.footerAnimation();
  }

  footerAnimation() {
    this.animate1();
    this.animate2();
    this.animate3();
  }

  animate1() {
    const self = this;
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 400,
    }).start(() => {
      self.animatedValue.setValue(0.1);
    });
  }

  animate2() {
    const self = this;
    Animated.timing(this.animatedValue2, {
      toValue: 1,
      duration: 400,
      delay: 200,
    }).start(() => {
      self.animatedValue2.setValue(0.1);
    });
  }

  animate3() {
    const self = this;
    Animated.timing(this.animatedValue3, {
      toValue: 1,
      duration: 400,
      delay: 400,
    }).start(() => {
      self.animatedValue3.setValue(0.1);
      self.footerAnimation();
    });
  }

  render() {
    const animatedStyle = {
      opacity: this.animatedValue,
    };
    const animatedStyle2 = {
      opacity: this.animatedValue2,
    };
    const animatedStyle3 = {
      opacity: this.animatedValue3,
    };
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.circle, animatedStyle, { backgroundColor: this.props.circleColor }]}
        />
        <Animated.View
          style={[styles.circle, animatedStyle2, { backgroundColor: this.props.circleColor }]}
        />
        <Animated.View
          style={[styles.circle, animatedStyle3, { backgroundColor: this.props.circleColor }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 20,
    alignItems: 'flex-end',
    marginBottom: 8,
    marginLeft: 6,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    marginLeft: 4,
  },
});

IsTyping.propTypes = {
  circleColor: PropTypes.string,
};

IsTyping.defaultProps = {
  circleColor: '#3c5396',
};

export default IsTyping;
