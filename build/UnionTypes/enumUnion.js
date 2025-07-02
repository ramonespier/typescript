// gostei muito disso !!!
var TrafficLightType;
(function (TrafficLightType) {
    TrafficLightType[TrafficLightType["Green"] = 0] = "Green";
    TrafficLightType[TrafficLightType["Yellow"] = 1] = "Yellow";
    TrafficLightType[TrafficLightType["Red"] = 2] = "Red";
})(TrafficLightType || (TrafficLightType = {}));
const trafficLight = {
    type: TrafficLightType.Green,
    drive() {
    },
};
export {};
