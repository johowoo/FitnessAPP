import { Dimensions, Platform} from 'react-native'

let screenW = Dimensions.get('window').width;
let screenH = Dimensions.get('window').height;
// iPhoneX
const X_WIDTH = 375
const X_HEIGHT = 812

export default function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}