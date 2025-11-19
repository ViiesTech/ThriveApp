/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
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
import {
  useGetAddOnsQuery,
  useGetServicesQuery,
} from '../../redux/services/MainIntegration';
import { useUpdateProfileMutation } from '../../redux/services';
import { useSelector } from 'react-redux';
import { IMAGE_URL } from '../../redux/constant';

const ProviderEditProfile = () => {
  const nav = useNavigation();
  const phoneRef = useRef();
  const [service, setService] = useState('Massage_Therapy');
  const [addOnOffer, setAddOnOffer] = useState('Foot_Scrub');
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]); // store multiple values here
  const [availableDays, setAvailableDays] = useState(['Monday', 'Tuesday']);
  console.log('image', image);
  const [state, setState] = useState({
    fullName: '',
    number: '',
    cityZipCode: '',
    miles: '',
  });
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const [items, setItems] = useState();
  const [itemsAddOn, setItemsAddOn] = useState();
  const { data, isLoading, isError } = useGetServicesQuery(undefined, {
    refetchOnMountOrArgChange: true, // automatically fetch fresh data
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const { user } = useSelector(state => state.persistedData);
  const {
    fullName,
    email,
    image: userImage,
    _id,
    type,
    location,
    travel,
    serviceId,
    workingDays,
  } = useSelector(state => state.persistedData?.user);

  const {
    data: addOnData,
    isLoading: addOnLoading,
    isError: addOnError,
  } = useGetAddOnsQuery(undefined, {
    refetchOnMountOrArgChange: true, // automatically fetch fresh data
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const [openAddOn, setOpenAddOn] = useState(false);
  const [valueAddOn, setValueAddOn] = useState([]); // store multiple values here
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateProfileMutation();
  const [gender, setGender] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]);
  const [valueGender, setValueGender] = useState(); // store multiple values here
  const [openGender, setOpenGender] = useState(false);

  console.log('valueGender', valueGender);
  console.log('valueAddOn', valueAddOn);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [activeField, setActiveField] = useState({ index: null, type: null }); // type = "from" or "to"

  // state for all inputs
  const [time, setTime] = useState([
    { day: 'Monday', startTime: null, endTime: null, isActive: true },
    { day: 'Tuesday', startTime: null, endTime: null, isActive: true },
  ]);

  console.log('time', time);
  useEffect(() => {
    if (isError) {
      // error can be a string or an object depending on your API
      console.log('Error fetching services:', isError);

      // show toast for user
      ShowToast(
        isError?.respones?.data?.message ||
          isError?.isError ||
          'Failed to fetch services',
      );
    }
  }, [isError]);
  const showDatePicker = (index, type) => {
    setActiveField({ index, type });
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

    setTime(prev => {
      const updated = [...prev];
      updated[activeField.index][activeField.type] = formatted;
      return updated;
    });

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
  const handleAddAnotherInterval = () => {
    const nextDay = daysOfWeek[time.length];
    if (nextDay) {
      setTime(prev => [
        ...prev,
        { day: nextDay, startTime: null, endTime: null, isActive: true },
      ]);
    } else {
      alert('You have already added all days!');
    }
  };
  const onChangeText = (state, value) => {
    setState(prevState => ({
      ...prevState,
      [state]: value,
    }));
  };

  useEffect(() => {
    if (data?.success) {
      const formatted = data.data.map(item => ({
        label: item.serviceName,
        value: item._id,
      }));
      setItems(formatted);
    }
  }, [data]);
  useEffect(() => {
    if (addOnData?.success) {
      console.log('addOnDataaaa', addOnData);
      // console.log('addondatata', addOnData[0]);
      const formatted = addOnData.data.map(item => ({
        label: item.name,
        value: item._id,
      }));
      setItemsAddOn(formatted);
    }
  }, [addOnData]);

  const onUpdatePress = async () => {
    try {
      const filteredTimes = time.filter(
        item => item.startTime !== null && item.endTime !== null,
      );
      // console.log('filteredTimes',JSON.stringify(filteredTimes))
      // return
      const formData = new FormData();

      formData.append('id', _id);
      formData.append('type', type);

      // ✅ Append only if image exists
      if (image) {
        formData.append('image', {
          uri: image,
          name: `userImage.jpg`,
          type: 'image/jpeg',
        });
      }

      // ✅ Append only if provided
      if (state?.fullName) {
        formData.append('fullName', state.fullName);
      }
      if (valueGender) {
        formData.append('gender', valueGender);
      }

      if (state?.cityZipCode) {
        formData.append('city', state.cityZipCode);
      }

      if (state?.number) {
        formData.append('phoneNumber', state.number);
      }

      if (state?.miles) {
        formData.append('travel', state.miles);
      }

      // ✅ Append fixed location fields (since they’re required)
      formData.append('latitude', 40.758);
      formData.append('longitude', 73.9855);
      formData.append('locationName', 'Times Square, NYC');

      // ✅ Append only if workingDays not empty
      if (filteredTimes.length > 0) {
        formData.append('workingDays', JSON.stringify(filteredTimes));
      }

      // ✅ Append only if services selected
      if (value?.length > 0) {
        formData.append('serviceId', JSON.stringify(value));
      }

      // ✅ Append only if add-ons selected
      if (valueAddOn?.length > 0) {
        formData.append('addOn', JSON.stringify(valueAddOn));
      }

      // ✅ Finally call the API
      const res = await updateProfile(formData).unwrap();
      console.log('response of update ===>', res);
      ShowToast(res.message);
    } catch (error) {
      console.log('error while update ===>', error);
      ShowToast(error?.data?.message || 'Something went wrong');
    }
  };
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Edit Profile'} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => pickImage()}>
            <Image
              source={
                image
                  ? { uri: image }
                  : userImage
                  ? { uri: `${IMAGE_URL}${userImage}` }
                  : AppImages.profile
              }
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
            title={fullName}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />
          <AppText title={email} textColor={AppColors.GRAY} textSize={1.8} />
        </View>
        <LineBreak space={5} />

        <View>
          <AppText
            title={'Full Name'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />

          <AppTextInput
            inputHeight={5}
            onChangeText={val => onChangeText('fullName', val)}
            inputPlaceHolder={'Name'}
          />
        </View>

        <LineBreak space={2} />

        {/* <View>
          <AppText
            title={'Email Address'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'Email Address'} />
        </View> */}

        <View>
          <AppText
            title={'Cell phone Number'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          {/* <AppTextInput inputPlaceHolder={'Mobile number'} /> */}
          <PhoneInputScreen
            onChangePhoneNumber={number => {
              onChangeText('number', number);
            }}
            phoneRef={phoneRef}
          />
        </View>
        {/* <LineBreak space={2} /> */}

        {/* <View
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
        </View> */}

        <LineBreak space={2} />

        <View>
          <AppText
            title={'City & Zip Code'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput
            inputHeight={5}
            onChangeText={val => onChangeText('cityZipCode', val)}
            inputPlaceHolder={'City & Zip Code'}
          />
        </View>

        <LineBreak space={2} />
        <View>
          <AppText
            title={'Select Your Gender:'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <DropDownPicker
            open={openGender}
            value={valueGender}
            items={gender}
            setOpen={setOpenGender}
            setValue={setValueGender}
            setItems={setGender}
            min={0}
            max={8}
            autoScroll
            placeholderStyle={{
              color: AppColors.ThemeBlue,
              paddingHorizontal: responsiveWidth(4),
            }}
            placeholder="Male"
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
            title={'How many miles you willing to travel from your home?'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput
            inputHeight={5}
            onChangeText={val => onChangeText('miles', val)}
            inputPlaceHolder={'Up to 70 miles max'}
          />
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
          {/* <View
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
                  value={time.Tuesday.from}
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
                  value={time.Tuesday.to}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
          </View> */}

          {time.map((item, index) => (
            <View
              key={item.day}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <AppText
                title={item.day}
                textColor={AppColors.ThemeBlue}
                textSize={2}
              />

              <View
                style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
              >
                <TouchableOpacity
                  onPress={() => showDatePicker(index, 'startTime')}
                >
                  <FromInput
                    label={'From'}
                    value={item.startTime}
                    editable={false}
                  />
                </TouchableOpacity>

                <AppText
                  title={'-'}
                  textColor={AppColors.ThemeBlue}
                  textSize={6}
                />

                <TouchableOpacity
                  onPress={() => showDatePicker(index, 'endTime')}
                >
                  <FromInput
                    label={'To'}
                    value={item.endTime}
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
          handlePress={handleAddAnotherInterval}
          textFontWeight={false}
        />

        <LineBreak space={5} />

        <AppButton
          title={
            updateLoading ? (
              <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            ) : (
              'Save Information'
            )
          }
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={onUpdatePress}
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
