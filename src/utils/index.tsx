import { Dimensions } from "react-native";
import { AppImages } from "../assets/images";
import { AppIcons } from "../assets/icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const percentageCalculation = (max: number, val: number) => max * (val / 100);

const fontCalculation = (height: number, width: number, val: number) => {
    const widthDimension = height > width ? width : height;
    const aspectRatioBasedHeight = (16 / 9) * widthDimension;
    return percentageCalculation(Math.sqrt(Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2)), val);
};
export const responsiveFontSize = (f: number) => {
    const { height, width } = Dimensions.get("window");
    return fontCalculation(height, width, f);
};
export const responsiveHeight = (h: number) => {
    const { height } = Dimensions.get("window");
    return height * (h / 100)
}
export const responsiveWidth = (w: number) => {
    const { width } = Dimensions.get("window");
    return width * (w / 100)
}

export const AppColors = {
    BLACK: "#000000",
    WHITE: "#FFFFFF",
    BTNCOLOURS: "#F48A88",
    LIGHT_BTNCOLOURS: "#6e3357",
    LIGHTGRAY: "#D9D9D9",
    LIGHTESTGRAY: "#F0F3F6",
    BLUE: "#001AB0",
    GRAY: "#777777",
    CRNBERRY: "#ED4C5C",
    DARKGRAY: "#939393",
    PEACHCOLOUR: "#F7D794",
    INPUTBG: "#F5F5F5",
    BGCOLOURS: "#FDFDFD",
    PRIMARY: "#7DD6F7",
    THEME_COLOR: '#924dbf',
    RED_COLOR: '#F75555',
    DARK_RED: 'red',
    ThemeBlue: '#009CBD',
    Yellow: '#FF9C12',
    lightRed: '#FFD7D7',
    appBgColor: '#e7e4e4',
    hotPink: '#E74B90',
    royalBlue: '#2F6CAD',
    darkBlue: '#33434F',
    darkYellow: '#E55B13',
    lowGreen: '#587B58',
    lightGreen: '#5EC246',
    inputBg: '#fafafa',
    inputBlur: '#f2f1fe',
    lightestBlue: '#CDECF3',
};

export const banner = [
    { id: 1, img: AppImages.banner1 },
    { id: 2, img: AppImages.banner2 },
]

export const services = [
    { id: 1, icon: AppIcons.service1, title: 'Massage at Home' },
    { id: 2, icon: AppIcons.service2, title: 'Couples Massage' },
    { id: 3, icon: AppIcons.service3, title: 'Spa Party' },
    { id: 4, icon: AppIcons.service4, title: 'Corporate Chair Massage' },
    { id: 5, icon: AppIcons.service5, title: 'Group Yoga' },
    { id: 6, icon: AppIcons.service6, title: 'Sound Bath' },
    { id: 7, icon: AppIcons.service7, title: 'Vibroacoustic Therapy' },
    { id: 8, icon: AppIcons.service8, title: 'Mobile Facials' },
]

export const specialistsYouFollow = [
    { id: 1, img: AppImages.follower1 },
    { id: 2, img: AppImages.follower2 },
    { id: 3, img: AppImages.follower3 },
    { id: 4, img: AppImages.follower4 },
    { id: 5, img: AppImages.follower5 },
]

export const featuredSpecialists = [
    { id: 1, img: AppImages.featured1, service: 'Hair . Nails . Facial', name: 'Ronald', location: '360 Stillwater Rd. Palm City..', rating: '4.8', num: '(3.1k)' },
    { id: 2, img: AppImages.featured2, service: 'Hair . Facial . 2+', name: 'Bella', location: '2607  Haymond Rocks ..', rating: '4.7', num: '(2.7k)' },
]

export const mostSearchInterest = [
    { id: 1, icon: AppIcons.search1, title: 'Massage' },
    { id: 2, icon: AppIcons.search2, title: 'Spa party' },
    { id: 3, icon: AppIcons.search3, title: 'Nails' },
]

export const nearbyItems = [
    { id: 1, img: AppImages.nearby, service: 'Hair . Facial', name: 'Joseph', location: '360 Stillwater Rd. Palm City..', rating: '4.8', num: '(3.1k)', offTag: '-58%', labelText: '1,1km' },
    { id: 2, img: AppImages.nearby2, service: 'Hair . Massage . 2+', name: 'Bella', location: '2607  Haymond Rocks ..', rating: '4.7', num: '(2.7k)', offTag: '-28%', labelText: '2,1km' },
]

export const mostSearchInterestSerivces = [
    { id: 1, icon: AppIcons.search1, title: 'Massage' },
    { id: 2, icon: AppIcons.search2, title: 'Skin Care' },
    { id: 3, icon: AppIcons.search3, title: 'Nails' },
]

export const SpecialistProfileServices = [
    { id: 1, img: AppImages.service, serviceName: 'Chair Message', price: '$50', time: '2 hour', desc: 'A blunt cut bob is a shorter hairstyle that...', offTag: '-58%', },
    { id: 2, img: AppImages.service, serviceName: 'Chair Message', price: '$50', time: '2 hour', desc: 'A blunt cut bob is a shorter hairstyle that...', offTag: '-58%', },
]

export const categories = [
    { id: 1, icon: AppIcons.search1, title: 'Massage' },
    { id: 2, icon: AppIcons.search2, title: 'Therapy' },
    { id: 3, icon: AppIcons.search2, title: 'Skin Care' },
    { id: 4, icon: AppIcons.search3, title: 'Coloring' },
]

export const recentSearch = [
    { id: 1, title: 'Hair service' },
    { id: 2, title: 'Nail' },
    { id: 3, title: 'Wax' },
]

export const datesItem = [
    { id: 1, day: 'Wed', date: '9' },
    { id: 2, day: 'Thu', date: '10' },
    { id: 3, day: 'Fri', date: '21' },
    { id: 4, day: 'Sat', date: '21' },
    { id: 5, day: 'Sun', date: '21' },
    { id: 6, day: 'Mon', date: '21' },
]

export const appointmentsTab = [
    { id: 1, title: 'Completed Appointments' },
    { id: 2, title: 'Upcoming Appointments' },
    { id: 3, title: 'Ongoing Appointments' },
]

export const completedAppointments = [
    { id: 1, title: 'Appointment #1234', status: 'Completed', image: AppImages.follower1, name: 'Richard', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Massage', date: '01 July 2025' },
    { id: 2, title: 'Appointment #1234', status: 'Completed', image: AppImages.follower1, name: 'Olivia', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'SPY', date: '29 Jun 2025' },
    { id: 3, title: 'Appointment #1234', status: 'Completed', image: AppImages.follower1, name: 'Samantha', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Skin Care', date: '01 July 2025' },
]

export const upcomingAppointments = [
    { id: 1, title: 'Appointment #1234', status: 'Upcoming', image: AppImages.follower1, name: 'Richard', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Massage', date: '01 July 2025' },
    { id: 2, title: 'Appointment #1234', status: 'Upcoming', image: AppImages.follower1, name: 'Olivia', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'SPY', date: '29 Jun 2025' },
    { id: 3, title: 'Appointment #1234', status: 'Upcoming', image: AppImages.follower1, name: 'Samantha', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Skin Care', date: '01 July 2025' },
]

export const ongoingAppointments = [
    { id: 1, title: 'Appointment #1234', appointmentStatus: 'EN Route', status: 'Ongoing', image: AppImages.follower1, name: 'Richard', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Massage', date: '01 July 2025' },
    { id: 2, title: 'Appointment #1234', appointmentStatus: 'Arrive', status: 'Ongoing', image: AppImages.follower1, name: 'Olivia', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'SPY', date: '29 Jun 2025' },
    { id: 3, title: 'Appointment #1234', appointmentStatus: 'EN Route', status: 'Ongoing', image: AppImages.follower1, name: 'Samantha', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Skin Care', date: '01 July 2025' },
]

export const galleryImages = [
    { id: 1, image: AppImages.service },
    { id: 2, image: AppImages.service },
    { id: 3, image: AppImages.service },
]

export const ourSpecialists = [
    { id: 1, img: AppImages.follower1, name: 'Ronald' },
    { id: 2, img: AppImages.follower2, name: 'Ronald' },
    { id: 3, img: AppImages.follower3, name: 'Ronald' },
    { id: 4, img: AppImages.follower4, name: 'Ronald' },
    { id: 5, img: AppImages.follower5, name: 'Ronald' },
]

export const reviews = [
    { id: 1, image: AppImages.follower1, name: 'Jennie Whang', time: '2 days ago', desc: 'The place was clean, great serivce, stall are friendly. I will certainly recommend to my friends and visit again! ;)', rating: AppImages.rating },
    { id: 1, image: AppImages.follower1, name: 'Jennie Whang', time: '2 days ago', desc: 'The place was clean, great serivce, stall are friendly. I will certainly recommend to my friends and visit again! ;)', rating: AppImages.rating },
]

export const timesItems = [
    { id: 1, time: '08:00 AM', },
    { id: 2, time: '08:00 AM', },
    { id: 3, time: '08:00 AM', },
    { id: 4, time: '08:00 AM', },
    { id: 5, time: '08:00 AM', },
    { id: 6, time: '08:00 AM', },
]

export const shopDetail = [
    { id: 1, title: 'Therapy . Skin Care . 2+', rating: '4.7', number: '2.7k', label: '-58% ', tex: '(6 pax available)', status: 'Available', image: AppImages.follower1, name: 'Ronald', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Massage', date: '01 July 2025' },
]

export const checkoutPart1 = [
    { id: 1, title: 'Date', subTitle: 'March, 10th 2021' },
    { id: 2, title: 'Start Time', subTitle: '10:00 AM' },
    { id: 3, title: 'Specialist', subTitle: 'Bella' },
    { id: 4, title: 'Duration', subTitle: '3 hours' },
]

export const checkoutPart2 = [
    { id: 1, title: 'Blunt Cut', subTitle: '$50' },
    { id: 2, title: 'Manicure', subTitle: '$50' },
    { id: 3, title: 'Sub Total', subTitle: '$100' },
    { id: 4, title: 'Discount', subTitle: '-$30' },
]

export const userMyAccount = [
    { id: 1, title: 'My Account', },
    {
        id: 2, title: 'Personal information', icon: <FontAwesome
            name="user-o"
            size={responsiveFontSize(3.5)}
            color={AppColors.BLACK}
        />,
        navTo: 'PersonalInformation',
    },
    {
        id: 3, title: 'Privacy Policy', icon: <Octicons
            name="key-asterisk"
            size={responsiveFontSize(3.5)}
            color={AppColors.BLACK}
        />,
        navTo: 'PrivacyPolicy',
    },
    {
        id: 4, title: 'Appointment History', icon: <EvilIcons
            name="calendar"
            size={responsiveFontSize(4)}
            color={AppColors.BLACK}
        />
    },
]

export const specialistMyAccount = [
    { id: 1, title: 'My Account', },
    {
        id: 2, title: 'Personal information', icon: <FontAwesome
            name="user-o"
            size={responsiveFontSize(3.5)}
            color={AppColors.BLACK}
        />,
        navTo: 'ProviderPersonalInformation',
    },
    {
        id: 3, title: 'Privacy Policy', icon: <Octicons
            name="key-asterisk"
            size={responsiveFontSize(3.5)}
            color={AppColors.BLACK}
        />,
        navTo: 'PrivacyPolicy',
    },
    {
        id: 4, title: 'Appointment History', icon: <EvilIcons
            name="calendar"
            size={responsiveFontSize(4)}
            color={AppColors.BLACK}
        />
    },
    {
        id: 5, title: 'Internal Notes', icon: <MaterialIcons
            name="notes"
            size={responsiveFontSize(4)}
            color={AppColors.BLACK}
        />,
        navTo: 'InternalNotes',
    },
]

export const notifications = [
    { id: 1, title: 'Notifications', },
    {
        id: 2, title: 'Push Notifications', icon: <EvilIcons
            name="bell"
            size={responsiveFontSize(4)}
            color={AppColors.BLACK}
        />,
        rightIcon: <FontAwesome
            name="toggle-on"
            size={responsiveFontSize(4)}
            color={AppColors.ThemeBlue}
        />
    },
    {
        id: 3, title: 'Promotional Notifications', icon: <EvilIcons
            name="bell"
            size={responsiveFontSize(4)}
            color={AppColors.BLACK}
        />,
        rightIcon: <FontAwesome
            name="toggle-off"
            size={responsiveFontSize(4)}
            color={AppColors.GRAY}
        />
    },
]

export const moreItem = [
    { id: 1, title: 'More', },
    {
        id: 2, title: 'Frequently Asked Questions', icon: <Ionicons
            name="alert-circle-outline"
            size={responsiveFontSize(4)}
            color={AppColors.BLACK}
        />,
        navTo: 'AskQuestions',
    },
    {
        id: 3, title: 'Log Out', icon: <MaterialIcons
            name="logout"
            size={responsiveFontSize(4)}
            color={AppColors.RED_COLOR}
        />
    },
]

export const inboxTab = [
    { id: 1, title: 'Messages' },
    { id: 2, title: 'Notification' },
]

export const ChatThreads = [
    {
        id: 1,
        image: AppImages.fashion,
        name: 'Anika',
        message: 'Book 1 is so amazing 🙈',
        newMessage: 2,
    },
    {
        id: 2,
        image: AppImages.fashion,
        name: 'Shreya',
        message: 'i would like to meet the author',
        newMessage: 1,
    },
    {
        id: 3,
        image: AppImages.fashion,
        name: 'Lilly',
        message: 'You: Thankyou :)',
    },
    {
        id: 4,
        image: AppImages.fashion,
        name: 'Mona',
        message: 'i am going to refer this book to my friends...',
    },
    {
        id: 5,
        image: AppImages.fashion,
        name: 'Sonia',
        message: 'Are you serious?!',
    },
    {
        id: 6,
        image: AppImages.fashion,
        name: 'Monika',
        message: 'You: Thanks',
    },
    {
        id: 7,
        image: AppImages.fashion,
        name: 'Kiran',
        message: 'You: How are you? :)',
    },
    {
        id: 8,
        image: AppImages.fashion,
        name: 'Roshni',
        message: 'How Are you :)',
    }
]

export const newNotification = [
    {
        id: 1, icon: <EvilIcons
            name="calendar"
            size={responsiveFontSize(3.6)}
            color={AppColors.ThemeBlue}
        />, desc: 'Reminder! . Get ready for your appointment at 9am', time: 'Just now'
    }
]

export const earlyNotification = [
    {
        id: 1, icon: <Fontisto
            name="dollar"
            size={responsiveFontSize(2.8)}
            color={AppColors.ThemeBlue}
        />, desc: 'Payment at Lovely Lather was success!', time: '11.32 PM'
    },
    {
        id: 2, icon: <EvilIcons
            name="calendar"
            size={responsiveFontSize(3.6)}
            color={AppColors.ThemeBlue}
        />, desc: 'You make an appointment with Lovely Lather', time: 'Yesterday'
    },
    {
        id: 3, icon: <FontAwesome
            name="tag"
            size={responsiveFontSize(2.8)}
            color={AppColors.ThemeBlue}
        />, desc: 'Get 20% offers for hair service at Lovely Lather', time: 'Yesterday'
    },
    {
        id: 4, icon: <FontAwesome
            name="tag"
            size={responsiveFontSize(2.8)}
            color={AppColors.ThemeBlue}
        />, desc: 'Get 10% offers for hair service at Love Live Salon', time: 'Yesterday'
    },
    {
        id: 5, icon: <EvilIcons
            name="calendar"
            size={responsiveFontSize(3.6)}
            color={AppColors.ThemeBlue}
        />, desc: 'Reminder! . Get ready for your appointment at 9am', time: 'Yesterday'
    },
]

export const nearbySpecialists = [
    { id: 1, title: 'Therapy . Skin Care . 2+', rating: '4.7', number: '2.7k', label: '-58% ', tex: '(6 pax available)', status: 'Available', image: AppImages.follower1, name: 'Ronald', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Massage', date: '01 July 2025' },
    { id: 2, title: 'Therapy . Skin Care . 2+', rating: '4.7', number: '2.7k', label: '-58% ', tex: '(6 pax available)', status: 'Available', image: AppImages.follower1, name: 'Ronald', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Massage', date: '01 July 2025' },
]

export const typeItems = [
    { id: 1, title: 'User', svg: AppIcons.user },
    { id: 2, title: 'Therapist', svg: AppIcons.special },
]

export const homeStats = [
    { id: 1, title: 'Completed Appointments', num: '89' },
    { id: 2, title: 'Total Earnings', num: '$4.5K' },
    { id: 3, title: 'Total Tip Earnings', num: '$1.1K' },
]

export const todaysAppointments = [
    { id: 1, title: 'Appointment #1234', status: 'In Progress', image: AppImages.follower1, name: 'Richard', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Massage', },
    { id: 2, title: 'Appointment #1234', status: 'Upcoming', image: AppImages.follower1, name: 'Olivia', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'SPY', },
    { id: 3, title: 'Appointment #1234', status: 'Upcoming', image: AppImages.follower1, name: 'Samantha', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Skin Care', },
]

export const userRequestTab = [
    { id: 1, title: 'Open Request' },
    { id: 2, title: 'Direct Request' },
]

export const openRequest = [
    { id: 1, title: 'Appointment #1234', status: '01 Aug 2025', image: AppImages.follower1, name: 'Richard', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Massage', },
    { id: 2, title: 'Appointment #1234', status: '01 Aug 2025', image: AppImages.follower1, name: 'Olivia', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'SPY', },
    { id: 3, title: 'Appointment #1234', status: '01 Aug 2025', image: AppImages.follower1, name: 'Samantha', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Skin Care', },
]

export const directRequest = [
    { id: 1, title: 'Appointment #1234', status: '01 Aug 2025', image: AppImages.follower1, name: 'Richard', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Massage', },
    { id: 2, title: 'Appointment #1234', status: '01 Aug 2025', image: AppImages.follower1, name: 'Olivia', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'SPY', },
    { id: 3, title: 'Appointment #1234', status: '01 Aug 2025', image: AppImages.follower1, name: 'Samantha', location: '360 Stillwater Rd. Palm City, FL 34990', service: 'Skin Care', },
]
