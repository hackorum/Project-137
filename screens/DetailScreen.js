import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";

export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      url: `http://a0a7408ebb66.ngrok.io/star?name=${this.props.navigation.getParam(
        "star_name"
      )}`,
    };
  }
  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          details: response.data.data,
        });
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };
  componentDidMount() {
    this.getDetails();
    console.log(this.props.navigation.getParam("star_name"));
  }
  render() {
    const { details } = this.state;
    return (
      <View style={styles.container}>
        <Card title={details.name}>
          <View>
            <Text
              style={styles.cardItem}
            >{`Distance From Earth: ${details.distance}`}</Text>
            <Text style={styles.cardItem}>{`Gravity: ${details.gravity}`}</Text>
            <Text style={styles.cardItem}>{`Star Mass: ${details.mass}`}</Text>
            <Text
              style={styles.cardItem}
            >{`Star Radius: ${details.radius}`}</Text>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardItem: {
    marginBottom: 10,
  },
});
