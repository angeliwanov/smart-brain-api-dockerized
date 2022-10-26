BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('angel', 'angel@gmail.com', 5, '2022-10-20'); 
INSERT into login (hash, email) values ('$2a$10$BYZNZ3uh/yFDrAvfDH.eU.8qv3hunsQSmWJv09LJysTDfYmIca03C', 'angel@gmail.com');

COMMIT;