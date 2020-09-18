import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity, ActivityIndicator, Text, View, TextInput } from 'react-native';

import { Grid, Row, Col } from 'react-native-easy-grid';

import { styles } from '../constants/styles';
import Database from '../components/Database';

function AddScreen({ navigation }) {

	const db = new Database();

	const [isLoading, setIsLoading] = useState();

	const [itemID, setItemID] = useState();
	const [itemName, setItemName] = useState();
	const [itemDescription, setItemDescription] = useState();
	const [itemPrice, setItemPrice] = useState();

	function updateTextInput(text, field) {
		switch (field) {
			case 'id':
				setItemID(text);
				break;
			case 'name':
				setItemName(text);
				break;
		}
	}

	function saveItem() {
		setIsLoading(true);

		let data = {
			itemID: null,
			itemName: itemName
		}
		db.addItem(data).then((result) => {
			console.log(result);
			setIsLoading(false);
			navigation.navigate('Home', {
				resetDatabase: true
			});
		}).catch((err) => {
			console.log(err);
			setIsLoading(false);
		})
	}

	if (isLoading) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Grid>
				<Row style={[styles.padding20, { flex: 1 }]}>
					<Col style={{ flex: 4 }}>
						<Text style={styles.header}>Add Item</Text>
					</Col>
					<Col style={{ alignItems: 'flex-end' }}>
						<TouchableOpacity
							style={styles.addButton}
							onPress={() => navigation.navigate('Home')}>
							<Text style={styles.addButtonText}>Back</Text>
						</TouchableOpacity>
					</Col>
				</Row>
				<Row style={[styles.padding20, { flex: 7 }]}>
					<Col>
						<TextInput
						style={styles.addInput}
							placeholder={'Item Name'}
							value={itemName}
							onChangeText={(text) => updateTextInput(text, 'name')}
						/>
						</Col>
				</Row>
				<Row style={styles.saveButtonContainer}>
					<TouchableOpacity
					onPress={() => saveItem()}
					style={styles.saveButton}>
					<Text style={styles.saveButtonText}>
						Save
					</Text>
					</TouchableOpacity>
				</Row>
			</Grid>
			</View>
		);
	}

	export default AddScreen;