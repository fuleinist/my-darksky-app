import {weekofDay,convertTemp,Capword} from '../components/Functions';

test('WeekofDay Saturday', () => {
  let time = new Date(1980, 6, 31).getTime();
  expect(weekofDay(time)).toBe('Saturday');
});

test('WeekofDay Sunday', () => {
  let time = new Date('December 18, 1995 03:24:00 GMT+1100').getTime();
  expect(weekofDay(time)).toBe('Sunday');
});

test('WeekofDay Monday', () => {
	let time = new Date('December 19, 1995 03:24:00 GMT+1100').getTime();
    expect(weekofDay(time)).toBe('Monday'); 
});

