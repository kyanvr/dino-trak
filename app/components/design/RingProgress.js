import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "@constants/colors";
import CircularProgress from "react-native-circular-progress-indicator";

const RingProgress = ({ radius = 100, strokeWidth = 35, progress, onAnimationComplete }) => {
	return (
		<View
			style={{
				width: radius * 2,
				height: radius * 2,
				alignSelf: "center",
			}}
		>
			<CircularProgress
				value={progress}
				maxValue={100}
				inActiveStrokeColor={colors["green-100"]}
				activeStrokeColor={colors["green-500"]}
				inActiveStrokeOpacity={0.2}
				progressValueColor={colors["grey-100"]}
				valueSuffix={"%"}
				activeStrokeWidth={strokeWidth}
				inActiveStrokeWidth={strokeWidth}
				radius={radius}
				progressValueFontSize={strokeWidth}
				onAnimationComplete={onAnimationComplete}
			/>
			<AntDesign
				name="arrowright"
				size={strokeWidth * 0.6}
				color={colors["grey-900"]}
				style={{
					position: "absolute",
					alignSelf: "center",
					top: strokeWidth * 0.05,
				}}
			/>
		</View>
	);
};

export default RingProgress;
