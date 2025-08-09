import { Dimensions } from "react-native";
import { AppImages } from "../assets/images";
import { AppIcons } from "../assets/icons";

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