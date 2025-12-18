/* 1. */
SELECT firstname||' '||lastname AS fullname, customerid, country 
FROM customers 
WHERE country !='USA';

/* 2. */
SELECT firstname||' '||lastname AS fullname, customerid, country 
FROM customers 
WHERE country='BRAZIL';

/* 3. */
SELECT DISTINCT c.firstname||' '||c.lastname AS fullname, 
i.invoiceid, i.invoicedate||' '||c.country AS dateandCountry
FROM invoices AS i
JOIN customers As c
ON i.customerid = c.customerid
WHERE c.country='Brazil';

/* 4. */
SELECT firstname||' '||lastname 
FROM employees 
WHERE employees.title 
LIKE 'Sales%';

/* 5. */
SELECT DISTINCT inv.billingcountry
FROM invoices inv;

/* 6. */
SELECT 
    e.FirstName || ' ' || e.LastName AS SalesAgentName,
    COUNT(i.InvoiceId) AS InvoiceCount,
    SUM(CAST(i.Total)) AS TotalPay
FROM employees e
JOIN customers c ON e.EmployeeId = c.SupportRepId
JOIN invoices i ON c.CustomerId = i.CustomerId
GROUP BY e.EmployeeId;


/* 7. */
SELECT 
    COUNT(i.InvoiceId) AS InvoiceCount,
    SUM(i.Total) AS TotalPay,
    c.FirstName || ' ' || c.LastName AS customerName,
    c.country,
    e.EmployeeId
FROM employees e
JOIN customers c ON e.EmployeeId = c.SupportRepId
JOIN invoices i ON c.CustomerId = i.CustomerId
GROUP BY c.customerid;






