import React from 'react';
import CardItem from './CardItem';
import styles from './Cards.module.css'; // CSS Modules를 이용한 스타일 import

function Cards() {
  return (
    <div className={styles.cards}>
      <h1>Fashion KEY Point</h1>
      <div className={styles.cardsContainer}>
        <div className={styles.cardsWrapper}>
          <CardGroup
            items={[
              {
                src: '/images/points/points-1.png',
                text: '변화하는 트렌드를 반영하여 평범하지 않고 개성있는 디테일을 추구하는 스타일',
                label: '유니크 Point',
                path: '/lookbook',
              },
              // 다른 CardItem들도 마찬가지로 추가
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function CardGroup({ items }) {
  return (
    <ul className={styles.cardsItems}>
      {items.map((item, index) => (
        <CardItem
          key={index}
          src={item.src}
          text={item.text}
          label={item.label}
          path={item.path}
        />
      ))}
    </ul>
  );
}

export default Cards;
