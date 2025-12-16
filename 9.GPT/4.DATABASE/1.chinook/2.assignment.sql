/* 1. 특정 사용자가 주문한 주문 목록 시간을 모두 출력하시오*/
SELECT u.id, u.name, o.orderat
FROM users u
JOIN orders o ON u.id=o.userid
WHERE u.id='0a497257-2b1a-4836-940f-7b95db952e61';


/* 2. 특정 사용자가 주문한 상점명과 상품명을 모두 출력하시오  */
SELECT u.name, s.name, i.name
FROM users u
JOIN orders o ON u.id=o.userid
JOIN stores s ON o.storeid=s.id 
JOIN orderitems oi ON o.id=oi.orderid
JOIN items i ON oi.itemid=i.id
WHERE u.id='0a497257-2b1a-4836-940f-7b95db952e61';

/* 3. 특정 사용자가 주문한 유니크한 상품명의 목록을 구하시오 */
SELECT DISTINCT u.name, i.name
FROM users u
JOIN orders o ON u.id=o.userid
JOIN orderitems oi ON o.id=oi.orderid
JOIN items i ON oi.itemid=i.id
WHERE u.id='0a497257-2b1a-4836-940f-7b95db952e61';


/* 4. 특정 사용자가 주문한 매출액의 합산을 구하시오 */

-- 상품별 합계
SELECT 
    i.name,
    SUM(i.unitprice) AS totalpay
FROM users u
JOIN orders o ON u.id = o.userid
JOIN orderitems oi ON o.id = oi.orderid
JOIN items i ON oi.itemid = i.id
WHERE u.id = '0a497257-2b1a-4836-940f-7b95db952e61'
GROUP BY i.name

UNION ALL

-- 전체 총합
SELECT 
    'Total' --column 갯수 동일하게 하기위해
    SUM(i.unitprice) AS totalpay
FROM users u
JOIN orders o ON u.id = o.userid
JOIN orderitems oi ON o.id = oi.orderid
JOIN items i ON oi.itemid = i.id
WHERE u.id = '0a497257-2b1a-4836-940f-7b95db952e61';



/* 5. 상점별 월간 통계(매출액)을 구하시오 */
SELECT s.name, i.name, SUM(i.unitprice)
FROM users u
JOIN orders o ON u.id=o.userid
JOIN stores s ON o.storeid=s.id
JOIN orderitems oi ON o.id=oi.orderid
JOIN items i ON oi.itemid=i.id
WHERE s.id='dbc2c824-a3a6-4575-ba87-42491f717357'
GROUP BY i.name

UNION ALL

SELECT s.name, 'Total', SUM(i.unitprice)
FROM users u
JOIN orders o ON u.id=o.userid
JOIN stores s ON o.storeid=s.id
JOIN orderitems oi ON o.id=oi.orderid
JOIN items i ON oi.itemid=i.id
WHERE s.id='dbc2c824-a3a6-4575-ba87-42491f717357';



/* 6. 특정 사용자가 방문한 상점의 빈도가 높은 순서대로 소팅하여 상위 5개만 구하시오 */
SELECT u.name, s.name, COUNT(s.name) AS count
FROM users u
JOIN orders o ON u.id=o.userid
JOIN stores s ON o.storeid=s.id
WHERE u.id = 'ead0a001-fa59-4f08-a40d-ff375e017653'
GROUP BY s.name
ORDER BY count DESC
LIMIT 5;



/* 7.1 구매한 매출액의 합산이 가장 높은 사용자 10명을 구하고 각각의 매출액을 구하시오 */
SELECT u.name, 'total', SUM(i.unitprice) AS totalpay
FROM users u
JOIN orders o ON u.id=o.userid
JOIN stores s ON o.storeid=s.id
JOIN orderitems oi ON oi.orderid=o.id
JOIN items i ON oi.itemid=i.id
GROUP BY u.name
ORDER BY totalpay DESC
LIMIT 10;



/* 7.2 토탈 지출 금액에서 이제 사용자별 개별 지출 금액 데이터 */
SELECT u.name, i.name, SUM(i.unitprice) AS totalpay
FROM users u
JOIN orders o ON u.id=o.userid
JOIN stores s ON o.storeid=s.id
JOIN orderitems oi ON oi.orderid=o.id
JOIN items i ON oi.itemid=i.id
WHERE u.name='박하준'
GROUP BY i.name;
