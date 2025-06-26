import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import CardStack from 'react-native-card-stack-swiper';
import { SwipeOverlay } from './swipe-overlay';
import ProfileCardLoader from '@/components/cards/ProfileCardLoader';
import EmptyDiscovery from '@/components/discovery/EmptyDiscovery';
import { CaregiverContainer } from '@/components/home/CaregiverContainer';
import { ContainerTwo } from '@/components/home/ContainerTwo';

interface SwipeableCardStackProps {
  data: any[];
  onSwipeRight?: (item: any, index: number) => void | Promise<void>;
  onSwipeLeft?: (item: any, index: number) => void | Promise<void>;
  loading?: boolean;
  userRole?: 'FAMILY' | 'CAREGIVER';
  caregiverProfileData?: any;
  familyProfileData?: any;
  containerStyle?: any;
  cardContainerStyle?: any;
  stackSize?: number;
  swipeThreshold?: number;
  enableVerticalSwipe?: boolean;
}

export interface SwipeableCardStackRef {
  goBackFromLeft: () => void;
  swipeRight: () => void;
  swipeLeft: () => void;
}

const SwipeableCardStack = forwardRef<SwipeableCardStackRef, SwipeableCardStackProps>(({
  data = [],
  onSwipeRight,
  onSwipeLeft,
  loading = false,
  userRole = 'FAMILY',
  caregiverProfileData,
  familyProfileData,
  containerStyle,
  cardContainerStyle,
  stackSize = 2,
  swipeThreshold = 50,
  enableVerticalSwipe = false
}, ref) => {
  const { height: screenHeight } = useWindowDimensions();
  const swiper = useRef<CardStack>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCards, setSwipedCards] = useState<Array<{ index: number }>>([]);

  useImperativeHandle(ref, () => ({
    goBackFromLeft: () => {
      if (swipedCards.length > 0) {
        const lastCard = swipedCards[swipedCards.length - 1];
        setSwipedCards(prev => prev.slice(0, -1));
        setCurrentIndex(lastCard.index);
        swiper.current?.goBackFromLeft();
      }
    },
    swipeRight: () => swiper.current?.swipeRight(),
    swipeLeft: () => swiper.current?.swipeLeft()
  }));

  const handleLike = () => swiper.current?.swipeRight();
  const handleReject = () => swiper.current?.swipeLeft();

  const handleSwipedRight = async (index: number) => {
    setCurrentIndex(index + 1);
    setSwipeDirection(null);
    setSwipeProgress(0);
    
    if (onSwipeRight && data[index]) {
      try {
        await onSwipeRight(data[index], index);
      } catch (error) {
        console.error('Error in onSwipeRight handler:', error);
      }
    }
  };

  const handleSwipedLeft = async (index: number) => {
    setSwipedCards(prev => [...prev, { index }]);
    setCurrentIndex(index + 1);
    setSwipeDirection(null);
    setSwipeProgress(0);
    
    if (onSwipeLeft && data[index]) {
      try {
        await onSwipeLeft(data[index], index);
      } catch (error) {
        console.error('Error in onSwipeLeft handler:', error);
      }
    }
  };

  const handleSwipeEnd = () => {
    setSwipeDirection(null);
    setSwipeProgress(0);
  };

  const handleSwipeProgress = (progress: number) => {
    const normalizedProgress = Math.min(Math.abs(progress / swipeThreshold), 1);
    setSwipeProgress(normalizedProgress);
    if (progress < 0) {
      setSwipeDirection('left');
    } else if (progress > 0) {
      setSwipeDirection('right');
    }
  };

  const renderCard = (item: any) => {
    if (userRole === 'FAMILY') {
      return (
        <ContainerTwo
          data={item}
          profileData={caregiverProfileData}
          onLike={handleLike}
          onReject={handleReject}
          role="CAREGIVER"
        />
      );
    } else {
      return (
        <CaregiverContainer
          data={item}
          profileData={familyProfileData}
          onLike={handleLike}
          onReject={handleReject}
        />
      );
    }
  };

  const renderLoading = () => <ProfileCardLoader />;
  
  const renderEmpty = () => <EmptyDiscovery role={userRole} />;

  return (
    <View style={[styles.container, { height: screenHeight * 0.7 }, containerStyle]}>
      {loading ? (
        <View style={styles.loadingContainer}>
          {renderLoading()}
        </View>
      ) : data.length === 0 ? (
        <View style={styles.emptyContainer}>
          {renderEmpty()}
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <CardStack
            ref={swiper}
            style={styles.cardStack}
            renderNoMoreCards={() => null}
            onSwipedRight={handleSwipedRight}
            onSwipedLeft={handleSwipedLeft}
            onSwipeEnd={handleSwipeEnd}
            onSwipeProgress={handleSwipeProgress}
            disableTopSwipe={!enableVerticalSwipe}
            disableBottomSwipe={!enableVerticalSwipe}
            verticalSwipe={enableVerticalSwipe}
            cardContainerStyle={[styles.cardContainerStyle, cardContainerStyle]}
            stackSize={stackSize}
            swipeThreshold={swipeThreshold}
          >
            {data.map((item, index) => (
              <View key={index} style={styles.mainCard}>
                {renderCard(item)}
                <View style={[StyleSheet.absoluteFill, styles.overlayContainer]}>
                  {swipeDirection && (
                    <SwipeOverlay 
                      type={swipeDirection === 'right' ? 'like' : 'skip'}
                      opacity={swipeProgress}
                    />
                  )}
                </View>
              </View>
            ))}
          </CardStack>
        </View>
      )}
    </View>
  );
});

export { SwipeableCardStack };

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  cardContainer: {
    flex: 1,
    marginVertical: '5%',
    position: 'relative',
  },
  cardStack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainerStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mainCard: {
    flex: 1,
    position: 'relative',
    borderRadius: 40,
    overflow: 'hidden',
  },
  overlayContainer: {
    overflow: 'hidden',
    borderRadius: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}); 