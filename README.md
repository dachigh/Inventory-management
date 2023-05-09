# Inventory-management
აპპლიკაციის მუშაობისთვის საჭიროა:
-დაკავშირებისთვის შეიძლება app/config/db.config.js ფაილში დააკონფიგუროთ: ჰოსტი,მომხმარებელი, პაროლი და სხვა.  
-postgreSQL-ში უნდა შეიქმნას მონაცემათა ბაზა InventoryManagement ან სახელი რომელიც db.config.js ჩაწერეთ
-ასევე ცხრილი სახელად inventories აუცილებელია,რომელშიც უნდა შეიქმანს სვეტები:
    -   id serial,
    -   title character varying
    -   place character varying
    -   price numeric
    -   createdAt date
    -   updatedAt date

generateFakeData() ფუნქციაში მინიჭებული მაქვს 300,000 ჩანაწერის დამატება მონაცემათა ბაზაში და შეგიძლიათ უბრალოდ შეცვალოთ.