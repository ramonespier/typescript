// gostei muito disso !!!

enum TrafficLightType {
    Green,
    Yellow,
    Red,
}

interface GreenColor{
    type: TrafficLightType.Green
    drive(): void;
}
interface YellowColor{
    type: TrafficLightType.Yellow
    wait(): void;
}
interface RedColor{
    type: TrafficLightType.Red
    stop(): void;
}

type TrafficLight = GreenColor | YellowColor | RedColor;

const trafficLight: TrafficLight = {
    type: TrafficLightType.Green,
    drive() {
        
    },
}