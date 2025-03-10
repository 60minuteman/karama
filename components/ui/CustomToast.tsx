import CircleCheck from '@/assets/images/checkcirclesuccess.svg';
import Info from '@/assets/images/informationcircle.svg';
import XCircle from '@/assets/images/xcircleerror.svg';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Cancel from '../assets/images/x-mark.svg';

export const SuccessToast = (props: any) => (
  <View
    style={{
      borderRadius: 12,
      backgroundColor: '#DCFCE7',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'hidden',
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginRight: 32,
      }}
    >
      <View style={{ marginRight: 8 }}>
        <CircleCheck fill={'#293314'} />
      </View>
      <View>
        {props.text1 && (
          <Text
            style={{
              color: '#293314',
              fontFamily: 'RedHatDisplay-Bold',
              fontSize: 16,
              lineHeight: 19.2,
              marginBottom: 2,
            }}
          >
            {props.text1}
          </Text>
        )}
        {props.text2 && (
          <Text
            style={{
              color: '#293314',
              fontFamily: 'RedHatDisplay-Regular',
              fontSize: 14,
              lineHeight: 16.8,
            }}
          >
            {props.text2}
          </Text>
        )}
      </View>
    </View>
    <TouchableOpacity onPress={() => Toast.hide()}>
      <Cancel stroke='#293314' strokeWidth={2} width={28} height={28} />
    </TouchableOpacity>
  </View>
);

export const ProblemToast = (props: any) => (
  <View
    style={{
      borderRadius: 12,
      backgroundColor: '#FFD7DA',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'hidden',
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginRight: 32,
      }}
    >
      <View style={{ marginRight: 8 }}>
        <XCircle />
      </View>
      <View>
        <Text
          style={{
            color: '#FF3947',
            fontFamily: 'RedHatDisplay-Bold',
            fontSize: 16,
            lineHeight: 19.2,
            marginBottom: 2,
          }}
        >
          {props.text1}
        </Text>
        <Text
          style={{
            color: '#FF3947',
            fontFamily: 'RedHatDisplay-Regular',
            fontSize: 14,
            lineHeight: 16.8,
          }}
        >
          {props.text2}
        </Text>
      </View>
    </View>
    <TouchableOpacity onPress={() => Toast.hide()}>
      <Cancel stroke='#FF3947' strokeWidth={2} width={28} height={28} />
    </TouchableOpacity>
  </View>
);

export const InfoToast = (props: any) => (
  <View
    style={{
      borderRadius: 12,
      backgroundColor: '#FFE8D7',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginRight: 32,
      }}
    >
      <View style={{ marginRight: 8 }}>
        <Info />
      </View>
      <View>
        {props.text1 && (
          <Text
            style={{
              color: '#FF8C39',
              fontFamily: 'RedHatDisplay-Bold',
              fontSize: 16,
              lineHeight: 19.2,
              marginBottom: 2,
            }}
          >
            {props.text1}
          </Text>
        )}
        {props.text2 && (
          <Text
            style={{
              color: '#FF8C39',
              fontFamily: 'RedHatDisplay-Regular',
              fontSize: 14,
              lineHeight: 16.8,
            }}
          >
            {props.text2}
          </Text>
        )}
      </View>
    </View>
    <TouchableOpacity onPress={() => Toast.hide()}>
      <Cancel stroke='#FF8C39' strokeWidth={2} width={28} height={28} />
    </TouchableOpacity>
  </View>
);

export const ComingSoonToast = (props: any) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        borderRadius: 70,
        backgroundColor: 'black',
        paddingVertical: 18.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontFamily: 'RedHatDisplay-SemiBold',
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        {props.text1}
      </Text>
    </View>
  </View>
);
