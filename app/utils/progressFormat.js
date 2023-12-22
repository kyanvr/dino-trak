export default function progressFormat(steps, stepsGoal) {
    const progress = (steps / stepsGoal) * 100;

    if (progress > 100) {
        return 100;
    } else if (progress < 0) {
        return 0;
    }
    
    return progress.toFixed();
}