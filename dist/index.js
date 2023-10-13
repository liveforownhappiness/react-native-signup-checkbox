"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckTerms = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const checkbox_1 = __importDefault(require("@react-native-community/checkbox"));
const isEmpty_1 = require("./util/isEmpty");
const Colors_1 = require("./assets/Colors");
const CheckTerms = (props) => {
    if ((0, isEmpty_1.isEmpty)(props === null || props === void 0 ? void 0 : props.data)) {
        return null;
    }
    const [checkBoxArray, setcheckBoxArray] = (0, react_1.useState)(props.data);
    const [allCheck, setAllCheck] = (0, react_1.useState)(false);
    const termsEnable = (0, react_1.useCallback)(() => {
        const leftNecessaryCheck = checkBoxArray.filter((i) => i.necessary && !i.checked);
        props.setTermsEable((0, isEmpty_1.isEmpty)(leftNecessaryCheck));
    }, [checkBoxArray]);
    (0, react_1.useEffect)(() => {
        termsEnable();
    }, [termsEnable]);
    const toggleCheck = (0, react_1.useCallback)((index) => {
        const checkList = checkBoxArray.map((i) => {
            if (i.index === index) {
                return Object.assign(Object.assign({}, i), { checked: !i.checked });
            }
            return i;
        });
        setcheckBoxArray(checkList);
    }, [checkBoxArray, checkBoxArray]);
    const necessaryText = (necessary) => {
        if (necessary)
            return <react_native_1.Text style={styles.essential}>[{props.essential}] </react_native_1.Text>;
        return <react_native_1.Text style={styles.optional}>[{props.optional}] </react_native_1.Text>;
    };
    const CheckTerm = (0, react_1.useCallback)((checkTerm, index) => {
        return (<react_native_1.View style={styles.termsWrapper} key={checkTerm === null || checkTerm === void 0 ? void 0 : checkTerm.index}>
          <react_native_1.TouchableOpacity style={styles.termsTouchWrapper} onPress={() => toggleCheck(index)}>
            <checkbox_1.default style={styles.checkBox} value={checkTerm.checked} tintColors={{ true: Colors_1.Colors.primary, false: Colors_1.Colors.gray }} onCheckColor={Colors_1.Colors.primary} tintColor={Colors_1.Colors.gray}/>
            <react_native_1.Text style={dstyles(checkTerm.necessary).termsLabelText}>
              {necessaryText(checkTerm.necessary)}
              {checkTerm.label}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>
          {(checkTerm === null || checkTerm === void 0 ? void 0 : checkTerm.linkLabel) && (<react_native_1.TouchableOpacity style={styles.marginLeftAuto} onPress={() => react_native_1.Linking.openURL(checkTerm.link)}>
              <react_native_1.Text style={styles.detailText}>{checkTerm.linkLabel}</react_native_1.Text>
            </react_native_1.TouchableOpacity>)}
        </react_native_1.View>);
    }, [toggleCheck]);
    const toggleAll = (0, react_1.useCallback)((allCheck) => {
        const checkList = checkBoxArray.map((i) => {
            return Object.assign(Object.assign({}, i), { checked: !allCheck });
        });
        setcheckBoxArray(checkList);
        setAllCheck(!allCheck);
    }, [checkBoxArray]);
    const FooterCheckTerm = (0, react_1.useCallback)(() => {
        return (<react_native_1.View style={styles.footerContainer}>
        <react_native_1.TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => toggleAll(allCheck)}>
          <checkbox_1.default style={styles.checkBox} value={allCheck} onChange={() => toggleAll(allCheck)} tintColors={{ true: Colors_1.Colors.primary, false: Colors_1.Colors.gray }} onCheckColor={Colors_1.Colors.primary} tintColor={Colors_1.Colors.gray}/>
          <react_native_1.Text style={styles.selectAll}>{props.selectAll}</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>);
    }, [allCheck]);
    return (<react_native_1.View style={{ width: '100%' }}>
      <react_native_1.FlatList data={checkBoxArray} renderItem={({ item, index }) => CheckTerm(item, index)} ListFooterComponent={<FooterCheckTerm />}/>
    </react_native_1.View>);
};
exports.CheckTerms = CheckTerms;
const styles = react_native_1.StyleSheet.create({
    termsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    termsTouchWrapper: { flexDirection: 'row', alignItems: 'center' },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    essential: {
        fontSize: 13,
        color: Colors_1.Colors.primary,
    },
    optional: {
        fontSize: 13,
        color: Colors_1.Colors.gray,
    },
    selectAll: {
        fontSize: 13,
        width: '100%',
        color: Colors_1.Colors.darkGray,
        fontWeight: 'bold',
    },
    detailText: {
        fontSize: 13,
        textDecorationLine: 'underline',
    },
    checkBox: {
        width: 20,
        height: 20,
        margin: 5,
        marginRight: 10,
    },
    marginLeftAuto: { marginLeft: 'auto' }
});
const dstyles = (necessary) => react_native_1.StyleSheet.create({
    termsLabelText: {
        fontSize: 13,
        width: '100%',
        color: necessary ? Colors_1.Colors.darkGray : Colors_1.Colors.gray,
    },
});
