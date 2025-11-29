/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import {
  AppColors,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../utils';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import PhoneInputScreen from '../../components/PhoneInput';
import DropDownPicker from 'react-native-dropdown-picker';
import RNFS from 'react-native-fs';
import { pick, types } from '@react-native-documents/picker';
import { useSelector } from 'react-redux';
import {
  useGetAddOnsQuery,
  useGetServicesQuery,
  useLazyGetServicesQuery,
} from '../../redux/services/MainIntegration';
import { useUpdateProfileMutation } from '../../redux/services';

const FillTheDetails = () => {
  const nav = useNavigation();
  const phoneRef = useRef();
  const [open, setOpen] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [value, setValue] = useState([]); // store multiple values here
  const [state, setState] = useState({
    fullName: '',
    number: '',
    cityZipCode: '',
    miles: '',
    notesInfo: '',
  });
  // console.log('valueGender', valueGender);
  // const [items, setItems] = useState([
  //   { label: 'Solo Massage', value: 'Solo Massage' },
  //   { label: 'Couples Massage', value: 'Couples Massage' },
  //   { label: 'Group Yoga', value: 'Group Yoga' },
  //   { label: 'Sound Bath', value: 'Sound Bath' },
  //   { label: 'Spa Party', value: 'Spa Party' },
  //   { label: 'Corporate Chair Massage', value: 'Corporate Chair Massage' },
  //   { label: 'Vibroacoustic Therapy', value: 'Vibroacoustic Therapy' },
  //   { label: 'Facial', value: 'Facial' },
  // ]);

  const [openAddOn, setOpenAddOn] = useState(false);
  const [valueAddOn, setValueAddOn] = useState([]); // store multiple values here
  const [certificates, setCertificates] = useState([]);
  const { user } = useSelector(state => state.persistedData);
  // const [getServices, { isLoading, data }] = useGetServicesQuery();
  const { data, isLoading, isError } = useGetServicesQuery(undefined, {
    refetchOnMountOrArgChange: true, // automatically fetch fresh data
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const {
    data: addOnData,
    isLoading: addOnLoading,
    isError: addOnError,
  } = useGetAddOnsQuery(undefined, {
    refetchOnMountOrArgChange: true, // automatically fetch fresh data
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  console.log('value', value);
  console.log('certificates', certificates);
  // const [servicesData, setServicesData] = useState([]);
  const [items, setItems] = useState([]);
  const [gender, setGender] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]);
  const [valueGender, setValueGender] = useState([]); // store multiple values here

  const [itemsAddOn, setItemsAddOn] = useState([]);
  const { _id, type } = user;
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateProfileMutation();

  console.log('items', items);

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

  const onChangeText = (state, value) => {
    setState(prevState => ({
      ...prevState,
      [state]: value,
    }));
  };
  const uploadDocument = async () => {
    try {
      const results = await pick({
        type: [types.images, types.pdf],
        allowMultiSelection: true,
      });

      if (!results || results.length === 0) return;

      // Convert all picked files
      const docs = await Promise.all(
        results.map(async file => {
          const base64 = await RNFS.readFile(file.uri, 'base64');
          return {
            uri: file.uri,
            name: file.name,
            type: file.type,
            base64,
          };
        }),
      );

      // Append new documents to existing ones
      setCertificates(prev => [...prev, ...docs]);
    } catch (err) {
      console.log('Picker error:', err);
    }
  };

  // const getServicesHandler = async () => {
  //   await getServices()
  //     .unwrap()
  //     .then(res => {
  //       console.log('response of getServices ===>', res);
  //       if (res.success) {
  //         // Transform data into DropDownPicker format
  //         const formatted = res.data.map(item => ({
  //           label: item.serviceName, // or item.serviceName, depending on your API
  //           value: item._id, // or whatever unique ID you have
  //         }));

  //         setItems(formatted);
  //         setServicesData(res.data); // optional if you need raw data
  //       } else {
  //         ShowToast(res.message || 'Failed to load services');
  //       }
  //     })
  //     .catch(error => {
  //       console.log('error while fetching services ===>', error);
  //       ShowToast('Some problem occurred while loading services');
  //     });
  // };

  // useEffect(() => {
  //   getServices();
  // }, []);

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
      console.log('addondatata', addOnData[0]);
      const formatted = addOnData.data.map(item => ({
        label: item.name,
        value: item._id,
      }));
      setItemsAddOn(formatted);
    }
  }, [addOnData]);

  const onUpdatePress = async () => {
    console.log('value', value);
    console.log('add on', valueAddOn);
    try {
      const formData = new FormData();

      formData.append('id', _id);
      formData.append('type', type);
      if (state?.fullName) {
        formData.append('fullName', state?.fullName);
      }
      if (state?.cityZipCode) {
        formData.append('city', state?.cityZipCode);
      }
      if (valueGender) {
        formData.append('gender', valueGender);
      }
      if (state?.number) {
        formData.append('phoneNumber', state?.number);
      }
      formData.append('latitude', 40.758);
      formData.append('longitude', 73.9855);
      formData.append('locationName', 'Times Square, NYC');
      if (state?.miles) {
        formData.append('travel', state?.miles);
      }
      if (state?.notesInfo) {
        formData.append('about', state?.notesInfo);
      }
      if (value?.length) {
        formData.append('serviceId', JSON.stringify(value));
      }
      if (valueAddOn?.length) {
        formData.append('addOn', JSON.stringify(valueAddOn));
      }
      // ✅ Append multiple certificates
      if (certificates?.length) {
        certificates.forEach((file, index) => {
          formData.append('certificate', {
            uri: file.uri,
            name: file.name || `certificate_${index}.pdf`,
            type: file.type || 'application/pdf',
          });
        });
      }

      // ✅ Now call the API
      const res = await updateProfile(formData).unwrap();
      console.log('response of update ===>', res);
      ShowToast(res.message);
    } catch (error) {
      console.log('error while update ===>', error);
      ShowToast(error?.data?.message);
    }
  };
  return (
    <Container>
      <LineBreak space={2} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AuthHeader
          heading="Create Your Profile"
          subHeading="Please enter your personal information below. i-thriv does not share any date with third parties."
        />
        <LineBreak space={4} />
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
            inputPlaceHolder={''}
          />
        </View>
        {/* <View>
          <AppText
            title={'Email Address'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput
            onChangeText={val => onChangeText('email', val)}
            inputPlaceHolder={''}
          />
        </View> */}
        <LineBreak space={2} />
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
        <LineBreak space={2} />
        <View>
          <AppText title={'City'} textColor={AppColors.GRAY} textSize={1.8} />
          <LineBreak space={0.5} />
          <AppTextInput
            inputHeight={5}
            onChangeText={val => onChangeText('cityZipCode', val)}
            inputPlaceHolder={''}
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
            placeholder="Select Your Gender"
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
            title={'Select Your Core Services:'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          {/* <View
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(6),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: AppColors.inputGrayBg,
              borderRadius: 100,
              alignSelf: 'center',
              paddingLeft: responsiveWidth(3.5),
            }}
          >
            <Picker
              selectedValue={service}
              mode="dropdown"
              dropdownIconColor={AppColors.ThemeBlue}
              style={{
                width: '100%',
                color: AppColors.ThemeBlue,
              }}
              onValueChange={itemValue => setService(itemValue)}
            >
              <Picker.Item label="Solo Massage" value="Solo Massage" />
               <Picker.Item label="Couples Massage" value="Couples Massage" />
              <Picker.Item label="Group Yoga" value="Group Yoga" />
              <Picker.Item label="Sound Bath" value="Sound Bath" />
              <Picker.Item label="Spa Party" value="Spa Party" />
              <Picker.Item label="Corporate Chair Massage" value="Corporate Chair Massage" />
              <Picker.Item label="Vibroacoustic Therapy" value="Vibroacoustic Therapy" />
              <Picker.Item label="Facial" value="Facial" />
            </Picker>
          </View> */}
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
          {/* <View
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(6),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: AppColors.inputGrayBg,
              borderRadius: 100,
              alignSelf: 'center',
              paddingLeft: responsiveWidth(3.5),
            }}
          >
            <Picker
              selectedValue={addOnOffer}
              mode="dropdown"
              dropdownIconColor={AppColors.ThemeBlue}
              style={{
                width: '100%',
                color: AppColors.ThemeBlue,
              }}
              onValueChange={itemValue => setAddOnOffer(itemValue)}
            >
              <Picker.Item
                label="1 Provider (Back to Back)"
                value="1 Provider (Back to Back)"
              />
              <Picker.Item
                label="2 Providers (Side by side)"
                value="2 Providers (Side by side)"
              />
              <Picker.Item
                label="Aromatherapy (+$25 per  Person)"
                value="Aromatherapy (+$25 per  Person)"
              />
              <Picker.Item
                label="Hot Stone (+$45 per Person)"
                value="Hot Stone (+$45 per Person)"
              />
            </Picker>
          </View> */}
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
            title={'Notes and additional information'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput
            onChangeText={val => onChangeText('notesInfo', val)}
            inputPlaceHolder={''}
            inputHeight={10}
            borderRadius={5}
          />
        </View>

        <LineBreak space={certificates.length ? 3 : 2} />
        {certificates.length > 0 && (
          <View style={{ marginBottom: 15 }}>
            {certificates.map((doc, index) => (
              <Text
                key={index}
                style={{
                  color: AppColors.BLACK,
                  marginBottom: 5,
                }}
              >
                {doc.name}
              </Text>
            ))}
          </View>
        )}
        <LineBreak space={certificates.length ? 0 : 2} />

        <AppButton
          title="Upload your ID or Certificate"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.ThemeBlue}
          handlePress={uploadDocument}
          textFontWeight={false}
        />
        <LineBreak space={2} />

        <AppButton
          title={
            updateLoading ? (
              <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            ) : (
              'Submit Now'
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

export default FillTheDetails;

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
