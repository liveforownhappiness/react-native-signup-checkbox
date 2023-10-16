# `react-native-signup-checkbox`

React Native component for sign up check list

|                   Android Example                    |                   IOS Example                    |
| :--------------------------------------------------: | :----------------------------------------------: |
| <video src="sample/android.mp4" width="320"></video> | <video src="sample/ios.mp4" width="320"></video> |

## Getting started

`yarn add react-native-signup-checkbox`

or

`npm install react-native-signup-checkbox --save`

On iOS, install cocoapods:

`npx pod-install`

## Usage

### Example

```javascript
import { CheckTerms, CheckTermsProps } from "react-native-signup-checkbox";
```

```javascript
const CheckTermsData: CheckTermsProps["data"] = [
  {
    index: 0,
    label: "hi",
    link: "https://google.com",
    necessary: true,
    linkLabel: "detail",
    checked: false,
  },
  {
    index: 1,
    label: "hi",
    link: "https://google.com",
    necessary: true,
    linkLabel: "detail",
    checked: false,
  },
  {
    index: 2,
    label: "hi",
    link: "https://google.com",
    necessary: false,
    linkLabel: "detail",
    checked: false,
  },
  {
    index: 3,
    label: "hi",
    necessary: false,
    checked: false,
    link: "",
  },
];
const [toggleCheckBox, setToggleCheckBox] = useState(false);

const [termsEnable, setTermsEable] = useState(false);
return (
  <SafeAreaView>
    <View style={{ backgroundColor: "orange" }}>
      <CheckTerms
        data={CheckTermsData}
        essential={"essential"}
        optional={"optional"}
        selectAll={"selectAll"}
        setTermsEable={setTermsEable}
      />
    </View>
  </SafeAreaView>
);
```

### Props

## Common Props

| Prop name     | Type                                    | Description                                 |
| ------------- | --------------------------------------- | ------------------------------------------- |
| data          | array                                   | CheckTermsProps['data'] - show the example. |
| essential     | string                                  | essential string                            |
| optional      | string                                  | optional string                             |
| selectAll     | string                                  | selectAll string                            |
| setTermsEable | React.Dispatch<SetStateAction<boolean>> | setState                                    |

## License

The library is released under the MIT licence. For more information see `LICENSE`.
