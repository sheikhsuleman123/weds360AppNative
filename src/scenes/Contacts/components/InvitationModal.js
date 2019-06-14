import React from 'react';
import { TouchableOpacity, Text, View, Picker, Platform } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import ModalDropdown from 'react-native-modal-dropdown';
import ColoredButton from '@components/ColoredButton';
import OutlineTextInput from '@components/OutlineTextInput';

export default class InvitationModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			templates: ['Old', 'Young'],
      name: props.name,
      email: props.emails[0]
		};
	}

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      email: nextProps.emails[0]
    })
  }

	render() {
		return (
			<Modal isVisible={this.props.isVisible} onBackdropPress={this.props.onBackdropPress}>
				<Animatable.View animation="fadeIn">
					<TouchableOpacity
						onPress={this.props.onClosePress}
						activeOpacity={1}
						style={{
							zIndex: 1,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<View
							style={{
								backgroundColor: '#ffffff',
								width: '100%',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								...this.props.headerStyle
							}}
						>
							<Text
								style={{
									fontFamily: 'Lato-Black',
									color: '#006862',
									marginLeft: '5%',
									width: '60%',
									fontSize: 14,
									...this.props.headerTextStyle
								}}
							>
								{this.props.headerText}
							</Text>

							<Icon
								onPress={this.props.onClosePress}
								style={{ fontSize: 30 }}
								name="ios-close-outline"
							/>
						</View>
					</TouchableOpacity>
					<View
						style={{
							backgroundColor: '#ebebeb'
						}}
					>
          <View
            style={{
              backgroundColor: '#ebebeb',
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 0.5,
              borderColor: '#ffffff'
            }}
          >
            <OutlineTextInput
              style={{
                height: '80%',
                width: '50%',
                marginLeft: '8%',
                marginTop: '0%'
              }}
              placeholder="Name"
              onChangeText={text => {
                this.setState({
                  name: text
                });
              }}
              value={this.state.name}
            />
          </View>
          {this.props.emails.length && this.props.emails.length > 0? (
						<View
							style={{
								backgroundColor: '#ebebeb',
								height: 40,
								flexDirection: 'row',
								alignItems: 'center',
								borderBottomWidth: 1,
								borderColor: '#ffffff'
							}}
						>
							<View
								style={{
									flexDirection: 'column',
									width: '100%',
									marginLeft: '8%',
									height: 40,
									justifyContent: 'center'
								}}
							>
								{Platform.OS === 'ios' ? (
									<ModalDropdown
										options={this.props.emails}
										style={{ width: '100%' }}
										textStyle={{ fontFamily: 'Lato-Light' }}
										defaultValue="Select Email"
										dropdownStyle={{ borderRadius: 4, width: '50%' }}
										dropdownTextStyle={{ fontFamily: 'Lato-Light' }}
										onSelect={index => {
											this.setState({
												email: this.props.emails[index]
											});
										}}
									/>
								) : (
									<Picker
										selectedValue={this.state.email}
										style={{ height: 50, width: 150 }}
										itemStyle={{ fontFamily: 'Lato-Light' }}
										onValueChange={(itemValue, itemIndex) =>
											this.setState({
												email: this.props.emails[itemIndex]
											})
										}
									>
										{this.props.emails.map((item, index) => (
											<Picker.Item key={`${index}`} label={`${item}`} value={`${item}`} />
										))}
									</Picker>
								)}
							</View>
						</View>) : (
              <View
                style={{
                  backgroundColor: '#ebebeb',
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderColor: '#ffffff'
                }}
              >
                <OutlineTextInput
                  style={{
                    height: '80%',
                    width: '50%',
                    marginLeft: '8%',
                    marginTop: '0%'
                  }}
                  placeholder="Email"
                  onChangeText={text => {
                    this.setState({
                      email: text
                    });
                  }}
                  value={this.state.email}
                />
              </View>
            )}
						<View
							style={{
								backgroundColor: '#ebebeb',
								height: 40,
								flexDirection: 'row',
								alignItems: 'center',
								borderBottomWidth: 1,
								borderColor: '#ffffff'
							}}
						>
							<View
								style={{
									flexDirection: 'column',
									width: '100%',
									marginLeft: '8%',
									height: 40,
									justifyContent: 'center'
								}}
							>
								{Platform.OS === 'ios' ? (
									<ModalDropdown
										options={this.props.phones}
										style={{ width: '100%' }}
										textStyle={{ fontFamily: 'Lato-Light' }}
										defaultValue="Select Phone"
										dropdownStyle={{ borderRadius: 4, width: '50%' }}
										dropdownTextStyle={{ fontFamily: 'Lato-Light' }}
										onSelect={index => {
											this.setState({
												phone: this.props.phones[index]
											});
										}}
									/>
								) : (
									<Picker
										selectedValue={this.state.phone}
										style={{ height: 50, width: 150 }}
										itemStyle={{ fontFamily: 'Lato-Light' }}
										onValueChange={(itemValue, itemIndex) =>
											this.setState({
												phone: this.props.phones[index]
											})
										}
									>
										{this.props.phones.map((item, index) => (
											<Picker.Item key={`${index}`} label={`${item}`} value={`${item}`} />
										))}
									</Picker>
								)}
							</View>
						</View>
						<View
							style={{
								backgroundColor: '#ebebeb',
								height: 40,
								flexDirection: 'row',
								alignItems: 'center',
								borderBottomWidth: 1,
								borderColor: '#ffffff'
							}}
						>
							<View
								style={{
									flexDirection: 'column',
									width: '100%',
									marginLeft: '8%',
									height: 40,
									justifyContent: 'center'
								}}
							>
								{Platform.OS === 'ios' ? (
									<ModalDropdown
										options={this.state.templates}
										style={{ width: '100%' }}
										textStyle={{ fontFamily: 'Lato-Light' }}
										defaultValue="Select Template"
										dropdownStyle={{ borderRadius: 4, width: '50%' }}
										dropdownTextStyle={{ fontFamily: 'Lato-Light' }}
										onSelect={index => {
											this.setState({
												template: this.state.templates[index]
											});
										}}
									/>
								) : (
									<Picker
										selectedValue={this.state.template}
										style={{ height: 50, width: 150 }}
										itemStyle={{ fontFamily: 'Lato-Light' }}
										onValueChange={(itemValue, itemIndex) =>
											this.setState({
												template: this.state.templates[itemIndex]
											})
										}
									>
										{this.state.templates.map((item, index) => (
											<Picker.Item key={`${index}`} label={`${item}`} value={`${item}`} />
										))}
									</Picker>
								)}
							</View>
						</View>

						<ColoredButton
							text="Invite"
							containerStyle={{
								backgroundColor: '#005555',
								justifyContent: 'center',
								marginLeft: '20%',
								width: '17%',
								marginTop: 8,
								borderRadius: 5,
								borderWidth: 0,
								height: 25,
								marginBottom: 8,
								padding: 0
							}}
							textStyle={{ fontSize: 14, fontFamily: 'Lato-Light' }}
							onPress={() => {
								this.props.onSavePress(
									this.state.name,
									this.state.email,
									this.state.phone,
									this.state.template
								);
							}}
						/>
					</View>
				</Animatable.View>
			</Modal>
		);
	}
}
