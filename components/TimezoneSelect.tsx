import { View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import tw from 'twrnc'
import { allTimezones, TimezoneType } from '../models'

interface props {
    value: TimezoneType | null
    handleTimezoneChange: (timezone: TimezoneType) => void
}

export const TimezoneSelect: React.FC<props> = ({ value, handleTimezoneChange }) => {
    const timezones = allTimezones.map(t => ({
        label: t,
        value: t
    }))

    return (
        <View style={tw`border rounded border-gray-400 p-3 mt-10`}>
            <RNPickerSelect
                style={{ inputIOS: { fontSize: 16 }, inputAndroid: { fontSize: 16 } }}
                placeholder={{ label: 'Timezone', value: null }}
                items={timezones}
                onValueChange={handleTimezoneChange}
                value={value}
            />
        </View>
    )
}