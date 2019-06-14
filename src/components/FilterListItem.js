import React from "react";
import {   View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class FilterListItem extends React.Component {
	render() {
		return (
			<TouchableOpacity
				style={{
					flexDirection: "row", width: '100%'
				}}
				onPress={this.props.onPress}
			>
				<Icon
					style={{  fontSize: 15 }}
					name={this.props.isSelected ? "rhombus" : "rhombus-outline"}
				/>
				<Text
					style={{
						fontFamily: "Lato-Black",
						marginLeft: 10,
						...this.props.textStyle
					}}
				>
					{this.props.text}
				</Text>
			</TouchableOpacity>
		);
	}
}
