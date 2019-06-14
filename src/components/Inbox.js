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
import { Header } from "react-native-elements";

export default class Inbox extends React.Component {
	render() {
		return (
			<View>
				<View style={{ flexDirection: "row" }}>
					<Image
						style={{ marginLeft: "6%", marginTop: "6%", height: 29, width: 29 }}
						source={require("../../assets/openMessage.png")}
					/>
					<Text
						style={{
							marginTop: "8.5%",
							paddingLeft: 10,
							fontSize: 19,
							fontFamily: "Lato-Black"
						}}
					>
						INBOX
					</Text>
					<TouchableOpacity style={{ marginTop: "8.5%", marginLeft: "46%" }}>
						<Image
							style={{
								marginLeft: "9.5%",
								marginTop: "10.9%",
								height: 15,
								width: 16
							}}
							source={require("../../assets/newmsg.png")}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={{ marginTop: "8.5%", marginLeft: "-2%" }}>
						<Image
							style={{
								marginLeft: "9.5%",
								marginTop: "8%",
								height: 15,
								width: 18
							}}
							source={require("../../assets/find.png")}
						/>
					</TouchableOpacity>
				</View>
				<Text
					style={{
						marginLeft: "6.2%",
						marginTop: "1.5%",
						fontFamily: "Lato-Light",
						fontSize: 12
					}}
				>
					You have no unread messages.
				</Text>
				<ScrollView style={{ width: "100%", height: "100%" }} />
			</View>
		);
	}
}
