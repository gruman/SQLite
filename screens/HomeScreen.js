import React, { useState, useEffect } from 'react';
import { Button, FlatList, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import moment from 'moment';

import { styles } from '../constants/styles';
import Database from '../components/Database';

function HomeScreen({ navigation, route }) {

	const db = new Database();

	const [checkDB, setCheckDB] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const [items, setItems] = useState();
	const [order, setOrder] = useState('desc');

	function getItems() {
		let itemsToList = [];
		db.getItems(order).then((data) => {
			itemsToList = data;
			setItems(itemsToList);
			setIsLoading(false);
		}).catch((err) => {
			console.log(err);
			setIsLoading(false);
		})
	}

	function sortItems() {
		if (order == 'asc') {
			setOrder('desc');
		} else {
			setOrder('asc');
		}
		setCheckDB(!checkDB);
	}

	useEffect(() => {
		getItems();
	}, [checkDB]);

	useEffect(() => {
		
	if (route.params != null) {
		let { resetDatabase } = route.params;
		if (resetDatabase) {
			getItems();
			route.params = null;
		}
	}
	})

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
						<Text style={styles.header}>Items App</Text>
					</Col>
					<Col style={{ alignItems: 'flex-end' }}>
						<TouchableOpacity
							style={styles.addButton}
							onPress={() => navigation.navigate('Add')}>
							<Text style={styles.addButtonText}>Add</Text>
						</TouchableOpacity>
					</Col>
				</Row>
				<Row style={[styles.padding15, { flex: 12 }]}>
					<FlatList
						data={items}
						numColumns={2}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={styles.listButton}
								onPress={() => navigation.navigate('Edit', {
									navItemID: item.itemID
								})}>
								<Text style={styles.listLogo}>{item.itemID}</Text>
										<Text style={styles.listText}>{item.itemName}</Text>
										<Text style={styles.listText}>{moment(item.dateAdded).format('D MMM YYYY')}</Text>
										<Text style={styles.listText}>{moment(item.dateAdded).format('h:mma')}</Text>
									</TouchableOpacity>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>

				</Row>
				<Row style={styles.saveButtonContainer}>
					<TouchableOpacity
					onPress={() => sortItems()}
					style={styles.saveButton}>
					<Text style={styles.saveButtonText}>
						Sort
					</Text>
					</TouchableOpacity>
				</Row>
			</Grid>

		</View>
	);
}

export default HomeScreen;