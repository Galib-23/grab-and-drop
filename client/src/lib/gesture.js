const shouldTriggerGesture = ({
    currentGesture,
    expectedGesture,
    confidence,
    threshold,
    lastTime,
    cooldownMs,
    disabled,
}) => {
    if (disabled) return false;
    if (currentGesture !== expectedGesture) return false;
    if (confidence <= threshold) return false;

    const timeSinceLast = Date.now() - lastTime;
    return timeSinceLast > cooldownMs;
};

export { shouldTriggerGesture };
