import React from "react";
import {
	TouchableOpacity,
	Image,
	ScrollView,
	 
	Text,
	View
} from "react-native";
import { Actions } from "react-native-router-flux";
import StarRating from "react-native-star-rating";
import ColoredButton from "./ColoredButton"
export default class FeaturedServices extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<View style={{marginTop:10,
			 flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
			}}>
				<View style={{
					width: '32%',
					marginRight: '2%'
					}}>
					<Image
						style={{
							height: 142,
							width: '100%'
	 					}}
						source={require("../images/flower1.jpg")}
					/>
					<Text style={{
						fontFamily: "Lato-Black",
						fontSize: 17,
						fontWeight: "bold",
						letterSpacing: 0.49,
						color: "#000000",
						marginTop: '5%'
					}}>Connecto Flower Power</Text>
					<StarRating
						disabled={true}
						maxStars={5}
						starSize={20}
						rating={3}
						selectedStar={rating => {
							//  
						}}
						buttonStyle={{
							// width: 15,
							// height: 15,
							// marginRight: 5
						}}
						containerStyle={{
							width: "75%",
							marginTop: "5%",
						}}
					/>
					<ColoredButton
						text="Contact now!"
						containerStyle={{
							backgroundColor: "#005555",
							justifyContent: "center",
							width: '75%',
							height: 30,
							marginTop: '5%'
						}}
						textStyle={{ fontSize: 12, fontFamily: "Lato-Light",color: "#ffffff" }}
						onPress={this.props.onFirstButtonPress}
					/>
				</View>
				<View style={{
					width: '32%',
					marginRight: '2%'
					}}>
					<Image
						style={{
							height: 142,
							width: '100%'
						}}
						source={require("../images/flower2.jpg")}
					/>
					<Text style={{
						fontFamily: "Lato-Black",
						fontSize: 17,
						fontWeight: "bold",
						letterSpacing: 0.49,
						color: "#000000",
						marginTop: '5%'
					}}>Connecto Flower Power</Text>
					<StarRating
						disabled={true}
						maxStars={5}
						starSize={20}
						rating={3}
						selectedStar={rating => {
							//  
						}}
						buttonStyle={{
							// width: 15,
							// height: 15,
							// marginRight: 5
						}}
						containerStyle={{
							width: "75%",
							marginTop: "5%",
						}}
					/>
					<ColoredButton
						text="Contact now!"
						containerStyle={{
							backgroundColor: "#005555",
							justifyContent: "center",
							width: '75%',
							height: 30,
							marginTop: '5%'
						}}
						textStyle={{ fontSize: 12, fontFamily: "Lato-Light",color: "#ffffff" }}
						onPress={this.props.onFirstButtonPress}
					/>
				</View>
				<View style={{
					width: '32%',
					}}>
					<Image
						style={{
							height: 142,
							width: '100%'
						}}
						source={require("../images/flower3.jpg")}
					/>
					<Text style={{
						fontFamily: "Lato-Black",
						fontSize: 17,
						fontWeight: "bold",
						letterSpacing: 0.49,
						color: "#000000",
						marginTop: '5%'
					}}>Connecto Flower Power</Text>
					<StarRating
						disabled={true}
						maxStars={5}
						starSize={20}
						rating={3}
						selectedStar={rating => {
							//  
						}}
						buttonStyle={{
							// width: 15,
							// height: 15,
							// marginRight: 5
						}}
						containerStyle={{
							width: "75%",
							marginTop: "5%",
						}}
					/>
					<ColoredButton
						text="Contact now!"
						containerStyle={{
							backgroundColor: "#005555",
							justifyContent: "center",
							width: '75%',
							height: 30,
							marginTop: '5%'
						}}
						textStyle={{ fontSize: 12, fontFamily: "Lato-Light",color: "#ffffff" }}
						onPress={this.props.onFirstButtonPress}
					/>
				</View>
			</View>


			);
	};


	}
