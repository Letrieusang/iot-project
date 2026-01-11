import React from 'react';
import '../style.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Hít thở không khí sạch hơn!</h1>
      <h3>Bảo vệ không khí của bạn mọi lúc, mọi nơi</h3>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/air-quality-for-home.webp'
              text='Chất lượng không khí cho gia đình'
              label='Home'
              path='/explore'
            />
            <CardItem
              src='images/air-quality-on-the-go.webp'
              text='Chất lượng không khí khi di chuyển'
              label='On the go'
              path='/explore'
            />
            <CardItem
              src='images/air-quality-for-offices.webp'
              text='Chất lượng không khí cho văn phòng'
              label='Office'
              path='/explore'
            />
          </ul>
          <ul className='cards__items'>
            
          <CardItem
              src='images/Schools.webp'
              text='Chất lượng không khí cho trường học'
              label='School'
              path='/explore'
            />
            <CardItem
              src='images/HospitalsClinics.webp'
              text='Chất lượng không khí cho bệnh viện'
              label='Hospitals Clinics'
              path='/explore'
            />
            <CardItem
              src='images/Museums.webp'
              text='Chất lượng không khí cho bảo tàng'
              label='Museums'
              path='/explore'
            />
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
