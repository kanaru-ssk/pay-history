import { colors } from "constants/colors";

const LanguageIcon = () => {
  return (
    <svg width="18" height="18" className="inline mb-1">
      <path
        d="M15.8786 14.8038C15.8826 14.7978 15.8886 14.7917 15.8926 14.7857C17.2085 13.2207 18 11.2038 18 9C18 6.79621 17.2085 4.77924 15.8947 3.21429C15.8907 3.20826 15.8846 3.20424 15.8805 3.19821C15.8585 3.1721 15.8384 3.14799 15.8163 3.12388C15.8083 3.11384 15.8002 3.10581 15.7922 3.09576L15.7098 3.00134L15.7078 2.99933C15.6777 2.96518 15.6455 2.93103 15.6154 2.89688L15.6134 2.89486C15.5491 2.82657 15.4848 2.75826 15.4185 2.69196L15.4165 2.68995L15.3201 2.59353L15.3141 2.5875C15.2839 2.55736 15.2538 2.52924 15.2236 2.50112C15.2136 2.49107 15.2036 2.48103 15.1915 2.47098C15.1714 2.4509 15.1514 2.43281 15.1312 2.41473C15.1252 2.40871 15.1172 2.40267 15.1112 2.39464C13.5081 0.908031 11.3605 0 9 0C6.63951 0 4.49196 0.908031 2.88683 2.39464C2.88081 2.40067 2.87277 2.40669 2.86674 2.41473C2.84665 2.43281 2.82657 2.4529 2.80647 2.47299C2.79643 2.48304 2.78638 2.49308 2.77433 2.50312C2.74419 2.53125 2.71407 2.56138 2.68393 2.58951L2.6779 2.59553L2.58147 2.69196L2.57946 2.69397C2.51317 2.76027 2.44888 2.82857 2.3846 2.89688L2.38259 2.89888C2.35045 2.93304 2.32031 2.96719 2.29018 3.00134L2.28817 3.00335C2.26005 3.03348 2.23192 3.06562 2.20581 3.09777C2.19777 3.10781 2.18973 3.11585 2.18169 3.1259C2.1596 3.15 2.13951 3.17612 2.11741 3.20022C2.11339 3.20625 2.10736 3.21027 2.10335 3.21629C0.79152 4.77924 0 6.79621 0 9C0 11.2038 0.79152 13.2207 2.10536 14.7857C2.10938 14.7917 2.1154 14.7978 2.11942 14.8038L2.18169 14.8781C2.18973 14.8881 2.19777 14.8962 2.20581 14.9062L2.28817 15.0007C2.28817 15.0027 2.29018 15.0027 2.29018 15.0047C2.32031 15.0388 2.35045 15.073 2.38259 15.1052L2.3846 15.1071C2.44888 15.1755 2.51317 15.2438 2.57745 15.31L2.57946 15.3121C2.6116 15.3442 2.64174 15.3764 2.67388 15.4065L2.67991 15.4125C2.74621 15.4788 2.81451 15.5431 2.88281 15.6053C4.49196 17.0919 6.63951 18 9 18C11.3605 18 13.5081 17.0919 15.1131 15.6053C15.1816 15.5427 15.2486 15.4783 15.3141 15.4125L15.3201 15.4065C15.3522 15.3743 15.3843 15.3442 15.4145 15.3121L15.4165 15.31C15.4828 15.2438 15.5471 15.1755 15.6093 15.1071L15.6114 15.1052C15.6415 15.071 15.6736 15.0388 15.7038 15.0047C15.7038 15.0027 15.7058 15.0027 15.7058 15.0007C15.7339 14.9705 15.7621 14.9384 15.7881 14.9062C15.7962 14.8962 15.8043 14.8881 15.8123 14.8781C15.835 14.8539 15.8571 14.8291 15.8786 14.8038ZM15.9609 11.9391C15.6837 12.594 15.3181 13.2007 14.8721 13.7511C14.3698 13.317 13.8207 12.9404 13.2348 12.6281C13.4679 11.6859 13.6125 10.6514 13.6507 9.56246H16.5335C16.4733 10.3841 16.2803 11.1817 15.9609 11.9391ZM16.5335 8.43754H13.6507C13.6125 7.34866 13.4679 6.31407 13.2348 5.37188C13.8234 5.05848 14.3719 4.68081 14.8721 4.24888C15.8415 5.44214 16.4215 6.90416 16.5335 8.43754ZM11.9391 2.03907C12.7366 2.37657 13.4619 2.84264 14.1007 3.42924C13.7295 3.74523 13.3301 4.02633 12.9074 4.26897C12.5919 3.36495 12.1881 2.57947 11.7181 1.95067C11.7924 1.97879 11.8667 2.00893 11.9391 2.03907ZM10.119 16.1136C9.93411 16.2583 9.74931 16.3688 9.56246 16.4431V12.7165C10.3596 12.7721 11.1435 12.9496 11.8869 13.2429C11.7201 13.7371 11.5272 14.1931 11.3043 14.6049C10.9547 15.2558 10.5448 15.7761 10.119 16.1136ZM11.3043 3.39509C11.5252 3.80893 11.7201 4.26495 11.8869 4.75714C11.1435 5.05036 10.3596 5.22787 9.56246 5.28348V1.55893C9.74734 1.63326 9.93411 1.74174 10.119 1.88839C10.5448 2.22388 10.9547 2.74419 11.3043 3.39509ZM9.56246 11.5895V9.56246H12.5257C12.4935 10.4505 12.3831 11.3123 12.1983 12.1299L12.1922 12.154C11.3491 11.8343 10.4625 11.644 9.56246 11.5895ZM9.56246 8.43754V6.41049C10.4826 6.35424 11.3665 6.15938 12.1922 5.84598L12.1983 5.87009C12.3831 6.68772 12.4935 7.54755 12.5257 8.43754H9.56246ZM8.43754 9.56246V11.5895C7.51741 11.6457 6.63348 11.8407 5.80781 12.154L5.80179 12.1299C5.61696 11.3123 5.50647 10.4524 5.47433 9.56246H8.43754ZM5.47433 8.43754C5.50647 7.54955 5.61696 6.68772 5.80179 5.87009L5.80781 5.84598C6.63348 6.15938 7.5154 6.35424 8.43754 6.41049V8.43754H5.47433ZM8.43754 12.7165V16.4411C8.25266 16.3667 8.06585 16.2583 7.88103 16.1116C7.45514 15.7761 7.04331 15.2538 6.69375 14.6029C6.47277 14.1891 6.2779 13.7331 6.11116 13.2409C6.85848 12.9476 7.63593 12.7728 8.43754 12.7165ZM8.43754 5.28348C7.64037 5.22787 6.85649 5.05036 6.11317 4.75714C6.27991 4.26295 6.47277 3.80692 6.69576 3.39509C7.04531 2.74419 7.45514 2.22188 7.88303 1.88638C8.06786 1.74174 8.25266 1.63125 8.43951 1.55692V5.28348H8.43754ZM6.06093 2.03907C6.13527 2.00893 6.20759 1.97879 6.28192 1.95067C5.81183 2.57947 5.40803 3.36495 5.09264 4.26897C4.67076 4.0279 4.27098 3.74665 3.89933 3.42924C4.53817 2.84264 5.2634 2.37657 6.06093 2.03907ZM2.03907 6.06093C2.31629 5.40603 2.68192 4.79933 3.1279 4.24888C3.62812 4.68081 4.17657 5.05848 4.76518 5.37188C4.53214 6.31407 4.3875 7.34866 4.34933 8.43754H1.46652C1.52679 7.61585 1.71964 6.81831 2.03907 6.06093ZM1.46652 9.56246H4.34933C4.3875 10.6514 4.53214 11.6859 4.76518 12.6281C4.17933 12.9404 3.63018 13.317 3.1279 13.7511C2.15845 12.5578 1.57855 11.0958 1.46652 9.56246ZM6.06093 15.9609C5.2634 15.6234 4.53817 15.1574 3.89933 14.5707C4.27098 14.2533 4.67076 13.9741 5.09264 13.731C5.40803 14.635 5.81183 15.4205 6.28192 16.0493C6.20759 16.0212 6.13326 15.991 6.06093 15.9609ZM11.9391 15.9609C11.8647 15.991 11.7924 16.0212 11.7181 16.0493C12.1881 15.4205 12.5919 14.635 12.9074 13.731C13.3293 13.9721 13.729 14.2533 14.1007 14.5707C13.4654 15.1549 12.7341 15.6252 11.9391 15.9609Z"
        fill={colors.BLACK}
      />
    </svg>
  );
};

export default LanguageIcon;
