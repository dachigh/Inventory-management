# Inventory-management
## აპპლიკაციის მუშაობისთვის საჭიროა:
* Postgres:
  * დაკავშირებისთვის შეიძლება /backend/config/config.json ფაილი დააკონფიგუროთ: ჰოსტი,მომხმარებელი, პაროლი და სხვა.
  * აუცილებელია postgresql-ში შეიქმნას მონაცემათა ბაზა ან __inventory_management__ ან config.json თქვენ მიერ შეცვლილი მონაცემათა ბაზის სახელი.  

*   backend:
    1. npm run migrate
    2. node server.js
* frontend:
    1. ng serve --port 8081
       * 8081 მნიშვნელოვანია.
* generateFakeData() ფუნქციით შესაძლებელია 300,000 ჩანაწერის დამატება მონაცემათა ბაზაში და შეგიძლიათ უბრალოდ შეცვალოთ __for ცილკი__.

