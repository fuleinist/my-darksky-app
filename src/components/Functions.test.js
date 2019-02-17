import {weekofDay,convertTemp,Capword} from '../components/Functions';

test('WeekofDay Test', () => {
  let time = new Date('1 January 1985').getTime();
  expect(weekofDay(time/1000)).toBe('Tuesday');
  time = new Date('2 January 1985').getTime();
  expect(weekofDay(time/1000)).toBe('Wednesday');
  time = new Date('3 January 1985').getTime();
  expect(weekofDay(time/1000)).toBe('Thursday'); 
});
 
test('Capword Test', () => {
  expect(Capword('abc')).toBe('Abc');
  expect(Capword('abCd')).toBe('Abcd'); 
  expect(Capword('1Abc')).toBe('1abc');
});

test('convertTemp Test', () => {
  expect(convertTemp(10.352654)).toBe(10);
  expect(convertTemp(1234)).toBe(1234); 
  expect(convertTemp(3.75)).toBe(4);
});

