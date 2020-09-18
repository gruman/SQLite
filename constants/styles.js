import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    header: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 18,
        textTransform: 'uppercase'
    },
    padding20: {
        padding: 20
    },
    padding15: {
        padding: 15
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    // home screen

    addButton: {
        height: 40,
        width: 60,
        borderRadius: 5,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButtonText: {
        color: '#fff',
        fontSize: 15,
        lineHeight: 15,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    listButton: {
        backgroundColor: '#111',
        width: screenWidth/2 - 35,
        height: screenWidth/2 - 35,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listText: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700'
    },
    listIconFrame: {
        flexDirection: 'column'
    },
    listLogo: {
        fontSize: 50,
        color: '#fff',
        fontWeight: '900'
    },

    // add item

    saveButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveButton: {
        height: 50,
        width: 90,
        borderRadius: 5,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 20,
        textTransform: 'uppercase'
    },
    addInput: {
        fontSize: 30,
        borderWidth: 1,
        borderColor: '#111',
        padding: 5,
        marginBottom: 20
    }
  })