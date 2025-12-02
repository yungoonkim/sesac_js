//신버전이 문제가 되면..
//기존 require 문법을 모두 다 import from
//npm install uuid@8

//const {v4: uuidv4} = require('uuid'); //변수 v4에 uuid ver4를 가져와서 저장
//const id = require('uuid');
import{v4 as uuidv4} from 'uuid';

const myid = uuidv4();
console.log('생성된 UUID: ', myid);