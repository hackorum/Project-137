import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

export default class HomeScren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      url: "http://a0a7408ebb66.ngrok.io",
    };
  }
  getStars = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        return this.setState({ listData: response.data.data });
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };
  componentDidMount() {
    this.getStars();
  }
  render() {
    const { listData } = this.state;
    if (!listData.length) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.listData}
          renderItem={({ item, index }) => {
            console.log(item);
            return (
              <ListItem
                key={index}
                title={`Star: ${item.name}`}
                subtitle={`Distance From Earth: ${item.distance}`}
                titleStyle={styles.title}
                containerStyle={styles.listContainer}
                bottomDivider
                chevron
                onPress={() =>
                  this.props.navigation.navigate("DetailScreen", {
                    star_name: item.name,
                  })
                }
                keyExtractor={(_item, index) => index.toString()}
              />
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#edc988" },
  upperContainer: { flex: 0.1, justifyContent: "center", alignItems: "center" },
  headerText: { fontSize: 30, fontWeight: "bold", color: "#132743" },
  lowerContainer: { flex: 0.9 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyContainerText: { fontSize: 20 },
  title: { fontSize: 18, fontWeight: "bold", color: "#d7385e" },
  listContainer: { backgroundColor: "#eeecda" },
});
