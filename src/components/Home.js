import React from "react";
import { Text, View,   ActivityIndicator } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import getData from "../actions";

class Home extends React.Component {
	render() {
		return this.props.loading ? (
			<View style={styles.activityIndicatorContainer}>
				<ActivityIndicator
					animating={true}
					style={[{ height: 80 }]}
					size="small"
				/>
			</View>
		) : (
			<View>
				<Text>{this.props.data[0].title}</Text>
			</View>
		);
	}
}
