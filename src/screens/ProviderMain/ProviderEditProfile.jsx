/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import { AppImages } from '../../assets/images';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import PhoneInputScreen from '../../components/PhoneInput';
import { Picker } from '@react-native-picker/picker';
import FromInput from '../../components/FromInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';

const ProviderEditProfile = () => {
  const nav = useNavigation();
  const phoneRef = useRef();
  const [service, setService] = useState('Massage_Therapy');
  const [addOnOffer, setAddOnOffer] = useState('Foot_Scrub');
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]); // store multiple values here
  const [items, setItems] = useState([
    { label: 'Solo Massage', value: 'Solo Massage' },
    { label: 'Couples Massage', value: 'Couples Massage' },
    { label: 'Group Yoga', value: 'Group Yoga' },
    { label: 'Sound Bath', value: 'Sound Bath' },
    { label: 'Spa Party', value: 'Spa Party' },
    { label: 'Corporate Chair Massage', value: 'Corporate Chair Massage' },
    { label: 'Vibroacoustic Therapy', value: 'Vibroacoustic Therapy' },
    { label: 'Facial', value: 'Facial' },
  ]);

  const [openAddOn, setOpenAddOn] = useState(false);
  const [valueAddOn, setValueAddOn] = useState([]); // store multiple values here
  const [itemsAddOn, setItemsAddOn] = useState([
    {
      label: 'Aromatherapy (+$25 per Person)',
      value: 'Aromatherapy (+$25 per Person)',
    },
    {
      label: 'Hot Stone (+$45 per Person)',
      value: 'Hot Stone (+$45 per Person)',
    },
    {
      label: 'Aromatherapy (+$25 per  Person)',
      value: 'Aromatherapy (+$25 per  Person)',
    },
    { label: 'Face Peel', value: 'Face Peel' },
    { label: 'Dermaplaning', value: 'Dermaplaning' },
    { label: 'Nano-Needling', value: 'Nano-Needling' },
    { label: 'Microdermabrasion', value: 'Microdermabrasion' },
  ]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [activeField, setActiveField] = useState({ day: null, type: null });
  // type = "from" or "to"

  // state for all inputs
  const [time, setTime] = useState({
    monday: { from: null, to: null },
    tuesday: { from: null, to: null },
  });

  const showDatePicker = (day, type) => {
    setActiveField({ day, type });
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formatted = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    setTime(prev => ({
      ...prev,
      [activeField.day]: {
        ...prev[activeField.day],
        [activeField.type]: formatted,
      },
    }));

    hideDatePicker();
  };

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      console.log(image);
    });
  };

  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Edit Profile'} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => pickImage()}>
            <Image
              source={image ? { uri: image } : AppImages.profile}
              style={{ width: 80, height: 80, borderRadius: 100 }}
            />
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <Feather
                name="edit"
                size={responsiveFontSize(2)}
                color={AppColors.BLACK}
              />
            </View>
          </TouchableOpacity>
          <LineBreak space={1.2} />
          <AppText
            title={'Samantha Wilson'}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />
          <AppText
            title={'samanthawilson@gmail.com'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
        </View>
        <LineBreak space={5} />

        <View>
          <AppText
            title={'Full Name'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'Name'} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Email Address'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'Email Address'} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Cell phone Number'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          {/* <AppTextInput inputPlaceHolder={'Mobile number'} /> */}
          <PhoneInputScreen phoneRef={phoneRef} />
        </View>
        <LineBreak space={2} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <AppText
              title={'House No.'}
              textColor={AppColors.GRAY}
              textSize={1.8}
            />
            <LineBreak space={0.5} />
            <AppTextInput inputPlaceHolder={'House No'} inputWidth={34} />
          </View>
          <View>
            <AppText
              title={'Street'}
              textColor={AppColors.GRAY}
              textSize={1.8}
            />
            <LineBreak space={0.5} />
            <AppTextInput inputPlaceHolder={'Address'} inputWidth={34} />
          </View>
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'City & Zip Code'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'City & Zip Code'} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'How many miles you willing to travel from your home?'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'Up to 70 miles max'} />
        </View>

        <LineBreak space={2} />
        <View>
          <AppText
            title={'Select Your Core Services:'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            multiple={true}
            min={0}
            max={8}
            autoScroll
            placeholderStyle={{
              color: AppColors.ThemeBlue,
              paddingHorizontal: responsiveWidth(4),
            }}
            placeholder="Select Services"
            mode="BADGE"
            listMode="MODAL"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            badgeStyle={styles.badgeStyle}
            badgeTextStyle={styles.badgeTextStyle}
          />
        </View>
        <LineBreak space={2} />
        <View>
          <AppText
            title={'Add-On Services You Offer:'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />

          <LineBreak space={0.5} />
          <DropDownPicker
            open={openAddOn}
            value={valueAddOn}
            items={itemsAddOn}
            setOpen={setOpenAddOn}
            setValue={setValueAddOn}
            setItems={setItemsAddOn}
            multiple={true}
            min={0}
            max={8}
            autoScroll
            placeholderStyle={{
              color: AppColors.ThemeBlue,
              paddingHorizontal: responsiveWidth(4),
            }}
            placeholder="Select AddOn"
            mode="BADGE"
            listMode="MODAL"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            badgeStyle={styles.badgeStyle}
            badgeTextStyle={styles.badgeTextStyle}
          />
        </View>
        <LineBreak space={2} />

        <View>
          <AppText
            title={'Hours of availibilty (Typo)'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={1} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <AppText
              title={'Monday'}
              textColor={AppColors.ThemeBlue}
              textSize={2}
            />

            <View
              style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
            >
              <TouchableOpacity
                onPress={() => showDatePicker('monday', 'from')}
              >
                <FromInput
                  label={'From'}
                  value={time.monday.from}
                  editable={false}
                />
              </TouchableOpacity>
              <AppText
                title={'-'}
                textColor={AppColors.ThemeBlue}
                textSize={6}
              />
              <TouchableOpacity onPress={() => showDatePicker('monday', 'to')}>
                <FromInput
                  label={'To'}
                  value={time.monday.to}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <AppText
              title={'Tuesday'}
              textColor={AppColors.ThemeBlue}
              textSize={2}
            />

            <View
              style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
            >
              <TouchableOpacity
                onPress={() => showDatePicker('tuesday', 'from')}
              >
                <FromInput
                  label={'From'}
                  value={time.tuesday.from}
                  editable={false}
                />
              </TouchableOpacity>
              <AppText
                title={'-'}
                textColor={AppColors.ThemeBlue}
                textSize={6}
              />
              <TouchableOpacity onPress={() => showDatePicker('tuesday', 'to')}>
                <FromInput
                  label={'To'}
                  value={time.tuesday.to}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <LineBreak space={2} />

        <AppButton
          title={'Add Another Interval'}
          textColor={AppColors.ThemeBlue}
          borderWidth={1}
          borderColor={AppColors.ThemeBlue}
          btnBackgroundColor={AppColors.WHITE}
          handlePress={() => nav.navigate('Main')}
          textFontWeight={false}
        />

        <LineBreak space={5} />

        <AppButton
          title={'Save Information'}
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={() => nav.navigate('Main')}
          textFontWeight={false}
        />
      </View>
      <LineBreak space={5} />
    </Container>
  );
};

export default ProviderEditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 100,
    backgroundColor: AppColors.inputGrayBg,
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  badgeStyle: {
    borderRadius: 8,
  },
  badgeTextStyle: {
    color: AppColors.ThemeBlue,
    fontWeight: 'bold',
  },
});
