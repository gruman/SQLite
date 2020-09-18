import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity, TextInput, ActivityIndicator, View, Text } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';

import { styles } from '../constants/styles';
import Database from '../components/Database';

function DetailsScreen({ navigation, route }) {

	const [checkDB, setCheckDB] = useState(false);
	const db = new Database();
	const { navItemID } = route.params;

	const [isLoading, setIsLoading] = useState(true);
	const [item, setItem] = useState();
	const [itemID, setItemID] = useState(navItemID);
	const [itemName, setItemName] = useState();

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

	function getItem() {
		db.getItem(itemID).then((data) => {
			setItemName(data.itemName);
			setIsLoading(false);
		}).catch((err) => {
			console.log(err);
			setIsLoading(false);
		})
	}

	function deleteItem() {
		setIsLoading(true);
		db.deleteItem(itemID).then((result) => {
			setIsLoading(false);
			console.log(result);
			navigation.navigate('Home', {
				resetDatabase: true
			});
		}).catch((err) => {
			console.log(err);
			setIsLoading(false);
		})
	}

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

	function updateItem() {
		setIsLoading(true);

		let data = {
			itemID: itemID,
			itemName: itemName
		}
		db.updateItem(itemID, data).then((result) => {
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

	useEffect(() => {
		getItem();
	}, [checkDB]);


	if (isLoading) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		)
	}

	return (<View style={styles.container}>
		<Grid>
			<Row style={[styles.padding20, { flex: 1 }]}>
				<Col style={{ flex: 4 }}>
					<Text style={styles.header}>Edit Item</Text>
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
				<Col style={styles.saveButtonContainer}>
					<TouchableOpacity
							onPress={() => {
								Alert.alert(
									'Are you sure?',
									'Deleting is permanent',
									[
										{text: 'Cancel', style: 'cancel'},
										{text: 'Yes', onPress: () => deleteItem()},
									]
								)
							}}
						style={styles.saveButton}>
						<Text style={styles.saveButtonText}>
							Delete
					</Text>
					</TouchableOpacity>
				</Col>
				<Col style={styles.saveButtonContainer}>
					<TouchableOpacity
						onPress={() => {updateItem()}}
						style={styles.saveButton}>
						<Text style={styles.saveButtonText}>
							Update
					</Text>
					</TouchableOpacity>
				</Col>
			</Row>
		</Grid>

	</View>
	);
}

export default DetailsScreen;