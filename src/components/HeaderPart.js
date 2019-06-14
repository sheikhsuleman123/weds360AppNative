import React from "react";
import {
	FlatList,
	ScrollView,
	Keyboard,
	Alert,
	 
	Text,
	View,
	TouchableOpacity,
	Image,
	TextInput,
	Dimensions
} from "react-native";

export default class HeaderPart extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, flexDirection: "row", marginTop: "15%" }}>
				<Image
					style={{ width: 27, height: 23 }}
					source={require("../images/vendors.png")}
				/>
				<Text
					style={{ paddingLeft: 7, fontFamily: "Lato-Black", fontSize: 20 }}
				>
					Vendors
				</Text>
			</View>
		);
	}
}
