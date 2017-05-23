download mongodb from https://www.mongodb.com/download-center#community

create the data directory
	mkdir c:/data/db
	
Go to extracted directory
	double click on downloded exe/.msi file
	cd C:\Program Files\MongoDB\Server\3.4\bin
Start mongodb server (That command should always be in running mode)
	mongod.exe --dbpath C:\data\db
For more information visit Quick start guide
	https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
Launch shell client of mongo - follow following steps
	cd c:/software/MongoDB/bin
	./mongo
	It allows us to connect mongodb server through this shell client
-------------------------------------------------------------
Few handy commands of mongodb

	use node-angular [It is used to access 'node-angular' database]
	show collections 	[It is used to show all collections/tables existing in node-angular db]
	db.messages.find()	[It is used to get all records in messages collection of current database]
	db.users.find()		[get all records from users collection]
	
------------------------------------------------------------

npm install --save mongoose
npm install --save mongoose-unique-validator