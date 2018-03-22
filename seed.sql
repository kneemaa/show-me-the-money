USE Stocks;

INSERT INTO Users (first_name,last_name,email,account_balance,createdAt,updatedAt) VALUES ('Devin','Thomas','devin@gmail.com',10000,'2018-03-22T00:17:42','2018-03-22T00:17:42');
INSERT INTO Users (first_name,last_name,email,account_balance,createdAt,updatedAt) VALUES ('Nema','Darban','nema@gmail.com',10000,'2018-03-22T00:17:42','2018-03-22T00:17:42');
INSERT INTO Users (first_name,last_name,email,account_balance,createdAt,updatedAt) VALUES ('Daphne','Chen','daphne@gmail.com',10000,'2018-03-22T00:17:42','2018-03-22T00:17:42');
INSERT INTO Users (first_name,last_name,email,account_balance,createdAt,updatedAt) VALUES ('Jeremy','Gruhlkey','jeremy@gmail.com',10000,'2018-03-22T00:17:42','2018-03-22T00:17:42');
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("TSLA",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',1);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("TSLA",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',2);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("TSLA",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',3);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("TSLA",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',4);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("FB",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',1);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("MNKD",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',2);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("FB",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',3);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("FB",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',4);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("SNAP",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',4);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("SNAP",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',3);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("SNAP",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',1);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("FB",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',3);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("SNAP",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',3);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("MNKD",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',1);
INSERT INTO Ledgers (symbol,purchase_price,stock_count,is_owned,createdAt,updatedAt,UserId)
    VALUES ("SNAP",50,5,true,'2018-03-22T00:17:42','2018-03-22T00:17:42',3);

