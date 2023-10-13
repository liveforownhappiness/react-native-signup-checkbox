import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { isEmpty } from './util/isEmpty';
import { Colors } from './assets/Colors';


type CheckTermProps = {
  label: string;
  necessary: boolean;
  link: string;
  linkLabel?: string;
  index: number;
  checked: boolean;
};
export type CheckTermsProps = {
  data: CheckTermProps[];
  setTermsEable: React.Dispatch<SetStateAction<boolean>>;
  essential: string;
  optional:string;
  selectAll:string;
};

export const CheckTerms = (props: CheckTermsProps) => {
  if (isEmpty(props?.data)) {
    return null;
  }

  const [checkBoxArray, setcheckBoxArray] = useState(props.data);
  const [allCheck, setAllCheck] = useState(false);

  const termsEnable = useCallback(() => {
    const leftNecessaryCheck = checkBoxArray.filter(
      (i) => i.necessary && !i.checked,
    );
    props.setTermsEable(isEmpty(leftNecessaryCheck));
  }, [checkBoxArray]);

  useEffect(() => {
    termsEnable();
  }, [termsEnable]);

  const toggleCheck = useCallback(
    (index: number) => {
      const checkList = checkBoxArray.map((i) => {
        if (i.index === index) {
          return { ...i, checked: !i.checked };
        }
        return i;
      });
      setcheckBoxArray(checkList);
    },
    [checkBoxArray, checkBoxArray],
  );

  const necessaryText = (necessary: boolean) => {
    if (necessary)
      return <Text style={styles.essential}>[{props.essential}] </Text>;
    return <Text style={styles.optional}>[{props.optional}] </Text>;
  };

  const CheckTerm = useCallback(
    (checkTerm: CheckTermProps, index: number) => {
      return (
        <View style={styles.termsWrapper} key={checkTerm?.index}>
          <TouchableOpacity
            style={styles.termsTouchWrapper}
            onPress={() => toggleCheck(index)}
          >
            <CheckBox
              style={styles.checkBox}
              value={checkTerm.checked}
              tintColors={{ true: Colors.primary, false: Colors.gray }}
              onCheckColor={Colors.primary}
              tintColor={Colors.gray}
            />
            <Text style={dstyles(checkTerm.necessary).termsLabelText}>
              {necessaryText(checkTerm.necessary)}
              {checkTerm.label}
            </Text>
          </TouchableOpacity>
          {checkTerm?.linkLabel && (
            <TouchableOpacity
              style={styles.marginLeftAuto}
              onPress={() => Linking.openURL(checkTerm.link)}
            >
              <Text style={styles.detailText}>{checkTerm.linkLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    },
    [toggleCheck],
  );

  const toggleAll = useCallback(
    (allCheck: boolean) => {
      const checkList = checkBoxArray.map((i) => {
        return { ...i, checked: !allCheck };
      });
      setcheckBoxArray(checkList);
      setAllCheck(!allCheck);
    },
    [checkBoxArray],
  );

  const FooterCheckTerm = useCallback(() => {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => toggleAll(allCheck)}
        >
          <CheckBox
            style={styles.checkBox}
            value={allCheck}
            onChange={() => toggleAll(allCheck)}
            tintColors={{ true: Colors.primary, false: Colors.gray }}
            onCheckColor={Colors.primary}
            tintColor={Colors.gray}
          />
          <Text style={styles.selectAll}>{props.selectAll}</Text>
        </TouchableOpacity>
      </View>
    );
  }, [allCheck]);

  return (
    <View style={{width: '100%'}}>
      <FlatList
        data={checkBoxArray}
        renderItem={({ item, index }) => CheckTerm(item, index)}
        ListFooterComponent={<FooterCheckTerm />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: Colors.primary,
  },
  optional: {
    fontSize: 13,
    color: Colors.gray,
  },
  selectAll: {
    fontSize: 13,
    width: '100%',
    color: Colors.darkGray,
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
  marginLeftAuto:{ marginLeft: 'auto' }
});

const dstyles = (necessary: boolean) =>
  StyleSheet.create({
    termsLabelText: {
      fontSize: 13,
      width: '100%',
      color: necessary ? Colors.darkGray : Colors.gray,
    },
  });
