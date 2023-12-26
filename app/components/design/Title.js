import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import colors from '@constants/colors';

export default function Title ({ text, subtitle }) {
  return (
		<View>
			<Text style={subtitle ? styles.titleNoMargin : styles.title}>{text}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
		</View>
  );
};

const styles = StyleSheet.create({
	title: {
		fontSize: 35,
		fontWeight: "bold",
		marginBottom: 50,
		color: colors.white,
        textAlign: "center",
	},
    titleNoMargin: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors["grey-100"],
        textAlign: "center",
    },
    subtitle: {
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 50,
        color: colors["grey-100"],
        textAlign: "center",
    },
});
